const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require('../../JSON/config.json');
module.exports = {
    name: "lock",
    // aliases: [`mcount`, `membercount`],
    category: 'Moderation',
    description: "Lock the channel!",
    cooldown: 5,
    UserPerms: ["ADMINISTRATOR"],
    BotPerms: ["MANAGE_CHANNELS"],
    run: async (client, message, args, prefix) => {
        const channel = message.channel
	// 	const helpEmbed = new MessageEmbed()
    //   .setColor('RANDOM')
    //   .setTitle(`:x: You are missing ADMINISTRATOR permission!`)
    //   .setFooter("Requested by @" + message.author.username);
    // if (!message.member.permissions.has('ADMINISTRATOR')) 
    //   return message.reply({ embeds: [helpEmbed] })
		if (!args[0]){
			const helpEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Usage:`)
	  .setDescription(`🔒: .lock on | 🔓: .lock off`)
	  .setImage(db.get(`banner-${message.guild.id}`))
      .setFooter("Requested by @" + message.author.username);
      return message.reply({ embeds: [helpEmbed] })
		}
        // if (!message.member.permissions.has('MANAGE_MESSAGES')) 
		// return message.channel.send(':x: You are missing **BAN_MEMBERS** permission!')
		
		if (args[0] === 'on') {
				channel.permissionOverwrites.edit(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				}).then(() => {
					channel.setName(channel.name += '🔒');
				});
			// return message.channel.send(':white_check_mark: 🔒 Locked all channels');
			const helpEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`🔒 Locked the channels`)
	  .setImage(db.get(`banner-${message.guild.id}`))
      .setFooter("Requested by @" + message.author.username);
      return message.reply({ embeds: [helpEmbed] })


		} if (args[0] === 'off') {
				channel.permissionOverwrites.edit(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				}).then(() => {
					channel.setName(channel.name.replace('🔒', ''));
				});
			// return message.channel.send('🔒🗝️ Unlocked all channels');
			const helpEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`🔓 Unlocked the channels`)
	  .setImage(db.get(`banner-${message.guild.id}`))
      .setFooter("Requested by @" + message.author.username);
      return message.reply({ embeds: [helpEmbed] })
		}
		return '';
	},
};