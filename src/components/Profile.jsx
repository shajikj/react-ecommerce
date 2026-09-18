import { useState } from "react";
import "./Profile.css";

const Profile = ({ customer: sessionCustomer }) => {
  const [customer, setCustomer] = useState({
    name: sessionCustomer?.name || "",
    email: sessionCustomer?.email || "",
    phone: sessionCustomer?.phone || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    // Basic validation

    if (!customer.name.trim()) {

      setError("Name is required.");
      return;

    }


    if (!customer.email.trim()) {

      setError("Email is required.");
      return;

    }


    if (!customer.phone.trim()) {

      setError("Phone number is required.");
      return;

    }


    setMessage("Profile details updated for this session.");
  };


  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!sessionCustomer) {

    return (

      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-alert profile-alert-warning" role="alert">

          Please login to view your profile.

          </div>
        </div>
      </div>

    );

  }


  // =====================================================
  // PROFILE UI
  // =====================================================

  return (

    <main className="profile-page">
      <div className="profile-container">
        <section className="profile-card" aria-labelledby="profile-title">


            {/* HEADER */}

            <div className="profile-header">

              <div className="profile-avatar" aria-hidden="true">
                <i className="bi bi-person"></i>
              </div>
              <div>
              <h1 id="profile-title">
                My Profile
              </h1>

              <p>
                Update your personal information
              </p>
              </div>

            </div>


            {/* BODY */}

            <div className="profile-body">


              {/* SUCCESS MESSAGE */}

              {message && (

                <div
                  className="profile-alert profile-alert-success"
                  role="alert"
                >

                  {message}

                </div>

              )}


              {/* ERROR MESSAGE */}

              {error && (

                <div
                  className="profile-alert profile-alert-error"
                  role="alert"
                >

                  {error}

                </div>

              )}


              <form className="profile-form" onSubmit={handleSubmit}>


                {/* NAME */}

                <div className="profile-field">

                  <label
                    htmlFor="name"
                    className="profile-label"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="profile-input"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                {/* EMAIL */}

                <div className="profile-field">

                  <label
                    htmlFor="email"
                    className="profile-label"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="profile-input"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />

                </div>


                {/* PHONE */}

                <div className="profile-field">

                  <label
                    htmlFor="phone"
                    className="profile-label"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="profile-input"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />

                </div>


                {/* UPDATE BUTTON */}

                <div className="profile-actions">

                  <button
                    type="submit"
                    className="profile-submit"
                  >
                    <i className="ri-save-line me-1"></i>
                    Update Profile

                  </button>

                </div>


              </form>


            </div>

        </section>
      </div>
    </main>

  );

};


export default Profile;