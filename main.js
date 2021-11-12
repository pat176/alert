const { sendMail } = require('./reportSender');
const https = require('https');
const ta = require('technicalindicators')
const getD = (cryp) => {setInterval(() => {
  (async () => {
    https.get(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${cryp}&tsym=USD&limit=60&api_key=b8a4ce0dc14c286b06e7c6e710649a82aa5bf1a73f7080dc026e988eb91ff2f9`, (resp) => {
      let high = [];
      let low = [];
      let close = [];
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        // console.log(JSON.parse(chunk).Data.Data)
        for (let index = 0; index < JSON.parse(chunk).Data.Data.length; index++) {
          high.push(JSON.parse(chunk).Data.Data[index].high)
          low.push(JSON.parse(chunk).Data.Data[index].low)
          close.push(JSON.parse(chunk).Data.Data[index].close)
          
        }
      });
      
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        // console.log(high);
        const stoch = ta.Stochastic.calculate({
          high: high,
          low: low,
          close: close,
          period: 5,
          signalPeriod: 3
        })
        if (stoch[stoch.length - 1].k > stoch[stoch.length - 1].d && stoch[stoch.length - 1].k <= 20 && stoch[stoch.length - 2].k < stoch[stoch.length - 2].d) sendMail("Buy "+cryp, "Buy")
        else if (stoch[stoch.length - 1].k < stoch[stoch.length - 1].d && stoch[stoch.length - 1].k >= 80  && stoch[stoch.length - 2].k > stoch[stoch.length - 2].d) sendMail("Sell "+cryp, "Sell")
        // console.log(stoch)
      });
      
    }).on("error", (err) => {
      // console.log("Error: " + err.message);
    })
  })()
}, 1000);}
getD("BTC")
getD("SOL")