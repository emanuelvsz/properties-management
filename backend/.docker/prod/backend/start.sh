#!/bin/bash

service nginx restart

poetry run python manage.py migrate

echo "Starting Django Backend"
poetry run gunicorn pauli.wsgi:application --bind 0.0.0.0:8001 --timeout 120
