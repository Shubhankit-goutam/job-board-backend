const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Job = require("../models/Job");

// Utility: Handle validation errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
};

// @route   GET /api/jobs
// @desc    Get all jobs or filter by search query
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: "fail",
        message: "Job not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error.message);
    res.status(400).json({
      status: "error",
      message: "Invalid job ID",
    });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job posting
// @access  Public
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Job title is required"),
    body("company").notEmpty().withMessage("Company name is required"),
    body("type")
      .isIn(["Full-time", "Part-time"])
      .withMessage("Job type must be Full-time or Part-time"),
    body("location").notEmpty().withMessage("Job location is required"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),
  ],
  async (req, res) => {
    // Handle validation errors
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return;

    const { title, company, type, location, description } = req.body;

    try {
      const newJob = new Job({ title, company, type, location, description });
      await newJob.save();

      res.status(201).json({
        status: "success",
        message: "Job posted successfully",
        data: newJob,
      });
    } catch (error) {
      console.error("Error creating job:", error.message);
      res.status(500).json({
        status: "error",
        message: "Failed to create job",
      });
    }
  }
);

module.exports = router;
