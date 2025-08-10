## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend Details](#frontend-details)
- [Notes](#notes)

***

## Project Overview

This platform provides an exam environment where users:

- Register and login securely using JWT authentication.
- Receive a fixed set of 30 exam questions.
- Answer questions within a timed interface.
- Submit answers to the backend for scoring.
- View detailed results indicating which answers were correct or wrong and their final percentage score.

***

## Features

- User registration and login with password hashing.
- JWT-protected routes for exam questions and submission.
- Fixed 30-question exam for all users.
- Timer countdown with auto-submit on expiration.
- Answer navigation with question-wise selection.
- Backend scoring with detailed feedback per question.
- Responsive UI built with React and Bootstrap.

***

## Technologies Used

- Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, CORS
- Frontend: React.js, Axios, Bootstrap
- Environment variables managed via `.env`

***

## Setup Instructions

### 1. Clone the repository

```bash
git clone 
cd Online_Test_Platform
```

### 2. Backend Setup

```bash
cd Server
npm install
```

- Create a `.env` file in the `Server` folder with:

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

- Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

The React app will run on `http://localhost:3000`.

***

## Running the Application

1. Open your browser and visit `http://localhost:3000`.
2. Register a new user.
3. Login with your credentials.
4. The exam will start with 30 questions and a timer.
5. Navigate through questions, select answers, and submit before time runs out.
6. View your detailed results and percentage score.

## Running Your Project

### Backend (Server)

1. Navigate to your backend folder:

```bash
cd Server
```

2. Install dependencies:

```bash
npm install
```

3. Ensure your `.env` file exists in the `Server` folder with the following environment variables:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:

```bash
npm start
```

*Note:* This requires a `"start": "node index.js"` script in your `package.json`.  
By default, the backend server will run at [http://localhost:5000](http://localhost:5000).

***

### Frontend (Client)

1. Navigate to your frontend folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

This runs your frontend on [http://localhost:3000](http://localhost:3000) and will usually open the app automatically in your default browser.

***

## Backend API Endpoints

Here is the updated excerpt to add in your README.md under the **Backend API Endpoints** section, capturing the routes you listed with URLs and their basic descriptions:

***

## Backend API Endpoints

### 1. User Registration

- **POST** `http://localhost:5000/api/auth/register`

Registers a new user with name, email, and password.

***

### 2. User Login

- **POST** `http://localhost:5000/api/auth/login`

Logs in a user with email and password to receive an authentication JWT token.

***

### 3. Fetch Exam Questions

- **GET** `http://localhost:5000/api/exam/questions`

Fetches the fixed set of 30 exam questions for the authenticated user. Requires an `Authorization` header with a Bearer token.

***

### 4. Submit Exam Answers

- **POST** `http://localhost:5000/api/exam/submit`

Submits the user's answers to the exam questions for grading. Requires an `Authorization` header with a Bearer token and a JSON body with the answers mapping question IDs to selected options.

***

### 1. Register

- **POST** `/api/auth/register`
- Body example:

```json
{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "password123"
}
```

- Responses:
  - Success: `{ "message": "User registered successfully" }`
  - Email exists: `{ "message": "Email already registered", "redirectTo": "/login" }`
  - Missing fields: `{ "message": "All fields required" }`

### 2. Login

- **POST** `/api/auth/login`
- Body example:

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

- Response:

```json
{
  "token": "",
  "user": {
    "id": "user_id",
    "name": "Alice Example",
    "email": "alice@example.com"
  }
}
```

### 3. Fetch Exam Questions

- **GET** `/api/exam/questions`
- Headers: `Authorization: Bearer `
- Response: 30 question objects with `_id`, `question`, and `options`.

### 4. Submit Exam Answers

- **POST** `/api/exam/submit`
- Headers:  
  `Authorization: Bearer `  
  `Content-Type: application/json`
- Body example:

```json
{
  "answers": {
    "questionId1": "Answer option",
    "questionId2": "Answer option"
    // ...
  }
}
```

- Response example:

```json
{
  "score": 25,
  "total": 30,
  "details": [
    {
      "question": "Question text",
      "correctAnswer": "Correct option",
      "givenAnswer": "User's option",
      "isCorrect": true
    }
    // ... for all 30 questions
  ]
}
```

***

## Frontend Details

- React app manages user authentication state and token storage.
- Fetches questions and manages timer with state hooks.
- Submits answers with authentication token.
- Displays detailed results with correct/incorrect highlights.
- Uses Bootstrap for UI styling and responsiveness.

***

## Project Demonstration (Videos & Images)
![Login successsfull](./ProjectAssets/Login%20successsfull.jpg)
[View Demo Video](./ProjectAssets/Online_Test%20Platform%20-%20Made%20with%20Clipchamp.mp4)

## Notes

- JWT token must be included in all protected request headers.
- Unanswered questions are considered incorrect during scoring.
- The exam questions are fixed for all users to ensure consistent scoring.

***