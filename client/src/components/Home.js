import React, { useState } from "react";
import StudentsContainer from "./StudentsContainer";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <h2>Search for a student below</h2>
            <form>
                <input
                    type="text"
                    placeholder="Student Name"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <StudentsContainer searchTerm={searchTerm} />
            </form>
        </>
    );
}

export default Home;
