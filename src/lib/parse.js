import {Buffer} from 'buffer';
import './borsh';
import {deserializeUnchecked} from './borshLib';
import { PublicKey, Connection } from '@solana/web3.js';
import { deserializeMeta } from './meta-more';

export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
export const METADATA_PREFIX = 'metadata';
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');


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

const getFetch = async params => {
  const toFind = [];
  let j = 0;
  for(let i = 0; i < params.length; i++) {
    if(!toFind[j]) toFind[j] = [];
    toFind[j].push(params[i]);
    if((i > 0) && (i % 95 === 0)) j++;
  }

  let res = [];
  for(let i = 0; i < toFind.length; i++) {
    let accs = await fetch(process.env.REACT_APP_SOLANA, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getMultipleAccounts',
        params: [toFind[i], {encoding: 'jsonParsed'}]
      })
    });
    accs = await accs.json();
    if(accs.result?.value) res = [...res, ...accs.result?.value];
  }

  return res;
}

const getMetadadta = async accs => {
  if(!accs) return [];
  const arr = [];
  for(let i = 0; i < accs.length; i++) {
    if(!accs[i]) continue;
    let one = accs[i].data[0];
    one = Buffer.from(one, 'base64');
    one = Array.from(one);
    one.unshift(0);
    try{
      one = deserializeMeta(Buffer.from(one));
      one = {...one,
        creators: one.data.creators,
        seller_fee_basis_points: one.data.seller_fee_basis_points,
        name: one.data.name.replace(/\0.*$/g,''),
        symbol: one.data.symbol.replace(/\0.*$/g,''),
        uri: one.data.uri.replace(/\0.*$/g,'')
      }
      delete(one.data);
      let metadata = await fetch(one.uri);
      metadata = await metadata.json();
      if(!metadata.SIB) continue;
      one.metadata = metadata;
      arr.push(one);
    }catch(e){}
  }
  return arr;
}

export const getMetadataAccount = async mint => {
  const seed = [
    Buffer.from(METADATA_PREFIX),
    new PublicKey(METADATA_PROGRAM_ID).toBuffer(),
    new PublicKey(new PublicKey(mint)).toBuffer()
  ];
  const result = await PublicKey.findProgramAddress(seed, new PublicKey(METADATA_PROGRAM_ID));
  return result[0].toBase58();
}

export const getTokenList = async (me) => {
  
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    { filters: [ { dataSize: 165 } , { memcmp: { offset: 32, bytes: me }}]}
  );

  const params = [];
  for(let i = 0; i < accounts.length; i++) {
    let k = accounts[i];
    try{
      const qt = parseInt(k.account.data.parsed.info.tokenAmount.amount);
      if(qt < 1) continue;
      let mint = k.account.data.parsed.info.mint;
      params.push(await getMetadataAccount(mint));
    }catch(e){}
  }
  const accs = await getFetch(params);
  return getMetadadta(accs);
}