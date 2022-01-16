document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  signup(email, password, name);
});

const signup = async (email, password, name) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/users/signup",
      data: {
        email,
        password,
        name,
      },
    });
    window.location.replace("/");
  } catch (e) {
    if (e.response.data.startsWith("E11000")) alert("email is already in use");
    alert(e.response.data);
    window.location.replace("/signup");
  }
  alert(e);
};
