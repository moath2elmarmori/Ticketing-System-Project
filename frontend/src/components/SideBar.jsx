import { useRef, useState, useEffect } from "react";
import { AiFillPushpin, AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineProductionQuantityLimits,
  MdAddShoppingCart,
} from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import SideBarIconContainer from "./SideBarIconContainer";

function SideBar() {
  const [media, setMedia] = useState({
    matches: window.innerWidth <= 500 ? true : false,
  });
  const sideBarRef = useRef();
  const sideBarWithQueryRef = useRef();
  const toggleSideBarHandler = () => {
    sideBarRef.current.classList.toggle("active");
    sideBarRef.current.parentElement.classList.toggle("active");
  };
  const handleSideBarClick = (e) => {
    sideBarWithQueryRef.current.parentElement.classList.remove("active");
    sideBarWithQueryRef.current.parentElement.parentElement.classList.remove(
      "active"
    );
  };

  useEffect(() => {
    if (media.matches) {
      sideBarWithQueryRef.current.addEventListener("click", handleSideBarClick);
    }
    const handleResize = (e) => {
      const innerWidth = e.currentTarget.innerWidth;
      if (innerWidth <= 500 && media.matches === false) {
        setMedia((prevState) => {
          return { matches: true };
        });
      } else if (innerWidth > 500 && media.matches === true) {
        setMedia((prevState) => {
          return { matches: false };
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [media.matches]);
  return (
    <div
      // className="side-bar bg-sky-400 fixed w-32 flex flex-col items-center container"
      className="side-bar fixed w-32"
      ref={sideBarRef}
    >
      <button
        className="toggle-side-bar-button absolute text-xl"
        title="Toggle Sidebar"
        onClick={toggleSideBarHandler}
      >
        <AiFillPushpin />
      </button>
      {media.matches && (
        <div className="make-overlay-on-all-content-in-mobile"></div>
      )}
      <div
        className="min-height-without-heading flex flex-col absolute"
        ref={sideBarWithQueryRef}
      >
        <SideBarIconContainer wherToNavigate={"/"}>
          <AiOutlineHome />
          <p>Home</p>
        </SideBarIconContainer>
        <SideBarIconContainer wherToNavigate={"/products"}>
          <MdOutlineProductionQuantityLimits />
          <p>Products</p>
        </SideBarIconContainer>
        <SideBarIconContainer wherToNavigate={"/statistics"}>
          <IoIosStats />
          <p>Statistics</p>
        </SideBarIconContainer>
        <SideBarIconContainer wherToNavigate={"/ticketing-system"}>
          <FaTicketAlt />
          <p>Ticketing System</p>
        </SideBarIconContainer>
        <SideBarIconContainer wherToNavigate={"/add-product"}>
          <MdAddShoppingCart />
          <p>Add Product</p>
        </SideBarIconContainer>
      </div>
    </div>
  );
}

export default SideBar;
