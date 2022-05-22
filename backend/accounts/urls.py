from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserProfileInfoViewSet

router = DefaultRouter()

router.register('userInfo', UserProfileInfoViewSet)

urlpatterns = [
    path('accounts/', include(router.urls)),

]