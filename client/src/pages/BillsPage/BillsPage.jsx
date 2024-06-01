import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";

import "./BillsPage.css";
const BillsPage = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/bill/get-bills`
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setBillsData(data.bills);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Contact No",
      dataIndex: "customerNumber",
      key: "customerNumber",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },

    {
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{
              cursor: "pointer",
              color: "blue",
              fontSize: "20px",
            }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between ">
        <div className="w-100">
          <h1 className="header-title">Invoice List</h1>
        </div>
      </div>
      <Table dataSource={billsData} columns={columns} bordered />;
      {/* pop modal */}
      {popupModal && (
        <Modal
          title={`Invoice Details`}
          open={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={null}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Mobylcare POS</h2>
                <p> Contact : 123456 | Domalguda Hyderabad</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
