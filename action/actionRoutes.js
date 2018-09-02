const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();
const mWare = require("../middleware/middleware.js");
const projDb = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    let response = await db.get();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let response = await db.get(req.params.id);
    return res.status(200).json(response);
  } catch (err) {
    nexxt(err);
  }
});

router.post("/", mWare.action, async (req, res) => {
  try {
    let proj = await projDb.get(req.body.project_id);
    if (!proj) {
      return res.status(400).json({ message: "needKey" });
    }
    let response = await db.insert(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", mWare.action, async (req, res) => {
  try {
    let proj = await projDb.get(req.body.project_id);
    if (!proj) {
      res.status(400).json({ message: "needKey" });
    }
    let response = await db.update(req.params.id, req.body);
    if (!response) {
      res.status(400).json({ message: "needParam" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", mWare.action, async (req, res) => {
    try{
        let response = await db.remove(req.params.id);
        if (response) {
            res.status(200).json({ message: "deleted" });
        }
        res.status(400).json({ message: "fail" });
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
