import axios from 'axios'
//@ts-ignore
const SIS_BASE_URL = process.env.SIS_BASE_URL
//@ts-ignore
const SIS_API_TOKEN = process.env.SIS_API_TOKEN

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const token = cookies?.token
    const result = await axios.get(`${SIS_BASE_URL}/api/student/list`,
      {
        headers: {
          Authorization: `Bearer ${SIS_API_TOKEN}`
        }
      }
    )
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
})