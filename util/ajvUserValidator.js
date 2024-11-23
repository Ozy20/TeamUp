const AJV = require("ajv")
const addFormats = require("ajv-formats");
const ajv = new AJV();
addFormats(ajv); // Add support for additional formats like "uuid"
const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 4,
        "maxLength": 15
      },
      "code": {
        "type": "string",
        "minLength": 4,
        "maxLength": 15
      },
      "email": {
        "type": "string",
        "format": "email",
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      },
      "password": {
        "type": "string",
        "minLength": 8
      },
      "userRole": {
        "type": "integer",
        "enum": [1, 2, 3]
      },
      "img": {
        "type": "string",
        "contentEncoding": "base64"
      },
      "links": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "skills": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "teams": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "teamID": {
              "type": "string",
              "format": "uuid"
            }
          },
          "required": ["teamID"]
        }
      },
      "chats": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "communities": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "commID": {
              "type": "string",
              "format": "uuid"
            }
          },
          "required": ["commID"]
        }
      },
      "notifications": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            },
            "date": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": ["content", "date"]
        }
      },
      "posts": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      }
    },
    "required": ["name", "code", "email", "password", "userRole"],
    "additionalProperties": false
  }
  module.exports = ajv.compile(schema);