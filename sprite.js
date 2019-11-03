class Sprite{

    constructor(name, x, y, /*speed,*/ w, h){
        this.spritedata = loadJSON(`sprites/${name}.json`)
        this.spritesheet = loadImage(`sprites/${name}.png`)

        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.speed = 0.13

        this.animations = {}
        this.animationData = {}
    }

    loadAnimations(){

        const animationNames = Object.keys(this.spritedata)

        for(const a of animationNames){

            this.animations[a] = this.spritedata[a]['frames'].map(f =>{
                return this.spritesheet.get(f.position.x, f.position.y, f.position.w, f.position.h)
            })

            if(this.spritedata[a]['fliph'])
                this.animationData[a] = 'fliph'

        }

        this.index = 0

        this.currAnim = Object.keys(this.animations)[0]
    }

    setAnimation(name){
        this.currAnim = name
    }

    show(){
        const index = floor(this.index) % this.animations[this.currAnim].length

        if(this.animationData[this.currAnim] == 'fliph'){
            push()
            scale(-1, 1)
            image(this.animations[this.currAnim][index], -1 * this.x, this.y, this.w, this.h)
            pop()
        }else
            image(this.animations[this.currAnim][index], this.x, this.y, this.w, this.h)
    }

    animate(){
        this.index += this.speed
    }

}