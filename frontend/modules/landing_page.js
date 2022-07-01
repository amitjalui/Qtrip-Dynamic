import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(config.backendEndpoint);

  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  console.log(cities);

  //Updates the DOM with the cities
  cities.map((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const fetchData = await fetch(config["backendEndpoint"] + "/cities");
    const jsonData = await fetchData.json();
    return jsonData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  const div = document.createElement('div');
  div.className = 'col-lg-3 col-6 mb-4';
  div.innerHTML = `
    <a class="tile" id="${id}" href="pages/adventures/?city=${id}">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
        <img class="img-responsive" src="${image}" />
    </a>
  `;

  document.getElementById('data').appendChild(div)
}

export { init, fetchCities, addCityToDOM };
