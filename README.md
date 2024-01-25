# Chaty - Chat Application 

### Real-time chat app using Socket.io and React
![login page](./images/login.png)


![Chats page](./images/chat.png)

## Installation Guide

### Requirements
- [Node.js](https://nodejs.org/en/download)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

Both should be installed.

- [React](https://react.dev/learn)

You should have the basic knowledge to deal with code.

```shell
git clone https://github.com/Sheryoo/Chaty-Real-time.git
cd Chaty-Real-time
```
Now rename env files from .env.example to .env and add your *API_KEYS*
```shell
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
cd ..
```

Now install the dependencies
```shell
cd server
yarn
cd ..
cd public
yarn
```
We are almost done, Now just start the development server.

For Frontend.
```shell
cd public
yarn start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell
cd server
yarn start
```

Done! Now open localhost:3000 in your browser.
