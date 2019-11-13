class Level{
    constructor(data){

        this.map = loadImage(`scenes/${data['name']}.png`)

        this.bodies = []
        data['objects'].forEach(c => this.bodies.push(new Wall(c.x, c.y, c.w, c.h)))
        data['enemies'].forEach(e => this.bodies.push(new Enemy(e.x, e.y, e.w, e.h, 'zombie_01')))

        // TODO: criar classe door que carregará outra scene jogo
        // scenes podem ser levels que são jogáveis ou scripts que têm comportamento predefinido
        this.doors = []
        data['doors'].forEach(d => this.doors.push({name: 'newDoor', position: d.position}))

        this.tempObjs = []
    }

    update(){
        this.bodies.forEach((b, index, arr) => {
            if(b.constructor.name  == 'Enemy'){
                const status = b.status()
                if(status['health'] <= 0)
                    arr.splice(index, 1)
                b.update()
            }
        })

        const pStatus = game.player.status()
        if(pStatus['health'] <= 0){
            console.log('the player is dead')
            delete game.player
        }
        else
            game.player.update()
    }

    draw(){
        image(this.map, w/2, h/2, w, h)

        // fill(255, 0, 0)
        // this.bodies.forEach((o) => {
        //     rect(o.x, o.y, o.w, o.h)
        // })

        // fill(0, 0, 255)
        // this.doors.forEach((d) => {
        //     rect(d.position.x, d.position.y, d.position.w, d.position.h)
        // })

        this.bodies.forEach(b => b.draw())

        this.tempObjs.forEach((t, index, arr) => {
            push()

            if(t.scale){
                scale(t.scale.x, t.scale.y)
                image(t.sprite, t.x, t.y, t.w, t.h)
            }else{
                translate(t.x, t.y)
                if(t.rotation) rotate(t.rotation)
                image(t.sprite, 0, 0, t.w, t.h)
            }
            
            pop()

            if(t.counter >= t.time)
                arr.splice(index,1)
            else
                t.counter += deltaTime
        })

        game.player.draw()
    }

    showObject(props){
        props['counter'] = 0
        this.tempObjs.push(props)
    }
}