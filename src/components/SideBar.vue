<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMoveListStore, type MoveListStore } from '@/stores/moves';

const store = useMoveListStore();
const { moves, isMoveListEmpty, redoStack } = storeToRefs(store) as MoveListStore;
const { resetMoveList, undoMove, redoMove, updateHighlightedSquares } = store;

function handleUndo() {
  undoMove();
  updateHighlightedSquares();
}

function handleRedo() {
  redoMove();
  updateHighlightedSquares();
}
</script>

<template>
  <aside class="sidebar-container">
    <p v-if="isMoveListEmpty" class="sidebar-text">
      Ready to play? <br />
      ✨ Click on a square to get started ✨
    </p>
    <div v-else class="moves-container">
      <div
        v-for="(move, index) in moves"
        :key="index"
        class="move-row"
        :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }"
      >
        <span class="move-number">{{ move.moveNumber }}</span>
        <span class="first-cell">{{ move.firstCell }}</span>
        <span class="second-cell">{{ move.secondCell }}</span>
      </div>
    </div>
    <div v-if="!isMoveListEmpty" class="controls-container">
      <div class="left-controls">
        <button class="button small" @click="handleUndo" :disabled="isMoveListEmpty">&lt;</button>
        <button class="button small" @click="handleRedo" :disabled="redoStack.length === 0">&gt;</button>
      </div>
      <button @click="resetMoveList" class="button" data-testid="reset-button">Reset</button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  width: 32vw;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #262522;
  border-radius: 0.5rem;
  padding-top: 10px;

  @media (max-width: 880px) {
    width: 100vw;
    padding-left: 32px;
    height: 400px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00000099;
    border-radius: 100vw;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.sidebar-text {
  color: #cfcfce;
  font-size: 24px;
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.moves-container {
  display: flex;
  flex-direction: column;
}

.move-row {
  display: flex;
  color: #cfcfce;
  font-size: 16x;
  height: 24px;
  align-items: center;
  padding: 5px 0px;
}

.move-number {
  padding-left: 15px;
  color: #939291;
  width: 30px;
}
.first-cell,
.second-cell {
  font-weight: 600;
  width: 40px;
}

.first-cell {
  margin-right: 30px;
}

.even-row {
  background-color: #262521;
}

.odd-row {
  background-color: #2b2a26;
}

.controls-container {
  width: 90%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-controls {
  display: flex;
  gap: 10px;
}

.button {
  align-items: center;
  background-color: var(--dark-square-bg-color);
  border: 0;
  border-radius: 8px;
  box-shadow: 0 1px 0 0 #537133, 0 7px 9.5px 0.05px rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  justify-content: center;
  overflow: hidden;
  padding: 10px 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.07s;
  white-space: nowrap;

  &.small {
    font-size: 20px;
    padding: 10px 15px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #95bb4a;
  }

  &:active {
    opacity: 0.9;

    &:focus {
      outline: 0;
    }
  }
}
</style>
