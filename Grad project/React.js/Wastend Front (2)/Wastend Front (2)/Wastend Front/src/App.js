import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Diversity from "./components/Diversity";
import Careers from "./components/Careers";
import Opportunites from "./components/Opportunites";
import Site from "./components/Site";
import User from "./components/User";
import Business from "./components/Business";
import Login from "./components/Login";
import Bakery from "./components/Bakery";
import Supermarket from "./components/Supermarket";
import Restaurant from "./components/Restaurant";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Dashboard/Calendar";
import GetStarted from "./components/Dashboard/GetStarted";
import Schedule from "./components/Dashboard/Schedule";
import Settings from "./components/Dashboard/Settings";
import Performance from "./components/Dashboard/Performance";
import Sales from "./components/Dashboard/Sales";
import HelpCenter from "./components/Dashboard/HelpCenter";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* HOME ROUTE Start */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* HOME ROUTE End */}

        {/* Careers ROUTE Start */}
        <Route
          path="/careers"
          element={
            <>
              <Header />
              <Careers />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* Careers ROUTE End */}

        {/* diversity ROUTE Start */}
        <Route
          path="/diversity"
          element={
            <>
              <Header />
              <Diversity />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* diversity ROUTE End */}

        {/* opportunities ROUTE Start */}
        <Route
          path="/carrers/opportunities"
          element={
            <>
              <Header />
              <Opportunites />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* opportunities ROUTE End */}

        {/* Main-Site Route Start */}
        <Route
          path="/:lang"
          element={
            <>
              <Header different={true} isHome={true} />
              <Site />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* Main-Site Route End */}

        {/* user Route Start */}
        <Route
          path="/:lang/user"
          element={
            <>
              <Header different={true} isUser={true} />
              <User />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* user Route End */}

        {/* business Route Start */}
        <Route
          path="/:lang/business"
          element={
            <>
              <Header different={true} isUser={false} />
              <Business />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* business Route End */}

        {/* bakery Route start */}

        <Route
          path="/:lang/business/bakery"
          element={
            <>
              <Header different={true} isUser={false} />
              <Bakery />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* bakery Route End */}

        {/* supermarket Route start */}
        <Route
          path="/:lang/business/supermarket"
          element={
            <>
              <Header different={true} isUser={false} />
              <Supermarket />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* supermarket Route End */}

        {/* restaurant Route start */}
        <Route
          path="/:lang/business/restaurant"
          element={
            <>
              <Header different={true} isUser={false} />
              <Restaurant />
              <Footer display={true} />
            </>
          }
        ></Route>
        {/* restaurant Route End */}

        {/* MyStoreLogin Route start */}
        <Route
          path="/MyStoreLogin"
          element={
            <>
              <Login />
              <Footer display={false} />
            </>
          }
        ></Route>
        <Route path="/:loggedUser/get-started" element={<GetStarted />}></Route>
        {/* MyStoreLogin Route End */}
        <Route
          path="/:loggedUser/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/calendar"
          element={
            <>
              <Calendar />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/schedule"
          element={
            <>
              <Schedule />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/settings"
          element={
            <>
              <Settings />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/performance"
          element={
            <>
              <Performance />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/sales"
          element={
            <>
              <Sales />
            </>
          }
        ></Route>
        <Route
          path="/:loggedUser/help-center"
          element={
            <>
              <HelpCenter />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
