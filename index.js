const showBtn = document.querySelector("#hero-btn");
const closeBtn = document.getElementById("close-btn");
const overLay = document.querySelector(".overlay");
const innerBtn = document.querySelector(".inner-btn");
const names = document.getElementById("text-area");
const dates = document.getElementById("date");
const times = document.getElementById("time");
const services = document.getElementById("service");
const appointmentList = document.getElementById("appointment-list");
let appointments = [];

// Load appointments from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
        displayAppointments();
    }
});

// Display modal
showBtn.addEventListener("click", () => {
    overLay.classList.add("show");
});

// Close modal handlers
closeBtn.addEventListener("click", () => {
    overLay.classList.remove("show");
});

overLay.addEventListener("click", (e) => {
    if (e.target === overLay) {
        overLay.classList.remove("show");
    }
});

// Save appointment
innerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Validation
    if (!names.value.trim() || !dates.value || !times.value || !services.value) {
        window.alert("Please fill in all fields to complete your booking");
        return;
    }

    const booking = {
        id: Date.now(),
        name: names.value.trim(),
        date: dates.value,
        time: times.value,
        service: services.value
    };

    appointments.push(booking);
    saveToLocalStorage();
    displayAppointments();
    resetForm();
    overLay.classList.remove("show");
});

// Save appointments to localStorage
function saveToLocalStorage() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

// Display appointments in the list
function displayAppointments() {
    appointmentList.innerHTML = appointments.map((booking, index) => `
        <li class="appointment-item">
            <strong>${booking.name}</strong> - ${booking.service}. <br>
            Your appointment is on ${formatDate(booking.date)} at ${formatTime(booking.time)}.
            <button class="delete-btn" id="hero-btn" onclick="deleteAppointment(${index})">Delete</button>
        </li>
    `).join("");
}

// Delete appointment
function deleteAppointment(index) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        appointments.splice(index, 1);
        saveToLocalStorage();
        displayAppointments();
    }
}

// Reset form fields
function resetForm() {
    names.value = "";
    dates.value = "";
    times.value = "";
    services.selectedIndex = 0;
}

// Format date for better readability
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Format time for better readability
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}
