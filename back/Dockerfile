FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -D
CMD npm run start:local
