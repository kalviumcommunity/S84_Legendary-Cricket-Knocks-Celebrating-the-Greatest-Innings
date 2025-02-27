const { Schema, model } = require("mongoose");

const username = new Schema(
    {
        playerName: {
            type: String,
            required: true,
        },

        Runs: {
            type: Number,
            required: true,
        },

        Balls: {
            type: Number,
            required: true,
        },

        Country: {
            type: String,
            required: true,
            username: true, 
        },

        Opponent: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = model('userData', username)

module.exports = userModel