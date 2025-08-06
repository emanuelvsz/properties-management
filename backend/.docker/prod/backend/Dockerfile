FROM python:3.13.4-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install python dependencies
COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pip install --upgrade setuptools

# Move base project files
COPY start-api.sh /
RUN chmod +x /start-api.sh

CMD ["/start-api.sh"]
