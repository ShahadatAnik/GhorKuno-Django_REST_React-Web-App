from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserProfileInfoSerializer
from .models import UserProfileInfo


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    lookup_field = 'id'


class UserProfileInfoViewSet(viewsets.ModelViewSet):
    queryset = UserProfileInfo.objects.all()
    serializer_class = UserProfileInfoSerializer
    lookup_field = 'user_id'
