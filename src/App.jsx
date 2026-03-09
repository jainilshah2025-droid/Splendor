import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── PASTE YOUR KEYS HERE ─────────────────────────────────────────────────────
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const POLL_INTERVAL = 3000;

const GEM_COLORS = ["white", "blue", "green", "red", "black"];
const GEM_HEX = { white: "#f0ece3", blue: "#5b8dd9", green: "#5cb85c", red: "#d9534f", black: "#2c2c2c", gold: "#f0c040" };
const GEM_TEXT = { white: "#555", blue: "#fff", green: "#fff", red: "#fff", black: "#fff", gold: "#333" };

const NOBLES = [
  { id:"n1",points:3,requires:{white:4,blue:4}},
  { id:"n2",points:3,requires:{white:3,blue:3,black:3}},
  { id:"n3",points:3,requires:{blue:4,green:4}},
  { id:"n4",points:3,requires:{green:4,red:4}},
  { id:"n5",points:3,requires:{red:4,black:4}},
  { id:"n6",points:3,requires:{white:4,red:4}},
  { id:"n7",points:3,requires:{white:3,red:3,green:3}},
  { id:"n8",points:3,requires:{blue:3,green:3,red:3}},
  { id:"n9",points:3,requires:{white:3,black:3,blue:3}},
  { id:"n10",points:3,requires:{black:3,green:3,red:3}},
];

const TIER1 = [
  {id:"t1_1",tier:1,points:0,bonus:"white",cost:{blue:1,green:1,red:1,black:1}},
  {id:"t1_2",tier:1,points:0,bonus:"white",cost:{blue:1,green:2,red:1,black:1}},
  {id:"t1_3",tier:1,points:0,bonus:"white",cost:{black:2,blue:1}},
  {id:"t1_4",tier:1,points:0,bonus:"white",cost:{blue:2,green:2}},
  {id:"t1_5",tier:1,points:0,bonus:"white",cost:{red:2,black:1}},
  {id:"t1_6",tier:1,points:0,bonus:"white",cost:{red:3}},
  {id:"t1_7",tier:1,points:0,bonus:"white",cost:{green:2,blue:3}},
  {id:"t1_8",tier:1,points:1,bonus:"white",cost:{green:4}},
  {id:"t1_9",tier:1,points:0,bonus:"blue",cost:{white:1,green:1,red:1,black:1}},
  {id:"t1_10",tier:1,points:0,bonus:"blue",cost:{white:1,green:1,red:2,black:1}},
  {id:"t1_11",tier:1,points:0,bonus:"blue",cost:{red:2,white:1}},
  {id:"t1_12",tier:1,points:0,bonus:"blue",cost:{green:2,red:2}},
  {id:"t1_13",tier:1,points:0,bonus:"blue",cost:{white:2,red:1}},
  {id:"t1_14",tier:1,points:0,bonus:"blue",cost:{black:3}},
  {id:"t1_15",tier:1,points:0,bonus:"blue",cost:{white:2,black:3}},
  {id:"t1_16",tier:1,points:1,bonus:"blue",cost:{red:4}},
  {id:"t1_17",tier:1,points:0,bonus:"green",cost:{white:1,blue:1,red:1,black:1}},
  {id:"t1_18",tier:1,points:0,bonus:"green",cost:{white:1,blue:2,red:1,black:1}},
  {id:"t1_19",tier:1,points:0,bonus:"green",cost:{white:2,blue:1}},
  {id:"t1_20",tier:1,points:0,bonus:"green",cost:{blue:1,black:2}},
  {id:"t1_21",tier:1,points:0,bonus:"green",cost:{blue:2,black:2}},
  {id:"t1_22",tier:1,points:0,bonus:"green",cost:{blue:3}},
  {id:"t1_23",tier:1,points:0,bonus:"green",cost:{white:3,blue:3}},
  {id:"t1_24",tier:1,points:1,bonus:"green",cost:{black:4}},
  {id:"t1_25",tier:1,points:0,bonus:"red",cost:{white:1,blue:1,green:1,black:1}},
  {id:"t1_26",tier:1,points:0,bonus:"red",cost:{white:2,blue:1,green:1,black:1}},
  {id:"t1_27",tier:1,points:0,bonus:"red",cost:{white:2,green:1}},
  {id:"t1_28",tier:1,points:0,bonus:"red",cost:{green:1,blue:2}},
  {id:"t1_29",tier:1,points:0,bonus:"red",cost:{blue:2,green:1}},
  {id:"t1_30",tier:1,points:0,bonus:"red",cost:{white:3}},
  {id:"t1_31",tier:1,points:0,bonus:"red",cost:{white:2,green:3}},
  {id:"t1_32",tier:1,points:1,bonus:"red",cost:{white:4}},
  {id:"t1_33",tier:1,points:0,bonus:"black",cost:{white:1,blue:1,green:1,red:1}},
  {id:"t1_34",tier:1,points:0,bonus:"black",cost:{white:1,blue:1,green:2,red:1}},
  {id:"t1_35",tier:1,points:0,bonus:"black",cost:{green:2,red:1}},
  {id:"t1_36",tier:1,points:0,bonus:"black",cost:{white:1,red:2}},
  {id:"t1_37",tier:1,points:0,bonus:"black",cost:{white:2,red:2}},
  {id:"t1_38",tier:1,points:0,bonus:"black",cost:{green:3}},
  {id:"t1_39",tier:1,points:0,bonus:"black",cost:{red:2,white:3}},
  {id:"t1_40",tier:1,points:1,bonus:"black",cost:{blue:4}},
];

