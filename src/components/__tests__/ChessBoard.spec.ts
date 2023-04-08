import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { setupTestingPinia } from './setupTest';
import ChessBoard from '../ChessBoard.vue';

test('Clicking a chessboard square should highlight the square', async () => {
  const pinia = setupTestingPinia();
  const wrapper = mount(ChessBoard, { global: { plugins: [pinia] } });
  const square = wrapper.get('[data-testid="square-a1"]');

  await square.trigger('click');
  expect(square.classes()).toContain('highlighted');
});

test('Clicking two different squares highlights both squares', async () => {
  const wrapper = mount(ChessBoard);
  const square1 = wrapper.get('[data-testid="square-a1"]');
  const square2 = wrapper.get('[data-testid="square-b1"]');

  await square1.trigger('click');
  await square2.trigger('click');
  expect(square1.classes()).toContain('highlighted');
  expect(square2.classes()).toContain('highlighted');
});

test('Clicking a third square removes the highlights from the previous squares and highlights the third square', async () => {
  const wrapper = mount(ChessBoard);
  const square1 = wrapper.get('[data-testid="square-a1"]');
  const square2 = wrapper.get('[data-testid="square-b1"]');
  const square3 = wrapper.get('[data-testid="square-c1"]');

  await square1.trigger('click');
  await square2.trigger('click');
  await square3.trigger('click');
  expect(square1.classes()).not.toContain('highlighted');
  expect(square2.classes()).not.toContain('highlighted');
  expect(square3.classes()).toContain('highlighted');
});
