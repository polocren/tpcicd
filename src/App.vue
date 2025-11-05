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
              step="any"
              inputmode="decimal"
              autocomplete="off"
              spellcheck="false"
              @keydown="filterKeydown"
              @paste="handlePaste"
              @input="normalizeInput"
              v-model.number="a"
              placeholder="a"
            />
            <input
              aria-label="Second nombre"
              class="no-spin flex-1 min-w-0 rounded-2xl border border-slate-700 bg-slate-700/60 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-inner outline-none focus:ring-4 focus:ring-indigo-500/30"
              type="number"
              step="any"
              inputmode="decimal"
              autocomplete="off"
              spellcheck="false"
              @keydown="filterKeydown"
              @paste="handlePaste"
              @input="normalizeInput"
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
    onAdd() { this.result = add(this.validNum(this.a), this.validNum(this.b)); },
    onSub() { this.result = sub(this.validNum(this.a), this.validNum(this.b)); },
    onMul() { this.result = mul(this.validNum(this.a), this.validNum(this.b)); },
    onPow() { this.result = pow(this.validNum(this.a), this.validNum(this.b)); },
    validNum(n) { return Number.isFinite(n) ? n : 0; },
    normalizeInput(e) {
      const el = e.target;
      // Remplace les virgules par des points et supprime les chars illégaux restants
      let v = String(el.value || '').replace(/,/g, '.');
      // Garde uniquement: éventuel '-' en tête, chiffres, un seul '.'
      const isNeg = v.startsWith('-');
      v = v.replace(/[^0-9.-]/g, '');
      // Retire les '-' non en tête
      v = (isNeg ? '-' : '') + v.replace(/-/g, '');
      // Un seul point
      const parts = v.split('.');
      if (parts.length > 2) v = parts.shift() + '.' + parts.join('');
      if (el.value !== v) {
        el.value = v;
        // Re-déclenche l'événement input pour mettre à jour v-model.number
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    },
    handlePaste(e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const el = e.target;
      const before = el.value.slice(0, el.selectionStart || 0);
      const after = el.value.slice(el.selectionEnd || 0);
      let insert = String(text).replace(/,/g, '.').replace(/[^0-9.-]/g, '');
      // Filtrage '-' et '.' selon le contexte
      const current = before + insert + after;
      // Construit une version nettoyée
      let v = current;
      const isNeg = v.startsWith('-');
      v = v.replace(/-/g, '');
      v = (isNeg ? '-' : '') + v;
      const p = v.split('.');
      if (p.length > 2) v = p.shift() + '.' + p.join('');
      el.value = v;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    },
    filterKeydown(e) {
      const allowedNav = ['Backspace','Delete','Tab','Escape','Enter','ArrowLeft','ArrowRight','Home','End'];
      if (allowedNav.includes(e.key)) return;
      // Raccourcis ctrl/cmd
      if ((e.ctrlKey || e.metaKey) && ['a','c','v','x','z','y'].includes(e.key.toLowerCase())) return;
      const el = e.target;
      const v = String(el.value || '');
      // Empêche 'e'/'E' et '+' (notation exponentielle)
      if (e.key === 'e' || e.key === 'E' || e.key === '+') { e.preventDefault(); return; }
      // Virgule -> autorisée mais on la normalise sur input; éviter multiples points/virgules
      if (e.key === '.' || e.key === ',') {
        if (v.includes('.') || v.includes(',')) { e.preventDefault(); }
        return;
      }
      // Signe négatif seulement en première position
      if (e.key === '-') {
        const pos = el.selectionStart || 0;
        if (pos !== 0 || v.includes('-')) e.preventDefault();
        return;
      }
      // Chiffres 0-9 autorisés
      if (e.key >= '0' && e.key <= '9') return;
      // Tout le reste bloqué
      e.preventDefault();
    },
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
