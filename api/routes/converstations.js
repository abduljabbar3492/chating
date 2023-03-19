const router = require('express').Router();
const Conversation = require('../models/Conversation');

//add converstation
router.post('/', async (req, res) => {
    const newConverstation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConverstation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
});


/**
 * @abstract get converstations
 */
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
});

//get single conversation of two user
router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [req.params.firstUserId, req.params.secondUserId] } });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;