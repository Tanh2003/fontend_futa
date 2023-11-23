import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./TimKiem.scss";
import SearchResult from "./SearchResult";

import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import { getAllVexe} from "../userService";
import { set } from "lodash";

function TimKiemVe() {
  const [searchId, setSearchId] = useState("");
  const [thongtinvexe, setthongtinvexe] = useState("");

  useEffect(() => {
   
    laythongtinvexe();
  }, []);



  const laythongtinvexe = async () => {
   
      // Kiểm tra xem `id` có tồn tại không
      let response = await getAllVexe(searchId);
      if (response && response.errcode === 0) {
        setthongtinvexe(response.vexe);
      }
  
  };














  const handleSearch = async() => {
    await laythongtinvexe();
  };

console.log("xem thong tin ve xe",thongtinvexe)
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
      <SearchResult result={thongtinvexe} />
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
