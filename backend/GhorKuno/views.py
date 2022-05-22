from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import viewsets

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from urllib import response
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from .models import ContactUs, ShopInfo, Item, ItemReview, DeliveryBoy, Cart, Order, OrderHistory
from .serializers import ContactUsSerializer, ShopSerializer, ItemSerializer, ItemReviewSerializer, DeliveryBoySerializer, CartSerializer, OrderSerializer, OrderHistorySerializer


# Create your views here.
class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class ShopViewSet(viewsets.ModelViewSet):
    queryset = ShopInfo.objects.all()
    serializer_class = ShopSerializer
    lookup_field = 'shopName'
    # lookup_fields = ('shopName', 'id')


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'itemName'


class ItemReviewViewSet(viewsets.ModelViewSet):
    queryset = ItemReview.objects.all()
    serializer_class = ItemReviewSerializer


class DeliveryBoyViewSet(viewsets.ModelViewSet):
    queryset = DeliveryBoy.objects.all()
    serializer_class = DeliveryBoySerializer
    lookup_field = 'phNo'


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistory.objects.all()
    serializer_class = OrderHistorySerializer
