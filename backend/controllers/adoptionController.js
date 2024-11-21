const Adoption = require('../models/Adoption');

exports.createAdoption = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      ownPets,
      petName,
      petType,
      adoptionReason
    } = req.body;

    if (!firstName || !lastName || !email || !petType || !adoptionReason) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    const existingApplication = await Adoption.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({ 
        message: 'An application with this email already exists' 
      });
    }

    const newAdoption = new Adoption({
      firstName,
      lastName,
      email,
      ownPets: ownPets === 'yes',
      petName: ownPets === 'yes' ? petName : undefined,
      petType,
      adoptionReason
    });

    await newAdoption.save();

    res.status(201).json({
      message: 'Adoption application submitted successfully',
      application: newAdoption
    });
  } catch (error) {
    console.error('Adoption submission error:', error);
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: error.message 
    });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Adoption.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving applications',
      error: error.message 
    });
  }
};
