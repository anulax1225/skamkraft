"use strict";

import { login } from './auth.js'
import { register } from './auth.js'
import { isLogin } from './auth.js';

$(document).ready(async function () {

    if (document.URL.includes('login.html')) {
        $('#btn-login').on('click', () => {
            login();
        });
        return;
    }
    if (document.URL.includes('register.html')) {
        $('#btn-register').on('click', () => {
            register();
        })
        return;
    }

    if (!await isLogin()) window.location.href = '/login.html';
});
