import { JwtPayload, jwtDecode } from "jwt-decode";
import { getFromLocalStorage } from "./localStorage";

export const getUserFromLocalStorage = (): JwtPayload | undefined => {
  const token = getFromLocalStorage("access-token") as string;

  const decodedUser = jwtDecode(token);

  return decodedUser;
};
