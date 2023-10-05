const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} = require('@whiskeysockets/baileys');

const chalk = require('chalk');

const config = require('../config/mainConfig.json');

module.exports = async (client, messages) => {
  const body = messages.mtype === 'conversation' ? messages.message.conversation : messages.mtype === 'extendedTextMessage' ? messages.message.extendedTextMessage.text : '';
  const budy = typeof messages.text === 'string' ? messages.text : '';
  const command = body.startsWith(config.prefix) ? body.replace(config.prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
  const cleanCommand = command.replace(config.prefix, '');
  const args = body.trim().split(/ +/).slice(1);
  const q = question = args.join(' ');
  const message = messages;
  const messageType = messages.mtype;
  const messageKey = message.key;
  const pushName = messages.pushName || 'Undefined';
  const chat = (from = messages.chat);
  const sender = messages.sender;
  const reply = messages.reply;

  if (!config.public_mode) {
    if (!messages.key.fromMe) return;
  }

  if (messages.message) {
    client.readMessages([messages.key]);

    console.log(
      chalk.bgMagenta(' [New Message] '),
      chalk.cyanBright('Time: ') + chalk.greenBright(new Date()) + '\n',
      chalk.cyanBright('Message: ') + chalk.greenBright(budy || messages.mtype) + '\n' +
      chalk.cyanBright('From:'), chalk.greenBright(pushName), chalk.yellow('- ' + messages.sender) + '\n' +
      chalk.cyanBright('Chat Type:'), chalk.greenBright(!messages.isGroup ? 'Private Chat' : 'Group Chat - ' + chalk.yellow(messages.chat))
    );
  }

  if (!body.startsWith(config.prefix)) {
    return;
  }

  switch (cleanCommand) {
    case 'test': {
      reply('Ok success!');
    }
    break;

    case 'menu': {
      const menu = `*• Menu:*\n- ${config.prefix}cgpt\n- ${config.prefix}gbard\n- ${config.prefix}simsimi\n- ${config.prefix}chatty`;
      reply(menu);
    }
    break;

    case 'cgpt': {
      if (!q) {
        return reply(`Example: ${config.prefix}${cleanCommand} Hello, AI`);
      };
      
      try {
        const reactionMessage = {
          react: {
            text: config.react.process,
            key: message.key,
          },
        };
        client.sendMessage(from, reactionMessage);
        async function API(apiUrl, apiKey, question) {
          const data = await fetch(apiUrl + '/api/artificial-intelligence/chatgpt-35?api_key=' + apiKey + '&question=' + question + '&custom_question=null&custom_answer=null');
          return await data.json();
        };

        const data = await API(config.api.url, config.api.key, q);
        const response = data.data.answer;

        console.log(data);
        client.sendMessage(from, {
          text: response
        }, {
          quoted: messages
        }).then(() => {
          const reactionMessageCompleted = {
            react: {
              text: config.react.success,
              key: message.key,
            },
          };
          client.sendMessage(from, reactionMessageCompleted);
        }).catch((error) => {
          console.error('Error:', error);
          reply('Error:', error);
        });
      } catch (error) {
        console.error('Error: ', error.message);
        reply('Error: ', error.message);
      };
    }
    break;

    case 'gbard': {
      if (!q) {
        return reply(`Example: ${config.prefix}${cleanCommand} Hello, AI`);
      };
      
      try {
        const reactionMessage = {
          react: {
            text: config.react.process,
            key: message.key,
          },
        };
        client.sendMessage(from, reactionMessage);
        async function API(apiUrl, apiKey, question) {
          const data = await fetch(apiUrl + '/api/artificial-intelligence/bard?api_key=' + apiKey + '&question=' + question);
          return await data.json();
        };

        const data = await API(config.api.url, config.api.key, q);
        const response = data.data.answer;

        console.log(data);
        client.sendMessage(from, {
          text: response
        }, {
          quoted: messages
        }).then(() => {
          const reactionMessageCompleted = {
            react: {
              text: config.react.success,
              key: message.key,
            },
          };
          client.sendMessage(from, reactionMessageCompleted);
        }).catch((error) => {
          console.error('Error:', error);
          reply('Error:', error);
        });
      } catch (error) {
        console.error('Error: ', error.message);
        reply('Error: ', error.message);
      };
    }
    break;
    
    case 'simsimi': {
      if (!q) {
        return reply(`Example: ${config.prefix}${cleanCommand} Hello, AI`);
      };
      
      try {
        const reactionMessage = {
          react: {
            text: config.react.process,
            key: message.key,
          },
        };
        client.sendMessage(from, reactionMessage);
        async function API(apiUrl, apiKey, question) {
          const data = await fetch(apiUrl + '/api/artificial-intelligence/simsimi?api_key=' + apiKey + '&language=id&question=' + question);
          return await data.json();
        };

        const data = await API(config.api.url, config.api.key, q);
        const response = data.data.answer;

        console.log(data);
        client.sendMessage(from, {
          text: response
        }, {
          quoted: messages
        }).then(() => {
          const reactionMessageCompleted = {
            react: {
              text: config.react.success,
              key: message.key,
            },
          };
          client.sendMessage(from, reactionMessageCompleted);
        }).catch((error) => {
          console.error('Error:', error);
          reply('Error:', error);
        });
      } catch (error) {
        console.error('Error: ', error.message);
        reply('Error: ', error.message);
      };
    }
    break;
    
    case 'chatty': {
      if (!q) {
        return reply(`Example: ${config.prefix}${cleanCommand} Hello, AI`);
      };
      
      try {
        const reactionMessage = {
          react: {
            text: config.react.process,
            key: message.key,
          },
        };
        client.sendMessage(from, reactionMessage);
        async function API(apiUrl, apiKey, question) {
          const data = await fetch(apiUrl + '/api/artificial-intelligence/chatty-ai?api_key=' + apiKey + '&question=' + question);
          return await data.json();
        };

        const data = await API(config.api.url, config.api.key, q);
        const response = data.data.answer;

        console.log(data);
        client.sendMessage(from, {
          text: response
        }, {
          quoted: messages
        }).then(() => {
          const reactionMessageCompleted = {
            react: {
              text: config.react.success,
              key: message.key,
            },
          };
          client.sendMessage(from, reactionMessageCompleted);
        }).catch((error) => {
          console.error('Error:', error);
          reply('Error:', error);
        });
      } catch (error) {
        console.error('Error: ', error.message);
        reply('Error: ', error.message);
      };
    }
    break;
    
    default: {
      reply(`Command: ${config.prefix}${cleanCommand}, tidak tersedia!`);
    }
  }
}