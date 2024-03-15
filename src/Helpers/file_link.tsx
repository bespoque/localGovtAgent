export function file_link(dir: string, fileName: string) {
  // staging
  return `https://cdn.staging.hydrogenhr.com/hydrogenhr/${dir}${fileName}`
  //   live
  //   return `https://cdn.hydrogenhr.com/${dir}${fileName}`
}
