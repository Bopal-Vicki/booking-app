document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});

const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });
    window.location.replace("/");
  } catch (e) {
    alert(e.response.data);
    window.location.replace("/login");
  }
};
