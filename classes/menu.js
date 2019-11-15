class Menu {
    constructor(data){
        this.background = loadImage(`scenes/${data['name']}.png`)
        this.title = loadImage('assets/full_title.png')
        mouseEventClass = this
    }

    update(){}

    draw(){
        image(this.background, w/2, h/2, w, h)
        image(this.title, w/2, 250)
    }

    mouseEvent(){
        game.changeScene('story')
    }
}