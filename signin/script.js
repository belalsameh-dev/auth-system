const emailInput = $("#email"),
  passwordInput = $("#password"),
  signInBtn = $(".btn");

const fields = {
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
};

function validate(field) {
    const value = field.input.val().trim();

    if (value === "") return field.emptyMsg;

    if (!field.regex.test(value)) return field.invalidMsg;

    return ""; // no error
}

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
    })
}

for (const key in fields) {
    handleInput(fields[key]); 
}

function loginUser(){
    let hasError = false;
    const email = emailInput.val();
    const password = passwordInput.val();

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
            fields[key].input.addClass("border-success");
        }
    }
    if (hasError) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (users.length === 0 || !user) {
        $(".alert").removeClass("d-none").text("No users found. Please sign up first or try again.");
        return;
    } else {
        $(".alert").addClass("d-none").text("");
    }

    sessionStorage.setItem("username", JSON.stringify(user.name));
    window.location.href = "../home/index.html";
}
signInBtn.click(loginUser);