const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const fs = require('fs');
const wait = require('timers/promises').setTimeout;

module.exports = async (client) => {

    const commandFiles = await globPromise(`${process.cwd()}/Comandos/**/*.js`);
    const dirCommands = `${process.cwd()}/Comandos`;
    const dirConfig = `${process.cwd()}/Config.json`

    if (!fs.existsSync(dirConfig)) {
        fs.writeFile(dirConfig, `
        {
            "prefix": "!"
        }
        `, function (err) {
            if (err) throw err;
            console.log('Config Criada, Configure Seu Prefixo Por Lá');
        })
    }

    if (!fs.existsSync(dirCommands)) {
        fs.mkdirSync(dirCommands)
        fs.writeFile(`${dirCommands}/Demo.js`, `module.exports = {
            name: "demo",
            aliases: ["demonstração"],
        
            run: async (client, message) => {

                message.reply('Hello World')
        
            }
        }`, function (err) {
            if (err) throw err;
            console.log('Pasta De Comandos E Comando Demo Criados Com Sucesso, Isto Só Será Executado Na Primeira Inicialização');
        });
    }

    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    
    await wait(3000);
    require("../Events/Message_Create")
    require("../Events/Main")


};