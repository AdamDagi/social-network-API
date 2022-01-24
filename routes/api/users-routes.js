const router = require('express').Router();
const { User, Thought } = require('../../models');

// find All Users
router.get('', (req, res) => {
    User.findAll({
        include: [
            { model: Thought }
        ]
    }).then(userData => {
        res.json(userData);
    });
});

// find One User
router.get('', (req, res) => {
    User.findOne({
        include: [
            { model: Thought }
        ],
        where: {
            id: req.params.id
        }
    }).then(userData => {
        res.json(userData);
    });
});

// create new User
router.post('', (req, res) => {
    User.create(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update User
router.put('', (req, res) => {
    User.update(
        {
            id: req.body.id
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((updateUser) => {
        res.json(updateUser);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// delete User
router.delete('', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((deleteUser) => {
        res.json(deleteUser);
    })
    .catch((err) => res.json(err));
});

module.exports = router;