export function getNumberFromString(str: string) {
    // Create a variable to store the total value of the string
    let total = 0;

    // Iterate through each character in the string
    for (let i = 0; i < str.length; i++) {
        // Add the ASCII value of the character to the total
        total += str.charCodeAt(i);
    }

    // Divide the total by the length of the string and round down to the nearest integer
    let avg = Math.floor(total / str.length);

    // Return a number between 0 and 11 by taking the modulo of the average
    return avg % 12;
}

export default function GenColorFromText(str?: string) {
    const randomClr = (arr: any) => arr[Math.floor(Math.random() * arr.length)]
    const randomColors = [
        '#FE5F55',
        // '#F2E7C9',
        '#EDAD62',
        '#00B295',
        // '#E7EFC5',
        '#4ABD5C',
        '#CB769E',
        // '#BFD7B5',
        '#BD814A',
        '#786F52',
        '#A3C4BC',
        '#4A64BD',
        '#D6A2AD',
        '#413C58',
        '#BD4A4A',
    ]

    return randomClr(randomColors)
}