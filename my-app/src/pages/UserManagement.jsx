import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { authenticate } from "./sign-in";

export default function UserManagementPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        profilePicture: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // For identity confirmation
    const [confirmData, setConfirmData] = useState({
        email: "",
        password: "",
    }); // For email and password confirmation

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:3000/api/user")
    //         .then((response) => setUserData(response.data))
    //         .catch((error) => console.error("Error fetching user data:", error));
    // }, []);

    const validate = (name, value) => {
        let error = "";
        // Validate confirm identity section (email and password)
        if (name === "email") {
            if (!value) error = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        }

        if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 6) error = "Password must be at least 6 characters";
            else if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) error = "Password must contain at least one uppercase letter and one number";
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isAuthenticated) {
            setConfirmData((prev) => ({ ...prev, [name]: value }));
            validate(name, value); // Validate email and password during confirmation
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
            validate(name, value); // Validate email and password during profile edit
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) return;

        // Here, make a request to the server to verify the user's email and password
        axios
            .post("http://localhost:3000/api/auth/login", confirmData)
            .then(() => {
                setIsAuthenticated(true);
                setSuccess("Identity confirmed. You can now edit your profile.");
            })
            .catch(() => {
                setSuccess("Failed to confirm identity. Please try again.");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) return;

        const formData = new FormData();
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        // if (selectedFile) {
        //     formData.append("profilePicture", selectedFile);
        // }
        console.log(Object.fromEntries(formData.entries()));
        axios
            .post("http://localhost:3000/api/auth/update", {
                email: userData.email,
                password: userData.password
            }, {
                headers: {"Content-Type": "application/json"}
            })
            .then(() => setSuccess("Profile updated successfully!"))
            .catch(() => setSuccess("Failed to update profile."));
    };

    const styles = {
        container: {
            marginTop: "20px",
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        form: {
            display: "flex",
            flexDirection: "column",
        },
        label: {
            marginBottom: "8px",
            fontWeight: "bold",
        },
        input: {
            marginBottom: "16px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
        },
        inputError: {
            borderColor: "red",
            backgroundColor: "#f8d7da",
            color: "black",
            outline: "2px solid red",
        },
        inputSuccess: {
            borderColor: "green",
            backgroundColor: "#d4edda",
            color: "black",
            outline: "2px solid green",
        },
        error: {
            color: "red",
            fontSize: "12px",
            marginBottom: "10px",
        },
        success: {
            color: "green",
            fontSize: "14px",
            marginTop: "20px",
        },
        button: {
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
        },
        buttonDisabled: {
            backgroundColor: "#ccc",
            cursor: "not-allowed",
        },
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <h2>{isAuthenticated ? "Manage Your Account" : "Confirm Your Identity"}</h2>

                {/* Step 1: Identity Confirmation */}
                {!isAuthenticated ? (
                    <form style={styles.form} onSubmit={handleConfirmSubmit}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={confirmData.email}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.email ? styles.inputError : errors.email === "" ? styles.inputSuccess : {}),
                            }}
                        />
                        {errors.email && <p style={styles.error}>{errors.email}</p>}

                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={confirmData.password}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.password ? styles.inputError : errors.password === "" ? styles.inputSuccess : {}),
                            }}
                        />
                        {errors.password && <p style={styles.error}>{errors.password}</p>}

                        <button type="submit" style={styles.button}>
                            Confirm Identity
                        </button>
                    </form>
                ) : (
                    /* Step 2: Edit Profile (after identity confirmation) */
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.email ? styles.inputError : errors.email === "" ? styles.inputSuccess : {}),
                            }}
                        />
                        {errors.email && <p style={styles.error}>{errors.email}</p>}

                        <label style={styles.label}>New Password (Optional)</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            value={userData.password}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.password ? styles.inputError : errors.password === "" ? styles.inputSuccess : {}),
                            }}
                        />
                        {errors.password && <p style={styles.error}>{errors.password}</p>}

                        <label style={styles.label}>Profile Picture</label>
                        <input type="file" onChange={handleFileChange} style={styles.input} />

                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                ...(Object.values(errors).some((error) => error) ? styles.buttonDisabled : {}),
                            }}
                            disabled={Object.values(errors).some((error) => error)}
                        >
                            Update Profile
                        </button>
                    </form>
                )}

                {success && <p style={styles.success}>{success}</p>}
            </div>
            <Footer />
        </div>
    );
}
