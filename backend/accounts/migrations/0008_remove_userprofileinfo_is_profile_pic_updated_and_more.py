# Generated by Django 4.0.2 on 2022-03-04 06:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_userprofileinfo_is_profile_pic_updated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofileinfo',
            name='is_profile_pic_updated',
        ),
        migrations.RemoveField(
            model_name='userprofileinfo',
            name='is_profile_updated',
        ),
    ]