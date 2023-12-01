// Copyright © 2023 Entreprise SpaceTarders
'use strict'
let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4iLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDE0MzUxMTAsInN1YiI6ImFnZW50LXRva2VuIn0.AKe66yRJWV457_U-C5w0z03zwoPJIOyFgnef_nQXjXLtacyYxeYkcilv-5nRcsk1BsI1NkV2mT6Hg_WbevvxJzfIVSq1ZDQAUyA-sxM7qro3-kFfHWgy7FrCGEoKRTGRbFSo6yuKhvygAY6cZFsEAW6i9ayq893JFWeFNM-xfXDrnNI52VOQzWVJzYdhyi7jSsmUfw3vXf9OuXjaMPP3qpmCLpuElWGnqSyQBdLs7y7rN3MmkYH0E5ZPrYmBmdqk10QkJ_bruf2AgU808Q9lgw013qMVoDHwb-83_LrWjzYuIBQQBpfRIyMQrLaum-uEHsIECBg5D3M_OTFmy7htqQ"

export function CreateCardContrat(contrats){
    $('#contrats').empty()
    
    contrats.forEach(contrat => {
        console.log(contrat);
        const card =
        `                            
          <div class="card" style="width: 20rem;">
                <img src="/images/contrat.jpg" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${contrat.factionSymbol}</h5>
                    <p class="card-text">${contrat.accepted}</p>
                    <button class="btn btn-primary btn-infos" data-toggle="modal" data-target="#Infos" >Infos</button>
                    <button class="btn-modify btn btn-primary" data-toggle="modal" data-target="#Modify" >Accepter</button>                       
                </div>
            </div>
        `
        $('#contrats').append(card) 
    })
}
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