import "./App.css";

const cards = [
  {
    suit: "Spades",
    rank: "A",
  },
  {
    suit: "Spades",
    rank: "2",
  },
  {
    suit: "Spades",
    rank: "3",
  },
  {
    suit: "Spades",
    rank: "4",
  },
  {
    suit: "Spades",
    rank: "5",
  },
  {
    suit: "Spades",
    rank: "6",
  },
  {
    suit: "Spades",
    rank: "7",
  },
  {
    suit: "Spades",
    rank: "8",
  },
  {
    suit: "Hearts",
    rank: "A",
  },
  {
    suit: "Hearts",
    rank: "2",
  },
  {
    suit: "Hearts",
    rank: "3",
  },
  {
    suit: "Hearts",
    rank: "4",
  },
  {
    suit: "Hearts",
    rank: "5",
  },
  {
    suit: "Hearts",
    rank: "6",
  },
  {
    suit: "Hearts",
    rank: "7",
  },
  {
    suit: "Hearts",
    rank: "8",
  },
];

function App() {
  const renderCard = (cardData: { suit: string; rank: string }) => {
    const { suit, rank } = cardData;
    const cardName = `${suit}${rank}`;
    const humanReadable = `${rank} of ${suit}`;
    return (
      <div className="w-20 h-30 ">
        <img src={`/Cards/card${cardName}.png`} alt={humanReadable} />
      </div>
    );
  };

  const renderMeter = () => {
    return (
      <div className="absolute flex top-15 right-5">
        <div className="w-2 h-80  boder-white divide-y-3">
          {new Array(13).fill(0).map((_, index) => (
            <div key={index} className="h-1/13"></div>
          ))}
        </div>
        <div className=" w-10 h-80 border-2 boder-white rounded-sm overflow-hidden">
          <div className="h-full flex-col divide-y-2">
            <div className="w-10 h-6/13 bg-red-500"></div>
            <div className="w-10 h-2/13 bg-yellow-500"></div>
            <div className="w-10 h-1/13 bg-green-500"></div>
            <div className="w-10 h-2/13 bg-yellow-500"></div>
            <div className="w-10 h-2/13 bg-red-500"></div>
          </div>
        </div>
      </div>
    );
  };

  const renderPointer = () => {
    return (
      <div className="absolute right-15 top-15 w-10 h-80">
        <div className="h-12/13" />
        <div className="w-10 h-1/13 flex justify-end items-center">
          <div className="border-solid border-l-cyan-300 border-l-8 border-y-transparent border-y-8 border-r-0" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-green-800 bg-cover bg-no-repeat bg-[url(/dither.jpg)] bg-blend-multiply min-h-screen min-w-screen flex flex-col justify-end items-center">
      {renderMeter()}
      {renderPointer()}
      <div className="absolute top-0 left-0 h-100 w-full flex justify-center items-center">
        {renderCard({
          suit: "Diamonds",
          rank: "4",
        })}
      </div>
      <div className="flex translate-x-3">
        {cards.slice(0, 7).map((card, index) => {
          return (
            <div
              key={`${card.suit}${card.rank}`}
              style={{
                transform: `translateX(-${35 * index}px)`,
              }}
            >
              {renderCard(card)}
            </div>
          );
        })}
      </div>
      <div className="flex -translate-y-5">
        {cards.slice(8, 14).map((card, index) => {
          return (
            <div
              key={`${card.suit}${card.rank}`}
              style={{
                transform: `translateX(-${35 * index}px)`,
              }}
            >
              {renderCard(card)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
