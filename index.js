const searchbar = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const url = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0481efbd80mshf28acb387d0f2c2p171fb3jsn1b10e47158f1",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

/* window.onload = async function () {
  getResults();
  filterAndpaste();
}; */

async function getResults() {
  const response = await fetch(url, options);
  const result = await response.text();
  return result;
}

async function filterAndpaste() {
  const awaitedResult = await getResults();
  const newResult = JSON.parse(awaitedResult);
  const resultArray = newResult.results;
  console.log(resultArray);
  let count = 0;

  resultArray.forEach((element) => {
    console.log(element.titleText.text);
    console.log(element.releaseYear.year);

    count = count + 1;
    let cardcount = "card".concat(count);

    const div = document.createElement("div");
    div.setAttribute("id", cardcount);
    div.setAttribute("class", "card");

    document.getElementById("container").appendChild(div);

    const image = document.createElement("img");

    try {
      image.src = element.primaryImage.url;
    } catch (error) {
      image.src = "Screenshot (6).png";
    }
    document.getElementById(cardcount).appendChild(image);
  });
}
function clearChildren() {
  const container = document.getElementById("container");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await clearChildren();
  const query = searchbar.value;
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}?exact=false`;
  const response = await fetch(url, options);
  const result = await response.json();
  const awaitedResult = await result;
  console.log(awaitedResult);
  const resultArray = awaitedResult.results;
  console.log(resultArray);
  let count = 0;

  resultArray.forEach((element) => {
    console.log(element.titleText.text);
    console.log(element.releaseYear.year);

    count = count + 1;
    let cardcount = "card".concat(count);

    const div = document.createElement("div");
    div.setAttribute("id", cardcount);
    div.setAttribute("class", "card");

    document.getElementById("container").appendChild(div);

    const image = document.createElement("img");

    try {
      image.src = element.primaryImage.url;
    } catch (error) {
      image.src = "Screenshot (6).png";
    }
    document.getElementById(cardcount).appendChild(image);
  });
});
