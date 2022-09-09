import './borsh';
import { deserializeUnchecked } from './borshLib';


class Metadata {
  instruction = 0;
  constructor(obj) {
    Object.assign(this, obj)
  }
}
class Data {
  constructor(obj) {
    Object.assign(this, obj)
  }
}
class Uses {
  constructor(obj) {
    Object.assign(this, obj)
  }
}
class Collection {
  constructor(obj) {
    Object.assign(this, obj)
  }
}
class Creator {
  constructor(obj) {
    Object.assign(this, obj)
  }
}

const schema = new Map([
  [Metadata,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['key', 'u8'],
        ['update_authority', 'pubkeyAsString'],
        ['mint', 'pubkeyAsString'],
        ['data', Data],
        ['primary_sale_happened', 'u8'],
        ['is_mutable', 'u8'],
        ['edition_nonce', { kind: 'option', type: 'u8' }],
        ['token_standard', { kind: 'option', type: 'u8' }],
        ['collection', { kind: 'option', type: Collection }],
        ['uses', { kind: 'option', type: Uses }]
      ]
    }
  ],
  [Uses, {
    kind: 'struct',
    fields: [
      ['use_method', 'u8'],
      ['remaining', 'u64'],
      ['total', 'u64']
    ]
  }],
  [Collection, {
    kind: 'struct',
    fields: [
      ['verified', 'u8'],
      ['key', 'pubkeyAsString']
    ]
  }],
  [Creator, {
    kind: 'struct',
    fields: [
      ['address', 'pubkeyAsString'],
      ['verified', 'u8'],
      ['share', 'u8']
    ]
  }],
  [Data, {
    kind: 'struct',
    fields: [
      ['name', 'string'],
      ['symbol', 'string'],
      ['uri', 'string'],
      ['seller_fee_basis_points', 'u16'],
      ['creators', { kind: 'option', type: [Creator] } ]
    ]
  }]
]);

export const deserializeMeta = buffer => deserializeUnchecked(schema, Metadata, buffer);