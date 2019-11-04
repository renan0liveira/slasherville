let spritesheet
let spritedata

const sW = 1024
const sH = 896

function preload(){
    l1 = new Level(sW, sH, 'room_01')
    p = new Player('cop', 258, 863, 46, 62, l1)
}

// (512, 448) * 2
function setup(){
    createCanvas(sW, sH)
    noSmooth()
    imageMode(CENTER)
    rectMode(CENTER)
    angleMode(DEGREES)

    l1.loadObjects()

    p.prepareAnimations()
}

function draw(){
    l1.draw()

    p.draw()
    p.update()
}   