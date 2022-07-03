import type { Summable } from '../summable'

export interface Modifier extends Summable {
  value(): number
}
