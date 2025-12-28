import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import api from "../../api/apiCalls";
import { notification, Select, Pagination,Empty } from "antd";
import "./carcard.css";

const { Option } = Select;

function InventoryImages() {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [makeFilter, setMakeFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortBy, setSortBy] = useState("year-desc");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Fetch inventory on mount
  useEffect(() => {
    const getInventory = async () => {
      try {
        const response = await api.getAllinventory();
        setInventoryData(response);
        setFilteredData(response);
      } catch (error) {
        notification.error({
          message: "Error",
          description: error?.message,
          duration: 5,
        });
      }
    };
    getInventory();
  }, []);

   useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // Filter and sort
  useEffect(() => {
    let result = [...inventoryData];

    if (makeFilter) {
      result = result.filter((item) => item.make.toUpperCase() === makeFilter);
    }

    if (statusFilter) {
      result = result.filter((item) => item.active === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "year-desc") return b.year - a.year;
      if (sortBy === "year-asc") return a.year - b.year;
      if (sortBy === "make-asc") return a.make.localeCompare(b.make);
      if (sortBy === "make-desc") return b.make.localeCompare(a.make);
       if (sortBy === "price-asc") return a.price - b.price
        if (sortBy === "price-desc") return b.price - a.price
      return 0;
    });

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page
  }, [inventoryData, makeFilter, statusFilter, sortBy]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = filteredData.slice(startIndex, startIndex + pageSize);

  // Unique makes
  const uniqueMakes = [...new Set(inventoryData.map((i) => i.make?.toUpperCase()))];

  return (
    <div >
     <h1 style={{ textAlign: "center" }}>Check Out Our Inventory!</h1>

      {/* === Filters & Sort === */}
      <div style={{  display: "flex", 
  gap: "0.5rem", 
  padding: "1rem 2rem", 
  alignItems: "center", 
  justifyContent: "center"  }}>
        <Select
          allowClear
          placeholder="Filter by Make"
          onChange={(value) => setMakeFilter(value)}
          style={{ width: 200 }}
        >
          {uniqueMakes.map((make) => (
            <Option key={make.toUpperCase()} value={make?.toUpperCase()}>
              {make?.toUpperCase()}
            </Option>
          ))}
        </Select>

        {/* <Select
          allowClear
          placeholder="Filter by Status"
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="AVAILABLE">Available</Option>
          <Option value="SOLD">Sold</Option>
        </Select> */}

        <Select
          placeholder="Sort By"
          defaultValue="year-desc"
          onChange={(value) => setSortBy(value)}
          style={{ width: 200 }}
        >
          <Option value="year-desc">Year ↓</Option>
          <Option value="year-asc">Year ↑</Option>
          <Option value="make-asc">Make A-Z</Option>
          <Option value="make-desc">Make Z-A</Option>
          <Option value="price-asc">price low-high</Option>
          <Option value="price-desc">price high-low</Option>
        </Select>
      </div>

      {/* === Inventory Cards === */}
    <div className="cards__container">
  <div className="cards__wrapper">
    {paginatedItems && paginatedItems.length > 0 ? (
      <ul className="card-grid">
        {paginatedItems.map((item) => (
          <CarCard
            key={item.vin_number}
            make={item.make}
            imageBase64={item.first_image}
            title={item.make}
            label={item.model}
            status={item.active}
            description={item.description}
            model={item.model}
            year={item.year}
            imageCount={item.image_count}
            price={item?.price}
            newPrice={item?.new_price}
            carInfo={item}
          />
        ))}
      </ul>
    ) : (
      <Empty
        description="No cars in inventory"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ padding: '2rem' }}
      />
    )}
  </div>
</div>

      {/* === Pagination === */}
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default InventoryImages;
