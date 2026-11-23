# 🎭 Teatro Lasalliana — Web-Based Ticket Reservation & Event Management System

A web-based theater event browsing, interactive seat reservation, payment, and administrative management system developed collaboratively as a **group capstone project**.

---

## 🎯 Overview
**Teatro Lasalliana** enables patrons to browse theater productions, inspect showtimes and seat availability, reserve seats, complete payments, view reservation history, and receive booking confirmations—while giving administrators tools to create, update, and remove events, oversee reservations, and inspect transaction records.

---

## ✨ Key Features

### User Features
- User registration and login
- Browse theater events and view event details
- Interactive seat selection and reservation
- Reservation history and reservation management
- Payment processing and transaction records

### Admin Features
- Admin authentication
- Create, manage, and delete theater events
- Manage reservations and view transactions

---

## 🛠️ Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend & Cloud:** Firebase Authentication, Cloud Firestore, Firebase Security Rules, Cloudflare Workers
- **Payments & Notifications:** PayMongo, EmailJS

---

## 📸 System Walkthrough

### 1. Interactive Seat & Showtime Selection
Patrons select a showtime schedule and choose seats directly on the theater seat map (`Available`, `Selected`, and `Occupied` states) with live seat count and total calculation.
<img width="1280" height="610" alt="assets-01-seat-showtime-selection" src="https://github.com/user-attachments/assets/dc81f56b-9f45-49c3-afa8-30940695305e" />


### 2. Payment Checkout (PayMongo Integration)
Generates reservation payment summaries and QR Ph / digital wallet checkout options integrated through a worker/server-side endpoint.
<img width="1280" height="612" alt="assets-02-paymongo-qrph-checkout" src="https://github.com/user-attachments/assets/6c1f9710-d90c-41cc-8f0d-1a0a2d98754b" />

### 3. Automated Booking Confirmation (EmailJS)
Sends structured reservation confirmation emails with event details, venue, schedule, seat assignments, and total amount.
<img width="674" height="734" alt="assets-03-emailjs-reservation-confirmation" src="https://github.com/user-attachments/assets/2edc3933-7dcc-425f-8835-253a5677d4a6" />

### 4. Cloud Firestore Collections & Transaction Records
Organizes application data across collections (`events`, `shows`, `reservations`, `orders`, `transactions`, `history`, `users`, `deleted_events`) with structured transaction and seat metadata.
<img width="991" height="525" alt="assets-04-firestore-transactions-schema" src="https://github.com/user-attachments/assets/1214753b-1d0c-45b3-948f-2fa0a7b08d67" />


## 🤝 My Contribution
Developed collaboratively as a group capstone project. My primary focus was on the **backend and technical implementation**, including:

- Firebase Authentication and Cloud Firestore integration
- Firestore security rules (`firestore.rules`)
- Reservation, payment, and transaction workflows
- PayMongo worker/server-side payment integration and EmailJS notification integration
- Core JavaScript logic, testing, and troubleshooting

*(UI/UX design and visual interface styling were developed collaboratively with my group members.)*

---

## 📁 Project Structure

```text
Teatro-Lasalliana/
├── LICENSE
├── README.md
├── index.html
├── About.html
├── Admin.html
├── Create.html
├── Delete.html
├── History.html<img width="1280" height="610" alt="assets-01-seat-showtime-selection" src="https://github.com/user-attachments/assets/8e305899-9f2d-4d7e-a60b-fc1fb495309e" />
├── ManageEvents.html
├── Payment.html
├── Play.html
├── Reservation.html
├── Teatro.html
├── Transaction.html
├── Run.bat
├── FB logo.png
├── Insta logo.jpg
├── Teatro logo.png
├── firestore.rules
└── js/
    ├── alerts.js
    ├── constants.js
    ├── firebase-config.js
    └── utils.js
