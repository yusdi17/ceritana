# BUILD
FROM node:22-alpine as builder

WORKDIR /app

# caching docker
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build project
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx khusus React 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]