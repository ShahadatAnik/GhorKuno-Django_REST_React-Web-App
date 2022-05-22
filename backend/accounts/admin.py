from django.contrib import admin
from .models import UserAccount, UserProfileInfo


@admin.register(UserAccount)
class User(admin.ModelAdmin):
    list_filter = ('id', 'email',)
    list_display = ('id', 'email', 'is_worker', 'is_active', 'is_staff',)

    def has_add_permission(self, request):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        return True

    def override_user_has_perm(self, *args):
        return self.is_staff and self.is_active


@admin.register(UserProfileInfo)
class UserProfileInfo(admin.ModelAdmin):
    list_filter = ()
    list_display = ('user_id', 'first_name', 'last_name')
