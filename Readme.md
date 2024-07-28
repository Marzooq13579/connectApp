# ConnectApp

ConnectApp is a real-time chat application featuring video and voice call capabilities. It leverages Next.js for the frontend and Nest.js for the backend, providing a seamless user experience with modern web technologies.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
        - [Frontend](#frontend)
        - [Backend](#backend)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Dependencies](#dependencies)
    - [Backend](#backend-dependencies)
    - [Frontend](#frontend-dependencies)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Structure
The ConnectApp project is organized as follows:

```
connectApp/
├── frontend/   # Next.js project
└── backend/    # Nest.js project
```

## Getting Started
To set up the ConnectApp project locally, follow these steps.

### Prerequisites
Ensure you have the following software installed on your local machine:
- Node.js: [Download here](https://nodejs.org/)
- npm or yarn: [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

### Installation
Clone the repository:
```bash
git clone https://github.com/yourusername/connectApp.git
cd connectApp
```

Install dependencies for both frontend and backend:

Frontend:
```bash
cd frontend
npm install
# or
yarn install
```

Backend:
```bash
cd ../backend
npm install
# or
yarn install
```

### Running the Application
#### Frontend
Navigate to the frontend directory:
```bash
cd frontend
```

Start the Next.js development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

#### Backend
Navigate to the backend directory:
```bash
cd backend
```

Start the Nest.js development server:
```bash
npm run start:dev
# or
yarn start:dev
```

The backend server will be running on [http://localhost:3001](http://localhost:3001) by default.

## Environment Variables
Create `.env` files in both the frontend and backend directories to manage environment-specific settings. Here are examples of what you might need:

Frontend `.env`:
```ini
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Backend `.env`:
```ini
MONGO_URI=mongodb://localhost:27017/connectApp
JWT_SECRET=your_jwt_secret_key
```

## Features
- Real-Time Messaging: Powered by Socket.io for instantaneous communication.
- User Authentication: Secure login and signup processes using JWT for token-based authentication.
- Video and Voice Calls: High-quality video and audio calls utilizing WebRTC.
- Responsive UI: Designed with Tailwind CSS to ensure adaptability across devices.

## Dependencies
### Backend
- Nest.js
- MongoDB
- Mongoose
- Passport.js
- JWT
- Bcrypt
- Socket.io
- WebRTC

### Frontend
- Next.js
- React Query
- Axios
- Socket.io-client
- Tailwind CSS

## Usage
- User Authentication: Users can sign up and log in to the application. Authentication is handled using JWT, and passwords are hashed with bcrypt.
- Real-Time Chat: Users can send and receive messages in real-time. Messages are stored in MongoDB.
- Video and Voice Calls: Users can initiate and receive video and voice calls using WebRTC.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on the code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Nest.js
- Next.js
- Tailwind CSS
- Socket.io
- MongoDB
- WebRTC
