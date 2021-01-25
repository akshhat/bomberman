const board = document.querySelector('.board');
const score = document.querySelector('#gameScore');
const button = document.querySelector('#resetButton');
let random = [];
let mineBlast = false;
const width = 9;
let points = 0;

for (let i = 0; i < width * width; i++) {
    const mine = document.createElement('div');
    mine.setAttribute('id', `cell_${i + 1}`);
    mine.setAttribute('class', 'mines');
    board.appendChild(mine);
}

while (random.length < 10) {
    let bombPos = Math.ceil(Math.random() * 81);
    if (!random.includes(bombPos)) {
        random.push(bombPos);
    }
}

function gameOver() {
    document.querySelectorAll('.mines').forEach(mine => {
        if (random.includes(Number(mine.id.slice(5, 7)))) {
            mine.classList.add('danger');
            mineBlast = true;
            document.querySelector('#resultDisplay').innerText = "game over";
        }
    })
}

document.querySelectorAll('.mines').forEach(mine => {
    mine.addEventListener('click', (e) => {
        if (random.includes(Number(e.target.id.slice(5, 7))) && !mineBlast) {
            e.target.classList.add('danger');
            gameOver();
        } else if (!mineBlast) {
            let isSafe = false;
            e.target.classList.forEach(name => {
                if (name == 'safe') {
                    isSafe = true;
                }
            })
            if (!isSafe) {
                e.target.classList.add('safe');
                const one = document.createTextNode('1');
                mine.appendChild(one);
                points++;
                score.innerText = points;
                if (points == 71) {
                    document.querySelector('#resultDisplay').innerText = "win";
                    mineBlast = true;
                }
            }
        }
    })
})

button.addEventListener('click', () => {
    location.reload();
})