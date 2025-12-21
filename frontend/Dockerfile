# BUILD
FROM node:22-alpine as builder

WORKDIR /app

# caching docker
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV VITE_GOOGLE_CLIENT_ID="814391480881-t1o48d9t2t04pmpdvtblh9t6jr5g3gkj.apps.googleusercontent.com"
ENV API_URL="http://92.113.124.171:8001/api"
ENV VITE_STORAGE_HASH_KEY="hashkey2025"

# Build project
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx khusus React 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]