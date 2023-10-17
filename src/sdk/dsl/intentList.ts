export enum INTENTS {
  INTENT_DEPOSIT = 'INTENT_DEPOSIT',
  INTENT_BORROW = 'INTENT_BORROW',
  INTENT_SWAP = 'INTENT_SWAP',
  INTENT_FARM = 'INTENT_FARM',
  INTENT_AUTOCOMPOUND = 'INTENT_AUTOCOMPOUND',
}

export enum INTENTS_INPUT {
  INTENTS_INPUT_TOKENS = 'INTENTS_INPUT_TOKENS',
  INTENTS_INPUT_LEVERAGE = 'INTENTS_INPUT_LEVERAGE',
  INTENTS_INPUT_PRICE_RANGE = 'INTENTS_INPUT_PRICE_RANGE',
}

export const INTENT_MAP = {
  [INTENTS.INTENT_DEPOSIT]: {
    method: 'Deposit',
    params: [INTENTS_INPUT.INTENTS_INPUT_TOKENS],
  },
  [INTENTS.INTENT_BORROW]: {
    method: 'Borrow',
    params: [INTENTS_INPUT.INTENTS_INPUT_TOKENS],
  },
  [INTENTS.INTENT_SWAP]: {
    method: 'Swap',
    params: [INTENTS_INPUT.INTENTS_INPUT_TOKENS],
  },
  [INTENTS.INTENT_FARM]: {
    method: 'Farm',
    params: [INTENTS_INPUT.INTENTS_INPUT_TOKENS, INTENTS_INPUT.INTENTS_INPUT_PRICE_RANGE],
  },
  [INTENTS.INTENT_AUTOCOMPOUND]: {
    method: 'AutoCompound',
    params: [],
  },
}
