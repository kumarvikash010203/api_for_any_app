# Todo Application API Documentation

Base URL: `http://localhost:4000`

## Authentication
All API requests require authentication using JWT token.
Include the token in the request header:
```
x-auth-token: your_jwt_token
```

## Task Management APIs

### 1. Get All Tasks
**URL:** `GET http://localhost:4000/api/tasks`  
**Description:** Saare tasks fetch karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": "user_id",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 2. Create New Task
**URL:** `POST http://localhost:4000/api/tasks`  
**Description:** New task create karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-07-25T10:00:00.000Z",
  "category": "category_id",
  "completed": false
}
```

**Response Example:**
```json
{
  "_id": "task_id",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "dueDate": "2023-07-25T10:00:00.000Z",
  "category": {
    "_id": "category_id",
    "name": "Category name",
    "color": "#3498db"
  },
  "user": "user_id",
  "createdAt": "2023-07-20T10:00:00.000Z",
  "updatedAt": "2023-07-20T10:00:00.000Z"
}
```

### 3. Update Task
**URL:** `PUT http://localhost:4000/api/tasks/{id}`  
**Description:** Existing task update karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "dueDate": "2023-07-30T10:00:00.000Z",
  "category": "category_id",
  "completed": true
}
```

**Response Example:**
```json
{
  "_id": "task_id",
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true,
  "dueDate": "2023-07-30T10:00:00.000Z",
  "category": {
    "_id": "category_id",
    "name": "Category name",
    "color": "#3498db"
  },
  "user": "user_id",
  "createdAt": "2023-07-20T10:00:00.000Z",
  "updatedAt": "2023-07-25T10:00:00.000Z"
}
```

### 4. Delete Task
**URL:** `DELETE http://localhost:4000/api/tasks/{id}`  
**Description:** Task delete karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "message": "Task deleted successfully"
}
```

### 5. Get Completed Tasks
**URL:** `GET http://localhost:4000/api/tasks/completed`  
**Description:** Completed tasks dekhne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Completed task",
    "description": "Description",
    "completed": true,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": "user_id",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 6. Get Tasks by Date
**URL:** `GET http://localhost:4000/api/tasks/date/{date}`  
**Description:** Kisi specific date ke tasks dekhne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**URL Parameters:**
- `date`: "2023-07-25" (Format: YYYY-MM-DD)

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Task for specific date",
    "description": "Description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": "user_id",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 7. Get Tasks by Date Range
**URL:** `GET http://localhost:4000/api/tasks/range/{startDate}/{endDate}`  
**Description:** Date range ke tasks dekhne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**URL Parameters:**
- `startDate`: "2023-07-01" (Format: YYYY-MM-DD)
- `endDate`: "2023-07-31" (Format: YYYY-MM-DD)

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Task within date range",
    "description": "Description",
    "completed": false,
    "dueDate": "2023-07-15T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": "user_id",
    "createdAt": "2023-07-10T10:00:00.000Z",
    "updatedAt": "2023-07-10T10:00:00.000Z"
  }
]
```

## Category APIs

### 1. Get All Categories
**URL:** `GET http://localhost:4000/api/categories`  
**Description:** Saari categories fetch karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "category_id",
    "name": "Category name",
    "color": "#3498db",
    "user": "user_id",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 2. Create New Category
**URL:** `POST http://localhost:4000/api/categories`  
**Description:** New category create karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "name": "Category name",
  "color": "#3498db"
}
```

**Response Example:**
```json
{
  "_id": "category_id",
  "name": "Category name",
  "color": "#3498db",
  "user": "user_id",
  "createdAt": "2023-07-20T10:00:00.000Z",
  "updatedAt": "2023-07-20T10:00:00.000Z"
}
```

### 3. Update Category
**URL:** `PUT http://localhost:4000/api/categories/{id}`  
**Description:** Category update karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "name": "Updated category name",
  "color": "#e74c3c"
}
```

**Response Example:**
```json
{
  "_id": "category_id",
  "name": "Updated category name",
  "color": "#e74c3c",
  "user": "user_id",
  "createdAt": "2023-07-20T10:00:00.000Z",
  "updatedAt": "2023-07-25T10:00:00.000Z"
}
```

### 4. Delete Category
**URL:** `DELETE http://localhost:4000/api/categories/{id}`  
**Description:** Category delete karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "message": "Category deleted successfully"
}
```

## User Management APIs

### 1. Search Users
**URL:** `GET http://localhost:4000/api/users/search?query=search_term`  
**Description:** Dusre users ko search karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Query Parameters:**
- `query`: Search term to find users

