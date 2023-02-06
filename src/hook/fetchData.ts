//ts-ignore
import axios from "axios";

async function fetchData(api: string, setData: any) {
  try {
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200 && res.data) {
      setData(res.data);
      return res;
    }
  } catch (error) {
    if (error) console.error(error);
  }
}

export default fetchData;