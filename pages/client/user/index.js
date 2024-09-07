"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "./user.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client"; // Import the Auth0 user hook

const ClientLayout = dynamic(() =>
  import("../../../app/components/client/layoutClient/LayoutComponent")
);

function UserProfile() {
  const { user, error, isLoading, mutate } = useUser(); // Fetch the logged-in user from Auth0
  const [userId, setUserId] = useState(null); // State to store Auth0 user ID
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit modes

  // Fetch the Auth0 user ID (auth_id) once the Auth0 user is available
  useEffect(() => {
    if (user && user.sub) {
      setUserId(user.sub); // Set the Auth0 user ID (sub is the auth_id)
      const initialValues = {
        email: user.email || "",
        username: user.username || "",
        phone: user.phone_number || "",
      };

      setFormData(initialValues);
    }
  }, [user]);

  const validateForm = () => {
    const errors = {};
    const phonePattern = /^\+[0-9]{1,15}$/; // E.164 format
    const usernamePattern = /^[a-zA-Z0-9_+\-\.!#$'^`~@]+$/; // Allow only alphanumeric and the specified characters

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (formData.phone && !phonePattern.test(formData.phone)) {
      errors.phone = "Phone number must be in E.164 format (e.g. +14155552671)";
    }

    if (formData.username && !usernamePattern.test(formData.username)) {
      errors.username =
        "Username can only contain alphanumeric characters and '_', '+', '-', '.', '!', '#', '$', ''', '^', '`', '~', and '@'";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before submitting
    setLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          auth_id: user.sub, // Auth0 User ID
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setIsEditing(false); // Close the form after successful update
        console.log("Profile updated:", result);

        await mutate(); // Refetch user profile to reflect latest data
      } else {
        console.error("Error updating profile:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccess(false); // Reset success message when editing starts
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Cancel editing and return to view mode
  };

  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return (
      <p className={styles.error}>
        Error fetching user profile: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!user) {
    return <p>No user logged in. Please log in to view your profile.</p>;
  }

  return (
    <ClientLayout>
      <div className={styles.profileContainer}>
        <h1>User Profile</h1>

        {success && (
          <p className={styles.success}>Profile updated successfully!</p>
        )}

        {/* Render user information if not editing */}
        {!isEditing && (
          <div className={styles.userInfo}>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Username:</strong> {formData.username || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone || "N/A"}
            </p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}

        {/* Render form if editing */}
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <div className={styles.userInfo}>
              <label>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <p className={styles.error}>{formErrors.email}</p>
                )}
              </label>

              <label>
                <strong>Username:</strong>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>

              <label>
                <strong>Phone:</strong>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +14155552671"
                />
                {formErrors.phone && (
                  <p className={styles.error}>{formErrors.phone}</p>
                )}
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </ClientLayout>
  );
}

export default UserProfile;
