import { compact, find, forEach, trim } from 'lodash'

import { INTENT_MAP, INTENTS, INTENTS_INPUT, isMonitor } from './intentList'

class DSLParser {
  constructor() {
    // test
  }

  public parse(text: string) {
    const formatted = this.format(text)
    const config = formatted.map((formattedArray) => {
      const methodIndex = this.checkMethod(formattedArray)
      if (methodIndex > -1) {
        const method = formattedArray[methodIndex].slice(1)
        const settings = this.getIntentSettings(method)
        if (settings) {
          return this.generateConfig(settings, formattedArray)
        }
      }
    })
    const parseResult = this.mergeConfig(compact(config))
    return parseResult
  }

  public mergeConfig(config: any[]) {
    const res = []
    let monitorConfigs = {} as any
    forEach(config, (value, index) => {
      if (isMonitor(value.intent)) {
        if (monitorConfigs.intents) {
          monitorConfigs.intents.push(value.intent)
          monitorConfigs.params.push(value.param)
        } else {
          monitorConfigs = {
            intents: [value.intent],
            params: [value.param],
          }
        }
      } else {
        if (index === 0) {
          res.push({
            intents: [value.intent],
            params: [value.param],
          })
        } else if (res[res.length - 1].intents[0] === value.intent) {
          res[res.length - 1].intents.push(value.intent)
          res[res.length - 1].params.push(value.param)
        } else {
          res.push({
            intents: [value.intent],
            params: [value.param],
          })
        }
      }
    })
    if (monitorConfigs.intents) {
      res.push(monitorConfigs)
    }
    return res
  }

  private generateConfig(
    settings: {
      intent: INTENTS
      method: string
      params: INTENTS_INPUT[]
    },
    formattedArray: string[]
  ) {
    const tokenIndex = this.checkToken(formattedArray)
    const numberIndex = this.checkNumber(formattedArray)
    if (settings.intent === INTENTS.INTENT_BORROW) {
      return {
        intent: settings.intent,
        param: {
          type: INTENTS_INPUT.INTENTS_INPUT_TOKENS,
          amount: Number(formattedArray[numberIndex]) || 0,
          symbol: (formattedArray[tokenIndex] || '').slice(1),
        },
      }
    } else if (settings.intent === INTENTS.INTENT_FARM) {
      return {
        intent: settings.intent,
        param: {
          type: INTENTS_INPUT.INTENTS_INPUT_PRICE_RANGE,
          from: Number(formattedArray[6]?.slice(0, -1)) / 100,
          to: Number(formattedArray[7]?.slice(0, -1)) / 100,
          platform: formattedArray[2],
          pool: formattedArray[3],
        },
      }
    } else if (settings.intent === INTENTS.INTENT_RANGESTOP) {
      return {
        intent: settings.intent,
        param: {
          type: INTENTS_INPUT.INTENTS_INPUT_RANGESTOP_RANGE,
          from: Number(formattedArray[3]?.slice(0, -1)) / 100,
          to: Number(formattedArray[4]?.slice(0, -1)) / 100,
        },
      }
    } else {
      return {
        intent: settings.intent,
        param: [],
      }
    }
  }

  private getIntentSettings(methodName: string): {
    intent: INTENTS
    method: string
    params: INTENTS_INPUT[]
  } {
    let settings = null
    console.log(methodName)
    forEach(INTENT_MAP, (value, key) => {
      if (value.method === methodName) {
        settings = { ...value, intent: key }
      }
    })
    return settings
  }

  private format(text: string) {
    const step1 = compact(text.split('\n'))
    return step1.map((element) => {
      const params = compact(element.split(' '))
      return params
    })
  }

  private checkMethod(formattedArray: string[]) {
    let idx = -1
    formattedArray.forEach((str, index) => {
      if (str[0] === '@') {
        idx = index
      }
    })
    return idx
  }

  private checkToken(formattedArray: string[]) {
    let idx = -1
    formattedArray.forEach((str, index) => {
      if (str[0] === '$') {
        idx = index
      }
    })
    return idx
  }

  private checkNumber(formattedArray: string[]) {
    let idx = -1
    formattedArray.forEach((str, index) => {
      if (Number(str) > 0) {
        idx = index
      }
    })
    return idx
  }
}

export default DSLParser
