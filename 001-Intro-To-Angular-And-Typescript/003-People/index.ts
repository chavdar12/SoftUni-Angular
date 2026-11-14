export abstract class Employee {
  name: string;
  age: number;
  salary = 0;
  tasks: string[] = [];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  work(): void {
    const current = this.tasks.shift()!;
    this.tasks.push(current);
    console.log(`${this.name} ${current}`);
  }

  collectSalary(): void {
    console.log(`${this.name} received ${this.getSalary()} this month.`);
  }

  protected getSalary(): number {
    return this.salary;
  }
}

export class Junior extends Employee {
  constructor(name: string, age: number) {
    super(name, age);
    this.tasks.push('is working on a simple task.');
  }
}

export class Senior extends Employee {
  constructor(name: string, age: number) {
    super(name, age);
    this.tasks.push(
      'is working on a complicated task.',
      'is taking time off work.',
      'is supervising junior workers.',
    );
  }
}

export class Manager extends Employee {
  dividend = 0;

  constructor(name: string, age: number) {
    super(name, age);
    this.tasks.push('scheduled a meeting.', 'is preparing a quarterly report.');
  }

  protected override getSalary(): number {
    return this.salary + this.dividend;
  }
}

const senior = new Senior('Peter', 35);
senior.work();
senior.work();
senior.work();
senior.work();

const manager = new Manager('Maria', 42);
manager.salary = 3000;
manager.dividend = 1500;
manager.work();
manager.collectSalary();
