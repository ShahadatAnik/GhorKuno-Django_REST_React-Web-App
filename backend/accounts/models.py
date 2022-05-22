from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import GhorKuno
from django.utils import timezone


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_worker = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.email

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        super(UserAccount, self).save(force_insert, force_update, *args, **kwargs)
        if self.is_active == False:
            UserProfileInfo.objects.create(user_id=self.id)
            GhorKuno.models.ShopInfo.objects.create(userID=self.id)


# 'first_name', 'last_name', 'house_name', 'road_no', 'block_no', 'area', 'city', 'district', 'mobilePhone',
class UserProfileInfo(models.Model):
    user_id = models.IntegerField(default=-1)
    is_chef = models.BooleanField(default=False)

    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    house_name = models.CharField(max_length=255, default="")
    road_no = models.CharField(max_length=255, default="")
    block_no = models.CharField(max_length=255, default="")
    area = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    district = models.CharField(max_length=255, default="")
    mobilePhone = models.CharField(max_length=20, default="")
    profile_pic = models.FileField(blank=True, default="")

    updatedTime = models.DateTimeField(auto_now=True)
    createdTime = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['user_id']

    def __str__(self):
        return '%d: %s %s' % (self.user_id, self.first_name, self.last_name)

# class UserProfile(models.Model):
#     user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
#     phone_no = models.CharField(max_length=100, default="")
#     city = models.CharField(max_length=100, default="")
#     bio = models.TextField(max_length=500, default="")
#     skills = models.CharField(max_length=255, default="")
#     avatar = models.ImageField(
#         default="", blank=True, null=True, upload_to='avatars')
#
#     def __str__(self):
#         return self.user.email
