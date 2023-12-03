import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_URL } from "../constant";

import { UserDataType } from "../types/UserDatatype";
import { RowSelected } from "@/types/rowSelected";
import { Dispatch, SetStateAction } from "react";
interface DashboardContextDataType {
  data: UserDataType[];
  setData:  Dispatch<SetStateAction<UserDataType[]>>;
  rowSelected: RowSelected;
  setRowSelected: (rowSelected: RowSelected) => void;
}

interface DashboardContextProviderProps {
  children: ReactNode;
}

const DashboardContext = createContext<DashboardContextDataType | undefined>(
  undefined
);

export const useDashboard = (): DashboardContextDataType => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};

export const DashboardProvider = ({
  children,
}: DashboardContextProviderProps) => {
  const [data, setData] = useState<UserDataType[]>([]);
  const [rowSelected, setRowSelected] = useState<RowSelected>({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

//   console.log(data);
  return (
    <DashboardContext.Provider
      value={{ data, setData, rowSelected, setRowSelected }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
