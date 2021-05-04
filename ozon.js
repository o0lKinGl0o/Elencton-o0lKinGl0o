const puppeteer = require('puppeteer');



async function Ozon() {

  try {
    let browser = await puppeteer.launch({headless: false, devtools: true})
    let page = await browser.newPage()
    await page.setViewport({
      width: 1400,
      height: 900
    })
    await page.goto('https://ozon.ru/')
    await page.waitFor(1010);
    await page.evaluate(() => {
            console.log('test');

            fetch("https://www.ozon.ru/api/composer-api.bx/_action/fastEntryV3", {
              "headers": {
                "accept": "application/json",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-o3-app-name": "dweb_client",
                "x-o3-app-version": "release_8-3'-'2021_57e308da"
              },
              "referrer": "https://www.ozon.ru/ozonid-lite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoxLCJvcmlnaW4iOjEsIndlYmhvb2tfdXJsIjoiL296b25pZC9hdXRoUmVzcG9uc2VJZnJhbWUiLCJwYXlsb2FkIjpudWxsLCJyZXR1cm5fdXJsIjoiaHR0cHM6Ly93d3cub3pvbi5ydS8iLCJyZWZlcmVyX3BhZ2VfdHlwZSI6InVua25vd24iLCJyZXF1aXJlZF9maWVsZHMiOm51bGwsInBhdGNoX3VzZXJfYWNjb3VudF9wYXJhbXMiOm51bGwsImJpbmRfY2FzX2lkIjpmYWxzZSwiZXhwIjoxNjE4MDU0Nzg2LCJpYXQiOjE2MTc5NjgzODYsImlzcyI6Im96b25pZCJ9.Q-mlKCm6Z_lvfi6-qOGxBiaPeu129ooEaeDSIHVoBAQ&redirect=https://www.ozon.ru/",
              "referrerPolicy": "no-referrer-when-downgrade",
              "body": "{\"authRequestToken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoxLCJvcmlnaW4iOjEsIndlYmhvb2tfdXJsIjoiL296b25pZC9hdXRoUmVzcG9uc2VJZnJhbWUiLCJwYXlsb2FkIjpudWxsLCJyZXR1cm5fdXJsIjoiaHR0cHM6Ly93d3cub3pvbi5ydS8iLCJyZWZlcmVyX3BhZ2VfdHlwZSI6InVua25vd24iLCJyZXF1aXJlZF9maWVsZHMiOm51bGwsInBhdGNoX3VzZXJfYWNjb3VudF9wYXJhbXMiOm51bGwsImJpbmRfY2FzX2lkIjpmYWxzZSwiZXhwIjoxNjE4MDU0Nzg2LCJpYXQiOjE2MTc5NjgzODYsImlzcyI6Im96b25pZCJ9.Q-mlKCm6Z_lvfi6-qOGxBiaPeu129ooEaeDSIHVoBAQ\",\"isAlphaNumericOtp\":false,\"hideHints\":false,\"csrfToken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0VW5peFRpbWUiOjE2MTc5NjgzODgsInNlc3Npb25JZCI6InV4LUlqa1Q0UUxpdEZjOS1nU0t0cVEifQ.3GBXO9CbPAzXHUg9Ti75C-zd-aIXFaXhXBa3qArrbWw\",\"isOtpExpired\":false,\"phone\":\"79124826314\"}",
              "method": "POST",
              "mode": "cors",
              "credentials": "include"
            }).then(response => {
                    return response.text();
                }).then(function(data) {
                console.log(data); // this will be a string
            });
        });










  } catch(e) {
    console.log(e);
  }


}


module.exports.BrandShop = Ozon
