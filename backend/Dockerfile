# Use the desired Python version
FROM python:3.10-slim

# Install dependencies, including netcat for the wait-for-it.sh script
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /backend

# Copy the project files
COPY . /backend

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn
RUN pip install gunicorn

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /wait-for-it.sh

# Convert wait-for-it.sh to Unix format
RUN dos2unix /wait-for-it.sh

# Ensure the wait-for-it.sh script has a proper shebang
RUN echo '#!/bin/sh' | cat - /wait-for-it.sh > /tmp/wait-for-it.sh && mv /tmp/wait-for-it.sh /wait-for-it.sh && chmod +x /wait-for-it.sh

# Expose the port Gunicorn will run on
EXPOSE 8000

# Command to run the application with Gunicorn
CMD ["/wait-for-it.sh", "mysql", "3306", "--", "gunicorn", "-b", "0.0.0.0:8000", "test:app"]
