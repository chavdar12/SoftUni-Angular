class Box<T> {
    private _boxes = [];

    get count(): number {
        return this._boxes.length;
    }

    public add(el: T) {
        this._boxes.unshift(el);
    }

    public remove() {
        this._boxes.shift();
    }
}
let boxOne = new Box<Number>();
boxOne.add(1);
boxOne.add(2);
boxOne.add(3);
console.log(boxOne.count); // 3

let boxTwo = new Box<String>();
boxTwo.add("Pesho");
boxTwo.add("Gosho");
console.log(boxTwo.count); // 2
boxTwo.remove();
console.log(boxTwo.count); // 1
