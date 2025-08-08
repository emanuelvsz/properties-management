FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install base system dependencies
RUN apt update
RUN apt install -y dos2unix nginx
RUN pip install -U pip
RUN pip install poetry

COPY property_manager /app
COPY pyproject.toml /app/
COPY .docker/prod/backend/start.sh /app/

# Install python dependencies
RUN poetry install
RUN poetry add gunicorn

# Set up NGINX
COPY .docker/prod/backend/nginx.conf /etc/nginx/sites-available/propman.conf
RUN ln -s /etc/nginx/sites-available/propman.conf /etc/nginx/sites-enabled/propman.conf
RUN nginx -t

# Move base project files
RUN dos2unix /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8000

# Run server
CMD ["/start-api.sh"]
