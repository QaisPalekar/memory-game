const characters = [
    './jake-peralta.jpeg', 
    './amy.jpeg',
    './charles.jpeg',
    './terry.jpeg',
    './holt.jpeg',
    './rosa.jpeg',
]

const gameVals = shuffleArray([...characters, ...characters]);
let selectedValue = null;
let steps = 0;
let isTitleEnabled = true;

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

function getDefaultTile(index) {
    const tile =  this.document.createElement('img');
    tile.className = 'tile';
    tile.src = './default.jpeg';
    tile.dataset.index = index;  
    return tile;  
}

function startGame() {
    const board = document.getElementsByClassName('board')[0];
    gameVals.forEach((_ , index) => {
        board.appendChild(getDefaultTile(index));
    });
    // board.style.visibility = 'visible';
    document.getElementsByClassName('game')[0].style.visibility = 'visible';
    document.getElementsByClassName('menu')[0].style.display = 'none';
}

window.addEventListener('click', event => {
    const target = event.target;
    if(event.target.classList.contains('tile')) {
        const currentIndex = target.dataset.index;
        console.log({currentIndex});
        if(!isTitleEnabled || currentIndex === selectedValue) {
            return;
        }
        if(!selectedValue) {
            selectedValue = currentIndex;
            target.src = gameVals[currentIndex];
        } else {
            target.src = gameVals[currentIndex];
            setTimeout(() => {
                if(gameVals[currentIndex] === gameVals[selectedValue]) {
                    document.getElementsByClassName('success-prompt')[0].style.display = 'block';
                    isTitleEnabled = false;
                    setTimeout(() => {
                        isTitleEnabled = true;
                        document.getElementsByClassName('success-prompt')[0].style.display = 'none';
                    }, 1000)
                } else {
                    target.src = './default.jpeg';
                    console.log(`[data-index="${selectedValue}"]`);
                    document.querySelector(`[data-index="${selectedValue}"]`).src = './default.jpeg';
                }
                selectedValue = null;
            }, 1000);
            steps++;
            document.querySelector('.steps').innerText = `Steps ${steps}`;
        }

    }
});