//preprepping
const Discord = require("discord.js");
const {bot, messages, ignoredItems} = require("./config.json");
const stringSimilarity = require("string-similarity");
const {inspect} = require("util");


//creating the bot
const client = new Discord.Client({
    partials: ["MESSAGE"],
    presence: {
	    status: "online",
	    activities: [{ name: bot.statusActivity || "crossposters", type: "WATCHING" }],
	},
    intents: ["GUILD_MESSAGES", "GUILDS"],
});
client.login(bot.TOKEN);
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

// random hex id generator
const idGen = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/*
array type = [{userId: "", messages: [{id: "", channelId: "", message: ""}]}]
*/
const crosspostChecker = [];
function removeMessage(userId, id, channelId) {
    crosspostChecker.forEach((user, index) => {
        if (user.userId === userId) {
            user.messages.forEach((message, index) => {
                if (message.id === id && message.channelId === channelId) {
                    crosspostChecker[index].messages.splice(index, 1);
                }
            })
        }
    })
}


//message handler
client.on("messageCreate", async message => {
    if (message.author.bot || !message.content) return;
    if (ignoredItems.channels.includes(message.channel.id) || message.content.length < messages.mininmumLength) return; // remove message.content.length < 15 if you want to check smaller messages for crossposting
    if (ignoredItems.roles.some(role => message.member.roles.cache.has(role))) return;
    //to not affect ^^^^
    const id = idGen(8);
    if (!crosspostChecker.some(crosspost => crosspost.userId == message.author.id)) {
        crosspostChecker.push({
            userId: message.author.id,
            messages: [{id: id , channelId: message.channel.id, message: message.content}]
        });
        setTimeout(() => {
            removeMessage(message.author.id, id, message.channel.id);
        }, messages.timeToLive);
        return;
    }
    let index = crosspostChecker.map(object=> object.userId).indexOf(message.author.id);
    let prevMsgs = crosspostChecker[index].messages.filter(msg => msg.channelId !== message.channel.id) //remove .filter(message => message.channelId !== message.channelId) if you want it to check messages in the same channel too
    let prevMsg = prevMsgs.filter(msg => stringSimilarity.compareTwoStrings(message.content, msg.message) > messages.similarityValue);
    if (prevMsg.length > 0) {
    const similarityRatio = stringSimilarity.compareTwoStrings(message.content, prevMsg[0].message);
        let msg = await message.reply({embeds: [{
            title: "Anticrosspost",
            description: `Please do not crosspost your issues in different channels!\n\n**Message similarity:** ${(similarityRatio*100).toFixed(2)}%\n**Previous message:** ${prevMsg[0].message}\n**Previous channel**: <#${prevMsg[0].channelId}>`,
            color: 0xFF0000,
            timestamp: new Date(),
            footer: {
                text: `${message.author.username}#${message.author.discriminator}`
            }
        }], content: `<@${message.author.id}>`});
        message.delete();
        setTimeout(() => {
            msg.delete().catch(err=>{return;});
        }, 5000);
        return;
    }
    crosspostChecker[index].messages.push({id: id , channelId: message.channel.id, message: message.content});
    setTimeout(() => {
        removeMessage(message.author.id, id, message.channel.id);
    }, messages.timeToLive);
});


//run evals from console
process.stdin.on("data", (command)=>{
    const cmd = command.toString();
    try {
		let evaled = eval(cmd);
		if (typeof evaled !== "string")
			evaled = inspect(evaled);
			console.log(`${evaled}`);
		} catch (err) {
			console.log(`${err}`);
		}
});