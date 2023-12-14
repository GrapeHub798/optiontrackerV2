# STOCK OPTION APPLICATION

### Frontend

* React
  * Redux Toolkit
  * Bootstrap
  * Font Awesome

### Backend

* NestJS
  * [sequelize](https://sequelize.org/) 
  * [mysql2](https://www.npmjs.com/package/mysql2)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [bcrypt](https://www.npmjs.com/package/bcrypt)
  * [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
  * [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)
  * [class-transformer](https://www.npmjs.com/package/class-transformer)
  * [class-validator](https://www.npmjs.com/package/class-validator)
  * [jwt](https://www.npmjs.com/package/jsonwebtoken)

### Database

* MySQL

### Database Structure


| Table    | User    |
| -------- | ------- |
| userId   | guid    |
| email    | varchar |
| Password | varchar |


| Table        | Journal  |
| ------------ | -------- |
| journalId    | guid     |
| tradeId      | guid     |
| userId       | guid     |
| journalEntry | text     |
| date         | datetime |


| Table    | Trade   |
|----------|---------|
| tradeId  | guid    |
| userId   | guid    |
| optionId | guid    |
| quantity | int     |
| buyPrice | decimal |
|sellPrice|decimal|
|buyDate|dateTime|
|sellDate|dateTime|



Options
optionId - guid
stock - string/varchar
strikePrice - double/decimal
optionPrice - double/decimal
optionType - int
expirationDate - date



### Useful Links
* [NestJS Documentation](https://docs.nestjs.com/)
* [NestJS with Sequelize ORM](https://thriveread.com/nestjs-sequelize/)
* [NestJS Authentication](https://docs.nestjs.com/security/authentication)
