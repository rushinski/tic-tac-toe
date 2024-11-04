let check = 1;
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;

function clicked(selected) {
    if (selected.value === 'X' || selected.value === 'O') {
        alert(`The space you selected already contains a ${selected.textContent} already, please select a different space`);
        return;
    }

    const element = document.querySelector('#' + selected.id);
    
    if (check === 1) {
        element.value = 'X';
        element.textContent = 'X';
        check++;
    } else {
        element.value = 'O';
        element.textContent = 'O';
        check--;
    }
    checkGame();
}

function checkGame() {
    const btnsLoc = document.querySelector('.btn-container');
    const btns = [...btnsLoc.querySelectorAll("button")];

    const winLoc = [
        [btns[0].value, btns[1].value, btns[2].value],
        [btns[3].value, btns[4].value, btns[5].value],
        [btns[6].value, btns[7].value, btns[8].value],
        [btns[0].value, btns[3].value, btns[6].value],
        [btns[1].value, btns[4].value, btns[7].value],
        [btns[2].value, btns[5].value, btns[8].value],
        [btns[0].value, btns[4].value, btns[8].value],
        [btns[2].value, btns[4].value, btns[6].value]
    ];

    for (let i = 0; i < winLoc.length; i++) {
        if (winLoc[i].every(boxX => boxX === 'X')) { 
            setTimeout(() => {
                alert('Player X wins!');
                newScore('X');
                cleanBoard();
            }, 10);
            return;
        } else if (winLoc[i].every(boxO => boxO === 'O')) {
            setTimeout(() => {
                alert('Player O wins!');
                newScore('O');
                cleanBoard();
            }, 10);
            return;
        }
    }

    checkTie(btns);
}

function checkTie(buttons) {
    if (buttons.every(box => box.value !== 'empty')) {
        setTimeout(() => {
            alert('The game was a tie, no winner...');
            newScore('Tie')
            cleanBoard();
        }, 10); 
    }    
}

function cleanBoard() {
    const buttons = document.querySelectorAll('.btn-container button');
    buttons.forEach(button => {
        button.value = 'empty';
        button.textContent = '';
    });
    check = 1;
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-container button');
    buttons.forEach(button => {
        button.value = 'empty'; 
        button.addEventListener('click', () => clicked(button));
    });
});

function newScore(winner) {
    if (winner === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
    }  else if (winner === 'O') {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
    }
    else{
     scoreTie++
     document.getElementById('scoreTie').textContent = scoreTie;
    }
}
