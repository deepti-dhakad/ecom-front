import logo from "./logo.svg";
import BrandInterface from "./components/brand/BrandInterface";
import CategoryInterface from "./components/category/CategoryInterface";
import DisplayAll from "./components/category/DisplayAll";
import DisplayFormat from "./components/category/DisplayFormat";
import ModelInterface from "./components/model/ModelInterface";
import DisplayModel from "./components/model/DisplayModel";
import DisplayTracking from "./components/DisplayTracking";
import DisplayBrand from "./components/brand/DisplayBrand";
import ProductInterface from "./components/product/ProductInterface";
import DisplayProduct from "./components/product/DisplayProduct";
import AdminLogin from "./components/admin/AdminLogin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import ProductPicture from "./components/productPicture/ProductPicture";
import MainPage from "./components/ClientView/MainPage";
import Footer from "./components/ClientView/Footer";
import Footers from "./components/ClientView/Footers";
import Home from "./components/ClientView/Home";
import QtyCtrl from "./components/ClientView/QtyCtrl";
import Register from "./components/ClientView/Register";
import SignIn from "./components/ClientView/SignIn";
import Login from "./components/ClientView/Login";
import ListProducts from "./components/ClientView/ListProducts";
import ProductView from "./components/ClientView/ProductView";
import SproductView from "./components/ClientView/SproductView";
import Filter from "./components/ClientView/Filter";
import StateCityArea from "./components/statecity/StateCityArea";
import SignInClient from "./components/ClientView/SignInClient";
import SignInUserForm from "./components/ClientView/SignInUserForm";
import ShowCartWithAddress from "./components/ClientView/ShowCartWithAddress";
import PaymmentGateway from "./components/ClientView/PaymentGateway";
import PaymentGateway from "./components/ClientView/PaymentGateway";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route
          exact
          strict
          component={CategoryInterface}
          path="/categoryinterface"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayFormat}
          path="/DisplayFormat"
          history={props.history}
        />
        <Route
          exact
          strict
          component={BrandInterface}
          path="/BrandInterface"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayBrand}
          path="/DisplayBrand"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ModelInterface}
          path="/ModelInterface"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayModel}
          path="/DisplayModel"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ProductInterface}
          path="/ProductInterface"
          history={props.history}
        />
        <Route
          exact
          strict
          component={DisplayProduct}
          path="/DisplayProduct"
          history={props.history}
        />
        <Route
          exact
          strict
          component={AdminLogin}
          path="/AdminLogin"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Dashboard}
          path="/Dashboard"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ProductPicture}
          path="/productpicture"
          history={props.history}
        />
        <Route
          exact
          strict
          component={MainPage}
          path="/MainPage"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Footer}
          path="/Footer"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Footers}
          path="/Footers"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Home}
          path="/Home"
          history={props.history}
        />
        <Route
          exact
          strict
          component={QtyCtrl}
          path="/QtyCtrl"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Register}
          path="/Register"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Login}
          path="/Login"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SignIn}
          path="/SignIn"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ListProducts}
          path="/ListProducts"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ProductView}
          path="/ProductView/:pid"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SproductView}
          path="/SproductView/:pid"
          history={props.history}
        />
        <Route
          exact
          strict
          component={Filter}
          path="/Filter"
          history={props.history}
        />
        <Route
          exact
          strict
          component={StateCityArea}
          path="/StateCityArea"
          history={props.history}
        />
        <Route
          exact
          strict
          component={SignInClient}
          path="/SignInClient"
          history={props.history}
        />

        <Route
          exact
          strict
          component={SignInUserForm}
          path="/signinuserform"
          history={props.history}
        />
        <Route
          exact
          strict
          component={ShowCartWithAddress}
          path="/ShowCartWithAddress"
          history={props.history}
        />

        <Route
          exact
          strict
          component={PaymentGateway}
          path="/PaymentGateway"
          history={props.history}
        />
      </Router>
    </div>
  );
}

export default App;
