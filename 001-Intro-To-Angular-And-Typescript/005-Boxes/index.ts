export class Box<T> {
  private items: T[] = [];

  add(element: T): void {
    this.items.push(element);
  }

  remove(): T | undefined {
    return this.items.pop();
  }

  get count(): number {
    return this.items.length;
  }
}

const numbers = new Box<number>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
console.log(numbers.count);

const names = new Box<string>();
names.add('Pesho');
names.add('Gosho');
console.log(names.count);
names.remove();
console.log(names.count);
