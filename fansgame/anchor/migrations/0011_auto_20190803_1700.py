# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-03 17:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0010_gamerecord_roomdid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamerecord',
            name='roomdid',
            field=models.CharField(max_length=48),
        ),
    ]
