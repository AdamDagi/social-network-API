const router = require('express').Router();
const { Thought, Reaction } = require('../../models');

// find All Thoughts
router.get('/', async (req, res) => {
    const thoughts = await Thought.find();
    if(thoughts) {
        res.json(thoughts);
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
router.post('/', (req, res) => {
    const dataThought = req.body;
    const thought = new Thought(dataThought);
    thought.save();
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

module.exports = router;