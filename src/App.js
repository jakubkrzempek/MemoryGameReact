import './App.css'
import { useEffect, useState } from 'react'
import './components/Card'
import Card from './components/Card';
const deck = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false }
]


function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCard = () => {
    const shuffledCards = [...deck, ...deck]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurn(0);


  }

  const handleChoise = (card) => {
    if (!disabled) {
      choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
    }
  }
  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setDisabled(false);
  }

  useEffect(() => {

    if (choiseOne && choiseTwo) {
      setDisabled(true);
      setTurn((prevState) => prevState + 1)
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.src === choiseOne.src) return { ...card, matched: true }
            else return card;
          })
        })
      }
      else console.log("nie trafiłes");
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiseOne, choiseTwo])
  console.log(cards)
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCard}>Nowa Gra</button>
      <div className="card-grid">
        {cards.map((card) => {
          return <Card key={card.id} card={card} handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched} />

        })}
      </div>
      <p>tury: {turn}</p>
    </div>
  );
}

export default App