// Copyright © 2023 Entreprise SpaceTarders
'use strict'
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMDIiLCJpYXQiOjE3MDIwMzg1ODgsInN1YiI6ImFnZW50LXRva2VuIn0.Brl1Mm9K7bG7kLfWGiU6M0WFvOXy-sV3T_p9-c-v97XMFvsmA85lpdKzeaAyVpOPMF4uM08HqxWb9mEGbag5whX0LPk39B_vjKeQVB9cjpjDsaElQz2HuWIUlB33eOQTyt_LKdQYnY7Jqh2HLopMbzK5sjeaGYzjoWILCuZXjqQkp5b0M_0EvXqCgDn1PpEb_MXSLkTpSQ1xa6hCaGjf6fE3KfTgRxEGpIunAeLRq1edaN4fU7TFU0SWSJZ1HO9CMfxA7eZt274sw4Wiea6LpwlPsGOMf1HFVl2sWdpbdIwdaFHyKpUAHWOGORKBB4B9G77wFLcOukwQMOQYOFL48Q"

export function CreateCardContrat(contrats){
    $('#contrats').empty()
    
    contrats.forEach(contrat => {
        console.log(contrat);
        const card =
        `                            
          <div class="card" style="width: 20rem;">
                <img src="/img/contrat.jpg" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 style="color:white" class="card-title">${contrat.factionSymbol}</h5>
                    <p style="color:white" class="card-text">${contrat.accepted}</p>
                    <button id="btn-infos" contratID="${contrat.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Infos</button>
                    <button id="btn-accepter" class="btn-modify btn btn-primary" data-toggle="modal" data-target="#Modify" >Accepter</button>                       
                </div>
            </div>
        `

        $('#contrats').append(card)
        $('#btn-infos').on('click', async function(){
            await getInfosContrat($(this).attr('contratID'));
            
        })
    })
}
{/* <button id="btn-infos" contratID="${contrat.id}" class="btn btn-primary btn-infos" data-toggle="modal" data-target="#Infos" >Infos</button> */}
export function listContrats(){
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.spacetraders.io/v2/my/contracts',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      $.ajax(settings).done(function (response) {
        CreateCardContrat(response.data);
      });
}

export async function getContrat(contratId){
    let contrat;
    
    await $.ajax(`https://api.spacetraders.io/v2/my/contracts/${contratId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        success: function(response){
            contrat = response.data;
           
        },
        error: function(error){
            console.log(error);
        }
    });

    return contrat;
}

export async function getInfosContrat(contratId){
    
    let contrat;
    await $.ajax(`https://api.spacetraders.io/v2/my/contracts/${contratId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        success: function(contrat){
            console.log(contrat);
            window.contratID.innerText = `ID Contrat : ${contratId}`
            window.exampleModalLabel.innerText = `${contrat.factionSymbol}`
            
            
        },
        error: function(error){
            console.log(error);
        }
    });

    return contrat;
    
}




