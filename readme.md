# STOCK OPTION APPLICATION

### Frontend

* [React](https://react.dev/)
    * [Redux Toolkit](https://redux-toolkit.js.org/)
    * [React Bootstrap](https://react-bootstrap.netlify.app/)
    * [Font Awesome](https://fontawesome.com/v5/docs/web/use-with/react)
    * [React Redux](https://react-redux.js.org/)
    * [React Router Dom](https://reactrouter.com/en/main)
    * [React Hook Form](https://react-hook-form.com)

### Backend

* [NestJS](https://nestjs.com/)
    * [sequelize](https://sequelize.org/)
    * [mysql2](https://www.npmjs.com/package/mysql2)
    * [dotenv](https://www.npmjs.com/package/dotenv)
    * [bcrypt](https://www.npmjs.com/package/bcrypt)
    * [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
    * [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)
    * [class-transformer](https://www.npmjs.com/package/class-transformer)
    * [class-validator](https://www.npmjs.com/package/class-validator)
    * [jwt](https://www.npmjs.com/package/jsonwebtoken)
    * [axios](https://axios-http.com/docs/intro)
    * [rx-js](https://rxjs.dev/)

To get our list of exchanges and stocks we are using [EODHD](https://eodhd.com)

### Database

* MySQL

### Database Structure

| Table    | Users   |
|----------|---------|
| userId   | guid    |
| email    | varchar |
| Password | varchar |

<br/>
<br/>

| Table        | Journals |
|--------------|----------|
| journalId    | guid     |
| tradeId      | guid     |
| userId       | guid     |
| journalEntry | text     |
| date         | datetime |

<br/>
<br/>

| Table     | Trades   |
|-----------|----------|
| tradeId   | guid     |
| userId    | guid     |
| stockId   | guid     |
| optionId  | guid     |
| quantity  | int      |
| buyPrice  | decimal  |
| sellPrice | decimal  |
| buyDate   | dateTime |
| sellDate  | dateTime |

<br/>
<br/>

| Table        | Exchanges |
|--------------|-----------|
| id           | Int       |
| code         | varchar   |
| country      | varchar   |
| countryISO2  | varchar   |
| countryISO3  | varchar   |
| currency     | varchar   |
| name         | varchar   |
| operatingMic | varchar   |

*sequelize has trouble generating uuids on bulkcreate*
<br/>
<br/>
<br/>

| Table     | Stocks  |
|-----------|---------|
| id        | int     |
| country   | varchar |
| currency  | varchar |
| exchange  | varchar |
| stockName | varchar |
| stockType | varchar |
| ticker    | varchar |

*sequelize has trouble generating uuids on bulkcreate*\
<br/>
<br/>

| Table          | Options |
|----------------|---------|
| optionId       | guid    |
| userId         | guid    |
| stockCode      | string  |
| strikePrice    | decimal |
| optionPrice    | decimal |
| optionType     | int     |
| expirationDate | date    |

<br/>
<br/>

| Table             | UserProfile |
|-------------------|-------------|
| userProfileId     | guid        |
| userId            | guid        |
| preferredExchange | string      |
| preferredLanguage | string      |

<br/>
<br/>

| Table           | Broker  |
|-----------------|---------|
| brokerId        | guid    |
| userId          | guid    |
| brokerName      | string  |
| brokerOptionFee | decimal |
| brokerStockFee  | decimal |

<br/>
<br/>

### Useful Links

* [NestJS Documentation](https://docs.nestjs.com/)
* [NestJS with Sequelize ORM](https://thriveread.com/nestjs-sequelize/)
* [NestJS Authentication](https://docs.nestjs.com/security/authentication)
* [Refresh Tokens](https://stackoverflow.com/questions/27726066/jwt-refresh-token-flow)
* [Redux Auth Example](https://jasonwatmore.com/post/2022/06/15/react-18-redux-jwt-authentication-example-tutorial)
