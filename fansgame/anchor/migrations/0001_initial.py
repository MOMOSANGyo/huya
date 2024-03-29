# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-07-19 08:30
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnchorSmallWord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=64, null=True)),
                ('level', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'anchorsmallword',
            },
        ),
        migrations.CreateModel(
            name='AnchorWord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryname', models.CharField(max_length=20, null=True)),
                ('anchorid', models.IntegerField()),
            ],
            options={
                'db_table': 'anchorword',
            },
        ),
        migrations.CreateModel(
            name='GameRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('anchorid', models.IntegerField()),
                ('personnum', models.IntegerField()),
                ('gametimeid', models.IntegerField()),
                ('truepersonnum', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'gamerecord',
            },
        ),
        migrations.CreateModel(
            name='GameStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gameid', models.IntegerField()),
                ('gamestatus', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GameTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'gametime',
            },
        ),
        migrations.CreateModel(
            name='GameUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField()),
                ('usertime', models.DateTimeField(auto_now_add=True)),
                ('useranswer', models.CharField(max_length=64, null=True)),
                ('answerbool', models.IntegerField()),
                ('gameid', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='anchor.GameRecord')),
            ],
            options={
                'db_table': 'gameuser',
            },
        ),
        migrations.CreateModel(
            name='GameWord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wordid', models.IntegerField()),
                ('anchordefined', models.IntegerField()),
                ('round', models.IntegerField(null=True)),
                ('personnum', models.IntegerField(null=True)),
                ('gameid', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='anchor.GameRecord')),
            ],
            options={
                'db_table': 'gameword',
            },
        ),
        migrations.CreateModel(
            name='SmallCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=64, null=True)),
                ('level', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'smallcategory',
            },
        ),
        migrations.CreateModel(
            name='WordCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryname', models.CharField(max_length=20, null=True)),
                ('parentid', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'wordcategory',
            },
        ),
        migrations.AddField(
            model_name='smallcategory',
            name='categoryid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='anchor.WordCategory'),
        ),
        migrations.AddField(
            model_name='gameuser',
            name='gamewordid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='anchor.GameWord'),
        ),
        migrations.AddField(
            model_name='anchorsmallword',
            name='categoryid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='anchor.AnchorWord'),
        ),
    ]
