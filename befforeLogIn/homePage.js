
const signupHelpButton = document.getElementById("signupHelp");
const loginHelpButton = document.getElementById("loginHelp");
const testHelpButton = document.getElementById("testHelp");


const helpContent = document.getElementById("helpContent");

// Function to show help content
function showHelpContent(content) {
  helpContent.innerHTML = content;
  helpContent.style.display = "block";
}

// Function to hide help content
function hideHelpContent() {
  helpContent.style.display = "none";
}

// Event listeners for help buttons
signupHelpButton.addEventListener("click", () => {
  showHelpContent("<h3>Sign Up</h3><p>To create an account, click the 'Sign Up' button. You'll be asked to provide your email and create a password.</p>");
});

loginHelpButton.addEventListener("click", () => {
  showHelpContent("<h3>Log In</h3><p>To access your account, click the 'Log In' button. Enter your registered email and password to log in.</p>");
});

testHelpButton.addEventListener("click", () => {
  showHelpContent("<h3>The Test</h3><p>Once you're logged in, you can take the career guidance test. It will ask you a series of questions about your interests and preferences. After completing the test, you'll receive personalized recommendations.</p>");
});

const sidebarToggle = document.querySelector(".sidebar-toggle");

const sidebar =
document.querySelector(".sidebar");

// Add an event listener to the sidebar toggle
sidebarToggle.addEventListener("click", () => {
sidebar.classList.toggle("active");
});