# Software Requirements Specification (SRS)

## Project Title
Event Management and Notice Portal

## Team Details
- Team Lead: Parth Dua (Roll No: 235ucs092)
- Team Member: Vikrant Chaudhary (Roll No: 235ucs125)
- Team Member: Mohammad Naqui (Roll No: 235ucs083)

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for the Event Management and Notice Portal. The system enables public users to view notices and events, while authenticated administrators can manage event and notice content through a protected dashboard.

### 1.2 Scope
The project consists of:
- A React frontend (`event-management-frontend/event-management-frontend`) for public and admin interfaces.
- A PHP backend (`event-management`) exposing REST-like endpoints.
- A MySQL database initialized via `sql-scripts.sql`.

Primary capabilities:
- Public viewing of all events and notices.
- Admin login/logout with session-based authentication.
- Admin CRUD operations for events and notices (currently create, list, delete in UI; update available via backend API).

### 1.3 Intended Audience
- Project evaluators and faculty
- Development team members
- Testers/QA reviewers
- Future maintainers

### 1.4 Definitions and Acronyms
- SRS: Software Requirements Specification
- UI: User Interface
- API: Application Programming Interface
- CRUD: Create, Read, Update, Delete
- Admin: Authorized user who can manage events and notices

## 2. Overall Description

### 2.1 Product Perspective
This is a full-stack web application with:
- Frontend: React + Vite + Axios + React Router
- Backend: PHP (controller-model structure)
- Database: MySQL
- Auth mechanism: PHP sessions with cookie-based persistence

### 2.2 Product Functions
- Display public home page with university links, notices, and events.
- Show event details in a modal on user selection.
- Allow admin authentication and session validation.
- Provide protected admin routes for dashboard, event management, and notice management.
- Allow admin to add and delete events/notices.
- Expose update APIs for events/notices for future UI integration.

### 2.3 User Classes
- Public User
  - Can view events and notices
  - Cannot modify data
- Admin User
  - Can log in, log out
  - Can access dashboard and manage content

### 2.4 Operating Environment
- Frontend runs in modern browsers (Chrome, Edge, Firefox)
- Frontend dev server default: `http://localhost:5173`
- Backend served via local web server/PHP setup (e.g., XAMPP/WAMP) at `http://localhost/event-management/index.php`
- Database: MySQL server on `localhost`
- OS target: Windows (development environment)

### 2.5 Constraints
- Backend CORS is currently configured for `http://localhost:5173`.
- Session cookies depend on local domain and browser cookie settings.
- Single admin table structure currently supports basic username/password login.
- No file upload handling in active event form flow (image exists in DB schema but not in create/update model query).

### 2.6 Assumptions and Dependencies
- MySQL server is running and accessible with configured credentials.
- Database `event_db` and required tables exist.
- Initial admin user is inserted through SQL script.
- Frontend and backend are both hosted on localhost for development.

## 3. External Interface Requirements

### 3.1 User Interfaces
- Public Home Page:
  - Navbar and footer
  - Important external links
  - Notices section
  - Events section with clickable cards and details modal
- Admin Login Page:
  - Username and password input
  - Login action and validation alert messages
- Admin Dashboard:
  - Navigation cards for Manage Events and Manage Notices
- Manage Events:
  - Event form with fields: title, description, category, event date, location, seats
  - Events list with delete action
- Manage Notices:
  - Notice input form
  - Notices list with delete action

### 3.2 Software Interfaces
- Frontend to backend communication via Axios with `withCredentials: true`.
- Backend to database communication via PDO.

### 3.3 Communications Interfaces
- HTTP/HTTPS over localhost
- JSON request/response payloads
- Session cookie transport for admin authentication

## 4. System Features and Functional Requirements

### 4.1 Authentication and Authorization
- FR-1: System shall allow admin login using username and password.
- FR-2: System shall validate credentials against stored hashed password.
- FR-3: System shall create a session after successful login.
- FR-4: System shall provide a session-check endpoint to validate logged-in state.
- FR-5: System shall allow admin logout and terminate session.
- FR-6: System shall restrict create/update/delete APIs for events and notices to authenticated admins.
- FR-7: Frontend shall protect admin routes using auth state (`ProtectedRoute`).

### 4.2 Event Management
- FR-8: System shall return all events ordered by event date ascending.
- FR-9: Admin shall be able to create new events with required fields.
- FR-10: Admin shall be able to delete existing events.
- FR-11: Backend shall support updating events by event ID.
- FR-12: Public users shall be able to view event summary and details.

### 4.3 Notice Management
- FR-13: System shall return all notices ordered by latest created first.
- FR-14: Admin shall be able to add new notices.
- FR-15: Admin shall be able to delete notices.
- FR-16: Backend shall support updating notices by notice ID.
- FR-17: Public users shall be able to view notices on home page.

