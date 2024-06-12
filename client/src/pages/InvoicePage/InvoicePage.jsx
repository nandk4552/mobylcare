import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState, useRef, memo } from "react";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import "./InvoivePage.css";
const BillsPage = () => {
  const componentRef = useRef();

  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/invoice/get-invoices`
      );
      setBillsData(data.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNo",
      key: "customerPhoneNo",
    },
    {
      title: "Grand Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Issues",
      dataIndex: "mobileIssues",
      key: "mobileIssues",
      render: (issues) => issues.join(", "),
    },
    {
      title: "Date",
      dataIndex: "orderOn",
      key: "orderOn",
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
      <div className="d-flex justify-content-between">
        <h1 className="header-title">Invoice List</h1>
      </div>
      <Table dataSource={billsData} columns={columns} bordered />

      {popupModal && (
        <Modal
          title="Invoice Details"
          open={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={null}
        >
          <div className="invoice">
            <div id="invoice-POS" ref={componentRef}>
              <center id="top">
                <div className="info">
                  <h2>Mobylcare</h2>
                  <p>Contact: 123456 | Domalguda Hyderabad</p>
                </div>
              </center>
              <div id="mid">
                <div className="mt-2">
                  <p>
                    Customer Name: <b>{selectedBill.customerName}</b>
                    <br />
                    Phone No: <b>{selectedBill.customerPhoneNo}</b>
                    <br />
                    Date:{" "}
                    <b>{new Date(selectedBill.orderOn).toLocaleDateString()}</b>
                    <br />
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h2>Issue</h2>
                        </td>
                        <td className="item">
                          <div />
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                      </tr>
                      <tr className="service">
                        <td className="tableitem">
                          <p className="itemtext">
                            {selectedBill.mobileIssues.join(", ")}
                          </p>
                        </td>
                        <td className="item">
                          <div />
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">
                            ${selectedBill.totalAmount}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="legalcopy">
                  <p className="legal">
                    <strong>Thank you for your order!</strong> Please note that
                    this is a non-refundable amount. For any assistance, please
                    write to
                    <b> help@mobylcare.com</b>.
                  </p>
                </div>
              </div>
            </div>
          </div>
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

export default memo(BillsPage);
