import { Modifier } from './types.ts'

export default class StraightValue implements Modifier {
  private mod: number

  constructor(mod: number) {
    this.mod = mod
  }

  value(): number {
    return this.mod
  }
}
