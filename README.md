# BUANGDISINI API SERVICE & BACKOFFICE

> PT. Daur Ulang Bumi \
> Jl. KH. Malik Dalam No.38, Buring, Kec. Kedungkandang, Kota Malang, Jawa Timur 65136 \
> [https://buangdisini.com](https://buangdisini.com)

# API Docs

[Here](https://documenter.getpostman.com/view/21019377/Uz5FLd1A)

# How to use

1. Run the following commands to get all the pacakges
   `yarn install`
2. Run `./node_modules/.bin/webpack --mode production`, this willbundle all of the react files.
3. Browse to https://localhost:3000/book

# Requirements:

-   NodeJS LTS 16+
-   NestJS 8.4
-   MySQL 5.7
-   RabbitMQ with Delayed Message Plugins
-   Redis

# Install and run Backoffice:

-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn webpack:backoffice:prod`
-   Run `yarn build`
-   Run `cp -r apps/backoffice/public dist/apps/backoffice` - untuk running UI
-   Run `cp -r apps/backoffice/assets dist/apps/backoffice` - untuk running UI
-   Run `yarn start:prod:backoffice` or `yarn start:dev backoffice` (local)

# Install and run Api:

-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn build`
-   Run `cp -r apps/api/assets dist/apps/api`
-   Run `cp -r apps/api/src/infrastructure/mail dist/apps/api/src/infrastructure`
-   Run `yarn start:prod:api` or `yarn start:dev api` (local)

# Database Commands:

| Command                                  | Description                                              |
| ---------------------------------------- | -------------------------------------------------------- |
| `yarn migrate`                           | Create tables                                            |
| `yarn migrate:create [migration_name]`   | Create migration but is empty                            |
| `yarn migrate:generate [migration_name]` | Generate migration add or changes the entities directory |
| `yarn seed:run`                          | Run the seeder                                           |
| data                                     |
| `yarn schema:drop`                       | Drop all tables                                          |

### DB Schema ERD Locations:

We use DBML to create and publish the ERD documentation. Visit [here](https://www.dbml.org/home/#dbdiagram) to show you how to (official documentation)

> https://dbdocs.io/buangdisini.dev/BuangDisini

### Published Edited DBDOCS Commands:

-   Run `yarn dbdocs:publish`

Run Seeder:

```bash
yarn seed:run

// with specific class name
yarn seed:run -s CreateAppProvinceSeeder
yarn seed:run -s CreateAppCitySeeder

// reset database
yarn schema:drop && yarn migrate && yarn seed:run

// or

yarn seed:run

// with specific class name
yarn seed:run -s CreateAppProvinceSeeder
yarn seed:run -s CreateAppCitySeeder

// reset database
yarn schema:drop && yarn migrate && yarn seed:run
```

## Project anatomy

```
.
├── apps   
│   └── backoffice                     → Group of Admin Panel/
│       ├── app                        → The backoffice application/
│       │   ├── Components             → Component frontend/
│       │   │   ├── atoms/
│       │   │   │   └── ex: Texts
│       │   │   ├── molecules/
│       │   │   │   └── ex: sidebar
│       │   │   └── organism/
│       │   │       └── ex: datatables
│       │   ├── Enums                  → Global Enumerations, ex: statu("waiting"=1)
│       │   ├── Layouts                → General layout
│       │   ├── Modules                → Collection Type every module/
│       │   │   └── ex: user
│       │   ├── Pages                  → Backoffice pages collection/
│       │   │   └── ex: users
│       │   └── Utils                  → Helper for backoffice
│       ├── public                     → Property for components/
│       │   ├── css
│       │   ├── lib/
│       │   │   └── ex: bootstrap
│       │   └── unity/
│       │       ├── css
│       │       ├── img
│       │       └── js
│       ├── assets                     → Property for assets for all file config/
│       ├── src                        → Source nestjs for backoffice/
│       │   ├── common                 → General needed/
│       │   │   ├── enums              → Global Enumerations, ex: statu("waiting"=1)
│       │   │   ├── filters            → Filtering property
│       │   │   ├── interceptors       → Create bind extra logic before/after method execution
│       │   │   ├── interface          → Interface for global, ex: paginate
│       │   │   ├── pipes              → For custom validation
│       │   │   ├── request            → Request Rules
│       │   │   ├── rules              → Other rules, ex: maxBigInt
│       │   │   └── utils              → Global utility
│       │   ├── infrastructure         → External replaceable, ex: database, caching/
│       │   │   ├── applications
│       │   │   ├── inertia            → Inertia package/
│       │   │   │   ├── adapter
│       │   │   │   ├── entities
│       │   │   │   └── middlewares
│       │   │   └── redis              → Caching
│       │   └── modules                → Contain all module with bussiness logic/
│       │       └── ex: auth
│       └── storages                   → Static content
├── databases                          → Database migation & seeder/
│   ├── migrations
│   └── seeds
├── entities                           → Contain business entity/
│   └── ex: iam
├── interface-models                   → Interface to models database/
│   └── ex: iam
├── node_modules (generated)           → NPM dependencies
└── test                               → All unit test writen
```
