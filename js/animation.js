const img = document.querySelector('img');
const cards = document.querySelector('.cards');
const input = document.querySelector('#input');
const saerchButton = document.querySelector('.saerch-button');
const saetchBox = document.querySelector('.saetch-box');


setInterval(() => {
    img.style.marginRight = "5px";
    input.style.display = "block";
    saerchButton.style.display = "block";
    saetchBox.style.minWidth = "300px";
}, 1000);

saerchButton.addEventListener('click', () => {
    cards.style.maxHeight = "600px";
});
