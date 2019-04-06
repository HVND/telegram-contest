import Canvas from './entities/canvas';

document.addEventListener('DOMContentLoaded', () => {
    new Canvas(window.innerWidth, 300, 30, 50, document.body).connect();
});
