export class Game {
    public players: string[] = [];
    public cardStack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
         this.cardStack = this.shuffle(this.getAllCards());
    }

    shuffle(cards:string[]) {
        const remainingCards:string[] = [... cards];
        return cards.map(() => remainingCards.splice(Math.abs(Math.random() * remainingCards.length), 1 )[0]);
    }
    getAllCards() {
        const cards: string[] = [];
        ['clubs_', 'diamonds_', 'hearts_', 'spade_'].forEach(c => {
            for (let i = 1; i < 14; i++) cards.push(c + i); 
        });
        return cards;
    }
    toJson() {
        return {
            players: this.players,
            cardStack: this.cardStack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
    }
}