import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search).get("city");
  return params;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const data = await fetch(
      `${config["backendEndpoint"]}/adventures?city=${city}`
    );
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // console.log(adventures);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let div = document.createElement("div");
    div.setAttribute("class", "col-6 col-lg-3 mb-4 position-relative");

    div.innerHTML = `
      <div class="category-banner">${key.category}</div>
      <a class="activity-card" href="detail/?adventure=${key.id}" id="${key.id}">
        <img src="${key.image}" />
        <div class="card-body text-center">
          <div class="d-md-flex justify-content-between">
              <h5>${key.name}</h5>
              <p>₹${key.costPerHead}</p>
          </div>
          <div class="d-md-flex justify-content-between">
              <h5>Duration</h5>
              <p>${key.duration} Hours</p>
          </div>
        </div>
      </a>
    `;

    document.getElementById("data").appendChild(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredByDuration = list.filter((val) => {
    let timeVal = val['duration'];
    if(timeVal >= low && timeVal <= high){
      return timeVal;
    } else if (timeVal === null){
      return list;
    }
  });

  return filteredByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // let filteredByCategory = list.filter((e) => e.category === categoryList);
  let filteredByCategory = list.filter((e) => categoryList.includes(e.category));

  return filteredByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  
  const splitingFilterTime = filters['duration'].replace(' Hours','').split('-');
  const low = splitingFilterTime[0], high = splitingFilterTime[1];

  // let low = filters.duration.split("-")[0];
  // let high = filters.duration.split("-")[1];

  const filterCategory = filters['category'];

  let filteredlist = [];

  if (filters["category"].length > 0 && filters["duration"].length > 0) {
    let a = filterByCategory(list, filterCategory);
    let b = filterByDuration(list, low, high);
    a.forEach(key1 => {
      b.forEach(key2 => {
        if(key1.id === key2.id){
          return filteredlist.push(key1);
        }
      })
    });
  } else if (filters["category"].length > 0 && filters["duration"].length == 0){
    filteredlist = filterByCategory(list, filterCategory);
  } else if (filters["duration"].length > 0 && filters["category"].length == 0){
    filteredlist = filterByDuration(list, low, high);
  } else {
    return list;
  }

  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let a = filters['category'];
  a.forEach(key => {
    let div = document.createElement('div');
    div.setAttribute('class', 'category-filter');

    div.innerHTML = `
      ${key}
    `;

    document.getElementById('category-list').appendChild(div);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
