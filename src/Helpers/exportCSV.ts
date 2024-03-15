import { saveAs } from 'file-saver'
import { convertDataToCSV } from "./convertDataToCSV"

export const exportCSV = (data: any, file_name: string) => {
    const csvData = convertDataToCSV(data)
    if (csvData) {
      const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8'})
      saveAs(blob, file_name)
    }
  }
