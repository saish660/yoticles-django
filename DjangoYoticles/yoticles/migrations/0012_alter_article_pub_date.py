# Generated by Django 5.0.6 on 2024-11-21 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yoticles', '0011_alter_article_pub_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]