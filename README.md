# Godown Inventory Management System

This is a Godown Inventory Management system built using React.js for the frontend and Node.js for the backend. The app uses JWT tokens for authentication and provides protected routes for viewing, searching, and filtering items. The application implements a tree view to display locations, sub-locations of godowns, and the items stored in them. The backend is powered by MongoDB, and the entire system has been deployed on Amazon Web Services.

## Features

- **Tree View**: Visual representation of godowns and their sub-locations. Items are listed under locations, and item details can be viewed on click.
- **Authentication**: Created self auth system. JSON Web Tokens (JWT) are used to protect routes and provide secure authentication.
- **Search and Filter**: Users can search for items based on various parameters such as category, price, brand, and availability (in stock or out of stock).
- **Protected Routes**: The `/search` is protected by JWT authentication.

## Technology Stack

- **Frontend**: React.js (with npm for package management)
- **Backend**: Node.js (with npm for package management)
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 
- npm
- Docker



### Installation

#### Clone the repository:

```bash
git clone https://github.com/JayeshKGP/JD_INTERIIT_TASK.git
```

### Without Dockerisation
Backend:
```bash
cd backend
npm install 
node app.js
```

Frontend:
```bash
cd frontend
npm install
npm start
```

### With Dockerisation
Docker:
```bash
docker-compose build
docker-compose up -d
```

Frontend, Backend, MongoDb will run locally on system.
Connect MongoDb from Compass mongodb://root:password@localhost:27017/
Make sure to Create Database & Collection and add data to it, as it created new db.


## usage
| METHOD  | LINK |
| ------------- | ------------- |
| GET  | https://jdtaskbackend.tech/gettree |
| GET  | https://jdtaskbackend.tech/info |
| GET  |  https://jdtaskbackend.tech/search |
| POST  |  https://jdtaskbackend.tech/signin |
| POST  |  https://jdtaskbackend.tech/signup |
| GET  | https://jdtaskbackend.tech/signout  |


- Frontend :  https://interiittask.tech
- Backend : https://jdtaskbackend.tech
