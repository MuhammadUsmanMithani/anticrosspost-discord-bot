# Anti-Crosspost Discord Bot
----
This bot is a cool Discord bot made in [**discord.js**](https://discord.js.org/) using [**Node.JS**](https://nodejs.org). It detects when a user cross-posts a message in multiple channels in a Discord server, and automatically deletes it. It even works if the strings are grammatically different, and similar in meaning, but not same, and even if they have different punctuation! It only affects messages with a character length 15 or above, but this can be changed in the `config.json` file. It also does not affect messages sent more than 10 minutes ago

This bot is mostly meant for Support Servers and Development-help servers where people cross-post messages that they need help with.

Example:

![Gif showing the bot](https://python.became.gay/UyzdLaoxiG.gif)

### NOTE: This bot is meant to be a single-server bot. It WILL BREAK IF YOU TRY TO RUN IT ON MULTIPLE SERVERS! You will have to adjust the code yourself to make it usable in multiple servers correctly!
---

## Requirements
This bot hardly has any requirements. All you need is:

- A discord bot on [**the Discord developer page**](https://discord.com/developers/applications/)
- A host capable of running a Discord bot
- [**Node.JS v16.9.0**](https://nodejs.org/) minimum
- Slight know-how of Javascript and JSON, if you want to do some basic configuration like whitelisting roles/channels
- Dev-mode on in Discord, for some basic configuration like whitelisting roles/channels
- A text editor or an IDE

## Setting it up
Setting this bot up is super simple! First of all, fire up your terminal and type in `npm i` and wait for the libraries to install. Then, copy the token from Discord developer page and in `config.json` add the token in `bot.TOKEN`. Paste the token between the "", like this:
```json
"TOKEN": "GAC3MTM4NDg2NjIwNTIwNDQ4.GBHacd.y1GHAC-86Dn4QVChovI8o2U-iBR", //this token here doesnt really work
```
Then in your terminal, type in `node index.js`, and viola, its up and running!

**NOTE: i did not add any error handling since this bot is not meant to be a multi-server bot, and other servers will have to give this bot `ADMINISTRATOR` permissions for smoothest experience so that it does not crash. If you do not, and it is unable to delete the message or send back a message, it will crash! You can add the error handling yourself if you want**

---

## FAQ

### How do I stop the bot from affecting moderators/certain people
**Ans:** Simple! Just copy the role IDs, and in `config.json`, you can add them into the array given in `ignoredItems.roles` (Dev-mode enabled is a requirement). <br> Example:
```json
"roles":["123456789012345678","8383939293883288283"]
```

### How do I whitelist certain channels from being affected by this bot?
**Ans:** Easy! Copy the channel IDs, and in `config.json`, you can add them into the array given in `ignoredItems.channels` <br>
Example:
```json
"channels":["123456789012345678","8383939293883288283"]
```

### How can we make it such, that it affects older messages too, say, sent around 30 minutes ago?
**Ans:** Super easy! Go to `config.json` and set `messages.timeToLive` accordingly (in milliseconds). `600000` means 10 minutes but in milliseconds, but for 30 minutes, you can change it to `1800000`, and thats it!

### The bot is not affecting similar messages in cross-posts/Why is the bot affecting non-similar messages?
**Ans:** Even though this bot is coded using the best available algorithms, it is not Artificial Intelligence, so it sometimes does not work on all cross-posts, and sometimes even has false positives. The ratio that I have set it to is 0.7, which was the sweet spot to neither affect many different messages, and to affect similar messages, even though its not perfect. In `config.json` on `messages.similarityRatio`, try messing around with the `0.7` value (The maximum it can be is 1). <br> 
**NOTE: Lower means there is a more chance of false positives, and higher means it will sometimes not affect similar messages**

### How to change minimum message length for the bot to affect?
**Ans:** Change `messages.minimumLength` accordingly in `config.json`, or change the value to 0 if you want to check all types of messages for cross-posts. Change `15` to a smaller value if you want to reduce the minimum message length value

### Can I change the status activity from "Watching crossposters" to something else, say, "Watching some people"?
**Ans:** No problem! in `config.json`, change `bot.statusActivity` to whatever you want!

### NOTE: After every change in config.json file, you will need to restart the bot or it will not load the new configuration. Also, do not leave any value empty or invalid or the bot will break!

---
## Easy peasy, lemon squeezy

### Credits to:
- Joakim#9814 for giving me the idea for it

*And more coming soon...*