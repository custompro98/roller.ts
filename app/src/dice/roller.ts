import { random } from '../random'
import { RollFunction } from './types'

const roller = (ceiling: number): RollFunction => {
  return (): number => {
    const seed = random()

    return Math.ceil(seed * ceiling)
  }
}

export { roller }
