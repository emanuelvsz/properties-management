import { useLocation } from "react-router-dom";

const useIsPayedTrue = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const payedParam = searchParams.get("payed");
  return payedParam === "true";
};

export default useIsPayedTrue;
