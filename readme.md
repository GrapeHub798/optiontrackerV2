# STOCK OPTION APPLICATION

### Frontend

* React
  * Redux Toolkit
  * Bootstrap
  * Font Awesome

### Backend

* NestJS
  * Sequelize
  * Mysql2
  * dotenv

### Database

  * MySQL

### Database Structure


| Table    | User    |
|----------|---------|
| userId   | guid    |
| email    | varchar |
| Password | varchar |

| Table        | Journal  |
|--------------|----------|
| journalId    | guid     |
| tradeId      | guid     |
| userId       | guid     |
| journalEntry | text     |
| date         | datetime |

//userId constraint with User.userId
Trade
tradeId - guid
userId - guid
optionId - guid
quantity - int
buyPrice - double/decimal
sellPrice - double/decimal
buyDate - datetime
sellDate - datetime

Options
optionId - guid
stock - string/varchar
strikePrice - double/decimal
optionPrice - double/decimal
optionType - int
expirationDate - date
