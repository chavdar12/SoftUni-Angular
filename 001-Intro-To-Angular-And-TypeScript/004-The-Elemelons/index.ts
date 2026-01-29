abstract class Melon {
    public weight: number;
    public melonSort: string;
    public elementIndex: number;
    protected element: string;

    protected constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = weight * melonSort.length;
        this.element = '';
    }

    public getElementIndex(): number {
        return this.elementIndex;
    }

    public toString(): string {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
    }
}

export class Watermelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Water';
    }
}

export class FireMelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Fire';
    }
}

export class EarthMelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Earth';
    }
}

export class AirMelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Air';
    }
}

export class MeloLemonMelon extends Watermelon {
    private readonly elements: string[];
    private elementCount: number;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.elements = ['Fire', 'Earth', 'Air', 'Water'];
        this.element = 'Water';
        this.elementCount = 0;
    }

    public morph(): void {
        this.element = this.elements[this.elementCount];
        this.elementCount++;
        if (this.elementCount >= this.element.length) {
            this.elementCount = 0;
        }
    }
}

// let test: Melon = new Melon(100, "Test");
//Throws error

let waterMelon: Watermelon = new Watermelon(12.5, "Kingsize");
console.log(waterMelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100

let fireMelon: FireMelon = new FireMelon(18, "Big Fire");
console.log(fireMelon.toString());
// Element: Fire
// Sort: Big Fire
// Element Index: 144

let earthMelon: EarthMelon = new EarthMelon(25, "Medium");
console.log(earthMelon.toString());
// Element: Earth
// Sort: Medium
// Element Index: 150

let airMelon: AirMelon = new AirMelon(5, "Minimal");
console.log(airMelon.toString());
// Element: Air
// Sort: Minimal
// Element Index: 35

let meloLemonMelon: MeloLemonMelon = new MeloLemonMelon(5, "Minimal");
console.log(meloLemonMelon.toString());
meloLemonMelon.morph();
console.log(meloLemonMelon.toString());
meloLemonMelon.morph();
console.log(meloLemonMelon.toString());
meloLemonMelon.morph();
console.log(meloLemonMelon.toString());
meloLemonMelon.morph();
console.log(meloLemonMelon.toString());
meloLemonMelon.morph();
console.log(meloLemonMelon.toString());
