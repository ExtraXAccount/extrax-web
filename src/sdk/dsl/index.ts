import { compact, trim } from 'lodash'

class DSLParser {
  constructor() {}

  public parse(text: string) {
    const formatted = this.format(text)
  }

  private format(text: string) {
    const step1 = compact(text.split('\n'))
    step1.map((element) => {
      const trimed = trim(element)
    })
  }
}

export default DSLParser
