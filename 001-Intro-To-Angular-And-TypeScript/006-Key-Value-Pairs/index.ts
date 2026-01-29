class KeyValuePair<T, U> {
    private key: T;
    private val: U;

    public setKeyValue(k: T, v: U) {
        this.key = k;
        this.val = v;
    }

    public display(): void {
        console.log(`key = ${this.key}, value = ${this.val}`);
    }
}

let kvp = new KeyValuePair<number, string>();
kvp.setKeyValue(1, "Steve");
kvp.display();
// key = 1, value = Steve

let test = new KeyValuePair<string, number>();
test.setKeyValue('Ivan', 15);
test.display();
// key = Ivan, value = 15
