# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-07 15:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0023_auto_20190805_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userrecord',
            name='useid',
            field=models.CharField(max_length=256),
        ),
    ]
