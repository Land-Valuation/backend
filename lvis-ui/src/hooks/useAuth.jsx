import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser, selectToken } from "@/state";

export const useIsAuthenticated = () => {
  return useSelector(selectIsAuthenticated);
};

export const useUser = () => {
  return useSelector(selectUser);
};

export const useToken = () => {
  return useSelector(selectToken);
};