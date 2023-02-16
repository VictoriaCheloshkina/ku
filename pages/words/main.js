const gameContainer = document.querySelector('main')
const overlay = document.querySelector('.game-overlay')
const overlayText = document.querySelector('.game-overlay__text')
const level = +gameContainer.getAttribute('data-level')-1
const timerEl = document.querySelector('#timer')
const timerVal = +gameContainer.getAttribute('data-timer')

pairsCount = [4, 7, 10]
console.log(level)

const words = [[
    ['Бык', 'Корова'],
    ['Лошадь', 'Мул'],
    ['Король', 'Королева'],
    ['Демон', 'Люцифер'],
    ['Баран', 'Овца'],
    ['Хряк', 'Свинья']
],
[
    ['Селезень', 'Утка'],
    ['Петух', 'Курица'],
    ['Шрек', 'Фиона'],
    ['Морж', 'Моржонок'],
    ['Еж', 'Еженок'],
    ['Собака', 'Щенок'],
    ['Черепаха', 'Черепашенок'],
    ['Слон', 'Слоненок'],
    ['Мамонт', 'Мамонтенок'],
    ['Медведь', 'Медвежонок']
],
[
    ['Корова', 'Теленок'],
    ['Лев', 'Львенок'],
    ['Олень', 'Олененок'],
    ['Слон', 'Слоненок'],
    ['Жираф', 'Жирафенок'],
    ['Зебра', 'Зебренок'],
    ['Горилла', 'Горилленок'],
    ['Коза', 'Козленок'],
    ['Тигр', 'Тигренок'],
    ['Конь', 'Жеребенок'],
    ['Крокодил', 'Крокодиленок'],
    ['Свинья', 'Поросенок'],
    ['Бегемот', 'Бегемотенок'],
    ['Орел', 'Орленок']
]][level].sort(() => Math.random()-0.5).slice(0, pairsCount[level])

