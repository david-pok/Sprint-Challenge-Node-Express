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
      res.status(500).json({ error: "could not get" });
    });
});

// router.get("/:id/:projectId", (req, res) => {
//   const { id } = req.params.projectId;
//   db.getProjectActions(id)
//     .then(projId => {
//       res.status(200).json(projId);
//     })
//     .catch(err => {
//       console.error("error", err);
//       res.status(500).json({ error: "could not get" });
//     });
// });

router.post("/", (req, res) => {
    if(req.body.name.length < 128) {
        db.insert(req.body)
        .then(proj => {
            res.status(201).json(proj);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({error: "could not post"});
        });
    } else {
        res.status(401).json({ error: "too long"});
    }
});

router.put("/:id", (req, res) => {
    db.update(req.params.id, req.body)
    .then(proj => {
        res.status(200).json(proj);
    })
    .catch(err => {
        console.log("error", err);
        res.status(500).json({message: "could not update"});
    });
});

module.exports = router;
