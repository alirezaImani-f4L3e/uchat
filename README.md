# UT Chat 

A cli chat application based on Websocket .

## Prerequisite

`nodejs` and `npm` must be installed. To install, run the following command.

```bash
  apt-get install nodejs
  apt-get install npm
```

## Installation

Clone the repo : [https://github.com/alirezaImani-f4L3e/uchat.git](https://github.com/alirezaImani-f4L3e/uchat.git)

Within the repo run :

```bash
  npm install
```

Create a room

```bash
  npm run host
```
Share the room url with others.
To join a room run

```bash
  npm run join
```
and enter your name and url.

## Features

- Infinite Rooms can be created
- No limit on number of users
- Collects zero data
- Chats are never stored, and are deleted once room is destroyed.

**we are using ngrok to make a tunnel to hosts systems**
