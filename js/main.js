// Copyright © 2023 Entreprise SpaceTarders
'use strict'
import { createAgent, getAgent } from "./agents.js";
import { listSystems, getSystem, listWaypointsInSystem } from "./system.js";
import {getFaction, listFactions} from "./faction.js";
import {getContrat, listContrats, CreateCardContrat, getInfosContrat} from "./contrat.js";



let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMDIiLCJpYXQiOjE3MDIwMzg1ODgsInN1YiI6ImFnZW50LXRva2VuIn0.Brl1Mm9K7bG7kLfWGiU6M0WFvOXy-sV3T_p9-c-v97XMFvsmA85lpdKzeaAyVpOPMF4uM08HqxWb9mEGbag5whX0LPk39B_vjKeQVB9cjpjDsaElQz2HuWIUlB33eOQTyt_LKdQYnY7Jqh2HLopMbzK5sjeaGYzjoWILCuZXjqQkp5b0M_0EvXqCgDn1PpEb_MXSLkTpSQ1xa6hCaGjf6fE3KfTgRxEGpIunAeLRq1edaN4fU7TFU0SWSJZ1HO9CMfxA7eZt274sw4Wiea6LpwlPsGOMf1HFVl2sWdpbdIwdaFHyKpUAHWOGORKBB4B9G77wFLcOukwQMOQYOFL48Q"

$(document).ready(async function(){
    let contrat = listContrats()
    if (document.URL.includes('contrats.html')) {

        return;
    }

})









