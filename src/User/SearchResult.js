import React from 'react';

const SearchResult = ({ result }) => {
  return (
    <div className="search-result">
      {result ? (
        <div className="result-item">
          <p>{`Chuyến đi từ ${result.departure} đến ${result.destination} vào ngày ${result.date}`}</p>
          <p>{`Giá vé: ${result.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`}</p>
        </div>
      ) : (
        <p>Không tìm thấy vé với mã ID đã nhập.</p>
      )}
    </div>
  );
};

export default SearchResult;
