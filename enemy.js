class Enemy extends Body{

    constructor(x, y, w, h, name){
        super(x, y, w, h)

        this.sprite = new Sprite(name, x, y, w, h)

        this.health = 30

        this.strength = 25
    }

    update(){
        const col = this.checkCollision(game.player)
        if(col){
            console.log('i\'m hitting the player')
            game.player.takeDamage(this.strength)
        }
    }

    draw(){
        this.sprite.show()
        this.sprite.animate()
    }

    status(){
        return {health: this.health}
    }

    takeDamage(damage){
        this.health -= damage
    }
    
}