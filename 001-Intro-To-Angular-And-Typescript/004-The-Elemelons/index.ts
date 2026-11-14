type MelonElement = 'Water' | 'Fire' | 'Earth' | 'Air';

export abstract class Melon {
  weight: number;
  melonSort: string;

  constructor(weight: number, melonSort: string) {
    this.weight = weight;
    this.melonSort = melonSort;
  }

  get elementIndex(): number {
    return this.weight * this.melonSort.length;
  }

  protected abstract get element(): MelonElement;

  toString(): string {
    return [
      `Element: ${this.element}`,
      `Sort: ${this.melonSort}`,
      `Element Index: ${this.elementIndex}`,
    ].join('\n');
  }
}

export class Watermelon extends Melon {
  protected get element(): MelonElement {
    return 'Water';
  }
}

export class Firemelon extends Melon {
  protected get element(): MelonElement {
    return 'Fire';
  }
}

export class Earthmelon extends Melon {
  protected get element(): MelonElement {
    return 'Earth';
  }
}

export class Airmelon extends Melon {
  protected get element(): MelonElement {
    return 'Air';
  }
}

export class Melolemonmelon extends Watermelon {
  private static readonly elements: MelonElement[] = ['Water', 'Fire', 'Earth', 'Air'];
  private current = 0;

  protected override get element(): MelonElement {
    return Melolemonmelon.elements[this.current];
  }

  morph(): void {
    this.current = (this.current + 1) % Melolemonmelon.elements.length;
  }
}

// const test = new Melon(100, 'Test'); // Error: Cannot create an instance of an abstract class.

const watermelon = new Watermelon(12.5, 'Kingsize');
console.log(watermelon.toString());

const melolemonmelon = new Melolemonmelon(10, 'Mixed');
melolemonmelon.morph();
console.log(melolemonmelon.toString());
