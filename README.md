# Ethnic Production Manager

## Project Description
Ethnic Production Manager is a MERN stack based web application used to manage ethnic clothing production orders. The system allows users to create, update, delete and view customer orders efficiently.

The application helps production managers keep track of customer details, order types, number of pieces, material, cost and delivery information.

## Technologies Used
Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features
- Add new production orders
- View order details
- Edit existing orders
- Delete orders
- Search orders by Customer ID
- Sort orders by number of pieces
- Filter orders by order type
- Print order details

## Project Structure

ethinic_production_manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── productcontroller.js
│   │   ├── models/
│   │   │   └── productmodel.js
│   │   ├── routes/
│   │   │   └── productroutes.js
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Create.jsx
│   │   │   ├── Edit.jsx
│   │   │   └── View.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
## How to Run the Project

1. Clone the repository
2. Install backend dependencies

cd backend
npm install

3. Install frontend dependencies

cd frontend
npm install

4. Run backend server

npm run dev

5. Run frontend

npm run dev

The application will run on:
Frontend → http://localhost:5173  
Backend → http://localhost:3000

## Author
Harsh Yadav