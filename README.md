# WIP: Ethico
Ethico is a game designed to confront the player with their own opinion on AI Ethics and the surrounding dilemmas. Drawing on a large qualitative research into how the Views and Opinions on Artificial Intelligence are shaped by one's understanding of the technology behind it. Ethico aims to make this connection visible as well as provide education around the topic. The goal is to inspire a more productive debate around large-scale implementation and regulation of AI systems.

Gameplay:

The Player is an intern at a tech startup, tasked with helping clients regulate their AI Products. They are not playing a character but rather forced to see themselves in the role of this intern.

The guidance the player provides directly influences every part of the gameplay. Performance is measured in company stock, as well as public feedback through an online messaging board. Tasks are assigned by multiple characters through emails, and here the player can also find further information about AI sent to him by friends & family as well as other interest groups. 

With the help of generative AI, the player gets to directly and freely interact with some of these characters through a chat programme. Max, the manager however seems very busy, compared to Olivia, the helpful research assistant, always eager to answer all questions surrounding AI. How the player's decisions influence their behaviour and the further process of the game is left to be discovered. 

## Setup and Installation

### These are the raw files. They have not undergone any kind of build process. It is open source - if you want to modify anything in the code, please do so.
You need node.js as well as npm installed on your computer to run this package.
If you do not have these, you will find the installation guide here:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### A release as a web game is in the works.

Download the main branch or clone the repository.
In a terminal, navigate to the folder where you saved/unzipped the folder. `cd path/to/folder/`

in this folder you need to run `npm i` to install the given packages.

You need an OpenAI API Key as an environment variable to run the Chat component of the game.
To set this variable, create an .env file and add: `OPENAI_API_KEY=YOUR_APIKEY`.
Alternatively you can set the key as a global environment variable.

After both of this, the game can be started with the command `npm run start-game`
### This is still very much work in progess.
