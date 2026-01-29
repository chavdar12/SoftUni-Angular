abstract class Employee {
    public name: string;
    public age: number;
    public salary: number;
    public tasks: Array<string>;

    protected constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    public work(): void {
        const currentTask = this.tasks.shift();
        this.tasks.push(currentTask);
        console.log(this.name + currentTask);
    }

    public collectSalary(): void {
        console.log(`${this.name} received ${this.getSalary()} this month.`);
    }

    public getSalary(): number {
        return this.salary;
    }
}

export class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(' is working on a simple task');
    }
}

export class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(' is working on a complicated task.');
        this.tasks.push(' is taking time off work.');
        this.tasks.push(' is supervisiting junior workers');
    }
}

export class Manager extends Employee {
    public dividend: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.dividend = 0;
        this.tasks.push(' scheduled a meeting.');
        this.tasks.push(' is preparing a quaterly meeting.');
    }

    public getSalary(): number {
        return this.salary + this.dividend;
    }
}


const junior = new Junior('Ivan', 21);
junior.salary = 1000;
junior.collectSalary();
junior.work();

const senior = new Senior('Peter', 33);
senior.salary = 2000;
senior.collectSalary();
senior.work();
senior.work();
senior.work();

const manager = new Manager('George', 50);
manager.salary = 3000;
manager.dividend = 1500;
manager.collectSalary();
manager.work();
manager.work();
