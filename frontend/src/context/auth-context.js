import { useState, createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  userRole: null,
  setUserRole: () => {},
  companyId: null,
  setCompanyId: () => {},
  companyRegistered: false,
  setCompanyRegistered: () => {},
  registerAs: "",
  setRegisterAs: () => {},
  renderRegisterForm: false,
  setRenderRegisterForm: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const isUserInLocalStorage = localStorage.getItem("user") ? true : false;
  const userData = isUserInLocalStorage
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (userData) {
    const mustRemoveLocalStorage =
      userData.expiresIn - new Date().getTime() < 0;
    if (mustRemoveLocalStorage) {
      localStorage.clear();
    }
  }

  const userDataId = userData ? userData._id : null;
  const userDataCompanyId = userData ? userData.companyId : null;
  const userDataRole = userData ? userData.role : null;

  const [isLoggedIn, setIsLoggedIn] = useState(isUserInLocalStorage);
  const [userId, setUserId] = useState(userDataId);
  const [companyId, setCompanyId] = useState(userDataCompanyId);
  const [userRole, setUserRole] = useState(userDataRole);
  const [companyRegistered, setCompanyRegistered] = useState(false);
  const [registerAs, setRegisterAs] = useState("");
  const [renderRegisterForm, setRenderRegisterForm] = useState(false);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    companyId,
    setCompanyId,
    userRole,
    setUserRole,
    companyRegistered,
    setCompanyRegistered,
    registerAs,
    setRegisterAs,
    renderRegisterForm,
    setRenderRegisterForm,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
