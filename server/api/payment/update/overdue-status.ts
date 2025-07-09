import axios from "axios";
//@ts-ignore
const BASE_URL = process.env.BASE_URL
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token

  try {
    const body = await readBody(event);
    const myPayload = {
      student_id: body.student_id
    }

    const result = await axios.put(`${BASE_URL}/api/payment/update/overdue-status`, myPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
})
