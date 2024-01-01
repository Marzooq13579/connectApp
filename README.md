# Exclusive Social Media App

Welcome to the Exclusive Social Media App – a unique social platform with features tailored for exclusive networking experiences.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Exclusive Social Media App is a full-stack web application built to provide a unique social networking experience. It features authentication and authorization for user security, real-time chat using Pusher, and WebRTC integration for voice calls, video calls, and screen sharing. The app is designed to be scalable, responsive, and user-friendly.

## Features

- **Authentication and Authorization:**
  - Secure user registration and login.
  - JWT-based authentication and authorization.
  - Admin functionality for user management.

- **Real-Time Chat:**
  - Pusher integration for real-time chat.
  - WebSocket support for instant messaging.

- **Voice Call, Video Call, and Screen Sharing:**
  - WebRTC integration for peer-to-peer communication.
  - Real-time state management using Redux.
  - Support for voice calls, video calls, and screen sharing.

- **Styling and UI Enhancement:**
  - Tailwind CSS for a responsive and visually appealing UI.


## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm
- MongoDB Atlas Account
- Pusher account (for real-time chat)
- WebRTC knowledge for video call and screen sharing features

### installation

### Clone the repository and install dependencies:
git clone https://github.com/yourusername/exclusive-social-media-app.git

### Install backend dependencies and set up environment variables:
cd exclusive-social-media-app/backend
npm install

### Install frontend dependencies:
cd ../frontend
npm install

- Configure environment variables:
- Create a .env file in the backend directory and configure it.
- Configure Pusher credentials and WebRTC settings.


### Run the application:
### Start the backend server
cd backend
npm start

### Start the frontend development server
cd ../frontend
npm start

## Technologies
- MongoDB
- Express.js
- React
- Node.js
- Pusher
- WebRTC
- Redux Toolkit
- Tailwind CSS


# License
This project is licensed under the [MIT License](LICENSE).








