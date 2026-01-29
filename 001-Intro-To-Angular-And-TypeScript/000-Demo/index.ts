let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "blue";
color = 'red';

let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];

console.log('Hello')
console.log(binary)


class Greeter {
    public greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet(): string {
        return `Hello, ${this.greeting}`;
    }
}

let greeter: Greeter = new Greeter("world!");
console.log(greeter.greet()); // Hello, world!


class Animal {
    move(distanceInMeters: number = 0): void {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark(): void {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
// Woof! Woof!
// Animal moved 10m.
// Woof! Woof!
