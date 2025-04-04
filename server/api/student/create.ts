import axios from "axios";
//@ts-ignore
const BASE_URL = process.env.BASE_URL
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token

  try {
    const body = await readBody(event);
    const myPayload = {
      student_id: body.student_id,
      student_no: body.student_no,
      semester: body.semester,
      school_year: body.school_year,
      last_name: body.last_name,
      first_name: body.first_name,
      middle_name: body.middle_name,
      course: body.course,
      course_code: body.course_code,
      major: body.major,
      section: body.section,
      gender: body.gender,
      contact_number: body.contact_number,
      course_type: body.course_type,
      tuition_fee: body.tuition_fee,
      discount: body.discount,
      downpayment: body.downpayment
    }

    const result = await axios.post(`${BASE_URL}/api/student-info/create`, myPayload, {
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
