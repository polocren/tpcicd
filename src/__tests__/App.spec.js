import { describe, it, expect } from 'vitest'
import { add, sub, mul, pow } from '../utils/calculs.js'

describe('calculs utils', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
  })

  it('subtracts numbers', () => {
    expect(sub(10, 4)).toBe(6)
    expect(sub(0, 2)).toBe(-2)
  })

  it('multiplies numbers', () => {
    expect(mul(3, 4)).toBe(12)
    expect(mul(-2, 5)).toBe(-10)
  })

  it('powers numbers', () => {
    expect(pow(2, 3)).toBe(8)
    expect(pow(5, 0)).toBe(1)
  })
})
