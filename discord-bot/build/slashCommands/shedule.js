"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("my-schedule")
        .addStringOption(option => option
        .setName("explorerid")
        .setDescription("Input your explorer ID")
        .setRequired(true))
        .setDescription("Sends internship schedule."),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield interaction.deferReply({ ephemeral: true });
            let events = [];
            const user = interaction.user;
            const explorerId = (_a = interaction.options.getString("explorerid")) === null || _a === void 0 ? void 0 : _a.trim();
            const response = yield axios_1.default.get(`http://52.57.170.54:5000/api/interns/${explorerId}/cohort-schedule`);
            const schedule = response.data;
            const closestFutureEvent = schedule.reduce((closestEvent, currentEvent) => {
                const currentDate = new Date();
                const currentEventDate = new Date(currentEvent.eventDate);
                return (currentEventDate > currentDate && (closestEvent === null || currentEventDate < new Date(closestEvent.eventDate)))
                    ? currentEvent
                    : closestEvent;
            }, null);
            schedule.forEach((event) => {
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
                events.push(`🗓 **${eventDate}**: ${eventName} ${isClosestEvent ? '👈' : ''}`, '────────────────────────────────');
            });
            const scheduleMessage = `👋 Hey there! Here's what's coming up for you. 👈  This checkmark indicates the closest event for you. \n\n${events.join('\n')}`;
            user.send(scheduleMessage);
            return interaction.editReply({ content: "Your schedule was successfully sent in private messages." });
        }
        catch (error) {
            interaction.editReply({ content: `Something went wrong... ${error}`, });
        }
    }),
    cooldown: 10
};
exports.default = command;
