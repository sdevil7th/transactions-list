import { useState, useEffect } from "react";
import "./Home.scss";

import { MOCK_DATA } from "../mockData";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import TransactionDetailsModal from "./TransactionDetailsModal/TransactionDetailsModal";

import { BsSearch } from "react-icons/bs";

const defaultLimit = 5;

export default function Home(props) {
  const [showPagination, setShowPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState("Invoice ID");

  const [tableData, setTableData] = useState(MOCK_DATA);
  const [filteredTableData, setFilteredTableData] = useState(tableData.slice());
  const [tableDataToShow, setTableDataToShow] = useState(
    filteredTableData.slice(offset, defaultLimit)
  );

  const [searchText, setSearchText] = useState("");
  const [jumpToText, setJumpToText] = useState("1");

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    Math.ceil(tableData.length / defaultLimit)
  );
  const [pagesArr, setPagesArr] = useState([
    ...Array(totalNumberOfPages).keys(),
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setPagesArr([...Array(totalNumberOfPages).keys()]);
  }, [totalNumberOfPages]);

  const toggleShowPagination = () => {
    setTableDataToShow(
      !showPagination
        ? sortData(filteredTableData.slice(offset, getLimit()))
        : sortData(filteredTableData.slice())
    );
    setShowPagination(!showPagination);
  };

  const onSearch = (text) => {
    let searchFilteredData = text
      ? tableData.filter((row) => row["Invoice ID"].includes(text))
      : tableData.slice();
    setTotalNumberOfPages(Math.ceil(searchFilteredData.length / defaultLimit));
    setCurrentPage(1);
    // setPagesArr()
    setSearchText(text);
    searchFilteredData = sortData(searchFilteredData);
    setFilteredTableData(searchFilteredData);
    setTableDataToShow(
      showPagination
        ? searchFilteredData.slice(offset, getLimit())
        : searchFilteredData.slice()
    );
  };

  const onSortBy = (name) => {
    let sortedData;
    if (name === sortBy) {
      sortedData = sortData(filteredTableData.slice(), name, true);
    } else {
      sortedData = sortData(filteredTableData.slice(), name, false);
    }
    setSortBy(name);
    const filteredData = showPagination
      ? sortedData.slice(offset, getLimit())
      : sortedData.slice();
    setTableDataToShow(filteredData);
  };

  const onChangePage = (pageNo) => {
    const newOffset = defaultLimit * (pageNo - 1);
    setOffset(newOffset);
    setCurrentPage(pageNo);
    setTableDataToShow(
      sortData(filteredTableData).slice(newOffset, getLimit(newOffset))
    );
  };

  const onUpdateTableData = (data) => {
    const indexInTableData = tableData.findIndex(
      (item) => item["Invoice ID"] === data["Invoice ID"]
    );
    const indexInFilteredTableData = filteredTableData.findIndex(
      (item) => item["Invoice ID"] === data["Invoice ID"]
    );
    const indexInTableDataToShow = tableDataToShow.findIndex(
      (item) => item["Invoice ID"] === data["Invoice ID"]
    );

    tableData.splice(indexInTableData, 1, data);
    setTableData(tableData.slice());

    filteredTableData.splice(indexInFilteredTableData, 1, data);
    setFilteredTableData(filteredTableData.slice());

    tableDataToShow.splice(indexInTableDataToShow, 1, data);
    setTableDataToShow(tableDataToShow.slice());
  };

  const sortData = (arr, toSortBy = sortBy, inverse = false) => {
    arr.sort((a, b) => {
      // sort should consider the types of the data field but I don't find it required for this test
      // thus implementing simple character sort
      var nameA =
        typeof a[toSortBy] === "number"
          ? a[toSortBy]
          : a[toSortBy].toString().toUpperCase();
      var nameB =
        typeof b[toSortBy] === "number"
          ? b[toSortBy]
          : b[toSortBy].toString().toUpperCase();
      if (nameA < nameB) {
        return inverse ? 1 : -1;
      }
      if (nameA > nameB) {
        return inverse ? -1 : 1;
      }
      return 0;
    });
    return arr;
  };

  const onOpenModal = (id) => {
    setCurrentData({
      ...tableDataToShow.find((item) => item["Invoice ID"] === id),
    });
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setCurrentData(null);
  };

  const getLimit = (newOffset = offset) => {
    return newOffset + defaultLimit >= tableData.length
      ? tableData.length
      : newOffset + defaultLimit;
  };

  return (
    <div className="container">
      <div className="content">
        <div className="table-header">
          <div>
            <span className="table-name">Invoices</span>
          </div>
          <div>
            <label className="search-input">
              <input
                className="input"
                type="text"
                placeholder="Search by ID"
                value={searchText}
                onChange={(event) => onSearch(event.target.value)}
              />
              <BsSearch />
            </label>
            <div className="toggle-buttons">
              <button
                className={"toggle-btn" + (showPagination ? " active" : "")}
                onClick={toggleShowPagination}
              >
                Limit Offset
              </button>
              <button
                className={"toggle-btn" + (showPagination ? "" : " active")}
                onClick={toggleShowPagination}
              >
                Infinite
              </button>
            </div>
          </div>
        </div>
        <div className="table">
          <TransactionsTable
            data={tableDataToShow}
            isInfinite={!showPagination}
            onClickRow={(event) => onOpenModal(event)}
            onClickHeader={(event) => onSortBy(event)}
            onDownloadReceipt={() => {}}
          />
        </div>
        {showPagination ? (
          <div className="table-footer">
            <div className="page-selectors">
              {pagesArr.map((pageNum) => (
                <button
                  key={"pageNum" + pageNum}
                  className={
                    "btn" + (pageNum + 1 === currentPage ? " btn-primary" : "")
                  }
                  onClick={() => onChangePage(pageNum + 1)}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
            <div className="page-jumper">
              <span>Go to page</span>
              <input
                className="input"
                type="number"
                placeholder={currentPage}
                value={jumpToText}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value >= 1 && value <= totalNumberOfPages) {
                    setJumpToText(parseInt(value));
                  }
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => onChangePage(jumpToText)}
              >
                Go -&gt;
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {modalOpen && currentData ? (
        <TransactionDetailsModal
          open={modalOpen}
          data={currentData}
          onCloseModal={onCloseModal}
          onSave={(newData) => onUpdateTableData(newData)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
