module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
        const {channel, content, guild, author} = message;
		if(content.toLowerCase().startsWith(`${client[1].config.prefix}jdlogs delete`)){
            const tUser = await message.guild.members.cache.get(author.id);
			if(!tUser.permissions.has("ADMINISTRATOR")) return message.reply({content: "⛔ | Missing Permissions to use this command.\nNeeded permission flag: `ADMINISTRATOR`"})
            const channels = JSON.parse(LoadResourceFile(GetCurrentResourceName(), '/config/channels.json'));
            const args = content.split(" ")
            message.delete()

            if(!channels[args[1]]){
                return channel.send(`⛔ **|** No channel found with name: \`${args[1]}\``)
            }
            let dc = await guild.channels.cache.find(cc => cc.id === channels[args[1]].channelId) ?? null;
            try {
                await dc.delete();
                delete channels[args[1]];
            } catch {
                return channel.send(`⛔ **|** Could not delete channel <#${dc.id}}> for \`${args[1]}\``);
            }
            const newChannels = JSON.stringify(channels)
            SaveResourceFile(GetCurrentResourceName(), '/config/channels.json', newChannels);
		}
	},
};