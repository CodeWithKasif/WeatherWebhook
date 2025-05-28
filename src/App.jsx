import { useState, useEffect } from "react";
import "./index.css"; // Make sure Tailwind CSS is imported here

function App() {
const [formData, setFormData] = useState({
name: "",
email: "",
city: "",
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [fadeIn, setFadeIn] = useState(false);

useEffect(() => {
setFadeIn(true);
}, []);

const handleChange = (e) => {
setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setMessage("");
try {
const res = await fetch("https://hook.eu2.make.com/j2jlj2tg9gadtsuzoh2f7hz58y9dmxgw", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});
  if (res.ok) {
    setMessage("✅ Form submitted successfully!");
    setFormData({ name: "", email: "", city: "" }); // clear form
  } else {
    setMessage("❌ Failed to submit form. Status: " + res.status);
  }
} catch (err) {
  console.error(err);
  setMessage("❌ Error submitting form");
} finally {
  setLoading(false);
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-6 font-sans">
<div
className={`bg-white shadow-lg rounded-xl p-8 w-full max-w-md transform transition duration-700 ease-out ${ fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95" }`}
>
<h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
🌤️ AI Weather Reporter
</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
<input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
<input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
<button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300" >
{loading ? "Submitting..." : "Submit"}
</button>
</form>
{message && (
<p className="mt-4 text-center text-green-700 transition-opacity duration-500 opacity-100">
{message}
</p>
)}
</div>
</div>
);
}

export default App;