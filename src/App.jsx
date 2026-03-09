import React, { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── !! CONFIG — PASTE YOUR SUPABASE KEYS HERE !! ────────────────────────────
const SUPABASE_URL = "https://bsfwnsekxivdcbcijoef.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZnduc2VreGl2ZGNiY2lqb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTc5ODEsImV4cCI6MjA4ODU5Mzk4MX0.N-UlXJErN4Po6pAQrHOdWoJ1dJ4_uJ6vICayTf5e_qQ";
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── DATA ────────────────────────────────────────────────────────────────────

const GEM_COLORS = ["white", "blue", "green", "red", "black"];
const GEM_HEX = { white: "#f5f0e8", blue: "#5b8dd9", green: "#5cb85c", red: "#d9534f", black: "#2c2c2c", gold: "#f0c040" };
const GEM_TEXT = { white: "#555", blue: "#fff", green: "#fff", red: "#fff", black: "#fff", gold: "#333" };

const NOBLES = [
  { id: "n1", points: 3, requires: { white: 4, blue: 4 } },
  { id: "n2", points: 3, requires: { white: 3, blue: 3, black: 3 } },
  { id: "n3", points: 3, requires: { blue: 4, green: 4 } },
  { id: "n4", points: 3, requires: { green: 4, red: 4 } },
  { id: "n5", points: 3, requires: { red: 4, black: 4 } },
  { id: "n6", points: 3, requires: { white: 4, red: 4 } },
  { id: "n7", points: 3, requires: { white: 3, red: 3, green: 3 } },
  { id: "n8", points: 3, requires: { blue: 3, green: 3, red: 3 } },
  { id: "n9", points: 3, requires: { white: 3, black: 3, blue: 3 } },
  { id: "n10", points: 3, requires: { black: 3, green: 3, red: 3 } },
];

const TIER1 = [
  { id: "t1_1", tier: 1, points: 0, bonus: "white", cost: { blue: 1, green: 1, red: 1, black: 1 } },
  { id: "t1_2", tier: 1, points: 0, bonus: "white", cost: { blue: 1, green: 2, red: 1, black: 1 } },
  { id: "t1_3", tier: 1, points: 0, bonus: "white", cost: { black: 2, blue: 1 } },
  { id: "t1_4", tier: 1, points: 0, bonus: "white", cost: { blue: 2, green: 2 } },
  { id: "t1_5", tier: 1, points: 0, bonus: "white", cost: { red: 2, black: 1 } },
  { id: "t1_6", tier: 1, points: 0, bonus: "white", cost: { red: 3 } },
  { id: "t1_7", tier: 1, points: 0, bonus: "white", cost: { green: 2, blue: 3 } },
  { id: "t1_8", tier: 1, points: 1, bonus: "white", cost: { green: 4 } },
  { id: "t1_9", tier: 1, points: 0, bonus: "blue", cost: { white: 1, green: 1, red: 1, black: 1 } },
  { id: "t1_10", tier: 1, points: 0, bonus: "blue", cost: { white: 1, green: 1, red: 2, black: 1 } },
  { id: "t1_11", tier: 1, points: 0, bonus: "blue", cost: { red: 2, white: 1 } },
  { id: "t1_12", tier: 1, points: 0, bonus: "blue", cost: { green: 2, red: 2 } },
  { id: "t1_13", tier: 1, points: 0, bonus: "blue", cost: { white: 2, red: 1 } },
  { id: "t1_14", tier: 1, points: 0, bonus: "blue", cost: { black: 3 } },
  { id: "t1_15", tier: 1, points: 0, bonus: "blue", cost: { white: 2, black: 3 } },
  { id: "t1_16", tier: 1, points: 1, bonus: "blue", cost: { red: 4 } },
  { id: "t1_17", tier: 1, points: 0, bonus: "green", cost: { white: 1, blue: 1, red: 1, black: 1 } },
  { id: "t1_18", tier: 1, points: 0, bonus: "green", cost: { white: 1, blue: 2, red: 1, black: 1 } },
  { id: "t1_19", tier: 1, points: 0, bonus: "green", cost: { white: 2, blue: 1 } },
  { id: "t1_20", tier: 1, points: 0, bonus: "green", cost: { blue: 1, black: 2 } },
  { id: "t1_21", tier: 1, points: 0, bonus: "green", cost: { blue: 2, black: 2 } },
  { id: "t1_22", tier: 1, points: 0, bonus: "green", cost: { blue: 3 } },
  { id: "t1_23", tier: 1, points: 0, bonus: "green", cost: { white: 3, blue: 3 } },
  { id: "t1_24", tier: 1, points: 1, bonus: "green", cost: { black: 4 } },
  { id: "t1_25", tier: 1, points: 0, bonus: "red", cost: { white: 1, blue: 1, green: 1, black: 1 } },
  { id: "t1_26", tier: 1, points: 0, bonus: "red", cost: { white: 2, blue: 1, green: 1, black: 1 } },
  { id: "t1_27", tier: 1, points: 0, bonus: "red", cost: { white: 2, green: 1 } },
  { id: "t1_28", tier: 1, points: 0, bonus: "red", cost: { green: 1, blue: 2 } },
  { id: "t1_29", tier: 1, points: 0, bonus: "red", cost: { blue: 2, green: 1 } },
  { id: "t1_30", tier: 1, points: 0, bonus: "red", cost: { white: 3 } },
  { id: "t1_31", tier: 1, points: 0, bonus: "red", cost: { white: 2, green: 3 } },
  { id: "t1_32", tier: 1, points: 1, bonus: "red", cost: { white: 4 } },
  { id: "t1_33", tier: 1, points: 0, bonus: "black", cost: { white: 1, blue: 1, green: 1, red: 1 } },
  { id: "t1_34", tier: 1, points: 0, bonus: "black", cost: { white: 1, blue: 1, green: 2, red: 1 } },
  { id: "t1_35", tier: 1, points: 0, bonus: "black", cost: { green: 2, red: 1 } },
  { id: "t1_36", tier: 1, points: 0, bonus: "black", cost: { white: 1, red: 2 } },
  { id: "t1_37", tier: 1, points: 0, bonus: "black", cost: { white: 2, red: 2 } },
  { id: "t1_38", tier: 1, points: 0, bonus: "black", cost: { green: 3 } },
  { id: "t1_39", tier: 1, points: 0, bonus: "black", cost: { red: 2, white: 3 } },
  { id: "t1_40", tier: 1, points: 1, bonus: "black", cost: { blue: 4 } },
];

const TIER2 = [
  { id: "t2_1", tier: 2, points: 1, bonus: "white", cost: { green: 2, blue: 3, black: 2 } },
  { id: "t2_2", tier: 2, points: 1, bonus: "white", cost: { green: 3, black: 2, red: 2 } },
  { id: "t2_3", tier: 2, points: 2, bonus: "white", cost: { black: 5 } },
  { id: "t2_4", tier: 2, points: 2, bonus: "white", cost: { blue: 1, green: 4, red: 2 } },
  { id: "t2_5", tier: 2, points: 2, bonus: "white", cost: { blue: 5, green: 3 } },
  { id: "t2_6", tier: 2, points: 3, bonus: "white", cost: { black: 6 } },
  { id: "t2_7", tier: 2, points: 1, bonus: "blue", cost: { white: 3, green: 2, red: 3 } },
  { id: "t2_8", tier: 2, points: 1, bonus: "blue", cost: { white: 3, black: 2, red: 2 } },
  { id: "t2_9", tier: 2, points: 2, bonus: "blue", cost: { white: 5 } },
  { id: "t2_10", tier: 2, points: 2, bonus: "blue", cost: { black: 1, white: 4, red: 2 } },
  { id: "t2_11", tier: 2, points: 2, bonus: "blue", cost: { white: 5, black: 3 } },
  { id: "t2_12", tier: 2, points: 3, bonus: "blue", cost: { white: 6 } },
  { id: "t2_13", tier: 2, points: 1, bonus: "green", cost: { white: 3, blue: 2, black: 3 } },
  { id: "t2_14", tier: 2, points: 1, bonus: "green", cost: { blue: 2, black: 3, red: 2 } },
  { id: "t2_15", tier: 2, points: 2, bonus: "green", cost: { blue: 5 } },
  { id: "t2_16", tier: 2, points: 2, bonus: "green", cost: { blue: 4, black: 2, white: 1 } },
  { id: "t2_17", tier: 2, points: 2, bonus: "green", cost: { green: 5, white: 3 } },
  { id: "t2_18", tier: 2, points: 3, bonus: "green", cost: { red: 6 } },
  { id: "t2_19", tier: 2, points: 1, bonus: "red", cost: { white: 2, blue: 3, green: 3 } },
  { id: "t2_20", tier: 2, points: 1, bonus: "red", cost: { white: 2, green: 3, black: 3 } },
  { id: "t2_21", tier: 2, points: 2, bonus: "red", cost: { green: 5 } },
  { id: "t2_22", tier: 2, points: 2, bonus: "red", cost: { green: 4, white: 2, black: 1 } },
  { id: "t2_23", tier: 2, points: 2, bonus: "red", cost: { red: 5, blue: 3 } },
  { id: "t2_24", tier: 2, points: 3, bonus: "red", cost: { green: 6 } },
  { id: "t2_25", tier: 2, points: 1, bonus: "black", cost: { blue: 2, red: 3, white: 3 } },
  { id: "t2_26", tier: 2, points: 1, bonus: "black", cost: { blue: 3, red: 2, green: 2 } },
  { id: "t2_27", tier: 2, points: 2, bonus: "black", cost: { red: 5 } },
  { id: "t2_28", tier: 2, points: 2, bonus: "black", cost: { red: 4, green: 2, blue: 1 } },
  { id: "t2_29", tier: 2, points: 2, bonus: "black", cost: { black: 5, red: 3 } },
  { id: "t2_30", tier: 2, points: 3, bonus: "black", cost: { blue: 6 } },
];

const TIER3 = [
  { id: "t3_1", tier: 3, points: 3, bonus: "white", cost: { black: 3, red: 3, blue: 5, green: 3 } },
  { id: "t3_2", tier: 3, points: 4, bonus: "white", cost: { black: 7 } },
  { id: "t3_3", tier: 3, points: 4, bonus: "white", cost: { black: 3, red: 6, green: 3 } },
  { id: "t3_4", tier: 3, points: 5, bonus: "white", cost: { black: 7, red: 3 } },
  { id: "t3_5", tier: 3, points: 3, bonus: "blue", cost: { black: 3, white: 3, red: 5, green: 3 } },
  { id: "t3_6", tier: 3, points: 4, bonus: "blue", cost: { white: 7 } },
  { id: "t3_7", tier: 3, points: 4, bonus: "blue", cost: { white: 3, black: 6, red: 3 } },
  { id: "t3_8", tier: 3, points: 5, bonus: "blue", cost: { white: 7, black: 3 } },
  { id: "t3_9", tier: 3, points: 3, bonus: "green", cost: { white: 3, blue: 3, black: 5, red: 3 } },
  { id: "t3_10", tier: 3, points: 4, bonus: "green", cost: { blue: 7 } },
  { id: "t3_11", tier: 3, points: 4, bonus: "green", cost: { blue: 3, white: 6, black: 3 } },
  { id: "t3_12", tier: 3, points: 5, bonus: "green", cost: { blue: 7, white: 3 } },
  { id: "t3_13", tier: 3, points: 3, bonus: "red", cost: { white: 5, blue: 3, black: 3, green: 3 } },
  { id: "t3_14", tier: 3, points: 4, bonus: "red", cost: { green: 7 } },
  { id: "t3_15", tier: 3, points: 4, bonus: "red", cost: { green: 3, blue: 6, white: 3 } },
  { id: "t3_16", tier: 3, points: 5, bonus: "red", cost: { green: 7, blue: 3 } },
  { id: "t3_17", tier: 3, points: 3, bonus: "black", cost: { blue: 5, white: 3, green: 3, red: 3 } },
  { id: "t3_18", tier: 3, points: 4, bonus: "black", cost: { red: 7 } },
  { id: "t3_19", tier: 3, points: 4, bonus: "black", cost: { red: 3, green: 6, blue: 3 } },
  { id: "t3_20", tier: 3, points: 5, bonus: "black", cost: { red: 7, green: 3 } },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function emptyGems() {
  return { white: 0, blue: 0, green: 0, red: 0, black: 0, gold: 0 };
}

function playerBonuses(player) {
  const b = emptyGems();
  for (const card of (player.cards || [])) b[card.bonus] = (b[card.bonus] || 0) + 1;
  return b;
}

function effectiveCost(card, player) {
  const bonus = playerBonuses(player);
  const eff = {};
  for (const [color, amt] of Object.entries(card.cost)) {
    eff[color] = Math.max(0, amt - (bonus[color] || 0));
  }
  return eff;
}

function canAfford(card, player) {
  const eff = effectiveCost(card, player);
  let goldNeeded = 0;
  for (const [color, needed] of Object.entries(eff)) {
    const have = player.gems[color] || 0;
    if (have < needed) goldNeeded += needed - have;
  }
  return goldNeeded <= (player.gems.gold || 0);
}

function totalGems(gems) {
  return Object.values(gems).reduce((a, b) => a + b, 0);
}

function checkNobles(nobles, player) {
  const bonus = playerBonuses(player);
  return (nobles || []).filter(n =>
    Object.entries(n.requires).every(([c, amt]) => (bonus[c] || 0) >= amt)
  );
}

function calcPoints(p) {
  return (p.cards || []).reduce((s, c) => s + c.points, 0) +
    (p.nobles || []).reduce((s, n) => s + n.points, 0);
}

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function initGameState(players) {
  const numPlayers = players.length;
  const nobleCount = numPlayers + 1;
  const nobles = shuffle(NOBLES).slice(0, nobleCount);
  const t1 = shuffle(TIER1);
  const t2 = shuffle(TIER2);
  const t3 = shuffle(TIER3);
  const gemCount = numPlayers === 4 ? 7 : numPlayers === 3 ? 5 : 4;
  const bank = { white: gemCount, blue: gemCount, green: gemCount, red: gemCount, black: gemCount, gold: 5 };

  const gamePlayers = players.map(p => ({
    id: p.id,
    name: p.name,
    gems: emptyGems(),
    cards: [],
    reserved: [],
    nobles: [],
  }));

  return {
    phase: "playing",
    currentPlayer: 0,
    players: gamePlayers,
    bank,
    nobles,
    tier1Board: t1.slice(0, 4),
    tier1Deck: t1.slice(4),
    tier2Board: t2.slice(0, 4),
    tier2Deck: t2.slice(4),
    tier3Board: t3.slice(0, 4),
    tier3Deck: t3.slice(4),
    log: ["Game started! " + players[0].name + "'s turn."],
    lastRound: false,
    lastRoundStarter: null,
    winner: null,
  };
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f7f4ef; font-family: 'Jost', sans-serif; color: #1a1a1a; min-height: 100vh; }

  .app { min-height: 100vh; background: #f7f4ef; padding: 16px; max-width: 1400px; margin: 0 auto; }
  .header { text-align: center; padding: 12px 0 16px; }
  .header h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 300; letter-spacing: 0.15em; }
  .header p { font-size: 0.75rem; font-weight: 300; letter-spacing: 0.2em; color: #888; margin-top: 2px; }

  .lobby { max-width: 440px; margin: 60px auto; background: #fff; border-radius: 16px; padding: 36px; border: 1px solid #e8e3da; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .lobby h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 6px; }
  .lobby-sub { font-size: 0.72rem; color: #aaa; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 28px; }
  .lobby-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: #ccc; font-size: 0.7rem; letter-spacing: 0.1em; }
  .lobby-divider::before, .lobby-divider::after { content: ''; flex: 1; height: 1px; background: #e8e3da; }

  .input-group { margin-bottom: 14px; }
  .input-group label { display: block; font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 6px; font-weight: 500; }
  .input-group input { width: 100%; padding: 10px 14px; border: 1.5px solid #e0dbd2; border-radius: 8px; font-family: 'Jost', sans-serif; font-size: 0.85rem; background: #fdfcfa; outline: none; transition: border 0.15s; letter-spacing: 0.05em; }
  .input-group input:focus { border-color: #1a1a1a; }
  .input-group input.code-input { font-size: 1.1rem; letter-spacing: 0.3em; text-transform: uppercase; text-align: center; font-family: 'Cormorant Garamond', serif; font-weight: 600; }

  .btn { width: 100%; padding: 10px 14px; border: none; border-radius: 8px; font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.15s; margin-top: 6px; }
  .btn-primary { background: #1a1a1a; color: #fff; }
  .btn-primary:hover { background: #333; }
  .btn-primary:disabled { background: #ddd; color: #aaa; cursor: not-allowed; }
  .btn-secondary { background: transparent; color: #555; border: 1px solid #ddd; }
  .btn-secondary:hover { background: #f5f0e8; border-color: #bbb; }
  .btn-danger { background: transparent; color: #d9534f; border: 1px solid #d9534f33; }
  .btn-danger:hover { background: #fff5f5; }

  .waiting-room { max-width: 480px; margin: 60px auto; background: #fff; border-radius: 16px; padding: 36px; border: 1px solid #e8e3da; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .waiting-room h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 300; margin-bottom: 4px; }
  .room-code-display { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; letter-spacing: 0.4em; color: #1a1a1a; text-align: center; padding: 20px 0 8px; }
  .room-code-label { font-size: 0.65rem; letter-spacing: 0.2em; color: #aaa; text-transform: uppercase; text-align: center; margin-bottom: 24px; }
  .player-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0 24px; }
  .player-slot { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; background: #f7f4ef; font-size: 0.8rem; }
  .player-slot.filled { background: #f0f7f0; border: 1px solid #c8e6c9; }
  .player-slot.empty { border: 1.5px dashed #ddd; color: #bbb; font-style: italic; }
  .player-dot { width: 8px; height: 8px; border-radius: 50%; background: #5cb85c; }
  .player-dot.empty-dot { background: #ddd; }
  .you-badge { font-size: 0.58rem; background: #1a1a1a; color: #fff; padding: 1px 6px; border-radius: 10px; letter-spacing: 0.08em; margin-left: 4px; }
  .host-badge { font-size: 0.58rem; background: #d4af37; color: #fff; padding: 1px 6px; border-radius: 10px; letter-spacing: 0.08em; margin-left: 4px; }
  .waiting-note { font-size: 0.7rem; color: #aaa; text-align: center; margin-bottom: 16px; }

  .main-layout { display: grid; grid-template-columns: 1fr 220px; gap: 16px; align-items: start; }
  .section-label { font-size: 0.65rem; letter-spacing: 0.2em; font-weight: 500; color: #aaa; text-transform: uppercase; margin-bottom: 6px; }
  .nobles-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }

  .tier-row { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; }
  .deck-slot { width: 72px; min-width: 72px; height: 96px; border: 1.5px dashed #ccc; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: #999; cursor: pointer; transition: all 0.15s; background: #fff; gap: 4px; }
  .deck-slot:hover { border-color: #888; background: #fafafa; }
  .deck-slot .deck-count { font-size: 0.7rem; font-family: 'Jost', sans-serif; letter-spacing: 0.1em; color: #bbb; }

  .card { width: 88px; min-width: 88px; height: 118px; border-radius: 10px; border: 1.5px solid #e0dbd2; background: #fff; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: all 0.15s; position: relative; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
  .card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: #bbb; }
  .card.can-afford { border-color: #5cb85c; box-shadow: 0 0 0 1.5px #5cb85c; }
  .card.selected-card { border-color: #5b8dd9; box-shadow: 0 0 0 2px #5b8dd9; transform: translateY(-4px); }
  .card.not-my-turn { opacity: 0.6; cursor: default; }
  .card.not-my-turn:hover { transform: none; box-shadow: 0 1px 4px rgba(0,0,0,0.05); border-color: #e0dbd2; }

  .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .card-points { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; line-height: 1; color: #1a1a1a; }
  .card-costs { display: flex; flex-direction: column; gap: 2px; align-items: flex-end; }
  .cost-pip { display: flex; align-items: center; gap: 3px; font-size: 0.65rem; font-weight: 500; }
  .pip-dot { width: 9px; height: 9px; border-radius: 50%; }

  .noble { width: 76px; min-width: 76px; height: 84px; border-radius: 8px; border: 1.5px solid #d4af37; background: linear-gradient(135deg, #fdfaf0, #f5edcc); padding: 7px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .noble-points { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: #b8860b; text-align: right; }
  .noble-req { display: flex; flex-wrap: wrap; gap: 2px; }
  .noble-pip { display: flex; align-items: center; gap: 2px; font-size: 0.6rem; font-weight: 500; color: #555; }

  .side-panel {}
  .bank-section { background: #fff; border: 1px solid #e8e3da; border-radius: 12px; padding: 14px; margin-bottom: 12px; }
  .gem-row { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #f0ece4; }
  .gem-row:last-child { border-bottom: none; }
  .gem-badge { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 2px 6px; border-radius: 6px; transition: background 0.1s; }
  .gem-badge:hover { background: #f5f0e8; }
  .gem-badge.selected-gem { background: #e8f0fd; }
  .gem-badge.disabled { cursor: default; opacity: 0.5; }
  .gem-badge.disabled:hover { background: transparent; }
  .gem-circle { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; border: 1.5px solid rgba(0,0,0,0.08); }
  .gem-name { font-size: 0.72rem; font-weight: 400; color: #555; }
  .gem-count { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #1a1a1a; min-width: 20px; text-align: right; }
  .selected-gems-display { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 8px; min-height: 24px; }
  .sel-gem { padding: 2px 7px; border-radius: 12px; font-size: 0.68rem; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); }

  .action-section { background: #fff; border: 1px solid #e8e3da; border-radius: 12px; padding: 14px; margin-bottom: 12px; }
  .turn-indicator { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; color: #1a1a1a; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f0ece4; }
  .my-turn-badge { display: inline-block; background: #1a1a1a; color: #fff; font-size: 0.6rem; padding: 2px 8px; border-radius: 10px; margin-left: 6px; letter-spacing: 0.1em; }
  .not-my-turn-msg { font-size: 0.68rem; color: #aaa; text-align: center; padding: 10px 0; font-style: italic; }

  .players-section { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
  .player-card { background: #fff; border: 1px solid #e8e3da; border-radius: 12px; padding: 12px; transition: all 0.15s; }
  .player-card.active { border-color: #1a1a1a; box-shadow: 0 0 0 2px #1a1a1a; }
  .player-card.me { background: #fdfcfa; }
  .player-card.winner { border-color: #d4af37; box-shadow: 0 0 0 2px #d4af37; }
  .player-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .player-name { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em; }
  .player-points { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; line-height: 1; }
  .player-points span { font-size: 0.65rem; font-family: 'Jost', sans-serif; color: #aaa; margin-left: 2px; }
  .player-gems { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; }
  .mini-gem { display: flex; align-items: center; gap: 2px; font-size: 0.65rem; font-weight: 500; padding: 1px 5px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); }
  .player-bonuses { display: flex; gap: 3px; flex-wrap: wrap; }
  .bonus-pip { width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); }
  .reserved-section { margin-top: 6px; }
  .reserved-label { font-size: 0.6rem; color: #aaa; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 3px; }
  .reserved-cards { display: flex; gap: 4px; flex-wrap: wrap; }
  .mini-card { padding: 2px 6px; border-radius: 6px; font-size: 0.65rem; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); cursor: pointer; transition: all 0.1s; }
  .mini-card:hover { transform: scale(1.05); }
  .mini-card.can-afford-reserved { border-color: #5cb85c; }

  .log-section { background: #fff; border: 1px solid #e8e3da; border-radius: 12px; padding: 12px; margin-top: 12px; max-height: 100px; overflow-y: auto; }
  .log-entry { font-size: 0.68rem; color: #888; padding: 2px 0; border-bottom: 1px solid #f5f0e8; line-height: 1.4; }
  .log-entry:last-child { border-bottom: none; color: #333; font-weight: 500; }

  .two-gem-warning { font-size: 0.65rem; color: #e67e22; margin-top: 4px; }

  .notification { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #fff; border: 2px solid #d4af37; border-radius: 12px; padding: 12px 24px; z-index: 50; box-shadow: 0 8px 24px rgba(0,0,0,0.15); text-align: center; font-size: 0.82rem; font-weight: 500; animation: slideDown 0.3s ease; white-space: nowrap; }
  @keyframes slideDown { from { transform: translateX(-50%) translateY(-20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(2px); }
  .modal { background: #fff; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
  .modal h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 8px; }
  .modal p { color: #666; font-size: 0.85rem; margin-bottom: 20px; }
  .winner-scores { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .score-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; background: #f7f4ef; font-size: 0.82rem; }
  .score-row.top { background: #fdf6e3; font-weight: 600; }

  .error-msg { font-size: 0.72rem; color: #d9534f; margin-top: 8px; text-align: center; }
  .connecting { text-align: center; padding: 60px 20px; color: #aaa; font-size: 0.8rem; letter-spacing: 0.1em; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
`;

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function GemCircle({ color, size = 20 }) {
  return (
    <div className="gem-circle" style={{
      width: size, height: size,
      background: GEM_HEX[color],
      color: GEM_TEXT[color],
      border: `1.5px solid rgba(0,0,0,${color === 'white' ? 0.15 : 0.08})`
    }}>
      {color === 'gold' ? '★' : color[0].toUpperCase()}
    </div>
  );
}

function CardView({ card, onClick, affordable, isSelected, isMyTurn }) {
  if (!card) return null;
  return (
    <div
      className={`card ${affordable && isMyTurn ? 'can-afford' : ''} ${isSelected ? 'selected-card' : ''} ${!isMyTurn ? 'not-my-turn' : ''}`}
      onClick={onClick}
    >
      <div className="card-top">
        <div className="card-points">{card.points > 0 ? card.points : ''}</div>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: GEM_HEX[card.bonus], color: GEM_TEXT[card.bonus], border: '1.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700 }}>
          {card.bonus[0].toUpperCase()}
        </div>
      </div>
      <div className="card-costs">
        {Object.entries(card.cost).map(([color, amt]) => (
          <div key={color} className="cost-pip">
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#333' }}>{amt}</span>
            <div className="pip-dot" style={{ background: GEM_HEX[color], border: `1px solid rgba(0,0,0,${color === 'white' ? 0.15 : 0.06})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NobleView({ noble }) {
  return (
    <div className="noble">
      <div className="noble-points">{noble.points}</div>
      <div className="noble-req">
        {Object.entries(noble.requires).map(([color, amt]) => (
          <div key={color} className="noble-pip">
            <span style={{ fontWeight: 600, color: '#333' }}>{amt}</span>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GEM_HEX[color], border: '1px solid rgba(0,0,0,0.1)', marginLeft: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOBBY SCREEN ─────────────────────────────────────────────────────────────

function LobbyScreen({ onCreateRoom, onJoinRoom, loading, error }) {
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [mode, setMode] = useState(null); // "create" | "join"

  return (
    <div className="lobby">
      <h2>Splendor</h2>
      <div className="lobby-sub">Online Multiplayer</div>

      {!mode && (
        <>
          <button className="btn btn-primary" onClick={() => setMode("create")}>Create New Game</button>
          <div className="lobby-divider">or</div>
          <button className="btn btn-secondary" onClick={() => setMode("join")}>Join with a Code</button>
        </>
      )}

      {mode === "create" && (
        <>
          <div className="input-group">
            <label>Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" maxLength={20} autoFocus />
          </div>
          <button className="btn btn-primary" disabled={!name.trim() || loading} onClick={() => onCreateRoom(name.trim())}>
            {loading ? "Creating…" : "Create Room"}
          </button>
          <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: 8 }}>Back</button>
        </>
      )}

      {mode === "join" && (
        <>
          <div className="input-group">
            <label>Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" maxLength={20} autoFocus />
          </div>
          <div className="input-group">
            <label>Room Code</label>
            <input className="code-input" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="XXXXXX" maxLength={6} />
          </div>
          <button className="btn btn-primary" disabled={!name.trim() || joinCode.length < 6 || loading} onClick={() => onJoinRoom(name.trim(), joinCode)}>
            {loading ? "Joining…" : "Join Game"}
          </button>
          <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: 8 }}>Back</button>
        </>
      )}

      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}

// ─── WAITING ROOM ─────────────────────────────────────────────────────────────

function WaitingRoom({ room, myPlayerId, onStartGame, onLeave }) {
  const players = room.players || [];
  const isHost = players[0]?.id === myPlayerId;
  const canStart = players.length >= 2 && players.length <= 4;

  return (
    <div className="waiting-room">
      <h2>Game Lobby</h2>
      <div className="room-code-display">{room.code}</div>
      <div className="room-code-label">Share this code with friends</div>

      <div className="section-label">Players ({players.length}/4)</div>
      <div className="player-list">
        {players.map((p, i) => (
          <div key={p.id} className="player-slot filled">
            <div className="player-dot" />
            <span>{p.name}</span>
            {p.id === myPlayerId && <span className="you-badge">YOU</span>}
            {i === 0 && <span className="host-badge">HOST</span>}
          </div>
        ))}
        {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
          <div key={i} className="player-slot empty">
            <div className="player-dot empty-dot" />
            <span>Waiting for player…</span>
          </div>
        ))}
      </div>

      {isHost ? (
        <>
          <div className="waiting-note">{canStart ? "Ready to start!" : "Need at least 2 players to start"}</div>
          <button className="btn btn-primary" disabled={!canStart} onClick={onStartGame}>Start Game</button>
        </>
      ) : (
        <div className="waiting-note">Waiting for host to start the game…</div>
      )}
      <button className="btn btn-danger" onClick={onLeave} style={{ marginTop: 10 }}>Leave Room</button>
    </div>
  );
}

// ─── MAIN GAME ────────────────────────────────────────────────────────────────

function GameBoard({ gameState, myPlayerId, onAction, notification }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedGems, setSelectedGems] = useState(emptyGems());

  const myPlayerIndex = gameState.players.findIndex(p => p.id === myPlayerId);
  const isMyTurn = gameState.currentPlayer === myPlayerIndex;
  const cp = gameState.players[gameState.currentPlayer];
  const me = gameState.players[myPlayerIndex];

  const totalSelected = totalGems(selectedGems);

  const handleSelectGem = (color) => {
    if (!isMyTurn) return;
    if (color === 'gold') return;
    const bankAmt = gameState.bank[color];
    if (bankAmt <= 0) return;
    const alreadySelected = selectedGems[color] || 0;
    const total = totalSelected;

    if (alreadySelected === 1 && total === 1 && bankAmt >= 4) {
      setSelectedGems(g => ({ ...g, [color]: 2 }));
      return;
    }
    if (alreadySelected > 0) {
      setSelectedGems(g => ({ ...g, [color]: alreadySelected - 1 }));
      return;
    }
    const hasDouble = Object.values(selectedGems).some(v => v === 2);
    if (!hasDouble && total < 3) {
      setSelectedGems(g => ({ ...g, [color]: 1 }));
    }
  };

  const handleTakeGems = () => {
    if (totalSelected === 0) return;
    const totalAfter = totalGems(me.gems) + totalSelected;
    if (totalAfter > 10) { alert("Would exceed 10 gems!"); return; }
    onAction({ type: "TAKE_GEMS", gems: selectedGems });
    setSelectedGems(emptyGems());
  };

  const handleBuyCard = (card, fromReserved = false) => {
    if (!isMyTurn) return;
    if (!canAfford(card, me)) return;
    onAction({ type: "BUY_CARD", cardId: card.id, fromReserved });
    setSelectedCard(null);
  };

  const handleReserve = (card, fromDeck = false, tier = null) => {
    if (!isMyTurn) return;
    if (me.reserved.length >= 3) { alert("Can't reserve more than 3 cards."); return; }
    if (fromDeck) {
      onAction({ type: "RESERVE_DECK", tier });
    } else {
      onAction({ type: "RESERVE_CARD", cardId: card.id });
    }
    setSelectedCard(null);
  };

  const validTake = isMyTurn && (
    totalSelected === 3 ||
    (totalSelected === 2 && Object.values(selectedGems).some(v => v === 2)) ||
    (totalSelected === 1 && GEM_COLORS.filter(c => gameState.bank[c] > 0).length === 1)
  );

  const renderTier = (tier) => {
    const board = gameState[`tier${tier}Board`];
    const deck = gameState[`tier${tier}Deck`];
    const labels = { 1: "I", 2: "II", 3: "III" };
    return (
      <div className="tier-row" key={tier}>
        <div className="deck-slot" onClick={() => isMyTurn && handleReserve(null, true, tier)}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>{labels[tier]}</span>
          <span className="deck-count">{deck.length} left</span>
        </div>
        {board.map(card => (
          <CardView
            key={card.id}
            card={card}
            affordable={canAfford(card, me)}
            isSelected={selectedCard?.id === card.id}
            isMyTurn={isMyTurn}
            onClick={() => isMyTurn && setSelectedCard(selectedCard?.id === card.id ? null : card)}
          />
        ))}
        {Array.from({ length: 4 - board.length }).map((_, i) => (
          <div key={i} style={{ width: 88, minWidth: 88, height: 118, border: '1.5px dashed #e0dbd2', borderRadius: 10, background: '#faf9f5' }} />
        ))}
      </div>
    );
  };

  const selectedGemCount = Object.entries(selectedGems).filter(([, v]) => v > 0);

  return (
    <div className="app">
      {notification && <div className="notification">{notification}</div>}

      {gameState.winner && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✦ Game Over ✦</h2>
            <p>The jewel market has a new master</p>
            <div className="winner-scores">
              {[...gameState.players]
                .map(p => ({ name: p.name, points: calcPoints(p), cards: p.cards.length }))
                .sort((a, b) => b.points - a.points || a.cards - b.cards)
                .map((p, i) => (
                  <div key={p.name} className={`score-row ${i === 0 ? 'top' : ''}`}>
                    <span>{i === 0 ? '👑 ' : ''}{p.name}</span>
                    <span>{p.points} pts · {p.cards.length} cards</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <h1>SPLENDOR</h1>
        <p>ONLINE MULTIPLAYER</p>
      </div>

      <div className="main-layout">
        <div className="board-area">
          <div className="section-label">Nobles</div>
          <div className="nobles-row">
            {gameState.nobles.map(n => <NobleView key={n.id} noble={n} />)}
          </div>
          <div className="section-label" style={{ marginTop: 4 }}>Development Cards</div>
          {[3, 2, 1].map(tier => renderTier(tier))}

          <div className="players-section">
            <div className="section-label">Players</div>
            {gameState.players.map((p, i) => {
              const pts = calcPoints(p);
              const bonuses = playerBonuses(p);
              const isMe = p.id === myPlayerId;
              return (
                <div key={p.id} className={`player-card ${i === gameState.currentPlayer ? 'active' : ''} ${isMe ? 'me' : ''}`}>
                  <div className="player-header">
                    <div>
                      <div className="player-name">
                        {p.name}
                        {isMe && <span className="you-badge" style={{ marginLeft: 6 }}>YOU</span>}
                        {i === gameState.currentPlayer && <span style={{ marginLeft: 4 }}>▶</span>}
                      </div>
                      {(p.nobles || []).length > 0 && <div style={{ fontSize: '0.6rem', color: '#b8860b', marginTop: 2 }}>👑 {p.nobles.length} noble{p.nobles.length > 1 ? 's' : ''}</div>}
                    </div>
                    <div className="player-points">{pts}<span>pts</span></div>
                  </div>
                  <div className="player-gems">
                    {[...GEM_COLORS, 'gold'].map(color => {
                      const amt = p.gems[color] || 0;
                      if (amt === 0) return null;
                      return (
                        <div key={color} className="mini-gem" style={{ background: GEM_HEX[color] + '22', borderColor: GEM_HEX[color] + '66', color: color === 'white' ? '#555' : GEM_HEX[color] }}>
                          {amt}{color[0].toUpperCase()}
                        </div>
                      );
                    })}
                  </div>
                  <div className="player-bonuses">
                    {GEM_COLORS.map(color =>
                      Array.from({ length: bonuses[color] || 0 }).map((_, j) => (
                        <div key={`${color}-${j}`} className="bonus-pip" style={{ background: GEM_HEX[color], border: `1px solid rgba(0,0,0,${color === 'white' ? 0.2 : 0.1})` }} />
                      ))
                    )}
                  </div>
                  {(p.reserved || []).length > 0 && (
                    <div className="reserved-section">
                      <div className="reserved-label">Reserved ({p.reserved.length}/3)</div>
                      <div className="reserved-cards">
                        {p.reserved.map(card => (
                          <div
                            key={card.id}
                            className={`mini-card ${isMe && isMyTurn && canAfford(card, me) ? 'can-afford-reserved' : ''}`}
                            style={{ background: GEM_HEX[card.bonus] + '22', borderColor: GEM_HEX[card.bonus] + '88' }}
                            onClick={() => isMe && isMyTurn && canAfford(card, me) && handleBuyCard(card, true)}
                            title={isMe ? "Click to buy if affordable" : ""}
                          >
                            {card.bonus[0].toUpperCase()} {card.points > 0 ? `+${card.points}` : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="side-panel">
          <div className="action-section">
            <div className="turn-indicator">
              {isMyTurn ? (
                <>Your Turn <span className="my-turn-badge">GO</span></>
              ) : (
                <>{cp.name}'s Turn</>
              )}
              {gameState.lastRound && <span style={{ color: '#e67e22', display: 'block', fontSize: '0.6rem', marginTop: 2 }}>⚠ LAST ROUND</span>}
            </div>

            {isMyTurn ? (
              selectedCard ? (
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#555', marginBottom: 8, fontWeight: 500 }}>
                    Selected: {selectedCard.bonus} card ({selectedCard.points} pts)
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#888', marginBottom: 10 }}>
                    Cost: {Object.entries(selectedCard.cost).map(([c, v]) => `${v} ${c}`).join(', ')}
                  </div>
                  <button className="btn btn-primary" disabled={!canAfford(selectedCard, me)} onClick={() => handleBuyCard(selectedCard)}>Buy Card</button>
                  <button className="btn btn-secondary" disabled={me.reserved.length >= 3} onClick={() => handleReserve(selectedCard)} style={{ marginTop: 4 }}>Reserve</button>
                  <button className="btn btn-secondary" onClick={() => setSelectedCard(null)} style={{ marginTop: 4 }}>Cancel</button>
                </div>
              ) : (
                <div style={{ fontSize: '0.68rem', color: '#aaa', textAlign: 'center', padding: '8px 0' }}>
                  Click a card to buy or reserve, or select gems below
                </div>
              )
            ) : (
              <div className="not-my-turn-msg">Waiting for {cp.name}…</div>
            )}
          </div>

          <div className="bank-section">
            <div className="section-label">Bank Gems</div>
            {[...GEM_COLORS, 'gold'].map(color => {
              const bankAmt = gameState.bank[color] || 0;
              const sel = selectedGems[color] || 0;
              return (
                <div key={color} className="gem-row">
                  <div
                    className={`gem-badge ${sel > 0 ? 'selected-gem' : ''} ${!isMyTurn || color === 'gold' ? 'disabled' : ''}`}
                    onClick={() => handleSelectGem(color)}
                  >
                    <GemCircle color={color} size={20} />
                    <span className="gem-name">{color}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {sel > 0 && <span style={{ fontSize: '0.65rem', color: '#5b8dd9', fontWeight: 600 }}>-{sel}</span>}
                    <div className="gem-count">{bankAmt}</div>
                  </div>
                </div>
              );
            })}

            {selectedGemCount.length > 0 && (
              <div className="selected-gems-display">
                {selectedGemCount.map(([color, amt]) => (
                  <div key={color} className="sel-gem" style={{ background: GEM_HEX[color] + '22', borderColor: GEM_HEX[color] + '88', color: color === 'white' ? '#555' : GEM_HEX[color] }}>
                    {amt}× {color[0].toUpperCase()}
                  </div>
                ))}
              </div>
            )}

            <button className="btn btn-primary" disabled={!validTake} onClick={handleTakeGems} style={{ marginTop: 8 }}>
              Take Gems ({totalSelected})
            </button>
            {totalSelected > 0 && !validTake && (
              <div className="two-gem-warning">Take 3 different, or 2 of same (need 4+ in bank)</div>
            )}
          </div>

          <div className="log-section">
            <div className="section-label" style={{ marginBottom: 6 }}>Game Log</div>
            {[...(gameState.log || [])].reverse().map((entry, i) => (
              <div key={i} className="log-entry">{entry}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GAME LOGIC (runs server-side style, only host executes) ──────────────────

function applyAction(state, action, actingPlayerIndex) {
  let g = JSON.parse(JSON.stringify(state)); // deep clone
  const cp = g.players[actingPlayerIndex];
  const addLog = (msg) => { g.log = [...(g.log || []).slice(-30), msg]; };

  if (action.type === "TAKE_GEMS") {
    const { gems } = action;
    for (const [color, amt] of Object.entries(gems)) {
      g.bank[color] -= amt;
      cp.gems[color] = (cp.gems[color] || 0) + amt;
    }
    const colorNames = Object.entries(gems).filter(([, v]) => v > 0).map(([c, v]) => `${v} ${c}`).join(', ');
    addLog(`${cp.name} takes ${colorNames}.`);
  }

  if (action.type === "BUY_CARD" || action.type === "BUY_RESERVED") {
    const fromReserved = action.fromReserved;
    let card;
    if (fromReserved) {
      card = cp.reserved.find(c => c.id === action.cardId);
      cp.reserved = cp.reserved.filter(c => c.id !== action.cardId);
    } else {
      for (const tier of [1, 2, 3]) {
        const found = g[`tier${tier}Board`].find(c => c.id === action.cardId);
        if (found) { card = found; break; }
      }
      if (card) {
        const bk = `tier${card.tier}Board`;
        const dk = `tier${card.tier}Deck`;
        g[bk] = g[bk].filter(c => c.id !== card.id);
        if (g[dk].length > 0) g[bk].push(g[dk].shift());
      }
    }
    if (!card) return g;

    const eff = effectiveCost(card, cp);
    for (const [color, needed] of Object.entries(eff)) {
      const have = cp.gems[color] || 0;
      const use = Math.min(have, needed);
      cp.gems[color] -= use;
      g.bank[color] += use;
      if (use < needed) {
        const extra = needed - use;
        cp.gems.gold -= extra;
        g.bank.gold += extra;
      }
    }
    cp.cards = [...(cp.cards || []), card];
    addLog(`${cp.name} buys a ${card.bonus} card (${card.points}pts).`);
  }

  if (action.type === "RESERVE_CARD" || action.type === "RESERVE_DECK") {
    let card;
    if (action.type === "RESERVE_DECK") {
      const dk = `tier${action.tier}Deck`;
      if (g[dk].length === 0) return g;
      card = g[dk][0];
      g[dk] = g[dk].slice(1);
    } else {
      for (const tier of [1, 2, 3]) {
        const found = g[`tier${tier}Board`].find(c => c.id === action.cardId);
        if (found) { card = found; break; }
      }
      if (card) {
        const bk = `tier${card.tier}Board`;
        const dk = `tier${card.tier}Deck`;
        g[bk] = g[bk].filter(c => c.id !== card.id);
        if (g[dk].length > 0) g[bk].push(g[dk].shift());
      }
    }
    if (!card) return g;
    if (g.bank.gold > 0 && totalGems(cp.gems) < 10) {
      cp.gems.gold = (cp.gems.gold || 0) + 1;
      g.bank.gold -= 1;
    }
    cp.reserved = [...(cp.reserved || []), card];
    addLog(`${cp.name} reserves a ${card.bonus} card.`);
  }

  // Noble check
  const eligible = checkNobles(g.nobles, cp);
  if (eligible.length > 0) {
    const noble = eligible[0];
    g.nobles = g.nobles.filter(n => n.id !== noble.id);
    cp.nobles = [...(cp.nobles || []), noble];
    addLog(`${cp.name} receives a Noble (${noble.points}pts)!`);
  }

  // Win check
  const pts = calcPoints(cp);
  if (pts >= 15 && !g.lastRound) {
    g.lastRound = true;
    g.lastRoundStarter = actingPlayerIndex;
    addLog(`${cp.name} hit 15+ points! Last round begins.`);
  }

  // Advance turn
  const next = (actingPlayerIndex + 1) % g.players.length;
  if (g.lastRound && next === g.lastRoundStarter) {
    const scores = g.players.map(p => ({ name: p.name, points: calcPoints(p), cards: (p.cards || []).length }));
    const maxPts = Math.max(...scores.map(s => s.points));
    const tied = scores.filter(s => s.points === maxPts).sort((a, b) => a.cards - b.cards);
    g.winner = tied[0].name;
    addLog(`Game over! ${g.winner} wins with ${tied[0].points} points!`);
  } else {
    g.currentPlayer = next;
    addLog(`${g.players[next].name}'s turn.`);
  }

  return g;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("lobby"); // lobby | waiting | game
  const [room, setRoom] = useState(null);
  const [myPlayerId] = useState(() => "player_" + Math.random().toString(36).slice(2, 10));
  const [myName, setMyName] = useState("");
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const channelRef = useRef(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const subscribeToRoom = useCallback((roomCode) => {
    if (channelRef.current) channelRef.current.unsubscribe();
    const channel = supabase
      .channel(`room:${roomCode}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'splendor_rooms', filter: `code=eq.${roomCode}` }, (payload) => {
        const newRoom = payload.new;
        setRoom(newRoom);
        if (newRoom.game_state) {
          const gs = typeof newRoom.game_state === 'string' ? JSON.parse(newRoom.game_state) : newRoom.game_state;
          setGameState(prev => {
            // Show noble notification if new noble was added
            if (prev && gs.log && prev.log && gs.log.length > prev.log.length) {
              const newLogs = gs.log.slice(prev.log.length);
              newLogs.forEach(l => { if (l.includes('Noble')) notify('👑 ' + l); });
            }
            return gs;
          });
          if (newRoom.status === 'playing') setScreen('game');
        }
        if (newRoom.status === 'waiting') setScreen('waiting');
      })
      .subscribe();
    channelRef.current = channel;
  }, []);

  const handleCreateRoom = async (name) => {
    setLoading(true); setError(null);
    try {
      const code = generateRoomCode();
      const players = [{ id: myPlayerId, name }];
      const { error: err } = await supabase.from('splendor_rooms').insert({
        code,
        status: 'waiting',
        players,
        game_state: null,
        host_id: myPlayerId,
      });
      if (err) throw err;
      setMyName(name);
      setRoom({ code, players, status: 'waiting', host_id: myPlayerId });
      setScreen('waiting');
      subscribeToRoom(code);
    } catch (e) {
      setError("Failed to create room: " + e.message);
    }
    setLoading(false);
  };

  const handleJoinRoom = async (name, code) => {
    setLoading(true); setError(null);
    try {
      const { data, error: err } = await supabase.from('splendor_rooms').select('*').eq('code', code).single();
      if (err || !data) throw new Error("Room not found");
      if (data.status !== 'waiting') throw new Error("Game already started");
      if ((data.players || []).length >= 4) throw new Error("Room is full");

      const newPlayers = [...(data.players || []), { id: myPlayerId, name }];
      const { error: updateErr } = await supabase.from('splendor_rooms').update({ players: newPlayers }).eq('code', code);
      if (updateErr) throw updateErr;

      setMyName(name);
      setRoom({ ...data, players: newPlayers });
      setScreen('waiting');
      subscribeToRoom(code);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleStartGame = async () => {
    const gs = initGameState(room.players);
    await supabase.from('splendor_rooms').update({ status: 'playing', game_state: gs }).eq('code', room.code);
  };

  const handleAction = async (action) => {
    if (!gameState || !room) return;
    const myIndex = gameState.players.findIndex(p => p.id === myPlayerId);
    if (gameState.currentPlayer !== myIndex) return;
    const newState = applyAction(gameState, action, myIndex);
    await supabase.from('splendor_rooms').update({ game_state: newState }).eq('code', room.code);
  };

  const handleLeave = async () => {
    if (channelRef.current) channelRef.current.unsubscribe();
    if (room) {
      const remaining = (room.players || []).filter(p => p.id !== myPlayerId);
      if (remaining.length === 0) {
        await supabase.from('splendor_rooms').delete().eq('code', room.code);
      } else {
        await supabase.from('splendor_rooms').update({ players: remaining }).eq('code', room.code);
      }
    }
    setRoom(null); setGameState(null); setScreen('lobby');
  };

  return (
    <>
      <style>{styles}</style>
      {screen === 'lobby' && (
        <div className="app">
          <div className="header">
            <h1>SPLENDOR</h1>
            <p>ONLINE MULTIPLAYER</p>
          </div>
          <LobbyScreen onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} loading={loading} error={error} />
        </div>
      )}
      {screen === 'waiting' && room && (
        <div className="app">
          <div className="header">
            <h1>SPLENDOR</h1>
            <p>ONLINE MULTIPLAYER</p>
          </div>
          <WaitingRoom room={room} myPlayerId={myPlayerId} onStartGame={handleStartGame} onLeave={handleLeave} />
        </div>
      )}
      {screen === 'game' && gameState && (
        <GameBoard gameState={gameState} myPlayerId={myPlayerId} onAction={handleAction} notification={notification} />
      )}
    </>
  );
}
