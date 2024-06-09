import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  console.log(data);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
