import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./TimKiem.scss";
import SearchResult from "./SearchResult";

import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";

function TimKiemVe() {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên mã ID vé
    const foundResult = findTicketById(searchId);

    if (foundResult) {
      setSearchResult(foundResult);
    } else {
      setSearchResult(null);
    }
  };

  const findTicketById = (id) => {
    // Giả định rằng data là danh sách vé đã mua
    const data = [
      {
        id: 1,
        departure: "A",
        destination: "B",
        date: "2023-01-01",
        price: 100000,
      },
      {
        id: 2,
        departure: "C",
        destination: "D",
        date: "2023-01-02",
        price: 150000,
      },
      // ...
    ];

    return data.find((item) => item.id === parseInt(id));
  };

  return (
    <div className="search-container">
      <h1>Tìm kiếm vé</h1>
      <div className="search-input">
        <label>Mã vé:</label>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Tìm kiếm</button>
      {/* Hiển thị kết quả tìm kiếm */}
      <SearchResult result={searchResult} />
    </div>
  );
}



const TimKiem = () => {
  return (
    <div>
      <HeaderFutaMain />
      <TimKiemVe />
      <Footer />
    </div>
  );
};

export default TimKiem;
