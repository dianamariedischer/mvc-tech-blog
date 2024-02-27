const router = require("express").Router();
const { Post } = require("../../models");

// add new post
router.post("/", async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.userId,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update post
router.put('/:id', (req, res) => {
    // update a post by its `id` value
    Post.update(
      {
        // updates the title and text from req.body
        title: req.body.title,
        text: req.body.text
      },
      {
        // gets the post based on the id in the parameters
        where: {
          id: req.params.id,
        },
      })
  
      .then((updatedPost) => {
        return res.json(updatedPost);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      }
    );
  });

// delete post
router.delete("/:id", async (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            // delete post by its id
            where: {
              id: req.params.id,
            },
        });

        res.status(200).json(dbPostData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;