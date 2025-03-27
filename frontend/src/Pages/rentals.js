import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus, FaTrash } from "react-icons/fa";
import "../styles/rentals.css";

export default function Rentals() {
  const [items, setItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cart, setCart] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    desc: "",
    price: "",
    location: "",
    img: null, // 🛠️ Fix: Store File object instead of Base64
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    fetchRentals();
  }, []);

  // Fetch rental items from the database
  const fetchRentals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rentals");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setItems(data);
      setSelectedOptions(data.map(() => ({ quantity: 1, duration: "day" })));
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const newOptions = [...selectedOptions];
    newOptions[index][field] = value;
    setSelectedOptions(newOptions);
  };

  const calculatePrice = (basePrice, quantity, duration) => {
    const multiplier = duration === "day" ? 1 : duration === "month" ? 25 : 300;
    return basePrice * quantity * multiplier;
  };

  // Rent an item
  const addToCart = async (index) => {
    if (!authToken) {
      alert("You must be logged in to rent an item!");
      return;
    }

    const order = {
      userId: authToken,
      itemId: items[index]._id,
      quantity: selectedOptions[index].quantity,
      duration: selectedOptions[index].duration,
      totalCost: calculatePrice(
        items[index].price,
        selectedOptions[index].quantity,
        selectedOptions[index].duration
      ),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert(`${items[index].name} has been rented successfully!`);
      } else {
        alert("Error renting item.");
      }
    } catch (error) {
      console.error("Error renting item:", error);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewItem({ ...newItem, img: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload a new post to the database
  const handlePostItem = async () => {
    if (!authToken) {
      alert("You must be logged in to post a rental item!");
      return;
    }
  
    if (!newItem.name || !newItem.desc || !newItem.price || !newItem.location || !newItem.img) {
      alert("Please fill all fields, including an image!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("desc", newItem.desc);
    formData.append("price", newItem.price);
    formData.append("location", newItem.location);
    formData.append("img", newItem.img); // ✅ Must be a File object
  
    try {
      const response = await fetch("http://localhost:5000/api/rentals", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData, // ✅ Send FormData instead of JSON
      });
  
      if (response.ok) {
        alert("Item posted successfully!");
        fetchRentals();
        setNewItem({ name: "", desc: "", price: "", location: "", img: null });
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        alert("Error posting item: " + errorData.error);
      }
    } catch (error) {
      console.error("Error posting item:", error);
    }
  };
  

  // Delete a post
  const deletePost = async (id) => {
    if (!authToken) {
      alert("You must be logged in to delete a post!");
      return;
    }
  
    if (!id || id.length !== 24) {
      alert("Invalid rental ID!"); // ✅ Prevents deleting an invalid ID
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/rentals/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
          fetchRentals(); // ✅ Refresh rentals list
        } else {
          alert(data.error || "Error deleting post.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 rentals-heading">🚀 Available Rentals 🚀</h2>

      {/* Post Rental Item Form */}
      {authToken ? (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 className="text-center mb-3">Post Your Rental Item</h4>
          <div className="row g-2">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Product Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Location" value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Description" value={newItem.desc} onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Price (₹)" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="file" className="form-control" onChange={handleImageUpload} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="img-preview mt-2" />}
            </div>
            <div className="col-md-1">
              <button className="btn btn-success w-100" onClick={handlePostItem}><FaPlus /></button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-danger text-center">🔒 Please log in to post a rental item.</p>
      )}

      {/* Display Rental Items */}
      <div className="row g-4">
        {items.map((item, index) => (
          <div key={item._id} className="col-md-3">
            <div className="card shadow-lg h-100 border-0 rounded-4 rental-card">
              <img src={item.img} className="card-img-top rounded-top-4" alt={item.name} />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{item.name}</h5>
                <button className="btn btn-success w-100 my-1" onClick={() => addToCart(index)}>Rent Now</button>
                <button className="btn btn-danger w-100 mt-1" onClick={() => deletePost(item._id)}><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
