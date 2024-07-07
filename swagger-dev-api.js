export const swaggeroptions = {
  swagger: "2.0",
  info: {
    description: "API Documentation",
    version: "1.0.0",
    title: "Immverse AI Asignement",
  },
  host: "localhost:8000",
  schemes: ["http"],
  paths: {
    // Register
    "/api/user/register": {
      post: {
        tags: ["User Management"],
        description: "Create user",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Add users",
            schema: {
              $ref: "#/definitions/users",
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "User registered successfully",
                user: {
                  id: "1",
                  name: "Monish Barse",
                  email: "monishbarse9@gmail.com",
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Validation error",
                errors: ["Email is required", "Password is required"],
              },
            },
          },
        },
      },
    },

    // confirmemail
    "/api/user/confirmemail": {
      get: {
        tags: ["User Management"],
        description: "Confirm Email",
        parameters: [
          {
            in: "query",
            name: "query",
            description: "Confirm",
            schema: {
              required: ["id", "token"],
              properties: {
                id: {
                  type: "string",
                  example: "6585ebdb2211cc980f0f27ed",
                },
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NjhhNDY2MTZlN2Q0Y2Q0YTZiNGU2YzgiLCJpYXQiOjE3MjAzMzgwMTcsImV4cCI6MTcyMDc3MDAxN30.kpDhf9hW5YCLH7AfICU1PKi2mCbL0PAehk0HTzoLR2s",
                },
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Email Verified Successfully",
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Email Verification Failed",
              },
            },
          },
        },
      },
    },

    // Login
    "/api/user/login": {
      post: {
        tags: ["User Management"],
        description: "Login user",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Add users",
            schema: {
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "monishbarse9@gmail.com",
                },
                password: {
                  type: "string",
                  example: "Admin@123",
                },
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "User logged in successfully",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Invalid email or password",
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // sendresetpasswordemail
    "/api/user/sendresetpasswordemail": {
      post: {
        tags: ["User Management"],
        description: "Send Reset Password Email",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Confirm",
            schema: {
              required: ["email"],
              properties: {
                email: {
                  type: "string",
                  example: "monishbarse9@gmail.com",
                },
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Password Reset Email Sent... Please Check Your Email",
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Password Reset Failed",
              },
            },
          },
        },
      },
    },

    // changepassword
    "/api/user/changepassword": {
      post: {
        tags: ["User Management"],
        description: "changepassword",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "changepassword",
            schema: {
              required: ["password", "password_confirmation"],
              properties: {
                password: {
                  type: "string",
                  example: "Admin@123",
                },
                password_confirmation: {
                  type: "string",
                  example: "Admin@123",
                },
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Password changed succesfully",
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Password Change Failed",
              },
            },
          },
        },
      },
    },
    // changepassword
    "/api/user/loggeduser": {
      get: {
        tags: ["User Management"],
        description: "changepassword",
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                user: {
                  _id: "654e641a60b0cf413ad79530",
                  name: "monish",
                  email: "monishbarse9@gmail.com",
                  __v: 0,
                  isEmailVerified: true,
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Failed",
              },
            },
          },
        },
      },
    },

    "/api/todo/todoslist": {
      get: {
        tags: ["Todos Management"],
        description: "Get list of todos",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "Page number",
            required: true,
            type: "integer",
            example: 1,
          },
          {
            in: "query",
            name: "pageSize",
            description: "Page size",
            required: true,
            type: "integer",
            example: 10,
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Todos retrieved successfully",
                result: {
                  page: 1,
                  pageSize: 10,
                  totalTodos: 2,
                  totalPages: 1,
                  todos: [
                    {
                      id: "668a758848b87734d1fa62c1",
                      title: "Todo 1",
                      description: "Description of Todo 1",
                      completed: false,
                      userId: "668a758848b87734d1fa62c1",
                      createdAt: "2024-07-07T12:00:00Z",
                      updatedAt: "2024-07-07T12:00:00Z",
                    },
                    {
                      id: "668a758848b87734d1fa62c1",
                      title: "Todo 2",
                      description: "Description of Todo 2",
                      completed: true,
                      userId: "668a758848b87734d1fa62c1",
                      createdAt: "2024-07-07T13:00:00Z",
                      updatedAt: "2024-07-07T14:00:00Z",
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Failed to retrieve todos",
              },
            },
          },
        },
      },
    },
    "/api/todo/createtodo": {
      post: {
        tags: ["Todos Management"],
        description: "Add a new todo",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Todo details",
            schema: {
              required: ["title", "description"],
              properties: {
                title: {
                  type: "string",
                  example: "New Todo",
                },
                description: {
                  type: "string",
                  example: "Description of the new todo",
                }
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Todo added successfully",
                todo: {
                  id: "668a758848b87734d1fa62c1",
                  title: "New Todo",
                  description: "Description of the new todo",
                  completed: false,
                  userId: "668a758848b87734d1fa62c1",
                  createdAt: "2024-07-07T15:00:00Z",
                  updatedAt: "2024-07-07T15:00:00Z",
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Failed to add todo",
              },
            },
          },
        },
      },
    },
    "/api/todo/updatetodo": {
      put: {
        tags: ["Todos Management"],
        description: "Update an existing todo",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Updated todo details",
            schema: {
              required: ["id", "title", "description"],
              properties: {
                id: {
                  type: "string",
                  example: "668a758848b87734d1fa62c1",
                },
                title: {
                  type: "string",
                  example: "Updated Todo",
                },
                description: {
                  type: "string",
                  example: "Updated description of the todo",
                },
                completed: {
                  type: "boolean",
                  example: true,
                },
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Todo updated successfully",
                todo: {
                  id: "668a758848b87734d1fa62c1",
                  title: "Updated Todo",
                  description: "Updated description of the todo",
                  completed: false,
                  userId: "668a758848b87734d1fa62c1",
                  createdAt: "2024-07-07T15:00:00Z",
                  updatedAt: "2024-07-07T16:00:00Z",
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Failed to update todo",
              },
            },
          },
        },
      },
    },
    "/api/todo/deletetodo": {
      delete: {
        tags: ["Todos Management"],
        description: "Delete an existing todo",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Todo ID to delete",
            schema: {
              required: ["id"],
              properties: {
                id: {
                  type: "string",
                  example: "668a758848b87734d1fa62c1",
                }
              },
            },
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description: "The request is OK",
            examples: {
              "application/json": {
                status: "success",
                message: "Todo deleted successfully",
              },
            },
          },
          400: {
            description: "Bad Request",
            examples: {
              "application/json": {
                status: "failed",
                message: "Failed to delete todo",
              },
            },
          },
        },
      },
    },
  },

  definitions: {
    users: {
      required: ["name", "email", "password", "password_confirmation"],
      properties: {
        name: {
          type: "string",
          example: "Monish barse",
        },
        email: {
          type: "string",
          example: "monishbarse9@gmail.com",
        },
        password: {
          type: "string",
          example: "Admin@123",
        },
        password_confirmation: {
          type: "string",
          example: "Admin@123",
        },
      },
    },
    todos: {
      required: ["userId", "title"],
      properties: {
        userId: {
          type: "string",
          example: "6585ebdb2211cc980f0f27ed",
        },
        title: {
          type: "string",
          example: "Admin@123",
        },
        description: {
          type: "string",
          example: "Admin@123",
        },
        completed: {
          type: "boolean",
          example: "false",
        },
      },
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        'JWT authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};
