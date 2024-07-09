#!/usr/bin/env node

console.clear();
const io = require("socket.io")();
const chalk = require("chalk");
const localtunnel = require('localtunnel');
const net = require("net");
const CLI = require('clui');

const server = net.createServer();

// check port availability
let port = 43777;
server.once('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.error(chalk.red(`port : ${port} already in used . please close all processes listening on port ${port} to use uchat .`));
    process.exit();
  }
});
server.once('listening', function () {
  server.close();
});
server.listen(port);

const Spinner = CLI.Spinner;
var countdown = new Spinner('Starting Up  ', ['◜', '◠', '◝', '◞', '◡', '◟']);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(500)
  .then(() => countdown.start())
  .then(() => sleep(500))
  .then(() => countdown.stop())
  .then(() => {
    io.listen(port);

    const users = {};

    (async () => {
      const tunnel = await localtunnel({ port: port });
      console.log(chalk.bold.green("[i] Your chat url is:  " + chalk.bold.red(tunnel.url) + ". Run `uchat-join` on another terminal window and enter this url to join. Send this url to your friends and ask them to paste this link in the console after running `uchat-join`. "));

      console.log(" ");
      console.log(chalk.white("======================= CHAT ROOM ======================="));
      console.log(" ");
      console.log(" ");
    })();

    console.log(chalk.bold.blue("Made by Alireza Imani"));
    console.log(" ");
    console.log(" ");
    console.log(chalk.bold.bgGreen("===== CHATROOM LOGS(Press CTRL+Q to destroy room) ====="));


    io.on("connection", (socket) => {
      socket.on('new user', (name) => {
        console.log(chalk.bold.green(`${name} joined chat.`))
        users[socket.id] = chalk.bold.yellow(name);
        socket.broadcast.emit("message", ` `);
        socket.broadcast.emit("message", chalk.bgYellow(`${name} joined the chat.`));
        socket.broadcast.emit("message", ` `);
      });

      socket.on('message', (text) => {
        socket.broadcast.emit("message", `${users[socket.id]} > ${text}`);
        console.log(`${users[socket.id]} > ${text}`)
      });

    });


    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (key) {
      // ctrl-c ( end of text )
      if (key === '\u0011') {
        (async function () { await ngrok.disconnect(url); }());
        process.exit();
      }
      process.stdout.write(key);
    });
  })