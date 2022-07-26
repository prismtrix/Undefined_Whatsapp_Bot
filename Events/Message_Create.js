const client = require("../Src/Connect");
const { prefix } = require(`${process.cwd()}/Config.json`)
console.log('Comandos Carregados')

client.on("message_create", async (message) => {

    const [cmd, ...args] = message.body.slice(prefix.length).trim().split(" ");

    let command = client.commands.get(cmd) || client.commands.find(c => c.aliases?.includes(cmd))

    if (!command) return

    await command.run(client, message, args);
});