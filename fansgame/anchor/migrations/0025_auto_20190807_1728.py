# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-07 17:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0024_auto_20190807_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='info',
            name='userid',
            field=models.CharField(default=0, max_length=128),
        ),
        migrations.AlterField(
            model_name='info',
            name='username',
            field=models.CharField(max_length=128),
        ),
    ]
