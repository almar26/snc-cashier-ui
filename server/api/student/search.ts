import axios from "axios";
//@ts-ignore
const BASE_URL = process.env.BASE_URL;
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token;
  const query = getQuery(event);
  try {
    const result = await axios.get(
      `${BASE_URL}/api/student-info/account/search?searchid=${query.searchid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
});
