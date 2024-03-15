
const titleCase = (str: string)=>{
    let sentence = str.toLowerCase().split("_");
        for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
    return sentence.join(" ");
}
export default titleCase

