import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Performance.css";

import DashboardHeader from "./DashboardHeader";
function Performance() {
  const StoreId = sessionStorage.getItem("StoreId");
  const [index, setIndex] = useState("0");
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  useEffect(() => {
    const buttons = document.querySelectorAll(".tabs .parent-tab");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        buttons.forEach((button) => {
          button.classList.remove("active");
        });
        e.target.classList.add("active");
      });
    });
    const filters = document.querySelectorAll(".filters .filter");
    filters.forEach((filter) => {
      filter.addEventListener("click", (e) => {
        if (e.target.nodeName === "H5" || e.target.nodeName === "H4") {
          filters.forEach((filter) => {
            filter.classList.remove("active");
          });
          e.target.parentElement.classList.add("active");
        } else {
          filters.forEach((filter) => {
            filter.classList.remove("active");
          });
          e.target.classList.add("active");
        }
      });
    });

    const tabs = document.querySelectorAll(".tabs .inner-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        e.target.classList.add("active");
      });
    });
  }, [index]);

  const elements = [
    <Statistics StoreId={StoreId} />,
    <Insights StoreId={StoreId} />,
  ];
  return (
    <div className="page-main performance">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <div className="content">
          <div className="content-head">
            <h2>Performance</h2>
            <div className="tabs">
              <button
                className="parent-tab active"
                onClick={() => setIndex("0")}
              >
                Statistics
              </button>
              <button className="parent-tab" onClick={() => setIndex("1")}>
                Insights
              </button>
            </div>
          </div>
          {elements[index]}
        </div>
      </div>
    </div>
  );
}

export default Performance;

