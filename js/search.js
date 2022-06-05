import {getelement, getelementAll,createelement} from "./tool.js"
let Binput,Bfont,Bi,Btext,cancel,del,HotSearch,Search,HisSearch;
let songsheets;
[songsheets]=getelementAll([".Official-Super"]);
let Hi=document.querySelector(".iconshanchu");
[Binput,Bfont,Bi,Btext,cancel,del,HotSearch,Search,HisSearch]=getelement([".B-input",".B-font",".iconfont icon-sousuo",".B-text",".cancel",".delete",".HotSearch",".Search",".HisSearch"])
Binput.addEventListener("focus",()=>{
        Btext.style.display='none'
        Bfont.className='B-font2'
        Binput.placeholder='搜索'
        cancel.style.display='block'
        Binput.style.width="80%"
        for(let el of songsheets){
            el.style.display='none'
        };
        let HotConter=document.querySelector("#HotConter");
        let HotSearch=document.querySelector(".HotSearch");

        HotSearch.style.display='block'
        if(localStorage.length>0){
            HisSearch.style.display='block'
        }
        if(localStorage.length==0){
            HisSearch.style.display='none'
        }
        
        if(!HotConter.querySelector("span")){
            new Promise((rs,rj)=>{
                let respose=fetch("http://124.221.249.219:8000/api/hot");
                rs(respose)
            })
            .then((rs)=>{return rs.json()})
            .then((rs)=>{
                for(let el of rs){
                    let span=document.createElement("span");
                    span.innerHTML=el;
                    HotConter.appendChild(span)
                }
            })
        }  
        let HisConter=document.querySelector("#HisConter");
        try {
            let spans=HisConter.querySelectorAll('span');
            for(let i of spans){
                i.style.display='none'
            }
        } catch (error) {
            let aspan=HisConter.querySelector('span');
            aspan.style.display='none'
        }
            
            for(let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let span=document.createElement("span");
                span.innerHTML=localStorage.getItem(key)
                HisConter.appendChild(span)
              } 
        
})
Binput.addEventListener("input",()=>{
    del.style.display='block'
})
del.addEventListener("click",()=>{
    Binput.value=''
    del.style.display='none'
    Search.style.display='none'
    HotSearch.style.display='block'
    if(localStorage.length>0){
        HisSearch.style.display='block'
    }
    if(localStorage.length==0){
        HisSearch.style.display='none'
    }
    let HisConter=document.querySelector("#HisConter");
        try {
            let spans=HisConter.querySelectorAll('span');
            for(let i of spans){
                i.style.display='none'
            }
        } catch (error) {
            let aspan=HisConter.querySelector('span');
            aspan.style.display='none'
        }
            
            for(let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let span=document.createElement("span");
                span.innerHTML=localStorage.getItem(key)
                HisConter.appendChild(span)
              } 
})
cancel.addEventListener("click",()=>{
    for(let el of songsheets){
        el.style.display='block'
    }
    Binput.value=''
    HotSearch.style.display='none'
    HisSearch.style.display='none'
    del.style.display='none'
    Search.style.display='none'
    setTimeout(()=>{
        cancel.style.display='none'
    },0)
    Btext.style.display='inline'
    Bfont.className='B-font'
    Binput.placeholder=''
    Binput.style.width="90%"
    if(localStorage.length==0){
        HisSearch.style.display='none'
    }
})
Binput.addEventListener("blur",()=>{
    if(Binput.value==''){
        Btext.style.display='inline'
        Bfont.className='B-font'
        Binput.placeholder=''
        setTimeout(()=>{
            cancel.style.display='none'
        },0)
        Binput.style.width="90%"
    }
    if(localStorage.length==0){
        HisSearch.style.display='none'
    }
})
Bfont.addEventListener("click",()=>{
    Binput.focus()
})
Binput.addEventListener("keydown",async(e)=>{
    if(e.keyCode==13&&Binput.value!=''){
        let keyword=Binput.value;
        localStorage.setItem(keyword,keyword);
        let response=await fetch(`http://124.221.249.219:8000/api/search?keyword=${keyword}`)
        let result=await response.json()
        console.log(result)
        HotSearch.style.display='none'
        HisSearch.style.display='none'
        Search.style.display='block'
        for(let i=0;i<result.length;i++){
            let div1,div2,div3;
            [div1,div2,div3]=createelement(["div","div","div"]);
            div1.className='searchone'
            div2.className='s-title'
            div3.className='s-artist'
            div2.innerHTML=result[i].title
            div3.innerHTML=result[i].artist.reduce((a,b)=>{
                return a+" "+b
            })            
            div1.appendChild(div2)
            div1.appendChild(div3)
            Search.appendChild(div1);
        }

    }
})
Hi.addEventListener("click",()=>{
    localStorage.clear()
    HisSearch.style.display='none'
})