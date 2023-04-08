import { createPinia } from 'pinia';

export function setupTestingPinia() {
  const pinia = createPinia();
  return pinia;
}
