class Slideshow{
    constructor(data){
        this.slides = eval(data['slides-array'])
        this.index = 0
        mouseEventClass = this
    }
    
    update(){}

    draw(){
        image(this.slides[this.index], w/2, h/2, w, h)
    }

    mouseEvent(){
        ++this.index
        if(this.index == this.slides.length){
            game.changeScene('room_01')
        }
    }
}