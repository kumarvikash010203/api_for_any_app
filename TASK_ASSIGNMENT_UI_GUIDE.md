# Task Assignment UI Implementation Guide

This guide provides a detailed overview of the UI screens needed to implement the task assignment feature in your Todo application.

## UI Flow Overview

1. User views a task and clicks "Assign Task"
2. User searches for and selects another user
3. User adds a message and assigns the task
4. Assignee receives notification and can accept/reject
5. Both users can track assignment status

## Screen Designs

### 1. Task Detail Screen

This is the main task view where users can see task details and choose to assign it to someone else.

```
+--------------------------------------+
| Task: Complete Project Report       X |
| ------------------------------------- |
| Description:                          |
| Prepare quarterly report with graphs  |
| ------------------------------------- |
| Due Date: 25 Apr, 2025                |
| Category: General                     |
| Status: Pending                       |
| ------------------------------------- |
|                                       |
| [Edit Task]        [Delete Task]      |
|                                       |
| [✓ Mark Complete]  [🔔 Assign Task]   |
+--------------------------------------+
```

**Implementation Notes:**
- Add an "Assign Task" button to your existing task detail screen
- If the task is already assigned, show assignment details instead
- Show assignment status if applicable

### 2. Assign Task Screen

This appears after clicking "Assign Task" - allows searching for users.

```
+--------------------------------------+
| Assign Task                        X |
| ------------------------------------- |
| Search Users:                         |
| 🔍 [_________________________]        |
|                                       |
| Recent Users:                         |
| 👤 John Smith                         |
| 👤 Priya Kumar                        |
| 👤 David Wilson                       |
|                                       |
| Add Message (optional):               |
| [_________________________]           |
|                                       |
| [Cancel]             [Assign]         |
+--------------------------------------+
```

**Implementation Notes:**
- Implement real-time search as user types
- Show recent users the current user has interacted with
- Message field is optional but recommended

### 3. Search Results Screen

Shows results when user types in the search box.

```
+--------------------------------------+
| Search Results: "john"             X |
| ------------------------------------- |
| 👤 John Smith                         |
|   john@example.com                    |
|   [Select]                            |
| ------------------------------------- |
| 👤 Johnny Walker                      |
|   johnny@example.com                  |
|   [Select]                            |
| ------------------------------------- |
| 👤 Johnson Lee                        |
|   johnson@example.com                 |
|   [Select]                            |
+--------------------------------------+
```

**Implementation Notes:**
- Use the `/api/users/search?query=` API
- Show name and email for clear identification
- When user selects someone, highlight the selection

### 4. Assigned Tasks Tab

A new tab in your app to show tasks assigned to/by the user.

```
+--------------------------------------+
| Tasks    Assigned    Notifications   |
| ------------------------------------- |
| Assigned To Me (2)                   |
| ------------------------------------- |
| 📋 Update Website                     |
|   Assigned by: Vikash Sharma         |
|   Due: Tomorrow                       |
|   [Accept] [Reject]                   |
| ------------------------------------- |
| 📋 Create Presentation                |
|   Assigned by: John Smith            |
|   Due: 28 Apr, 2025                   |
|   [View Details]                      |
| ------------------------------------- |
|                                       |
| Assigned By Me (3)                   |
| ------------------------------------- |
| 📋 Data Analysis                      |
|   Assigned to: David Wilson          |
|   Status: Pending                     |
|   [View Details]                      |
+--------------------------------------+
```

**Implementation Notes:**
- Use these API endpoints:
  - `/api/assignments/assigned-to-me`
  - `/api/assignments/assigned-by-me`
- Add status indicators (pending, accepted, rejected, completed)
- Allow direct actions from this screen

### 5. Task Assignment Details

Detailed view of an assigned task with actions.

```
+--------------------------------------+
| Assignment Details                 X |
| ------------------------------------- |
| Task: Create Presentation            |
| ------------------------------------- |
| Assigned by: John Smith              |
| Assigned on: 18 Apr, 2025            |
| Due date: 28 Apr, 2025               |
| ------------------------------------- |
| Message:                              |
| "Please prepare a slide deck with     |
|  company data for client meeting"     |
| ------------------------------------- |
| Status: Accepted                      |
|                                       |
| [Mark Completed]                      |
+--------------------------------------+
```

**Implementation Notes:**
- Show full assignment history and details
- Available actions depend on user role and status:
  - Assignee: Accept/Reject if pending, Mark Complete if accepted
  - Assigner: Revoke assignment, View status updates

### 6. Notifications Screen

Shows all notifications including task assignments.

