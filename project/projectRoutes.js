const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();
const mWare = require("../middleware/middleware.js");

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
      res.status(500).json({ error: "could not get" });
    });
});

router.get("/:id/actions/:id", (req, res) => {
  const id = req.params.id;
  db.getProjectActions(id)
    .then(projId => {
      console.log(projId);
      res.status(200).json(projId);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "could not get" });
    });
});

router.post("/", mWare.project, (req, res) => {
    db.insert(req.body)
      .then(proj => {
        res.status(201).json(proj);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ error: "could not post" });
      });
});

router.put("/:id", mWare.project, (req, res) => {
  db.update(req.params.id, req.body)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "could not update" });
    });
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
    .then(proj => {
        res.status(200).json({message: "deleted"});
    })
    .catch(err => {
        console.log("error", err);
        res.status(500).json({message: "could not delete"});
    });
});

module.exports = router;
