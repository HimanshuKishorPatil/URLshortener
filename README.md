# URLshortener
Platform to shortened your URLs and keep them safely for further use

#Tech Use
-Angular v17
-HTML5, CSS3
-Bootstrap
-Mysql
-Nodejs
-Express
-Javascript
-typescript

# Key functionality
- Authorized user login
- Authentic legal
- Angular Material
- Dark/light functionality
- Angular table

# Requirement 
- Visual Studio Code
- Node v20
- ng Angular v17

# Deploy
- Backend run cmd "node index.js"
- Frontend run cmd "ng serve"


Here is a complete `README.md` file for your **URL Shortener project** with:

* ✅ Sequelize database setup and migration steps
* ✅ Node.js backend run instructions
* ✅ Angular frontend run instructions
* ✅ `.env` config help
* ✅ Project structure

---

### ✅ `README.md` for URL Shortener (MySQL + Sequelize + Node.js + Angular)

```markdown
# 🌐 URL Shortener Project

A full-stack URL shortener built with:

- ⚙️ **Node.js** backend (Express + Sequelize + MySQL)
- 🧩 **Angular** frontend (v14+ recommended)
- 💾 **MySQL** as the database
- 📦 **Sequelize** for ORM and migrations

---

## 📁 Project Structure

```

project-root/
├── backend-server/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── createDatabase.js
│   ├── .env
│   ├── package.json
│   └── ...
├── frontend-app/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
└── README.md

````

---

## ⚙️ Backend Setup (Node.js + MySQL + Sequelize)

### 1. 📥 Install Dependencies

```bash
cd backend-server
npm install
````

### 2. 🛠 Create `.env` File

Inside `backend-server/`, create a `.env`:

```env
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=weatherforecast
DB_HOST=localhost
DB_PORT=3306
```

> Make sure MySQL Server is running and port is free.

### 3. 🧱 Auto-Create Database

```bash
npm run create-db
```

If you don’t have it yet, make sure `createDatabase.js` exists and uses `mysql2` with `dotenv`.

### 4. 📜 Run Migrations

```bash
npm run migrate
```

This will create the `user` and `url_details` tables using Sequelize CLI.

---

### 5. 🚀 Start Backend Server

```bash
npm start
```

By default, server will run on:

```
http://localhost:3000/
```

---

## 🖥️ Frontend Setup (Angular)

### 1. 📥 Install Angular CLI (if not already)

```bash
npm install -g @angular/cli
```

### 2. 📦 Install Dependencies

```bash
cd ../frontend-app
npm install
```

### 3. 🔧 Set API URL (Environment File)

Edit `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000'
};
```

### 4. ▶️ Run Angular App

```bash
ng serve
```

Frontend will be available at:

```
http://localhost:4200/
```

---

## 🔁 Common Scripts

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `npm run create-db` | Create MySQL database (from `.env`) |
| `npm run migrate`   | Apply all migrations                |
| `npm run setup`     | Create DB and migrate (chain)       |
| `npm start`         | Start backend server                |
| `ng serve`          | Start Angular frontend              |

---

## ✅ Features

* OTP and password-based user sign-up
* Google login support
* URL shortening with history
* Secure password handling
* API endpoints with UUID user tracking

---

## 🛠 Technologies Used

* Backend: Node.js, Express, Sequelize
* Frontend: Angular, Bootstrap/Material
* Database: MySQL 8.x
* Tools: dotenv, mysql2, Sequelize CLI

---

## 📧 Contact / Support

Maintained by: **Himanshu Patil**
Issues? Suggestions? Create a GitHub issue or drop a message.

