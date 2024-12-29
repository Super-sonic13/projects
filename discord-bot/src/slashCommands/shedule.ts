import { SlashCommandBuilder } from "discord.js";
import { SlashCommand, ScheduleEvent } from "../types";
import axios from 'axios'

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("my-schedule")
        .addStringOption(option => option
            .setName("explorerid")
            .setDescription("Input your explorer ID")
            .setRequired(true)
        )
        .setDescription("Sends internship schedule."),

    execute: async (interaction) => {
        try {
            await interaction.deferReply({ ephemeral: true });
            let events: string[] = [];
            const user = interaction.user;
            const explorerId = interaction.options.getString("explorerid")?.trim();

            const response = await axios.get(`http://52.57.170.54:5000/api/interns/${explorerId}/cohort-schedule`);
            const schedule: any = response.data;

            const closestFutureEvent = schedule.reduce((closestEvent: ScheduleEvent, currentEvent: ScheduleEvent) => {
                const currentDate = new Date();
                const currentEventDate = new Date(currentEvent.eventDate);
            
                return (currentEventDate > currentDate && (closestEvent === null || currentEventDate < new Date(closestEvent.eventDate)))
                    ? currentEvent
                    : closestEvent;
            }, null);

            schedule.forEach((event: ScheduleEvent) => {
                let { eventDate, eventName } = event;

                const isClosestEvent = closestFutureEvent.eventDate === eventDate;

                eventDate = eventDate
                ? new Date(event.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })
                : "Will share dates later";

                events.push(`🗓 **${eventDate}**: ${eventName} ${isClosestEvent ? '👈' : ''}`, '────────────────────────────────')
            })
            
            const scheduleMessage = `👋 Hey there! Here's what's coming up for you. 👈  This checkmark indicates the closest event for you. \n\n${events.join('\n')}`
            
            user.send(scheduleMessage);

            return interaction.editReply({ content: "Your schedule was successfully sent in private messages." });
        } catch (error) {
            interaction.editReply({ content: `Something went wrong... ${error}`, });
        }
    },
    cooldown: 10
};

export default command;
