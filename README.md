# AI Code Review Platform

A production-ready **event-driven microservices architecture** for AI-powered code review, built using **Node.js, TypeScript, Redis, and a monorepo structure**.

---

## 🧠 Overview

This project is designed to simulate a real-world scalable backend system where services communicate asynchronously using an event-driven approach.

It focuses on:
- Clean architecture
- Scalability
- Decoupled services
- Real-world system design patterns

---

## 🏗️ Architecture
# 🚀 AI Code Review Platform

A production-ready **event-driven microservices architecture** for AI-powered code review, built using **Node.js, TypeScript, Redis, and a monorepo structure**.

---

## 🧠 Overview

This project simulates a scalable backend system where services communicate asynchronously using an event-driven approach.

It focuses on:
- Clean architecture
- Scalability
- Decoupled services
- Real-world system design patterns

---

## 🏗️ Architecture

    apps/
    │
    ├── api-gateway # Entry point (Express API)
    │
    libs/
    │
    ├── event-bus # Redis-based pub/sub system
    ├── logger # Centralized logging module
    ├── config # Shared configuration
    ├── contracts # Shared types/interfaces


---

## ⚙️ Tech Stack

- Node.js
- TypeScript
- Express.js
- Redis (Pub/Sub)
- Docker
- Yarn Workspaces (Monorepo)

---

## 🔥 Features (Milestone 1)

- Monorepo setup using Yarn workspaces  
- API Gateway using Express  
- Centralized logging (Pino)  
- Event Bus abstraction using Redis Pub/Sub  
- Dockerized Redis with persistence & health checks  
- Scalable and modular project structure  

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ravi212/ai-code-review-platform
cd ai-code-review-platform
```

### 2. Install dependencies
yarn install

### 3. Start Redis (Docker)
docker-compose up -d

### 4. Run API Gateway
yarn dev

### Event Bus Usage
1. Publish Event
publish("test.event", { message: "Hello World" });
2. Subscribe to Event
subscribe("test.event", (data) => {
  console.log("Received:", data);
});