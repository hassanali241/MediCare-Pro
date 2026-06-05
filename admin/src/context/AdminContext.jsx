import React, { createContext, useReducer, useContext } from "react";

const AdminContext = createContext();

const initialState = {
  admin: null,
  isLoggedIn: false,
  loading: true,
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, admin: action.payload, isLoggedIn: true, loading: false };
    case "LOGOUT":
      return { ...state, admin: null, isLoggedIn: false, loading: false };
    case "LOADED":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const loginAdmin = (data) => dispatch({ type: "LOGIN", payload: data });
  const logoutAdmin = () => dispatch({ type: "LOGOUT" });
  const setLoaded = () => dispatch({ type: "LOADED" });

  return (
    <AdminContext.Provider value={{ ...state, loginAdmin, logoutAdmin, setLoaded }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminContext must be used within AdminProvider");
  return ctx;
};

export default AdminContext;
