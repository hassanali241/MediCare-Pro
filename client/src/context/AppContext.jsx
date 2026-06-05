import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  loading: true,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case "CLEAR_USER":
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user) => dispatch({ type: "SET_USER", payload: user });
  const clearUser = () => dispatch({ type: "CLEAR_USER" });
  const setLoading = (val) => dispatch({ type: "SET_LOADING", payload: val });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        clearUser,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export default AppContext;
