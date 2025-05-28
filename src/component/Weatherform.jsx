import  { useState } from "react";
import { motion } from "framer-motion";

const WeatherForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        city: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("https://your-make-webhook-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setMessage(data.message || "Form submitted successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🌤️ AI Weather Reporter</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300" >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {message && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-green-700"
                    >
                        {message}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};
export default WeatherForm