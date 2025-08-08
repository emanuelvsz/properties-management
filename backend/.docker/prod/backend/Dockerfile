FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install base system dependencies
RUN apt update
RUN apt install -y dos2unix nginx
RUN pip install -U pip
RUN pip install --upgrade setuptools

COPY property_manager /app
COPY requirements.txt /requirements.txt

# Install python dependencies
RUN pip install -r /requirements.txt
RUN python -m pip install gunicorn

# Set up NGINX
COPY .docker/prod/backend/nginx.conf /etc/nginx/sites-available/propman.conf
RUN ln -s /etc/nginx/sites-available/propman.conf /etc/nginx/sites-enabled/propman.conf
RUN nginx -t

COPY .docker/prod/backend/start.sh /app/start.sh

# Move base project files
RUN chmod +x /app/start.sh

EXPOSE 8000

# Run server
CMD ["start.sh"]