const TIER2 = [
  {id:"t2_1",tier:2,points:1,bonus:"white",cost:{green:2,blue:3,black:2}},
  {id:"t2_2",tier:2,points:1,bonus:"white",cost:{green:3,black:2,red:2}},
  {id:"t2_3",tier:2,points:2,bonus:"white",cost:{black:5}},
  {id:"t2_4",tier:2,points:2,bonus:"white",cost:{blue:1,green:4,red:2}},
  {id:"t2_5",tier:2,points:2,bonus:"white",cost:{blue:5,green:3}},
  {id:"t2_6",tier:2,points:3,bonus:"white",cost:{black:6}},
  {id:"t2_7",tier:2,points:1,bonus:"blue",cost:{white:3,green:2,red:3}},
  {id:"t2_8",tier:2,points:1,bonus:"blue",cost:{white:3,black:2,red:2}},
  {id:"t2_9",tier:2,points:2,bonus:"blue",cost:{white:5}},
  {id:"t2_10",tier:2,points:2,bonus:"blue",cost:{black:1,white:4,red:2}},
  {id:"t2_11",tier:2,points:2,bonus:"blue",cost:{white:5,black:3}},
  {id:"t2_12",tier:2,points:3,bonus:"blue",cost:{white:6}},
  {id:"t2_13",tier:2,points:1,bonus:"green",cost:{white:3,blue:2,black:3}},
  {id:"t2_14",tier:2,points:1,bonus:"green",cost:{blue:2,black:3,red:2}},
  {id:"t2_15",tier:2,points:2,bonus:"green",cost:{blue:5}},
  {id:"t2_16",tier:2,points:2,bonus:"green",cost:{blue:4,black:2,white:1}},
  {id:"t2_17",tier:2,points:2,bonus:"green",cost:{green:5,white:3}},
  {id:"t2_18",tier:2,points:3,bonus:"green",cost:{red:6}},
  {id:"t2_19",tier:2,points:1,bonus:"red",cost:{white:2,blue:3,green:3}},
  {id:"t2_20",tier:2,points:1,bonus:"red",cost:{white:2,green:3,black:3}},
  {id:"t2_21",tier:2,points:2,bonus:"red",cost:{green:5}},
  {id:"t2_22",tier:2,points:2,bonus:"red",cost:{green:4,white:2,black:1}},
  {id:"t2_23",tier:2,points:2,bonus:"red",cost:{red:5,blue:3}},
  {id:"t2_24",tier:2,points:3,bonus:"red",cost:{green:6}},
  {id:"t2_25",tier:2,points:1,bonus:"black",cost:{blue:2,red:3,white:3}},
  {id:"t2_26",tier:2,points:1,bonus:"black",cost:{blue:3,red:2,green:2}},
  {id:"t2_27",tier:2,points:2,bonus:"black",cost:{red:5}},
  {id:"t2_28",tier:2,points:2,bonus:"black",cost:{red:4,green:2,blue:1}},
  {id:"t2_29",tier:2,points:2,bonus:"black",cost:{black:5,red:3}},
  {id:"t2_30",tier:2,points:3,bonus:"black",cost:{blue:6}},
];

const TIER3 = [
  {id:"t3_1",tier:3,points:3,bonus:"white",cost:{black:3,red:3,blue:5,green:3}},
  {id:"t3_2",tier:3,points:4,bonus:"white",cost:{black:7}},
  {id:"t3_3",tier:3,points:4,bonus:"white",cost:{black:3,red:6,green:3}},
  {id:"t3_4",tier:3,points:5,bonus:"white",cost:{black:7,red:3}},
  {id:"t3_5",tier:3,points:3,bonus:"blue",cost:{black:3,white:3,red:5,green:3}},
  {id:"t3_6",tier:3,points:4,bonus:"blue",cost:{white:7}},
  {id:"t3_7",tier:3,points:4,bonus:"blue",cost:{white:3,black:6,red:3}},
  {id:"t3_8",tier:3,points:5,bonus:"blue",cost:{white:7,black:3}},
  {id:"t3_9",tier:3,points:3,bonus:"green",cost:{white:3,blue:3,black:5,red:3}},
  {id:"t3_10",tier:3,points:4,bonus:"green",cost:{blue:7}},
  {id:"t3_11",tier:3,points:4,bonus:"green",cost:{blue:3,white:6,black:3}},
  {id:"t3_12",tier:3,points:5,bonus:"green",cost:{blue:7,white:3}},
  {id:"t3_13",tier:3,points:3,bonus:"red",cost:{white:5,blue:3,black:3,green:3}},
  {id:"t3_14",tier:3,points:4,bonus:"red",cost:{green:7}},
  {id:"t3_15",tier:3,points:4,bonus:"red",cost:{green:3,blue:6,white:3}},
  {id:"t3_16",tier:3,points:5,bonus:"red",cost:{green:7,blue:3}},
  {id:"t3_17",tier:3,points:3,bonus:"black",cost:{blue:5,white:3,green:3,red:3}},
  {id:"t3_18",tier:3,points:4,bonus:"black",cost:{red:7}},
  {id:"t3_19",tier:3,points:4,bonus:"black",cost:{red:3,green:6,blue:3}},
  {id:"t3_20",tier:3,points:5,bonus:"black",cost:{red:7,green:3}},
];

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function emptyGems(){return{white:0,blue:0,green:0,red:0,black:0,gold:0};}
function totalGems(g){return Object.values(g).reduce((a,b)=>a+b,0);}
function playerBonuses(p){const b=emptyGems();for(const c of(p.cards||[]))b[c.bonus]=(b[c.bonus]||0)+1;return b;}
function effectiveCost(card,player){const bonus=playerBonuses(player);const eff={};for(const[c,v]of Object.entries(card.cost))eff[c]=Math.max(0,v-(bonus[c]||0));return eff;}
function canAfford(card,player){const eff=effectiveCost(card,player);let gold=0;for(const[c,n]of Object.entries(eff)){const h=player.gems[c]||0;if(h<n)gold+=n-h;}return gold<=(player.gems.gold||0);}
function checkNobles(nobles,player){const b=playerBonuses(player);return(nobles||[]).filter(n=>Object.entries(n.requires).every(([c,v])=>(b[c]||0)>=v));}
function calcPoints(p){return(p.cards||[]).reduce((s,c)=>s+c.points,0)+(p.nobles||[]).reduce((s,n)=>s+n.points,0);}
function generateCode(){return Math.random().toString(36).substring(2,8).toUpperCase();}

