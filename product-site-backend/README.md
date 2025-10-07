# Product Site Backend

A scalable Express.js backend server for a product site with clean architecture and modular structure.

## Features

- **Express.js** framework with modular routing
- **Security** middleware (Helmet, CORS)
- **Logging** with Morgan
- **Environment** configuration with dotenv
- **Error handling** with global error middleware
- **Health check** endpoint
- **Scalable** folder structure

## Project Structure

```
product-site-backend/
├── routes/
│   ├── home.js          # Home route handlers
│   └── products.js      # Product API routes
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── README.md           # This file
```

## Installation

```bash
cd product-site-backend
npm install
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Home Routes
- `GET /` - Welcome message (JSON response)
- `GET /welcome` - Welcome page (HTML response)

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Utility Routes
- `GET /health` - Server health check

## Environment Variables

Copy `.env` file and configure:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS

## Future Enhancements

- Database integration
- Authentication & Authorization
- Input validation
- Rate limiting
- API documentation (Swagger)
- Unit tests
