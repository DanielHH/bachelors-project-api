För att köra detta projekt i vscode behöver man skapa en fil som heter "database-config.ts" med innehållet

export const dbconfig = {

	host: "nlsn.se",
    username: "ANVÄNDARNAMN",
    password: "LÖSENORD!",
    db: "DATABASNAMN"

};

samt skriva "npm install -g ts-node" i terminalen.

För att starta projektet är det bara att skriva "ts-node main.ts" i terminalen.
