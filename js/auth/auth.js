// Copyright © 2023 Entreprise SkamKraft
'use strict';
import { AgentBuilder } from '../api/agent.js'
import Strategie from '../commun/strategie.js';

let strategies = {
    register: [
        {
            name: "symbol",
            validations: [
                "required",
                "max_length|14"
            ]
        },
        {
            name: "faction",
            validations: [
                "required"
            ]
        }
    ],
    login: [
        {
            name: "token",
            validations: [
                "required"
            ]
        }
    ]
}

export class Auth {
    constructor(store = false) {
        this.store = store;
        this.validated = () => {};
        this.error_handler = () => {};
        this.strategies = strategies;
    }

    done(validated) {
        this.validated = validated;
        return this;
    }
    
    fail(error_handler) {
        this.error_handler = error_handler;
        return this;
    }

    async login(token) {
        let validateur = new Strategie(this.strategies.login);
        validateur.validate("token", token);
        if (validateur.errors.length > 0) this.error_handler(validateur.errors);
        else {
            if (this.store) localStorage.setItem("token", token);
            await AgentBuilder.get(token, this.validated, this.error_handler);
        }
    }

    async relog() {
        if(this.is_login()) await AgentBuilder.get(localStorage.getItem("token"), this.validated, this.error_handler); 
        else return false;
    }

    async register(new_agent) {
        let validateur = new Strategie(this.strategies.register);
        validateur.validate("symbol", new_agent.symbol);
        validateur.validate("faction", new_agent.faction);
        if (validateur.errors.length > 0) this.error_handler(validateur.errors);
        else {            
            await AgentBuilder.create(new_agent.symbol, new_agent.faction, (agent) => {
                if (this.store) localStorage.setItem("token", agent.token);
                this.validated(agent);
            }, this.error_handler);
        }
    }

    #is_login() {
        if (this.store && localStorage.getItem("token")) {
            return true
        }
        return false
    }
}