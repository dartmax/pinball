("use strict");

const greatest = document.getElementById("greatest");
const img = document.getElementsByTagName("img")[0];
const pictures = document.getElementById("pictures");
const carusel = document.getElementById("carusel");

let currentPicure = 1;

carusel.onclick = event => {
    switch (event.target.id) {
        case "left": {
            pictures.scrollLeft -= img.width;
            currentPicure = currentPicure > 1 ? currentPicure - 1 : currentPicure;
            break;
        }
        case "right": {
            pictures.scrollLeft += img.width;
            currentPicure = currentPicure < 10 ? currentPicure + 1 : currentPicure;
            break;
        }
        default: {
            if (event.target.tagName === "IMG") {
                let center =
                    pictures.getBoundingClientRect().x +
                    pictures.clientWidth / 2 -
                    img.clientWidth / 2;
                pictures.scrollLeft -= center - event.target.getBoundingClientRect().x;
                currentPicure = event.target.dataset.id;
            }
        }
    }

    greatest.style.backgroundImage = `url(${
        document.querySelector(`img[data-id="${currentPicure}"]`).src
    })`;
};
