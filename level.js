class Level extends Scene{

    constructor(w, h, map){
        super()
        
        this.w = w
        this.h = h

        this.map = loadImage(`maps/${map}.png`)
        this.data = loadJSON(`maps/${map}.json`)

        this.bodies = []
        this.doors = []
    }

    loadObjects(){
        this.data.objects.forEach((c) => {
            this.bodies.push(new Wall(c.x, c.y, c.w, c.h))
        })

        // TODO: criar classe door que carregará outra scene jogo
        // scenes podem ser levels que são jogáveis ou scripts que têm comportamento predefinido
        this.data.doors.forEach((d) => {
            this.doors.push({name: 'newDoor', position: d.position})
        })
    }

    draw(){
        image(this.map, this.w/2, this.h/2, this.w, this.h)

        // fill(255, 0, 0)
        // this.walls.forEach((o) => {
        //     rect(o.x, o.y, o.w, o.h)
        // })

        // fill(0, 0, 255)
        // this.doors.forEach((d) => {
        //     rect(d.position.x, d.position.y, d.position.w, d.position.h)
        // })
    }
}