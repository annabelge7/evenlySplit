# Generated by Django 5.0.6 on 2024-05-19 22:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("evenly_split_api", "0007_alter_groupsession_members_joined"),
    ]

    operations = [
        migrations.AlterField(
            model_name="groupsession",
            name="members_joined",
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
