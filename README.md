# 🚀 Data Structures in Node.js — Real Backend System Simulation

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Data Structures](https://img.shields.io/badge/Data%20Structures-Advanced-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Level](https://img.shields.io/badge/Level-Advanced-red)

---

## 📌 Project Overview

This project demonstrates how fundamental Data Structures are used in real-world backend systems built with Node.js.

Instead of treating data structures as theoretical concepts, this project simulates how they are applied in production systems such as:

- API servers (rate limiting, caching)
- Background job processors (queues)
- Logging systems (buffers)
- Editors (stack undo/redo)
- Search engines (BST indexing)
- File systems (recursion-based traversal)

---

## 🎯 Why This Project Matters

Modern backend systems require:

- Efficient memory usage
- Fast data retrieval
- Scalable request handling
- Controlled concurrency
- Optimized caching strategies

This project demonstrates how choosing the correct data structure directly impacts system performance and scalability.

---

## 🧠 Real-World Mapping of Data Structures

| Data Structure | Real Backend Usage |
|----------------|-------------------|
| Array | Basic storage, logs |
| Circular Buffer | Server logs / monitoring systems |
| Linked List | Dynamic pipelines / chaining systems |
| Stack | Undo/Redo systems |
| Queue | Background job processing |
| Rate Limiter | API protection systems |
| LRU Cache | Database caching layer |
| BST | Search indexing / autocomplete |
| Recursion | File system traversal |

---

## ⚙️ System Architecture

Client Request  
↓  
Rate Limiter (Queue-based protection)  
↓  
Job Queue (async processing system)  
↓  
Cache Layer (LRU Cache)  
↓  
Data Indexing (BST Search System)  
↓  
Response  

---

## 🚀 Features Implemented

### 1. Circular Buffer (Logging System)
- Fixed-size memory structure
- Prevents memory overflow
- Used in system logs and monitoring tools

---

### 2. Linked List (Dynamic Data Flow)
- Efficient insertion and deletion
- Used in pipelines and chained processes

---

### 3. Stack (Undo/Redo System)
- LIFO behavior (Last In First Out)
- Used in editors and browser history systems

---

### 4. Queue (Job Processing System)
- FIFO processing (First In First Out)
- Used in background jobs (emails, notifications)

---

### 5. Rate Limiter (API Protection System)
- Sliding window algorithm using queue
- Prevents API abuse and request flooding

---

### 6. LRU Cache (Performance Optimization)
- Stores frequently used data in memory
- Removes least recently used items
- Reduces database load

---

### 7. BST (Search System)
- Efficient searching (O(log n))
- Used in indexing and autocomplete systems

---

### 8. Recursion (File System Traversal)
- Tree-based directory traversal
- Used in IDEs and file explorers

---

## 🔥 Key Concepts Demonstrated

- Event-driven architecture in Node.js
- Asynchronous programming (async/await)
- Memory optimization techniques
- Time complexity awareness (O(1), O(log n), O(n))
- Backend system design thinking

---

## 🧪 How to Run

### Clone repository
```bash
git clone https://github.com/Maryam-Skaik/nodejs-data-structures-backend-simulator.git
```

### Run project

```bash
node index.js
```

---

## 📚 Learning Outcomes

- How data structures are used in real backend systems  
- How Node.js handles asynchronous workloads  
- Why caching improves system performance  
- How rate limiting protects APIs  
- How search systems use tree-based structures  
- How recursion is applied in file system traversal  

---

## 📎 License

This project is for educational purposes only.
