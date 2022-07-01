import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const res = urlParams.get("adventure");

  // Place holder for functionality to work in the Stubs
  return res;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const data = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const jsondata = await data.json();
    return jsondata;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").innerHTML = adventure["name"];
  document.getElementById("adventure-subtitle").innerHTML = adventure["subtitle"];

  adventure["images"].forEach((img) => {
    let imgTag = document.createElement("img");
    imgTag.classList = "activity-card-image";
    imgTag.setAttribute("src", img);

    document.getElementById("photo-gallery").append(imgTag);
  });

  document.getElementById("adventure-content").innerText = adventure["content"];

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let carouselBootstrap = document.getElementById("photo-gallery");
  carouselBootstrap.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div class="carousel-inner" id="carousel-img">
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  images.forEach((img, index) => {
    let div = document.createElement("div");
    div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    div.innerHTML = `
      <img class="activity-card-image" src="${img}">
    `;
    document.getElementById("carousel-img").appendChild(div);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  const soldOut = document.getElementById('reservation-panel-sold-out')
  const available = document.getElementById('reservation-panel-available')

  if(adventure['available'] === true){
    soldOut.style.display = 'none';
    available.style.display = 'block';
    document.getElementById('reservation-person-cost').innerHTML = adventure['costPerHead']
  } else {
    available.style.display = 'none';
    soldOut.style.display = 'block';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById('reservation-cost').innerHTML = adventure['costPerHead'] * persons; 
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let submitForm = document.getElementById('myForm');
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: submitForm.elements['name'].value,
      date: submitForm.elements['date'].value,
      person: submitForm.elements['person'].value,
      adventure: adventure.id
    }

    makeRequest(data);
  });

  const makeRequest = async (data) => {
    try {
      const postdata = await fetch(`${config['backendEndpoint']}/reservations/new`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json"}
      })
      const jsondata = await postdata.json();   // extra line of code
      alert('Success!');
      document.getElementById('myForm').reset();
    } catch (err) {
      alert('Failed!');
    }
  }

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  const reservedNotify = document.getElementById('reserved-banner');

  if(adventure['reserved'] === true){
    reservedNotify.style.display = 'block'; 
  } else {
    reservedNotify.style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
