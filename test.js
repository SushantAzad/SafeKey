let wordlist = "";

document
  .getElementById("passwordList")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        wordlist = e.target.result;
      };
      reader.readAsText(file);
    }
  });

function generatePassword() {
  const length = prompt(
    "Enter the desired length of the password (minimum 8):"
  );

  if (length < 8) {
    alert("Password length should be at least 8.");
    return;
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const allCharacters = upper + lower + digits + special;

  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; ++i) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  document.getElementById("password").value = password;
  checkPasswordStrength();
}

function copyPassword() {
  const passwordInput = document.getElementById("password");

  if (passwordInput.value) {
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(passwordInput.value).then(
      function () {
        alert("Password copied to clipboard!");
      },
      function (err) {
        alert("Failed to copy password: ", err);
      }
    );
  } else {
    alert("No password to copy. Please generate a password first.");
  }
}

function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const strengthMessage = document.getElementById("strengthMessage");
  const strengthBar = document.getElementById("strengthBar");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  let message = "";
  let color = "";
  let width = "";

  switch (strength) {
    case 0:
    case 1:
      message = "Very Weak";
      color = "red";
      width = "20%";
      break;
    case 2:
      message = "Weak";
      color = "orange";
      width = "40%";
      break;
    case 3:
      message = "Moderate";
      color = "yellow";
      width = "60%";
      break;
    case 4:
      message = "Strong";
      color = "lightgreen";
      width = "80%";
      break;
    case 5:
      message = "Very Strong";
      color = "green";
      width = "100%";
      break;
  }

  strengthMessage.innerText = message;
  strengthMessage.style.color = color;
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
}

function checkPasswordAgainstList() {
  const password = document.getElementById("password").value;
  const listCheckMessage = document.getElementById("listCheckMessage");

  if (!wordlist) {
    listCheckMessage.innerText = "No wordlist loaded.";
    listCheckMessage.style.color = "red";
    return;
  }

  const lines = wordlist.split("\n");
  if (lines.includes(password)) {
    listCheckMessage.innerText =
      "The password is commonly used and can be cracked easily.";
    listCheckMessage.style.color = "red";
  } else {
    const strengthMessage =
      document.getElementById("strengthMessage").innerText;
    if (strengthMessage === "Strong" || strengthMessage === "Very Strong") {
      listCheckMessage.innerText =
        "Good password, you can proceed with it further.";
      listCheckMessage.style.color = "green";
    } else {
      listCheckMessage.innerText = "Consider using a stronger password.";
      listCheckMessage.style.color = "orange";
    }
  }
}
