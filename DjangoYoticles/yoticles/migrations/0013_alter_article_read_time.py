# Generated by Django 5.0.6 on 2024-11-21 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yoticles', '0012_alter_article_pub_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='read_time',
            field=models.IntegerField(),
        ),
    ]
