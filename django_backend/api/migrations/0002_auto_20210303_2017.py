# Generated by Django 3.1.5 on 2021-03-03 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='games',
            name='game_code',
            field=models.CharField(default='7AB59', max_length=6, unique=True),
        ),
    ]