# CETI Club

### Protestant University of Central Africa — Technology & Innovation Club

A collaborative technology platform created for the **CETI Technology Club of the Protestant University of Central Africa (PUCA)** and its members.

CETI Club gives students and technology enthusiasts a place to **showcase what they build, document their progress, share knowledge, receive feedback, gain visibility, and contribute to the community**.

> **Build. Share. Document. Inspire. Grow.**

---

## About CETI Club

Technology projects often disappear after they are completed.

A student builds an application, an IoT prototype, an AI model, a website, or another innovative project. They may present it once, share a few pictures, and then move on.

CETI Club aims to change that.

The platform provides a permanent digital space where members can **document their work and build a public track record of their projects and contributions**.

A project can evolve from an idea into a documented journey:

```text
Idea
  ↓
Development
  ↓
Progress updates
  ↓
Pictures & media
  ↓
YouTube demonstration
  ↓
Community feedback
  ↓
Reviews
  ↓
Completed project
```

The goal is not simply to store projects.

The goal is to **give projects visibility and give their creators a platform to grow**.

---

## What Can Members Do?

### Showcase Projects

Members can publish their technology projects and present:

* Project title
* Description
* Technologies used
* Project category
* Images
* YouTube demonstrations
* Project documentation
* Development progress
* Project status
* Links to external resources
* Community feedback and reviews

This allows someone discovering a project to understand not only **what was built**, but also **how it evolved**.

---

### Share YouTube Demonstrations

Projects can include YouTube demonstrations so members can show their creations in action.

For example:

* Software demonstrations
* Hardware prototypes
* Robotics projects
* IoT systems
* AI applications
* Web applications
* Mobile applications
* Engineering projects

A project page becomes more than a description—it becomes a **portfolio and demonstration page**.

---

### Share Pictures

Members can document their work visually by sharing pictures of:

* Prototypes
* Development stages
* Hardware
* Circuit boards
* Interfaces
* Team activities
* Final products
* Events and presentations

This creates a visual history of the project.

---

### Receive Reviews & Feedback

The community can interact with projects through reviews and feedback.

This creates an environment where members can:

* Receive constructive criticism
* Discover improvements
* Encourage other developers
* Share technical experiences
* Learn from other projects

The objective is to make projects better through **community participation**.

---

## Gain Project Visibility

One of the main objectives of CETI Club is to help members **give their projects visibility**.

A good project should not disappear simply because its creator does not have a large audience.

The platform is intended to provide opportunities for projects to become discoverable through:

* Project listings
* Featured projects
* Popular projects
* Community activity
* Project categories
* Member profiles
* Blog content
* YouTube demonstrations
* Project history

Over time, a member should be able to build a visible portfolio directly through their activity on CETI Club.

---

## Build a Track Record

CETI Club is also designed to create a **long-term record of technological work**.

Instead of having projects scattered across WhatsApp messages, Google Drive folders, social media posts, or forgotten repositories, members can document their work on the platform.

A member's profile can progressively represent:

```text
Member
 │
 ├── Projects
 │     ├── Project 1
 │     ├── Project 2
 │     └── Project 3
 │
 ├── Blog articles
 │
 ├── Reviews & contributions
 │
 └── Community activity
```

Over several semesters, this can become a meaningful technological portfolio.

---

# Blogs & Technical Documentation

CETI Club is not only about finished projects.

Members can continuously publish **blogs about new, ongoing, or completed projects**.

Blog posts can be used to document:

* Development progress
* Technical tutorials
* Problems encountered
* Solutions discovered
* Project updates
* New technologies
* Experiments
* Club activities
* Lessons learned
* Team experiences
* Technology news relevant to the community

For example:

> **Building an RFID Attendance System — Part 1**

followed by:

> **Building an RFID Attendance System — Part 2: Database Integration**

and eventually:

> **Building an RFID Attendance System — Final Results**

This creates a chronological record of the development process.

---

# Technology Club Management

CETI Club also serves as a digital platform for managing and documenting the activities of the **CETI Technology Club at the Protestant University of Central Africa**.

The platform can help the club maintain records of:

* Club projects
* Member projects
* Technical activities
* Blog publications
* Project demonstrations
* Community contributions
* Club initiatives
* Technology-related events

Instead of having the club's work disappear from one academic year to another, CETI Club aims to create a **continuous digital history of the community**.

