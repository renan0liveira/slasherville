class Level extends Scene{

    constructor(w, h, map){
        super()
        
        this.w = w
        this.h = h

        this.map = loadImage(`maps/${map}.png`)
        this.data = loadJSON(`maps/${map}.json`)

        this.bodies = []
        this.characters = []
        this.doors = []
    }

    loadObjects(){
        this.data.objects.forEach(c => {
            this.bodies.push(new Wall(c.x, c.y, c.w, c.h))
        })

        this.data['enemies'].forEach(e => {
            this.characters.push(new Enemy(e.x, e.y, e.w, e.h, 'zombie_01'))
        })

        // TODO: criar classe door que carregará outra scene jogo
        // scenes podem ser levels que são jogáveis ou scripts que têm comportamento predefinido
        this.data.doors.forEach((d) => {
            this.doors.push({name: 'newDoor', position: d.position})
        })
    }

    // TODO: consertar o método de mostrar os inimigos
    // provavelmente terei q refazer o modo como leio os JSONs pq esse método assincrono sem callback está bugando tudo
    // possível solução: https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript/45035939

    // método hackeado que estou usando no console do browser:
    // l1.characters[0].sprite.loadAnimations()
    // l1.characters[0].drawable = true
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

        this.characters.forEach(c => {
            c.draw()
        })
    }
}