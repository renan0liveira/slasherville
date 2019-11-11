class Enemy extends Body{

    constructor(x, y, w, h, name){
        super(x, y, w, h)

        this.sprite = new Sprite(name, x, y, w, h)

        this.health = 30

        this.strength = 25
    }

    takeDamage(damage){
        this.health -= damage
    }

    status(){
        return {health: this.health}
    }

    update(){
        const col = this.checkCollision(game.player)
        if(col){
            console.log('i\'m hitting the player')
        }
    }

    draw(){
        this.sprite.show()
        this.sprite.animate()
    }
    
}