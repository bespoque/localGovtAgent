import { toast } from 'react-toastify'

export const onChange = (e: any, changeState: any) => {
  const input = e.target
  const form = input.form
  const value = input.type === 'checkbox' ? input.checked : input.value

  changeState((prev: any) => ({
    ...prev,
    [form.name]: {
      ...prev[form.name],
      [input.name]: value,
    },
  }))
}

export const handleTextLength = (text: string, length = 20) => {
  if (!text) {
    return 'N/A'
  }
  if (text.length > length) {
    return text.substring(0, length) + '...'
  } else {
    return text
  }
}

export const isUndefined = (text: string) => {
  return text && text !== '' ? text : 'N/A'
}

export const apiErrorHandler = (error: any | undefined) => {
  toast.error(error?.response?.data?.statusMessage || 'An error occured')
}

export const handleDroppedDocument = function (
  event: any,
  inputName: string,
  formName: string,
  validTypes: string[],
  changeState: Function
) {
  event.stopPropagation()
  event.preventDefault()
  let { files } = event.dataTransfer
  let targetFileUpdate: Record<string, string> = {}

  if (files[0]) {
    targetFileUpdate[inputName] = files[0]
  }
  if (!validTypes.includes(files[0].type)) {
    event.target.value = null
    toast.error('Invalid File Fomat')
    return
  }

  changeState((prev: { [x: string]: any }) => ({
    ...prev,
    [formName]: {
      ...prev[formName],
      ...targetFileUpdate,
    },
  }))
}

export function hasContent(value: any) {
  if (value && value !== undefined && value !== null && value !== '') {
    return true
  }
  return false
}

export const removeUnderscore = (str: string) => {
  if (!str) {
    // returns null/undefined/0, etc
    return str
  }

  return str
    .split('_')
    .filter((char) => char !== '_')
    .join(' ')
  // .toLowerCase();
}
