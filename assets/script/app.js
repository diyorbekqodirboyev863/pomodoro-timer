let focus = document.getElementById('focus');
let shortbreak = document.getElementById('shortbreak');
let longbreak = document.getElementById('longbreak');
let buttons = document.querySelectorAll('.btn');
let start = document.getElementById('btn-start');
let reset = document.getElementById('btn-reset');
let pause = document.getElementById('btn-pause');
let time = document.getElementById('time');
let set;
let active = 'focus';
let count = 59;
let paused = true;
let mincount = 24;

time.textContent = `${mincount + 1}:00`

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
}

reset.addEventListener('click', (
    resetTime = () => {
        pauseTimer();
        switch (active) {
            case 'long':
                mincount = 14;
                break;
            case 'short':
                mincount = 4;
                break;
            default:
                mincount = 24;
                break
        }
        count = 59;
        time.textContent = `${mincount + 1}:00`;
    }
));

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove('btn-focus');
    });
}

focus.addEventListener('click', () => {
    removeFocus();
    focus.classList.add('btn-focus');
    pauseTimer();
    mincount = 24;
    count = 59;
    time.textContent = `${mincount + 1}:00`
});

shortbreak.addEventListener('click', () => {
    active = 'short';
    removeFocus();
    shortbreak.classList.add('btn-focus');
    pauseTimer();
    mincount = 4;
    count = 59;
    time.textContent = `${appendZero(mincount + 1)}:00`
});

longbreak.addEventListener('click', () => {
    active = 'long';
    removeFocus();
    longbreak.classList.add('btn-focus');
    pauseTimer();
    mincount = 14;
    count = 59;
    time.textContent = `${mincount + 1}:00`
});

pause.addEventListener('click',
    (pauseTimer = () => {
        paused = true;
        clearInterval(set);
        start.classList.remove('hide');
        pause.classList.remove('show');
        reset.classList.remove('show');
    }));

start.addEventListener('click', () => {
    reset.classList.add('show');
    pause.classList.add('show');
    start.classList.add('hide');
    start.classList.remove('show');
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(mincount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(mincount)}:${appendZero(count)}`;
            if (count == 0) {
                if (mincount != 0) {
                    mincount--;
                    count = 60;
                }
                else {
                    clearInterval(set);
                }
            }
        }, 1000);
    }
});