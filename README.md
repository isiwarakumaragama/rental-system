# Vehicle Rental System

A full-stack web application for managing vehicle rentals with role-based access control (Admin, Owner, and User).

## Features

### User Features
- User registration and authentication
- Browse available vehicles
- View vehicle details
- Request vehicle rentals
- Track rental history
- User dashboard

### Owner Features
- Add and manage vehicles
- View rental requests for their vehicles
- Accept/reject rental requests
- Monitor rental transactions
- Owner dashboard

### Admin Features
- Manage users and vehicle owners
- Monitor all rental activities
- System administration
- Admin dashboard
- User and vehicle management

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt for hashing

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (with Tailwind utilities)
- **HTTP Client**: Axios
- **State Management**: Context API

## Project Structure

```
rental-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── adminController.js    # Admin operations
│   │   ├── authController.js     # Authentication logic
│   │   ├── rentalController.js   # Rental management
│   │   └── vehicleController.js  # Vehicle management
│   ├── middleware/
│   │   ├── authMiddleware.js     # Authentication middleware
│   │   └── roleMiddleware.js     # Role-based access control
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin routes
│   │   ├── authRoutes.js         # Auth routes
│   │   ├── rentalRoutes.js       # Rental routes
│   │   └── vehicleRoutes.js      # Vehicle routes
│   ├── .gitignore
│   ├── generateHash.js           # Password hash generation utility
│   ├── package.json
│   └── server.js                 # Main server file
│
└── frontend/
    ├── src/
    │   ├── contexts/
    │   │   └── AuthContext.tsx    # Auth state management
    │   ├── layouts/
    │   │   └── MainLayout.tsx     # Main layout wrapper
    │   ├── pages/
    │   │   ├── About.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── VehicleDetails.tsx
    │   │   ├── VehiclesList.tsx
    │   │   ├── admin/             # Admin pages
    │   │   ├── owner/             # Owner pages
    │   │   └── user/              # User pages
    │   ├── services/
    │   │   └── api.ts             # API integration
    │   ├── utils/
    │   │   └── cn.ts              # Utility functions
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── postcss.config.js
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:5173`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

This generates optimized files in the `dist` folder.

## Usage

### User Registration & Login
1. Visit the home page
2. Click on "Register" to create a new account
3. Select your role: User, Owner, or Admin
4. Log in with your credentials

### As a User
- Browse available vehicles on the Vehicles page
- Click on a vehicle to view details
- Click "Request Rental" to make a booking request
- Track your rentals in the User Dashboard

### As an Owner
- Add vehicles from the "Add Vehicle" page
- Monitor rental requests in "Rent Requests"
- Manage your vehicles in "My Vehicles"

### As an Admin
- Access the Admin Dashboard
- Manage users and vehicle owners
- Monitor all rental activities
- View system statistics

## Authentication

The application uses JWT (JSON Web Tokens) for secure authentication. Tokens are stored and sent with API requests to authenticate users.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Create vehicle (Owner)
- `PUT /api/vehicles/:id` - Update vehicle (Owner)
- `DELETE /api/vehicles/:id` - Delete vehicle (Owner)

### Rentals
- `GET /api/rentals` - Get rentals
- `POST /api/rentals` - Request rental
- `PUT /api/rentals/:id` - Update rental status
- `DELETE /api/rentals/:id` - Cancel rental

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/vehicles` - Get all vehicles
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/vehicles/:id` - Delete vehicle

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue on the GitHub repository.
