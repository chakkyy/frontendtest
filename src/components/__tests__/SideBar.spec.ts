import { describe, test, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { useMoveListStore } from '@/stores/moves';
import SideBar from '../SideBar.vue';
import { setupTestingPinia } from './setupTest';

describe('Sidebar.vue', () => {
  let store: ReturnType<typeof useMoveListStore>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    const pinia = setupTestingPinia();
    store = useMoveListStore(pinia);
    wrapper = mount(SideBar, { global: { plugins: [pinia] } });
  });

  test('Displays "Ready to play?" message when there are no moves', () => {
    expect(wrapper.find('.sidebar-text').exists()).toBe(true);
    expect(wrapper.find('.moves-container').exists()).toBe(false);
  });

  test('Displays a list of moves when there are moves', async () => {
    store.addSquare('a1');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.sidebar-text').exists()).toBe(false);
    expect(wrapper.find('.moves-container').exists()).toBe(true);
  });

  test('Move list should have alternating row background colors', async () => {
    store.addSquare('a1');
    store.addSquare('a2');
    store.addSquare('b1');
    store.addSquare('b2');

    await wrapper.vm.$nextTick();

    const moveRows = wrapper.findAll('.move-row');
    expect(moveRows.length).toBe(2);

    const firstRow = moveRows[0];
    const secondRow = moveRows[1];

    expect(firstRow.classes()).toContain('even-row');
    expect(firstRow.classes()).not.toContain('odd-row');

    expect(secondRow.classes()).toContain('odd-row');
    expect(secondRow.classes()).not.toContain('even-row');
  });

  test('Reset button should clear the move list', async () => {
    store.addSquare('a1');
    store.addSquare('a2');
    store.addSquare('b1');
    store.addSquare('b2');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.moves-container').exists()).toBe(true);

    const resetButton = wrapper.find('[data-testid="reset-button"]');
    await resetButton.trigger('click');

    expect(wrapper.find('.sidebar-text').exists()).toBe(true);
    expect(wrapper.find('.moves-container').exists()).toBe(false);
  });
});
