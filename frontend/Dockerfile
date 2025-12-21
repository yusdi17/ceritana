# BUILD
FROM node:22-alpine as builder

WORKDIR /app

# caching docker
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

ARG API_URL
ENV API_URL=$API_URL

ARG VITE_STORAGE_HASH_KEY
ENV VITE_STORAGE_HASH_KEY=$VITE_STORAGE_HASH_KEY
# Build project
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx khusus React 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]