const url = window.location.href;
const split = url.split("/");
const id = split[split.length - 1];

document.getElementById("book-btn").addEventListener("click", () => {
  auth();
});

const auth = async () => {
  try {
    const result = await axios.get("/book");
    if (result) book();
  } catch (e) {
    if (e) alert("login or signup first");
  }
};

const book = async () => {
  document.getElementById("book").style.display = "none";
  const noOfSeats = document.createElement("label");
  noOfSeats.innerText = "NUMBER OF SEATS ";
  noOfSeats.style.fontSize = "35px";
  document.getElementById("movie").append(noOfSeats);
  const lineBreak = document.createElement("br");
  document.getElementById("movie").append(lineBreak);
  const input = document.createElement("input");
  input.type = Number;
  input.placeholder = 1;
  input.id = "no-of-seats";
  document.getElementById("movie").append(input);
  document.getElementById("movie").append(lineBreak);
  const submit = document.createElement("button");
  submit.innerHTML = "submit";
  submit.id = "done";
  document.getElementById("movie").append(submit);

  document.getElementById("done").addEventListener("click", () => {
    order(id);
  });
};

const order = async (movieId) => {
  const seats = document.getElementById("no-of-seats").value;
  const movieName = document.getElementById("movieName").textContent;
  try {
    const result = await axios({
      method: "POST",
      url: "/order",
      data: {
        movieId,
        seats,
        movieName,
      },
    });
    alert("confirm your booking at your given email");
    window.location.replace("/");
  } catch (e) {
    alert("sorry something went wrong");
  }
};
