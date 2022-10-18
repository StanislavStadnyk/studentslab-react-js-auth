import { useContext } from "react";

import { AuthContext } from "../components/AuthProvider/AuthProvider";

const useAuth = () => useContext(AuthContext);

export { useAuth };
