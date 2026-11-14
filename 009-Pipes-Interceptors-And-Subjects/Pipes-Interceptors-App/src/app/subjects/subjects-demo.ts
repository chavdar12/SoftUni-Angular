import { Component, signal } from '@angular/core';
import { AsyncSubject, BehaviorSubject, from, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects-demo',
  template: `
    <h2>Subjects</h2>
    <button (click)="subject()">Subject</button>
    <button (click)="behaviorSubject()">BehaviorSubject</button>
    <button (click)="replaySubject()">ReplaySubject(2)</button>
    <button (click)="asyncSubject()">AsyncSubject</button>
    <pre>{{
      output().join(
        '
'
      )
    }}</pre>
  `,
  styles: `
    pre {
      background: #f4f4f4;
      padding: 0.75rem;
      min-height: 8rem;
    }
  `,
})
export default class SubjectsDemo {
  protected readonly output = signal<string[]>([]);

  // A Subject is an Observer, so it can be passed to subscribe() and multicasts to A and B.
  subject(): void {
    this.run('Subject', (lines) => {
      const subject = new Subject<number>();
      this.observe(subject, lines);
      from([1, 2, 3]).subscribe(subject);
    });
  }

  // Holds a current value - a late subscriber immediately receives the latest one.
  behaviorSubject(): void {
    this.run('BehaviorSubject(0)', (lines) => {
      const subject = new BehaviorSubject(0);
      subject.subscribe((v) => lines.push(`observerA: ${v}`));
      subject.next(1);
      subject.next(2);
      subject.subscribe((v) => lines.push(`observerB: ${v}`));
      subject.next(3);
    });
  }

  // Replays the last N values to new subscribers.
  replaySubject(): void {
    this.run('ReplaySubject(2)', (lines) => {
      const subject = new ReplaySubject<number>(2);
      subject.subscribe((v) => lines.push(`observerA: ${v}`));
      subject.next(1);
      subject.next(2);
      subject.next(3);
      subject.subscribe((v) => lines.push(`observerB: ${v}`));
      subject.next(4);
    });
  }

  // Emits only the last value, and only when complete() is called.
  asyncSubject(): void {
    this.run('AsyncSubject', (lines) => {
      const subject = new AsyncSubject<number>();
      subject.subscribe((v) => lines.push(`observerA: ${v}`));
      subject.next(1);
      subject.next(2);
      subject.next(3);
      subject.subscribe((v) => lines.push(`observerB: ${v}`));
      subject.next(5);
      subject.complete();
    });
  }

  private observe(subject: Subject<number>, lines: string[]): void {
    subject.subscribe((v) => lines.push(`observerA: ${v}`));
    subject.subscribe((v) => lines.push(`observerB: ${v}`));
  }

  private run(title: string, body: (lines: string[]) => void): void {
    const lines = [`-- ${title} --`];
    body(lines);
    this.output.set(lines);
  }
}
