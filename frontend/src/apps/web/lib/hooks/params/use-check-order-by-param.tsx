import { useLocation } from "react-router-dom";

const useCheckOrderByParam = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const params = searchParams.entries();
	let paramCount = 0;
	let isOrderByOnly = true;

	for (let param of params) {
		paramCount++;
		if (param[0] !== "order_by") {
			isOrderByOnly = false;
			break;
		}
	}

	return isOrderByOnly && paramCount === 1;
};

export default useCheckOrderByParam;
