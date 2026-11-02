# Base image
FROM debian:12-slim

# Install dependencies for Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxshmfence1 \
    libgbm1 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libxfixes3 \
    wget \
    curl \
    && apt-get clean

# Set Puppeteer executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /usr/src/app

# Copy project files
COPY package.json .
COPY index.js .

# Install Node
RUN apt-get update && apt-get install -y nodejs npm && apt-get clean

# Install dependencies
RUN npm install

# Run the worker
CMD ["node", "index.js"]
