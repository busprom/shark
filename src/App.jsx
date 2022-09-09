import { useEffect, useState } from 'react';
import './App.css';
import { Buy } from './components/buy';
import { Open } from './components/open';
import { Table } from './components/table';
import { parse } from './lib/parse';

const arr = [
  {name: 'Kotaro Sharks', href: 'https://magiceden.io/creators/kotaro_sharks'},
  {name: 'Coinflip', href: 'https://coinflip.kotarosharks.io'},
  {name: 'Submarine', href: 'http://submarine.kotarosharks.io/'}
];

function App() {
  const [lots, setLots] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const res = await parse();
      if(res.lots) setLots(res.lots);
    }
    init();
  }, []);
  return (
    <div className="app">

      <div className="header">
        <div className="header-top">
          <img src="/img/logo.png" alt="logo" />
          <div className="login-button">
            CONNECT
          </div>
        </div>
        <div className="menu">
          <span onClick={setOpen.bind(null, false)} style={{borderRight: '1px solid #4725B1', opacity: open ? .5 : 1}}>Home</span>
          <span onClick={setOpen.bind(null, true)} style={{opacity: open ? 1 : .5}}>My Treasures</span>
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
