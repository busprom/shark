import { PublicKey } from '@solana/web3.js';
import { BinaryReader, BinaryWriter } from './borshLib';
import base58 from 'bs58';

export const extendBorsh = () => {
  (BinaryReader.prototype).readPubkey = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  (BinaryWriter.prototype).writePubkey = function (value) {
    const writer = this;
    writer.writeFixedArray(value.toBuffer());
  };

  (BinaryReader.prototype).readPubkeyAsString = function () {
    const reader = this;
    const array = reader.readFixedArray(32);
    return base58.encode(array);
  };

  (BinaryWriter.prototype).writePubkeyAsString = function (
    value,
  ) {
    const writer = this;
    writer.writeFixedArray(base58.decode(value));
  };

  // BTreeMap<u32, u32>
  (BinaryReader.prototype).readMap32 = function () {
    const reader = this;
    const map = new Map();
    const length = reader.readU32();
    for (let i = 0; i < length; i++) {
      const key = reader.readU32();
      const val = reader.readU32();
      map.set(key, val);
    }
    return map;
  };

  // BTreeMap<u32, u32>
  (BinaryWriter.prototype).writeMap32 = function (
    value,
  ) {
    const writer = this;
    value.forEach((val, key) => {
      writer.writeU32(key);
      writer.writeU32(val);
    });
  };
};

extendBorsh();