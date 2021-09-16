
import './App.css';
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import NewProduct from './Components/NewProduct'
import ProductList from './Components/ProductList';
import OneProduct from './Components/OneProduct';
import EditProduct from './Components/EditProduct';
// import NotFound from "./views/NotFound";

function App() {
  return (
    <div className="container">
      <nav className=" d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow">
        <h1 className="fs-1 navbar-brand mb-0 mx-auto">Product Manager</h1>
        <div className="d-flex justify-content-center text-justify">
          <Link
            to="/products/all"
            className="col col-2 btn btn-sm btn-success m-2 btn-outline "
          >
            All Products
          </Link>

          <Link
            to="/products"
            className="col col-3 btn btn-sm btn-success m-2 btn-outline"
          >
            Add New Product
          </Link>
        </div>
      </nav>

      <Switch>
 
        <Redirect exact from="/" to="/products" />
        <Route exact path="/products">
          <NewProduct />
        </Route>
        <Route exact path="/products/all">
          <ProductList />
        </Route>
        <Route exact path="/products/:id">
          <OneProduct />
        </Route>
        <Route exact path="/products/:id/edit">
          <EditProduct />
        </Route>
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;