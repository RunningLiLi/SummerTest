import {createelement} from "./tool.js"
export async function get(flag){
    let response=await fetch("http://124.221.249.219:8000/api/recommendations");
    let result=await response.json();
    let arr=[];
    let parent;
    if(flag==1){
        parent=document.querySelector(".O-show");
        arr=result.offical;
    }else if(flag==2){
        parent=document.querySelector(".O-show2");
        arr=result.tatsujin;
    }else if(flag==3){
        parent=document.querySelector(".O-show3");
        arr=result.column;
        for (let i=0;i<arr.length;i++){
            let sone;
            let sbc;
            let sicon;
            let sicon2;
            let img;
            let span;
            let div;
            [sone,sbc,sicon,sicon2,img,span,div]=createelement(['div','img','div','div','img','span','div']);
            sone.className='s-one'
            sbc.className='s-bc'
            sicon.className='s-icon'
            sicon2.className='s-icon2'
            parent.appendChild(sone)
            sone.appendChild(sicon)
            sone.appendChild(div)
            sicon.appendChild(sbc)
            sicon.appendChild(sicon2)
            sicon2.appendChild(img)
            sicon2.appendChild(span)
            sbc.src=arr[i].background;
            img.src=arr[i].icon;
            img.alt='接口炸了'
            span.innerHTML=arr[i].title
            div.innerHTML=arr[i].description     
        }
        return true;
    }
    for(let j=0;j<arr.length;j++){
        let Oone=document.createElement("div");
        let div1=document.createElement("div");
        let div2=document.createElement("div");
        let img=document.createElement("img");
        let Onum=document.createElement("div");
        let i=document.createElement("i");
        let span=document.createElement("span");
        Oone.className='O-one';
        Onum.className='O-num';
        i.className='iconfont icon-bofang';
        Oone.appendChild(div1)
        Oone.appendChild(div2)
        div1.appendChild(img)
        div1.appendChild(Onum)
        Onum.appendChild(span)
        Onum.appendChild(i)
        parent.appendChild(Oone); 
        img.src=arr[j].cover;
        span.innerHTML=arr[j].views;
        div2.innerHTML=arr[j].title;

    }
     
}