// ==============================
// Importing Redux Toolkit
// ==============================
import { createAction } from "@reduxjs/toolkit";

// ==============================
// Game Actions
// ==============================

// Lives actions
export const decrementLives = createAction("game/decrementLives");
export const incrementLives = createAction("game/incrementLives");

// Timer actions
export const setTime = createAction("game/setTime");
export const resetTime = createAction("game/resetTime");

// Energy actions
export const decrementEnergy = createAction("game/decrementEnergy");
export const incrementEnergy = createAction("game/incrementEnergy");

// Coins actions
export const addCoins = createAction<number>("game/addCoins");
export const decrementCoins = createAction<number>("game/decrementCoins");

// Extra Lives actions
export const setExtraLives = createAction<{
  current: number;
  timer: string;
}>("game/setExtraLives");
export const resetExtraLives = createAction("game/resetExtraLives");
