export const swaggeroptions={
    "swagger": "2.0",
    "info": {
        "description": "API Documentation",
        "version": "1.0.0",
        "title": "Immverse AI Asignement"
    },
    "host": "localhost:8000",
    "schemes": [
        "http"
    ],
    "paths": {
        "/api/user/register": {
            "post": {
                "tags": [
                    "User Management"
                ],
                "description": "Create user",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Add users",
                        "schema": {
                            "$ref": "#/definitions/users"
                        }
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "The request is OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Authorization failed"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "408": {
                        "description": "Request Timeout"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    },
                    "504": {
                        "description": "Gateway Timeout"
                    }
                }
            }
        }
    },
    "definitions": {
        "users": {
            "required": [
                "name",
                "email",
                "password",
                "password_confirmation",
                
            ],
            "properties": {
                "name": {
                    "type": "string",
                    "example": "Monish barse"
                },
                "email": {
                    "type": "string",
                    "example": "monishbarse9@gmail.com"
                },
                "password": {
                    "type": "string",
                    "example": "Admin@123"
                },
                "password_confirmation": {
                    "type": "string",
                    "example": "Admin@123"
                }
            }
        }
    }
}