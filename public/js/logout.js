const logout = async () => {
  try {
    console.log("hi");
    const result = await axios("/users/logout");
    window.location.replace("/");
  } catch (e) {
    console.log(e);
  }
};
//document.getElementById("has-user").addEventListener("click", logout);
