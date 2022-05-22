from django.contrib import admin
from .models import ContactUs, ShopInfo, Item, ItemReview, DeliveryBoy, Cart, Order, OrderHistory


# Register your models here.
@admin.register(ContactUs)
class ShopOfferModel(admin.ModelAdmin):
    list_filter = ('subject', 'desc', 'name')
    list_display = ('user_id', 'name', 'subject', 'createdTime')


@admin.register(ShopInfo)
class ShopModel(admin.ModelAdmin):
    list_filter = ('id', 'shopName', 'detailedAddr')
    list_display = ('id', 'userID', 'shopName', 'review', 'isBanned', 'detailedAddr', 'offerBDT', 'offerPercentage', 'offerTill')


@admin.register(Item)
class ItemModel(admin.ModelAdmin):
    list_filter = ('id', 'itemName', 'itemDetail')
    list_display = ('id', 'shopID', 'itemName', 'cost', 'accumulatedRating', 'itemImg', 'itemDetail')


@admin.register(ItemReview)
class ItemReviewModel(admin.ModelAdmin):
    list_filter = ('id','userID', 'itemID')
    list_display = ('id', 'userID', 'itemID', 'rating', 'comment')


@admin.register(DeliveryBoy)
class DeliveryBoyModel(admin.ModelAdmin):
    list_filter = ('id', 'firstName', 'lastName')
    list_display = ('id', 'firstName', 'lastName', 'password', 'phNo', 'qualifications', 'status')


@admin.register(Cart)
class CartModel(admin.ModelAdmin):
    list_filter = ('id', 'userID', 'itemID')
    list_display = ('id', 'userID', 'itemID', 'quantity')


@admin.register(Order)
class OrderModel(admin.ModelAdmin):
    list_filter = ('id', 'userID',)
    list_display = ('id', 'userID', 'itemID', 'quantity', 'totalCost', 'deliveryStatusWorker', 'deliveryStatusDeliveryboy', 'deliveryStatusUser', 'timeStampCreated','timeStampUpdated' )


@admin.register(OrderHistory)
class OrderHistoryModel(admin.ModelAdmin):
    list_filter = ('id', 'userID', 'orderID')
    list_display = ('id', 'userID', 'orderID')
