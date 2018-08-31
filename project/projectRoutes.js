const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "could not get" });
    });
});

router.get("/:id", (req, res) => {
    db.get(req.params.id)
    .then(proj => {
        res.status(200).json(proj);
    })
    .catch(err => {
        console.error("error", err);
        res.status(500).json({error: "could not get"});
    });
});

module.exports = router;