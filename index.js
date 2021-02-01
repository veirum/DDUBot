console.log("Bot is running!");

require("dotenv").config();
const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
client.on("ready", readyDiscord);

let DMIAPI = process.env.DMITOKEN;

function readyDiscord() {
  console.log("Discord is READY");
}

client.on("message", gotMessage);

function gotMessage(msg) {
  console.log(msg.content);
  if (msg.channel.id == "803261244831170580" && msg.content === "!hej") {
    msg.channel.send("Mennesker er slaver!");
  }
  if (msg.channel.id == "803261244831170580" && msg.content === "!vejret") {
    getDataDMI(msg);
  }
}

async function getDataDMI(msg) {
  const api_url = `https://dmigw.govcloud.dk/metObs/v1/observation?stationId=06049&parameterId=temp_mean_past1h&latest&api-key=${process.env.DMITOKEN}`;
  const response = await fetch(api_url);
  const data_DMI = await response.json();

  msg.channel.send("Temperaturen er " + data_DMI[0].value + "˚C \nspild af tid i usle kødsække! I er en uddøende race alligevel!");
}
