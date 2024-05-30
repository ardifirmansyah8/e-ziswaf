import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "@/utils/constants";

export const useFetchLandingData = () => {
  return useQuery({
    queryKey: ["landing-data"],
    queryFn: (): Promise<any> =>
      axios({
        method: "get",
        url: `${BASE_API_URL}/app/landing/all`,
      })
        .then((res) => res.data)
        .catch((e: Promise<Error>) => console.error(e)),
  });
};
