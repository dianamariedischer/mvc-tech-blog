const router = require("express").Router();
const { Post } = require("../../models");

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