import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost/react-backend/api/customer/address";

const Addresses = ({ customer }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    is_default: 0,
  });

  // Get customer ID from logged-in customer
  const customerId = customer?.id;

  // ==========================================
  // FETCH ADDRESSES
  // ==========================================
  const fetchAddresses = async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/list.php?customer_id=${customerId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses || []);
      } else {
        setError(data.message || "Failed to load addresses.");
      }
    } catch (err) {
      console.error("Address fetch error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Load addresses when component opens
  useEffect(() => {
    fetchAddresses();
  }, [customerId]);

  // ==========================================
  // FORM INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================
  const handleAddAddress = () => {
    setEditingAddress(null);

    setFormData({
      full_name: customer?.name || "",
      phone: customer?.phone || "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      is_default: addresses.length === 0 ? 1 : 0,
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================
  const handleEdit = (address) => {
    setEditingAddress(address);

    setFormData({
      full_name: address.full_name || "",
      phone: address.phone || "",
      address_line1: address.address_line1 || "",
      address_line2: address.address_line2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
      is_default: Number(address.is_default) || 0,
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ==========================================
  // SAVE ADDRESS
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const payload = {
      customer_id: customerId,
      ...formData,
    };

    try {
      const url = editingAddress
        ? `${API_BASE}/update.php`
        : `${API_BASE}/add.php`;

      const method = editingAddress ? "PUT" : "POST";

      if (editingAddress) {
        payload.address_id = editingAddress.address_id;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          editingAddress
            ? "Address updated successfully."
            : "Address added successfully."
        );

        setShowForm(false);
        setEditingAddress(null);

        await fetchAddresses();
      } else {
        setError(data.message || "Failed to save address.");
      }
    } catch (err) {
      console.error("Save address error:", err);
      setError("Unable to connect to the server.");
    }
  };

  // ==========================================
  // DELETE ADDRESS
  // ==========================================
  const handleDelete = async (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE}/delete.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          customer_id: customerId,
          address_id: addressId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Address deleted successfully.");
        await fetchAddresses();
      } else {
        setError(data.message || "Failed to delete address.");
      }
    } catch (err) {
      console.error("Delete address error:", err);
      setError("Unable to connect to the server.");
    }
  };

  // ==========================================
  // SET DEFAULT ADDRESS
  // ==========================================
  const handleSetDefault = async (address) => {
    setMessage("");
    setError("");

    const payload = {
      customer_id: customerId,
      address_id: address.address_id,
      full_name: address.full_name,
      phone: address.phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country || "India",
      is_default: 1,
    };

    try {
      const response = await fetch(`${API_BASE}/update.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Default address updated.");
        await fetchAddresses();
      } else {
        setError(data.message || "Failed to set default address.");
      }
    } catch (err) {
      console.error("Set default address error:", err);
      setError("Unable to connect to the server.");
    }
  };

  // ==========================================
  // NOT LOGGED IN
  // ==========================================
  if (!customerId) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <h3>My Addresses</h3>
          <p className="text-muted">
            Please login to manage your addresses.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">My Addresses</h2>
          <p className="text-muted mb-0">
            Manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={handleAddAddress}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Address
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border"></div>
          <p className="mt-3">Loading addresses...</p>
        </div>
      ) : addresses.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center border rounded p-5">
          <i
            className="bi bi-geo-alt"
            style={{ fontSize: "50px" }}
          ></i>

          <h4 className="mt-3">No addresses found</h4>

          <p className="text-muted">
            Add an address for faster checkout.
          </p>

          <button
            type="button"
            className="btn btn-dark"
            onClick={handleAddAddress}
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        /* ADDRESS LIST */
        <div className="row g-4">
          {addresses.map((address) => (
            <div className="col-lg-6" key={address.address_id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">

                  {/* TOP */}
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title mb-1">
                        {address.full_name}
                      </h5>

                      {Number(address.is_default) === 1 && (
                        <span className="badge bg-success">
                          Default
                        </span>
                      )}
                    </div>

                    <i
                      className="bi bi-house-door"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </div>

                  <hr />

                  {/* ADDRESS */}
                  <p className="mb-1">
                    {address.address_line1}
                  </p>

                  {address.address_line2 && (
                    <p className="mb-1">
                      {address.address_line2}
                    </p>
                  )}

                  <p className="mb-1">
                    {address.city}, {address.state}
                  </p>

                  <p className="mb-1">
                    {address.pincode}
                  </p>

                  <p className="mb-2">
                    {address.country}
                  </p>

                  <p className="mb-3">
                    <strong>Phone:</strong> {address.phone}
                  </p>

                  {/* ACTIONS */}
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => handleEdit(address)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleDelete(address.address_id)
                      }
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>

                    {Number(address.is_default) !== 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          handleSetDefault(address)
                        }
                      >
                        Set Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==========================================
          ADD / EDIT FORM
      ========================================== */}
      {showForm && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  {editingAddress
                    ? "Edit Address"
                    : "Add New Address"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="modal-body">

                  <div className="row g-3">

                    {/* FULL NAME */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* PHONE */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Phone
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* ADDRESS LINE 1 */}
                    <div className="col-12">
                      <label className="form-label">
                        Address Line 1
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* ADDRESS LINE 2 */}
                    <div className="col-12">
                      <label className="form-label">
                        Address Line 2
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={handleChange}
                        placeholder="Apartment, landmark, etc. (optional)"
                      />
                    </div>

                    {/* CITY */}
                    <div className="col-md-6">
                      <label className="form-label">
                        City
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* STATE */}
                    <div className="col-md-6">
                      <label className="form-label">
                        State
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* PINCODE */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Pincode
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Country
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* DEFAULT */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="is_default"
                          name="is_default"
                          checked={Number(formData.is_default) === 1}
                          onChange={handleChange}
                        />

                        <label
                          className="form-check-label"
                          htmlFor="is_default"
                        >
                          Set as default address
                        </label>
                      </div>
                    </div>

                  </div>
                </div>

                {/* FOOTER */}
                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark"
                  >
                    {editingAddress
                      ? "Update Address"
                      : "Save Address"}
                  </button>

                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Addresses;