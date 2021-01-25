const board = document.querySelector('.board');
const score = document.querySelector('#score');
const button = document.querySelector('#again');
let bombsArray = [];
let mineBlast = false;
const width = 9;
let points = 0;

for (let i = 0; i < width * width; i++) {
    const mine = document.createElement('div');
    mine.setAttribute('id', `cell_${i + 1}`);
    mine.setAttribute('class', 'mines');
    board.appendChild(mine);
}

while (bombsArray.length < 10) {
    let bombPos = Math.ceil(Math.random() * 81);
    if (!bombsArray.includes(bombPos)) {
        bombsArray.push(bombPos);
    }
}

function gameOver() {
    document.querySelectorAll('.mines').forEach(mine => {
        if (bombsArray.includes(Number(mine.id.slice(5, 7)))) {
            mine.classList.add('danger');
            mineBlast = true;
        }
    })
}

document.querySelectorAll('.mines').forEach(mine => {
    mine.addEventListener('click', (e) => {
        if (bombsArray.includes(Number(e.target.id.slice(5, 7))) && !mineBlast) {
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
                points++;
                score.innerText = points;
            }
        }
    })
})

button.addEventListener('click', () => {
    location.reload();
})