import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./styles/Dashboard.css";
import "./styles/MediaQueries.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2";
function Dashboard() {
  const [storeName, setStoreName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [BagName, setBagName] = useState("");
  const [BagDesc, setDesc] = useState("");
  const [price, setPrice] = React.useState("");
  const [index, setIndex] = useState(0);
  const [bagsPerDay, setBagsPerDay] = useState("");
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState([]);
  const [joinedDays, setJoinedDays] = useState("");
  const [surprisebag, setSurpriseBag] = useState(null);
  const [mealPhoto, setMealPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const SupplierId = sessionStorage.getItem("SupplierId");
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  useEffect(() => {
    const fetchStoreName = async () => {
      try {
        const response = await fetch(
          `http://172.29.176.1/supplier/store-info/${SupplierId}`,
          { method: "GET", headers: { "content-type": "multipart/form-data" } }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStoreName(data.storeName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStoreName();
  }, [SupplierId]);

  useEffect(() => {
    const getSurpriseBag = async () => {
      try {
        const response = await fetch(
          `http://172.29.176.1/meal/display/${SupplierId}`,
          { method: "GET", headers: { "content-type": "application/json" } }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data) {
          setSurpriseBag([]);
          throw new Error("No surprise bag available");
        }
        if (response.ok) {
          setSurpriseBag(data);
          setMealPhoto(data.mealPhoto);
        }
        sessionStorage.setItem("mealId", data._id);
      } catch (error) {
        console.log(error);
      }
    };
    getSurpriseBag();
  }, [SupplierId]);

  const  handleStepForm = async()=> {
    if (index === 0 && selectedCategory === "") {
      console.log("FALSE");
      return;
    }
    if (index === 1 && (BagName === "" || BagDesc === "")) {
      return;
    }
    if (index === 2 && price === "") {
      return;
    }
    if (index === 3 && (bagsPerDay === "" || days.length === 0)) {
      return;
    }
    setIndex(index + 1);
    const formData = new FormData();
    formData.append("name", BagName);
    formData.append("description", BagDesc);
    formData.append("category", selectedCategory);
    formData.append("price", Number(price));
    formData.append("quantityPerDay", Number(bagsPerDay));
    formData.append("dayOfWeek", joinedDays);
    formData.append("mealPhoto", uploadedPhoto);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    if (index === 3) {
      setOpen(false);
      setIndex(0);
      try {
        const response = await fetch(`http://172.29.176.1/meal/${SupplierId}`, {
          method: "POST",
          body: formData,
        })
        if(!response.ok){
          setOpen(false)
          setStoreName("")
          setSelectedCategory("")
          setBagName("")
          setDesc("")
          setJoinedDays("")
          setDays("")
          setBagsPerDay("")
          Swal.fire({
            title:"Failed",
            text:"Failed To create Bag, Please Try again",
            icon:'error',
            confirmButtonText:'Ok'
          })
          throw new Error ("Uploading Photo Error")
        }
        const result = await response.json()
        if(response.ok){
          setOpen(false)
          setStoreName("")
          setSelectedCategory("")
          setBagName("")
          setDesc("")
          setJoinedDays("")
          setDays("")
          setBagsPerDay("")
          Swal.fire({
            title:"Success",
            text:"Bag Created Successfully",
            icon:'success',
            confirmButtonText:'Ok'
          })
          sessionStorage.setItem("mealId", result._id)
        }
      }catch(error){
            console.log(error)
      }
    }
  }

  return (
    <div className="page-main dashboard">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <div className="content">
          <h2 style={{ marginBottom: "30px" }}>Hi, {storeName}</h2>
          {surprisebag?._id ? (
            <BagCreated surprisebag={surprisebag} mealPhoto={mealPhoto} />
          ) : (
            <BagNotCreated
              handleStepForm={handleStepForm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setBagName={setBagName}
              setDesc={setDesc}
              setPrice={setPrice}
              price={price}
              index={index}
              setIndex={setIndex}
              setBagsPerDay={setBagsPerDay}
              setJoinedDays={setJoinedDays}
              joinedDays={joinedDays}
              bagsPerDay={bagsPerDay}
              setDays={setDays}
              days={days}
              setOpen={setOpen}
              open={open}
              setUploadedPhoto={setUploadedPhoto}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

function BagCreated({ surprisebag, mealPhoto }) {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
    }
  }

  const mealPhotoStyle = {
    backgroundImage: `url('http://172.29.176.1${mealPhoto}')`,
  };
  return (
    <>
      <div className="card">
        <div className="card-title">{surprisebag.name}</div>
        <div className="card-content">
          <div className="card-head">
            <div className="card-img" style={surprisebag && mealPhotoStyle}>
              <div className="shop-logo">{surprisebag.name[0]}</div>
            </div>
            <p className="data-title">Name</p>
            <p className="data-details">{surprisebag.name}</p>
            <p className="data-title">Description</p>
            <p className="data-details">{surprisebag.description}</p>
            <p className="data-title">Minimum value per Surprise Bag</p>
            <p className="data-details">{surprisebag.price}</p>
            <p className="data-title">Price in app</p>
            <p className="data-details">{surprisebag.price}</p>
          </div>
        </div>
      </div>
      <div className="tips">
        <h3>Tips and resources</h3>
        <div className="accordions">
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What is a surprise bag?
            </h3>
            <div className="accordion-details">
              A Surprise Bag is what customers buy from you on the Too Good To
              Go app. As most stores can't predict what will be left at the end
              of the day, we make sure not to specify exactly what the contents
              of the bags will be. The contents will vary from day to day and
              always be a surprise to the customer.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              Earnings and payouts
            </h3>
            <div className="accordion-details">
              We take a small fee of 1.09 GBP for every Surprise Bag sold on our
              app – the rest is yours! Once your minimum payout amount has been
              reached, we pay your earnings into your bank account every 3
              months.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              How do I sell my surplus food on your app?
            </h3>
            <div className="accordion-details">
              Once you've set up your account, your store will be visible to
              customers on our app. On the days you've selected, a set number of
              Surprise Bags will automatically be put up for sale. In the last
              30 minutes before your store closes, customers that have reserved
              a Surprise Bag will come to your store to pick it up. Payment is
              automatically handled in the app – just check for a receipt on
              each customer's phone and hand them their Surprise Bag.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What does Too Good To Go cost?
            </h3>
            <div className="accordion-details">
              When you sell your surplus food on our marketplace, we take a
              small fee of 1.09 GBP for each sale you make and an annual service
              fee of 39.00 GBP. These fees are deducted from your earnings,
              which means we’ll never bill you for our services. You can always
              cancel your account with us at any time without any commitment or
              extra costs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BagNotCreated({
  selectedCategory,
  setSelectedCategory,
  setDesc,
  setBagName,
  setPrice,
  price,
  handleStepForm,
  index,
  setIndex,
  bagsPerDay,
  setBagsPerDay,
  setDays,
  days,
  open,
  setOpen,
  setJoinedDays,
  joinedDays,
  setUploadedPhoto,
}) {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRaduis: "20px",
    boxShadow: 24,
    p: 4,
  };
  const modalData = [
    <Category
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />,
    <Storename setDesc={setDesc} setBagName={setBagName} />,
    <Prices setPrice={setPrice} price={price} />,
    <BagsPerDay
      setBagsPerDay={setBagsPerDay}
      bagsPerDay={bagsPerDay}
      setDays={setDays}
      days={days}
      joinedDays={joinedDays}
      setJoinedDays={setJoinedDays}
      setUploadedPhoto={setUploadedPhoto}
    />,
  ];

  return (
    <>
      <div className="create-bag-area">
        <h3>
          To start selling your surplus food, create your first Surprise Bag
        </h3>
        <button onClick={handleOpen}>Create bag</button>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="module-head">
            <h2>Create Your Surprise bag</h2>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClose();
                setIndex(0);
              }}
              icon={faXmark}
            />
          </div>
          <div className="info">
            <p>
              Let customers know what they can expect in their Surprise Bags.
            </p>
          </div>
          {modalData[index]}
          <button
            id="progressBtn"
            className="primary-button"
            onClick={() => handleStepForm()}
          >
            Continue
          </button>
        </Box>
      </Modal>
      <div className="tips">
        <h3>Tips and resources</h3>
        <div className="accordions">
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What is a surprise bag?
            </h3>
            <div className="accordion-details">
              A Surprise Bag is what customers buy from you on the Too Good To
              Go app. As most stores can't predict what will be left at the end
              of the day, we make sure not to specify exactly what the contents
              of the bags will be. The contents will vary from day to day and
              always be a surprise to the customer.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              Earnings and payouts
            </h3>
            <div className="accordion-details">
              We take a small fee of 1.09 GBP for every Surprise Bag sold on our
              app – the rest is yours! Once your minimum payout amount has been
              reached, we pay your earnings into your bank account every 3
              months.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              How do I sell my surplus food on your app?
            </h3>
            <div className="accordion-details">
              Once you've set up your account, your store will be visible to
              customers on our app. On the days you've selected, a set number of
              Surprise Bags will automatically be put up for sale. In the last
              30 minutes before your store closes, customers that have reserved
              a Surprise Bag will come to your store to pick it up. Payment is
              automatically handled in the app – just check for a receipt on
              each customer's phone and hand them their Surprise Bag.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What does Too Good To Go cost?
            </h3>
            <div className="accordion-details">
              When you sell your surplus food on our marketplace, we take a
              small fee of 1.09 GBP for each sale you make and an annual service
              fee of 39.00 GBP. These fees are deducted from your earnings,
              which means we’ll never bill you for our services. You can always
              cancel your account with us at any time without any commitment or
              extra costs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Category({ selectedCategory, setSelectedCategory }) {
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selectedCategory}
        onChange={handleChange}
        style={{overflowY:'scroll',
          height:'500px',
          flexWrap: "nowrap",
        }}
      >
        {/* ', '','', '',
 '','','', '','', '','','' */}
        <FormControlLabel value="meat" control={<Radio />} label="meat" />
        <FormControlLabel
          value="Seafood"
          control={<Radio />}
          label="Seafood"
        />
        <FormControlLabel
          value="Pizza"
          control={<Radio />}
          label="Pizza"
        />
        <FormControlLabel value="fruits and vegetables" control={<Radio />} label="fruits and vegetables" />
        <FormControlLabel value="Burgers" control={<Radio />} label="Burgers" />
        <FormControlLabel value="Pasta" control={<Radio />} label="Pasta" />
        <FormControlLabel value="Sandwiches" control={<Radio />} label="Sandwiches" />
        <FormControlLabel value="Soups" control={<Radio />} label="Soups" />
        <FormControlLabel value="Salads" control={<Radio />} label="Salads" />
        <FormControlLabel value="Beverages" control={<Radio />} label="Beverages" />
        <FormControlLabel value="Desserts" control={<Radio />} label="Desserts" />
        <FormControlLabel value="Baked" control={<Radio />} label="Baked" />
      </RadioGroup>
    </FormControl>
  );
}

function Storename({ setBagName, setDesc }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Name"
        sx={{ marginBottom: "20px" }}
        variant="outlined"
        onChange={(e) => setBagName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        sx={{ marginBottom: "20px" }}
        variant="outlined"
        onChange={(e) => setDesc(e.target.value)}
      />
    </>
  );
}

function Prices({ setPrice, price }) {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
    }
  }
  const handleChange = (event) => {
    setPrice(event.target.value);
  };
  return (
    <>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Price</FormLabel>
        <RadioGroup
          sx={{ marginBottom: "20px" }}
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={price}
          onChange={handleChange}
        >
          <FormControlLabel
            value="12.00"
            control={<Radio />}
            label="12.00 USD value per bag"
          />
          <FormControlLabel
            value="18.00"
            control={<Radio />}
            label="18.00 USD value per bag"
          />
          <FormControlLabel
            value="30.00"
            control={<Radio />}
            label="30.00 USD value per bag"
          />
        </RadioGroup>
      </FormControl>

      <h2 style={{ marginBottom: "20px" }}>Need help?</h2>
      <div className="tips">
        <div className="accordions">
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              How much will I earn per Surprise Bag sold?
            </h3>
            <div className="accordion-details">
              For each Surprise Bag sold on our platform, we take a small fee of
              1.79 USD – the rest of the amount is yours.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What is the difference between price in app and value per Surprise
              Bag?
            </h3>
            <div className="accordion-details">
              Surprise Bags are priced at 1/3 of their contents' original retail
              value. That means that if a Surprise Bag is sold at 5.99 USD in
              the app, its contents must be worth at least 18.00 USD. This
              ensures that you and our customers get a great deal on food that
              would otherwise go to waste.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              How do payouts work?
            </h3>
            <div className="accordion-details">
              Once your minimum payout amount has been reached, we pay your
              earnings into your bank account every 3 months. Be sure to add
              your bank account information for us to be able to pay you out. We
              will store this information securely and only use it to send you
              your payouts.
            </div>
          </div>
          <hr />
          <div className="accordion">
            <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
              What does Wastend cost?
            </h3>
            <div className="accordion-details">
              When you sell your surplus food on our marketplace, we take a
              small fee of 1.79 USD for each sale you make and an annual service
              fee. These fees are deducted from your earnings, which means we’ll
              never bill you for our services. You can always cancel your
              account with us at any time without any commitment or extra costs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BagsPerDay({
  setBagsPerDay,
  setDays,
  days,
  joinedDays,
  setJoinedDays,
  setUploadedPhoto,
}) {
  const style = {
    textAlign: "center",
  };

  function toggleBtn(target) {
    const day = target.innerHTML;
    const updatedDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];

    setDays(updatedDays);
    setJoinedDays(updatedDays.join(", "));
    target.classList.toggle("selected");
  }
  console.log(joinedDays);
  return (
    <>
      <h2>Surprise Bags per day</h2>
      <p style={{ fontSize: "13px", color: "grey" }}>
        Set the number of Surprise Bags per day
      </p>
      <ToggleButtonGroup
        sx={style}
        color="primary"
        value={BagsPerDay}
        exclusive
        onChange={(e) => {
          setBagsPerDay(e.target.value);
        }}
        aria-label="Platform"
      >
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{ margin: "20px 0" }} />
      <div className="days-section">
        <h5>Days of the week</h5>
        <p style={{ fontSize: "13px", color: "grey" }}>
          Set which days you want to sell
        </p>
        <div className="days">
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Sun
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Mon
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Tue
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Wen
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Thu
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Fri
          </button>
          <button onClick={(e) => toggleBtn(e.target)} className="day">
            Sat
          </button>
        </div>
        <input
          type="file"
          className="mealPhoto"
          name="mealPhoto"
          onChange={(e) => setUploadedPhoto(e.target.files[0])}
        />
      </div>
    </>
  );
}
