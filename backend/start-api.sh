#!/bin/sh

python manage.py migrate
python manage.py loaddata users.json 
python manage.py runserver 0.0.0.0:8000
