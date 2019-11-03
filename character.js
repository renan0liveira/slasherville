class Player extends Sprite{

    constructor(name, x, y, w, h, level){
        super(name, x, y, w, h)
        this.level = level

        this.knife = loadImage('itens/faca.png')
    }

    update(){
        let fx = this.x
        let fy = this.y

        if(keyIsDown(90)){
            push()

            if(this.currAnim == 'walkleft'){
                translate(this.x - this.w/2 - 10, this.y)
                rotate(-90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.currAnim == 'walkright'){
                translate(this.x + this.w/2 + 10, this.y)
                rotate(90)
                image(this.knife, 0, 0, 20, 40)
            }
            else if(this.currAnim == 'walkup'){
                image(this.knife, this.x, this.y - this.h/2 - 10, 20, 40)
            }
            else if(this.currAnim == 'walkdown'){
                scale(1, -1)
                image(this.knife, this.x, -1 * this.y - this.h/2 + 10, 20, 40)
            }

            pop()
        }

        if(keyIsDown(LEFT_ARROW)){
            this.setAnimation('walkleft')
            fx = this.x - 0.2 * deltaTime
        }
        else if(keyIsDown(RIGHT_ARROW)){
            this.setAnimation('walkright')
            fx = this.x + 0.2 * deltaTime
        }
        else if(keyIsDown(UP_ARROW)){
            this.setAnimation('walkup')
            fy = this.y - 0.2 * deltaTime
        }
        else if(keyIsDown(DOWN_ARROW)){
            this.setAnimation('walkdown')
            fy = this.y + 0.2 * deltaTime
        }
        
        for(const obj of this.level.walls){

            // fazer verificação de colisões
            let dx = Math.abs(this.x - obj.x) - (this.w/2 + obj.w/2)
            let dy = Math.abs(this.y - obj.y) - (this.h/2 + obj.h/2)

            if(dx < 0 && dy < 0){

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
                        //fy = this.y
                    }

                }
            }
        }

        this.x = fx
        this.y = fy
    }

    draw(){
        this.show()
        this.animate()
    }

}