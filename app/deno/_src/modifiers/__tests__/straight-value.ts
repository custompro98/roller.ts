import StraightValue from '../straight-value.ts'

describe('StraightValue', () => {
  it('wraps a raw value to be added', () => {
    let mod = 5
    let subject = new StraightValue(mod)

    expect(subject.value()).toEqual(mod)

    mod = 2
    subject = new StraightValue(mod)

    expect(subject.value()).toEqual(mod)
  })
})
