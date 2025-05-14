// API URLs and Request Bodies

class ApiEndpoints {
  // Base URL
  static const String baseUrl = 'http://192.168.0.21:4000';
  
  // Auth APIs
  static const String signup = '/api/users/signup';
  static const String login = '/api/users/login';
  static const String profile = '/api/users/profile/'; // Append userId
  
  // Task APIs
  static const String tasks = '/api/tasks';
  static const String completedTasks = '/api/tasks/completed';
  static const String tasksByDate = '/api/tasks/date/'; // Append YYYY-MM-DD
  static const String tasksByRange = '/api/tasks/range/'; // Append startDate/endDate
  
  // Category APIs
  static const String categories = '/api/categories';
  
  // Assignment APIs
  static const String assignTask = '/api/assignments/assign';
  static const String assignedToMe = '/api/assignments/assigned-to-me';
  static const String assignedByMe = '/api/assignments/assigned-by-me';
  static const String updateAssignmentStatus = '/api/assignments/'; // Append taskId/status
  
  // Notification APIs
  static const String notifications = '/api/notifications';
  static const String markNotificationRead = '/api/notifications/'; // Append notificationId/mark-read
  static const String markAllNotificationsRead = '/api/notifications/mark-all-read';
  static const String unreadNotificationCount = '/api/notifications/unread-count';
  
  // User Search API
  static const String searchUsers = '/api/users/search'; // Append ?query=searchTerm
}

class ApiRequestBodies {
  // Auth API Request Bodies
  static Map<String, dynamic> signupBody({
    required String fullName,
    required String email,
    required String password,
    String? phoneNumber,
    String? username,
    String? dateOfBirth,
    String? gender,
    String? address,
    String? referralCode,
    String? role,
    // Note: profilePicture is handled as a file
  }) {
    final Map<String, dynamic> body = {
      'fullName': fullName,
      'email': email,
      'password': password,
    };
    
    if (phoneNumber != null) body['phoneNumber'] = phoneNumber;
    if (username != null) body['username'] = username;
    if (dateOfBirth != null) body['dateOfBirth'] = dateOfBirth;
    if (gender != null) body['gender'] = gender;
    if (address != null) body['address'] = address;
    if (referralCode != null) body['referralCode'] = referralCode;
    if (role != null) body['role'] = role;
    
    return body;
  }
  
  static Map<String, dynamic> loginBody({
    required String email,
    required String password,
  }) {
    return {
      'email': email,
      'password': password,
    };
  }
  
  static Map<String, dynamic> updateProfileBody({
    String? fullName,
    String? email,
    String? phoneNumber,
    String? username,
    String? dateOfBirth,
    String? gender,
    String? address,
    // Note: profilePicture is handled as a file
  }) {
    final Map<String, dynamic> body = {};
    
    if (fullName != null) body['fullName'] = fullName;
    if (email != null) body['email'] = email;
    if (phoneNumber != null) body['phoneNumber'] = phoneNumber;
    if (username != null) body['username'] = username;
    if (dateOfBirth != null) body['dateOfBirth'] = dateOfBirth;
    if (gender != null) body['gender'] = gender;
    if (address != null) body['address'] = address;
    
    return body;
  }
  
  // Task API Request Bodies
  static Map<String, dynamic> createTaskBody({
    required String title,
    required String description,
    required DateTime dueDate,
    required String category,
    bool completed = false,
  }) {
    return {
      'title': title,
      'description': description,
      'dueDate': dueDate.toIso8601String(),
      'category': category,
      'completed': completed,
    };
  }
  
  static Map<String, dynamic> updateTaskBody({
    String? title,
    String? description,
    DateTime? dueDate,
    String? category,
    bool? completed,
  }) {
    final Map<String, dynamic> body = {};
    
    if (title != null) body['title'] = title;
    if (description != null) body['description'] = description;
    if (dueDate != null) body['dueDate'] = dueDate.toIso8601String();
    if (category != null) body['category'] = category;
    if (completed != null) body['completed'] = completed;
    
    return body;
  }
  
  // Category API Request Bodies
  static Map<String, dynamic> createCategoryBody({
    required String name,
    required String color,
  }) {
    return {
      'name': name,
      'color': color,
    };
  }
  
  static Map<String, dynamic> updateCategoryBody({
    String? name,
    String? color,
  }) {
    final Map<String, dynamic> body = {};
    
    if (name != null) body['name'] = name;
    if (color != null) body['color'] = color;
    
    return body;
  }
  
  // Assignment API Request Bodies
  static Map<String, dynamic> assignTaskBody({
    required String taskId,
    required String assigneeId,
    String? message,
  }) {
    return {
      'taskId': taskId,
      'assigneeId': assigneeId,
      'message': message ?? '',
    };
  }
  
  static Map<String, dynamic> updateAssignmentStatusBody({
    required String status, // 'accepted', 'rejected', or 'completed'
    String? message,
  }) {
    return {
      'status': status,
      'message': message ?? '',
    };
  }
} 