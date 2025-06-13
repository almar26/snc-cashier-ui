import axios from "axios";
//@ts-ignore
const BASE_URL = process.env.BASE_URL
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token

  try {
    const body = await readBody(event);
    // const myPayload = {

    //   downpayment: body.downpayment
    // }

    const result = await axios.post(`${BASE_URL}/api/payment/tuition-payment`, body, {
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
