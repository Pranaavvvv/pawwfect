const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  ownPets: {
    type: Boolean,
    required: true
  },
  petName: {
    type: String,
    trim: true
  },
  petType: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'turtle', 'rabbit', 'fish']
  },
  adoptionReason: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Adoption', AdoptionSchema);
