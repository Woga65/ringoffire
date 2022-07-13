import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: any;
  gameId: string = '';


  constructor( private route: ActivatedRoute , private firestore: AngularFirestore, public dialog: MatDialog) {
    //    this.game = new Game;
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params:any) => {
      this.gameId = params.id;
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game:any) => {
        Object.keys(game).forEach(k => this.game[k] = game[k]);
      });
    });
  }

  newGame() {
    this.game = new Game;
    //this.firestore.collection('games').add(this.game.toJson());
    //this.firestore.collection('games').add(JSON.parse(JSON.stringify(this.game)));
  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.cardStack.pop() || this.game.currentCard;
      this.game.pickCardAnimation = true;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        //(this.game.currentPlayer + 1 < this.game.players.length) ? this.game.currentPlayer++ : this.game.currentPlayer = 0;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((result:string) => {
      if (result) {
        this.game.players.push(result);
        this.saveGame();
      }
    });
  }

}

