// Grab elements we need once
const form = document.getElementById("surveyForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const satisfactionSelect = document.getElementById("satisfaction");
const commentsInput = document.getElementById("comments");
const feedback = document.getElementById("formFeedback");

// Simple email check: text@text.text
function isEmailValid(email) {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

// Show a message in the feedback area
function showFeedback(message) {
  feedback.textContent = message || "";
}

// Validate name and email and show messages
function validateInputs() {
  if (!nameInput.value.trim()) {
    showFeedback("Name is required.");
    return false;
  }
  if (!isEmailValid(emailInput.value.trim())) {
    showFeedback("Please enter a valid email address.");
    return false;
  }
  // If both are good, clear message
  showFeedback("");
  return true;
}

// Real-time validation as the user types
nameInput.addEventListener("input", validateInputs);
emailInput.addEventListener("input", validateInputs);

// Handle submit: stop the page from reloading and process the data
form.addEventListener("submit", function (event) {
  event.preventDefault(); // don't let the browser submit

  // Check inputs one more time
  if (!validateInputs()) {
    // Focus the first invalid field to help the user
    if (!nameInput.value.trim()) {
      nameInput.focus();
    } else {
      emailInput.focus();
    }
    return; // stop here if invalid
  }

  // Collect data
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const satisfaction = satisfactionSelect.value || "Not selected";
  const recommendationRadio = document.querySelector(
    'input[name="recommendation"]:checked'
  );
  const recommendation = recommendationRadio
    ? recommendationRadio.value
    : "Not selected";
  const comments = commentsInput.value.trim() || "None";

  // Build a simple summary block
  const summaryHtml = [
    "<h2>Submission Summary</h2>",
    "<p><strong>Name:</strong> " + name + "</p>",
    "<p><strong>Email:</strong> " + email + "</p>",
    "<p><strong>Satisfaction:</strong> " + satisfaction + "</p>",
    "<p><strong>Recommendation:</strong> " + recommendation + "</p>",
    "<p><strong>Comments:</strong> " + comments + "</p>",
  ].join("");

  // Put summary on the page (below the form)
  let results = document.getElementById("results");
  if (!results) {
    results = document.createElement("div");
    results.id = "results";
    form.after(results); // place right after the form
  }
  results.innerHTML = summaryHtml;

  // Reset the form after successful submit
  form.reset();
  // Clear any leftover messages
  showFeedback("");
});
