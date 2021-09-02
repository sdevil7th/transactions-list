import { useState } from "react";
import { BsX } from "react-icons/bs";
import "./TransactionDetailsModal.scss";

export default function TransactionDetailsModal(props) {
  const [data, setData] = useState(props.data);

  const onChangeHandler = (value, name) => {
    setData({ ...data, [name]: value });
  };

  const onSaveData = () => {
    // basic non-empty validation
    let flag = Object.keys(data).every((key) => !!data[key]);
    if (!flag) {
      return;
    }
    props.onSave(data);
    props.onCloseModal();
  };

  return (
    <div className="modal-container">
      <div className="backdrop" onClick={props.onCloseModal}></div>
      <div className="modal">
        <div className="modal-header">
          <span>{data["Invoice ID"]}</span>
          <BsX onClick={props.onCloseModal} />
        </div>
        <div className="modal-body">
          <div className="form-field">
            <label>Amount</label>
            <input
              type="number"
              className="input"
              placeholder="Enter amount"
              value={data["Invoice Amount"]}
              onChange={(event) =>
                onChangeHandler(event.target.value, "Invoice Amount")
              }
            />
          </div>
          <div className="form-field">
            <label>Start Date</label>
            <input
              className="input"
              placeholder="Enter start date"
              value={data["Billing Period Start"]}
              onChange={(event) =>
                onChangeHandler(event.target.value, "Billing Period Start")
              }
            />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input
              className="input"
              placeholder="Enter end date"
              value={data["Billing Period End"]}
              onChange={(event) =>
                onChangeHandler(event.target.value, "Billing Period End")
              }
            />
          </div>
          <div className="form-field">
            <label>Credits Used</label>
            <input
              type="number"
              className="input"
              placeholder="Enter credits used"
              value={data["Credits Used"]}
              onChange={(event) =>
                onChangeHandler(event.target.value, "Credits Used")
              }
            />
          </div>
          <div className="form-field">
            <label>Credits Limit</label>
            <input
              type="number"
              className="input"
              placeholder="Enter credits limit"
              value={data["Credits Limit"]}
              onChange={(event) =>
                onChangeHandler(event.target.value, "Credits Limit")
              }
            />
          </div>
          <div className="form-field radio-btns">
            <div>
              <input
                type="radio"
                id="paid"
                name="payment_status"
                value="Paid"
                checked={data["Invoice Payment Status"] === "Paid"}
                onChange={(event) =>
                  onChangeHandler(event.target.value, "Invoice Payment Status")
                }
              />
              <label>Paid</label>
            </div>
            <div>
              <input
                type="radio"
                id="unpaid"
                name="payment_success"
                value="Unpaid"
                checked={data["Invoice Payment Status"] === "Unpaid"}
                onChange={(event) =>
                  onChangeHandler(event.target.value, "Invoice Payment Status")
                }
              />
              <label>Unpaid</label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="footer-btns">
            <button className="btn btn-secondary" onClick={props.onCloseModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSaveData}>
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
