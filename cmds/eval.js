module.exports.run = (bot, message, args) => {
    if(message.author.id !== "345349646253817857") return;
  
  
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
        if(message.author.id !== "345349646253817857") return;
        try {
          const code = args.join(" ");
          let evaled = eval(code);
           if (code.includes("process.env")) return;
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
}

module.exports.help = {
    name: "eval",
    alias: "eval"
}