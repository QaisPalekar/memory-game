const colors = ['red', 'pink', 'yellow', 'blue']

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
        const tile =  this.document.createElement('p');
        tile.className = 'tile';
        tile.dataset.index = index;
        board.appendChild(tile);
    });
});

window.addEventListener('click', event => {
    const target = event.target;
    if(event.target.classList.contains('tile')) {
        if(!selectedValue) {
            selectedValue = target.dataset.index;
            target.style.backgroundColor = gameVals[target.dataset.index];
        } else {
            target.style.backgroundColor = gameVals[target.dataset.index];
            setTimeout(() => {
                if(gameVals[target.dataset.index] === gameVals[selectedValue]) {
                    points += 1;
                } else {
                    target.style.backgroundColor = 'black';
                    document.querySelector(`[data-index="${selectedValue}"]`).style.backgroundColor = 'black';
                }
                selectedValue = null;
            }, 1000)
        }
    }
});