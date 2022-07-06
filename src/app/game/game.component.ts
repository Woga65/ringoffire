import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;


  constructor(public dialog: MatDialog) {
    //    this.game = new Game;

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game;
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.cardStack.pop() || this.currentCard;
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        //(this.game.currentPlayer + 1 < this.game.players.length) ? this.game.currentPlayer++ : this.game.currentPlayer = 0;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((result:string) => {
      if (result) this.game.players.push(result);
    });
  }

}

