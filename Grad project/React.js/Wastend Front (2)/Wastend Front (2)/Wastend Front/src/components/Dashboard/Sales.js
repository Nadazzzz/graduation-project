import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Sales.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Switch } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2";

function Sales() {
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [route, setRoute] = useState("");
  const [account, setAccount] = useState("");
  const [SaveBtn , setSaveBtn] = useState(false)
  const [storeData , setStoreData] = useState(null)
  const StoreId = sessionStorage.getItem("StoreId")

  useEffect(()=>{
    const getStoreData = async ()=>{
      try{
        const response = await fetch(`http://172.29.176.1/store/${StoreId}`)
        if(!response.ok){
          throw new Error("Failed To Fetch Data")
        }
        if(response.ok){
          const data = await response.json()
          setStoreData(data)
        }
      }catch(error){
        console.log(error);
      }
    }
    getStoreData()
  } , [])
  console.log(storeData)
  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [checked, setChecked] = React.useState(true);

useEffect(()=>{
  if (route.length >= 8 && account.length >=8) setSaveBtn(true)

},[route , account])
  function handlePaymentbutton(){
    if (route === "" || account === "") return
    handleClose()
    setSaveBtn(true)
    Swal.fire({
      title: "Done",
      icon: "success",
      text: "Payment Method Added",
    });
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="page-main sales">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <div className="content">
          <div className="settings-card">
            <h2>Your payouts</h2>
            <div className="settings-card">
              <div style={{ padding: "10px 0" }} className="upper">
                <h4 style={{ marginBottom: "20px" }}>
                  No upcoming payouts yet
                </h4>
                <p style={{ fontSize: "14px", width: "80%" }}>
                  Once you start making sales, you’ll see your accrued payout
                  amount for the current payout cycle here. When the amount
                  reaches your minimum payout amount, we will send the money to
                  your payout method in accordance with your payout cycle. Be
                  sure to add your payout method below.
                </p>
              </div>
              <hr style={{ margin: "20px 0" }} />
              <p style={{ fontSize: "13px", color: "grey" }}>Updated monthly</p>
            </div>
            <div className="block">
              <h5>Payout cycle</h5>
              <p>Quarterly (January, April, July, October)</p>
            </div>
            <div className="block">
              <h5>Minimum payout amount</h5>
              <p>50 USD</p>
            </div>
            <button onClick={handleOpen} className="primary-button">
              Add payout method
            </button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2>Add your payout method</h2>
                <p
                  style={{
                    fontSize: "14px",
                    margin: "15px 0",
                    lineHeight: "1.8",
                  }}
                >
                  Add your bank account information below. Before we can start
                  sending your payouts to your bank account, you’ll need to
                  verify it by clicking the verification link we’ll send to your
                  email.
                </p>
                <TextField
                  onChange={(e) => setRoute(e.target.value)}
                  sx={{ width: "70%", margin: "15px 0" }}
                  id="outlined-basic"
                  label="Routing number"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => setAccount(e.target.value)}
                  sx={{ width: "70%", margin: "15px 0" }}
                  id="outlined-basic"
                  label="Account number"
                  variant="outlined"
                />
                <hr />
                <div className="formButtons">
                  <button className="primary-button" onClick={handleClose}>
                    CLOSE
                  </button>
                  <button
                    className={SaveBtn ? "primary-button save " : "primary-button save disabled"}
                    onClick={handlePaymentbutton}
                  >
                    Save
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
          <div className="settings-card">
            <h2>Monthly Statements</h2>
            <p>
              Download documents detailing your activity per month on Wastend
            </p>
            <div className="table">
              <hr />
              <div className="table-titles">
                <p className="title">Months</p>
                <p className="title">Order Summaries</p>
                <p className="title">Invoices</p>
                <p className="title">Account Statements</p>
              </div>
              <hr />
              <div className="table-data">
                <h4>No documents yet</h4>
                <p>
                  Your documents will be available here once you have been
                  active on Too Good To Go for at least one month.
                </p>
              </div>
            </div>
          </div>
          <div className="settings-card">
            <div className="card-head">
              <div className="text">
                <h2>Order invoices</h2>
                <p style={{ fontSize: "14px", fontWeight: "normal" }}>
                  Download invoices and credit notes for each individual sale on
                  Wastend
                </p>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="table">
              <hr />
              <div className="table-titles">
                <p className="title">Order ID</p>
                <p className="title">Total</p>
                <p className="title">Invoice</p>
                <p className="title">Credit Note</p>
              </div>
              <hr />
              <div className="table-data">
                <h4>You don't have any orders on this day.</h4>
                <p>
                  Invoices are generated approximately at the time when
                  customers pick up their meal.
                </p>
              </div>
            </div>
          </div>
          <div className="settings-card">
            <h2>Contractual partner</h2>
            <p>
              Details about the business we have registered as the contractual
              partner and legal seller of items on Wastend platform
            </p>
            <div className="row">
              <div className="block">
                <p className="title">Address</p>
                <p>-</p>
              </div>
              <div className="block">
                <p className="title">Postal code</p>
                <p>-</p>
              </div>
              <div className="block">
                <p className="title">Invoice emails sent to</p>
                <p>{storeData?.supplierEmail}</p>
              </div>
            </div>
            <div className="row">
              <div className="block">
                <p className="title">City</p>
                <p>-</p>
              </div>
              <div className="block">
                <p className="title">Country</p>
                <p>Egypt</p>
              </div>
            </div>
            <hr style={{ margin: "20px 0" }} />
            <div className="row">
              <div className="text">
                <h4>
                  Monthly sales overview email{" "}
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </h4>
                <p style={{ width: "60%", fontSize: "14px" }}>
                  Email sent at the beginning of each month with an overview of
                  your sales, commission fees, and a balance statement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
