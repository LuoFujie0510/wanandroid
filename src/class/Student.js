class Student{
    constructor(name, rank){
        this.name = name
        this.rank = rank
    }

    playGame(){
        console.log(`${this.name}参加了游戏，并获得了第${this.rank}名`)
    }
}

export default Student