const router = require('express').Router();
const { User, Thought } = require('../../models');

// find All Users
router.get('/', (req, res) => {
    const users = User.find({});
    console.log(users);
    if(users) {
        res.end(users.toObject());
    } else {
        res.end("No Data");
    };
});

// find One User
router.get('', (req, res) => {
    // const users = await User.findOne({});
    // if(users) {
    //     res.end(users);
    // } else {
    //     res.end("No Data");
    // };
});

// create new User
router.post('/', (req, res) => {
    const dataUser = req.body;
    const user = new User(dataUser);
    user.save();
    res.end("ok");
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