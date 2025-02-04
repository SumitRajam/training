
const images = ['https://picsum.photos/id/0/800/400', 'https://picsum.photos/id/10/800/400', 'https://picsum.photos/id/20/800/400', 'https://picsum.photos/id/15/800/400'];
let index = 0;
const image = document.getElementById("img");

function changeSlide(step) {
    index = (index + step + images.length) % images.length;
    image.src = images[index];
}

image.src = images[index];