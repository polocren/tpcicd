// Fonctions de calcul utilisées par l'UI et par les tests
export function add(a = 0, b = 0) {
  return (a ?? 0) + (b ?? 0);
}

export function sub(a = 0, b = 0) {
  return (a ?? 0) - (b ?? 0);
}

export function mul(a = 0, b = 0) {
  return (a ?? 0) * (b ?? 0);
}

export function pow(a = 0, b = 0) {
  return Math.pow(a ?? 0, b ?? 0);
}

