const leftBar = [...document.querySelectorAll(".left-bar>*")]
const rightBar = [...document.querySelectorAll(".right-bar>*")]
const overlay = document.querySelector('.game-overlay')
const overlayText = document.querySelector('.game-overlay__text')
const main = document.querySelector('main')
const dict = JSON.parse(main.getAttribute('data-config'))
const level = main.getAttribute('data-level')
const move = +main.getAttribute('data-move')
const timerVal = +main.getAttribute('data-timer')
const timerEl = document.querySelector('#timer')
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const state = {
    isDraw: false
}

initCanvas()
bindEvents()

const colors = ['#CD5C5C', '#98FB98', '#8FBC8F', '#EEE8AA', '#778899'].sort(() => Math.random()-0.5)

const rightUrls = [
    "./img/oneren_lilo_2d300c0a-e49f-4d88-8367-ce2780a0045d.png",
    "./img/oneren_queen_c487546e-16d4-4512-8fa8-b6afaf771b97.png",
    "./img/oneren_mammoth_70a6f564-dcc9-401d-a1c5-a2764fd8f9b1.png"   
]

let selectedLeftIndex = null
let pairsFound = 0


for (let i=0; i < rightBar.length; i++) {
    rightBar[dict[i]].src = rightUrls[i]
}

setInterval(() => {
    leftBar.forEach(item => {
        item.style.transform = `translate(${Math.random()*move}px, ${Math.random()*move}px)`
    })
    rightBar.forEach(item => {
        item.style.transform = `translate(${Math.random()*move}px, ${Math.random()*move}px)`
    })
}, 2000)

function bindEvents() {
    leftBar.forEach(item => item.addEventListener('dragstart', function(event) { event.preventDefault(); }))
    rightBar.forEach(item => item.addEventListener('dragstart', function(event) { event.preventDefault(); }))

    leftBar.forEach(item => item.addEventListener('click', handleLeftSelect))
    rightBar.forEach(item => item.addEventListener('click', handleRightSelect))

    canvas.addEventListener('mousemove', draw)
}

function handleLeftSelect(e) {
    if (selectedLeftIndex !== null) leftBar[selectedLeftIndex].style.border = "none"
    selectedLeftIndex = leftBar.indexOf(e.target)
    leftBar[selectedLeftIndex].style.border = "5px solid red"
    state.isDraw = true
}

function handleRightSelect(e) {
    if (selectedLeftIndex === null) return

    state.isDraw = false

    const selectedRightIndex = rightBar.indexOf(e.target)
    if (dict[selectedLeftIndex] !== selectedRightIndex)  {
        handleEnd(false)
    }
    else {
        const color = colors.pop()
        leftBar[selectedLeftIndex].style.border = "5px solid " + color
        rightBar[selectedRightIndex].style.border = "5px solid " + color

        leftBar[selectedLeftIndex].removeEventListener('click', handleLeftSelect)
        rightBar[selectedRightIndex].removeEventListener('click', handleRightSelect)
        rightBar[selectedRightIndex].src = rightUrls[selectedLeftIndex]

        selectedLeftIndex = null

        pairsFound+=1
        if (pairsFound === 3) handleEnd(true)
    }
}

function handleEnd(status) {
    if (status) {
        overlay.classList.add('game-overlay__win')
        overlayText.innerHTML = 'Победа'

        const data = JSON.parse(localStorage.getItem('game')) || {}
        const res = data.res = data.res || {}
        const userRes = res[data.currentUser] = res[data.currentUser] || {}
        userRes.path = userRes.path || [0, 0, 0]
        userRes.path[+level-1] = userRes.path[+level-1] + 1 || 1

        localStorage.setItem('game', JSON.stringify(data));
    }
    else {
        overlay.classList.add('game-overlay__fail')
        overlayText.innerHTML = 'Поражение'
    }

    overlay.classList.remove('hide')
}


function initCanvas() {
    context.lineCap = "round";
    context.lineWidth = 8;
    context.strokeStyle = 'rgb(255, 255, 255)'
}

function draw(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var dx = e.movementX;
    var dy = e.movementY;

    if (state.isDraw) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - dx, y - dy);
      context.stroke();
      context.closePath();
    }
  };

function timer() {
    let value = timerVal

    setInterval(() => { 
        if (value > 0) {
            value-=1
            timerEl.innerHTML = value
        }
        if (value <= 0) handleEnd(false)
    }, 1000)
}
timer()