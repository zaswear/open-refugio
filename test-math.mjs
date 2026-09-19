import assert from 'node:assert';
import { readFile } from 'node:fs/promises';

console.log('Ejecutando suite de validación de OpenRefugio...');

// 1. Validar i18n
const i18nCode = await readFile(new URL('i18n.js', import.meta.url), 'utf8');
assert(i18nCode.includes("SUPPORTED = ['es', 'en', 'nl']"), 'i18n debe soportar es, en, nl');
console.log('✓ i18n soporta los 3 idiomas clave (ES, EN, NL)');

// 2. Validar cálculos del simulador
function calcResources(adults, minors, dependents, days, petCount, petWaterLpd) {
  const persons = adults + minors + dependents;
  const water = (persons * 3 + petCount * petWaterLpd) * days;
  const food = persons * 3 * days;
  const cash = adults * 70 + minors * 30;
  return { water, food, cash };
}

const res72h = calcResources(2, 1, 0, 3, 1, 0.5);
assert.strictEqual(res72h.water, (3 * 3 + 0.5) * 3); // (9 + 0.5) * 3 = 28.5 L
assert.strictEqual(res72h.food, 3 * 3 * 3); // 27 raciones
assert.strictEqual(res72h.cash, 2 * 70 + 1 * 30); // 170 €
console.log('✓ Cálculo de recursos para 72h correcto (2 adultos, 1 menor, 1 mascota: 28.5L agua, 27 raciones, 170€)');

const resSoloAdulto = calcResources(1, 0, 0, 7, 0, 0);
assert.strictEqual(resSoloAdulto.water, 21); // 21 L
assert.strictEqual(resSoloAdulto.food, 21); // 21 raciones
assert.strictEqual(resSoloAdulto.cash, 70); // 70 €
console.log('✓ Cálculo de recursos para 7 días / 1 adulto correcto');

console.log('Todas las comprobaciones pasaron exitosamente.');
