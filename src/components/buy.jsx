import { useEffect } from "react";
import { useState } from "react";

export const Buy = () => {
  const [load, setLoad] = useState(false);
  const [box, setBox] = useState([]);
  const [suc, setSuc] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const init = async () => {
      const arr = [];
      const list = await window.cryptomore.parse.getMarketList();
      for(let i = 0; i < list.length; i++) {
        if(arr.length === 10) continue;
        list[i].info = await window.cryptomore.parse.getMeta(list[i].uri);
        if(list[i].info.SIB && (list[i].info.SIB === process.env.REACT_APP_GAME)) {
          arr.push(list[i]);
        }
      }
      setBox(arr);
    } 
    init();
  }, []);

  const buy = async (one, i) => {
    if(i === suc) {
      setBox(prev => {
        prev = [...prev];
        prev.splice(i, 1);
        return prev;
      });
      setSuc(false);
      return;
    }
    setLoad(i);
    try{
      let res = await window.cryptomore.methods.buyToken({...one, ...one.storage, owner: one.storage.vault});
      setSuc(i);
      if(!res.err) setText('Successful purchase of a treasures!');
      else setText('Someone has already bought this box, try another one!');
    }catch(e){}
    setLoad(false);
  }

  return(
    <div className="main-box">
      {box.map((k, i) => (
        <div key={i} className="one-box">
          {i === suc && <div className="success">{text}</div>}
          <img src={load === i ? 'https://treasure.kotarosharks.io/6.png' : 'https://treasure.kotarosharks.io/5.png'} alt="box" />
          <div className="buy-button" onClick={buy.bind(null, k, i)}>
            {i === suc ? 'OK' : 'BUY NOW'}
          </div>
        </div>
      ))}
    </div>
  )
}