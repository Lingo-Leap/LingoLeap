// ==============================
// Importing Redux Toolkit and Actions
// ==============================
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  addCoins,
  decrementCoins,
  decrementEnergy,
  decrementLives,
  incrementEnergy,
  incrementLives,
  resetExtraLives,
  resetTime,
  setExtraLives,
  setTime,
} from "../actions/gameActions";

// ==============================
// Type Definitions
// ==============================
interface ExtraLives {
  current: number;
  max: number;
  timer: string;
}

interface GameState {
  lives: number;
  maxLives: number;
  energy: number;
  maxEnergy: number;
  coins: number;
  extraLives: ExtraLives;
  time: number;
}

// ==============================
// Initial State
// ==============================
const initialState: GameState = {
  lives: 5,
  maxLives: 5,
  energy: 6,
  maxEnergy: 10,
  coins: 1000,
  extraLives: {
    current: 5,
    max: 5,
    timer: "00:00",
  },
  time: 0,
};

// ==============================
// Reducer Definition
// ==============================
const gameReducer = createReducer(initialState, (builder) => {
  builder
    // Lives reducers
    .addCase(decrementLives, (state) => {
      if (state.lives > 0) {
        state.lives -= 1;
      }
    })
    .addCase(incrementLives, (state) => {
      if (state.lives < state.maxLives) {
        state.lives += 1;
      }
    })

    // Timer reducers
    .addCase(setTime, (state) => {
      state.time += 1;
    })
    .addCase(resetTime, (state) => {
      state.time = 0;
    })

    // Energy reducers
    .addCase(decrementEnergy, (state) => {
      if (state.energy > 0) {
        state.energy -= 1;
      }
    })
    .addCase(incrementEnergy, (state) => {
      if (state.energy < state.maxEnergy) {
        state.energy += 1;
      }
    })

    // Coins reducers
    .addCase(addCoins, (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    })
    .addCase(decrementCoins, (state, action: PayloadAction<number>) => {
      if (state.coins >= action.payload) {
        state.coins -= action.payload;
      }
    })

    // Extra Lives reducers
    .addCase(
      setExtraLives,
      (state, action: PayloadAction<{ current: number; timer: string }>) => {
        state.extraLives.current = action.payload.current;
        state.extraLives.timer = action.payload.timer;
      }
    )
    .addCase(resetExtraLives, (state) => {
      state.extraLives.current = state.extraLives.max;
      state.extraLives.timer = "00:00";
    });
});

// ==============================
// Export Reducer
// ==============================
export default gameReducer;
