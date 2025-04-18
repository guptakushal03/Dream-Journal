import AddEntryForm from "./components/AddEntryForm";
import JournalEntries from "./components/JournalEntries";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">🌙 Dream Journal</h1>
            <AddEntryForm />
            <JournalEntries />
        </div>
    );
};

export default App;
