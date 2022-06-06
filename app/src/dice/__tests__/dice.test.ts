import Die, { d2, d4, d6, d8, d10, d12, d20, d100 } from '../dice'

describe('dice', () => {
  describe('d2', () => {
    it('returns a number between 1 and 2', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d2()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(2)
      }
    })
  })

  describe('d4', () => {
    it('returns a number between 1 and 4', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d4()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(4)
      }
    })
  })

  describe('d6', () => {
    it('returns a number between 1 and 6', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d6()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(6)
      }
    })
  })

  describe('d8', () => {
    it('returns a number between 1 and 8', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d8()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(8)
      }
    })
  })

  describe('d10', () => {
    it('returns a number between 1 and 10', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d10()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(10)
      }
    })
  })

  describe('d12', () => {
    it('returns a number between 1 and 12', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d12()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(12)
      }
    })
  })

  describe('d20', () => {
    it('returns a number between 1 and 20', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d20()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(20)
      }
    })
  })

  describe('d100', () => {
    it('returns a number between 1 and 100', () => {
      for (let i = 0; i < 1000; i++) {
        const result = d100()
        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThanOrEqual(100)
      }
    })
  })
})

describe('Die', () => {
  it('wraps a DiceFunction', () => {
    let subject = new Die(d4)

    for (let i = 0; i < 1000; i++) {
      const result = subject.reroll()

      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThanOrEqual(4)
    }

    subject = new Die(d2)

    for (let i = 0; i < 1000; i++) {
      const result = subject.reroll()

      expect(result).toBeGreaterThan(0)
      expect(result).toBeLessThanOrEqual(2)
    }
  })
})
