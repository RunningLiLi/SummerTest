import {getelement,getelementAll} from "./tool.js"
let rcm;
let rank;
let span1;
let span2;
[rcm,rank]=getelement([".H-recommendation",".H-rank"]);
[span1,span2]=getelementAll([".H-font",".H-line"])
span1[0].style.color='rgb(34, 213, 156)';
span2[0].style.display='inline-block'
rcm.addEventListener("click",()=>{
    span1[0].style.color='rgb(34, 213, 156)';
    span1[1].style.color='rgb(170, 165, 165)';
    span2[0].style.display='inline-block'
    span2[1].style.display='none'
    if(location.pathname!="/index.html"){
        window.location.assign("../index.html")
    }
    
})
rank.addEventListener("click",()=>{
    span1[1].style.color='rgb(34, 213, 156)';
    span1[0].style.color='rgb(170, 165, 165)';
    span2[1].style.display='inline-block'
    span2[0].style.display='none'
})
rank.addEventListener("click",()=>{
    window.location.assign("../pages/rank.html") 
})