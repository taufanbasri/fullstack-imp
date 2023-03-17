Fullstack-IMP
System Requirements:
Make sure your computer has the following installed:

PHP 8.1 or later
Composer
MySQL or other RDBMS
Node.js 16.8 or later.
Installation:
Clone the repository by running the following command:

bash
Copy code
git clone https://github.com/taufanbasri/fullstack-imp
Change directory to the backend folder:

bash
Copy code
cd backend
Run the following command to install the required dependencies:

Copy code
composer install
Copy the .env.example file to .env:

bash
Copy code
cp .env.example .env
Generate a new APP_KEY by running the following command:

vbnet
Copy code
php artisan key:generate
Edit the .env file to match your database settings:

makefile
Copy code
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=backend
DB_USERNAME=root
DB_PASSWORD=password
Run the migrations and seed the database:

Copy code
php artisan serve
Change directory to the frontend folder:

bash
Copy code
cd ../frontend
Install the required dependencies:

Copy code
npm install
Create a .env.local file in the root directory of the frontend folder and edit it to match your backend URL:

bash
Copy code
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
Start the development server:

Copy code
npm run dev
Visit the URL provided, usually http://localhost:3000.
