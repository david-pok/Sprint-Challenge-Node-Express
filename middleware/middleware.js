module.exports = {
  project: function(req, res, next) {
    let { name, description } = req.body;
    if (!(name && description)) {
      next({ statusCode: 400 });
    }
    if (name.length > 128) {
      next({ message: 400 });
    }
    next();
  },

  action: function(req, res, next) {
    let { project_id, description, notes } = req.body;
    if (!(project_id, description, notes)) {
      next({ statusCode: 400 });
    }
    if (description.length > 128) {
      next({ statusCode: 400 });
    }
    next();
  }
};
