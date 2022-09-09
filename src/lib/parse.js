import {Buffer} from 'buffer';
import './borsh';
import {deserializeUnchecked} from './borshLib';
import { PublicKey, Connection } from '@solana/web3.js';

export const connection = new Connection(process.env.REACT_APP_SOLANA, 'confirmed');
export const getWallet = async () => {
  if ("solana" in window) {
    await window.solana.connect();
    return window.solana;
  } else {
    window.open("https://www.phantom.app/", "_blank");
  }
}

export const parse = async () => {
  const acc = await connection.getAccountInfo(new PublicKey(process.env.REACT_APP_GAME));
  const data = Array.from(acc.data);
  data.unshift(0);
  return deserializeUnchecked(sol_lottery, SolLotery, Buffer.from(data));
}
class SolLotery {
  instruction = 7;
  constructor(obj) {
    Object.assign(this, obj)
  }
}
class SolLot {
  constructor(obj) {
    Object.assign(this, obj)
  }
}
const sol_lottery = new Map([
  [SolLotery, {
    kind: 'struct',
    fields: [
      ['instruction', 'u8'],
      ['name', 'string'],
      ['owner', 'pubkeyAsString'],
      ['url', 'string'],
      ['box_url', 'string'],
      ['lots', [SolLot]],
      ['create_box', 'u64'],
      ['time', 'u64']
    ],
  }],
  [SolLot, {
    kind: 'struct',
    fields: [
      ['bonus', 'u64'],
      ['qty', 'u64'],
      ['wins', 'u64']
    ]
  }]
]);