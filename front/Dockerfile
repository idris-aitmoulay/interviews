FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -D
RUN npm run build

FROM nginx:alpine
COPY devops/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /usr/share/nginx/html/
