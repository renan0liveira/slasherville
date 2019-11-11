class Timer{
    constructor(cooldown){
        this.isRunning = false
        this.time = 0
        this.cooldown = cooldown
    }

    run(){
        if(!this.isRunning){
            this.isRunning = true
            return true
        }else{
            return false
        }
    }
    
    tick(){
        if(!this.isRunning) return

        this.time += deltaTime

        if(this.time >= this.cooldown){
            this.time = 0
            this.isRunning = false
        }
    }
}