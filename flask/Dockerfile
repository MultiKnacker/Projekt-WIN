# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.9.9 AS builder

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install WeasyPrint
RUN pip3 install WeasyPrint

# Set up your application directory
WORKDIR /flask
COPY requirements.txt /flask
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . .
COPY server.py server.py
RUN ls -l

CMD ["python3", "flask/server.py"]