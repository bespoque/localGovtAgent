
export const ReplaceWordWith = (sentence: string, wordToReplace: string, replacingWord: string) => {
    const strArr = sentence.split(" ")
    const index = sentence.toUpperCase().split(" ").indexOf(wordToReplace.toUpperCase())
    if (index > -1) {
        strArr[index] = replacingWord
        return strArr.join(" ")
    }
    return sentence
}