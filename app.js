const canvas = document.getElementById('canvas');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const sizeElement = document.getElementById('size');
const colourElement = document.getElementById('color');
const clearElement = document.getElementById('clear');
const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
colourElement.value = 'black';
let colour = colourElement.value;
let x = undefined;
let y = undefined;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    y = e.offsetY;
    x = e.offsetX;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x, y);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

document.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

increaseButton.addEventListener('click', () => {
    size += 5;
    if (size > 60) {
        size = 60;
    }
    updateSizeOnScreen();
});

decreaseButton.addEventListener('click', () => {
    size -= 5;
    if (size <= 0) {
        size = 1;
    }
    updateSizeOnScreen();
});

colourElement.addEventListener('change', (e) => (
    colour = e.target.value
));  

clearElement.addEventListener('click', () => (
    ctx.clearRect(0, 0, canvas.width, canvas.height)
));

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = colour;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = colour;
    ctx.fill();
}

function updateSizeOnScreen() {
    sizeElement.innerText = size;
}