function Statistics({ StoreId }) {
  const [weeksFilter, setWeeksFilter] = useState("30");
  const [performanceData, setPerformanceData] = useState(null);
  useState(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch(
          `http://172.29.176.1/performance/${StoreId}`,
          { method: "GET", headers: { "content-type": "application/json" } }
        );
        if (!response.ok) {
          console.log("failed");
        } else {
          const data = await response.json();
          console.log(data);
          setPerformanceData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerformanceData();
  }, [StoreId, weeksFilter]);
  return (
    <>
      <div className="statistics">
        <div style={{ fontWeight: "bold" }} className="card-head">
          All-time statistics
        </div>
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Here you can see an overview of all your results since you joined
          Wastend. You can see the total number of meals you’ve saved, the
          corresponding CO2 equivalents avoided, the total number of users that
          have ever marked you as their favourite and the amount of impressions
          you've gotten in the app.
        </p>
        <h4 style={{ margin: "40px 0" }}>Stats for selected period</h4>
        <div className="card-data">
          <div className="tabs">
            <button
              onChange={() => setWeeksFilter("30")}
              className="inner-tab active"
            >
              Last 30 days
            </button>
            <button
              onChange={() => setWeeksFilter("12w")}
              className="inner-tab"
            >
              Last 12 weeks
            </button>
            <button
              onChange={() => setWeeksFilter("12m")}
              className="inner-tab"
            >
              Last 12 months
            </button>
          </div>
          <div className="stats filters">
            <div className="filter active">
              <h5>Meals Saved</h5>
              <h4>
                {weeksFilter === "30" &&
                  performanceData?.last30Days.mealsSavedCount}
                {weeksFilter === "12w" &&
                  performanceData?.last12Weeks.mealsSavedCount}
                {weeksFilter === "12m" &&
                  performanceData?.last12Months.mealsSavedCount}
              </h4>
              {console.log(performanceData)}
            </div>
            <div className="filter">
              <h5>Favourites</h5>
              <h4>
                {weeksFilter === "30" &&
                  performanceData?.last30Days.favoriteUsersCount}
                {weeksFilter === "12w" &&
                  performanceData?.last12Weeks.favoriteUsersCount}
                {weeksFilter === "12m" &&
                  performanceData?.last12Months.favoriteUsersCount}
              </h4>
            </div>
            <div className="filter">
              <h5>Impressions</h5>
              <h4>
                {weeksFilter === "30" &&
                  performanceData?.last30Days.favoriteUsersCount}
                {weeksFilter === "12w" &&
                  performanceData?.last12Weeks.favoriteUsersCount}
                {weeksFilter === "12m" &&
                  performanceData?.last12Months.favoriteUsersCount}
              </h4>
            </div>
          </div>
          <div className="period">
            <div className="data">
              <h5>No data to show for the selected period</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Insights({ StoreId }) {
  const [data, setData] = useState("0");
  const [insights, setInsights] = useState(null);
  const [weeksFilter, setWeeksFilter] = useState("30");

  useEffect(() => {
    const getInsights = async () => {
      try {
        const response = await fetch(
          `http://172.29.176.1/performance/Insights/${StoreId}`
        );
        if (!response.ok) {
          throw new Error("Failed To Get Insights");
        }
        if (response.ok) {
          const data = await response.json();
          setInsights(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInsights();
  }, [StoreId, weeksFilter]);

  const element = [
    <OverallRating />,
    <SurBagRating />,
    <StrExpRating />,
    <Cancellations />,
    <Refunds />,
  ];
  return (
    <>
      <div className="insights">
        <div style={{ fontWeight: "bold" }} className="card-head">
          Insights
        </div>
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          This page gives you an overview of how your store is doing on Wastend
          according to user ratings and cancellations. Each box shows the
          average rating or rate for your store within the selected time frame.
          Click on each of the five metrics below to see a detailed breakdown.
        </p>
        <h4 style={{ margin: "40px 0" }}>Stats for selected period</h4>
        <div className="card-data">
          <div className="tabs">
            <button
              onClick={() => setWeeksFilter("30")}
              className="inner-tab active"
            >
              Last 30 days
            </button>
            <button onClick={() => setWeeksFilter("12w")} className="inner-tab">
              Last 12 weeks
            </button>
            <button onClick={() => setWeeksFilter("12m")} className="inner-tab">
              Last 12 months
            </button>
          </div>
          <div className="insights filters">
            <div onClick={() => setData("0")} className="filter active">
              <h5>Overall rating</h5>
              <h4>
                {weeksFilter === "30" && insights?.last30Days.overallRating}
                {weeksFilter === "12w" && insights?.last30Days.overallRating}
                {weeksFilter === "12m" && insights?.last30Days.overallRating}
              </h4>
            </div>
            <div onClick={() => setData("1")} className="filter">
              <h5>Surprise Bag rating</h5>
              <h4>
                {weeksFilter === "30" && insights?.last30Days.surpriseBagRating}
                {weeksFilter === "12w" &&
                  insights?.last30Days.surpriseBagRating}
                {weeksFilter === "12m" &&
                  insights?.last30Days.surpriseBagRating}
              </h4>
            </div>
            <div onClick={() => setData("2")} className="filter">
              <h5>Store experience rating</h5>
              <h4>
                {weeksFilter === "30" &&
                  insights?.last30Days.storeExperienceRating}
                {weeksFilter === "12w" &&
                  insights?.last30Days.storeExperienceRating}
                {weeksFilter === "12m" &&
                  insights?.last30Days.storeExperienceRating}
              </h4>
            </div>
            <div onClick={() => setData("3")} className="filter">
              <h5>Cancellations</h5>
              <h4>
                {weeksFilter === "30" && insights?.last30Days.cancellations}
                {weeksFilter === "12w" && insights?.last30Days.cancellations}
                {weeksFilter === "12m" && insights?.last30Days.cancellations}
              </h4>
            </div>
          </div>
          <div className="filter-data">{element[data]}</div>
        </div>
      </div>
    </>
  );
}

function OverallRating() {
  return (
    <>
      <div className="info">
        <h5>Overall rating</h5>
        <p>
          Once a customer has picked up their Surprise Bag we ask them to rate
          their purchase from one to five stars. This is a rating of their
          overall experience. Please aim to keep this rating above 3,5.
        </p>
      </div>
    </>
  );
}

function SurBagRating() {
  return (
    <>
      <div className="info">
        <h5>Surprise Bag rating</h5>
        <p>
          The Surprise Bag rating shows how the customer valued the quantity,
          quality and variety of food in their Surprise Bag. Please aim to keep
          this rating above 3,5.
        </p>
      </div>
    </>
  );
}

function StrExpRating() {
  return (
    <>
      <div className="info">
        <h5>Store experience rating</h5>
        <p>
          The store experience rating describes the customers' experience during
          the collection part of their purchase. This rating is an indication of
          what the customers thought of the service and the waiting time in your
          store. Please aim to keep this rating above 3,5.
        </p>
      </div>
    </>
  );
}

function Cancellations() {
  return (
    <>
      <div className="info">
        <h5>Cancellations</h5>
        <p>
          The cancellation rate is the percentage orders that your store has
          cancelled. We expect you to keep the cancellation rate below 5%.
          <br />
          <br />
          <br /> If your cancellation rate is too high, consider adjusting your
          weekly schedule to better reflect the amount of surplus food you have
          available. If it is necessary to make cancellations, please do so at
          least two hours before the collection time starts.
        </p>
      </div>
    </>
  );
}
function Refunds() {
  return (
    <>
      <div className="info">
        <h5>Refunds</h5>
        <p>
          The refund rate is the percentage of orders that have been refunded. A
          meal is refunded when customers arrived at a closed store, were
          unhappy about their food or if there was no food left. We expect a
          refund rate below 5%.
          <br />
          <br />
          <br /> If your refund rate is too high, it's likely because you forgot
          to register holidays. Remember to add a Special Day on days where your
          store is closed, and when you are open, to keep an eye on your
          Dashboard and adjust if needed.
        </p>
      </div>
    </>
  );
}
