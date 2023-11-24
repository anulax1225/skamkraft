'use strict'

let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUlVCRU4xMjMiLCJ2ZXJzaW9uIjoidjIuMS4yIiwicmVzZXRfZGF0ZSI6IjIwMjMtMTEtMTgiLCJpYXQiOjE3MDA4MzM2NTgsInN1YiI6ImFnZW50LXRva2VuIn0.SQSgewmJhhOlnk3wst9ND61D6JoAXSW6tZAJhS8c0IxyegVVe7ZkCBCU3tBraxWwEwR6wAnc8iCWzaS5Ir6mHbLhDR5UAaJwBasTMHQN1dXeQGJE83CjhciAyxWUV3iej4M1OD0kzG2uHFicLt9emOlCEbVcroXn2_F4K9kQDRjpoy3KEzGJxJbvWqug9mo5Ejb0WupB0Sim-mWwBmmpbkCx-MbakzZ5tUfUC5h-dAVsUIqnfrr7QCOq3zPrdt7zZzsOXFcwPwE6hbag62J5ROQtPfx1r9w-6pf7-mOOmEYSWHbArbls9f71o9Wf6A1qv3yPWGVjr5qQ1EFo_H-x_g'

export async function listContrats(){
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
        console.log(response);
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