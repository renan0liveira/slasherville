class Game{

    constructor(scene){
        syncJSON(`scenes/${scene}.json`, j => this.sceneData = JSON.parse(j))
        this.scene = eval(`new ${this.sceneData['type']}(this.sceneData)`)
    }

    update(){
        this.scene.update()
    }

    draw(){
        this.scene.draw()
    }

    changeScene(sceneName){
        mouseEventClass = null
        syncJSON(`scenes/${sceneName}.json`, j => this.nextScene = JSON.parse(j))
        this.scene = eval(`new ${this.nextScene['type']}(this.nextScene)`)
    }
}