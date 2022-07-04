import type { Summable } from '../summable/index.ts'

export interface Modifier extends Summable {
  value(): number
}
