const router = require('express').Router();
const { User, Thought } = require('../../models');

// find All Users
router.get('/', async (req, res) => {
    const users = await User.find();
    const result = [];
    users.forEach((item) => {
        const friendCount = item.friendCount;
        result.push({item, friendCount});
    });
    if(users) {
        res.json(result);
    } else {
        res.end("No Data");
    };
});

// find One User
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        id: id,
    });
    if(user) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// create new User
router.post('/', (req, res) => {
    const dataUser = req.body;
    const user = new User(dataUser);
    user.save();
    res.json(user);
});

// update User
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.updateOne(
        { _id: id },
        req.body,
    );
    if(user) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// delete User
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const delUser = await User.findOne({
        _id: id,
    });
    const thoughtsId = delUser.thoughts;
    thoughtsId.forEach( async (thoId) => {
        const delThought  = await Thought.remove({
            _id: thoId 
        });
    });
    const user = await User.remove({
        _id: id
    });
    if(user) {
        res.json(user);
    } else {
        res.end("No Data");
    };
});

// create new Friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.updateOne(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } }
    );
    res.json(user);
});

// delete Friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.updateOne(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
    );
    res.json(user);
});

module.exports = router;