```
+--------------------------------------+
| Tasks    Assigned    Notifications 🔴 |
| ------------------------------------- |
| Today                                |
| ------------------------------------- |
| 🔔 John Smith assigned you a task     |
|   "Create Presentation"               |
|   10:45 AM                            |
| ------------------------------------- |
| 🔔 David Wilson completed the task    |
|   "Data Analysis"                     |
|   9:20 AM                             |
| ------------------------------------- |
| Earlier                              |
| ------------------------------------- |
| 🔔 Priya Kumar accepted your task     |
|   "Update Website"                    |
|   Yesterday                           |
| ------------------------------------- |
|                                       |
| [Mark All as Read]                    |
+--------------------------------------+
```

**Implementation Notes:**
- Use the `/api/notifications` endpoint
- Group by date (Today, Yesterday, Earlier)
- Show unread indicator with count
- Allow marking individual or all notifications as read

## API Integration

### Task Assignment

```dart
// Assign a task
Future<bool> assignTask(String taskId, String assigneeId, String message) async {
  try {
    final response = await http.post(
      Uri.parse('$baseUrl/api/assignments/assign'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
      body: jsonEncode({
        'taskId': taskId,
        'assigneeId': assigneeId,
        'message': message,
      }),
    );
    
    return response.statusCode == 200;
  } catch (e) {
    print('Error assigning task: $e');
    return false;
  }
}

// Update assignment status
Future<bool> updateAssignmentStatus(String taskId, String status, String message) async {
  try {
    final response = await http.put(
      Uri.parse('$baseUrl/api/assignments/$taskId/status'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
      body: jsonEncode({
        'status': status, // 'accepted', 'rejected', or 'completed'
        'message': message,
      }),
    );
    
    return response.statusCode == 200;
  } catch (e) {
    print('Error updating assignment status: $e');
    return false;
  }
}
```

### User Search

```dart
// Search for users
Future<List<User>> searchUsers(String query) async {
  try {
    final response = await http.get(
      Uri.parse('$baseUrl/api/users/search?query=$query'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    );
    
    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((user) => User.fromJson(user)).toList();
    }
    return [];
  } catch (e) {
    print('Error searching users: $e');
    return [];
  }
}
```

### Notifications

```dart
// Get notifications
Future<List<Notification>> getNotifications() async {
  try {
    final response = await http.get(
      Uri.parse('$baseUrl/api/notifications'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    );
    
    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((notification) => Notification.fromJson(notification)).toList();
    }
    return [];
  } catch (e) {
    print('Error getting notifications: $e');
    return [];
  }
}

// Mark notification as read
Future<bool> markNotificationAsRead(String notificationId) async {
  try {
    final response = await http.put(
      Uri.parse('$baseUrl/api/notifications/$notificationId/mark-read'),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    );
    
    return response.statusCode == 200;
  } catch (e) {
    print('Error marking notification as read: $e');
    return false;
  }
}
```

## Model Classes

```dart
// User model
class User {
  final String id;
  final String fullName;
  final String email;
  final String? username;
  
  User({
    required this.id,
    required this.fullName,
    required this.email,
    this.username,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      fullName: json['fullName'],
      email: json['email'],
      username: json['username'],
    );
  }
}

// Assignment model
class TaskAssignment {
  final String taskId;
  final User assignedTo;
  final User assignedBy;
  final String status;
  final String? message;
  final DateTime assignedAt;
  
  TaskAssignment({
    required this.taskId,
    required this.assignedTo,
    required this.assignedBy,
    required this.status,
    this.message,
    required this.assignedAt,
  });
  
  factory TaskAssignment.fromJson(Map<String, dynamic> json) {
    return TaskAssignment(
      taskId: json['taskId'],
      assignedTo: User.fromJson(json['assignedTo']),
      assignedBy: User.fromJson(json['assignedBy']),
      status: json['assignmentStatus'],
      message: json['assignmentMessage'],
      assignedAt: DateTime.parse(json['updatedAt']),
    );
  }
}

// Notification model
class Notification {
  final String id;
  final String type;
  final String message;
  final String? relatedTaskId;
  final User? fromUser;
  final bool read;
  final DateTime createdAt;
  
  Notification({
    required this.id,
    required this.type,
    required this.message,
    this.relatedTaskId,
    this.fromUser,
    required this.read,
    required this.createdAt,
  });
  
  factory Notification.fromJson(Map<String, dynamic> json) {
    return Notification(
      id: json['_id'],
      type: json['type'],
      message: json['message'],
      relatedTaskId: json['relatedTask']?['_id'],
      fromUser: json['fromUser'] != null ? User.fromJson(json['fromUser']) : null,
      read: json['read'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
```

## Implementation Checklist

1. ☐ Update existing Task model to include assignment fields
2. ☐ Create User, TaskAssignment, and Notification models
3. ☐ Add API service methods for task assignment and notifications
4. ☐ Create UI screens according to the designs above
5. ☐ Add navigation between screens
6. ☐ Implement real-time or periodic notification updates
7. ☐ Add status indicators and action buttons based on assignment state
8. ☐ Test the complete flow from task creation to assignment completion 