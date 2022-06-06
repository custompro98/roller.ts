import { roller } from '../roller'

describe('roll', () => {
  it('returns a curried rollDietion', () => {
    const rollDie = roller(0)

    expect(typeof rollDie).toEqual('function')
  })

  it('returns a rollDietion that always returns less than the ceiling', () => {
    const ceiling = 8
    const rollDie = roller(ceiling)

    for (let i = 0; i < 1000; i++) {
      const result = rollDie()
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThanOrEqual(ceiling)
    }
  })

  it('returns a rollDietion that respects the ceiling', () => {
    const ceiling = 20
    const rollDie = roller(ceiling)

    for (let i = 0; i < 1000; i++) {
      const result = rollDie()
      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThanOrEqual(ceiling)
    }
  })

  it('returns zero if zero is passed in as the ceiling', () => {
    const ceiling = 0
    const rollDie = roller(ceiling)

    const result = rollDie()
    expect(result).toEqual(0)
  })
})
