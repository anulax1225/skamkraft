import { AgentBuilder } from '../api/agent.js'
import Strategie from '../commun/strategie.js';

export class Auth {
    constructor(store = false) {
        this.store = store;
        this.validated = () => {};
        this.error_handler = () => {};
        this.strategies = {
            register: [
                {
                    name: "symbol",
                    validations: [
                        "required",
                        "max_lenght|14"
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
    }

    done(validated) {
        this.validated = validated;
        return this;
    }
    
    fail(error_handler) {
        this.error_handler = error_handler;
        return this;
    }

    login(token) {
        let validateur = new Strategie(this.strategies.login);
        validateur.validate("token", token);
        if (validateur.errors) this.error_handler(validateur.errors);
        else {
            if (store) localStorage.setItem("token", token);
            AgentBuilder.get(token, this.validated);
        }
    }

    register(new_agent) {
        let validateur = new Strategie(this.strategies.register);
        validateur.validate("symbol", new_agent.symbol);
        validateur.validate("faction", new_agent.faction);
        if (validateur.errors) this.error_handler(validateur.errors);
        else {
            if (store) localStorage.setItem("token", token);
            AgentBuilder.create(new_agent.symbol, new_agent.faction, this.validated);
        }
    }
}