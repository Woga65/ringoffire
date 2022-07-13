import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    //start new game
    const game = new Game;
    this.firestore.collection('games').add(game.toJson())
      .then((gameInfo) => {
        this.router.navigateByUrl(`/game/${gameInfo.id}`);
      });
    //this.firestore.collection('games').add(JSON.parse(JSON.stringify(this.game))).then((gi) => { ... });
  }

}
