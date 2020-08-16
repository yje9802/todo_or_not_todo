// const body = document.querySelector("body");

// function loadImage() {
//     const image = new Image();
//     image.src = "https://source.unsplash.com/random/?landscape";
//     image.classList.add("bgImage");
//     body.prepend(image);
// }

// function init() {
//     loadImage();
// }
// init();

const body = document.querySelector("body");
const imgLocation = document.querySelector(".bg-location");
const UNSPLASH_API = "9RhhAabStfUj-ISyjesYnoMfg-HY2hQJAh7rsYDuM5U";

function loadImage() {
    fetch(`https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const image = new Image();
            const imageURL = json.urls.full;
            const imageCity = json.location.city;
            const imageCountry = json.location.country;

            image.src = `${imageURL}`;
            image.classList.add("bgImage");
            body.prepend(image);
            imgLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i></i> <div><span>${imageCity},</span> <span>${imageCountry}</span></div>`;
        });
}

function init() {
    loadImage();
}
init();
