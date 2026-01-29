import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

export interface Game {
  title: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit, OnDestroy, OnChanges, DoCheck {

  @Input() game: any;

  ngOnInit(): void {
    console.log('GameItemComponent created!');
  }

  ngDoCheck(): void {
    console.log('GameItemComponent checking!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('GameItemComponent input changes!', changes);
  }

  ngOnDestroy(): void {
    console.log('GameItemComponent destroyed!');
  }
}