function initGameState(players){
  const n=players.length;
  const nobles=shuffle(NOBLES).slice(0,n+1);
  const t1=shuffle(TIER1),t2=shuffle(TIER2),t3=shuffle(TIER3);
  const gc=n===4?7:n===3?5:4;
  return{
    phase:"playing",currentPlayer:0,
    players:players.map(p=>({id:p.id,name:p.name,gems:emptyGems(),cards:[],reserved:[],nobles:[]})),
    bank:{white:gc,blue:gc,green:gc,red:gc,black:gc,gold:5},
    nobles,
    tier1Board:t1.slice(0,4),tier1Deck:t1.slice(4),
    tier2Board:t2.slice(0,4),tier2Deck:t2.slice(4),
    tier3Board:t3.slice(0,4),tier3Deck:t3.slice(4),
    log:["Game started! "+players[0].name+"'s turn."],
    lastRound:false,lastRoundStarter:null,winner:null,
  };
}

function applyAction(state,action,idx){
  const g=JSON.parse(JSON.stringify(state));
  const cp=g.players[idx];
  const log=(m)=>{g.log=[...(g.log||[]).slice(-30),m];};

  if(action.type==="TAKE_GEMS"){
    for(const[c,v]of Object.entries(action.gems)){if(v>0){g.bank[c]-=v;cp.gems[c]=(cp.gems[c]||0)+v;}}
    const names=Object.entries(action.gems).filter(([,v])=>v>0).map(([c,v])=>`${v} ${c}`).join(", ");
    log(`${cp.name} takes ${names}.`);
  }

  if(action.type==="BUY_CARD"){
    let card;
    if(action.fromReserved){
      card=(cp.reserved||[]).find(c=>c.id===action.cardId);
      cp.reserved=cp.reserved.filter(c=>c.id!==action.cardId);
    } else {
      for(const t of[1,2,3]){
        card=g[`tier${t}Board`].find(c=>c.id===action.cardId);
        if(card){
          g[`tier${t}Board`]=g[`tier${t}Board`].filter(c=>c.id!==card.id);
          if(g[`tier${t}Deck`].length>0)g[`tier${t}Board`].push(g[`tier${t}Deck`].shift());
          break;
        }
      }
    }
    if(!card)return g;
    const eff=effectiveCost(card,cp);
    for(const[c,n]of Object.entries(eff)){
      const use=Math.min(cp.gems[c]||0,n);
      cp.gems[c]-=use;g.bank[c]+=use;
      const extra=n-use;
      if(extra>0){cp.gems.gold-=extra;g.bank.gold+=extra;}
    }
    cp.cards=[...(cp.cards||[]),card];
    log(`${cp.name} buys a ${card.bonus} card (${card.points}pts).`);
  }

  if(action.type==="RESERVE_CARD"){
    let card;
    if(action.fromDeck){
      const dk=`tier${action.tier}Deck`;
      if(!g[dk].length)return g;
      card=g[dk][0];g[dk]=g[dk].slice(1);
    } else {
      for(const t of[1,2,3]){
        card=g[`tier${t}Board`].find(c=>c.id===action.cardId);
        if(card){
          g[`tier${t}Board`]=g[`tier${t}Board`].filter(c=>c.id!==card.id);
          if(g[`tier${t}Deck`].length>0)g[`tier${t}Board`].push(g[`tier${t}Deck`].shift());
          break;
        }
      }
    }
    if(!card)return g;
    if(g.bank.gold>0&&totalGems(cp.gems)<10){cp.gems.gold=(cp.gems.gold||0)+1;g.bank.gold--;}
    cp.reserved=[...(cp.reserved||[]),card];
    log(`${cp.name} reserves a ${card.bonus} card.`);
  }

  const eligible=checkNobles(g.nobles,cp);
  if(eligible.length>0){
    const noble=eligible[0];
    g.nobles=g.nobles.filter(n=>n.id!==noble.id);
    cp.nobles=[...(cp.nobles||[]),noble];
    log(`👑 ${cp.name} receives a Noble (+${noble.points}pts)!`);
  }

  const pts=calcPoints(cp);
  if(pts>=15&&!g.lastRound){g.lastRound=true;g.lastRoundStarter=idx;log(`${cp.name} hit 15+ points! Last round begins.`);}

  const next=(idx+1)%g.players.length;
  if(g.lastRound&&next===g.lastRoundStarter){
    const sorted=[...g.players].map(p=>({name:p.name,pts:calcPoints(p),cards:(p.cards||[]).length})).sort((a,b)=>b.pts-a.pts||a.cards-b.cards);
    g.winner=sorted[0].name;
    log(`🏆 Game over! ${g.winner} wins with ${sorted[0].pts} points!`);
  } else {
    g.currentPlayer=next;
    log(`${g.players[next].name}'s turn.`);
  }
  return g;
}

