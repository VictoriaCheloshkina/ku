const match1 = document.querySelector('#match1')
const match2 = document.querySelector('#match2')
const match3 = document.querySelector('#match3')
const path1 = document.querySelector('#path1')
const path2 = document.querySelector('#path2')
const path3 = document.querySelector('#path3')
const heaps = document.querySelector('#heaps')

const data = JSON.parse(localStorage.getItem('game'))

if (data.res) {
    Object.keys(data.res).forEach(username => {
        const userRes = data.res[username]

        const heapsRes = document.createElement('span')
        heapsRes.innerHTML = `${username}: ${userRes.heaps || 0}`
        heaps.appendChild(heapsRes)

        if (userRes.path) {
            const path1Res = document.createElement('span')
            path1Res.innerHTML = `${username}: ${userRes.path[0]}`
            path1.appendChild(path1Res)
    
            const path2Res = document.createElement('span')
            path2Res.innerHTML = `${username}: ${userRes.path[1]}`
            path2.appendChild(path2Res)
    
            const path3Res = document.createElement('span')
            path3Res.innerHTML = `${username}: ${userRes.path[2]}`
            path3.appendChild(path3Res)
        }
        
        if (userRes.match) {
            const match1Res = document.createElement('span')
            match1Res.innerHTML = `${username}: ${userRes.match[0]}`
            match1.appendChild(match1Res)
    
            const match2Res = document.createElement('span')
            match2Res.innerHTML = `${username}: ${userRes.match[1]}`
            match2.appendChild(match2Res)
    
            const match3Res = document.createElement('span')
            match3Res.innerHTML = `${username}: ${userRes.match[2]}`
            match3.appendChild(match3Res)
        }
    })
}
