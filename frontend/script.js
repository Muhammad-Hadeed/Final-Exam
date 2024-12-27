const API_BASE = "http://localhost:5000"; // Ensure backend runs on port 5000

// Load Top-Rated Attractions
async function loadAttractions() {
    try {
        const res = await axios.get(`${API_BASE}/attractions/top-rated`);
        const attractions = res.data;
        const container = document.getElementById("attraction-list");
        container.innerHTML = "";

        attractions.forEach((attraction) => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card p-3">
                    <h5>${attraction.name}</h5>
                    <p>Location: ${attraction.location}</p>
                    <p>Entry Fee: $${attraction.entryFee}</p>
                    <p>Rating: ${"⭐".repeat(attraction.rating)}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading attractions:", error);
    }
}

// Load Visitors
async function loadVisitors() {
    try {
        const res = await axios.get(`${API_BASE}/visitors`);
        const visitors = res.data;
        const container = document.getElementById("visitor-list");

        const table = document.createElement("table");
        table.className = "table table-striped";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Visited Attractions</th>
                </tr>
            </thead>
            <tbody>
                ${visitors
                    .map(
                        (visitor) => `
                    <tr>
                        <td>${visitor.name}</td>
                        <td>${visitor.email}</td>
                        <td>${visitor.visitedAttractions.length}</td>
                    </tr>
                `
                    )
                    .join("")}
            </tbody>
        `;
        container.innerHTML = "";
        container.appendChild(table);
    } catch (error) {
        console.error("Error loading visitors:", error);
    }
}

// Load Reviews
async function loadReviews() {
    try {
        const res = await axios.get(`${API_BASE}/reviews`);
        const reviews = res.data;
        const container = document.getElementById("review-list");
        container.innerHTML = "";

        reviews.forEach((review) => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card p-3">
                    <h5>Attraction: ${review.attraction.name}</h5>
                    <p>Visitor: ${review.visitor.name}</p>
                    <p>Score: ${"⭐".repeat(review.score)}</p>
                    <p>Comment: ${review.comment || "No comment"}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

// Add Attraction Form
function showAddAttractionForm() {
    const container = document.getElementById("add-attraction-form");
    container.innerHTML = `
        <div class="card p-3">
            <h5>Add New Attraction</h5>
            <form onsubmit="addAttraction(event)">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input type="text" id="location" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="entryFee" class="form-label">Entry Fee</label>
                    <input type="number" id="entryFee" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Attraction</button>
            </form>
        </div>
    `;
}

// Add Attraction
async function addAttraction(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const entryFee = document.getElementById("entryFee").value;

    try {
        await axios.post(`${API_BASE}/attractions`, { name, location, entryFee });
        alert("Attraction added successfully!");
        loadAttractions();
    } catch (error) {
        console.error("Error adding attraction:", error);
        alert("Failed to add attraction.");
    }
}

// Add Visitor Form
function showAddVisitorForm() {
    const container = document.getElementById("add-visitor-form");
    container.innerHTML = `
        <div class="card p-3">
            <h5>Register Visitor</h5>
            <form onsubmit="addVisitor(event)">
                <div class="mb-3">
                    <label for="visitorName" class="form-label">Name</label>
                    <input type="text" id="visitorName" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="visitorEmail" class="form-label">Email</label>
                    <input type="email" id="visitorEmail" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-success">Register Visitor</button>
            </form>
        </div>
    `;
}

// Add Visitor
async function addVisitor(event) {
    event.preventDefault();
    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;

    try {
        await axios.post(`${API_BASE}/visitors`, { name, email });
        alert("Visitor registered successfully!");
        loadVisitors();
    } catch (error) {
        console.error("Error registering visitor:", error);
        alert("Failed to register visitor.");
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadAttractions();
    loadVisitors();
    loadReviews();
});
document.getElementById("goToDashboard").addEventListener("click", function() {
  window.location.href = "dashboard.html";  // Redirects to dashboard.html
});