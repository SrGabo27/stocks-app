import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = <T = unknown,>(url: string) => {
	const [data, setData] = useState<T>();
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await axios.get<T>(url);

				setData(data.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, error, loading };
};