const css=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#f7f4ef;font-family:'Jost',sans-serif;color:#1a1a1a;min-height:100vh;}
  .wrap{max-width:1400px;margin:0 auto;padding:16px;}
  .header{text-align:center;padding:14px 0 18px;}
  .header h1{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:300;letter-spacing:.18em;}
  .header p{font-size:.7rem;letter-spacing:.22em;color:#aaa;margin-top:2px;}
  .card-box{background:#fff;border:1px solid #e4dfd6;border-radius:14px;padding:32px;box-shadow:0 2px 16px rgba(0,0,0,.05);}
  .lobby-wrap{max-width:420px;margin:40px auto;}
  .lobby-wrap h2{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:300;margin-bottom:4px;}
  .sub{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#bbb;margin-bottom:26px;}
  .divider{display:flex;align-items:center;gap:10px;color:#ccc;font-size:.68rem;letter-spacing:.1em;margin:16px 0;}
  .divider::before,.divider::after{content:'';flex:1;height:1px;background:#e4dfd6;}
  .field{margin-bottom:14px;}
  .field label{display:block;font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:#999;margin-bottom:5px;font-weight:500;}
  .field input{width:100%;padding:10px 13px;border:1.5px solid #ddd;border-radius:8px;font-family:'Jost',sans-serif;font-size:.85rem;background:#111111;outline:none;transition:border .15s;}
  .field input:focus{border-color:#1a1a1a;}
  .field input.code{font-size:1.2rem;letter-spacing:.35em;text-transform:uppercase;text-align:center;font-family:'Cormorant Garamond',serif;font-weight:600;}
  .btn{display:block;width:100%;padding:10px 14px;border:none;border-radius:8px;font-family:'Jost',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .15s;margin-top:8px;text-align:center;}
  .btn-dark{background:#1a1a1a;color:#fff;}
  .btn-dark:hover{background:#333;}
  .btn-dark:disabled{background:#ddd;color:#aaa;cursor:not-allowed;}
  .btn-outline{background:transparent;color:#555;border:1px solid #ddd;}
  .btn-outline:hover{background:#f5f0e8;}
  .btn-red{background:transparent;color:#c0392b;border:1px solid #f5c6c6;}
  .btn-red:hover{background:#fff5f5;}
  .err{font-size:.7rem;color:#c0392b;margin-top:10px;text-align:center;}
  .wait-wrap{max-width:460px;margin:40px auto;}
  .big-code{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:600;letter-spacing:.45em;text-align:center;padding:18px 0 4px;color:#1a1a1a;}
  .code-hint{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:#bbb;text-align:center;margin-bottom:22px;}
  .p-list{display:flex;flex-direction:column;gap:7px;margin:12px 0 20px;}
  .p-slot{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:8px;font-size:.8rem;}
  .p-slot.filled{background:#f0f7f0;border:1px solid #c8e6c9;}
  .p-slot.empty{border:1.5px dashed #ddd;color:#bbb;font-style:italic;}
  .dot{width:8px;height:8px;border-radius:50%;background:#5cb85c;flex-shrink:0;}
  .dot.off{background:#ddd;}
  .badge{font-size:.55rem;background:#1a1a1a;color:#fff;padding:1px 6px;border-radius:10px;margin-left:4px;letter-spacing:.06em;}
  .badge.gold{background:#c9a227;}
  .sync-note{font-size:.65rem;color:#bbb;text-align:center;margin-bottom:8px;}
  .game-layout{display:grid;grid-template-columns:1fr 216px;gap:14px;align-items:start;}
  .sec-label{font-size:.62rem;letter-spacing:.2em;font-weight:500;color:#bbb;text-transform:uppercase;margin-bottom:5px;}
  .nobles-row{display:flex;gap:7px;margin-bottom:10px;flex-wrap:wrap;}
  .tier-row{display:flex;gap:7px;margin-bottom:8px;align-items:center;}
  .deck-btn{width:70px;min-width:70px;height:100px;border:1.5px dashed #ccc;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#fff;cursor:pointer;transition:all .15s;}
  .deck-btn:hover{border-color:#999;background:#fafaf8;}
  .deck-tier{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:#aaa;}
  .deck-count{font-size:.62rem;letter-spacing:.1em;color:#ccc;}
  .card{width:86px;min-width:86px;height:114px;border-radius:10px;border:1.5px solid #e0dbd2;background:#fff;padding:7px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:all .15s;box-shadow:0 1px 4px rgba(0,0,0,.04);}
  .card:hover{transform:translateY(-3px);box-shadow:0 5px 14px rgba(0,0,0,.09);border-color:#bbb;}
  .card.afford{border-color:#5cb85c;box-shadow:0 0 0 1.5px #5cb85c;}
  .card.picked{border-color:#5b8dd9;box-shadow:0 0 0 2px #5b8dd9;transform:translateY(-4px);}
  .card.locked{opacity:.55;cursor:default;pointer-events:none;}
  .card-top{display:flex;justify-content:space-between;align-items:flex-start;}
  .card-pts{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;line-height:1;}
  .card-bonus-dot{width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.55rem;font-weight:700;border:1.5px solid rgba(0,0,0,.09);}
  .card-costs{display:flex;flex-direction:column;gap:2px;align-items:flex-end;}
  .cost-row{display:flex;align-items:center;gap:3px;font-size:.64rem;font-weight:600;color:#333;}
  .cost-dot{width:8px;height:8px;border-radius:50%;}
  .noble{width:74px;min-width:74px;height:82px;border-radius:8px;border:1.5px solid #d4af37;background:linear-gradient(135deg,#fdfaf0,#f5edcc);padding:6px;display:flex;flex-direction:column;justify-content:space-between;}
  .noble-pts{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:#b8860b;text-align:right;}
  .noble-reqs{display:flex;flex-wrap:wrap;gap:2px;}
  .noble-req{display:flex;align-items:center;gap:2px;font-size:.58rem;font-weight:600;color:#555;}
  .panel{background:#fff;border:1px solid #e4dfd6;border-radius:12px;padding:13px;margin-bottom:10px;}
  .turn-head{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;font-weight:500;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #f0ece4;display:flex;align-items:center;gap:6px;}
  .go-badge{background:#1a1a1a;color:#fff;font-size:.58rem;padding:2px 7px;border-radius:10px;letter-spacing:.08em;}
  .wait-msg{font-size:.68rem;color:#aaa;text-align:center;padding:8px 0;font-style:italic;}
  .gem-row{display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f5f0e8;}
  .gem-row:last-child{border-bottom:none;}
  .gem-pill{display:flex;align-items:center;gap:6px;padding:2px 6px;border-radius:6px;cursor:pointer;transition:background .1s;}
  .gem-pill:hover{background:#f5f0e8;}
  .gem-pill.sel{background:#e8f0fd;}
  .gem-pill.dis{opacity:.45;cursor:default;pointer-events:none;}
  .gem-circle{width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:700;}
  .gem-name{font-size:.7rem;color:#555;}
  .gem-amt{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;min-width:18px;text-align:right;}
  .sel-display{display:flex;gap:4px;flex-wrap:wrap;margin-top:7px;min-height:22px;}
  .sel-chip{padding:2px 7px;border-radius:12px;font-size:.65rem;font-weight:500;border:1px solid rgba(0,0,0,.1);}
  .gem-warn{font-size:.62rem;color:#e67e22;margin-top:4px;}
  .players-grid{display:flex;flex-direction:column;gap:9px;margin-top:14px;}
  .p-card{background:#fff;border:1px solid #e4dfd6;border-radius:11px;padding:11px;transition:all .15s;}
  .p-card.active{border-color:#1a1a1a;box-shadow:0 0 0 2px #1a1a1a;}
  .p-card.me{background:#fdfcfa;}
  .p-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px;}
  .p-name{font-size:.76rem;font-weight:500;letter-spacing:.06em;}
  .p-pts{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;line-height:1;}
  .p-pts span{font-size:.62rem;font-family:'Jost',sans-serif;color:#aaa;margin-left:1px;}
  .p-gems{display:flex;gap:3px;flex-wrap:wrap;margin-bottom:5px;}
  .mini-gem{font-size:.62rem;font-weight:500;padding:1px 5px;border-radius:9px;border:1px solid rgba(0,0,0,.08);}
  .p-bonuses{display:flex;gap:3px;flex-wrap:wrap;}
  .b-pip{width:9px;height:9px;border-radius:50%;border:1px solid rgba(0,0,0,.09);}
  .res-section{margin-top:6px;}
  .res-label{font-size:.58rem;color:#bbb;letter-spacing:.14em;text-transform:uppercase;margin-bottom:3px;}
  .res-cards{display:flex;gap:4px;flex-wrap:wrap;}
  .mini-card{padding:2px 6px;border-radius:6px;font-size:.62rem;font-weight:500;border:1px solid rgba(0,0,0,.1);cursor:pointer;transition:all .1s;}
  .mini-card:hover{transform:scale(1.06);}
  .mini-card.can{border-color:#5cb85c;}
  .log-box{max-height:95px;overflow-y:auto;}
  .log-line{font-size:.66rem;color:#999;padding:2px 0;border-bottom:1px solid #f5f0e8;line-height:1.4;}
  .log-line:last-child{border-bottom:none;color:#333;font-weight:500;}
  .toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:#fff;border:2px solid #d4af37;border-radius:11px;padding:10px 22px;z-index:200;box-shadow:0 8px 24px rgba(0,0,0,.13);font-size:.8rem;font-weight:500;white-space:nowrap;animation:td .3s ease;}
  @keyframes td{from{transform:translateX(-50%) translateY(-16px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:300;backdrop-filter:blur(2px);}
  .modal{background:#fff;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2);}
  .modal h2{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;letter-spacing:.1em;margin-bottom:6px;}
  .modal p{color:#888;font-size:.82rem;margin-bottom:18px;}
  .score-list{display:flex;flex-direction:column;gap:7px;margin-bottom:22px;}
  .score-row{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-radius:8px;background:#f7f4ef;font-size:.8rem;}
  .score-row.top{background:#fdf6e3;font-weight:600;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}
`;

function GemDot({color,size=19}){
  return <div className="gem-circle" style={{width:size,height:size,background:GEM_HEX[color],color:GEM_TEXT[color],border:`1.5px solid rgba(0,0,0,${color==='white'?.15:.07})`}}>{color==='gold'?'★':color[0].toUpperCase()}</div>;
}

function CardComp({card,onClick,affordable,picked,locked}){
  return(
    <div className={`card ${affordable&&!locked?'afford':''} ${picked?'picked':''} ${locked?'locked':''}`} onClick={locked?undefined:onClick}>
      <div className="card-top">
        <div className="card-pts">{card.points>0?card.points:''}</div>
        <div className="card-bonus-dot" style={{background:GEM_HEX[card.bonus],color:GEM_TEXT[card.bonus]}}>{card.bonus[0].toUpperCase()}</div>
      </div>
      <div className="card-costs">
        {Object.entries(card.cost).map(([c,v])=>(
          <div key={c} className="cost-row">{v}<div className="cost-dot" style={{background:GEM_HEX[c],border:`1px solid rgba(0,0,0,${c==='white'?.15:.06})`}}/></div>
        ))}
      </div>
    </div>
  );
}

function NobleComp({noble}){
  return(
    <div className="noble">
      <div className="noble-pts">{noble.points}</div>
      <div className="noble-reqs">
        {Object.entries(noble.requires).map(([c,v])=>(
          <div key={c} className="noble-req">{v}<div style={{width:7,height:7,borderRadius:'50%',background:GEM_HEX[c],border:'1px solid rgba(0,0,0,.1)',marginLeft:1}}/></div>
        ))}
      </div>
    </div>
  );
}

function Lobby({onCreate,onJoin,loading,error}){
  const[name,setName]=useState("");
  const[code,setCode]=useState("");
  const[mode,setMode]=useState(null);
  return(
    <div className="lobby-wrap"><div className="card-box">
      <h2>Splendor</h2><div className="sub">Online Multiplayer</div>
      {!mode&&<><button className="btn btn-dark" onClick={()=>setMode("create")}>Create New Game</button><div className="divider">or</div><button className="btn btn-outline" onClick={()=>setMode("join")}>Join with a Code</button></>}
      {mode==="create"&&<>
        <div className="field"><label>Your Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" maxLength={18} autoFocus/></div>
        <button className="btn btn-dark" disabled={!name.trim()||loading} onClick={()=>onCreate(name.trim())}>{loading?"Creating…":"Create Room"}</button>
        <button className="btn btn-outline" onClick={()=>setMode(null)}>Back</button>
      </>}
      {mode==="join"&&<>
        <div className="field"><label>Your Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" maxLength={18} autoFocus/></div>
        <div className="field"><label>Room Code</label><input className="code" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="XXXXXX" maxLength={6}/></div>
        <button className="btn btn-dark" disabled={!name.trim()||code.length<6||loading} onClick={()=>onJoin(name.trim(),code)}>{loading?"Joining…":"Join Room"}</button>
        <button className="btn btn-outline" onClick={()=>setMode(null)}>Back</button>
      </>}
      {error&&<div className="err">{error}</div>}
    </div></div>
  );
}

function WaitingRoom({room,myId,onStart,onLeave}){
  const players=room.players||[];
  const isHost=players[0]?.id===myId;
  return(
    <div className="wait-wrap"><div className="card-box">
      <h2>Game Lobby</h2>
      <div className="big-code">{room.code}</div>
      <div className="code-hint">Share this code with friends to join</div>
      <div className="sec-label">Players ({players.length}/4)</div>
      <div className="p-list">
        {players.map((p,i)=>(
          <div key={p.id} className="p-slot filled">
            <div className="dot"/>{p.name}
            {p.id===myId&&<span className="badge">YOU</span>}
            {i===0&&<span className="badge gold">HOST</span>}
          </div>
        ))}
        {Array.from({length:Math.max(0,4-players.length)}).map((_,i)=>(
          <div key={i} className="p-slot empty"><div className="dot off"/>Waiting for player…</div>
        ))}
      </div>
      <div className="sync-note">🔄 Refreshes every 3 seconds automatically</div>
      {isHost
        ?<button className="btn btn-dark" disabled={players.length<2} onClick={onStart}>{players.length<2?"Need at least 2 players":`Start Game (${players.length} players)`}</button>
        :<div style={{fontSize:'.72rem',color:'#aaa',textAlign:'center',margin:'10px 0'}}>Waiting for host to start…</div>
      }
      <button className="btn btn-red" onClick={onLeave}>Leave Room</button>
    </div></div>
  );
}

function GameBoard({gs,myId,onAction,toast}){
  const[pickedCard,setPickedCard]=useState(null);
  const[selGems,setSelGems]=useState(emptyGems());
  const myIdx=gs.players.findIndex(p=>p.id===myId);
  const isMyTurn=gs.currentPlayer===myIdx;
  const me=gs.players[myIdx]||gs.players[0];
  const cp=gs.players[gs.currentPlayer];
  const totalSel=totalGems(selGems);

  const handleGem=(color)=>{
    if(!isMyTurn||color==='gold')return;
    const bank=gs.bank[color];if(!bank)return;
    const already=selGems[color]||0;
    if(already===1&&totalSel===1&&bank>=4){setSelGems(g=>({...g,[color]:2}));return;}
    if(already>0){setSelGems(g=>({...g,[color]:already-1}));return;}
    const hasDouble=Object.values(selGems).some(v=>v===2);
    if(!hasDouble&&totalSel<3)setSelGems(g=>({...g,[color]:1}));
  };

  const validTake=isMyTurn&&(totalSel===3||(totalSel===2&&Object.values(selGems).some(v=>v===2))||(totalSel===1&&GEM_COLORS.filter(c=>gs.bank[c]>0).length===1));

  const doTakeGems=()=>{
    if(!validTake)return;
    if(totalGems(me.gems)+totalSel>10){alert("Would exceed 10 gems!");return;}
    onAction({type:"TAKE_GEMS",gems:selGems});
    setSelGems(emptyGems());
  };

  const doBuy=(card,fromReserved=false)=>{
    if(!isMyTurn||!canAfford(card,me))return;
    onAction({type:"BUY_CARD",cardId:card.id,fromReserved});
    setPickedCard(null);
  };

  const doReserve=(card=null,fromDeck=false,tier=null)=>{
    if(!isMyTurn||(me.reserved||[]).length>=3)return;
    onAction({type:"RESERVE_CARD",cardId:card?.id,fromDeck,tier});
    setPickedCard(null);
  };

  const renderTier=(tier)=>{
    const board=gs[`tier${tier}Board`];
    const deck=gs[`tier${tier}Deck`];
    const labels={1:'I',2:'II',3:'III'};
    return(
      <div className="tier-row" key={tier}>
        <div className="deck-btn" onClick={()=>doReserve(null,true,tier)}>
          <span className="deck-tier">{labels[tier]}</span>
          <span className="deck-count">{deck.length} left</span>
        </div>
        {board.map(card=>(
          <CardComp key={card.id} card={card} affordable={canAfford(card,me)} picked={pickedCard?.id===card.id} locked={!isMyTurn}
            onClick={()=>setPickedCard(pickedCard?.id===card.id?null:card)}/>
        ))}
        {Array.from({length:4-board.length}).map((_,i)=>(
          <div key={i} style={{width:86,minWidth:86,height:114,border:'1.5px dashed #e0dbd2',borderRadius:10,background:'#faf9f5'}}/>
        ))}
      </div>
    );
  };

  return(
    <div className="wrap">
      {toast&&<div className="toast">{toast}</div>}
      {gs.winner&&(
        <div className="overlay"><div className="modal">
          <h2>✦ Game Over ✦</h2><p>The jewel market has a new master</p>
          <div className="score-list">
            {[...gs.players].map(p=>({name:p.name,pts:calcPoints(p),cards:(p.cards||[]).length}))
              .sort((a,b)=>b.pts-a.pts||a.cards-b.cards)
              .map((p,i)=>(
                <div key={p.name} className={`score-row ${i===0?'top':''}`}>
                  <span>{i===0?'👑 ':''}{p.name}</span>
                  <span>{p.pts} pts · {p.cards} cards</span>
                </div>
              ))}
          </div>
        </div></div>
      )}
      <div className="header"><h1>SPLENDOR</h1><p>ONLINE MULTIPLAYER</p></div>
      <div className="game-layout">
        <div>
          <div className="sec-label">Nobles</div>
          <div className="nobles-row">{gs.nobles.map(n=><NobleComp key={n.id} noble={n}/>)}</div>
          <div className="sec-label" style={{marginTop:6}}>Development Cards</div>
          {[3,2,1].map(t=>renderTier(t))}
          <div className="players-grid">
            <div className="sec-label">Players</div>
            {gs.players.map((p,i)=>{
              const pts=calcPoints(p);
              const bonuses=playerBonuses(p);
              const isMe=p.id===myId;
              return(
                <div key={p.id} className={`p-card ${i===gs.currentPlayer?'active':''} ${isMe?'me':''}`}>
                  <div className="p-header">
                    <div>
                      <div className="p-name">{p.name}{isMe&&<span className="badge" style={{marginLeft:5}}>YOU</span>}{i===gs.currentPlayer&&<span style={{marginLeft:4}}>▶</span>}</div>
                      {(p.nobles||[]).length>0&&<div style={{fontSize:'.58rem',color:'#b8860b',marginTop:1}}>👑 {p.nobles.length} noble{p.nobles.length>1?'s':''}</div>}
                    </div>
                    <div className="p-pts">{pts}<span>pts</span></div>
                  </div>
                  <div className="p-gems">
                    {[...GEM_COLORS,'gold'].map(c=>{const amt=p.gems[c]||0;if(!amt)return null;return<div key={c} className="mini-gem" style={{background:GEM_HEX[c]+'22',borderColor:GEM_HEX[c]+'77',color:c==='white'?'#555':GEM_HEX[c]}}>{amt}{c[0].toUpperCase()}</div>;})}
                  </div>
                  <div className="p-bonuses">
                    {GEM_COLORS.map(c=>Array.from({length:bonuses[c]||0}).map((_,j)=><div key={`${c}-${j}`} className="b-pip" style={{background:GEM_HEX[c]}}/>))}
                  </div>
                  {(p.reserved||[]).length>0&&(
                    <div className="res-section">
                      <div className="res-label">Reserved ({p.reserved.length}/3)</div>
                      <div className="res-cards">
                        {p.reserved.map(card=>(
                          <div key={card.id} className={`mini-card ${isMe&&isMyTurn&&canAfford(card,me)?'can':''}`}
                            style={{background:GEM_HEX[card.bonus]+'22',borderColor:GEM_HEX[card.bonus]+'88'}}
                            onClick={()=>isMe&&isMyTurn&&doBuy(card,true)}>
                            {card.bonus[0].toUpperCase()} {card.points>0?`+${card.points}`:''}
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
        <div>
          <div className="panel">
            <div className="turn-head">
              {isMyTurn?<>Your Turn <span className="go-badge">GO</span></>:<>{cp.name}'s Turn</>}
              {gs.lastRound&&<span style={{color:'#e67e22',fontSize:'.58rem',marginLeft:'auto'}}>⚠ LAST ROUND</span>}
            </div>
            {isMyTurn?(
              pickedCard?(
                <div>
                  <div style={{fontSize:'.66rem',color:'#555',marginBottom:6,fontWeight:500}}>{pickedCard.bonus} card · {pickedCard.points}pts</div>
                  <div style={{fontSize:'.6rem',color:'#aaa',marginBottom:10}}>{Object.entries(pickedCard.cost).map(([c,v])=>`${v} ${c}`).join(', ')}</div>
                  <button className="btn btn-dark" disabled={!canAfford(pickedCard,me)} onClick={()=>doBuy(pickedCard)}>Buy Card</button>
                  <button className="btn btn-outline" disabled={(me.reserved||[]).length>=3} onClick={()=>doReserve(pickedCard)} style={{marginTop:4}}>Reserve</button>
                  <button className="btn btn-outline" onClick={()=>setPickedCard(null)} style={{marginTop:4}}>Cancel</button>
                </div>
              ):(
                <div style={{fontSize:'.66rem',color:'#bbb',textAlign:'center',padding:'8px 0'}}>Click a card to buy or reserve, or take gems below</div>
              )
            ):(
              <div className="wait-msg">Waiting for {cp.name}…</div>
            )}
          </div>
          <div className="panel">
            <div className="sec-label">Bank</div>
            {[...GEM_COLORS,'gold'].map(color=>{
              const bankAmt=gs.bank[color]||0;
              const sel=selGems[color]||0;
              return(
                <div key={color} className="gem-row">
                  <div className={`gem-pill ${sel>0?'sel':''} ${!isMyTurn||color==='gold'?'dis':''}`} onClick={()=>handleGem(color)}>
                    <GemDot color={color} size={19}/><span className="gem-name">{color}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    {sel>0&&<span style={{fontSize:'.62rem',color:'#5b8dd9',fontWeight:600}}>-{sel}</span>}
                    <div className="gem-amt">{bankAmt}</div>
                  </div>
                </div>
              );
            })}
            {Object.entries(selGems).filter(([,v])=>v>0).length>0&&(
              <div className="sel-display">
                {Object.entries(selGems).filter(([,v])=>v>0).map(([c,v])=>(
                  <div key={c} className="sel-chip" style={{background:GEM_HEX[c]+'22',borderColor:GEM_HEX[c]+'88',color:c==='white'?'#555':GEM_HEX[c]}}>{v}×{c[0].toUpperCase()}</div>
                ))}
              </div>
            )}
            <button className="btn btn-dark" disabled={!validTake} onClick={doTakeGems} style={{marginTop:8}}>Take Gems ({totalSel})</button>
            {totalSel>0&&!validTake&&<div className="gem-warn">Take 3 different, or 2 of same (needs 4+ in bank)</div>}
          </div>
          {(me.reserved||[]).length>0&&(
            <div className="panel">
              <div className="sec-label" style={{marginBottom:8}}>My Reserved ({me.reserved.length}/3)</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {me.reserved.map(card=>{
                  const affordable=canAfford(card,me);
                  const eff=effectiveCost(card,me);
                  const bonuses=playerBonuses(me);
                  return(
                    <div key={card.id} style={{border:`1.5px solid ${affordable?'#5cb85c':'#e0dbd2'}`,borderRadius:9,padding:'8px 10px',background:affordable?'#f0faf0':'#fdfcfa'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                        <div style={{display:'flex',alignItems:'center',gap:5}}>
                          <div style={{width:16,height:16,borderRadius:'50%',background:GEM_HEX[card.bonus],color:GEM_TEXT[card.bonus],display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.5rem',fontWeight:700}}>{card.bonus[0].toUpperCase()}</div>
                          <span style={{fontSize:'.68rem',fontWeight:500,color:'#555',textTransform:'capitalize'}}>{card.bonus}</span>
                        </div>
                        {card.points>0&&<span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.1rem',fontWeight:600,color:'#1a1a1a'}}>{card.points}pts</span>}
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:3,marginBottom:7}}>
                        {Object.entries(card.cost).map(([c,v])=>{
                          const bon=bonuses[c]||0;
                          const need=eff[c]||0;
                          return(
                            <div key={c} style={{display:'flex',alignItems:'center',gap:2,background:GEM_HEX[c]+'22',border:`1px solid ${GEM_HEX[c]}66`,borderRadius:6,padding:'1px 5px',fontSize:'.62rem',fontWeight:600,color:c==='white'?'#555':GEM_HEX[c]}}>
                              <span style={{textDecoration:need===0?'line-through':'none',opacity:need===0?.5:1}}>{v}</span>
                              <div style={{width:6,height:6,borderRadius:'50%',background:GEM_HEX[c],marginLeft:1}}/>
                              {bon>0&&need>0&&<span style={{fontSize:'.55rem',color:'#5cb85c'}}>-{bon}</span>}
                            </div>
                          );
                        })}
                      </div>
                      {isMyTurn
                        ?<button className="btn btn-dark" disabled={!affordable} onClick={()=>doBuy(card,true)} style={{padding:'5px 10px',fontSize:'.63rem',marginTop:0}}>
                            {affordable?'Buy Now':'Need more gems'}
                          </button>
                        :<div style={{fontSize:'.6rem',color:'#bbb',textAlign:'center',padding:'2px 0'}}>Not your turn</div>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="panel">
            <div className="sec-label" style={{marginBottom:6}}>Game Log</div>
            <div className="log-box">
              {[...(gs.log||[])].reverse().map((line,i)=><div key={i} className="log-line">{line}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[screen,setScreen]=useState("lobby");
  const[room,setRoom]=useState(null);
  const[gs,setGs]=useState(null);
  const[myId]=useState(()=>"p_"+Math.random().toString(36).slice(2,10));
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const[toast,setToast]=useState(null);
  const pollRef=useRef(null);
  const codeRef=useRef(null);

  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),3000);};

  const poll=async()=>{
    if(!codeRef.current)return;
    try{
      const{data}=await supabase.from('splendor_rooms').select('*').eq('code',codeRef.current).single();
      if(!data)return;
      setRoom(data);
      if(data.game_state){
        const newGs=typeof data.game_state==='string'?JSON.parse(data.game_state):data.game_state;
        setGs(prev=>{
          if(prev&&newGs.log&&prev.log&&newGs.log.length>prev.log.length){
            newGs.log.slice(prev.log.length).forEach(l=>{if(l.includes('Noble')||l.includes('wins')||l.includes('🏆'))showToast(l);});
          }
          return newGs;
        });
      }
      if(data.status==='playing')setScreen('game');
      if(data.status==='waiting')setScreen('waiting');
    }catch(e){console.error('Poll error',e);}
  };

  const startPolling=(code)=>{
    codeRef.current=code;
    if(pollRef.current)clearInterval(pollRef.current);
    poll(); // immediate first fetch
    pollRef.current=setInterval(poll,POLL_INTERVAL);
  };

  const stopPolling=()=>{
    if(pollRef.current){clearInterval(pollRef.current);pollRef.current=null;}
    codeRef.current=null;
  };

  useEffect(()=>()=>stopPolling(),[]);

  const handleCreate=async(name)=>{
    setLoading(true);setError(null);
    try{
      const code=generateCode();
      const players=[{id:myId,name}];
      const{error:e}=await supabase.from('splendor_rooms').insert({code,status:'waiting',players,game_state:null,host_id:myId});
      if(e)throw e;
      setRoom({code,players,status:'waiting',host_id:myId});
      setScreen('waiting');
      startPolling(code);
    }catch(e){setError("Failed to create room: "+e.message);}
    setLoading(false);
  };

  const handleJoin=async(name,code)=>{
    setLoading(true);setError(null);
    try{
      const{data,error:e}=await supabase.from('splendor_rooms').select('*').eq('code',code).single();
      if(e||!data)throw new Error("Room not found. Check the code.");
      if(data.status!=='waiting')throw new Error("Game already started.");
      if((data.players||[]).length>=4)throw new Error("Room is full (max 4 players).");
      const alreadyIn=(data.players||[]).find(p=>p.id===myId);
      const newPlayers=alreadyIn?data.players:[...(data.players||[]),{id:myId,name}];
      if(!alreadyIn){
        const{error:ue}=await supabase.from('splendor_rooms').update({players:newPlayers}).eq('code',code);
        if(ue)throw ue;
      }
      setRoom({...data,players:newPlayers});
      setScreen('waiting');
      startPolling(code);
    }catch(e){setError(e.message);}
    setLoading(false);
  };

  const handleStart=async()=>{
    const newGs=initGameState(room.players);
    await supabase.from('splendor_rooms').update({status:'playing',game_state:newGs}).eq('code',room.code);
  };

  const handleAction=async(action)=>{
    if(!gs||!room)return;
    const myIdx=gs.players.findIndex(p=>p.id===myId);
    if(gs.currentPlayer!==myIdx)return;
    const newGs=applyAction(gs,action,myIdx);
    setGs(newGs);
    await supabase.from('splendor_rooms').update({game_state:newGs}).eq('code',room.code);
  };

  const handleLeave=async()=>{
    stopPolling();
    if(room){
      const remaining=(room.players||[]).filter(p=>p.id!==myId);
      if(remaining.length===0){await supabase.from('splendor_rooms').delete().eq('code',room.code);}
      else{await supabase.from('splendor_rooms').update({players:remaining}).eq('code',room.code);}
    }
    setRoom(null);setGs(null);setScreen('lobby');
  };

  return(
    <>
      <style>{css}</style>
      {screen==='lobby'&&<div className="wrap"><div className="header"><h1>SPLENDOR</h1><p>ONLINE MULTIPLAYER</p></div><Lobby onCreate={handleCreate} onJoin={handleJoin} loading={loading} error={error}/></div>}
      {screen==='waiting'&&room&&<div className="wrap"><div className="header"><h1>SPLENDOR</h1><p>ONLINE MULTIPLAYER</p></div><WaitingRoom room={room} myId={myId} onStart={handleStart} onLeave={handleLeave}/></div>}
      {screen==='game'&&gs&&<GameBoard gs={gs} myId={myId} onAction={handleAction} toast={toast}/>}
    </>
  );
}
