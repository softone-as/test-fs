# Nest Inertia Boilerplate - Test FS

Boilerplate using NestJS, Inertia, and ReactJS

# Table of Contents

-   [Tech Stack](#tech-stack)
-   [Project Installation](#project-installation)
    -   [Quick Start Backoffice](#quick-start-backoffice)
-   [Data Fakers User](#data-fakers-user)

# Tech Stack:

-   Docker
-   NodeJS LTS v20
-   Yarn v4
-   NestJS v10
-   React v18
-   AntDesign
-   MySQL 8
-   RabbitMQ with Delayed Message Plugins
-   Redis

# Project Installation

-   Install NodeJS LTS v20 (recommended to install [NVM](https://github.com/nvm-sh/nvm))
-   Run Docker Compose `docker compose up -d`
-   Create Database
-   Copy file `.env.example` ubah ke `.env` kemudian sesuaikan konfigurasinya `cp .env.example .env`
-   Run `yarn install`
-   Run `yarn migrate`
-   Run `yarn seed:run`
-   Run `yarn seed:run -s CreateTagSeeder` untuk menginisasi data tag
-   Run `yarn seed:run -s SyncPermissionSeederMovie` untuk mengsinkronisasi permission module movie

## Quick Start Backoffice:

-   Run `cp -r apps/backoffice/public dist/apps/backoffice` - untuk running UI
-   Run `cp -r apps/backoffice/assets dist/apps/backoffice` - untuk running UI
-   Run `yarn webpack:backoffice:dev` (local) or `yarn webpack:backoffice:prod` (production) for FE
-   Run `yarn start:dev backoffice` (local) or `yarn start:prod backoffice` (production) for BE

# Data Fakers User
`username: admin@admin.com` <br/>
`password: admin`
