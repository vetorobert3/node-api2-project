const express = require('express');
const Db = require('../db.js');
const router = express.Router();

// Gets
// Retrieve posts
router.get('/', (req, res) => {
  Db.find()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "The posts information could not be retrieved."});
  });
});

// Retrieve particular post
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Db.findById(id)
  .then(post => {
    // if (post) {
    //   res.status(200).json(post);
    // } else {
    //   res.status(404).json({message: "The post with the specified ID does not exist." });
    // }
    post ? res.status(200).json(post) : res.status(404).json({ message: 'That Post ID Does NOT Exist' })
		})
		.catch(err => {
			res.status(500).json({ message: 'The Post Could Not Be Found' })
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: "The post information could not be retrieved."});
  });
});

// Retrieve comment from a particular id
router.get('/:id/comments', (req, res) => {
  Db.findPostComments(req.params.id)
    .then(messages => {
      if(messages.length > 0) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist.'})
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
  Db.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});

router.delete('/:id', (req, res) => {
  Db.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Db.update(req.params.id, changes)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

module.exports = router;