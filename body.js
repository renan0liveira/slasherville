class Body{
    // TODO: replace the TYPE with the concept of LAYERS
    constructor(x, y, w, h){
        this.x = x
        this.y = y

        this.w = w
        this.h = h
    }

    checkCollision(other){
        
        const dx = Math.abs(this.x - other.x) - (this.w/2 + other.w/2)
        const dy = Math.abs(this.y - other.y) - (this.h/2 + other.h/2)

        if(dx < 0 && dy < 0)
            return {dx: -dx, dy: -dy}
    }

    static checkCollision(body1, doby2){
    }

    draw(){}
}