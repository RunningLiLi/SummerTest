import {createelement,classGeter,childrenGeter,getelementAll} from "./tool.js"
classGeter();
childrenGeter();
let rcm=document.querySelector(".H-recommendation");
let rank=document.querySelector(".rank");
let footer=document.querySelector(".footer")
footer.style.marginTop=1300+'px'
let span1,span2;
[span1,span2]=getelementAll([".H-font",".H-line"])
span1[1].style.color='rgb(34, 213, 156)';
span2[1].style.display='inline-block'
rcm.addEventListener("click",()=>{
    span1[0].style.color='rgb(34, 213, 156)';
    span1[1].style.color='rgb(170, 165, 165)';
    span2[0].style.display='inline-block'
    span2[1].style.display='none'
    if(location.pathname!="/index.html"){
        window.location.assign("../index.html")
    }
    
})
new Promise((rs,rj)=>{
    let response=fetch("http://124.221.249.219:8000/api/ranking")
    rs(response)
})
.then(r=>r.json())
.then((r)=>{
    let count=0;
    for(let v of r){
        let rankone,rtitle,ul,rimg,img,flag,span,i,span2;
        [rankone,rtitle,ul,rimg,img,flag,span,i,span2]=createelement(["div","span","ul","div","img","span","span","i","span"]);
        [rankone,rtitle,rimg,flag,i].giveclassName(["rankone","r-title","r-img","flag","iconfont icon-bofang"])
        rankone.style.top=count*130+'px'
        count++;
        // console.log([1].__proto__.givechildren([1,23]))
        // [rank,rankone,rankone,rankone,rimg,rimg,rimg,span,span].__proto__.givechildren([rankone,rtitle,ul,rimg,img,flag,span,i,span2])
        rank.appendChild(rankone)
        rankone.appendChild(rtitle)
        rankone.appendChild(ul)
        rankone.appendChild(rimg)
        rimg.appendChild(img)
        rimg.appendChild(flag)
        rimg.appendChild(span)
        span.appendChild(i)
        span.appendChild(span2)
        img.src=v.cover;
        rtitle.innerHTML=v.title;
        span2.innerHTML=v.views;
        rankone.key=count;
        (v.top3).forEach((value,key) => {
            let li=document.createElement("li");
            // let xspan=document.createElement("span");
            ul.appendChild(li);
            let artists='';
            for(let artist of value.artist){
                artists+=artist+'/'
            }
            artists=artists.substr(0,artists.length-1)
            // xspan.innerHTML=artists;
            li.innerHTML=`${key+1}.${value.title}-<span>${artists}</span>`
            li.title=artists
        });
    }
   

})
.then(()=>{
    let ones=document.querySelectorAll(".rankone")
    let arr=[0,1,2,3,4,5,6,7,8,9];
    for(let el of ones){
        let beginsite;
       
        el.addEventListener("touchstart",(e)=>{
            el.style.zIndex=100
            beginsite=e.targetTouches[0].pageY-130;
        })
       
        el.addEventListener("touchmove",(e)=>{
            el.style.top=e.targetTouches[0].pageY-185+'px'
        })
        el.addEventListener("touchend",(e)=>{
           let n1=Math.floor(beginsite/130);
           let n2=Math.floor((e.changedTouches[0].pageY-130)/130);
           ones[arr[n1]].style.top=n2*130+'px'
           ones[arr[n2]].style.top=n1*130+'px'
           let temp=arr[n2];
           arr[n2]=arr[n1];
           arr[n1]=temp;
           console.log(arr)
          
           el.style.zIndex=10
        })
        el.addEventListener("touchmove",(e)=>{
            e.preventDefault();
        })
    }
})
