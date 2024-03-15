export const convertDataToCSV = (data: any) => {
  // Function to convert nested arrays to a readable format
  const convertNestedArrays = (arr: any) => {
    if (Array.isArray(arr)) {
      return arr
        .map((item) => {
          const nestedValues = Object.values(item).join(", ");
          return `{ ${nestedValues} }`;
        })
        .join("; ");
    }
    return arr;
  };

  // Get all unique property keys from the objects
  const allKeys = data.reduce((keys: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);

  // Create the CSV header row
  const header = allKeys.join(",");

  // Create the CSV data rows
  const rows = data.map((obj: any) => {
    return allKeys
      .map((key: any) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          return convertNestedArrays(value);
        }
        return value ? String(value) : "";
      })
      .join(",");
  });

  // Combine the header and data rows
  const csv = [header, ...rows].join("\n");

  return csv;
};
