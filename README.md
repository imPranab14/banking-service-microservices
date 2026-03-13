# 🏦 Microservices Banking Application

A **scalable banking platform built using microservices architecture**.  
This project simulates real-world banking operations such as authentication, account management, and transaction processing using **independent services and event-driven communication**.

The system demonstrates **distributed system design, API Gateway patterns, and service-to-service communication** using modern backend technologies.

> ✅ Status: Completed

---

# 🚀 Architecture Overview

The application follows a **microservices architecture** where each service is responsible for a specific business domain.


All client requests pass through the **API Gateway**, which routes requests to the appropriate microservice.

---

# 🧩 Services

| Service | Port | Description |
|--------|------|-------------|
| API Gateway | 3000 | Entry point for all client requests |
| Auth Service | 3001 | Handles authentication and authorization |
| Account Service | 3002 | Manages bank accounts and balances |
| Transaction Service | 3003 | Handles deposits, withdrawals, and transfers |

---

# ⚙️ Core Features

- JWT-based authentication
- Role-Based Access Control (RBAC)
- RESTful APIs for banking operations
- Event-driven communication using Kafka / RabbitMQ
- Redis caching for performance
- API Gateway routing
- Independent and scalable microservices
- Docker-based containerized services

---

## 🛠 Tech Stack

### Backend
- **Node.js** – Runtime environment
- **TypeScript** – Type-safe JavaScript
- **Express.js** – Backend framework

### Frontend
- **React** – Frontend library
- **React Router** – Client-side routing
- **React Query** – Server state management
- **React Hook Form** – Form handling
- **Zod** – Schema validation
- **Zustand** – Lightweight state management
- **Axios** – API communication

### UI & Styling
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Accessible UI components
- **Lucide React** – Icon library
- **clsx / tailwind-merge / class-variance-authority** – Styling utilities
- **React Hot Toast** – Notifications

### Architecture
- **Microservices Architecture**
- **RESTful APIs**
- **API Gateway Pattern**

### Infrastructure & Messaging
- **Redis** – Caching and session management
- **Apache Kafka / RabbitMQ** – Event-driven communication

### DevOps
- **Docker**
- **Docker Compose**
---

