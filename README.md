# Hono & Dreazzle Backend API Project

This project is a backend API built using the Hono framework and Dreazzle, written in TypeScript, and integrated with a serverless Neon PostgreSQL database. The purpose of this project is to provide a robust, scalable, and maintainable backend service.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- RESTful API endpoints
- Serverless architecture
- Type-safe codebase using TypeScript
- PostgreSQL database integration with Neon
- Efficient routing and middleware handling with Hono
- Scalable and easy-to-deploy using Dreazzle

## Technologies Used
- [Hono](https://hono.dev/)
- [Dreazzle](https://dreazzle.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Neon PostgreSQL](https://neon.tech/)

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Neon PostgreSQL account

### Installation Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/sammy6378/back-end-API.git
    cd your-repo-name
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following variables:
    ```env
    DATABASE_URL=your_neon_database_url
    PORT=3000
    ```

## Configuration
Ensure you have a Neon PostgreSQL database set up and note the connection string (DATABASE_URL).

## Running the Project

### Development
To start the development server, run:
```bash
npm run dev
# or
yarn dev

