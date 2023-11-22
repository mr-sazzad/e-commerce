import { JwtPayload, jwtDecode } from "jwt-decode";
import { getFromLocalStorage } from "./localStorage";

export const getUserFromLocalStorage = (): JwtPayload | undefined => {
  const token = getFromLocalStorage("access-token") as string;

  if (!token) {
    return undefined;
  }

  try {
    const decodedUser = jwtDecode(token);
    return decodedUser;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};
