# Teatro Lasalliana

Teatro Lasalliana is a web-based theater reservation and event management system developed as a **group capstone project**.

The system allows users to browse theater events, view event information, reserve seats, manage reservations, and handle transactions. It also provides administrative features for managing events and theater-related records.

## Features

### User Features

* User registration and login
* Browse theater events
* View event information
* Seat selection and reservation
* Reservation history
* Reservation management
* Payment functionality
* Transaction records

### Admin Features

* Admin authentication
* Create theater events
* Manage existing events
* Delete events
* Manage reservations
* View transactions

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Firebase Authentication
* Cloud Firestore
* Firebase Security Rules
* EmailJS
* PayMongo
* Cloudflare Workers

## My Contribution

Teatro Lasalliana was developed collaboratively as a group capstone project.

My primary contribution focused on the **backend and technical implementation** of the system, including:

* Firebase Authentication integration
* Cloud Firestore integration
* Firestore security rules
* Reservation and transaction functionality
* Payment integration
* Email service integration
* JavaScript functionality
* Backend-related testing and troubleshooting

The **UI/UX design and visual interface were developed by my group members collaboratively**.

## Project Structure

```
Teatro-Lasalliana/
│
├── LICENSE
├── README.md
├── index.html
├── About.html
├── Admin.html
├── Create.html
├── Delete.html
├── History.html
├── Login.html
├── ManageEvents.html
├── Payment.html
├── Play.html
├── Reservation.html
├── Teatro.html
├── Transaction.html
├── Run.bat
│
├── FB logo.png
├── Insta logo.jpg
├── Teatro logo.png
│
├── firestore.rules
│
└── js/
    ├── alerts.js
    ├── constants.js
    ├── firebase-config.js
    └── utils.js
```

## Running the Project

### Using the Included Batch File

On Windows, the project includes:

```
Run.bat
```

which can be used to start the project locally.

### Manual Setup

The project should be served through a local web server rather than opened directly using `file://`, particularly because the application uses JavaScript modules and Firebase services.

## Firebase

The application uses **Firebase Authentication** and **Cloud Firestore**.

The Firestore security rules are included in:

```
firestore.rules
```

The rules file must be deployed to the Firebase project separately. Simply uploading the file to GitHub does not change the rules deployed in Firebase.

## Payment

The project includes **PayMongo** payment functionality through a worker/server-side endpoint.

Private payment credentials and secret keys should not be stored in the frontend source code or committed to GitHub.

## Email

The application uses **EmailJS** for email-related functionality.

Client-side public identifiers required by EmailJS may be included in the application. Private credentials should not be committed to the repository.

## Project Status

This project was developed as an **academic group capstone project** and demonstrates the implementation of a theater reservation and event management system using web technologies and cloud-based services.

## License

This project includes a `LICENSE` file containing the applicable licensing terms.
