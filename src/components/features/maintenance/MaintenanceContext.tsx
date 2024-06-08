"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";

interface MaintenanceContextValue {
  isMaintenance: boolean;
}

interface Response {
  status: "ACTIVE" | "INACTIVE";
}

const MaintenanceContext = createContext<MaintenanceContextValue | null>(null);

export const useMaintenanceContext = () => {
  return useContext(MaintenanceContext);
};

export const MaintenanceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const maintenanceQuery = useQuery<Response>({
    queryKey: ["maintenanceQuery"],
    queryFn: async () => {
      const maintenanceQuery = await axios.get(
        "https://api-checker-c3co.onrender.com/checker/1"
      );

      return maintenanceQuery.data;
    },
    refetchInterval: 1000 * 60,
  });

  const isMaintenance = maintenanceQuery.data?.status === "INACTIVE";

  return (
    <MaintenanceContext.Provider
      value={{
        isMaintenance,
      }}
    >
      {isMaintenance ? <></> : children}
    </MaintenanceContext.Provider>
  );
};
