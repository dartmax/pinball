import axios from "axios";

const fetchData = async (api: string, setData: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.get(api, config);
  if (res && res.data) {
    setData(res.data);

    return res;
  }
};

export default fetchData;
