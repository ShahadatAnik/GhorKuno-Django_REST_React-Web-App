# Generated by Django 4.0.2 on 2022-04-07 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GhorKuno', '0010_remove_cart_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='quantity',
            field=models.IntegerField(default=1, null=True),
        ),
    ]
