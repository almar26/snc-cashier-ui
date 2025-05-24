import axios from 'axios'
//@ts-ignore
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const query = getQuery(event);
  const token = cookies?.token
  try {
    const result = await axios.get(`${BASE_URL}/api/payment/dues?student_id=${query.student_id}&semester=${query.semester}&school_year=${query.sy}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(result) {
      return result.data;
    }
  } catch (err) { 
    console.log(err);
  }
})
