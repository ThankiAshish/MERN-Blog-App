import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserState = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("UserState must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
