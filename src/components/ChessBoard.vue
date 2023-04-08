<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMoveListStore, type MoveListStore } from '@/stores/moves';
import BoardArray from '../BoardArray';

const store = useMoveListStore();
const { highlightedSquares } = storeToRefs(store) as MoveListStore;
const { addSquare } = store;

/**
 * Mouse event handlers to manage drag-and-drop behavior on the chessboard.
 *
 * - `isMouseDown` is a reactive flag indicating whether the mouse button is currently pressed down.
 * - `onMouseDown` handles the `mousedown` event and sets the `isMouseDown` flag to `true`.
 * - `onMouseUp` handles the `mouseup` event and sets the `isMouseDown` flag to `false`.
 * - `onMouseMove` handles the `mousemove` event and prevents the default behavior if the `isMouseDown` flag is `true`.
 */
const isMouseDown = ref(false);

function onMouseDown() {
  isMouseDown.value = true;
}
function onMouseUp() {
  isMouseDown.value = false;
}
function onMouseMove(e: Event) {
  if (isMouseDown.value) {
    e.preventDefault();
    return;
  }
}

/**
 * Handles the click event on a chessboard square.
 * Adds the move represented by the clicked square to the move list store
 * and updates the `highlightedSquares` value in the store.
 *
 * @param e - The click event object.
 */
function onSquareClick(e: MouseEvent) {
  const squareEl = e.currentTarget as HTMLElement;
  const square = squareEl.dataset.move as string;

  if (highlightedSquares.value.length === 1 && highlightedSquares.value[0] === square) {
    return;
  }

  addSquare(square);
}

/**
 * Determines if a chessboard square is currently highlighted.
 *
 * @param square - The move represented by the square.
 * @returns True if the square is highlighted; false otherwise.
 */
function isSquareHighlighted(square: string): boolean {
  return highlightedSquares.value.includes(square);
}

/**
 * Gets the background color for a given chessboard square.
 *
 * @param square - The move represented by the square.
 * @returns 'dark' or 'light', depending on the background color of the square.
 */
function getSquareBackgroundColor(square: string): 'dark' | 'light' {
  const fileNum = square[0].charCodeAt(0);
  const rankNum = parseInt(square[1]);
  return (fileNum + rankNum) % 2 === 0 ? 'dark' : 'light';
}
</script>

<template>
  <div @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" class="board-container">
    <div class="rank" v-for="(rank, i) in BoardArray" :key="i">
      <div
        class="square"
        v-for="square in rank"
        :key="square"
        :class="[getSquareBackgroundColor(square), { highlighted: isSquareHighlighted(square) }]"
        @click="onSquareClick"
        :data-move="square"
        :data-testid="`square-${square}`"
      >
        <div v-if="square.endsWith('1')" class="file-label">{{ square[0] }}</div>
        <div v-if="square.startsWith('a')" class="rank-label">{{ square[1] }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board-container {
  width: 45vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding-right: 32px;

  @media (max-width: 1350px) {
    width: 55vw;
  }

  @media (max-width: 1100px) {
    width: 80vw;
  }

  @media (max-width: 879px) {
    width: calc(100vw - 32px);
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0px;
  }

  .rank {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 12.5%;

    .square {
      width: 12.5%;
      position: relative;
      user-select: none;

      &::before {
        content: '';
        display: block;
        padding-top: 100%;
      }

      &:hover {
        cursor: pointer;
      }

      .file-label,
      .rank-label {
        position: absolute;
        font-weight: 600;
        font-size: 1em;
      }

      .file-label {
        bottom: 2px;
        right: 2px;
      }

      .rank-label {
        top: 2px;
        left: 2px;
      }

      &.dark {
        background-color: var(--dark-square-bg-color);
        color: var(--font-color-dark-square);
      }

      &.light {
        background-color: var(--light-square-bg-color);
        color: var(--font-color-light-square);
      }

      &.dark.highlighted {
        background-color: var(--dark-highlight-square-bg-color);
      }

      &.light.highlighted {
        background-color: var(--light-highlight-square-bg-color);
      }
    }
  }
}
</style>