const images = {
    "Королева": "./img/oneren_queen_c487546e-16d4-4512-8fa8-b6afaf771b97.png",
    "Король": "./img/oneren_european_king_af6f2c59-f70b-4ad1-ba28-8ae677c9882e.png",
    "Лошадь": "./img/oneren_horse_f8a60c5a-5bcb-4c00-80de-9e0303bf137f.png",
    "Мул": "./img/oneren_mule_8dded179-a6b3-4c04-95e2-3a1599aa953d.png",
    "Корова": "./img/oneren_cow_bd8dfe46-7e2e-44cd-8d57-510464a7c160.png",
    "Бык": "./img/oneren_bull_6e7e0b58-0c53-421f-a765-a59f6f814e1b.png",
    "Демон": "./img/oneren_dark_female_demon_c997b3d8-519a-4e38-9626-d2d32b4ba97a.png",
    "Люцифер": "./img/oneren_dark_lucifer_9deb481f-a89c-48c7-8220-0e72a620fe95.png",
    "Баран":"https://adonius.club/uploads/posts/2022-08/1661249510_1-adonius-club-p-morda-barana-zhivotnie-krasivo-foto-2.jpg", 
    "Овца":"https://zagadki-dlya-detej.ru/wp-content/uploads/2020/12/ovca.jpg",
    "Хряк":"https://goferma.ru/wp-content/uploads/2017/03/i-47.jpg", 
    "Свинья":"https://cdn.botanichka.ru/wp-content/uploads/2019/10/chem-kormit-sviney-05.jpg",
    "Селезень":"https://krasivosti.pro/uploads/posts/2021-12/1640349784_56-krasivosti-pro-p-selezni-utok-ptitsi-krasivo-foto-69.jpg", 
    "Утка":"https://m-chu.ru/wp-content/uploads/2019/03/a6dbc5ad9e8c88748155fe0a893f5178.jpg",
    "Петух":"https://proprikol.ru/wp-content/uploads/2020/11/kartinki-petuha-37.jpg", 
    "Курица":"https://gurukuru.ru/wp-content/uploads/2019/09/8347151917.jpg",
    "Шрек":"https://www.peoples.ru/character/movie/shrek/shrek_4.jpg", 
    "Фиона":"https://s.ekabu.ru/localStorage/post/94/b2/f3/3f/94b2f33f.jpg",
    "Морж":"https://image.winudf.com/v2/image/Y29tLkFuaW1hbHMuV2FscnVzTGl2ZVdhbGxwYXBlcl9zY3JlZW5fNF8xNTMwNDY0MTg2XzAyNg/screen-4.jpg?fakeurl=1&type=.jpg", 
    "Моржонок":"https://nypost.com/wp-content/uploads/sites/2/2014/07/2014-07-02t114021z_1549410620_gm1ea721if801_rtrmadp_3_germany.jpg?quality=90&strip=all&w=1317",
    "Еж":"https://proprikol.ru/wp-content/uploads/2020/06/ezhi-krasivye-kartinki-4.jpg", 
    "Еженок":"https://pic.rutubelist.ru/video/8c/a3/8ca3b5518289ccc2c1881c8b3a09b602.jpg",
    "Собака":"http://corgi-dnepr.com/images/cms/data/charl_z/charl_z5.jpg", 
    "Щенок":"https://motildazoo.ru/images/velshkorgiopisaniexarakterasekretidressi_546FEF77.jpg",
    "Черепаха":"https://fun-cats.ru/wp-content/uploads/3/e/c/3ec8f76b97b8a09c82b6199cf91595fc.jpeg", 
    "Черепашенок":"https://funart.pro/uploads/posts/2022-05/1653717696_19-funart-pro-p-lasti-cherepakhi-krasivo-foto-27.jpg",
    "Слон":"https://w-dog.ru/wallpapers/5/7/417710266538161/zhivotnye-slon-bivni-slony-savanna-afrika.jpg", 
    "Слоненок":"https://s.zefirka.net/images/2017-05-17/slonyata-milye-malenkie-giganty/slonyata-milye-malenkie-giganty-9.jpg",
    "Мамонт":"https://www.qfeast.com/imret/qp/5b50ae5001714fc99c8e0e3aa6ecb3.jpg", 
    "Мамонтенок":"https://sun9-12.userapi.com/impf/ebhE-dj4-5ATUcFRzP5KDujCnEBytGbKvRCP3g/I1DTLl05vHY.jpg?size=1280x720&quality=96&sign=e26d1f6e2ac492195c69061b9b3654f7&c_uniq_tag=ETIDRRowNycmWgBdt8YU8UGcVURp_YpLFgk60FAQn0M&type=album",
    "Медведь":"https://velesovik.ru/images/illness/2826/gallery_1041.jpg", 
    "Медвежонок":"http://www.almazfea.com/upload/items/1195.jpg",
    "Корова": "https://avatars.dzeninfra.ru/get-zen_doc/1860621/pub_626d2ba5668e4d3020fcc1ad_626d2cc0668e4d3020ff2421/scale_1200" ,
    "Теленок" : "https://pic.rutubelist.ru/video/2e/be/2ebeabba23f5d04af316aa76eed0829c.jpg",
    "Лев":"https://mobimg.b-cdn.net/v3/fetch/61/612e7b2b60c8712b7d620227907a06f7.jpeg" ,
    "Львенок":"https://mobimg.b-cdn.net/v3/fetch/7f/7f476d48a8db1138c16c65a889b65f66.jpeg",
    "Олень":"https://webmg.ru/wp-content/uploads/2022/09/i-11-60.jpeg", 
    "Олененок":"https://svoimi-rukami2.ru/wp-content/uploads/4/a/f/4af8944e62d9eab6883a632949ad144d.jpg",
    "Слон":"https://w-dog.ru/wallpapers/5/7/417710266538161/zhivotnye-slon-bivni-slony-savanna-afrika.jpg", 
    "Слоненок":"https://www.fonstola.ru/images/201603/fonstola.ru_225589.jpg",
    "Жираф":"https://kipmu.ru/wp-content/uploads/setchzhrf.jpg", 
    "Жирафенок":"https://i.pinimg.com/originals/f6/a4/0e/f6a40edc5642e78b75b32a442b5171d2.jpg",
    "Зебра":"https://fikiwiki.com/uploads/posts/2022-02/1644851466_14-fikiwiki-com-p-zebri-krasivie-kartinki-15.jpg", 
    "Зебренок":"https://stihi.ru/pics/2022/03/19/3742.jpg",
    "Горилла":"https://cherepah.ru/wp-content/uploads/3/4/5/3455f4d331ce267b138be02b50b6b0c3.jpeg", 
    "Горилленок":"https://i.pinimg.com/736x/73/03/2b/73032b655c5f36c6f1711fd4a83fcdbc.jpg",
    "Коза":"https://oselhoze.ru/wp-content/uploads/2020/05/belaya-koza-6.jpg", 
    "Козленок":"https://i-a.d-cd.net/8koixTnkWVwLk2ghPcJZzDjSyiA-1920.jpg",
    "Тигр":"https://w-dog.ru/wallpapers/5/9/450840564158180/tigr-zver-vzglyad-zelen.jpg", 
    "Тигренок":"https://e-rodnik.ru/wp-content/uploads/2022/01/tigr-hishchnik-zhivotnoe-styl-scaled-1.jpg",
    "Конь":"https://img5.goodfon.ru/original/3840x2550/0/eb/pole-trava-morda-priroda-fon-kon-loshad-zherebets-vesna-mo-3.jpg", 
    "Жеребенок":"https://i.pinimg.com/originals/d5/95/bb/d595bb735289e2ddfdd010ba64b2a9aa.jpg",
    "Крокодил":"https://bestvietnam.ru/wp-content/uploads/2020/06/%D0%9A%D1%80%D0%BE%D0%BA%D0%BE%D0%B4%D0%B8%D0%BB%D1%8B.jpg", 
    "Крокодиленок":"https://petzona.ru/wp-content/uploads/2019/04/krokodil-doma.-CHto-sleduet-znat.jpg",
    "Свинья":"https://cdn.botanichka.ru/wp-content/uploads/2019/10/chem-kormit-sviney-05.jpg", 
    "Поросенок":"https://agro-sales.ru/images/wiki/orig/11816b0823c27a185a92ae02b66d72b7.jpg",
    "Бегемот":"https://cdn.fishki.net/upload/post/2020/07/22/3375951/6815a62471cb767d67eda154d0f6118b.jpg", 
    "Бегемотенок":"https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663264480_46-mykaleidoscope-ru-p-veselii-begemot-vkontakte-53.jpg",
    "Орел":"https://klike.net/uploads/posts/2023-01/1674311983_3-31.jpg", 
    "Орленок":"https://celes.club/uploads/posts/2021-12/1639429260_7-celes-club-p-oryol-ptenets-ptitsi-krasivo-foto-8.jpg"
}

