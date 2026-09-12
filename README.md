# AirBnB Clone

A full-stack property listing web application built with Node.js, Express.js, MongoDB, and EJS.

The application allows users to create and manage property listings, add reviews, and authenticate using session-based login.

## Features

- User registration and login
- Session-based authentication
- Create, edit, and delete property listings
- Listing ownership and authorization
- Add and delete reviews
- Star-based rating system
- Server-side form validation
- Flash messages for user feedback
- Responsive interface
- Map-based location display
- MVC-based project structure
- Centralized error handling
- MongoDB database integration

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- Passport.js
- Express Session

**Validation & Middleware**
- Joi
- Method Override
- Custom Express Middleware

**Other**
- Cloudinary
- Multer
- Git & GitHub

## Project Structure

```text
AirBnB-clone/
│
├── controllers/
│   ├── Listing.js
│   ├── reviews.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── Listing.js
│   ├── User.js
│   ├── review.js
│   └── middleware.js
│
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── user/
│   ├── edit.ejs
│   ├── error.ejs
│   ├── index.ejs
│   ├── new.ejs
│   └── show.ejs
│
├── public/
│   ├── css/
│   └── js/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── utilis/
│   ├── expressError.js
│   └── wrapAsync.js
│
├── app.js
├── cloudconfig.js
├── schema.js
├── package.json
└── .gitignore
