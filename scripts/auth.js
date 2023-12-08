"use strict";

import { getAgent } from "./api/agent.js";
import { createAgent } from "./api/agent.js";

export async function login() {
  let token = $('#input-token').val();

  if (!token) {
    $('#error').text('Token manquant');
    return;
  }

  try {
    await getAgent(token);
    localStorage.setItem('token', token);
    window.location.href = '/index.html';
  } catch (error) {
    $('#error').text('Token invalide');
  }
}


export async function register() {

  let symbol = $('#input-symbol').val();
  if (!symbol) {
    $('#error').text('Symbol manquant');
    return;
  }

  let faction = $('#input-faction').val();
  if (!faction) {
    $('#error').text('Faction manquante');
    return;
  }

  try {
    await createAgent(symbol, faction);
    localStorage.setItem('token', token);
    window.location.href = '/index.html';
  } catch {
    $('#error').text('Symbol ou faction invalide');
  }
}

export async function isLogin() {
  let token = localStorage.getItem('token');

  if (!token) return false;

  try {
    await getAgent(token);
    return true;
  } catch {
    return false;
  }
}