**Response Example:**
```json
[
  {
    "id": "user_id",
    "fullName": "User Name",
    "email": "user@example.com",
    "username": "username"
  }
]
```

## Task Assignment APIs

### 1. Assign Task to User
**URL:** `POST http://localhost:4000/api/assignments/assign`  
**Description:** Kisi task ko dusre user ko assign karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "taskId": "task_id",
  "assigneeId": "user_id",
  "message": "Please complete this task"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Task assigned successfully",
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": "owner_user_id",
    "assignedTo": {
      "_id": "assignee_user_id",
      "name": "Assignee Name",
      "email": "assignee@example.com"
    },
    "assignedBy": {
      "_id": "assigner_user_id",
      "name": "Assigner Name",
      "email": "assigner@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
}
```

### 2. Get Tasks Assigned to Me
**URL:** `GET http://localhost:4000/api/assignments/assigned-to-me`  
**Description:** Mujhe assign kiye gaye tasks dekhne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": {
      "_id": "owner_user_id",
      "name": "Owner Name",
      "email": "owner@example.com"
    },
    "assignedBy": {
      "_id": "assigner_user_id",
      "name": "Assigner Name",
      "email": "assigner@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 3. Get Tasks Assigned by Me
**URL:** `GET http://localhost:4000/api/assignments/assigned-by-me`  
**Description:** Maine dusro ko assign kiye gaye tasks dekhne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": {
      "_id": "owner_user_id",
      "name": "Owner Name",
      "email": "owner@example.com"
    },
    "assignedTo": {
      "_id": "assignee_user_id",
      "name": "Assignee Name",
      "email": "assignee@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 4. Update Assignment Status
**URL:** `PUT http://localhost:4000/api/assignments/{id}/status`  
**Description:** Assigned task ka status update karne ke liye (accept/reject/complete)  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "status": "accepted", // or "rejected" or "completed"
  "message": "I will complete it"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Assignment status updated to accepted",
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2023-07-25T10:00:00.000Z",
    "category": {
      "_id": "category_id",
      "name": "Category name",
      "color": "#3498db"
    },
    "user": {
      "_id": "owner_user_id",
      "name": "Owner Name",
      "email": "owner@example.com"
    },
    "assignedTo": {
      "_id": "assignee_user_id",
      "name": "Assignee Name",
      "email": "assignee@example.com"
    },
    "assignedBy": {
      "_id": "assigner_user_id",
      "name": "Assigner Name",
      "email": "assigner@example.com"
    },
    "assignmentStatus": "accepted",
    "assignmentMessage": "Please complete this task",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
}
```

## Notification APIs

### 1. Get All Notifications
**URL:** `GET http://localhost:4000/api/notifications`  
**Description:** User ke notifications fetch karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "notification_id",
    "type": "task_assigned",
    "message": "User Name has assigned you a task: Task Title",
    "relatedTask": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description"
    },
    "fromUser": {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    },
    "read": false,
    "createdAt": "2023-07-20T10:00:00.000Z"
  }
]
```

### 2. Mark Notification as Read
**URL:** `PUT http://localhost:4000/api/notifications/{id}/mark-read`  
**Description:** Notification ko read mark karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### 3. Mark All Notifications as Read
**URL:** `PUT http://localhost:4000/api/notifications/mark-all-read`  
**Description:** Saare notifications ko read mark karne ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### 4. Get Unread Notification Count
**URL:** `GET http://localhost:4000/api/notifications/unread-count`  
**Description:** Unread notifications ki count ke liye  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "count": 5
}
``` 