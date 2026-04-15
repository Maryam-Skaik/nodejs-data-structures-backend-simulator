/**
 * =========================================================
 * DATA STRUCTURES IN NODE.JS (REAL BACKEND SYSTEM DESIGN)
 * =========================================================
 *
 * This file is not an academic DS implementation.
 * It simulates how real backend systems (like Netflix, GitHub,
 * Stripe, VSCode, Redis-based systems) internally use
 * data structures to handle scalability and performance.
 *
 * Each structure is explained in terms of:
 * - REAL production usage
 * - WHY it is chosen over alternatives
 * - HOW it interacts with Node.js event loop
 * =========================================================
 */

/////////////////////////////////////////////////////////////
// 1. CIRCULAR BUFFER (LOGGING SYSTEM IN SERVERS)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Every backend system (like Express APIs, microservices,
 * monitoring tools like Datadog) generates logs continuously.
 *
 * PROBLEM:
 * If we store logs in a normal array:
 * - memory grows forever
 * - system eventually crashes
 *
 * SOLUTION:
 * Circular Buffer (fixed-size memory structure)
 * - keeps ONLY last N logs
 * - overwrites old logs automatically
 *
 * REAL SYSTEM EXAMPLE:
 * - server logs rotation (Linux kernel logs)
 * - Netflix streaming telemetry logs
 */

class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size);
    this.size = size;
    this.start = 0;
    this.count = 0;
  }

  add(value) {
    const index = (this.start + this.count) % this.size;
    this.buffer[index] = value;

    if (this.count < this.size) {
      this.count++;
    } else {
      // oldest log is removed automatically
      this.start = (this.start + 1) % this.size;
    }
  }

  getAll() {
    const result = [];

    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[(this.start + i) % this.size]);
    }

    return result;
  }
}

/////////////////////////////////////////////////////////////
// 2. LINKED LIST (DYNAMIC TASK / DATA PIPELINE)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Linked lists are used internally in:
 * - memory allocators
 * - task scheduling systems
 * - blockchain-like structures (chains of blocks)
 *
 * WHY NOT ARRAY?
 * Array requires shifting elements (O(n)) when inserting/removing
 *
 * WHY LINKED LIST?
 * - insertion is O(1) if node is known
 * - memory is dynamically allocated
 *
 * REAL SYSTEM EXAMPLE:
 * - job pipeline systems (task queues)
 * - request chaining middleware systems (Express-like flow)
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      return;
    }

    let cur = this.head;

    while (cur.next) cur = cur.next;

    cur.next = node;
  }

  print() {
    let cur = this.head;
    const out = [];

    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }

    console.log("LinkedList:", out.join(" -> "));
  }
}

/////////////////////////////////////////////////////////////
// 3. STACK (UNDO / REDO LIKE REAL APPLICATIONS)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Stack is used in:
 * - VSCode / Photoshop undo system
 * - browser back/forward navigation
 * - function call stack in JavaScript runtime
 *
 * WHY STACK?
 * Because we need LIFO:
 * last action = first to undo
 */

class Stack {
  constructor() {
    this.items = [];
  }

  push(v) {
    this.items.push(v);
  }

  pop() {
    return this.items.pop();
  }
}

class UndoRedoSystem {
  constructor() {
    this.undoStack = new Stack();
    this.redoStack = new Stack();
  }

  /**
   * Every user action is stored in undo stack
   * When undo happens, it moves to redo stack
   */
  do(action) {
    this.undoStack.push(action);
    this.redoStack = new Stack();
  }

  undo() {
    const action = this.undoStack.pop();

    if (action) {
      this.redoStack.push(action);
    }

    return action;
  }

  redo() {
    const action = this.redoStack.pop();

    if (action) {
      this.undoStack.push(action);
    }

    return action;
  }
}

/////////////////////////////////////////////////////////////
// 4. QUEUE (NODE.JS BACKGROUND JOB SYSTEM)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Every modern backend uses queues:
 * - email sending (Gmail backend)
 * - payment processing (Stripe)
 * - notifications (WhatsApp / Facebook)
 *
 * WHY QUEUE?
 * Node.js is single-threaded.
 * We MUST avoid blocking event loop.
 * So tasks are queued and processed asynchronously.
 */

class JobQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  add(job) {
    this.queue.push(job);

    // simulate event loop scheduling
    this.process();
  }

  async process() {
    if (this.processing) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();

      /**
       * Simulating REAL async operation:
       * - sending email
       * - DB write
       * - API request
       */
      await new Promise(res => setTimeout(res, 800));

      console.log("Processed job:", job);
    }

    this.processing = false;
  }
}

