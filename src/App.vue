<style>
@import url('https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap');
</style>

<template>
  <main class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
    <section class="font-sans w-full max-w-sm">
      <div class="rounded-[2rem] bg-slate-800 shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <header class="px-6 pt-6 pb-2 text-center select-none">
          <h1 class="text-4xl font-extrabold text-slate-100">La Calculatrice</h1>
          <p class="text-xs tracking-widest text-slate-400">RESULTAT</p>
        </header>

        <!-- Afficheur du résultat -->
        <div class="px-6">
          <div class="h-28 flex items-end justify-end">
            <div class="w-full text-right font-light tabular-nums tracking-tight text-6xl text-slate-100">
              {{ isNaN(result) ? '—' : formatNumber(result) }}
            </div>
          </div>
        </div>

        <!-- Deux champs number -->
        <div class="px-6 pt-2">
          <div class="flex gap-3 mb-4">
            <input
              aria-label="Premier nombre"
              class="no-spin flex-1 min-w-0 rounded-2xl border border-slate-700 bg-slate-700/60 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-inner outline-none focus:ring-4 focus:ring-indigo-500/30"
              type="number"
              v-model.number="a"
              placeholder="a"
            />
            <input
              aria-label="Second nombre"
              class="no-spin flex-1 min-w-0 rounded-2xl border border-slate-700 bg-slate-700/60 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-inner outline-none focus:ring-4 focus:ring-indigo-500/30"
              type="number"
              v-model.number="b"
              placeholder="b"
            />
          </div>
        </div>

        <!-- 4 boutons d'opérations -->
        <div class="px-6 pb-6 grid grid-cols-2 gap-3 select-none">
          <button class="h-14 rounded-xl text-lg font-semibold shadow-sm active:scale-[.98] focus:outline-none bg-slate-500 text-white hover:bg-indigo-500" @click="onAdd">+ Additionner</button>
          <button class="h-14 rounded-xl text-lg font-semibold shadow-sm active:scale-[.98] focus:outline-none bg-slate-500 text-white hover:bg-rose-500" @click="onSub">− Soustraire</button>
          <button class="h-14 rounded-xl text-lg font-semibold shadow-sm active:scale-[.98] focus:outline-none bg-slate-500 text-white hover:bg-rose-500" @click="onMul">× Multiplier</button>
          <button class="h-14 rounded-xl text-lg font-semibold shadow-sm active:scale-[.98] focus:outline-none bg-slate-500 text-white hover:bg-indigo-500" @click="onPow">^ Puissance</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { add, sub, mul, pow } from './utils/calculs.js'

export default {
  name: 'App',
  data() {
    return {
      a: 0,
      b: 0,
      result: NaN,
    };
  },
  mounted() {
    this.onPow();
  },
  methods: {
    onAdd() { this.result = add(this.a, this.b); },
    onSub() { this.result = sub(this.a, this.b); },
    onMul() { this.result = mul(this.a, this.b); },
    onPow() { this.result = pow(this.a, this.b); },
    formatNumber(n) {
      if (Number.isNaN(n)) return '—';
      try { return n.toLocaleString('fr-FR'); } catch { return String(n); }
    }
  }
};
</script>

<style scoped>

.tabular-nums {
  font-variant-numeric: tabular-nums;
}


.no-spin::-webkit-outer-spin-button,
.no-spin::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.no-spin { -moz-appearance: textfield; }
</style>
