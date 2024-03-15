
export const capitalizeFirstLetter = (string: string | undefined): string => {
    if (typeof string === "undefined") return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

