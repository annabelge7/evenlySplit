# Generated by Django 5.0.6 on 2024-05-16 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evenly_split_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='username',
            new_name='user_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='groupid',
        ),
        migrations.AlterField(
            model_name='user',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='owner',
            field=models.BooleanField(default=False),
        ),
    ]
