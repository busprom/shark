import { useEffect, useState } from "react"
import { getTokenList, getWallet } from "../lib/parse";

export const Open = ({ wallet }) => {

  const [box, setBox] = useState([]);

  useEffect(() => {
    const init = async () => {
      let id;
      if(!wallet) {
        const w = await getWallet();
        id = w.publicKey;
      }
      else id = wallet.publicKey;
      const res = await getTokenList(id);
      setBox(res);
    }
    init();
  }, [wallet]);

  return(
    <div className="box-area">
      {box.map((k, i) => (
        <div key={i} className="box">
          <div className="box-name">{k.name}</div>
          <div className="box-wrap">
            <img className="box-image" src={k.metadata.image} alt="box" />
            <div className="box-open">OPEN</div>
          </div>
        </div>
      ))}
    </div>
  )
}