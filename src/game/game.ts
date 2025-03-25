interface Sticker {
  name: string;
  phase: string;
  description: string;
  ability: Function;
}

interface Stickers {
  [key: string]: Sticker;
}

interface Contract {
  name: string;
  reward: string;
  penalty: string;
  description: string;
  phase: string;
  resolve: Function;
}

interface Card {
  suit: string;
  rank: number;
  stickers: Sticker[];
}

interface State {
  deck: Card[];
  hand: Card[];
  score: number;
  discard: Card[];
  leadCard: Card | null;
  followCard: Card | null;
  tricksTaken: number;
  cardsTaken: Card[];
  trumpCard: Card | null;
  activeContracts: string[];
  contractDeck: Contract[];
}

interface Evaluation {
  result: "win" | "lose";
  leadCard: Card;
  followCard: Card;
}

const phases = {
  hand: "hand",
  preEval: "pre-evaluation",
  eval: "evaluation",
  postEval: "post-evaluation",
  end: "end",
};

const state: State = {
  contractDeck: [],
  deck: [],
  hand: [],
  score: 0,
  discard: [],
  leadCard: null,
  followCard: null,
  tricksTaken: 0,
  cardsTaken: [],
  trumpCard: null,
  activeContracts: [],
};

const stickers: Stickers = {
  moon: {
    name: "moon",
    phase: phases.postEval,
    description: "when this card loses a trick, gain one point.",
    ability: (evaluation: Evaluation) => {
      if (evaluation.result === "lose") {
        state.score += 1;
      }
    },
  },
  sun: {
    name: "sun",
    phase: phases.postEval,
    description: "when this card wins a trick, gain one point.",
    ability: (evaluation: Evaluation) => {
      if (evaluation.result === "win") {
        state.score += 1;
      }
    },
  },
};

const contracts: { [key: string]: Contract } = {
  five: {
    name: "five",
    description: "win five tricks",
    reward: "5 points",
    penalty: "-5 points",
    phase: phases.end,
    resolve: () => {
      if (state.tricksTaken == 5) {
        state.score += 5;
      } else {
        state.score -= 5;
      }
    },
  },
  hearts: {
    name: "hearts",
    description: "win hearts",
    reward: "1 point per heart",
    penalty: "-5 points",
    phase: phases.end,
    resolve: () => {
      if (state.cardsTaken.some((card) => card.suit === "hearts")) {
        state.score += state.cardsTaken.filter(
          (card) => card.suit === "hearts"
        ).length;
      } else {
        state.score -= 5;
      }
    },
  },
};

const cards: Card[] = [
  {
    suit: "spades",
    rank: 1,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 2,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 3,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 4,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 5,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 6,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 7,
    stickers: [],
  },
  {
    suit: "spades",
    rank: 8,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 1,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 2,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 3,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 4,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 5,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 6,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 7,
    stickers: [],
  },
  {
    suit: "clubs",
    rank: 8,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 1,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 2,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 3,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 4,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 5,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 6,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 7,
    stickers: [],
  },
  {
    suit: "hearts",
    rank: 8,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 1,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 2,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 3,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 4,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 5,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 6,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 7,
    stickers: [],
  },
  {
    suit: "diamonds",
    rank: 8,
    stickers: [],
  },
];

const sunAndMoonGame = () => {
  cards.forEach((card) => {
    if (card.rank % 2 !== 0) {
      card.stickers.push(stickers.moon);
    } else {
      card.stickers.push(stickers.sun);
    }
  });
};

const shuffle = (deck: Card[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

const sortHand = () => {
  state.hand.sort((a, b) => a.rank - b.rank); // sort by rank
  state.hand.sort((a, b) => a.suit.localeCompare(b.suit)); // sort by suit
};

const setup = () => {
  sunAndMoonGame();
  state.deck = [...cards];
  shuffle(state.deck);
};
