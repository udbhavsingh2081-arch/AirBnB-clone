AirBnB Clone

A full-stack property listing web application built with Node.js, Express.js, MongoDB, and EJS.

The application allows users to create and manage property listings, upload images, add reviews, authenticate using Passport.js, and view listing locations on a map.

Features
User registration and login
Session-based authentication
Create, edit, and delete property listings
Listing ownership and authorization
Add and delete reviews
Star-based rating system
Server-side form validation
Flash messages for user feedback
Search listings by location and price
Category-based listing filtering
Multiple image uploads
Cloudinary image storage
Map-based location display
Geolocation using listing coordinates
Responsive interface
MVC-based project structure
Centralized error handling
MongoDB database integration
Tech Stack

Frontend

HTML
CSS
JavaScript
EJS
Bootstrap

Backend

Node.js
Express.js

Database

MongoDB
Mongoose
MongoDB Atlas

Authentication

Passport.js
Passport Local Mongoose
Express Session

Validation & Middleware

Joi
Method Override
Custom Express Middleware
Express Error Handling

Image & Location

Cloudinary
Multer
Geocoding API
GeoJSON

Other

Git & GitHub
Render
Project Structure
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
