import { useEffect, useState } from 'react';
import './App.css';
import { Buy } from './components/buy';
import { Open } from './components/open';
import { Table } from './components/table';

const menu = [
  {
    img: 'https://treasure.kotarosharks.io/6.png',
    price: '0.1',
    max: '5.00',
    min: '0.01'
  },
  {
    img: 'https://treasure.kotarosharks.io/6.png',
    price: '0.1',
    max: '5.00',
    min: '0.01'
  }
]

const arr = [
  { name: 'Submarine', href: 'http://submarine.kotarosharks.io/' },
  { name: 'Coinflip', href: 'https://coinflip.kotarosharks.io' },
  { name: 'Kotaro Sharks', href: 'https://magiceden.io/creators/kotaro_sharks' }
];

function App() {
  const [lots, setLots] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const game = await window.cryptomore.parse.getSIB({ id: process.env.REACT_APP_GAME });
      if (game.lots) setLots(game.lots);
    }
    init();
  }, []);

  return (
    <div className="app">

      <div className="header">
        <div className="header-top">
          <img onClick={setOpen.bind(null, false)} style={{ cursor: 'pointer' }} src="/img/logo.png" alt="logo" />

          <div className="main-buttons">
            <div style={{ marginRight: '20px', opacity: open === false ? 1 : .5 }} className="login-button" onClick={setOpen.bind(null, false)}>
              BUY BOX
            </div>
            <div style={{ opacity: open === true ? 1 : .5 }} className="login-button" onClick={setOpen.bind(null, true)}>
              OPEN BOX
            </div>
          </div>

        </div>
      </div>

      <div className="menu">
      {menu.map((k, i) => (
        <div key={i} className="games-wrap">
          <div className="games-box">
            <img className="box-img" src={k.img} alt="box" />
            <div className="total-info" >
              {k.price} SOL
            </div>
          </div>
          <div className="games-info-wrap">
            <table className="games-info-table">
              <tr>
                <td>Max</td>
                <td>
                  <div className="games-info-wrap">
                    {k.max}
                    <img className="solana-img" src='/img/solana.png' alt="box" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Min</td>
                <td>
                  <div className="games-info-wrap">
                    {k.min}
                    <img className="solana-img" src='/img/solana.png' alt="box" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      ))}
      </div>

      <div className="main">
        <div className="games">
          {arr.map((k, i) => (
            <a key={i} href={k.href} target="_blank" rel="noreferrer">
              <img src={'/img/game-' + i + '.png'} alt={'game-' + i} />
            </a>
          ))}
        </div>

        {open ? <Open /> : <Buy />}


      </div>

      <Table lots={lots} />

      <div className="footer">
        <a href="https://cryptomore.me/" target="_blank" rel="noreferrer">
          <img src="/img/cmWhite.png" alt="cryptomore" />
        </a>
        <span>Create your own NFT Mystery Boxes on Solana</span>
      </div>

    </div>
  );
}

export default App;