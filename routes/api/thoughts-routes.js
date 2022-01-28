const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models');

// find All Thoughts
router.get('/', async (req, res) => {
    const thoughts = await Thought.find();
    const result = [];
    thoughts.forEach((item) => {
        const reactionCount = item.reactionCount;
        result.push({item, reactionCount});
    });
    if(thoughts) {
        res.json(result);
    } else {
        res.end("No Data");
    };
});

// find One Thought
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const thought = await Thought.findOne({
        id: id,
    });
    if(thought) {
        res.json(thought);
    } else {
        res.end("No Data");
    };
});

// create new Thought
router.post('/', async (req, res) => {
    const dataThought = req.body;
    const username = req.body.username;
    const userId = req.body.userId;
    const thought = new Thought({
        thoughtText: dataThought.thoughtText,
        username: username,
    });
    thought.save();
    await User.updateOne(
        { _id: userId },
        { $push: { thoughts: thought[ "_id" ] } }
    );
    res.json(thought);
});

// update Thought
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const thought = await Thought.updateOne(
        { _id: id },
        req.body,
    );
    if(thought) {
        res.json(thought);
    } else {
        res.end("No Data");
    };
});

// delete Thought
router.delete('/:id', async (req, res) => {
    const thought = await Thought.remove({
        _id: req.params.id
    });
    if(thought) {
        res.json(thought);
    } else {
        res.end("No Data");
    };
});

// create new Reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    const reaction = new Reaction(req.body);
    reaction.save();
    const thoughtId = req.params.thoughtId;
    await Thought.updateOne(
        { _id: thoughtId },
        { $push: { reactions: reaction.reactionId } }
    );
    res.json(reaction);
});

// delete Reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thoughtId = req.params.thoughtId;
    await Thought.updateOne(
        { _id: thoughtId },
        { $pull: { reactions: req.params.reactionId } }
    );
    const reaction = await Reaction.remove({
        reactionId: req.params.reactionId
    });
    res.json(reaction);
});

module.exports = router;