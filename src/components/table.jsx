import { useMemo } from "react";

const head = ['Treasures', 'Bonus SOL', 'Probability', 'Found', 'Remains']

export const Table = ({ lots }) => {
  const tot = useMemo(() => lots.reduce((acc, k) => (acc + parseInt(k.qty) - parseInt(k.wins)) ,0), [lots]);

  return(
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {head.map((k, i) => (
              <th key={i}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lots.map((k, i) => (
            <tr key={i}>
              <td className="quity">
                <img src="/img/mini-box.png" alt="box" />
                <span> - {parseInt(k.qty)}</span>
              </td>
              <td>
                {(parseInt(k.bonus) / 1000000000).toFixed(2)} SOL
              </td>
              <td>
                {parseInt((parseInt(k.qty) - parseInt(k.wins))) * 100 / tot}%
              </td>
              <td>
                {parseInt(k.wins)}
              </td>
              <td>
                {parseInt(k.qty) - parseInt(k.wins)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}