import { random } from '../index'

describe('random', () => {
  it('returns a number', () => {
    const result = random()

    expect(typeof result).toEqual('number')
  })

  it('returns a random number every time', () => {
    const firstCall = random()
    const secondCall = random()

    expect(firstCall).not.toEqual(secondCall)
  })
})
