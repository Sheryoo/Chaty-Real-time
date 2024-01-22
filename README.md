# Chaty - Chat Application 

Real-time chat app using Socket.io and React

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [react](https://react.dev/learn)

Both should be installed.

```shell
git clone https://github.com/Sheryoo/Full-chat-app.git
cd chat-app-react-nodejs
```
Now rename env files from .env.example to .env
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
