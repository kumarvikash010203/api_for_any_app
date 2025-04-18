# Task Assignment & Collaboration Features

This document explains how to use the task assignment features in the Todo application API. These features allow users to assign tasks to other users, track assigned tasks, and receive notifications.

## Base URL
`http://localhost:4000`

## Authentication
All API requests require authentication using JWT token.
Include the token in the request header:
```
x-auth-token: your_jwt_token
```

## 1. Finding Users to Assign Tasks

### Search Users
**URL:** `GET http://localhost:4000/api/users/search?query=search_term`  
**Description:** Search for users by name, email, or username  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Query Parameters:**
- `query`: Text to search for users (e.g., "john" or "gmail")

**Response Example:**
```json
[
  {
    "id": "6800dcfeb2a7007ce7882a39",
    "fullName": "Vikash Sharma",
    "email": "vikash@example.com",
    "username": "vikash_s"
  },
  {
    "id": "6800e54522af123de7125f28",
    "fullName": "John Smith",
    "email": "john@example.com",
    "username": "john_s"
  }
]
```

## 2. Assigning Tasks

### Assign Task to User
**URL:** `POST http://localhost:4000/api/assignments/assign`  
**Description:** Assign an existing task to another user  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "taskId": "6801f0b4f0ef3bea612bba72",
  "assigneeId": "6800e54522af123de7125f28",
  "message": "Please complete this task by tomorrow"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Task assigned successfully",
  "task": {
    "_id": "6801f0b4f0ef3bea612bba72",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2025-04-19T06:26:00.000Z",
    "category": {
      "_id": "6801f055f0ef3bea612bba67",
      "name": "General",
      "color": "#3498db"
    },
    "user": "6800dcfeb2a7007ce7882a39",
    "assignedTo": {
      "_id": "6800e54522af123de7125f28",
      "name": "John Smith",
      "email": "john@example.com"
    },
    "assignedBy": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task by tomorrow",
    "createdAt": "2025-04-18T06:27:00.718Z",
    "updatedAt": "2025-04-18T06:27:00.718Z"
  }
}
```

## 3. Managing Assigned Tasks

### View Tasks Assigned to Me
**URL:** `GET http://localhost:4000/api/assignments/assigned-to-me`  
**Description:** View all tasks that have been assigned to you  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "6801f0b4f0ef3bea612bba72",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2025-04-19T06:26:00.000Z",
    "category": {
      "_id": "6801f055f0ef3bea612bba67",
      "name": "General",
      "color": "#3498db"
    },
    "user": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignedBy": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task by tomorrow",
    "createdAt": "2025-04-18T06:27:00.718Z",
    "updatedAt": "2025-04-18T06:27:00.718Z"
  }
]
```

### View Tasks Assigned by Me
**URL:** `GET http://localhost:4000/api/assignments/assigned-by-me`  
**Description:** View all tasks that you have assigned to others  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "6801f0b4f0ef3bea612bba72",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2025-04-19T06:26:00.000Z",
    "category": {
      "_id": "6801f055f0ef3bea612bba67",
      "name": "General",
      "color": "#3498db"
    },
    "user": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignedTo": {
      "_id": "6800e54522af123de7125f28",
      "name": "John Smith",
      "email": "john@example.com"
    },
    "assignmentStatus": "pending",
    "assignmentMessage": "Please complete this task by tomorrow",
    "createdAt": "2025-04-18T06:27:00.718Z",
    "updatedAt": "2025-04-18T06:27:00.718Z"
  }
]
```

### Update Assignment Status (Accept/Reject/Complete)
**URL:** `PUT http://localhost:4000/api/assignments/{task_id}/status`  
**Description:** Update the status of a task assigned to you  
**Headers:**  
- `x-auth-token: your_jwt_token`  
**Request Body:**
```json
{
  "status": "accepted",
  "message": "I'll finish it by tomorrow"
}
```

