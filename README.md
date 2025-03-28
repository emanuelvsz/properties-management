# Rental Property Management System

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Entity-Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
4. [Design](#design)
5. [Technology Stack](#technology-stack)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Description
The **Rental Property Management System** is designed to help landlords efficiently manage their rental properties, tenants, lease agreements, and financial transactions. The system enables users to track expenses, manage rent payments, and oversee multiple properties under a single account.

---

## Features
- User authentication and role-based access control
- Property management (add, edit, delete properties)
- Tenant management
- Lease agreement tracking
- Rent payment tracking and history
- Expense management
- Payment methods integration
- Reports and analytics
- Notifications and reminders

---

## Entity-Relationship Diagram (ERD)
The system follows a structured database model with entities such as:
- **User**: Manages multiple properties.
- **Property**: Represents a rental unit.
- **Tenant**: Stores tenant information.
- **Rent Contract**: Handles lease agreements.
- **Rent Payment**: Tracks payments and due dates.
- **Expense**: Logs property-related expenses.
- **Payment Method**: Defines supported payment options.


* [Entity-Relationship Diagram](docs/diagrams.md)

---

## Design

* [Figma Design](https://www.figma.com/design/xG59t3RrM8J7Af62L0SHG4/Property-Management?node-id=0-1&t=VApwlQ2eW8a9mVvH-1)

---

## Technology Stack
- **Backend**: Django (Python)
- **Frontend**: React (TypeScript)
- **Database**: PostgreSQL
- **Authentication**: JWT / OAuth
- **Cloud Services**: AWS (for hosting and storage)

---

## Installation

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

---

## License
This project is licensed under the MIT License.
