import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaEdit, FaSave, FaTimes, } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { useOutletContext } from "react-router-dom";

import { NAME_REGEX, PHONE_REGEX, } from "../../utils/validators";
import "./Admin.css";


function AdminProfile() {

  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const { setTopbarConfig } = useOutletContext();

  useEffect(() => {
    setTopbarConfig({
      title: "Administration-Profile",
      actionButton: null,
      search: null,
      setSearch: null,
      sort: null,
      setSort: null,
      clearFilters: null,
    });
    return () => setTopbarConfig({});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      touchedFields,
      isSubmitting,
      isValid,
    }
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedAddress = watch("address");

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
    setServerError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setServerError("");
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");
      await updateUser({
        name: data.name,
        phone: data.phone,
        address: data.address,
      });

      setSuccessMessage(
        "Profile updated successfully."
      );

      setIsEditing(false);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        "Failed to update profile."
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar"> <FaUser /> </div>

          <div>
            <h1> {user?.name} </h1>
            <p> {user?.email} </p>
          </div>
        </div>

        {/* Messages */}
        {successMessage &&
          <div className="profile-success">
            {successMessage}
          </div>
        }

        {serverError &&
          <div className="profile-error">
            {serverError}
          </div>
        }

        {!isEditing ? (
          <>
            {/* Information */}
            <div className="profile-section">
              <ProfileItem
                icon={<FaEnvelope />}
                title="Email"
                value={user?.email}
              />
              <ProfileItem
                icon={<FaPhone />}
                title="Phone"
                value={
                  user?.phone ||
                  "Not added yet"
                }
              />

              <ProfileItem
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={
                  user?.address ||
                  "Not added yet"
                }
              />
            </div>

            {/* Orders */}
            <div className="orders-box">
              <FaShoppingBag />
              <div>
                <h3> Total Orders </h3>
                <p> 0 Orders </p>
              </div>
            </div>

            <button
              className="profile-btn"
              onClick={handleEdit}
            >
              <FaEdit />
              Edit Profile
            </button>
          </>
        ) : (
          <form
            className="profile-form"
            onSubmit={
              handleSubmit(onSubmit)
            }
          >
            {/* Name */}
            <div className="profile-input-group">
              <label> Name </label>
              <input
                className={
                  errors.name
                    ? "input-error"
                    : touchedFields.name && watchedName
                      ? "input-success"
                      : ""
                }


                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: NAME_REGEX,
                    message: "Enter valid name",
                  }
                })}
              />
              {errors.name &&
                <small> {errors.name.message} </small>
              }
            </div>

            {/* Email */}
            <div className="profile-input-group">
              <label> Email </label>
              <input disabled {...register("email")} />
            </div>

            {/* Phone */}
            <div className="profile-input-group">
              <label> Phone </label>

              <input
                className={
                  errors.phone
                    ? "input-error"
                    : touchedFields.phone && watchedPhone
                      ? "input-success"
                      : ""
                }

                {...register("phone", {
                  required: "Phone required",

                  pattern: {
                    value: PHONE_REGEX,
                    message: "Invalid phone number"
                  }
                })}
              />

              {
                errors.phone &&
                <small> {errors.phone.message} </small>
              }

            </div>

            {/* Address */}
            <div className="profile-input-group">
              <label> Address </label>
              <textarea
                className={
                  errors.address
                    ? "input-error"
                    : touchedFields.address && watchedAddress
                      ? "input-success"
                      : ""
                }


                {...register("address", {
                  required: "Address required",
                  minLength: {
                    value: 5,
                    message: "Address too short"
                  }
                })}
              />

              {
                errors.address &&
                <small>
                  {errors.address.message}
                </small>
              }

            </div>

            <div className="profile-actions">

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="profile-btn"
              >
                <FaSave />
                {
                  isSubmitting
                    ? "Saving..."
                    : "Save Changes"
                }
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        )
        }
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  title,
  value
}) {

  return (
    <div className="profile-item">
      <div className="profile-icon"> {icon} </div>

      <div>
        <h4> {title} </h4>
        <p> {value}</p>
      </div>
    </div>
  );
}

export default AdminProfile;