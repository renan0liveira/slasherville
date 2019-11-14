class Game{

    constructor(scene){
        syncJSON(`scenes/${scene}.json`, j => this.sceneData = JSON.parse(j))

        this.player = new Player('cop', 258, 863, 46, 62)
        
        this.scene = eval(`new ${this.sceneData['type']}(this.sceneData)`)
    }

    update(){
        this.scene.update()
    }

    draw(){
        this.scene.draw()
    }

    changeScene(){
        //this.scene = eval(`new ${sceneName}(this.sceneData)`)
        this.teste = null
        syncJSON(`scenes/room_01.json`, j => this.teste = JSON.parse(j))
        this.scene = new Level(this.teste)
    }
}