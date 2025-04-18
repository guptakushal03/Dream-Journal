import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

// Fetch entries from Firestore
const fetchEntries = async () => {
    try {
        const entriesRef = collection(db, "entries");
        const q = query(entriesRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const entries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return entries;
    } catch (error) {
        console.error("Error fetching entries: ", error);
        return [];
    }
};

// Function to analyze sentiment
const analyzeSentiment = (entryText: string) => {
    const result = sentiment.analyze(entryText);
    if (result.score > 0) return "Positive";
    if (result.score < 0) return "Negative";
    return "Neutral";
};

// Function to return sentiment color for the calendar dot
const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
        case "Positive":
            return "bg-green-500";
        case "Negative":
            return "bg-red-500";
        case "Neutral":
            return "bg-gray-500";
        default:
            return "bg-gray-500";
    }
};

// Main JournalEntries component
const JournalEntries = () => {
    const [entries, setEntries] = useState<any[]>([]);
    const [editingEntry, setEditingEntry] = useState<any | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState<string>("");
    const [updatedEntry, setUpdatedEntry] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Fetch entries on component mount
    useEffect(() => {
        fetchEntries().then(setEntries);
    }, []);

    // Handle editing an entry
    const handleEditClick = (entry: any) => {
        setEditingEntry(entry);
        setUpdatedTitle(entry.title);
        setUpdatedEntry(entry.entry);
        setErrorMessage("");
    };

    // Handle updating an entry
    const handleUpdateEntry = async () => {
        if (!updatedTitle || !updatedEntry) {
            setErrorMessage("Both title and entry are required!");
            return;
        }

        if (editingEntry) {
            try {
                const entryRef = doc(db, "entries", editingEntry.id);
                await updateDoc(entryRef, {
                    title: updatedTitle,
                    entry: updatedEntry,
                    sentiment: analyzeSentiment(updatedEntry), // Update sentiment on Firestore
                });
                setEditingEntry(null);
                fetchEntries().then(setEntries);
                setErrorMessage("");
            } catch (error) {
                console.error("Error updating entry: ", error);
                setErrorMessage("Error updating entry! Please try again later.");
            }
        }
    };

    // Helper function to get the day of the month from a timestamp
    const getDayOfMonth = (timestamp: any) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.getDate();
    };

    // Create the calendar dots for sentiment visualization
    const createCalendarDots = () => {
        const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);
        const sentimentMap: Record<number, string> = {};

        // Map the sentiment for each day of the month based on entries
        entries.forEach((entry) => {
            const day = getDayOfMonth(entry.createdAt);
            const sentiment = analyzeSentiment(entry.entry); // Determine sentiment for each entry
            sentimentMap[day] = sentiment; // Map the sentiment to the specific day
        });

        // Create a dot for each day in the month, color-coded by sentiment
        return monthDays.map((day) => {
            const sentiment = sentimentMap[day] || "Neutral"; // Default to neutral if no entry
            return (
                <div
                    key={day}
                    className={`w-3 h-3 rounded-full ${getSentimentColor(sentiment)} mx-0.5 my-0.5`}
                    title={`Day ${day}: ${sentiment}`} // Tooltip with day and sentiment
                />
            );
        });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Journal Entries</h2>

            {/* Calendar grid to show sentiment for each day */}
            <div className="grid grid-cols-7 gap-1 text-center mb-8">
                {createCalendarDots()}
            </div>

            {/* List of journal entries */}
            <ul className="space-y-4">
                {entries.length === 0 ? (
                    <li>No entries yet!</li>
                ) : (
                    entries.map((entry) => (
                        <li key={entry.id} className="border-b pb-4">
                            {editingEntry?.id === entry.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        placeholder="Edit title"
                                        className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
                                        required
                                    />
                                    <textarea
                                        value={updatedEntry}
                                        onChange={(e) => setUpdatedEntry(e.target.value)}
                                        placeholder="Edit your entry..."
                                        className="w-full p-2 mb-2 bg-gray-800 text-white rounded resize-none"
                                        required
                                    />
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                                    )}
                                    <button
                                        onClick={handleUpdateEntry}
                                        className="bg-blue-500 text-white p-2 rounded mt-2"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-semibold">{entry.title}</h3>
                                    <p className="text-gray-400">{entry.entry.slice(0, 100)}...</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(entry.createdAt.seconds * 1000).toLocaleString()}
                                    </p>

                                    {/* Sentiment display for each entry */}
                                    <p
                                        className={`italic text-sm mt-2 ${
                                            entry.sentiment === "Positive"
                                                ? "text-green-500"
                                                : entry.sentiment === "Negative"
                                                ? "text-red-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Sentiment: {entry.sentiment || "Neutral"}
                                    </p>

                                    <button
                                        onClick={() => handleEditClick(entry)}
                                        className="text-blue-500 mt-2"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default JournalEntries;
