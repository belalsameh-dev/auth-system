$(".card").text(`Welcome, ${JSON.parse(sessionStorage.getItem("username"))}!`);

$(".btn").click(() => {
    sessionStorage.removeItem("username");
    location.href = "../signin/index.html";
});