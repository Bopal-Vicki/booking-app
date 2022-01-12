const axios = require("axios");

function createDate(days, months, years) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
}

const date = createDate(-20, 0, 0);

const getmovies = async (total_pages) => {
  let data = [];
  for (let i = 1; i <= total_pages; i++) {
    let result = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&region=IN&page=${i}`
    );
    result.data.results.forEach((element) => {
      if (
        element.original_language == "ta" &&
        (new Date(element.release_date) > date || element.vote_average > 5)
      )
        data.push(element);
    });
  }
  return data;
};

module.exports = getmovies;
