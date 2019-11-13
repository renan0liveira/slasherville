class Player extends Body{

    constructor(name, x, y, w, h){
        super(x, y, w, h)
        this.sprite = new Sprite(name, x, y, w, h)

        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.health = 100
        this.damageCouldown = 500
        this.damageTimer = 0

        // knife size = {w: 20, h:40}
        // TODO: knife also has to be a object that inherits from body, 
        // this way its collisions could be checked independently
        this.knife = loadImage('assets/knife.png')
        this.knifeCooldown = 1000
        this.knifeTimer = new Timer(this.knifeCooldown)
        this.knifeStregth = 10
    }

    status(){
        return {healt: this.health}
    }

    update(){
        this.knifeTimer.tick()

        let fx = this.x
        let fy = this.y
        let knifeBounds = null

        if(keyIsDown(90)){

            if(this.knifeTimer.run()){

                if(this.sprite.currAnim == 'walkleft' || this.sprite.currAnim == 'idle-left'){
    
                    knifeBounds = {
                        x: this.x - this.w/2 - 10,
                        y: this.y,
                        w: 40,
                        h: 20
                    }
    
                    game.scene.showObject({
                        sprite: this.knife,
                        x: this.x - this.w/2 - 10,
                        y: this.y,
                        w: 20,
                        h: 40,
                        time: 500,
                        rotation: -90
                    })
                }
                else if(this.sprite.currAnim == 'walkright' || this.sprite.currAnim == 'idle-right'){
    
                    knifeBounds = {
                        x: this.x + this.w/2 + 10,
                        y: this.y,
                        w: 40,
                        h: 20
                    }

                    game.scene.showObject({
                        sprite: this.knife,
                        x: this.x + this.w/2 + 10,
                        y: this.y,
                        w: 20,
                        h: 40,
                        time: 500,
                        rotation: 90
                    })
                }
                else if(this.sprite.currAnim == 'walkup' || this.sprite.currAnim == 'idle-up'){
    
                    knifeBounds = {
                        x: this.x,
                        y: this.y - this.h/2 - 10,
                        w: 20,
                        h: 40
                    }

                    game.scene.showObject({
                        sprite: this.knife,
                        x: this.x,
                        y: this.y - this.h/2 - 10,
                        w: 20,
                        h: 40,
                        time: 500
                    })
                }
                else if(this.sprite.currAnim == 'walkdown' || this.sprite.currAnim == 'idle-down'){
                    
                    knifeBounds = {
                        x: this.x,
                        y: this.y + this.h/2 + 10,
                        w: 20,
                        h: 40
                    }

                    game.scene.showObject({
                        sprite: this.knife,
                        x: this.x,
                        y: -1 * this.y - this.h/2 - 10,
                        w: 20,
                        h: 40,
                        scale: {x: 1, y: -1},
                        time: 500
                    })
                    // scale(1, -1)
                    // image(this.knife, this.x, -1 * this.y - this.h/2 - 10, 20, 40)
                }

            }

        }

        if(keyIsDown(LEFT_ARROW)){
            this.sprite.setAnimation('walkleft')
            fx = this.x - 0.2 * deltaTime
        }
        else if(keyIsDown(RIGHT_ARROW)){
            this.sprite.setAnimation('walkright')
            fx = this.x + 0.2 * deltaTime
        }
        else if(keyIsDown(UP_ARROW)){
            this.sprite.setAnimation('walkup')
            fy = this.y - 0.2 * deltaTime
        }
        else if(keyIsDown(DOWN_ARROW)){
            this.sprite.setAnimation('walkdown')
            fy = this.y + 0.2 * deltaTime
        }
        else{
            if(this.sprite.currAnim == 'walkleft')
                this.sprite.setAnimation('idle-left')

            if(this.sprite.currAnim == 'walkright')
                this.sprite.setAnimation('idle-right')

            if(this.sprite.currAnim == 'walkup')
                this.sprite.setAnimation('idle-up')

            if(this.sprite.currAnim == 'walkdown')
                this.sprite.setAnimation('idle-down')
        }

        game.scene.bodies.forEach(obj => {
            const col = obj.checkCollision(this)
            
            if(col){
                if(obj.constructor.name  == 'Wall'){
                    
                    // horizontal collision
                    if(col.dx < col.dy){

                        // player is to the left
                        if (this.x < obj.x){
                            fx = obj.x - obj.w/2 - this.w/2
                        // player is to the right
                        }else{
                            fx = obj.x + obj.w/2 + this.w/2
                        }

                    }
                    // vertical collision
                    else if (col.dy < col.dx){

                        // player is above
                        if (this.y < obj.y){
                            fy = obj.y - obj.h/2 - this.h/2
                        // player is below
                        }else{
                            fy = obj.y + obj.h/2 + this.h/2
                        }

                    }
                }
            }

            if(knifeBounds){
                const knifeCol = obj.checkCollision(knifeBounds)

                if(knifeCol && obj.constructor.name  == 'Enemy')
                    obj.takeDamage(this.knifeStregth)
            }
            
        })

        this.x = fx
        this.y = fy
    }

    draw(){
        this.sprite.x = this.x
        this.sprite.y = this.y

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