//controller for the thought model, not mindcontrol, yet - this feature is still in development
//derived on activity 26

const { Thought, User } = require("../models"); // need to add reaction?

module.exports = {
  async getThoughts(req, res) {
    //get all
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneThought(req, res) {
    //get one with this ID
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought matching this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createdThough(req, res) {
    //make one
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought Created, but no user of this Id found",
        });
      }
      res.json("Thought created");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ messag: "No thought with this ID found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID found" });
      }
      const user = await User.findOneAndUpdate(
        //i think this removes the thought from the user, need to test
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: "Thought removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
//add tag in activity 26 but use for reactions??
