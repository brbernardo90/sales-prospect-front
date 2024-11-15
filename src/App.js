// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [extractedInfo, setExtractedInfo] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setExtractedInfo(null);

        try {
            const response = await axios.post("http://localhost:8000/sales_prospect", { url });
            setExtractedInfo(response.data.extracted_info);
        } catch (error) {
            setError("Error extracting information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Sales Prospect Research</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Company Website URL:
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder="Enter company website URL"
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {extractedInfo && (
                <div className="results">
                    <h2>Extracted Information</h2>
                    <p><strong>Industry:</strong> {extractedInfo.Industry}</p>
                    <p><strong>Products/Services:</strong> {extractedInfo.ProductsServices}</p>
                    <p><strong>Target Audience:</strong> {extractedInfo.TargetAudience}</p>
                    <p><strong>Market Position:</strong> {extractedInfo.MarketPosition}</p>
                    <p><strong>Recent News/Events:</strong> {extractedInfo.RecentNews}</p>
                </div>
            )}
        </div>
    );
}

export default App;
