import { random } from '../random'
import { DiceFunction } from './types'

const roller = (ceiling: number): DiceFunction => {
  return (): number => {
    const seed = random()

    return Math.ceil(seed * ceiling)
  }
}

export { roller }
