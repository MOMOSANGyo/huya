# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-04 13:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0012_info_userrecord'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userrecord',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
