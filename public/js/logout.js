const logout = async () => {
  try {
    const result = await axios("/users/logout");
    window.location.replace("/");
  } catch (e) {}
};
//document.getElementById("has-user").addEventListener("click", logout);
