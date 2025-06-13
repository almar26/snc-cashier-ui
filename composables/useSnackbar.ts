import { ref } from 'vue'

const snackbar = ref(false)
const message = ref('')
const color = ref('success')

export function useSnackbar() {
  function show(msg: string, clr: string = 'success') {
    message.value = msg
    color.value = clr
    snackbar.value = true
  }

  return {
    snackbar,
    message,
    color,
    show,
  }
}
