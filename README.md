# Real-Time Kanban Board

A real-time collaborative Kanban board built with WebSocket technology for instant synchronization across multiple clients.

## Features

- Drag and drop tasks between columns (To Do, In Progress, Done)
- Real-time synchronization using WebSocket
- Priority-based task sorting (High, Medium, Low)
- Task categories (Bug, Feature, Enhancement)
- File attachments (images and PDFs, max 5MB)
- Edit and delete tasks
- Progress visualization with pie chart
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React
- Socket.IO Client
- React DnD (drag and drop)
- React Select
- Recharts (data visualization)
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Socket.IO
- Multer (file uploads)

### Testing
- Vitest (unit tests)
- React Testing Library
- Playwright (e2e tests)

## Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

```bash
Server runs on http://localhost:3000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

```bash
App runs on http://localhost:5173
```

## Testing

### Run Unit Tests

```bash
cd frontend
npm test
```
### Run E2E Tests

```bash
cd frontend
npm run test:e2e
```

## Project Structure

```bash
├── backend/
│   ├── server.js
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── tests/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features Demo

#### 1 Create tasks with title, description, priority, and category

#### 2 Drag tasks between columns for status updates

#### 3 Real-time updates across multiple browser windows

#### 4 Automatic priority sorting (high priority tasks appear first)

#### 5 File upload support with preview

#### 6 Progress tracking with completion percentage
