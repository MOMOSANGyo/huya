# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-04 17:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0015_gameword_used'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameuser',
            name='gameid',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='gameuser',
            name='gamewordid',
            field=models.IntegerField(default=0),
        ),
    ]
