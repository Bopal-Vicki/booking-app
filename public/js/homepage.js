const integrate = async () => {
  const result = await axios.get("/movies");
  console.log(result.data);

  for (let i = 0; i < result.data.length; i++) {
    let img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200/${result.data[i].poster_path}`;
    img.id = result.data[i].id;
    img.onclick = getMovie.bind(this, result.data[i].id);
    document.getElementById("container").appendChild(img);
  }
};

const getMovie = (id) => {
  window.location.href = `/movie/${id}`;
};

integrate();
