#!/bin/bash
set -e

echo "Memulai Setup Docker..."

cd /var/www/html

# Setup Environment File
if [ ! -f ".env" ]; then
    echo "File .env tidak ditemukan. Menyalin dari .env.example..."
    cp .env.example .env
else
    echo "✅ File .env sudah ada."
fi

# Install Dependencies (Vendor)
echo "Menginstall dependency composer..."
composer install --optimize-autoloader

# Generate Key (Hanya jika belum ada)
if grep -q "APP_KEY=$" .env || grep -q "APP_KEY=\s*$" .env; then
    echo "Generating Application Key..."
    php artisan key:generate
fi

# Setup Permission (Wajib!)
echo "Mengatur hak akses folder storage..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Database Setup 
echo "Menunggu Database siap..."
sleep 10 

echo "🗄️ Menjalankan migrasi database..."
php artisan migrate --force

echo "Membersihkan cache..."
php artisan config:clear
php artisan cache:clear

echo "Membuat Symbolic Link untuk Storage..."
php artisan storage:link

echo " Setup Selesai! Server PHP-FPM berjalan."
exec php-fpm