### 4.4 Navigation and Access
- FR-18: System shall provide public route `/`.
- FR-19: System shall provide admin route `/admin/login`.
- FR-20: System shall provide protected routes `/admin/dashboard`, `/admin/events`, `/admin/notices`.
- FR-21: Unauthorized users attempting protected pages shall be redirected to login.

### 4.5 Error Handling
- FR-22: System shall return 404 JSON response for undefined backend routes.
- FR-23: System shall return validation error messages for invalid request payloads.
- FR-24: UI shall show user-visible alerts on operation failure for major admin actions.

## 5. API Requirements

Base endpoint: `http://localhost/event-management/index.php`

- `POST ?route=login`
  - Input: `{ username, password }`
  - Output: success/error JSON
- `GET ?route=check-auth`
  - Output: login state JSON
- `POST ?route=logout`
  - Output: success JSON
- `GET ?route=events`
  - Output: list of events
- `POST ?route=events` (auth required)
  - Input: event object
  - Output: status JSON
- `PUT ?route=events/{id}` (auth required)
  - Input: updated event object
  - Output: status JSON
- `DELETE ?route=events/{id}` (auth required)
  - Output: status JSON
- `GET ?route=notices`
  - Output: list of notices
- `POST ?route=notices` (auth required)
  - Input: `{ title }`
  - Output: status JSON
- `PUT ?route=notices/{id}` (auth required)
  - Input: `{ title }`
  - Output: status JSON
- `DELETE ?route=notices/{id}` (auth required)
  - Output: status JSON

## 6. Data Requirements

### 6.1 Database: `event_db`

### 6.2 Tables
- `admins`
  - `id` (PK, auto increment)
  - `username` (varchar)
  - `password` (hashed varchar)

- `events`
  - `id` (PK, auto increment)
  - `title` (varchar)
  - `description` (text)
  - `category` (varchar)
  - `event_date` (datetime)
  - `location` (varchar)
  - `total_seats` (int)
  - `image` (varchar, schema present)
  - `created_at` (timestamp default current)

- `notices` (required by backend model/controller)
  - `id` (PK, auto increment)
  - `title` (varchar/text)
  - `created_at` (timestamp default current)

Note: `notices` table must be present in SQL initialization to match current backend behavior.

## 7. Non-Functional Requirements

### 7.1 Performance
- NFR-1: Public event and notice list retrieval should respond within acceptable local-network latency (target < 2 seconds in normal local setup).
- NFR-2: UI interactions (navigation, modal open/close) should feel responsive on standard desktop browsers.

### 7.2 Security
- NFR-3: Admin passwords shall be stored as hashes.
- NFR-4: Session cookie shall be HTTP-only where configured.
- NFR-5: Unauthorized modification requests shall return HTTP 401.

### 7.3 Reliability and Availability
- NFR-6: System should handle invalid routes and malformed input gracefully without crashing.
- NFR-7: Backend should return consistent JSON responses for client handling.

### 7.4 Usability
- NFR-8: Public UI shall provide clear listing of notices/events without login.
- NFR-9: Admin flows (login, create, delete) shall be simple and executable in minimal steps.

### 7.5 Maintainability
- NFR-10: Backend shall remain modular using controller/model separation.
- NFR-11: Frontend shall remain component-based and route-driven.

## 8. Use Cases (High-Level)

### UC-1: View Events and Notices (Public)
1. User opens home page.
2. System loads notices and events from API.
3. User reads notices and clicks an event for detailed modal view.

### UC-2: Admin Login
1. Admin opens login page.
2. Admin submits username/password.
3. System validates credentials and creates session.
4. Admin is redirected to dashboard.

### UC-3: Create Event
1. Admin navigates to Manage Events.
2. Admin fills event form and submits.
3. System stores event and confirms creation.

### UC-4: Delete Event
1. Admin opens event list.
2. Admin clicks delete for selected event.
3. System removes event and refreshes list.

### UC-5: Add/Delete Notice
1. Admin navigates to Manage Notices.
2. Admin adds a notice or deletes an existing notice.
3. System updates list accordingly.

## 9. Acceptance Criteria (Minimum)
- AC-1: Public user can view notices and events on home page.
- AC-2: Invalid admin credentials are rejected with error message.
- AC-3: Valid admin credentials allow protected page access.
- AC-4: Unauthenticated user cannot call protected create/delete APIs successfully.
- AC-5: Admin can create and delete events.
- AC-6: Admin can create and delete notices.
- AC-7: Admin logout invalidates session and protected pages become inaccessible.

## 10. Future Enhancements (Optional)
- Add frontend support for edit/update events and notices.
- Add pagination/search/filter for events and notices.
- Add role-based access control for multiple admin roles.
- Add audit logs for admin actions.
- Add server-side validation expansion and standardized error schema.

