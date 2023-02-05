<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

touch_wallet is a simple money tracker for users. Money can be tracked into multiple wallets (accounts) and should show  an overall balance of all the wallets the user is associated with.

## Installation
```bash
# installation
$ git clone https://github.com/Ian-Wairimu/Touc_wallet.git

$ cd Touc_wallet

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
## Inner Workings
To work with touch wallets api and store information in your database you need to
log in to mysql in you system or terminal and create a new database for your application
```bash
$ mysql - u root -p

mysql > CREATE DATABASE Touch_wallet;
mysql > USE Touch_wallet;
```
after doing so you can go into the touch wallet and create a .env file to store your database information or can manually add them in 
```bash
./src/app.module.ts
```
we can run our application now and will create two tables in the Touch_wallet database which will be the
```bash
# it will create this two tables
+------------------------+
| Tables_in_touch_wallet |
+------------------------+
| users                  |
| wallets                |
+------------------------+
```
which will have a mapping of oneToMany and manyToOne this is so because one user can have many wallets and many wallets can be associated to one user.
```bash
#desc users;
+-----------+---------------+------+-----+----------------------+-------------------+
| Field     | Type          | Null | Key | Default              | Extra             |
+-----------+---------------+------+-----+----------------------+-------------------+
| userId    | int           | NO   | PRI | NULL                 | auto_increment    |
| firstname | varchar(255)  | NO   |     | NULL                 |                   |
| lastname  | varchar(255)  | NO   |     | NULL                 |                   |
| email     | varchar(255)  | NO   | UNI | NULL                 |                   |
| balance   | decimal(10,3) | NO   |     | NULL                 |                   |
| password  | varchar(255)  | NO   |     | NULL                 |                   |
| createdAt | datetime(6)   | NO   |     | CURRENT_TIMESTAMP(6) | DEFAULT_GENERATED |
+-----------+---------------+------+-----+----------------------+-------------------+

```
```bash
#desc wallets;
+---------------------+---------------+------+-----+----------------------+-------------------+
| Field               | Type          | Null | Key | Default              | Extra             |
+---------------------+---------------+------+-----+----------------------+-------------------+
| walletId            | int           | NO   | PRI | NULL                 | auto_increment    |
| balance             | decimal(10,3) | NO   |     | NULL                 |                   |
| businessName        | varchar(255)  | NO   | UNI | NULL                 |                   |
| businessDescription | varchar(255)  | NO   |     |                      |                   |
| businessEmail       | varchar(255)  | NO   | UNI | NULL                 |                   |
| createdAt           | datetime(6)   | NO   |     | CURRENT_TIMESTAMP(6) | DEFAULT_GENERATED |
| userId              | int           | YES  | MUL | NULL                 |                   |
+---------------------+---------------+------+-----+----------------------+-------------------+

```
## Application Apis
in the application we have the 
```curl
localhost:3000/api/users 

localhost:3000/api/wallets
```
- users api helps us to register a new user delete a user by id and also get all the wallets associated with a user
- wallets api helps us to create a new wallet associate it with a user get wallet by id and also check the wallets balance and also add money to the wallet

## Testing
Tested all the routes with postman
- user create an account 
```curl 
POST - localhost:3000/api/users
```
```json
{
   "firstname": "ian",
   "lastname": "warimu",
   "email": "ian@gmail.com",
   "password": "@IanMoon4"
}
```
creates the user in the database and encrypts the password before inserting the data.
```bash
+
| userId | firstname | lastname | email         | balance | password                                                     | createdAt                  |
+--------+-----------+----------+---------------+---------+--------------------------------------------------------------+----------------------------+
|      1 | ian       | warimu   | ian@gmail.com |   0.000 | $2b$08$/39Fd1w1QPCMjEhtkRbd7eQxI1HB.Ejb/sziX.BLwfzvYtTWXOCLq | 2023-02-05 17:51:15.487845 |

```
- get a user by id 
```curl
GET - localhost:3000/api/users/:id

localhost:3000/api/users/1
```
```json
{
    "balance": "0.000",
    "userId": 1,
    "firstname": "ian",
    "lastname": "warimu",
    "email": "ian@gmail.com",
    "password": "$2b$08$/39Fd1w1QPCMjEhtkRbd7eQxI1HB.Ejb/sziX.BLwfzvYtTWXOCLq",
    "createdAt": "2023-02-05T14:51:15.487Z",
    "wallets": []
}
```
currently it will display the wallet as an empty array because we have not created a new wallet but if we create a wallet it will display as an array of object

- create wallet associated by the user id
```curl
POST - localhost:3000/api/wallet
```
```json
{
    "balance": 120.45,
    "businessName": "touchInspiration",
    "businessDescription": "in touch inspiration development is what we do and we are proud of it",
    "businessEmail": "touchInspiration@touchinpiration.com"
}
```
this will create a new wallet and associate with the userId that created the wallet
```bash
+----------+---------+------------------+-----------------------------------------------------------------------+--------------------------------------+----------------------------+--------+
| walletId | balance | businessName     | businessDescription                                                   | businessEmail                        | createdAt                  | userId |
+----------+---------+------------------+-----------------------------------------------------------------------+--------------------------------------+----------------------------+--------+
|        1 | 120.450 | touchInspiration | in touch inspiration development is what we do and we are proud of it | touchInspiration@touchinpiration.com | 2023-02-05 17:59:36.502947 |      1 |
+----------+---------+------------------+-----------------------------------------------------------------------+--------------------------------------+----------------------------+--------+

```
so if we then run we will not get an empty array of wallet but an array of objects 
```curl
GET - localhost:3000/api/users/:id

localhost:3000/api/users/1
```
```json
{
    "balance": "0.000",
    "userId": 1,
    "firstname": "ian",
    "lastname": "warimu",
    "email": "ian@gmail.com",
    "password": "$2b$08$/39Fd1w1QPCMjEhtkRbd7eQxI1HB.Ejb/sziX.BLwfzvYtTWXOCLq",
    "createdAt": "2023-02-05T14:51:15.487Z",
    "wallets": [
        {
            "balance": "120.450",
            "walletId": 1,
            "businessName": "touchInspiration",
            "businessDescription": "in touch inspiration development is what we do and we are proud of it",
            "businessEmail": "touchInspiration@touchinpiration.com",
            "createdAt": "2023-02-05T14:59:36.502Z"
        }
    ]
}
```
and we can create more wallets for the user.

Currently the application has routes that can allow a user to

- create users
- get all users and there wallets
- delete user by id
- create wallets
- get wallets balance
- get a wallet by id
- add amount to the wallet balance and get the balance of the wallet

## Stay in touch

- Author - Ian Wairimu
