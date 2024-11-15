// src/App.js
import React, { useState } from "react";
import axios from "axios";
import parse from 'html-react-parser'
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
            const response = await axios.post("https://sales-prospect.onrender.com/sales_prospect", { url });
            console.log(response);
            console.log(response.data);
            console.log(response.data.extracted_info);
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
                    <p>{parse(extractedInfo.replace('html',''))}</p>
                    {/* TODO: RETORNAR APENAS O CÓDIGO HTML OU UM JSON */}
                </div>
            )}
        </div>
    );
}

export default App;
