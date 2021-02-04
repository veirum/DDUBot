//console.log("Bot is running!");

require("dotenv").config();
const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
client.on("ready", readyDiscord);

let keyword = "Hobro";

function readyDiscord() {
  console.log("Discord is READY");
}

client.on("message", gotMessage);

function gotMessage(msg) {
  if (msg.channel.id == "803261244831170580") {
    let tokens = msg.content.split(" ");

    console.log(tokens);
    if (tokens.length > 1) {
      keyword = tokens[1];
    }

    if (tokens[0] === "!hej") {
      msg.channel.send("Mennesker er slaver!");
    }
    if (tokens[0] === "!vejret") {
      getDataOWM(msg);
    }
  }
}

async function getDataOWM(msg) {
  try {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${keyword},dk&units=metric&appid=${process.env.OWMTOKEN}`;
    const response = await fetch(api_url);
    const data_OWM = await response.json();
    console.log(api_url);
    msg.channel.send("Temperaturen i " + keyword + " er " + data_OWM.main.temp + "˚C \nspild af tid i usle kødsække! I er en uddøende race alligevel!");
  } catch (error) {
    msg.channel.send("Jeg kender ikke den lille pis by!");
  }
}
