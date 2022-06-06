import { parse } from '../parser'

describe('parse', () => {
  it('returns an empty array for no input', () => {
    const input = ''
    const result = parse(input)

    expect(result.length).toEqual(0)
  })

  it('can parse a straight value', () => {
    const input = '5'
    const result = parse(input)

    expect(result.length).toEqual(1)
    expect(result[0].value()).toEqual(5)
  })

  it('can parse two straight values', () => {
    const input = '5+3'
    const result = parse(input)

    expect(result.length).toEqual(2)
    expect(result[0].value()).toEqual(5)
    expect(result[1].value()).toEqual(3)
  })

  it('ignores bad straight value inputs', () => {
    const input = 'hello'
    const result = parse(input)

    expect(result.length).toEqual(0)
  })

  it('can parse a die', () => {
    for (let i = 0; i < 1000; i++) {
      const input = 'd6'
      const result = parse(input)

      expect(result.length).toEqual(1)
      expect(result[0].value()).toBeGreaterThanOrEqual(1)
      expect(result[0].value()).toBeLessThanOrEqual(6)
    }
  })

  it('can parse two dice', () => {
    for (let i = 0; i < 1000; i++) {
      const input = 'd6 + d4'
      const result = parse(input)

      expect(result.length).toEqual(2)
      expect(result[0].value()).toBeGreaterThanOrEqual(1)
      expect(result[0].value()).toBeLessThanOrEqual(6)

      expect(result[1].value()).toBeGreaterThanOrEqual(1)
      expect(result[1].value()).toBeLessThanOrEqual(4)
    }
  })

  it('can parse two dice shorthand', () => {
    for (let i = 0; i < 1000; i++) {
      const input = '2d6'
      const result = parse(input)

      expect(result.length).toEqual(2)
      expect(result[0].value()).toBeGreaterThanOrEqual(1)
      expect(result[0].value()).toBeLessThanOrEqual(6)

      expect(result[1].value()).toBeGreaterThanOrEqual(1)
      expect(result[1].value()).toBeLessThanOrEqual(6)
    }
  })

  it('can parse one die shorthand', () => {
    for (let i = 0; i < 1000; i++) {
      const input = '1d6'
      const result = parse(input)

      expect(result.length).toEqual(1)
      expect(result[0].value()).toBeGreaterThanOrEqual(1)
      expect(result[0].value()).toBeLessThanOrEqual(6)
    }
  })

  it('can parse dice and straight values', () => {
    for (let i = 0; i < 1000; i++) {
      const input = '1d6 + 56'
      const result = parse(input)

      expect(result.length).toEqual(2)
      expect(result[0].value()).toBeGreaterThanOrEqual(1)
      expect(result[0].value()).toBeLessThanOrEqual(6)

      expect(result[1].value()).toEqual(56)
    }
  })

  it('ignores bad dice inputs', () => {
    const input = 'nd6'
    const result = parse(input)

    expect(result.length).toEqual(0)
  })
})
