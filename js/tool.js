export function getelement(arr){
    let output=[];
    for (let key of arr){
        output.push(document.querySelector(key));
    }
    return output
}
export function getelementAll(arr){
    let output=[];
    for (let key of arr){
        output.push(document.querySelectorAll(key));
    }
    return output
}
export function createelement(arr){
    let output=[];
    for (let key of arr){
        output.push(document.createElement(key));
    }
    return output
}
export function classGeter(){
    Array.prototype.giveclassName=function(arr){
    this.forEach((value,key) => {
        value.className=arr[key];
    });
 } 
}
export function childrenGeter(){
    Array.prototype.givechilden=(arr)=>{
        console.log(arr)
    
 } 
}