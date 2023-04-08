import { ref, computed, type Ref } from 'vue';
import type { ComputedRef } from 'vue';
import { defineStore } from 'pinia';

/**
 * Represents a formatted chess move.
 */
interface FormattedMove {
  moveNumber: string; // The move number (e.g. "1.").
  firstCell: string; // The first cell of the move (e.g. "a2").
  secondCell: string; // The second cell of the move (e.g. "a4").
}

/**
 * Describes the interface for the move list store.
 */
export interface MoveListStore {
  isMoveListEmpty: ComputedRef<boolean>; // Indicates if the move list is empty.
  moves: ComputedRef<FormattedMove[]>; // Stores the formatted moves.
  highlightedSquares: Ref<string[]>; // Contains the highlighted squares.
  updateHighlightedSquares: () => void; // Updates the highlighted squares.
  addSquare: (move: string) => void; // Adds a move to the move list.
  resetMoveList: () => void; // Resets the move list.
  undoMove: () => void; // Undoes the last move.
  redoMove: () => void; // Redoes the last undone move.
  undoStack: Ref<FormattedMove[]>; // Stores the moves in the undo stack.
  redoStack: Ref<FormattedMove[]>; // Stores the moves in the redo stack.
}

/**
 * Creates a new move list store.
 * @returns The move list store instance.
 */
export const useMoveListStore = defineStore('movelist', (): MoveListStore => {
  const moveHistory = ref<{ firstCell: string; secondCell: string }[]>([]); // An array of move pairs.
  const undoStack = ref<FormattedMove[]>([]);
  const redoStack = ref<FormattedMove[]>([]);
  const highlightedSquares = ref<string[]>([]);

  const isMoveListEmpty = computed<boolean>(() => {
    return moveHistory.value.length === 0;
  });

  const moves = computed<FormattedMove[]>(() => {
    const formattedMoves: FormattedMove[] = moveHistory.value.map((movePair, index) => {
      return {
        moveNumber: `${index + 1}.`, // The move number is the index plus one (e.g. "1.").
        firstCell: movePair.firstCell, // The first cell of the move.
        secondCell: movePair.secondCell || '', // The second cell of the move or an empty string.
      };
    });
    return formattedMoves; // Computes an array of formatted moves.
  });

  /**
   * Adds a square to the move list and updates the highlighted squares.
   * @param cell - The cell to add to the move list.
   */
  function addSquare(cell: string) {
    if (redoStack.value.length > 0) {
      redoStack.value = []; // Clears the redo stack if there are moves in it.
    }

    const lastMovePair = moveHistory.value[moveHistory.value.length - 1];

    if (lastMovePair && !lastMovePair.secondCell) {
      lastMovePair.secondCell = cell; // Adds the cell to the last move pair if it doesn't have a second cell.
    } else {
      moveHistory.value.push({ firstCell: cell, secondCell: '' }); // Adds a new move pair to the move history.
    }
    updateHighlightedSquares();
  }

  /**
   * Undoes the last move.
   *
   * If the last move pair has both cells, it removes the second cell and adds the move pair to the redo stack.
   * If the last move pair has only the first cell, it removes the move pair from the move history
   * and adds it to both the undo stack and the redo stack.
   */
  function undoMove() {
    if (moveHistory.value.length > 0) {
      const lastMovePair = moveHistory.value[moveHistory.value.length - 1];

      if (lastMovePair.secondCell) {
        redoStack.value.push({
          moveNumber: `${moveHistory.value.length}.`,
          firstCell: lastMovePair.firstCell,
          secondCell: lastMovePair.secondCell,
        });
        lastMovePair.secondCell = '';
      } else {
        const removedMovePair = moveHistory.value.pop();

        if (removedMovePair) {
          undoStack.value.push({
            moveNumber: `${moveHistory.value.length + 1}.`,
            firstCell: removedMovePair.firstCell,
            secondCell: '',
          });
          redoStack.value.push({
            moveNumber: `${moveHistory.value.length + 1}.`,
            firstCell: removedMovePair.firstCell,
            secondCell: '',
          });
        }
      }
    }
  }

  /**
   * Redoes the last undone move.
   *
   * If the last move pair in the move history has only the first cell,
   * it adds the second cell from the last undone move.
   * Otherwise, it adds the last undone move to the move history.
   * In both cases, it also adds the last undone move to the undo stack.
   */
  function redoMove() {
    if (redoStack.value.length > 0) {
      const lastUndoneMove = redoStack.value.pop();

      if (lastUndoneMove) {
        const lastMovePair = moveHistory.value[moveHistory.value.length - 1];

        if (lastMovePair && !lastMovePair.secondCell) {
          lastMovePair.secondCell = lastUndoneMove.secondCell;
        } else {
          moveHistory.value.push({
            firstCell: lastUndoneMove.firstCell,
            secondCell: lastUndoneMove.secondCell,
          });
        }

        undoStack.value.push({
          moveNumber: `${moveHistory.value.length}.`,
          firstCell: lastUndoneMove.firstCell,
          secondCell: lastUndoneMove.secondCell,
        });
      }
    }
  }

  /**
   * Updates the highlighted squares based on the current state of the move list.
   *
   * @remarks
   * This function updates the `highlightedSquares` ref according to the following rules:
   * - If the last move in the move list has only a `firstCell`, then only the `firstCell` is highlighted.
   * - If the last move in the move list has both a `firstCell` and a `secondCell`, then both cells are highlighted.
   * - If there are no moves in the move list, no squares are highlighted.
   */
  function updateHighlightedSquares() {
    highlightedSquares.value = [];
    if (moves.value.length > 0) {
      const lastMove = moves.value[moves.value.length - 1];
      const { firstCell, secondCell } = lastMove;

      if (firstCell && !secondCell) {
        highlightedSquares.value.push(firstCell);
      } else if (firstCell && secondCell) {
        highlightedSquares.value.push(firstCell);
        highlightedSquares.value.push(secondCell);
      }
    }
  }

  /**
   * Reset the state of the application.
   */
  function resetMoveList() {
    moveHistory.value = [];
    undoStack.value = [];
    redoStack.value = [];
    highlightedSquares.value = [];
  }

  return {
    isMoveListEmpty,
    moves,
    highlightedSquares,
    updateHighlightedSquares,
    addSquare,
    resetMoveList,
    undoMove,
    redoMove,
    undoStack,
    redoStack,
  };
});
