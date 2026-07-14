import { useState } from "react";
import "./App.css";
import UploadBox from "./components/UploadBox";
import Loading from "./components/Loading";
import api from "./services/api";

function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [processingTime, setProcessingTime] = useState(null);
    const [uploadedFile, setUploadedFile] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [participants, setParticipants] = useState("");
    const [organization, setOrganization] = useState("");
    const [meetingTopic, setMeetingTopic] = useState("");
    const [showContext, setShowContext] = useState(false);

    const handleFile = async (file) => {
        setUploadedFile(file.name);
        setResult(null);
        setError("");

        const startTime = performance.now();

        const formData = new FormData();
        formData.append("audio", file);
        formData.append("participants", participants);
        formData.append("organization", organization);
        formData.append("meetingTopic", meetingTopic);

        try {
            setLoading(true);

            const res = await api.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const endTime = performance.now();

            setResult(res.data);
            setProcessingTime(
                ((endTime - startTime) / 1000).toFixed(2)
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Something went wrong while processing the audio."
            );

        } finally {
            setLoading(false);
        }
    };

    const copyTranscript = () => {
        if (!result) return;

        navigator.clipboard.writeText(result.transcript);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const downloadSummary = () => {

        if (!result) return;

        const content = `AI Meeting Summary

=======================================

Language
${result.language}

=======================================

Transcript

${result.transcript}

=======================================

Summary

${result.summary}

=======================================

Key Points

${result.keyPoints
    .map(point => `• ${point}`)
    .join("\n")}

=======================================

Action Items

${result.actionItems
    .map(
        item =>

`Task: ${item.task}
Owner: ${item.owner}
Deadline: ${item.deadline}`
    )
    .join("\n\n")}
`;

        const blob = new Blob([content], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "Meeting_Summary.txt";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    const wordCount = result?.transcript
        ? result.transcript.trim().split(/\s+/).length
        : 0;

    const characterCount = result?.transcript
        ? result.transcript.length
        : 0;

    return (
        <div className="container">

            <div className="hero">

                <div className="badge">
                    Powered by Faster Whisper + Hugging Face
                </div>

                <h1>🎙 AI Meeting Summarizer</h1>

                <p>
                    Transcribe meetings in seconds using AI and instantly
                    generate summaries, key points and action items.
                </p>

            </div>

            <div className="context-card">

                <button
                    className="context-toggle"
                    onClick={() => setShowContext(!showContext)}
                >
                    <span>📝 Meeting Details (Optional)</span>

                    <span className="arrow">
                        {showContext ? "▲" : "▼"}
                    </span>
                </button>

                {showContext && (

                    <div className="context-form">

                        <div className="input-group">

                            <label>👥 Participants</label>

                            <input
                                type="text"
                                placeholder="Devanshu Nirmal, Rahul Sharma"
                                value={participants}
                                onChange={(e) =>
                                    setParticipants(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>🏢 Organization</label>

                            <input
                                type="text"
                                placeholder="Vishwakarma Institute of Information Technology"
                                value={organization}
                                onChange={(e) =>
                                    setOrganization(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>📚 Meeting Topic</label>

                            <input
                                type="text"
                                placeholder="Exam Preparation"
                                value={meetingTopic}
                                onChange={(e) =>
                                    setMeetingTopic(e.target.value)
                                }
                            />

                        </div>

                        <p className="context-note">
                            This information is optional and helps the AI improve
                            transcript accuracy for names, organizations, and meeting topics.
                        </p>

                    </div>

                )}

            </div>

            <UploadBox onFileSelect={handleFile} />

            {uploadedFile && (
                <div className="info-bar">

                    <div>
                        📄 <strong>File:</strong> {uploadedFile}
                    </div>

                    <div>
                        🌐 <strong>Language:</strong>{" "}
                        {result?.language || "--"}
                    </div>

                    <div>
                        ⏱ <strong>Time:</strong>{" "}
                        {processingTime
                            ? `${processingTime}s`
                            : "--"}
                    </div>

                </div>
            )}

            {error && (
                <div className="error-box">
                    ❌ {error}
                </div>
            )}

            {loading && <Loading />}

            {result && (
                <>
                    {/* Statistics */}

                    <div className="stats-card">

                        <h2>📊 Meeting Statistics</h2>

                        <div className="stats-grid">

                            <div className="stat-item">
                                <span>🌐 Language</span>
                                <strong>{result.language}</strong>
                            </div>

                            <div className="stat-item">
                                <span>📝 Words</span>
                                <strong>{wordCount}</strong>
                            </div>

                            <div className="stat-item">
                                <span>🔤 Characters</span>
                                <strong>{characterCount}</strong>
                            </div>

                            <div className="stat-item">
                                <span>⏱ Processing</span>
                                <strong>{processingTime}s</strong>
                            </div>

                        </div>

                    </div>
                    
                    {/* Transcript */}

                    <div className="card">

                        <div className="card-header">

                            <h2>📄 Transcript</h2>

                            <button
                                className="copy-btn"
                                onClick={copyTranscript}
                            >
                                {copied
                                    ? "✅ Copied"
                                    : "📋 Copy"}
                            </button>

                        </div>

                        <p>{result.transcript}</p>

                    </div>

                    {/* Summary */}

                    <div className="card">

                        <h2>✨ AI Summary</h2>

                        <p>{result.summary}</p>

                    </div>

                    {/* Key Points */}

                    <div className="card">

                        <h2>📌 Key Points</h2>

                        <ul>

                            {result.keyPoints?.map(
                                (point, index) => (
                                    <li key={index}>
                                        {point}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                    {/* Action Items */}

                    <div className="card">

                        <h2>✅ Action Items</h2>

                        <ul>

                            {result.actionItems?.map(
                                (item, index) => (
                                    <li key={index}>

                                        <strong>
                                            {item.task}
                                        </strong>

                                        <p>

                                            👤 <b>Owner:</b>{" "}
                                            {item.owner}

                                            <br />

                                            📅 <b>Deadline:</b>{" "}
                                            {item.deadline}

                                        </p>

                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                    {/* Download */}

                    <div className="download-section">

                        <button
                            className="download-btn"
                            onClick={downloadSummary}
                        >
                            ⬇ Download Summary
                        </button>

                    </div>

                </>
            )}

        </div>
    );
}

export default App;