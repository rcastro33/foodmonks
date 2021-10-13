import { React, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { Grafico } from "../Grafico";
import { NoMatch } from "../NoMatch";
import { NavigationBar } from "../cliente/NavBar";
import { Footer } from "../../components/Footer";
import { CartProvider } from "react-use-cart";
import styled from "styled-components";

const Styles = styled.div`
  #page-container {
    position: relative;
    min-height: calc(100vh - 3.5rem);
    padding-bottom: 7rem; //doble footer
  }
`;

function Cliente() {
  return (
    <Styles>
      <div id="page-container">
        <NavigationBar />
        <Router>
          <Switch>
            <Fragment>
              <CartProvider>
                {/* el home tiene su propio layout*/}
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
              </CartProvider>
              <Route exact path="/grafica" component={Grafico} />
              <Route path="*" component={NoMatch} />
            </Fragment>
          </Switch>
        </Router>
        <Footer />
      </div>
    </Styles>
  );
}

export default Cliente;
