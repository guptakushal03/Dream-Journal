import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

type Props = {
    date: string;
    entry: string;
};

const JournalEditor = ({ date, entry: initialEntry }: Props) => {
    const [entry, setEntry] = useState(initialEntry);

    useEffect(() => {
        const saveEntry = async () => {
            try {
                const journalRef = doc(db, "journals", date);
                await setDoc(journalRef, {
                    date,
                    entry,
                });
                console.log("Journal entry saved!");
            } catch (error) {
                console.error("Error saving journal entry:", error);
            }
        };

        if (entry !== "") {
            saveEntry();
        }
    }, [entry, date]);

    return (
        <div className="w-full max-w-xl">
            <p className="mb-2 text-lg">📅 {date}</p>
            <textarea
                className="w-full h-64 p-4 rounded bg-gray-800 border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="What did you dream about last night?"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
        </div>
    );
};

export default JournalEditor;
