class Player{

    constructor(name, x, y, w, h, level){

        this.sprite = new Sprite(name, x, y, w, h)

        this.level = level

        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.knife = loadImage('itens/knife.png')
    }

    update(){
        let fx = this.x
        let fy = this.y

        if(keyIsDown(90)){

            push()
            if(this.sprite.currAnim == 'walkleft' || this.sprite.currAnim == 'idle-left'){
                translate(this.x - this.w/2 - 10, this.y)
                rotate(-90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkright' || this.sprite.currAnim == 'idle-right'){
                translate(this.x + this.w/2 + 10, this.y)
                rotate(90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkup' || this.sprite.currAnim == 'idle-up'){
                image(this.knife, this.x, this.y - this.h/2 - 10, 20, 40)
            }
            else if(this.sprite.currAnim == 'walkdown' || this.sprite.currAnim == 'idle-down'){
                scale(1, -1)
                image(this.knife, this.x, -1 * this.y - this.h/2 + 10, 20, 40)
            }
            pop()

        }else{
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

            // fazer verificação de colisões
            const dx = Math.abs(this.x - obj.x) - (this.w/2 + obj.w/2)
            const dy = Math.abs(this.y - obj.y) - (this.h/2 + obj.h/2)

            if(dx < 0 && dy < 0){

                if(obj.constructor.name == 'Wall'){

                    // colisão horizontal
                    if(Math.abs(dx) < Math.abs(dy)){

                        // caso o player esteja a esquerda do objeto
                        if (this.x < obj.x){
                            fx = obj.x - obj.w/2 - this.w/2
                        // caso esteja a direita
                        }else{
                            fx = obj.x + obj.w/2 + this.w/2
                        }

                    // colisão vertical
                    }else if(Math.abs(dy) < Math.abs(dx)){
                        
                        // caso o player esteja acima do objeto
                        if (this.y < obj.y){
                            fy = obj.y - obj.h/2 - this.h/2
                        // caso esteja abaixo
                        }else{
                            fy = obj.y + obj.h/2 + this.h/2
                        }

                    }

                }


            }
        }

        this.x = fx
        this.y = fy
    }

    draw(){
        this.sprite.x = this.x
        this.sprite.y = this.y

        this.sprite.show()
        this.sprite.animate()
    }

}