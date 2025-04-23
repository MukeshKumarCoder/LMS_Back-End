const Leave = require("../models/LeaveModel");
const User = require("../models/UserModel");

exports.applyLeave = async (req, res) => {
  try {
    // get data from body
    const { leaveType, fromDate, toDate, reason } = req.body;

    // validate data
    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create leave request
    const leave = await Leave.create({
      userId: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    // return response
    return res.status(201).json({
      success: true,
      message: "Leave Applied Successful",
      leave,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "failed to apply leave",
    });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });

    // return response
    return res.status(200).json({
      success: true,
      message: "Got the leaves",
      leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to Get leave",
    });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("userId", "name email");

    // return response
    return res.status(200).json({
      success: true,
      message: "Got all the leaves",
      leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to Get all leave",
    });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    res.json(leave);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update leave",
    });
  }
};
