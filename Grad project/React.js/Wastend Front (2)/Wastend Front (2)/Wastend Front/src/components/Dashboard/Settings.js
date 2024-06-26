import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Settings.css";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2";

function Settings() {
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  const mealId = sessionStorage.getItem("mealId");
  const [index, setIndex] = useState("0");
  const [storeData, setStoreData] = useState([]);
  const [surpriseBag, setSurpriseBag] = useState([]);
  const buttons = document.querySelectorAll(".tabs button");
  const StoreId = sessionStorage.getItem("StoreId");
  const SupplierId = sessionStorage.getItem("SupplierId");
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(`http://172.29.176.1/store/${StoreId}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStoreData();
  }, [StoreId, SupplierId]);

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });

  const elements = [
    <SettingsTab
      SupplierId={SupplierId}
      storeData={storeData}
      surpriseBag={surpriseBag}
    />,
    <StoreTab storeData={storeData} />,
    <NotificationsTab storeData={storeData} />,
    <AccountTab storeData={storeData} />,
  ];
  return (
    <div className="page-main">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <div className="content">
          <div className="content-head">
            <h2>Settings</h2>
            <div className="tabs">
              <button className="active" onClick={() => setIndex("0")}>
                Surpise Bag
              </button>
              <button onClick={() => setIndex("1")}>Store</button>
              <button onClick={() => setIndex("2")}>Notifications</button>
              <button onClick={() => setIndex("3")}>Account</button>
            </div>
          </div>
          {elements[index]}
        </div>
      </div>
    </div>
  );
}

export default Settings;

function SettingsTab({ SupplierId }) {
  const [surpriseBag, setSurpriseBag] = useState([]);
  const [isBag, setIsBag] = useState(false);
  useEffect(() => {
    const getSurpriseBag = async () => {
      try {
        const response = await fetch(
          `http://172.29.176.1/meal/display/${SupplierId}`,
          {
            method: "GET",
            headers: { "content-type": "application/json" },
          }
        );
        if (!response.ok) {
          setIsBag(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (response.ok) {
          setIsBag(true);
          setSurpriseBag(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSurpriseBag();
  }, [SupplierId]);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [reccs, setReccs] = useState("");
  useEffect(() => {
    const reccsSaveBtn = document.querySelector(".Btn");
    if (reccs !== "") {
      reccsSaveBtn.classList.remove("disabled");
      localStorage.setItem("reccs", reccs);
    } else {
      reccsSaveBtn.classList.add("disabled");
    }
  }, [reccs]);
  const [collection, setCollection] = useState(
    "Food container and bag, customer may bring their own bag"
  );

  // Collection Handle Change
  const handleChange = (event) => {
    setCollection(event.target.value);
    const CollectionSaveBtn = document.querySelector(".Btn.collection");
    CollectionSaveBtn.classList.remove("disabled");
    localStorage.setItem("collection", collection);
  };

  const backgroundImageStyle = {
    backgroundImage: `url('http://172.29.176.1${surpriseBag.mealPhoto}')`,
  };
  return (
    <>
      {isBag ? (
        <div className="bag-details-card settings-card">
          <div className="card-head">Surpise Bag details</div>
          <hr />
          <div className="card-data">
            <div className="row">
              <div className="block">
                <h4 className="title">Name</h4>
                <p className="title">{surpriseBag.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="block">
                <p className="title">Description</p>
                <p>{surpriseBag.description}</p>
              </div>
            </div>
            <div className="row">
              <div className="block">
                <p className="title">Price</p>
                <p>{surpriseBag.price}</p>
              </div>
              <div className="block">
                <p className="title">Minimum value</p>
                <p>15USD</p>
              </div>
              <div className="block">
                <p className="title">Category</p>
                <p>--</p>
              </div>
              <div className="block">
                <p className="title">Dietary type</p>
                <p>--</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bag-details-card settings-card"
          style={{ textAlign: "center" }}
        >
          No Surprise Bags are Created yet, Please Create one firstly
        </div>
      )}
      <div className="Item-Images-card settings-card">
        <div className="card-head">Item Images</div>
        <hr />
        <div className="card-data">
          <div className="row">
            <p>Logo</p>
            {/* <div className="logo">{surpriseBag.name[0]}</div> */}
          </div>
          <div className="row">
            <p>Background image</p>
            <div className="bg-img" style={backgroundImageStyle}></div>
          </div>
        </div>
      </div>
      <div className="food-safety-rec settings-card">
        <div className="card-head">Food safety recommendations</div>
        <hr />
        <div className="card-data">
          <h4 style={{ marginBottom: "10px" }}>Buffet food safety</h4>
          <p>
            If this Surprise Bag contains food from a buffet, please enable the
            toggle below. This way we can show buffet-specific food safety
            recommendations to the users in the app.
          </p>
          <div className="row">
            <h5>This Surprise Bag contains food from a buffet</h5>
            <Switch
              {...label}
              onChange={() => {
                window.alert("Your Changes were saved");
              }}
            />
          </div>
          <hr></hr>
          <div className="row">
            <h4>
              Additional recommendations{" "}
              <span style={{ color: "grey", fontWeight: "normal" }}>
                (optional)
              </span>
            </h4>
            <p style={{ lineHeight: "1.5", marginTop: "10px" }}>
              If your business has defined recommendations on how to handle and
              store your food, you’re welcome to share them in the field below.
              The recommendations will be shown in the Too Good To Go app.
            </p>
          </div>
          <input
            type="text"
            value={reccs}
            className="reccs"
            placeholder="Enter your description here"
            onChange={(e) => setReccs(e.target.value)}
          />
          <button
            onClick={() => {
              window.alert("Your Changes were saved");
              setReccs("");
            }}
            className="primary-button Btn disabled"
          >
            Save
          </button>
        </div>
      </div>
      <div className="collection-info settings-card">
        <div className="card-head">Collection information</div>
        <hr />
        <div className="card-data">
          <h4>Packaging</h4>
          <p>
            Select the type of packaging you will be offering to customers when
            they collect their order.
          </p>
        </div>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={collection}
              onChange={handleChange}
            >
              <MenuItem
                value={
                  "Food container and bag, customer may bring their own bag"
                }
              >
                Food container and bag, customer may bring their own bag
              </MenuItem>
              <MenuItem value={"Food container and bag"}>
                Food container and bag
              </MenuItem>
              <MenuItem value={"Food container, no bag"}>
                Food container, no bag
              </MenuItem>
            </Select>
          </FormControl>
          <button onClick={()=>
          Swal.fire({
          title: "Settings Saved",
          icon: "success",
          text: "Changes have been saved successfully",
           })}
         className="primary-button Btn collection disabled">
            Save
          </button>
        </Box>
      </div>
    </>
  );
}

function StoreTab({ storeData }) {
  const StoreId = sessionStorage.getItem("StoreId");
  const [ref, setRef] = useState("");
  async function sendInternalRef() {
    const requestBody = {
      id: `${StoreId}`,
      internalReference: ref,
    };
    try {
      const response = await fetch(`http://172.29.176.1/store/${StoreId}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers:{
          'content-type':'application/json'
        }
      });
      if (!response.ok) {
        Swal.fire({
          title: "Failed ",
          icon: "error",
          text: "Failed to Save Internal Reference",
        });
        throw new Error("Failed To Save Internal Reference");
      } else {
        Swal.fire({
          title: "Done",
          icon: "success",
          text: "Internal Reference Saved",
        });
        setRef("");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="storeinfo settings-card">
        <div className="card-head">Store information</div>
        <hr />
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Here you can see the information we have registered about your store.
          If any of this information is incorrect and needs to be changed,
          please get in touch with us.
        </p>
        <div className="card-data">
          <div className="col">
            <div className="left">
              <h4>Store details</h4>
              <p className="title">Name</p>
              <p>{storeData.storeName}</p>
              <p className="title">Store Type</p>
              <p>{storeData.storeType}</p>
            </div>
            <div className="mid"></div>
            <div className="right">
              <h4>Store details</h4>
              <p className="title">Phone number</p>
              <p>{storeData.supplierPhone}</p>
              <p className="title">Emails</p>
              <p>{storeData.supplierEmail}</p>
            </div>
          </div>
          <hr className="center" />
          <h4 style={{ marginTop: "20px" }}>Store description</h4>
          <p style={{ color: "grey", marginTop: "10px" }}></p>
        </div>
      </div>
      <div className="storeinfo settings-card">
        <div className="card-head">
          Internal store reference{" "}
          <span style={{ color: "grey" }}>(optional)</span>
        </div>
        <hr />
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          If your store is part of a larger chain and you have an internal store
          reference for reporting, you can change it here. If specified, it will
          be used in chain reports sent by Wastend
        </p>
        <TextField
          sx={{ width: "100%", marginTop: "10px" }}
          id="standard-basic"
          variant="standard"
          onChange={(e) => setRef(e.target.value)}
        />
        <button
          onClick={() => sendInternalRef()}
          className={
            ref.length >= 3
              ? "primary-button Btn ref "
              : "primary-button Btn ref disabled"
          }
        >
          Save
        </button>
        <div className="card-data"></div>
      </div>
    </>
  );
}

function NotificationsTab({ storeData }) {
  return (
    <>
      <div className="storeinfo settings-card">
        <div className="card-head">Email settings</div>
        <hr />
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Email settings We send you different kinds of emails about the orders
          you receive on the Too Good To Go platform. Here you can select the
          ones you would like to receive and see which email addresses we will
          send them to.
        </p>
        <div className="card-data">
          <div className="row">
            <div className="block">
              <h4>Order confirmation</h4>
              <p>Email sent for each order that has been placed.</p>
            </div>
            <Switch inputProps={{ "aria-label": "controlled" }} />
            <hr />
          </div>
          <div className="row">
            <div className="block">
              <h4>Order cancellation</h4>
              <p>
                Email sent if an order has been cancelled before it has been
                collected.
              </p>
            </div>
            <Switch inputProps={{ "aria-label": "controlled" }} />
            <hr />
          </div>
          <div className="row">
            <div className="block">
              <h4>Monthly Insights</h4>
              <p>
                Monthly email detailing your results and performance on Too Good
                To Go.
              </p>
            </div>
            <Switch inputProps={{ "aria-label": "controlled" }} />
            <hr />
          </div>
          <div className="row">
            <div className="block">
              <h4>Marketing emails</h4>
              <p>
                Newsletters, updates to MyStore and other emails relevant to
                your store.
              </p>
            </div>
            <Switch inputProps={{ "aria-label": "controlled" }} />
            <hr />
          </div>
          <h4>These emails are sent to the following addresses:</h4>
          <p className="email">{storeData.supplierEmail}</p>
        </div>
      </div>
    </>
  );
}

function AccountTab({ storeData }) {
  const [lang, setLang] = useState("English(UK)");
  return (
    <>
      <div className="Account settings-card">
        <div className="card-head">Account information</div>
        <hr />
        <div className="card-data">
          <p style={{ margin: "10px 0" }} className="title">
            User's name
          </p>
          <p>{storeData.storeName}</p>
          <p style={{ margin: "10px 0" }} className="title">
            User's email address
          </p>
          <p>{storeData.supplierEmail}</p>
        </div>
      </div>
      <div className="Accountlang settings-card">
        <div className="card-head">Language</div>
        <hr />
        <div className="card-data">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            sx={{ width: "100%" }}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <MenuItem value={"En-Uk"}>English(UK)</MenuItem>
            <MenuItem value={"En-US"}>English(US)</MenuItem>
            <MenuItem value={"Gr"}>Germany</MenuItem>
            <MenuItem value={"italy"}>Italiano</MenuItem>
          </Select>
        </div>
      </div>
      <div className="cookies settings-card">
        <div className="card-head">Cookie consent</div>
        <hr />
        <div className="card-data">
          <p>
            To be able to give you an optimal user experience, we collect,
            process, and store data about you and your use of our services.
          </p>
        </div>
      </div>
    </>
  );
}
