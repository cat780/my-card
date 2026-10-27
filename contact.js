const questionForm = document.querySelector("#question-form");
const formStatus = document.querySelector("#form-status");

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!questionForm.reportValidity()) {
    return;
  }

  const formData = new FormData(questionForm);
  const subject = formData.get("subject").toString().trim();
  const body = [
    `Name: ${formData.get("name").toString().trim()}`,
    `Email: ${formData.get("email").toString().trim()}`,
    "",
    formData.get("message").toString().trim()
  ].join("\n");
  const mailto = `mailto:support@littlecard.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.textContent = "Your email app should open with this message ready to send. If it does not, email support@littlecard.example directly.";
  window.location.href = mailto;
});
