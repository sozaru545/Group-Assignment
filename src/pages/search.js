import Navbar from '../components/layout/Navbar';

export default function SearchPage() {
    return (
        <div>
            <Navbar />
            <main>
                <h1>Search Mode</h1>
                <input type="text" placeholder="Search artists or songs..." className="search-input"/>
                <button className="search-button">Search</button>
            </main>
        </div>
    );
}