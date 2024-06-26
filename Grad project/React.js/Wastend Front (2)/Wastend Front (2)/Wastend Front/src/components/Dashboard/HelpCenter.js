import React, { useState } from "react";
import Nav from "./Nav";
import "./styles/HelpCenter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChampagneGlasses,
  faMoneyBill1,
  faQuestion,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import DashboardHeader from "./DashboardHeader";
function HelpCenter() {
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  const [accordions, setAccordions] = useState("");
  const elements = [<DailyOpr />, <Financials />, <Share />, <CommonQuest />];
  return (
    <div className="page-main help-center">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <section className="content">
          <h2>Help Center </h2>
          <p>
            Here you can find answers to most of the questions you might have
            about how to use MyStore and how Too Good To Go works. Select a
            topic below to find the answer to your question.
          </p>
          <div className="topic">
            <div onClick={() => setAccordions("0")} className="box">
              <FontAwesomeIcon icon={faBriefcase} />
              <h4>Daily Operations</h4>
              <p>
                Get help with your daily operations including managing supply,
                collection time and customer payments.
              </p>
            </div>
            <div onClick={() => setAccordions("1")} className="box">
              <FontAwesomeIcon icon={faMoneyBill1} />
              <h4>Financials</h4>
              <p>Information about payouts and invoices</p>
            </div>
            <div onClick={() => setAccordions("2")} className="box">
              <FontAwesomeIcon icon={faChampagneGlasses} />
              <h4>Sharing</h4>
              <p>Spread the word about our collaboration!</p>
            </div>
            <div onClick={() => setAccordions("3")} className="box">
              <FontAwesomeIcon icon={faQuestion} />
              <h4>Common Questions</h4>
              <p>Answers to general questions and other useful information.</p>
            </div>
          </div>
          {elements[accordions]}
        </section>
      </div>
    </div>
  );
}

export default HelpCenter;

