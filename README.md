# 🚴 Assignment-8: Bike Servicing Management API

A robust backend API for managing bike servicing operations, customers, and service records. Built with modern technologies to provide efficient CRUD operations and service management capabilities.

## 🌐 Live Deployment

**API Base URL:** [https://bik-server-a8l2.vercel.app](https://bik-server-a8l2.vercel.app)

## 🎯 Objective

Develop a backend API for a Bike Servicing Management System that allows a bike servicing center to manage customers, bikes, and service records. The API supports CRUD operations for bikes, customers, and services, and includes special endpoints for assigning and completing servicing jobs.

## 🛠 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **Bun** - Package manager and runtime

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── config/            # Configuration files
│   │   ├── errors/            # Error handling
│   │   ├── middlewares/       # Express middlewares
│   │   ├── module/
│   │   │   ├── bike/          # Bike module
│   │   │   ├── customer/      # Customer module
│   │   │   └── service/       # Service module
│   │   ├── routes/            # Route definitions
│   │   └── type/              # TypeScript types
│   ├── shared/                # Shared utilities
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema

The system uses Prisma ORM with UUIDs for all primary keys.

### 1. Customer Table

| Field      | Type     | Description                      |
|------------|----------|----------------------------------|
| customerId | UUID     | Unique identifier for customer   |
| name       | String   | Full name of the customer        |
| email      | String   | Unique email address             |
| phone      | String   | Contact number                   |
| createdAt  | DateTime | Auto timestamp when created      |

### 2. Bike Table

| Field      | Type   | Description                           |
|------------|--------|---------------------------------------|
| bikeId     | UUID   | Unique identifier for bike            |
| brand      | String | Brand of the bike (e.g., Honda)       |
| model      | String | Model name                            |
| year       | Int    | Manufacturing year                    |
| customerId | UUID   | Foreign key referencing Customer      |

### 3. ServiceRecord Table

| Field          | Type     | Description                              |
|----------------|----------|------------------------------------------|
| serviceId      | UUID     | Unique identifier for service record     |
| bikeId         | UUID     | Foreign key to Bike                      |
| serviceDate    | DateTime | Date the service started                 |
| completionDate | DateTime | Nullable. Date the service completed     |
| description    | String   | Details of service (e.g., oil change)    |
| status         | String   | Status: "PENDING", "IN_PROGRESS", "DONE" |

## 📦 API Endpoints

### 1. Customer Management

#### ✅ Create a new customer
```http
POST /api/customers
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

#### ✅ Get all customers
```http
GET /api/customers
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Customers fetched successfully",
  "data": [
    {
      "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "createdAt": "2025-04-11T12:34:56.789Z"
    }
  ]
}
```

#### ✅ Get a specific customer by ID
```http
GET /api/customers/:customerId
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Customer fetched successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

#### ✅ Update customer details
```http
PUT /api/customers/:customerId
```

