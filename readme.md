

# Doctor-Patient Appointment Management System

This project implements a secure and scalable REST API for managing medical appointments between doctors and patients. Built with Node.js, Express, and TypeScript, it leverages MongoDB for data persistence and follows a modular architecture for maintainability.

**Server Live Link** ➡️ [https://dr-patient-management.vercel.app](https://dr-patient-management.vercel.app) </br>
**Api Test Link** ➡️ [https://dr-patient-management.vercel.app/api/v1](https://dr-patient-management.vercel.app/api/v1) </br>
**Use Postman Collection Link** ➡️ [https://web.postman.co/workspace/7bd068cd-caf2-4c8d-9b36-756b3dbe8ce5](https://web.postman.co/workspace/7bd068cd-caf2-4c8d-9b36-756b3dbe8ce5)

## Features

- **User Roles**:
  - **Doctor**: Manage services, availability, and appointments
  - **Patient**: Browse doctors, view availability, book appointments
  - **Admin**: Dashboard with system analytics

- **Appointment Workflow**:
  - **Patient requests** → Pending status
  - **Doctor accepts/rejects** → Updates slot availability
  - **Status** tracking (pending/accepted/cancelled/completed)

- **Other Features**:
  - **Role-Based Access Control**  →  Patients book appointments, while doctors approve/cancel them, enforced via JWT authentication.
  - **Data Validation** →  Robust request/response validation using Zod, ensuring type safety and reducing errors.
  - **Security**  →  Password hashing with bcryptjs and secure API endpoints.
  

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Other**: JWT (Authentication), bcryptjs (Password Hashing), Cloudinary ( for image upload)

</br>

# `API Documentation`


## Authentication
| 🔗 Endpoint                | Method  | 📝 Description                     | 🔑 Required Fields                              |
|---------------------------|---------|------------------------------------|------------------------------------------------|
| `/auth/register-doctor`   | `POST`  | Register new doctor                | `name`, `email`, `password`, `phone`, `specialization`, `hospitalName`, `hospitalFloor` |
| `/auth/register-patient`  | `POST`  | Register new patient               | `name`, `email`, `password`, `phone`, `age`, `gender` |
| `/auth/login`             | `POST`  | Login for both roles               | `email`, `password`                            |
|


### Doctor Registation Example Code Post Mathod:
   ```bash
   {
    "password": "123456",
    "doctor": {
        "name": "Doctor Name",
        "gender": "male",
        "email": "doctor@gmail.com",
        "phone": "09013456987",
        "specialization": "Cardiology",
        "hospitalName": "Apollo Hospitals Dhaka",
        "hospitalFloor": "Bashundhara R/A, Dhaka"
    }
}
   ```

### Patient Registation Example Code Post Mathod:
   ```bash
   {
    "password": "123456",
    "patient": {
        "name": "Patient Name",
        "gender": "male",
        "age": 20,
        "email": "patient@gmail.com",
        "phone": "09213659845"
    }
}
   ```

## Patient Endpoints
| Endpoint                     | Method  | Description                              |
|------------------------------|---------|------------------------------------------|
| `/doctors`                   | `GET`   | Browse all doctors (with filters)        |
| `/doctors/:id`               | `GET`   | View doctor profile + availability       |
| `/appointments`              | `POST`  | Book new appointment                     |
| `/patient/appointments`      | `GET`   | View patient's appointments              |
|

### Apoinment Book Example Code Post Mathod:
   ```bash
   {
  "doctor": "6860cf7bb40dd13f13b680f3",
  "service": "6860d00cb40dd13f13b680fa",
  "date": "2025-06-29",
  "startTime": "10:00",
  "endTime": "12:00"
}
   ```

# Doctor Endpoints
## Service Management
| Endpoint                   | Method  | Description        |
|----------------------------|---------|--------------------|
| `/doctor/services`         | `POST`  | Add new service    |
| `/doctor/services/:id`     | `PATCH` | Update service     |
| `/doctor/services/:id`     | `DELETE`| Delete service     |-                                              |

### Doctor Service Creat Example Code Post Mathod:
   ```bash
  {
  "title": "Neprologist",
  "description": "Nepro is clean of body",
  "price": 700,
  "duration": 30
}
```

## Availability Management
| Endpoint                   | Method  | Description                     |
|----------------------------|---------|---------------------------------|
| `/doctor/availability`     | `POST`  | Set availability slots          |
| `/doctor/availability`     | `GET`   | Get doctor's availability       |                                              |

### Doctor Availability Creat Example Code Post Mathod:
   ```bash
  {
    "service": "6860d00cb40dd13f13b680fa",
    "day": "Sunday",
    "slots": [
        {
            "startTime": "16:00",
            "endTime": "20:00",
            "maxPatients": 20
        }
    ]
}
```

## Appointment Management
| Endpoint                           | Method  | Description                          |
|------------------------------------|---------|--------------------------------------|
| `/doctor/appointments`             | `GET`   | Get appointments (filter by status)  |
| `/doctor/appointments/:id/status`  | `PATCH` | Update appointment status            |
|

### Doctor Update Apoinment status Example Code Patch Mathod:
   ```bash
  {
    "status": "accepted"
}
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (v4.4+)
- npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/developerFarukk/dr_patient_manage_job_task.git
   cd dr_patient_manage_job_task
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Configure Environment**  
   Create a `.env` file in the root directory. Refer to `.env.example` for guidance:

   ```
   NODE_ENV=development
   PORT=5001
   DATABASE_URL="mongodb+srv://<user_name>:<password>@drmanagejobtask.gdueo5r.mongodb.net/name?retryWritem5=true&w=majority&appName=appname"
   BCRYPT_SALT_ROUNDS="number"
   JWT_ACCESS_SECRET="<JWT access secret key>"
   JWT_ACCESS_EXPIRES_IN="<JWT access expaird of day/ month/ year/ min/ hour example 2d>"
   CLOUDINARY_CLOUD_NAME="<CLOUDINARY_CLOUD_NAME>"
   CLOUDINARY_API_KEY="<CLOUDINARY_API_KEY>"
   CLOUDINARY_API_SECRET="<CLOUDINARY_API_SECRET>"
   EMAIL="<sender Email>"
   APP_PASSWORD="<sender email app password>"
   ```
5. **Start the Server**
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:5001`.

📋 **Additional Notes**

- **Database**: Ensure MongoDB is globaly installed and running locally.

📬 **Contact**  
For issues or inquiries, reach out to [DEVELOPER FARUK](mailto:web.omarfaruk.dev@gmail.com). Thank you 💜

