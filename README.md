# Anvaya CRM

A full-stack CRM (Customer Relationship Management) application focused on structured lead management.  
The application enables organizations to manage leads across different lifecycle stages, assign sales agents, track updates through comments, and monitor performance through reports.

Built using a React frontend, Node.js/Express backend, and MongoDB database.

---

## Demo Link

[Live Demo](https://frontend-crm-khaki.vercel.app/)

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev      # or `npm start`
```

---

## Technologies Used

### Frontend
- React JS
- React Router

### Backend
- Node.js
- Express

### Database
- MongoDB

---

## Environment Setup

Create a `.env` file in the root of your backend directory and add the following variable:

```
DB_URL=your_mongodb_connection_string
```

Replace the value with your own MongoDB connection string (local or MongoDB Atlas).

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:  
[Demo Video Link](https://www.loom.com/share/3029578cca8f488389fdf54585971fa6)

---

## Features

### Dashboard
- Displays sidebar navigation including Leads, Sales Agents, and Reports.
- Categorizes leads by status (New, Contacted, Qualified, Proposal Sent, Closed).
- Provides quick filters to switch between different lead statuses.
- Allows users to add new leads directly from the dashboard.

### Lead Management Screen
- Displays key lead details such as assigned sales agent, source, status, time to close, and priority.
- Allows sales agents to add comments with timestamps and author details.
- Enables users to edit lead information including status and assigned sales agent.
- Provides an input field and submission option for adding new comments.

### Lead List Screen
- Displays a structured list of all leads with essential information.
- Allows filtering by lead status or assigned sales agent.
- Provides sorting options based on priority and time to close.
- Enables users to add new leads.

### Add New Lead Screen
- Provides a form to create a new lead.
- Captures lead details including name, source, assigned sales agent, status, priority, time to close, and tags.
- Validates required fields before submission.
- Creates and stores the new lead in MongoDB.

### Sales Agent Management
- Displays a list of all sales agents with their contact information.
- Allows users to add new sales agents.
- Enables deletion of sales agents while handling associated leads appropriately.

### Reports
- Displays visual insights into lead progress and performance.
- Shows lead status distribution.
- Displays sales agent performance view.
- Provides pipeline insights and closed-leads reports.

### Comments System
- Allows sales agents to add updates to specific leads.
- Stores comments with author details and timestamps.
- Retrieves all comments related to a specific lead.

---

## API Reference

### **POST /v1/leads**  
Creates a new lead.

Sample Response:
```
{
  "_id": "lead_id",
  "name": "Company ABC",
  "status": "New",
  "priority": "High"
}
```

---

### **GET /v1/leads**  
Retrieves all leads or filtered leads based on query parameters (salesAgent, status, source, tags).

Sample Response:
```
[
  {
    "_id": "lead_id",
    "name": "Company ABC",
    "status": "Qualified",
    "priority": "Medium"
  }
]
```

---

### **PUT /v1/leads/:id**  
Updates lead details.

Sample Response:
```
{
  "_id": "lead_id",
  "status": "Proposal Sent",
  "priority": "High"
}
```

---

### **DELETE /v1/leads/:id**  
Deletes a specific lead.

Sample Response:
```
{
  "message": "Lead deleted successfully"
}
```

---

### **POST /v1/agents**  
Creates a new sales agent.

Sample Response:
```
{
  "_id": "agent_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### **GET /v1/agents**  
Retrieves all sales agents.

Sample Response:
```
[
  {
    "_id": "agent_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

### **POST /v1/leads/:id/comments**  
Adds a comment to a specific lead.

Sample Response:
```
{
  "commentText": "Followed up with client.",
  "author": "Agent Name",
  "createdAt": "2026-02-16T10:00:00Z"
}
```

---

### **GET /v1/report/pipeline**  
Retrieves total number of leads currently in the sales pipeline.

Sample Response:
```
{
  "totalLeadsInPipeline": 12
}
```

---

### **GET /v1/report/last-week**  
Retrieves leads closed in the last 7 days.

Sample Response:
```
[
  {
    "_id": "lead_id",
    "status": "Closed"
  }
]
```

---

## Contact

For bugs or feature requests, please reach out to:  
kashishbansal081@gmail.com
