//노출되지 않는다.
class Context{
    //private로 만들어 주는 것
    #enemies;
    constructor(){
        this.#enemies = null;
    }

    set enemies (value){
        this.#enemies = value;
    }

    get enemies(){
        return this.#enemies;
    }
}

//객체가 만들어져서 export된다.
export default new Context();