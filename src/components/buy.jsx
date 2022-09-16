import { useEffect } from "react";
import { useState } from "react";

export const Buy = ({ lot = {} }) => {
  const [load, setLoad] = useState(false);
  const [box, setBox] = useState([]);
  const [suc, setSuc] = useState(false);
  const [text, setText] = useState('');

  const buy = async (one, i) => {
    // const list = await window.cryptomore.parse.getMarketList();
    // console.log(list);
    if (i === suc) {
      setBox(prev => {
        prev = [...prev];
        prev.splice(i, 1);
        return prev;
      });
      setSuc(false);
      return;
    }
    setLoad(i);
    try {
      let res = await window.cryptomore.methods.buyToken(one);
      setSuc(i);
      if (!res.err) setText(<><div>Successful purchase</div><div>of a treasures!</div></>);
      else setText(<><div>Someone has already</div><div>bought this box,</div><div>try another one!</div></>);
    } catch (e) { }
    setLoad(false);
  }

  return (
    <div className="main-box">
      <div className="sollink">
        <a className="solscan" href={'https://solscan.io/account/' + lot.id} target="_blank" rel="noreferrer">
          View in SolScan
        </a>
      </div>
      <div className="one-box">
        {suc && <div className="success">
          <span>{text}</span>
        </div>}

        <img style={{height: '300px'}} src={load ? 'https://treasure.kotarosharks.io/6.png' : lot.img} alt="box" />
        <div className="buy-button" onClick={buy} style={{ width: 'auto' }}>
          {suc ? 'OK' : 'BUY FOR ' + lot.price + 'SOL'}
        </div>
      </div>
    </div>
  )
}