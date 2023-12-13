# Generated by Django 4.2.6 on 2023-12-13 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalingredient',
            name='unit',
            field=models.CharField(choices=[('G', 'g'), ('ML', 'ml'), ('PIECE', 'Stk.')], default='G', max_length=5, verbose_name='Einheit'),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='unit',
            field=models.CharField(choices=[('G', 'g'), ('ML', 'ml'), ('PIECE', 'Stk.')], default='G', max_length=5, verbose_name='Einheit'),
        ),
    ]
