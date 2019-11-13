let game
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

function autodestruct(obj){
    delete obj
}

function preload(){
    game = new Game('main_menu')
}

// (512, 448) * 2
function setup(){
    createCanvas(w, h)
    noSmooth()
    imageMode(CENTER)
    rectMode(CENTER)
    angleMode(DEGREES)
}

function draw(){
    game.update()
    game.draw()
}   