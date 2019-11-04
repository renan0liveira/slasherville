class Sprite{

    constructor(name, x, y, w, h){
        loadImage(`sprites/${name}.png`, i =>{
            syncJSON(`sprites/${name}.json`, j => {
                this.loadAnimations(JSON.parse(j), i)
            })
        })

        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.speed = 0.13

        this.animations = {}
        this.animationData = {}
    }

    // TODO: Criar um método fazer com que uma animação se torne do tipo idle quando o personagem estiver parado
    // atualmente utilizo as animações 'unique-frame' para fazer isso, mas o ideal é que a classe Sprite faça de maneira mais inteligente
    // de modo que eu não precise ficar avaliando a atual animação do personagem para para-lo na direção certa
    loadAnimations(j, i){
        const animationNames = Object.keys(j)

        for(const a of animationNames){
            this.animationData[a] = []

            if(j[a]['unique-frame']){
                const f =  j[a]['frame']
                this.animations[a] = i.get(f.x, f.y, f.w, f.h)
                this.animationData[a].push('unique-frame')
            }else{
                this.animations[a] = j[a]['frames'].map(f =>{
                    return i.get(f.position.x, f.position.y, f.position.w, f.position.h)
                })
            }

            if(j[a]['fliph'])
                this.animationData[a].push('fliph')
        }

        this.index = 0
        this.currAnim = Object.keys(this.animations)[0]
    }

    setAnimation(name){
        this.currAnim = name
    }

    show(){
        let curframe

        if(this.animationData[this.currAnim].includes('unique-frame')){
            curframe = this.animations[this.currAnim]
        }else{
            let index = floor(this.index) % this.animations[this.currAnim].length
            curframe = this.animations[this.currAnim][index]
        }

        if(this.animationData[this.currAnim].includes('fliph')){
            push()
            scale(-1, 1)
            image(curframe, -1 * this.x, this.y, this.w, this.h)
            pop()
        }else
            image(curframe, this.x, this.y, this.w, this.h)
    }

    animate(){
        this.index += this.speed
    }

}