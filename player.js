class Player{

    constructor(name, x, y, w, h, level){

        this.sprite = new Sprite(name, x, y, w, h)

        this.level = level

        this.x = x
        this.y = y
        this.w = w
        this.h = h

        // knife size = {w: 20, h:40}
        // TODO: knife also has to be a object that inherits from body, 
        // this way its collisions could be checked independently
        this.knife = loadImage('itens/knife.png')

        // improvisation done for the damage system of this game in particular won't be in a actual game engine
        // TODO: create a collidableObject class or interface to make code more structured
        this.knifeBounds = null
    }

    update(){
        let fx = this.x
        let fy = this.y

        if(keyIsDown(90)){
            this.doingDamage = true

            push()
            if(this.sprite.currAnim == 'walkleft' || this.sprite.currAnim == 'idle-left'){

                this.knifeBounds = {
                    x: this.x - this.w/2 - 10,
                    y: this.y,
                    w: 40,
                    h: 20
                }

                translate(this.x - this.w/2 - 10, this.y)
                rotate(-90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkright' || this.sprite.currAnim == 'idle-right'){

                this.knifeBounds = {
                    x: this.x + this.w/2 + 10,
                    y: this.y,
                    w: 40,
                    h: 20
                }

                translate(this.x + this.w/2 + 10, this.y)
                rotate(90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkup' || this.sprite.currAnim == 'idle-up'){

                this.knifeBounds = {
                    x: this.x,
                    y: this.y - this.h/2 - 10,
                    w: 20,
                    h: 40
                }

                image(this.knife, this.x, this.y - this.h/2 - 10, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkdown' || this.sprite.currAnim == 'idle-down'){
                
                this.knifeBounds = {
                    x: this.x,
                    y: this.y + this.h/2 + 10,
                    w: 20,
                    h: 40
                }

                scale(1, -1)
                image(this.knife, this.x, -1 * this.y - this.h/2 - 10, 20, 40)
            }
            pop()

        }else{
            this.knifeBounds = null

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
        }

        for(const obj of this.level.bodies){
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
                else if(obj.constructor.name  == 'Enemy'){
                    console.log('you were hit')
                }
            }
        }

        this.x = fx
        this.y = fy
    }

    draw(){
        this.sprite.x = this.x
        this.sprite.y = this.y

        if(this.knifeBounds != null){
            rect(this.knifeBounds.x ,this.knifeBounds.y ,this.knifeBounds.w ,this.knifeBounds.h)
        }

        this.sprite.show()
        this.sprite.animate()
    }

}