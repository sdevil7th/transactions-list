import "./TransactionsTable.scss";
import ProgressBar from "../ProgressBar/ProgressBar";

import { BsDownload } from "react-icons/bs";

export default function TransactionsTable(props) {
  return (
    <div className={"table-wrapper" + (props.isInfinite ? " infinite" : "")}>
      <table className="transactions-table">
        <thead>
          <tr>
            <th onClick={() => props.onClickHeader("Invoice ID")}>ID</th>
            <th onClick={() => props.onClickHeader("Invoice Amount")}>
              Amount
            </th>
            <th onClick={() => props.onClickHeader("Billing Period Start")}>
              From
            </th>
            <th onClick={() => props.onClickHeader("Billing Period End")}>
              To
            </th>
            <th onClick={() => props.onClickHeader("Credits Used")}>
              Credits Used
            </th>
            <th onClick={() => props.onClickHeader("Invoice Payment Status")}>
              Status
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr
              onClick={() => props.onClickRow(row["Invoice ID"])}
              key={row["Invoice ID"]}
            >
              <td>{row["Invoice ID"]}</td>
              <td>{row["Invoice Amount"]}</td>
              <td>{row["Billing Period Start"]}</td>
              <td>{row["Billing Period End"]}</td>
              <td>
                <div>
                  <ProgressBar
                    progress={
                      (row["Credits Used"] * 100) / row["Credits Limit"]
                    }
                    width="50px"
                    height="5px"
                  />
                  <span>{`${row["Credits Used"]} / ${row["Credits Limit"]}`}</span>
                </div>
              </td>
              <td>{row["Invoice Payment Status"]}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => props.onDownloadReceipt(row["Invoice ID"])}
                >
                  <BsDownload style={{ marginRight: "5px" }} />
                  Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
