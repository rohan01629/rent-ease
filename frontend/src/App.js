import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/login";
import AboutUs from "./Pages/aboutUs";
import ContactUs from "./Pages/contactUs";
import Rentals from "./Pages/rentals";
import UserProfile from "./components/UserProfile";
import RentalHistory from "./Pages/RentalHistory";

function App() {
  // ✅ Retrieve token from localStorage on load
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [userDetails, setUserDetails] = useState(null);

  // 🔹 Debugging: Check token value
  useEffect(() => {
    console.log("Auth Token on Load:", authToken);
  }, [authToken]);

  // ✅ Fetch User Details Function
  const fetchUserDetails = async () => {
    const storedToken = localStorage.getItem("authToken"); // Fetch from localStorage
    console.log("🔹 Stored Token:", storedToken);
  
    if (!storedToken) {
      console.warn("❌ No auth token found, skipping user fetch");
      setUserDetails(null);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`, // Ensure correct format
        },
      });
  
      if (!response.ok) {
        console.error("❌ Failed to fetch user details, Status:", response.status);
        setUserDetails(null);
        return;
      }
  
      const data = await response.json();
      console.log("✅ User details fetched successfully:", data);
      setUserDetails(data);
    } catch (error) {
      console.error("❌ Error fetching user details:", error);
      setUserDetails(null);
    }
  };
  
  // ✅ Fetch user details whenever the authToken changes
  useEffect(() => {
    if (authToken) fetchUserDetails();
  }, [authToken]);

  // ✅ Logout Function: Clears token & user details
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUserDetails(null);
  };

  return (
    <Router>
      <Navbar
        authToken={authToken}
        setAuthToken={setAuthToken}
        userDetails={userDetails}
        fetchUserDetails={fetchUserDetails}
        handleLogout={handleLogout} // Pass logout function
        setUserDetails={setUserDetails}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setAuthToken={setAuthToken} fetchUserDetails={fetchUserDetails} />}
        />
        <Route path="/createuser" element={<Signup />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/rental-history" element={<RentalHistory />} />
        <Route path="/profile" element={<UserProfile authToken={authToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
