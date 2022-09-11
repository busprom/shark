import { useEffect, useState } from 'react';
import './App.css';
import { Buy } from './components/buy';
import { Open } from './components/open';
import { Table } from './components/table';

const arr = [
  {name: 'Submarine', href: 'http://submarine.kotarosharks.io/'},
  {name: 'Coinflip', href: 'https://coinflip.kotarosharks.io'},
  {name: 'Kotaro Sharks', href: 'https://magiceden.io/creators/kotaro_sharks'}
];

function App() {
  const [lots, setLots] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const game = await window.cryptomore.parse.getSIB({id: process.env.REACT_APP_GAME});
      if(game.lots) setLots(game.lots);
    }
    init();
  }, []);

  return (
    <div className="app">

      <div className="header">
        <div className="header-top">
          <img onClick={setOpen.bind(null, false)} style={{cursor: 'pointer'}} src="/img/logo.png" alt="logo" />
          {/* <div className="login-button" onClick={setOpen.bind(null, true)}>
            CONNECT
          </div> */}
        </div>
        <div className="menu">
          <button onClick={setOpen.bind(null, false)} style={{borderRight: '1px solid #4725B1', opacity: open ? .5 : 1}}>Home</button>
          <button onClick={setOpen.bind(null, true)} style={{opacity: open ? 1 : .5}}>My Treasures</button>
        </div>
      </div>

      <div className="main">
        <div className="games">
          {arr.map((k, i) => (
            <a key={i} href={k.href} target="_blank" rel="noreferrer">
              <img src={'/img/game-'+i+'.png'} alt={'game-'+i} />
            </a>
          ))}
        </div>

        {open ? <Open /> : <Buy />}

      </div>

      <Table lots={lots} />

      <div className="footer">
        <a href="https://cryptomore.me/" target="_blank" rel="noreferrer">
          <img src="/img/cm.png" alt="cryptomore" />
        </a>
        <span>Create your own NFT Mystery Boxes on Solana</span>
      </div>

    </div>
  );
}

export default App;