---

# Features

### Current / In Development

* User registration and authentication
* Email verification
* OTP verification
* User profiles
* Profile pictures
* Personal dashboard
* Password management
* Role-based permissions
* Project platform
* Blog platform
* Project visibility
* Community-oriented content

### Planned

* [ ] Project creation
* [ ] Project editing
* [ ] Project categories
* [ ] Project images
* [ ] YouTube project demonstrations
* [ ] Project reviews
* [ ] Project popularity system
* [ ] Featured projects
* [ ] Top projects
* [ ] Blog creation
* [ ] Blog editing
* [ ] Blog categories
* [ ] Top blogs
* [ ] Member project portfolios
* [ ] Project search
* [ ] Project discovery
* [ ] Community interactions
* [ ] Club project management
* [ ] Improved administration tools

---

# Technology Stack

CETI Club is built using technologies that allow the platform to remain relatively lightweight while providing a complete full-stack development environment.

### Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mysql" height="50">
</p>

* **Node.js** — JavaScript runtime
* **Express.js** — Web application framework
* **MySQL** — Relational database
* **JWT** — Authentication
* **bcrypt** — Password hashing
* **Nodemailer** — Email delivery
* **dotenv** — Environment configuration

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=html,css,js,tailwind,ejs" height="50">
</p>

* **HTML5**
* **CSS3**
* **JavaScript**
* **Tailwind CSS**
* **EJS**
* **Font Awesome**

### Development Tools

<p>
  <img src="https://skillicons.dev/icons?i=vscode,git,github" height="50">
</p>

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Nodemon**

---

# Security

Because CETI Club manages user accounts and personal content, security is an important part of the platform.

Current security mechanisms include:

* Password hashing
* JWT authentication
* HTTP-only cookies
* Protected routes
* Email verification
* OTP verification
* OTP expiration
* Prevention of reused OTP codes
* Role-based permissions
* Server-side validation
* Environment variables for sensitive configuration

Sensitive credentials such as database passwords, JWT secrets, and email application passwords are **never intended to be stored directly in the source code**.

---

# Getting Started

## Requirements

Before running the project, make sure you have installed:

* Node.js
* npm
* MySQL
* Git

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CETI-Club.git
cd CETI-Club
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create your local configuration file and configure your database, JWT, and email credentials.

Example:

```env
PORT=3001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ceti

JWT_SECRET=your_secret

MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
```

> Never commit your environment configuration or application passwords to GitHub.

## Run the Development Server

```bash
npm run dev
```

Or:

```bash
node app.js
```

The application will be available at:

```text
http://localhost:3001
```

---

# Vision

CETI Club is intended to become more than a website for the technology club.

The long-term vision is to create a **digital ecosystem around student technology projects**.

A place where a student can:

**Build a project → document it → publish it → receive feedback → improve it → gain visibility → inspire another student.**

At the same time, the CETI Technology Club can maintain a growing record of the projects and technological contributions produced by its community.

The platform therefore serves two purposes:

### For Members

A place to **build a public technological portfolio and gain visibility**.

### For the Club

A place to **document, manage, preserve, and showcase the technological work of the CETI community**.

---

# Contributing

Contributions, ideas, feedback, and improvements are welcome.

If you are a member of the CETI Technology Club and would like to contribute to the platform, you can participate by:

* Building features
* Reporting bugs
* Improving the UI
* Writing documentation
* Testing the platform
* Suggesting new features
* Creating technical content

---

# Project Status

**Active Development**

CETI Club is currently being developed and progressively expanded.

The authentication and user-management foundation is being established first, followed by the project's core content features: **projects, demonstrations, blogs, reviews, discovery, and community interaction**.

---

# CETI Technology Club

**Protestant University of Central Africa**

> **Build with purpose. Share what you build. Help your community grow.**

## Developer

This platform is developed by **Arthur Samuel Djeumeni Patchepia**,  Computer Science student and the **President of the CETI Technology Club since 2025**, including the **2026 edition** of the club.

As President, I leads the club's technical activities, coordinates member projects, promotes software development and technology within the university community, and works to create opportunities for students to build, showcase, and collaborate on meaningful technology projects.

The platform itself is part of this vision: **to give CETI members a permanent digital space where their work can be documented, shared, discovered, reviewed, and developed further as a community.**

