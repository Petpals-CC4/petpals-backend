# Petpals-backend

## 📘 Description

A Group Final-Project in CodeCamp 2019.

## 📦 Built With

- [Express](https://expressjs.com/) - A Web Application Framework
- [Passport](http://www.passportjs.org/docs/) - An Authentication Middleware for NodeJS
- [Sequelize](https://sequelize.org/) - An ORM Library for MySQL
- [MySQL2](https://www.npmjs.com/package/mysql2) - A Library for NodeJS to Connecting a MySQL DB

## 🛠 Structure

```mermaid
graph LR;
  Petpals --> Petpals-backend;
  Petpals-backend --> Petpals;
  Petpals-backend -->|JWT| PassportJS;
  PassportJS -->|Authentication| Petpals-backend;
  Petpals-backend --> Sequelize;
  Sequelize --> Petpals-backend;
  Sequelize --> MySQL;
  MySQL --> Sequelize;
```

![Mermaid Diagram](./mermaid-diagram.svg)

## 📋 Features

- APIs CRUD for ...

## 🏷 Versioning

- Current Version: 0.1.1
- For the versions available, see the [tags on this repository.](https://github.com/Petpals-CC4/petpals-backend/tags)

## 💡 Getting Started

1️⃣ Clone this project by

  ```bash
    git clone https://github.com/Petpals-CC4/petpals-backend.git
  ```

2️⃣ Run Commands

  ```bash
    npm install # or just `yarn`

    npm start # or just `yarn start`

    # Default link: http://localhost:3000/
  ```

3️⃣ Add `config.json` in `./config/config.json` for more detail, next topic.

4️⃣ Enjoy with :D

## ⚙️ Configurations

Create a config.json `./config/config.json` with this detail, edit your password and database name

```json
  {
    "development": {
      "username": "root",
      "password": "YOUR_PASSWORD",
      "database": "YOUR_DATABASE_NAME",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": 0,
      "port": 3306,
      "app_port": 5000
    },
    "test": {
      "username": "root",
      "password": "YOUR_PASSWORD",
      "database": "YOUR_DATABASE_NAME",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": 0,
      "port": 3306,
      "app_port": 5000
    },
    "production": {
      "username": "root",
      "password": "YOUR_PASSWORD",
      "database": "YOUR_DATABASE_NAME",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": 0,
      "port": 3306,
      "app_port": 5000
    }
  }
```

## Example APIs

Please go to Postman Collection [Petpals-backend.postman_collection.json](Petpals-backend.postman_collection.json)

## 😎 Author

Petpals Team - Codecamp 4 (2019)

## 🚩 Created at

13 Jan 2020
