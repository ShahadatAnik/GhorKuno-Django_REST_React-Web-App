from django.test import TestCase

# Create your tests here.

from http import client
from urllib import response
from django.test import RequestFactory, SimpleTestCase, TestCase
from django.urls import reverse, resolve
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from GhorKuno.views import ContactUsViewSet

from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from .serializers import ContactUsSerializer
from .models import ContactUs, ItemReview

# Create your tests here.
from .models import ContactUs, DeliveryBoy, ShopInfo, Item, ItemReview, Cart
from GhorKuno import serializers


class TestModels(TestCase):
    def test_ShopInfo(self):
        self.ShopInfo = ShopInfo.objects.create(
            userID='1',
            shopName='testShop',
            review=5,
            isBanned=False,
            detailedAddr='n/a',
            offerBDT=0,
            offerTill='2020-12-12',
            offerPercentage=0,
        )
        self.assertEquals(self.ShopInfo.userID, '1')
        self.assertEquals(self.ShopInfo.shopName, 'testShop')
        self.assertEquals(self.ShopInfo.review, 5)
        self.assertEquals(self.ShopInfo.isBanned, False)
        self.assertEquals(self.ShopInfo.detailedAddr, 'n/a')
        self.assertEquals(self.ShopInfo.offerBDT, 0)
        self.assertEquals(self.ShopInfo.offerTill, '2020-12-12')
        self.assertEquals(self.ShopInfo.offerPercentage, 0)

    def test_Item(self):
        self.Item = Item.objects.create(
            shopID='1',
            itemName='testItem',
            cost=0,
            accumulatedRating=0,
            itemImg='n/a',
            itemDetail='n/a',

        )
        self.assertEquals(self.Item.shopID, '1')
        self.assertEquals(self.Item.itemName, 'testItem')
        self.assertEquals(self.Item.cost, 0)
        self.assertEquals(self.Item.accumulatedRating, 0)
        self.assertEquals(self.Item.itemImg, 'n/a')
        self.assertEquals(self.Item.itemDetail, 'n/a')

    def test_DeliveryBoy(self):
        self.DeliveryBoy = DeliveryBoy.objects.create(
            firstName='firstName',
            lastName='lastName',
            password='RandomPassword123!',
            phNo=123456,
            qualifications='bsc',
            location='rampura',
            status='active',

        )
        self.assertEquals(self.DeliveryBoy.firstName, 'firstName')
        self.assertEquals(self.DeliveryBoy.lastName, 'lastName')
        self.assertEquals(self.DeliveryBoy.password, 'RandomPassword123!')
        self.assertEquals(self.DeliveryBoy.phNo, 123456)
        self.assertEquals(self.DeliveryBoy.qualifications, 'bsc')
        self.assertEquals(self.DeliveryBoy.location, 'rampura')
        self.assertEquals(self.DeliveryBoy.status, 'active')

    def test_ItemReview(self):
        self.ItemReview = ItemReview.objects.create(
            userID=1,
            itemID=1,
            rating=4,
            comment='good'
        )
        self.assertEquals(self.ItemReview.userID, 1)
        self.assertEquals(self.ItemReview.itemID, 1)
        self.assertEquals(self.ItemReview.rating, 4)
        self.assertEquals(self.ItemReview.comment, 'good')

    def test_Cart(self):
        self.Cart = Cart.objects.create(
            userID=1,
            itemID=1,
            quantity=1
        )
        self.assertEquals(self.Cart.userID, 1)
        self.assertEquals(self.Cart.itemID, 1)
        self.assertEquals(self.Cart.quantity, 1)


class UrlsTest(APITestCase):

    def test_shop(self):
        data = {'shopName': 'none'}
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDI3MTgyLCJqdGkiOiI4ZjgwYzBmZDU3ODc0MjUzOGExNzE2OWM5ZGY5ZTdjYSIsInVzZXJfaWQiOjF9.eDp6ciYnztRGe3nnCnTTMeDsHsTs0ZEqjW2_N901QRw')
        response = self.client.post('/gk/shop/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK + 201)

    def test_Item(self):
        data = {'itemName': 'n/a'}
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDI3MTgyLCJqdGkiOiI4ZjgwYzBmZDU3ODc0MjUzOGExNzE2OWM5ZGY5ZTdjYSIsInVzZXJfaWQiOjF9.eDp6ciYnztRGe3nnCnTTMeDsHsTs0ZEqjW2_N901QRw')
        response = self.client.post('/gk/item/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK + 201)

    def test_DeliveryBoy(self):
        data = {'firstName': 'n/a'}
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDI3MTgyLCJqdGkiOiI4ZjgwYzBmZDU3ODc0MjUzOGExNzE2OWM5ZGY5ZTdjYSIsInVzZXJfaWQiOjF9.eDp6ciYnztRGe3nnCnTTMeDsHsTs0ZEqjW2_N901QRw')
        response = self.client.post('/gk/deliveryboy/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK + 201)

    def test_Order(self):
        data = {'remark': 'n/a'}
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDI3MTgyLCJqdGkiOiI4ZjgwYzBmZDU3ODc0MjUzOGExNzE2OWM5ZGY5ZTdjYSIsInVzZXJfaWQiOjF9.eDp6ciYnztRGe3nnCnTTMeDsHsTs0ZEqjW2_N901QRw')
        response = self.client.post('/gk/order/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK + 201)

    def test_Cart(self):
        data = {'quantity': 1}
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDI3MTgyLCJqdGkiOiI4ZjgwYzBmZDU3ODc0MjUzOGExNzE2OWM5ZGY5ZTdjYSIsInVzZXJfaWQiOjF9.eDp6ciYnztRGe3nnCnTTMeDsHsTs0ZEqjW2_N901QRw')
        response = self.client.post('/gk/cart/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK + 201)
