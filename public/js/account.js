let flag = true;

const orders = async () => {
  if (flag) {
    const container = document.getElementById("container");
    const result = await axios.get("/bookings");
    for (let i = 0; i < result.data.length; i++) {
      let p = document.createElement("p");
      p.textContent = `MOVIE NAME: ${result.data[i].movieName}`;
      container.appendChild(p);
      let p1 = document.createElement("p");
      p1.textContent = `NUMBER OF SEATS: ${result.data[i].seats}`;
      container.appendChild(p1);
      let p2 = document.createElement("p");
      p2.textContent = `BOOKED AT: ${result.data[i].createdAt}`;
      container.appendChild(p2);
      let line = document.createElement("hr");
      container.appendChild(line);
      flag = false;
    }
  } else {
    flag = true;
    document.getElementById("container").innerHTML = "";
  }
};

document.getElementById("history-btn").addEventListener("click", orders);