**Request Body:**
```json
{
  "name": "Johnathan Doe",
  "phone": "555-123-9999"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "Johnathan Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-9999",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

#### ✅ Delete a customer
```http
DELETE /api/customers/:customerId
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```

---

### 2. Bike Management

#### ✅ Add a new bike
```http
POST /api/bikes
```

**Request Body:**
```json
{
  "brand": "Yamaha",
  "model": "R15",
  "year": 2022,
  "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Bike added successfully",
  "data": {
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "brand": "Yamaha",
    "model": "R15",
    "year": 2022,
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
  }
}
```

#### ✅ Get all bikes
```http
GET /api/bikes
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Bikes fetched successfully",
  "data": [
    {
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "brand": "Yamaha",
      "model": "R15",
      "year": 2022,
      "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
    }
  ]
}
```

#### ✅ Get a specific bike by ID
```http
GET /api/bikes/:bikeId
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Bike fetched successfully",
  "data": {
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "brand": "Yamaha",
    "model": "R15",
    "year": 2022,
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
  }
}
```

---

### 3. Service Management

#### ✅ Create a service record
```http
POST /api/services
```

**Request Body:**
```json
{
  "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
  "serviceDate": "2025-04-11T10:00:00.000Z",
  "description": "Oil change",
  "status": "PENDING"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Service record created successfully",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": null,
    "description": "Oil change",
    "status": "PENDING"
  }
}
```

#### ✅ Get all service records
```http
GET /api/services
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Service records fetched successfully",
  "data": [
    {
      "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "serviceDate": "2025-04-11T10:00:00.000Z",
      "completionDate": null,
      "description": "Oil change",
      "status": "PENDING"
    }
  ]
}
```

#### ✅ Get a specific service record
```http
GET /api/services/:serviceId
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Service record fetched successfully",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": null,
    "description": "Oil change",
    "status": "PENDING"
  }
}
```

#### ✅ Mark a service as completed
```http
PUT /api/services/:serviceId/complete
```

**Request Body (optional):**
```json
{
  "completionDate": "2025-04-11T15:30:00.000Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Service marked as completed",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": "2025-04-11T15:30:00.000Z",
    "description": "Oil change",
    "status": "done"
  }
}
```

---

## 🎁 Bonus Features

### 🧯 Error Handling

Standardized error response structure across all endpoints:

```json
{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Optional stack trace shown only in development"
}
```

### ⏳ Pending or Overdue Services

#### ✅ Get PENDING or overdue services
```http
GET /api/services/status
```

Returns all services that:
- Have status = "PENDING" or "IN_PROGRESS"
- serviceDate is older than 7 days

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Overdue or PENDING services fetched successfully",
  "data": [
    {
      "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "serviceDate": "2025-04-01T10:00:00.000Z",
      "completionDate": null,
      "description": "Oil change",
      "status": "PENDING"
    },
    {
      "serviceId": "c9bce2ff-44a2-4b3f-bef7-04f5e35d21d2",
      "bikeId": "a3d2d3cb-f72f-4b63-a7d6-20e57bc30ef1",
      "serviceDate": "2025-04-02T12:00:00.000Z",
      "completionDate": null,
      "description": "Engine tuning",
      "status": "in-progress"
    }
  ]
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun (or npm/yarn)
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd a8l2
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/bike_service_db"
   PORT=5000
   NODE_ENV=development
   ```

4. **Run database migrations**
   ```bash
   bunx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   bunx prisma generate
   ```

6. **Start the development server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:5000`

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun start` - Start production server
- `bunx prisma studio` - Open Prisma Studio (database GUI)
- `bunx prisma migrate dev` - Run database migrations

---

## 🔧 Environment Variables

| Variable       | Description                          | Example                                    |
|----------------|--------------------------------------|--------------------------------------------|
| DATABASE_URL   | PostgreSQL connection string         | postgresql://user:pass@localhost:5432/db   |
| PORT           | Server port number                   | 5000                                       |
| NODE_ENV       | Environment (development/production) | development                                |

---

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful message",
  "data": { /* Response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "status": 400,
  "message": "Error message",
  "stack": "Stack trace (development only)"
}
```

---

## 🔐 Database Relations

- **Customer** → has many → **Bikes**
- **Bike** → belongs to → **Customer**
- **Bike** → has many → **ServiceRecords**
- **ServiceRecord** → belongs to → **Bike**

---

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import endpoints and test
- **Thunder Client** - VS Code extension
- **cURL** - Command line tool

Example cURL request:
```bash
curl -X POST https://bik-server-a8l2.vercel.app/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }'
```

---

## 📦 Deployment

The API is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Salek Masud Parvez**

- GitHub: [@salekmasudparvez](https://github.com/salekmasudparvez1)
- Live API: [https://bik-server-a8l2.vercel.app](https://bik-server-a8l2.vercel.app)

---

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- Built as part of Assignment-8 for Bike Servicing Management System
- Thanks to the open-source community for the amazing tools and libraries

---

**Happy Coding! 🚴‍♂️💨**
