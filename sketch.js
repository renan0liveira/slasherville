let game
const sW = 1024
const sH = 896

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
    game = new Game(sW, sH, 'room_01')
}

// (512, 448) * 2
function setup(){
    createCanvas(sW, sH)
    noSmooth()
    imageMode(CENTER)
    rectMode(CENTER)
    angleMode(DEGREES)
}

function draw(){
    game.update()
    game.draw()
}   