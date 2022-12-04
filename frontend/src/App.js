import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./pages/AddProduct";
import { AuthContextProvider } from "./context/auth-context";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Statistics from "./pages/Statistics";
import TicketingSystem from "./pages/TicketingSystem";
import ContentContainer from "./components/ContentContainer";
import Users from "./pages/Users";
import Tickets from "./pages/Tickets";
import SingleProduct from "./components/SingleProduct";
import NewTicketForm from "./components/NewTicketForm";
import TicketDetails from "./pages/TicketDetails";
import MyProducts from "./pages/MyProducts";
import MyTickets from "./pages/MyTickets";
import ProtectedRoutes from "./components/ProtectedRoutes";

const client = new ApolloClient({
  uri: "https://moath-ticketing-system.onrender.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div className="app">
              <Header />
              <Routes>
                {/* protected routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<ContentContainer />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-products" element={<MyProducts />} />
                    <Route path="products" element={<Products />} />
                    <Route
                      path="products/:productId"
                      element={<SingleProduct />}
                    />
                    <Route
                      path="products/:productId/new-ticket"
                      element={<NewTicketForm />}
                    />
                    <Route
                      path="products/:productId/tickets/:ticketId"
                      element={<TicketDetails />}
                    />
                    <Route path="statistics" element={<Statistics />} />
                    <Route
                      path="ticketing-system"
                      element={<TicketingSystem />}
                    />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="users" element={<Users />} />
                    <Route path="/my-tickets" element={<MyTickets />} />
                    <Route path="tickets" element={<Tickets />} />
                  </Route>
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
