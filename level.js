class Level extends Scene{

    constructor(w, h, map){
        super()
        
        this.w = w
        this.h = h

        this.map = loadImage(`maps/${map}.png`)

        this.bodies = []
        this.doors = []

        syncJSON(`maps/${map}.json`, j => {
            this.loadObjects(JSON.parse(j))
        })
    }

    loadObjects(j){
        j['objects'].forEach(c => {
            this.bodies.push(new Wall(c.x, c.y, c.w, c.h))
        })

        j['enemies'].forEach(e => {
            this.bodies.push(new Enemy(e.x, e.y, e.w, e.h, 'zombie_01'))
        })

        // TODO: criar classe door que carregará outra scene jogo
        // scenes podem ser levels que são jogáveis ou scripts que têm comportamento predefinido
        j.doors.forEach(d => {
            this.doors.push({name: 'newDoor', position: d.position})
        })
    }

    draw(){
        image(this.map, this.w/2, this.h/2, this.w, this.h)

        // fill(255, 0, 0)
        // this.bodies.forEach((o) => {
        //     rect(o.x, o.y, o.w, o.h)
        // })

        // fill(0, 0, 255)
        // this.doors.forEach((d) => {
        //     rect(d.position.x, d.position.y, d.position.w, d.position.h)
        // })

        this.bodies.forEach(b => {
            b.draw()
        })
    }
}