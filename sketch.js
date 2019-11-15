let game

let sprites = {cop: null, zombie_01: null}

const w = 1024
const h = 896

function syncJSON(file, callback){
    const rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", file, false)
    rawFile.onreadystatechange = function() {
        if (rawFile.status == "200") {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}

function preload(){
    Object.keys(sprites).forEach(s => sprites[s] = loadImage(`sprites/${s}.png`))
}

// (512, 448) * 2
function setup(){
    createCanvas(w, h)
    noSmooth()
    imageMode(CENTER)
    rectMode(CENTER)
    angleMode(DEGREES)
    
    game = new Game('main_menu')
}

function draw(){
    game.draw()
    game.update()
    
}   