import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true, // Let MongoDB auto-generate the _id
  },
  problem_id: {
    type: Number,
    required: true,
    unique: true,
    index: true, // Add an index for faster queries
  },
  title_slug: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove whitespace from both ends of the string
    index: true, // Add an index for faster queries
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create a compound index for potentially common query patterns
problemSchema.index({ problem_id: 1, title_slug: 1 });

const Problem = mongoose.models.problem_descriptions || mongoose.model("problem_descriptions", problemSchema);

export default Problem;