const colors = ['#CD5C5C', '#98FB98', '#8FBC8F', '#EEE8AA', '#778899', '#FF4500', '#556B2F', '#008080', '#8A2BE2', '#8B4513'].sort(() => Math.random()-0.5)
const userPairs = []
let current = null
let currentColor = null
let currentPair
let pairCounter = 0

function renderWords(words) {
    const flatWords = words.flat(2)
    flatWords.sort(() => Math.random()-0.5)
    console.log(flatWords)
    for (let i = 0; i < flatWords.length; i++) {
        const newWord = document.createElement('div')
        newWord.classList.add('word')
        newWord.style=`background-image:url("${images[flatWords[i]]}")`
        const span = document.createElement('span')
        span.innerHTML = flatWords[i]
        span.addEventListener('click', (event) => {event.stopPropagation()})
        newWord.appendChild(span)
        newWord.setAttribute('data-word', flatWords[i])
        newWord.addEventListener('click', handleClick)
        gameContainer.appendChild(newWord)
    }
}

function handleClick(e) {
    const target = e.target
    target.removeEventListener('click', handleClick)
    if (!current) {
        current = target
        currentColor = colors.pop()
        currentPair = [current.getAttribute('data-word')]
    }
    else {
        current = null
        currentPair.push(target.getAttribute('data-word'))
        if (!findPair(...currentPair)) handleEnd(false)
        else {
            userPairs.push(currentPair)
            pairCounter += 1
            if (pairCounter === words.length) handleEnd(true)
        }
    }
    target.style.border = "5px solid " + currentColor
    
}

function findPair(w1, w2) {
    for (let j = 0; j < words.length; j++) {
        curr1 = words[j][0]
        curr2 = words[j][1]

        if ((w1 === curr1 && w2 === curr2) || (w2 === curr1 && w1 === curr2)) return true
    }
    return false
}

function handleEnd(status) {
    if (status) {
        overlay.classList.add('game-overlay__win')
        overlayText.innerHTML = 'Победа'
        
        const data = JSON.parse(localStorage.getItem('game')) || {}
        const res = data.res = data.res || {}
        const userRes = res[data.currentUser] = res[data.currentUser] || {}
        userRes.match = userRes.match || [0, 0, 0]
        userRes.match[level] = userRes.match[level] + 1 || 1

        localStorage.setItem('game', JSON.stringify(data));
    }
    else {
        overlay.classList.add('game-overlay__fail')
        overlayText.innerHTML = 'Поражение'
    }

    overlay.classList.remove('hide')
}

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

renderWords(words)