**Valid Status Values:**
- `accepted` - Accept the task assignment
- `rejected` - Decline the task assignment
- `completed` - Mark the assigned task as completed

**Response Example:**
```json
{
  "success": true,
  "message": "Assignment status updated to accepted",
  "task": {
    "_id": "6801f0b4f0ef3bea612bba72",
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "dueDate": "2025-04-19T06:26:00.000Z",
    "category": {
      "_id": "6801f055f0ef3bea612bba67",
      "name": "General",
      "color": "#3498db"
    },
    "user": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignedTo": {
      "_id": "6800e54522af123de7125f28",
      "name": "John Smith",
      "email": "john@example.com"
    },
    "assignedBy": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "assignmentStatus": "accepted",
    "assignmentMessage": "Please complete this task by tomorrow",
    "createdAt": "2025-04-18T06:27:00.718Z",
    "updatedAt": "2025-04-18T10:15:20.000Z"
  }
}
```

## 4. Notifications System

### Get All Notifications
**URL:** `GET http://localhost:4000/api/notifications`  
**Description:** View all your notifications (task assignments, status updates, etc.)  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
[
  {
    "_id": "notification_id",
    "type": "task_assigned",
    "message": "Vikash Sharma has assigned you a task: Task title",
    "relatedTask": {
      "_id": "6801f0b4f0ef3bea612bba72",
      "title": "Task title",
      "description": "Task description"
    },
    "fromUser": {
      "_id": "6800dcfeb2a7007ce7882a39",
      "name": "Vikash Sharma",
      "email": "vikash@example.com"
    },
    "read": false,
    "createdAt": "2025-04-18T06:27:30.000Z"
  },
  {
    "_id": "notification_id_2",
    "type": "assignment_accepted",
    "message": "John Smith has accepted your task: Task title",
    "relatedTask": {
      "_id": "6801f0b4f0ef3bea612bba72",
      "title": "Task title",
      "description": "Task description"
    },
    "fromUser": {
      "_id": "6800e54522af123de7125f28",
      "name": "John Smith",
      "email": "john@example.com"
    },
    "read": false,
    "createdAt": "2025-04-18T10:15:25.000Z"
  }
]
```

### Get Unread Notification Count
**URL:** `GET http://localhost:4000/api/notifications/unread-count`  
**Description:** Get the count of unread notifications  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "count": 2
}
```

### Mark Notification as Read
**URL:** `PUT http://localhost:4000/api/notifications/{notification_id}/mark-read`  
**Description:** Mark a specific notification as read  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All Notifications as Read
**URL:** `PUT http://localhost:4000/api/notifications/mark-all-read`  
**Description:** Mark all your notifications as read  
**Headers:**  
- `x-auth-token: your_jwt_token`

**Response Example:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

## 5. Workflow Examples

### Example 1: Assign a Task to a Team Member

1. **Search for the user**
   ```
   GET http://localhost:4000/api/users/search?query=john
   ```

2. **Assign a task to the user**
   ```
   POST http://localhost:4000/api/assignments/assign
   Body: {
     "taskId": "6801f0b4f0ef3bea612bba72",
     "assigneeId": "6800e54522af123de7125f28",
     "message": "Please complete this task by tomorrow"
   }
   ```

3. **The assignee receives a notification**
   ```
   GET http://localhost:4000/api/notifications
   ```

### Example 2: Accept and Complete an Assigned Task

1. **View tasks assigned to you**
   ```
   GET http://localhost:4000/api/assignments/assigned-to-me
   ```

2. **Accept the task**
   ```
   PUT http://localhost:4000/api/assignments/6801f0b4f0ef3bea612bba72/status
   Body: {
     "status": "accepted",
     "message": "I'll finish it by tomorrow"
   }
   ```

3. **Complete the task**
   ```
   PUT http://localhost:4000/api/assignments/6801f0b4f0ef3bea612bba72/status
   Body: {
     "status": "completed",
     "message": "Task has been completed"
   }
   ```

4. **The task owner receives a notification** 