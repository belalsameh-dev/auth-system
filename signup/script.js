const nameInput = $("#name"),
  emailInput = $("#email"),
  passwordInput = $("#password"),
  cPasswordInput = $("#cPassword"),
  signUpBtn = $(".btn");

const users = JSON.parse(localStorage.getItem("users")) || [];

const fields = {
  name: {
    input: nameInput,
    regex: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
    emptyMsg: "Name is required.",
    invalidMsg:
      "Must contain letters only, with one optional space between 1st and 2nd name.",
  },
  email: {
    input: emailInput,
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    emptyMsg: "Email is required.",
    invalidMsg: "Must be a valid email address.",
  },
  password: {
    input: passwordInput,
    regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    emptyMsg: "Password is required.",
    invalidMsg:
      "Must be at least 8 characters and contain a letter and a number.",
  },
  cPassword: {
    input: cPasswordInput,
    emptyMsg: "Confirm password is required.",
    invalidMsg: "Confirm password must match the password.",
  },
};

// General validate function
function validate(field) {
  const value = field.input.val().trim();

  if (value === "") return field.emptyMsg;

  if (field.regex && !field.regex.test(value)) return field.invalidMsg;

  // Special case for confirm password
  if (field === fields.cPassword && value !== passwordInput.val()) {
    return field.invalidMsg;
  }

  return ""; // no error
}

// Handle input event
function handleInput(field) {
  field.input.on("input", () => {
    const errorMsg = validate(field);
    const errorElem = field.input.next();

    if (errorMsg) {
      errorElem.removeClass("d-none").text(errorMsg);
      field.input.addClass("border-danger");
    } else {
      errorElem.addClass("d-none").text("");
      field.input.removeClass("border-danger");
      field.input.addClass("border-success");
    }
  });
}

// Attach input events for all fields
for (const key in fields) {
  handleInput(fields[key]);
}

function alreadyExists(email) {
  return users.find((user) => user.email === email);
}

// Add a new user
function addNewUser() {
  let hasError = false;

  if (alreadyExists(emailInput.val().trim())) {
    $(".alert").removeClass("d-none").text("User already exists.");
    return;
  } else {
    $(".alert").addClass("d-none").text("");
  }

  for (const key in fields) {
    const errorMsg = validate(fields[key]);
    const errorElem = fields[key].input.next();

    if (errorMsg) {
      errorElem.removeClass("d-none").text(errorMsg);
      fields[key].input.addClass("border-danger");
      hasError = true;
    } else {
      errorElem.addClass("d-none").text("");
      fields[key].input.removeClass("border-danger");
      fields[key].input.removeClass("border-success");
    }
  }

  if (hasError) return;

  const user = {
    name: nameInput.val().trim(),
    email: emailInput.val().trim(),
    password: passwordInput.val(),
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);

  // Clear form
  $("form")[0].reset();

  // Redirect to login page
    location.href = "../signin/index.html";
}
signUpBtn.click(addNewUser);
