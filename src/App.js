import React, { useState } from "react";
import axios from "axios";  // Import Axios
import bgVideo from './bg2.mp4';
import "./App.css";

function App() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: e.target["first-name"].value,
      lastName: e.target["last-name"].value,
      email: e.target["email"].value,
      ownPets: e.target["own-pets"].value,
      petName: e.target["pet-name"].value || undefined,
      petType: e.target["pet-type"].value,
      adoptionReason: e.target["reason"].value,
    };

    try {
      // Use Axios to send POST request
      const response = await axios.post('http://localhost:5000/api/adoption/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setShowThankYou(true);
      } else {
        alert(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex-center">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Container */}
      <div className="form-container">
        {!showThankYou ? (
          <form id="adoption-form" onSubmit={handleSubmit} className="form">
            <div className="text-center">
              <h1 className="title">PET ADOPTION FORM</h1>
            </div>

            <div className="grid">
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="John"
                  required
                  className="input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Doe"
                  required
                  className="input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">Do You Own Pets</label>
              <div className="radio-group">
                <label className="inline-flex">
                  <input
                    type="radio"
                    id="yes"
                    name="own-pets"
                    value="yes"
                    required
                    className="radio"
                  />
                  <span className="radio-label">Yes</span>
                </label>
                <label className="inline-flex">
                  <input
                    type="radio"
                    id="no"
                    name="own-pets"
                    value="no"
                    required
                    className="radio"
                  />
                  <span className="radio-label">No</span>
                </label>
              </div>
            </div>

            <div id="pet-details" className="form-group">
              <label htmlFor="pet-name" className="label">
                Pet Name
              </label>
              <input
                type="text"
                id="pet-name"
                name="pet-name"
                placeholder="Buddy"
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pet-type" className="label">
                Select Pet Type
              </label>
              <select id="pet-type" name="pet-type" required className="input">
                <option value="" disabled selected>
                  Select a Pet
                </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="turtle">Turtle</option>
                <option value="rabbit">Rabbit</option>
                <option value="fish">Fish</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reason" className="label">
                Why do you want to adopt a Pet
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                placeholder="Your reason..."
                required
                className="input"
              ></textarea>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-submit">
                SUBMIT
              </button>
              <button type="reset" className="btn btn-reset">
                RESET
              </button>
            </div>
          </form>
        ) : (
          <div className="thank-you">
            <h2 className="thank-you-title">Thank you for your submission!</h2>
            <p>We will review your application and get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
