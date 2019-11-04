class Enemy extends Body{

    constructor(x, y, w, h, name){
        super(x, y, w, h)

        this.sprite = new Sprite(name, x, y, w, h)
    }

    draw(){
        this.sprite.show()
        this.sprite.animate()
    }
    
}