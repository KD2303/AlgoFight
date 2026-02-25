const Joi = require('joi');

const joinFriendRoomSchema = Joi.object({
    roomId: Joi.string().required()
        .messages({
            'any.required': 'Room ID is required'
        })
});

module.exports = { joinFriendRoomSchema };
