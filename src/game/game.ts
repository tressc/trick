interface Sticker {
  name: string;
  phase: string;
  description: string;
  ability: Function;
}

interface Stickers {
  [key: string]: Sticker;
}

type Suit = "spades" | "clubs" | "hearts" | "diamonds";

type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type meterType = "tricks" | "suit" | "rank";

interface Contract {
  name: string;
  description: string;
  check: (evaluation: Evaluation) => [number, boolean];
  meter: {
    type: meterType;
    targets: number[] | string[];
    negative: boolean;
  };
}

interface Card {
  suit: Suit;
  rank: Rank;
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
  meterScore: number;
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
  meterScore: 0,
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

/*
contracts are checked at the end of each trick
the meter defines the conditions, rewards, and penalties for each contract
the check function returns a number to add to the meter, and a boolean representing whether the round should end early
*/
const contracts: { [key: string]: Contract } = {
  five: {
    name: "five",
    description: "win five tricks",
    meter: {
      type: "tricks",
      targets: [5],
      negative: false,
    },
    check: (evaluation: Evaluation): [number, boolean] => {
      if (evaluation.result === "win") {
        return [1, false];
      }
      return [0, false];
    },
  },
  hearts: {
    name: "hearts",
    description: "win hearts",
    meter: {
      type: "suit",
      targets: ["hearts"],
      negative: false,
    },
    check: (evaluation: Evaluation): [number, boolean] => {
      if (evaluation.result === "win") {
        let numHearts = 0;
        if (evaluation.leadCard.suit === "hearts") {
          numHearts += 1;
        }
        if (evaluation.followCard.suit === "hearts") {
          numHearts += 1;
        }
        return [numHearts, false];
      }
      return [0, false];
    },
  },
  "no 5s or 7s": {
    name: "no 5s or 7s",
    description: "avoid winning tricks with 5s or 7s",
    meter: {
      type: "rank",
      targets: [5, 7],
      negative: true,
    },
    check: (evaluation: Evaluation): [number, boolean] => {
      // if no 5s or 7s remain in hand or deck after this trick, end the round
      const anyRemaining =
        state.hand.some((card) => card.rank === 5 || card.rank === 7) ||
        state.deck.some((card) => card.rank === 5 || card.rank === 7);
      if (evaluation.result === "win") {
        let numPenalties = 0;
        if (evaluation.leadCard.rank === 5 || evaluation.leadCard.rank === 7) {
          numPenalties += 1;
        }
        if (
          evaluation.followCard.rank === 5 ||
          evaluation.followCard.rank === 7
        ) {
          numPenalties += 1;
        }
        return [numPenalties, !anyRemaining];
      }
      return [0, !anyRemaining];
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
  state.deck = [...cards];
  shuffle(state.deck);
};
