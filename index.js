const colors = [
    './jake-peralta.jpeg', 
    './amy.jpeg',
    './charles.jpeg',
    './terry.jpeg',
    './holt.jpeg',
    './rosa.jpeg',
    './amy.jpeg',
    './amy.jpeg',
    './amy.jpeg'
]

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);;
}
function shuffleArray(array) {
    let result = array;
    for (let i = 0; i < result.length; i++) {
        const randomPosition = getRandomNumber(result.length);
        [result[randomPosition], result[i]] = [result[i], result[randomPosition]]
    }
    return result;  
}
const gameVals = shuffleArray([...colors, ...colors]);
let selectedValue = null;
let points = 0;
window.addEventListener("load", function(event) {
    const board = document.getElementsByClassName('board')[0];
    gameVals.forEach((_ , index) => {
        const tile =  this.document.createElement('img');
        tile.className = 'tile';
        tile.src = './default.jpeg';
        tile.dataset.index = index;
        board.appendChild(tile);
    });
});

window.addEventListener('click', event => {
    const target = event.target;
    if(event.target.classList.contains('tile')) {
        if(!selectedValue) {
            selectedValue = target.dataset.index;
            target.src = gameVals[target.dataset.index];
        } else {
            target.src = gameVals[target.dataset.index];
            setTimeout(() => {
                if(gameVals[target.dataset.index] === gameVals[selectedValue]) {
                    points += 1;
                    document.getElementsByClassName('success-prompt')[0].style.display = 'block';
                    setTimeout(() => {
                        document.getElementsByClassName('success-prompt')[0].style.display = 'none';
                    }, 1500)
                } else {
                    target.src = './default.jpeg';
                    document.querySelector(`[data-index="${selectedValue}"]`).src = './default.jpeg';
                }
                selectedValue = null;
            }, 1000)
        }
    }
});