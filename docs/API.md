# TaskFlow API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All endpoints except `/auth/login` and `/auth/register` require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

The token is returned from the login endpoint and should be stored in localStorage.

## Status Codes

- `200`: Successful request
- `201`: Resource created
- `204`: No content (successful deletion)
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing or invalid token)
- `404`: Resource not found
- `500`: Server error

## Endpoints

### Authentication

#### POST /auth/login

Authenticate a user and get JWT token.

**Request Body:**
```json
{
  "username": "demo",
  "password": "demo"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "demo",
    "email": "demo@taskflow.local",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error (401):**
```json
{
  "error": "Invalid credentials"
}
```

#### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "user@taskflow.local",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "id": 2,
  "username": "newuser",
  "email": "user@taskflow.local",
  "created_at": "2024-01-02T00:00:00.000Z"
}
```

**Error (400):**
```json
{
  "error": "Username already exists"
}
```

### Projects

#### GET /projects

Get all projects.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Redesign the company website",
    "user_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Mobile App",
    "description": "Build a mobile app for iOS and Android",
    "user_id": 1,
    "created_at": "2024-01-02T00:00:00.000Z"
  }
]
```

#### GET /projects/:id

Get a specific project by ID.

**Response (200):**
```json
{
  "id": 1,
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

**Error (404):**
```json
{
  "error": "Project not found"
}
```

#### GET /projects/user/me

Get current user's projects (requires authentication).

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Redesign the company website",
    "user_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /projects

Create a new project (requires authentication).

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description"
}
```

**Response (201):**
```json
{
  "id": 4,
  "name": "New Project",
  "description": "Project description",
  "user_id": 1,
  "created_at": "2024-01-05T00:00:00.000Z"
}
```

**Error (400):**
```json
{
  "error": "Project name is required"
}
```

#### PUT /projects/:id

Update a project (requires authentication).

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Updated Project Name",
  "description": "Updated description",
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /projects/:id

Delete a project (requires authentication).

**Response (204):**
No content

### Tasks

#### GET /tasks

Get all tasks.

**Query Parameters:**
- `projectId` (optional): Filter tasks by project

**Response (200):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "title": "Create wireframes",
    "description": "Design wireframes for new layout",
    "status": "done",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "project_id": 1,
    "title": "Implement homepage",
    "description": "Build homepage component",
    "status": "in_progress",
    "created_at": "2024-01-02T00:00:00.000Z",
    "updated_at": "2024-01-02T10:00:00.000Z"
  }
]
```

#### GET /tasks/:id

Get a specific task by ID.

**Response (200):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Create wireframes",
  "description": "Design wireframes for new layout",
  "status": "done",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T12:00:00.000Z"
}
```

#### GET /tasks/project/:projectId

Get all tasks for a specific project.

**Response (200):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "title": "Create wireframes",
    "description": "Design wireframes for new layout",
    "status": "done",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
]
```

#### GET /tasks/stats/dashboard

Get dashboard statistics for all tasks.

**Response (200):**
```json
{
  "totalProjects": 3,
  "totalTasks": 9,
  "tasksByStatus": [
    {
      "status": "todo",
      "count": 3
    },
    {
      "status": "in_progress",
      "count": 3
    },
    {
      "status": "done",
      "count": 3
    }
  ]
}
```

#### POST /tasks

Create a new task (requires authentication).

**Request Body:**
```json
{
  "projectId": 1,
  "title": "New Task",
  "description": "Task description",
  "status": "todo"
}
```

**Response (201):**
```json
{
  "id": 10,
  "project_id": 1,
  "title": "New Task",
  "description": "Task description",
  "status": "todo",
  "created_at": "2024-01-05T00:00:00.000Z",
  "updated_at": "2024-01-05T00:00:00.000Z"
}
```

**Error (400):**
```json
{
  "error": "Task title is required"
}
```

#### PUT /tasks/:id

Update a task (requires authentication).

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "in_progress"
}
```

**Response (200):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "in_progress",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-05T00:00:00.000Z"
}
```

#### PUT /tasks/:id/status

Update only the task status (requires authentication).

**Request Body:**
```json
{
  "status": "done"
}
```

**Response (200):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Create wireframes",
  "description": "Design wireframes for new layout",
  "status": "done",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-05T00:00:00.000Z"
}
```

**Error (400):**
```json
{
  "error": "Invalid status"
}
```

Valid status values: `todo`, `in_progress`, `done`

#### DELETE /tasks/:id

Delete a task (requires authentication).

**Response (204):**
No content

### Health Check

#### GET /health

Check if the API is running.

**Response (200):**
```json
{
  "status": "ok"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error messages:
- `Invalid credentials` - Wrong username or password
- `No token provided` - Missing Authorization header
- `Invalid or expired token` - JWT token is invalid or expired
- `Unauthorized` - User not authenticated
- `[Resource] not found` - Resource doesn't exist
- `[Field] is required` - Missing required field
- `Invalid status` - Status value not in allowed list

## Rate Limiting

Currently, the API does not implement rate limiting. This is a planned enhancement.

## Pagination

The current implementation returns all results. Pagination may be added in future versions.

## Filtering

Basic filtering is available:
- Projects by user ID
- Tasks by project ID
- Tasks by status

More advanced filtering will be added in future versions.

## CORS

The API has CORS enabled for all origins in development mode. In production, configure `CORS_ORIGIN` environment variable.

## Request Size Limits

- JSON payload: 100KB (default Express limit)
- Text payload: 100KB (default Express limit)

## Response Times

- Database queries: <100ms average
- API response: <200ms average (including database query)

## Versioning

Current API version: **v1** (no version prefix in URLs)

Future versions may use `/api/v2/`, `/api/v3/`, etc.

## Examples

### Login and Create Project

```bash
# Step 1: Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo"}'

# Response includes token
# Save token for next request

# Step 2: Create Project (use token from login)
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"My Project","description":"A new project"}'
```

### Get Tasks by Status

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Get tasks for a project
curl http://localhost:5000/api/tasks/project/1

# Get dashboard statistics
curl http://localhost:5000/api/tasks/stats/dashboard
```

### Update Task Status

```bash
curl -X PUT http://localhost:5000/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"status":"in_progress"}'
```

## Troubleshooting

### 401 Unauthorized
- Check token is included in Authorization header
- Check token format: `Bearer <token>`
- Check token hasn't expired
- Try logging in again to get a new token

### 404 Not Found
- Verify the resource ID exists
- Check the endpoint URL is correct
- Check HTTP method (GET, POST, PUT, DELETE)

### 400 Bad Request
- Check request body has required fields
- Check data types match expected format
- Check enum values (e.g., status must be todo/in_progress/done)

### 500 Server Error
- Check server logs
- Verify database connection
- Check request payload for invalid data

---

Last Updated: 2024
API Version: v1
