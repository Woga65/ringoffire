import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;


  constructor() {
    //    this.game = new Game;
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game;
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.cardStack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
      console.log(this.game.cardStack);
      console.log(this.game.playedCards);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard!);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
