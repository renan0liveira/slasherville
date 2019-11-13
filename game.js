class Game{

    constructor(scene){
        syncJSON(`scenes/${scene}.json`, j => this.sceneData = JSON.parse(j))

        this.player = new Player('cop', 258, 863, 46, 62)
        
        this.scene = eval(`new ${this.sceneData['type']}(this.sceneData, this)`)
    }

    update(){
        this.scene.update()
    }

    draw(){
        this.scene.draw()
    }
}