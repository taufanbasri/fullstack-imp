# Clone the repository

git clone https://github.com/taufanbasri/fullstack-imp

# Change directory to the backend folder

cd backend

# Install dependencies

composer install

# Copy the .env.example file to .env

cp .env.example .env

# Generate APP_KEY

php artisan key:generate

# Edit the .env file to match your database settings

nano .env

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=backend
DB_USERNAME=root
DB_PASSWORD=password

# Run migrations and seed the database

php artisan migrate --seed

# Change directory to the frontend folder

cd ../frontend

# Install dependencies

npm install

# Create .env.local and set the backend URL

nano .env.local

set NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Start the development server

npm run dev
