# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-24 17:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0030_auto_20190824_1721'),
    ]

    operations = [
        migrations.AddField(
            model_name='gameword',
            name='a4time',
            field=models.CharField(default=0, max_length=128),
        ),
    ]
