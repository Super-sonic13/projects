import { PermissionFlagsBits, TextChannel } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "greet",
    execute: (message) => {
        let toGreet = message.mentions.members?.first();
        (message.channel as TextChannel).send(`Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`)
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers] // to test
}

export default command