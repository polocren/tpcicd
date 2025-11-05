import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { add, sub, mul, pow } from '../utils/calculs.js'
import App from '../App.vue'

// Utils: plus de cas
describe('calculs utils', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(undefined, 5)).toBe(5)
  })

  it('subtracts numbers', () => {
    expect(sub(10, 4)).toBe(6)
    expect(sub(0, 2)).toBe(-2)
    expect(sub(undefined, 2)).toBe(-2)
  })

  it('multiplies numbers', () => {
    expect(mul(3, 4)).toBe(12)
    expect(mul(-2, 5)).toBe(-10)
    expect(mul(undefined, 5)).toBe(0)
  })

  it('powers numbers (including edge cases)', () => {
    expect(pow(2, 3)).toBe(8)
    expect(pow(5, 0)).toBe(1)
    expect(pow(-2, 2)).toBe(4)
    expect(pow(-2, 3)).toBe(-8)
  })

  it('handles decimals approximately', () => {
    expect(add(1.2, 0.3)).toBeCloseTo(1.5, 10)
    expect(mul(0.1, 0.2)).toBeCloseTo(0.02, 10)
  })

  it('returns NaN if passed NaN (by design)', () => {
    expect(Number.isNaN(add(NaN, 5))).toBe(true)
  })
})

// UI: tests basiques de l’interface
describe('App UI', () => {
  const getDisplayText = (wrapper) => wrapper.find('.tabular-nums').text().trim()
  const setInputs = async (wrapper, a, b) => {
    const ia = wrapper.get('input[placeholder="a"]')
    const ib = wrapper.get('input[placeholder="b"]')
    await ia.setValue(String(a))
    await ib.setValue(String(b))
    await nextTick()
  }
  const clickByLabel = async (wrapper, txt) => {
    const btn = wrapper.findAll('button').find(b => b.text().includes(txt))
    expect(btn, `button '${txt}' not found`).toBeTruthy()
    await btn.trigger('click')
  }

  it('mounts and shows initial power result (0^0 → 1)', async () => {
    const wrapper = mount(App)
    await nextTick()
    expect(getDisplayText(wrapper)).toContain('1')
  })

  it('performs +, −, ×, ^ on integer inputs', async () => {
    const wrapper = mount(App)
    await setInputs(wrapper, 12, 5)
    await clickByLabel(wrapper, 'Additionner')
    await nextTick(); expect(getDisplayText(wrapper)).toContain('17')

    await clickByLabel(wrapper, 'Soustraire')
    await nextTick(); expect(getDisplayText(wrapper)).toContain('7')

    await clickByLabel(wrapper, 'Multiplier')
    await nextTick(); expect(getDisplayText(wrapper)).toContain('60')

    await clickByLabel(wrapper, 'Puissance')
    await nextTick(); expect(getDisplayText(wrapper)).toContain('248') //
  })

  it('accepts decimals and formats fr-FR', async () => {
    const wrapper = mount(App)
    await setInputs(wrapper, '1.5', '2')
    await clickByLabel(wrapper, 'Additionner')
    // Affichage fr-FR -> virgule décimale
    await nextTick(); expect(getDisplayText(wrapper)).toContain('3,5')
  })

  it('invalid input falls back to 0 in UI layer', async () => {
    const wrapper = mount(App)
    await setInputs(wrapper, 'abc', '2')
    await clickByLabel(wrapper, 'Additionner')
    expect(getDisplayText(wrapper)).toMatch(/\b2\b/)
  })
})
