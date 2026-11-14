type SortCriteria = 'destination' | 'price' | 'status';

export class Ticket {
  destination: string;
  price: number;
  status: string;

  constructor(destination: string, price: number, status: string) {
    this.destination = destination;
    this.price = price;
    this.status = status;
  }
}

export function tickets(descriptions: string[], criteria: SortCriteria): Ticket[] {
  const result = descriptions.map((line) => {
    const [destination, price, status] = line.split('|');
    return new Ticket(destination, Number(price), status);
  });

  // Array.prototype.sort is stable, so equal tickets keep their order of appearance.
  return result.sort((a, b) =>
    criteria === 'price' ? a.price - b.price : a[criteria].localeCompare(b[criteria]),
  );
}

const input = [
  'Philadelphia|94.20|available',
  'New York City|95.99|available',
  'New York City|95.99|sold',
  'Boston|126.20|departed',
];

console.log(tickets(input, 'destination'));
console.log(tickets(input, 'status'));
