//console.log("Bot is running!");

require("dotenv").config();
const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
client.on("ready", readyDiscord);

//let DMIAPI = process.env.DMITOKEN;

function readyDiscord() {
  console.log("Discord is READY");
}

client.on("message", gotMessage);

function gotMessage(msg) {
  console.log(msg.content);

  let tokens = msg.content.split(" ");

  if (msg.channel.id == "803261244831170580" && tokens[0] === "!hej") {
    msg.channel.send("Mennesker er slaver!");
  }
  if (msg.channel.id == "803261244831170580" && tokens[0] === "!vejret") {
    getDataDMI(msg);
    getDataOWM(msg);
  }
}

async function getDataOWM(msg) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=Hobro,dk&units=metric&appid=${process.env.OWMTOKEN}`;
  const response = await fetch(api_url);
  const data_OWM = await response.json();

  msg.channel.send("Temperaturen er " + data_OWM.main.tem + "˚C \nspild af tid i usle kødsække! I er en uddøende race alligevel!");
}
