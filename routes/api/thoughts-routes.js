const router = require('express').Router();
const { Thought, Reaction } = require('../../models');

// find All Thoughts
router.get('', (req, res) => {
    Thought.findAll({
        // include: [
        //     { model: Thought }
        // ]
    }).then(thoughtData => {
        res.json(thoughtData);
    });
});

// find One Thought
router.get('', (req, res) => {
    Thought.findOne({
        include: [
            { model: Reaction }
        ],
        // where: {
        //     id: req.params.id
        // }
    }).then(thoughtData => {
        res.json(thoughtData);
    });
});

// create new Thought
router.post('', (req, res) => {
    Thought.create(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update Thought
router.put('', (req, res) => {
    Thought.update(
        {
            // id: req.body.id
        },
        {
            // where: {
            //     id: req.params.id,
            // },
        }
    )
    .then((updateThought) => {
        res.json(updateThought);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// delete Thought
router.delete('', (req, res) => {
    Thought.destroy({
        // where: {
        //     id: req.params.id,
        // },
    })
    .then((deleteThought) => {
        res.json(deleteThought);
    })
    .catch((err) => res.json(err));
});

module.exports = router;