const Discord = require("discord.js")
const Omegle = require("omegle-node")

const bot = new Discord.Client()
const om = new Omegle()

const TOKEN = ""
const PREFIX = "~"

var session = false

var omchannel

var chatter 

om.on("waiting", () => {
    if (session == true) {
        omchannel.send("Waiting for stranger")
    }
})

om.on("connected", () => {
    omchannel.send("Connected")
})

om.on("gotMessage", function(msg) {
    omchannel.send(`Stranger: ${msg}`)
})

om.on("strangerDisconnected", () => {
    omchannel.send("Stranger Disconnected")
})

bot.on("ready", function(message) {
    console.log("Status >> Online")
})

bot.on("message", function(message) {
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ")

    switch(args[0]) {

        case "chat":
            session = true
            omchannel = message.channel
            om.connect()
            chatter = message.author
            break
        case "end": 
            if (session == true && message.author == chatter) {
                om.disconnect()
                message.channel.send("Disconnected")
            }
            break

    }

})

bot.on("message", (omsg) => {
    if (session == true) {
        if (omsg.author == chatter) {
            om.send(omsg.content)
        }
    }
})

bot.login(TOKEN)