/////////////////////////////////////////////////////////////
// 5. RATE LIMITER (API SECURITY SYSTEM)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Used in:
 * - GitHub API
 * - OpenAI API
 * - Stripe API
 *
 * PROBLEM:
 * One user can spam requests and crash backend
 *
 * SOLUTION:
 * Sliding window using queue of timestamps
 */

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.users = new Map();
  }

  isAllowed(userId) {
    const now = Date.now();

    if (!this.users.has(userId)) {
      this.users.set(userId, []);
    }

    const requests = this.users.get(userId);

    // remove old requests outside time window
    while (requests.length && now - requests[0] > this.windowMs) {
      requests.shift();
    }

    if (requests.length < this.limit) {
      requests.push(now);
      return true;
    }

    return false;
  }
}

/////////////////////////////////////////////////////////////
// 6. LRU CACHE (REAL DATABASE OPTIMIZATION SYSTEM)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Used in:
 * - Redis caching concept
 * - backend API response caching
 * - database query optimization
 *
 * PROBLEM:
 * DB calls are expensive (slow)
 *
 * SOLUTION:
 * Cache recent results in memory
 *
 * WHY LRU?
 * - keeps most recently used data
 * - removes least used automatically
 */

class DLLNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = new DLLNode(null, null);
    this.tail = new DLLNode(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  add(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return null;

    const node = this.map.get(key);

    this.remove(node);
    this.add(node);

    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.remove(this.map.get(key));
    }

    const node = new DLLNode(key, value);
    this.add(node);
    this.map.set(key, node);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this.remove(lru);
      this.map.delete(lru.key);
    }
  }
}

/////////////////////////////////////////////////////////////
// 7. BST (SEARCH ENGINE / AUTOCOMPLETE SYSTEM)
/////////////////////////////////////////////////////////////

/**
 * REAL USE CASE:
 * Used in:
 * - autocomplete systems (Google search)
 * - indexing systems
 *
 * WHY BST?
 * - faster search than array (O(log n))
 * - keeps data sorted logically
 */

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new TreeNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    let cur = this.root;

    while (true) {
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = node;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = node;
          return;
        }
        cur = cur.right;
      }
    }
  }

  search(value) {
    let cur = this.root;

    while (cur) {
      if (cur.value === value) return true;

      cur = value < cur.value ? cur.left : cur.right;
    }

    return false;
  }
}

/////////////////////////////////////////////////////////////
// 8. RECURSION (FILE SYSTEM INDEXING LIKE VS CODE)
/////////////////////////////////////////////////////////////

const fs = require("fs/promises");
const path = require("path");

/**
 * REAL USE CASE:
 * - file explorers (VSCode, IDE search)
 * - indexing engines
 *
 * WHY RECURSION?
 * File system is a TREE structure:
 * folders → subfolders → files
 */

async function scan(dir) {
  const items = await fs.readdir(dir);

  for (const item of items) {
    const full = path.join(dir, item);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) {
      await scan(full);
    } else {
      console.log("File:", full);
    }
  }
}

/////////////////////////////////////////////////////////////
// 9. FINAL DEMO (REAL BACKEND SIMULATION)
/////////////////////////////////////////////////////////////

async function run() {

  console.log("\n=== Circular Buffer (Logs System) ===");

  const logs = new CircularBuffer(3);
  logs.add("API request 1");
  logs.add("API request 2");
  logs.add("API request 3");
  logs.add("API request 4 (overwrites old)");

  console.log(logs.getAll());

  console.log("\n=== Job Queue (Email System Simulation) ===");

  const queue = new JobQueue();
  queue.add("send welcome email");
  queue.add("send verification email");

  console.log("\n=== Rate Limiter (API Protection) ===");

  const rl = new RateLimiter(2, 5000);
  console.log(rl.isAllowed("user1"));
  console.log(rl.isAllowed("user1"));
  console.log(rl.isAllowed("user1")); // blocked

  console.log("\n=== LRU Cache (Database Optimization) ===");

  const cache = new LRUCache(2);
  cache.put("user:1", { name: "Tia" });
  cache.put("user:2", { name: "Tima" });

  console.log(cache.get("user:1"));

  console.log("\n=== BST (Search System) ===");

  const bst = new BST();
  bst.insert(10);
  bst.insert(5);
  bst.insert(15);

  console.log(bst.search(15));

  console.log("\n=== Stack (Undo System) ===");

  const editor = new UndoRedoSystem();
  editor.do("type A");
  editor.do("type B");

  console.log(editor.undo());
  console.log(editor.redo());
}

run();