function DailyOpr() {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let accordion = e.target;
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
      accordion.classList.toggle("active");
    }
  }

  return (
    <div className="accordions-holder">
      <h2>Daily Operations</h2>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          How do I change what I have for sale right now?
        </h3>
        <div className="accordion-details">
          You can view how many Surprise Bags you have for sale, and how many of
          those bags have been reserved by customers, on the Dashboard page. The
          large number indicates the number of available Surprise Bags that have
          not been reserved yet. Below this number you can see the total number
          of Surprise Bags for sale in the current sales window. Should you wish
          to change the amount of available Surprise Bags for sale, you can
          adjust the amount using the plus and minus buttons. You can see when
          the day's sales close and when the Surprise Bags are being picked up
          by customers under 'sale and collection status'. The collection time
          can be adjusted by clicking on the pencil. Please remember that
          changes made on the Dashboard page only apply to the current sales
          window. If you wish to make permanent changes to the number of
          Surprise Bags and collection times you need to use the weekly
          Schedule.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          I don't have enough leftovers, can I cancel my upcoming reservations?{" "}
        </h3>
        <div className="accordion-details">
          Should you, as the day unfolds, realise that you do not have enough
          food left over for all the customers, it is possible to cancel
          reservations on the Dashboard page. Customers with cancelled
          reservations will be notified by email and potentially by notification
          and text message.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          I would like to adjust meals for sale and collection time for all days{" "}
        </h3>
        <div className="accordion-details">
          On the weekly Schedule page, you'll find your recurring weekly
          Schedule for the selected Surprise Bag. Here you can see the number of
          Surprise Bags that are automatically put for sale on the Too Good To
          Go app for each day of the week and the specified collection time.
          Here you can make changes to the number of Surprise Bags for sale
          and/or the collection times for every day of the week. To make
          temporary changes to the number of Surprise Bags or the collection
          time, for example in connection with holidays or vacation, please use
          the Calendar tab. If your store offers several types of Surprise Bags,
          please make sure to change the weekly Schedule for each of them
          individually.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          I am going on vacation or have other deviations from my ordinary
          opening hours{" "}
        </h3>
        <div className="accordion-details">
          Should your store be closed or have different opening hours than
          usual, it’s important to register these changes as "Special Days" so
          that customers don’t show up at your store in vain. You add Special
          Days in the "Calendar" tab where you can change your collection times,
          adjust the number of Surprise Bags for sale, or set the store as
          closed for the days in question. Please note that Special Days have to
          be added for each of your Surprise Bag types individually. For certain
          holidays, such as Christmas and Easter, suggested Special Days are
          added to your Calendar in advance (marked yellow) and we ask you to
          review them and register any changes. To make permanent changes to the
          number of Surprise Bags or the collection time, please use the
          Schedule tab instead.
        </div>
      </div>
    </div>
  );
}
function Financials() {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let accordion = e.target;
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
      accordion.classList.toggle("active");
    }
  }

  return (
    <div className="accordions-holder">
      <h2>Financials</h2>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          What does Wastend cost?{" "}
        </h3>
        <div className="accordion-details">
          When you sell your surplus food on our marketplace, we take a small
          fee of 1.79 USD for each sale you make and an annual service fee of 89
          USD. These fees are deducted from your earnings, which means we’ll
          never bill you for our services. You can always cancel your account
          with us at any time without any commitment or extra costs.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          How do payouts work?{" "}
        </h3>
        <div className="accordion-details">
          We transfer your accrued payouts directly to the bank account that you
          add as your payout method. How often you get paid out depends on your
          minimum payout amount and your payout cycle. Be sure to add your bank
          account information for us to be able to pay you out. We will store
          this information securely and only use it to send you your payouts.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          How much do I earn per Surprise Bag sold?{" "}
        </h3>
        <div className="accordion-details">
          For each Surprise Bag sold on our platform, we take a small fee – the
          rest of the amount is yours. For your payout to be released, it needs
          to reach your minimum payout amount. When exactly we pay you out and
          how often depends on your payout cycle.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          What is the annual fee?
        </h3>
        <div className="accordion-details">
          For us to be able to run and maintain our platform, we charge an
          annual fee. You will never have to pay anything to us upfront! We
          simply deduct the annual fee from your earnings before we pay you out.
          Your annual fee: 89 USD
        </div>
      </div>
    </div>
  );
}
function Share() {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let accordion = e.target;
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
      accordion.classList.toggle("active");
    }
  }

  return (
    <div className="accordions-holder">
      <h2>Sharing</h2>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          How do I tell people that I collaborate with Wastend?{" "}
        </h3>
        <div className="accordion-details">
          On the page Share you can find pictures and links to share on social
          media to spread the messages about our collaboration. On this page you
          can download pictures for sharing on Instagram or Snapchat, or copy a
          shareable Facebook, LinkedIn or Twitter link. It is also possible to
          receive a sticker for your store, to show customers that you
          collaborate with Too Good To Go. If you haven't already received a
          sticker, feel free to contact us.
        </div>
      </div>
    </div>
  );
}
function CommonQuest() {
  function showAccordion(e) {
    if (e.target.classList.contains("accordion-title")) {
      let accordion = e.target;
      let details = e.target.nextElementSibling;
      details.classList.toggle("show");
      accordion.classList.toggle("active");
    }
  }

  return (
    <div className="accordions-holder">
      <h2>Common Questions</h2>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          How does Wastend work?{" "}
        </h3>
        <div className="accordion-details">
          With Too Good To Go, stores can sell surplus food that would otherwise
          have been thrown away. Surprise Bags will be offered daily in the Too
          Good To Go app, where customers can make a purchase and then collect
          the Surprise Bag in the store. The customers reserve and pay for their
          Surprise Bag in the app. During collection the customer will show and
          swipe their order, and your staff simply pass over the Surprise Bag.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          What is MyStore?{" "}
        </h3>
        <div className="accordion-details">
          MyStore is the tool that allows you as a store to control the Surprise
          Bag(s) for reservation in the Too Good To Go app daily. MyStore
          further allows you to see the active reservations, register Special
          Days, download financial documents and read store-specific statistics
          and ratings.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          When are the customers allowed to collect their food?{" "}
        </h3>
        <div className="accordion-details">
          The customers can collect their reservation within the collection time
          specified in MyStore and the Too Good To Go app. Usually the
          collection time is just around closing time, but it varies from store
          to store. Should it be necessary to change the collection time, this
          can be done in MyStore.
        </div>
      </div>
      <div className="accordion">
        <h3 onClick={(e) => showAccordion(e)} className="accordion-title">
          I am going on vacation or have other deviations from my ordinary
          opening hours{" "}
        </h3>
        <div className="accordion-details">
          Should your store be closed or have different opening hours than
          usual, it’s important to register these changes as "Special Days" so
          that customers don’t show up at your store in vain. You add Special
          Days in the "Calendar" tab where you can change your collection times,
          adjust the number of Surprise Bags for sale, or set the store as
          closed for the days in question. Please note that Special Days have to
          be added for each of your Surprise Bag types individually. For certain
          holidays, such as Christmas and Easter, suggested Special Days are
          added to your Calendar in advance (marked yellow) and we ask you to
          review them and register any changes. To make permanent changes to the
          number of Surprise Bags or the collection time, please use the
          Schedule tab instead.
        </div>
      </div>
    </div>
  );
}
