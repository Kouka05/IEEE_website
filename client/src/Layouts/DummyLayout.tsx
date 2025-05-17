import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const DummyLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}