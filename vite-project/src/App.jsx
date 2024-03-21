import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Layout from "./components/Layout";
import About from "./components/About";
import List from "./components/List";
import EditBook from "./components/EditBook";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={<Products />}></Route> */}
            <Route path="/" element={<List />}></Route>
            <Route path="/edit/:id" element={<EditBook />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
