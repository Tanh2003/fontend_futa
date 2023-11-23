import React, { useState, useEffect } from "react";
import { getAllTTchuyenxe } from "../userService";
import "./SearchResult.css"; // Import your CSS file

const SearchResult = ({ result }) => {
  const [TTchuyenxe, setTTchuyenxe] = useState("");

  useEffect(() => {
    const getAllTTchuyenxeReact = async () => {
      if (result) {
        let response = await getAllTTchuyenxe(result.machuyen);
        if (response && response.errcode === 0) {
          setTTchuyenxe(response.TTchuyenxe);
        }
      }
    };

    getAllTTchuyenxeReact();
  }, [result]);

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="search-result">
      {TTchuyenxe &&result ? (
        <div className="result-item">
          <h2>Thông tin vé xe</h2>
          <p>
            <strong>Mã vé</strong> {result.id}
          </p>
          <p>
            <strong>Số ghế:</strong> {result.soghe}
          </p>
          <p>
            <strong>Thời gian đi:</strong> {result.thoigianmua} giây
          </p>
          <p>
            <strong>Chuyến đi từ:</strong> {TTchuyenxe.idmachuyenData.diemdi}{" "}
            <strong>Đến:</strong>{TTchuyenxe.idmachuyenData.diemden}
          </p>
          <p>
            <strong>Ngày đi:</strong> {formatDate(TTchuyenxe.ngay)}
          </p>
          <p>
            <strong>Giá:</strong>{" "}
            {result.giave.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      ) : (
        <p>Không tìm thấy vé</p>
      )}
    </div>
  );
};

export default SearchResult;
