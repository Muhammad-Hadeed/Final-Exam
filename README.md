# Final-Exam
Tourism Management System is a web-based application to manage tourist attractions, visitors, and reviews. This system allows visitors to review attractions they have visited, manage their ratings, and see real-time statistics on top-rated attractions and visitor activities.


Technologies Used:

Backend: Node.js, Express, MongoDB, Mongoose
Frontend: HTML, CSS, JavaScript, Bootstrap
API Testing: Postman

Models: 
        there are all the objects formed on the specifications that were required in the project like the checks including entry fee having value more than -1 and the user emal on a specific format
Routes:
        All the basic get and post routes are made in these folders specifically related to their own criteriea
        additional methods like "all sites" are all based on live calculating logics that is the reason they are using async functions
Server:
        Server file is combining all the routes to a center as it is the main file alon with the additional routes i created for dashboard(details are next)

frontend:
        in frontend i tried to create a ui using html,css(bootstrap) and js 
        the main page shows the basics asked in the exam and the dashboard page calculates the values and gets the data from bckend to show current status of our three main objects
postman:
        the snippets of the postman and server are shown in word file attached with it

Installation Instructions:

Clone the repository: git clone <repository-link>
Navigate to the project directory: cd Final-Exam
Install dependencies: npm install
Start the server: npm start
The server will run on http://localhost:5000
Open the frontend in your browser (index.html) to interact with the application.

API Endpoints:

GET /attractions: Get all attractions.
POST /attractions: Add a new attraction.
GET /attractions/top-rated: Get top-rated attractions.
GET /visitors: Get all visitors.
POST /visitors: Register a new visitor.
POST /reviews: Post a new review for an attraction.
GET /reviews: Get all reviews.
GET /visitors/activity: Get visitor activities.

Conclusion: This project have been done with a great help of "AI" BUT I assure you to understand all the main and related aspects used in this project as a whole This project successfully integrates frontend and backend technologies to create a functional tourism management system. The application enables visitors to interact with attractions, post reviews, and view real-time statistics.