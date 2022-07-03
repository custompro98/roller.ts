import { random } from '../random/index.ts'
import { RollFunction } from './types.ts'

const roller = (ceiling: number): RollFunction => {
  return (): number => {
    const seed = random()

    return Math.ceil(seed * ceiling)
  }
}

export { roller }
