#!/bin/sh

python manage.py migrate
python manage.py loaddata users.json properties.json tenants.json rent_contracts.json rent_payments.json expenses.json
python manage.py runserver 0.0.0.0:8000
