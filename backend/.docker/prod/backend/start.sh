#!/bin/bash

service nginx restart

python manage.py migrate
python manage.py loaddata users.json properties.json tenants.json rent_contracts.json rent_payments.json expenses.json

echo "Starting Django Backend"
poetry run gunicorn property_manager.wsgi:application --bind 0.0.0.0:8001 --timeout 120
