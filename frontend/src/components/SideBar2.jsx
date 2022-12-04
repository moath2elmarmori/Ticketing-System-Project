// the old sidebar that was causing the problem because of the use of react media

// import { useRef } from "react";
// import { AiFillPushpin, AiOutlineHome } from "react-icons/ai";
// import {
//   MdOutlineProductionQuantityLimits,
//   MdAddShoppingCart,
// } from "react-icons/md";
// import { FaTicketAlt } from "react-icons/fa";
// import { IoIosStats } from "react-icons/io";
// import SideBarIconContainer from "./SideBarIconContainer";
// // import Media from "react-media";

// function SideBar() {
//   const sideBarRef = useRef();
//   const sideBarWithQueryRef = useRef();
//   const toggleSideBarHandler = () => {
//     sideBarRef.current.classList.toggle("active");
//     sideBarRef.current.parentElement.classList.toggle("active");
//   };
//   return (
//     <div className="side-bar fixed w-32" ref={sideBarRef}>
//       <button
//         className="toggle-side-bar-button absolute text-xl"
//         title="Toggle Sidebar"
//         onClick={toggleSideBarHandler}
//       >
//         <AiFillPushpin />
//       </button>
//       {/* <div className="min-height-without-heading the-sidebar"> */}
//       <Media query="(max-width: 500px)">
//         {(matches) => {
//           if (matches) {
//             sideBarWithQueryRef.current.addEventListener("click", (e) => {
//               sideBarWithQueryRef.current.parentElement.classList.remove(
//                 "active"
//               );
//               sideBarWithQueryRef.current.parentElement.parentElement.classList.remove(
//                 "active"
//               );
//             });
//           }
//           return (
//             <>
//               {matches && (
//                 <div className="make-overlay-on-all-content-in-mobile"></div>
//               )}
//               <div
//                 className="min-height-without-heading the-sidebar"
//                 ref={sideBarWithQueryRef}
//               >
//                 <SideBarIconContainer wherToNavigate={"/"}>
//                   <AiOutlineHome />
//                   <p>Home</p>
//                 </SideBarIconContainer>
//                 <SideBarIconContainer wherToNavigate={"/products"}>
//                   <MdOutlineProductionQuantityLimits />
//                   <p>Products</p>
//                 </SideBarIconContainer>
//                 <SideBarIconContainer wherToNavigate={"/statistics"}>
//                   <IoIosStats />
//                   <p>Statistics</p>
//                 </SideBarIconContainer>
//                 <SideBarIconContainer wherToNavigate={"/ticketing-system"}>
//                   <FaTicketAlt />
//                   <p>Ticketing System</p>
//                 </SideBarIconContainer>
//                 <SideBarIconContainer wherToNavigate={"/add-product"}>
//                   <MdAddShoppingCart />
//                   <p>Add Product</p>
//                 </SideBarIconContainer>
//               </div>
//             </>
//           );
//         }}
//       </Media>
//       {/* </div> */}
//     </div>
//   );
// }

// export default SideBar;
