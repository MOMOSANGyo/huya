# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-05 22:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anchor', '0022_auto_20190805_1955'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userrecord',
            old_name='score',
            new_name='total_score',
        ),
        migrations.AddField(
            model_name='userrecord',
            name='total_time',
            field=models.IntegerField(default=0),
        ),
    ]
