const imgList = document.getElementById('img-list');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const accesKey = 'xgqGcOmLHAw4GMZHumoHtGrHNBPQ9Pqyu-1Yns1PxPY';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;

function imgLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 20;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;
    }
}

function setAttributes(item, attributes) {
    for (const key in attributes) {
        item.setAttribute(key, attributes[key]);
    }
}

function displayData() {
    loader.hidden = false;
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        console.log(photo);
        const item = document.createElement('li');
        item.classList.add('img__item');

        const a = document.createElement('a');
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imgLoaded);

        a.appendChild(img);
        item.appendChild(a);
        imgList.appendChild(item);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayData();
    } catch (error) {
        
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();