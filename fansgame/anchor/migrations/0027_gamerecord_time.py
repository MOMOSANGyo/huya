# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-07 17:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0026_auto_20190807_1728'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamerecord',
            name='time',
            field=models.IntegerField(default=0),
        ),
    ]