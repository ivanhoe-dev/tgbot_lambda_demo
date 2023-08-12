// setup the bot
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// set a start command
bot.start((ctx) => {
      return ctx.reply('Hello from Lambda! Use /help to view available commands.');
});

module.exports.hello = async event => {
  // using a try/catch block
  try {
    // process event data
    const body = JSON.parse(event.body);

    // bot handles processed data from the event body
    await bot.handleUpdate(body);
    return {
      statusCode: 200
    }
    // return an Ok response
  } catch (err) {
    console.log('error', err)
    // handle any errors
    return {
      statusCode: 500
    }
    // return any Err responses
  }
}

// setWebhook function handles initial webhook setup for Telegram
module.exports.setWebhook = async event => {
  // using a try/catch block
  try {
    // process webhook url based on event data
    let url = 'https://' + event.headers.Host + '/' + event.requestContext.stage
      + '/webhook';

    // use bot methods to set the webhook url
    await bot.telegram.setWebhook(url);
    return {
      statusCode: 200
    }
    // return an Ok response
  } catch (err) {
    console.log('error', err)
    // handle any errors
    return {
      statusCode: 500
    }
    // return any Err responses
  }
}