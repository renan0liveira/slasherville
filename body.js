class Body{
    constructor(x, y, w, h){
        this.x = x
        this.y = y

        this.w = w
        this.h = h
    }

    checkCollision(body){
        
        const dx = Math.abs(this.x - body.x) - (this.w/2 + body.w/2)
        const dy = Math.abs(this.y - body.y) - (this.h/2 + body.h/2)

        if(dx < 0 && dy < 0){
            console.log('body collision detected')

            // colisão horizontal
            if(Math.abs(dx) < Math.abs(dy)){

                // caso o player esteja a esquerda do objeto
                if (this.x < body.x){
                    fx = body.x - body.w/2 - this.w/2
                // caso esteja a direita
                }else{
                    fx = body.x + body.w/2 + this.w/2
                }

            // colisão vertical
            }else if(Math.abs(dy) < Math.abs(dx)){
                
                // caso o player esteja acima do objeto
                if (this.y < body.y){
                    fy = body.y - body.h/2 - this.h/2
                // caso esteja abaixo
                }else{
                    fy = body.y + body.h/2 + this.h/2
                }
            }

        }

    }

    draw(){}
}