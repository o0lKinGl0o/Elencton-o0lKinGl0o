const puppeteer = require('puppeteer');
const { remote_db } = require('electron')
const db_task = require('electron-db');
const electron = require('electron');
const app = electron.app || electron.remote.app;
const path_table = require('path');
const location_table = path_table.join(__dirname, '');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const userAgent = require('user-agents');




async function BrandShop() {
  let link = document.querySelector(".getlink").value;
  if (link == ''){
    alert("Вставьте ссылку");
    console.log("Вставьте ссылку");
    return false
    browser.close()
  }
  console.log(link);
  let login = login_db
  let password = password_db
  let size = size_db
  let sposob = sposob_db
  console.log(login);


  let browser = await puppeteer.launch({headless: true, devtools: false})
  let page = await browser.newPage()
  await page.setViewport({
    width: 1300,
    height: 900
  })
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/4.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.35');

  async function loginBS() {
     try {
       await page.goto('https://brandshop.ru/login/')
       await page.waitForSelector('#login-id')
       console.log('НА САЙТЕ');
       await page.type('#login-id', login);
       await page.type('#password', password);
       await page.click("#login-form > button");
       await page.waitForSelector('#app-account > div > div.row.top.hidden-sm > div > div:nth-child(2)')
       console.log('Залогинился');
     } catch (e) {
       console.log('Ошибка входа');
       await loginBS()
     }
  }
  async function CheckCart() {
     try {
       await page.waitForSelector('#header > div.container > div > div.nav-right > div.init.icon.icon-cart')
       const values = await page.evaluate(
     () => [...document.querySelectorAll('.init.icon.icon-cart')]
           .map(element => element.getAttribute('data-qty'))
       );
       console.log("Состояние корзины:" + values);
       if (values > 0) {
         console.log("Очистка корзины");
         await page.goto('https://brandshop.ru/')
         await page.waitForSelector('#header > div.container > div > div.nav-right > div.init.icon.icon-cart')
         await page.click("#header > div.container > div > div.nav-right > div.init.icon.icon-cart");
         for (let i = 0; i < values; i++) { // выведет 0, затем 1, затем 2
           await page.click("#header > div.container > div > div.nav-right > div.init.icon.icon-cart > div > div > div.products > div > div.col-3.price > span");
         }
       } else {
         console.log("Корзина пустая");
       }
     } catch (e) {
       console.log('Ошибка корзины');
       await CheckCart()
  }
}
async function GetCart() {
   try {
     await page.goto(link)
     try {
       await page.waitForSelector("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el > button.btn.btn-fluid.btn-black.btn-cart", {
         timeout: 600
       })
     } catch (e) {
       console.log('Не нашел');
       await page.waitForSelector("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el.bottom-sticky > div.row > div:nth-child(1) > button.btn.btn-fluid.btn-black.btn-cart")
     }
     //await page.waitForSelector("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el > button.btn.btn-fluid.btn-black.btn-cart")
     const linkHandlers = await page.$x('//*[text()="' + size + ' EU"]'); // Razmer
     if (linkHandlers.length > 0) {
       await linkHandlers[0].click();
     } else {
       console.log("Размер не найден");
     }

     try {
       await page.click("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el > button.btn.btn-fluid.btn-black.btn-cart", {
         timeout: 600
       })
     } catch (e) {
       console.log('Не нашел');
       await page.click("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el.bottom-sticky > div.row > div:nth-child(1) > button.btn.btn-fluid.btn-black.btn-cart");
     }
     //await page.click("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el.bottom-sticky > div.row > div:nth-child(1) > button.btn.btn-fluid.btn-black.btn-cart");
     //await page.click("#app-product-card > div.container > div.row.no-gutters > div.col.col-5.col-sm-12 > div.product-right.vue-sticky-el > button.btn.btn-fluid.btn-black.btn-cart");
     console.log('Добавил в корзину');
   } catch (e) {
     console.log('Ошибка добавления');
     console.log(e);
     await page.screenshot({path: 'GetCart.png'});
     await GetCart()
   }
}
async function GoChekout() {
   try {
     await page.goto(link)
     await page.waitForSelector('#header > div.container > div > div.nav-right > div.init.icon.icon-cart')
     await page.click("#header > div.container > div > div.nav-right > div.init.icon.icon-cart");
     await page.waitForSelector('#header > div.container > div > div.nav-right > div.init.icon.icon-cart > div')
     await page.click("#header > div.container > div > div.nav-right > div.init.icon.icon-cart > div > div > div.row.no-gutters.minicart__buttons > div:nth-child(1) > a");
   } catch (e) {
     console.log('Ошибка перехода');
     await GoChekout()
   }
}
async function Сhekoutpage() {
   try {
     await page.waitForSelector('#app-checkout > div > div.row.top.hidden-sm > div > div:nth-child(2)')
     await page.click("#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(4) > div > div > div");
     await page.waitForSelector('#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(4) > div > div > div.bs-select-items > div:nth-child(1)')
     const sposoba = await page.$x('//*[contains(text(), "'+sposob+'")]'); // Razmer
     if (sposoba.length > 0) {
       await sposoba[0].click();
     }

     await page.waitFor(5000);

     await page.waitForSelector('#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(5) > div > div > div')
     await page.click("#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(5) > div > div > div");
     await page.waitForSelector('#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(5) > div > div > div.bs-select-items > div')
     const oplata = await page.$x('//*[contains(text(), "Банковская карта")]'); // Razmer
     if (oplata.length > 0) {
       await oplata[0].click();
     }


     await page.waitFor(5000);
     await page.waitForSelector('#app-checkout > div > div.row.blocks > div.col.col-5.col-sm-12.customer > div > div:nth-child(5) > div > div > div')
     await page.click('#payture-confirm')

     await page.waitForSelector('#logo > div.provider-description')
     pageurl = page.url()
     console.log(pageurl)

     const hook = new Webhook("https://discord.com/api/webhooks/668578738379685890/PBIBUT2I2EGfaKTwFhtPngbvTaXOAfWcBvOytH5CoIq3hfo-y3V6AULn4gRPFkQt4T4R");
     const embed = new MessageBuilder()
     .setTitle('Brandshop Registration')
     .setAuthor('VostBot', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj', 'https://brandshop.ru/')
     .addField('Аккаунт зарегистрирован', login, true)
     .addField('Размер', size)
     .addField('Payment link', pageurl, true)
     .setColor('#00b0f4')
     .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
     .setFooter('by megh#6742', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
     .setTimestamp();
     hook.send(embed);
     browser.close()
    } catch (e) {
     console.log('Ошибка чекаута');
     await GoChekout()
     await Сhekoutpage()
   }
}


  await loginBS()
  await CheckCart()
  await GetCart()
  await GoChekout()
  await Сhekoutpage()
}

// login

async function BrandShopCheck() {
  let login = login_db
  let password = password_db
  let size = size_db
  let sposob = sposob_db
  console.log(login);

  try {
    let browser = await puppeteer.launch({headless: true, devtools: false})
    let page = await browser.newPage()
    await page.setViewport({
      width: 1300,
      height: 900
    })
    await page.setDefaultNavigationTimeout(0);
    var userAgent = require('user-agents');
    await page.setUserAgent('Mozilla/4.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.35');
    await page.goto('https://brandshop.ru/login/')
    await page.waitForSelector('#login-id')
    console.log('НА САЙТЕ');


// login
    await page.type('#login-id', login); // login
    await page.type('#password', password); // password
    await page.click("#login-form > button");
    await page.waitForSelector('#header > div.container > div > nav > div:nth-child(1) > a')
    logineurl = page.url()
    if (logineurl == "https://brandshop.ru/login/?utm_referrer=https%3a%2f%2fbrandshop.ru%2flogin%2f") {
      browser.close()
      console.log('Ошибка');
      return false;
    } else {
        console.log('Залогинился');
    }



    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    const today2 = dd + '.' + mm + '.' + yyyy;
    console.log(today2);
    try {
      await page.waitForSelector('#app-account > div > div.row.blocks > div.col.col-5.col-sm-12 > div > div:nth-child(2)')
      let element = await page.$('#app-account > div > div.row.blocks > div.col.col-6.orders.hidden-sm > div.box > div.row.no-gutters.order > div:nth-child(2)')
      let value = await page.evaluate(el => el.textContent, element)
      console.log(value);

    }
    catch (adfd) {
      console.log('Не выйграл');
      const hook = new Webhook("https://discord.com/api/webhooks/668578738379685890/PBIBUT2I2EGfaKTwFhtPngbvTaXOAfWcBvOytH5CoIq3hfo-y3V6AULn4gRPFkQt4T4R");
      const embed = new MessageBuilder()
      .setTitle('Brandshop Win Checker')
      .setAuthor('VostBot', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj', 'https://brandshop.ru/')
      .addField('Account', login, true)
      .addField('Size', size)
      .addField('Result', "Не выйграл", true)
      .setColor('#00b0f4')
      .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
      .setFooter('by megh#6742', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
      .setTimestamp();
      hook.send(embed);
      browser.close()
      return false;

        }

      let element = await page.$('#app-account > div > div.row.blocks > div.col.col-6.orders.hidden-sm > div.box > div.row.no-gutters.order > div:nth-child(2)')
      let value = await page.evaluate(el => el.textContent, element)
      console.log(value);
      if (today2 == value) {
        console.log('Выграл');
        await page.goto('https://brandshop.ru/order/')
        await page.waitForSelector('#header > div.container > div > nav > div:nth-child(1) > a')
        await page.click('#app > main > div > div.box > ul > li > div.row.no-gutters.order-heading > div.col.col-2.col-sm-10.order-sm-1')
        await page.waitForSelector('#app > main > div > div.box > ul > li > div.row.no-gutters.order-content > div.col.col-6.col-sm-12.product > div.row.no-gutters.product-content > div.col.col-5.col-sm-12.hidden-sm > div > div.col.col-12.product-name')
        let elname = await page.$('#app > main > div > div.box > ul > li > div.row.no-gutters.order-content > div.col.col-6.col-sm-12.product > div.row.no-gutters.product-content > div.col.col-5.col-sm-12.hidden-sm > div > div.col.col-12.product-name')
        let name = await page.evaluate(el => el.textContent, elname)
        let elsize = await page.$('#app > main > div > div.box > ul > li > div.row.no-gutters.order-content > div.col.col-6.col-sm-12.product > div.row.no-gutters.product-content > div.col.col-5.col-sm-12.hidden-sm > div > div.col.col-7.col-sm-12')
        let valsize = await page.evaluate(el => el.textContent, elsize)
        var linkpicture = await page.$eval('.img-responsive[alt="'+name+'"]',
            element=> element.getAttribute("data-rjs"));
        const hook = new Webhook("https://discord.com/api/webhooks/668578738379685890/PBIBUT2I2EGfaKTwFhtPngbvTaXOAfWcBvOytH5CoIq3hfo-y3V6AULn4gRPFkQt4T4R");
        const embed = new MessageBuilder()
        .setTitle('Brandshop Win Checker')
        .setAuthor('VostBot', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj', 'https://brandshop.ru/')
        .addField('Account', login, true)
        .addField('Item', name)
        .addField('Size', size)
        .addField('Result', "Выйграл", true)
        .setColor('#00b0f4')
        .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
        .setImage(linkpicture)
        .setFooter('by megh#6742', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
        .setTimestamp();
        hook.send(embed);
        browser.close()



      } else {
          console.log('Не выйграл');
          const hook = new Webhook("https://discord.com/api/webhooks/668578738379685890/PBIBUT2I2EGfaKTwFhtPngbvTaXOAfWcBvOytH5CoIq3hfo-y3V6AULn4gRPFkQt4T4R");
          const embed = new MessageBuilder()
          .setTitle('Brandshop Win Checker')
          .setAuthor('VostBot', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj', 'https://brandshop.ru/')
          .addField('Account', login, true)
          .addField('Size', size)
          .addField('Result', "Не выйграл", true)
          .setColor('#00b0f4')
          .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
          .setFooter('by megh#6742', 'https://yt3.ggpht.com/ytc/AAUvwngJmUEEYG1cfUft0H6UKJE23FXp3aHy_Qmx-OQHRo0=s88-c-k-c0x00ffffff-no-rj')
          .setTimestamp();
          hook.send(embed);
          browser.close()
        };




    //browser.close()

  } catch(e) {
    console.log(e);
  }
}






function BS_click(clicked){
  const buttonBS_ID = Number(this.id);
  db_task.search('taskTable',  location_table, 'id', buttonBS_ID, (succ, data) => {
    if (succ) {
      data.forEach( data => {
        login_db = data.login;
        password_db = data.password;
        size_db = data.size;
        sposob_db = data.sposob;
      })
    }
    BrandShop()
  });
}

function BS_clickForCheck(clicked){
  const buttonBS_ID = Number(this.id);
  db_task.search('taskTable',  location_table, 'id', buttonBS_ID, (succ, data) => {
    if (succ) {
      data.forEach( data => {
        login_db = data.login;
        password_db = data.password;
        size_db = data.size;
        sposob_db = data.sposob;
      })
    }
    BrandShopCheck()
  });
}
