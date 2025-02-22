import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form() {
    const [searchParam, setSearchParam] = useSearchParams("");
    const [text, setText] = useState("");

    const handleSearch = () => {
        setSearchParam({ query: text });
    };
    return (
        <>
            <div className='container mt-5 p-5 align-items-center justify-content-center'>
                <div className="form-group d-flex">
                    <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="btn btn-primary btn-sm" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="card">Query : {searchParam.get("query")}</div>
            </div>
        </>
    )
}
