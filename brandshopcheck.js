const puppeteer = require('puppeteer');
const { remote_db } = require('electron')
const db_task = require('electron-db');
const electron = require('electron');
const app = electron.app || electron.remote.app;
const path_table = require('path');
const location_table = path_table.join(__dirname, '');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const userAgent = require('user-agents');





async function BrandShopCheck() {
  let login = login_db
  let password = password_db
  let size = size_db
  let sposob = sposob_db
  console.log(login);

  try {
    let browser = await puppeteer.launch({headless: false, devtools: false})
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
