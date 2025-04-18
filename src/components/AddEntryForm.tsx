import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Sentiment from "sentiment";

const AddEntryForm = () => {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    
    // We no longer need to store sentimentScore here for display
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const sentiment = new Sentiment();
        const result = sentiment.analyze(entry);
        
        // Determine sentiment based on score
        let sentimentResult = "Neutral";
        if (result.score > 0) sentimentResult = "Positive";
        if (result.score < 0) sentimentResult = "Negative";

        try {
            const entriesRef = collection(db, "entries");
            // Save entry to Firestore with sentiment analysis result
            await addDoc(entriesRef, {
                title: title,
                entry: entry,
                sentiment: sentimentResult, // Save sentiment with entry
                createdAt: serverTimestamp(), // Timestamp the entry
            });
            console.log("Entry added!");

            // Clear the form after submission
            setTitle("");
            setEntry("");
        } catch (error) {
            console.error("Error adding entry: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-8">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
                required
            />
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Your journal entry..."
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md min-h-[200px] resize-none"
                required
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded mt-4"
            >
                Add Entry
            </button>
        </form>
    );
};

export default AddEntryForm;
