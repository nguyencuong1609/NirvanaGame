const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('7995390891:AAF3Fna4IpjHwpgwjBCcbg-yDNBZXeuMGHM');

const backendUrl = 'https://nirvana-game-be.vercel.app/'; // Replace with your backend URL

bot.start((ctx) => {
  const firstName = ctx.from.first_name;
  const username = ctx.from.username;
  console.log(ctx.from.id);

  ctx.replyWithHTML(
    `<b>Hello, ${firstName} (@${username})!</b> <i>Welcome to Nirvana Walk app.</i>`
  );

  ctx.replyWithHTML(
    '<b>🎁 Play-to-earn airdrop right now!</b>',
    Markup.inlineKeyboard(
      [
        Markup.button.url(
          '🍔 Play',
          `https://t.me/NirvanaAppBot/NirvanaGame?startapp=${ctx.from.id}`
        ),
        Markup.button.url(
          '🍕 Join Community',
          'https://www.youtube.com/watch?v=QiWIWZqriNg'
        ),
        Markup.button.url(
          '🥗 Follow X',
          'https://www.youtube.com/watch?v=QiWIWZqriNg'
        ),
        Markup.button.url(
          '🚀 Mở NirvanaGame',
          'https://t.me/NirvanaAppBot/NirvanaGame'
        ),
      ],
      { columns: 1 }
    )
  );
});

bot.launch().then(() => {
  console.log('Bot is up and running');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
