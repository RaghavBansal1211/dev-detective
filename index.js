const userName = document.querySelector("[user-name]");
const wrapper = document.querySelector(".wrapper");
const heading = document.querySelector(".heading");
const mid=document.querySelector(".mid");
const searchBtn = document.querySelector("[search]");
const title=document.querySelectorAll(".title");
const bottom = document.querySelector(".bottom");
const det=document.querySelectorAll(".det");
const content=document.querySelector(".info");
const datainp=document.querySelector(".data-input");
const userImg = document.querySelector("[user-img]");
const displayUserName = document.querySelector("[display-user-name]");
const profileLink = document.querySelector("[profile-link]");
const DOJ = document.querySelector("[date-of-join]");
const bio = document.querySelector(".bio");
const repoCount = document.querySelector("[repo-count]");
const followerCount = document.querySelector("[follower-count]");
const followingCount = document.querySelector("[following-count]");
const userLocation = document.querySelector("[location-info]");
const bioLink = document.querySelector("[bio-info]");
const twitterInfo = document.querySelector("[twitter-info]");
const connect = document.querySelector("[building-info]");
const error=document.querySelector("[errormsg]");
const mode=document.querySelector(".mode");
const displaymode = document.querySelector("[display-mode]")
const modeimg=document.querySelector("[mode-img]")
const clear=document.querySelector("[clear]");
const icons=document.querySelectorAll(".icons");
error.style.color="red";
clear.setAttribute("style","display:none");

userName.addEventListener("input",displaycross);

function displaycross(){;
    if(userName.value!=''){
        clear.setAttribute("style","display:block");
    }
    else{
        clear.setAttribute("style","display:none");
    }
}

setDisplay();
displaymode.innerText='DARK';
modeimg.src="./Images/moon-icon.svg"

mode.addEventListener("click",changeMode);

function changeMode(){
    if(displaymode.innerText=="DARK"){
        displaymode.innerText="LIGHT";
        modeimg.src="./Images/sun-icon.svg";
        wrapper.style.backgroundColor="#141D2F";
        heading.style.color="#FFFFFF";
        displaymode.style.color='#FFFFFF';
        content.style.backgroundColor="#1E2A47";
        datainp.style.backgroundColor="#1E2A47";
        userName.style.color="#FEFEFE"; 
        userName.style.setProperty("--c", "#FFFFFF");
        displayUserName.style.color="#FFFFFF";
        DOJ.style.color="#FFFFFF";
        mid.style.backgroundColor="#141D2F";
        for(let i=0;i<title.length;i++){
            title[i].style.color="#FFFFFF";
            det[i].style.color="#FFFFFF";
        }
        clear.style.color="#FFFFFF";
        bottom.style.color="#FFFFFF";
        bioLink.style.color="#FFFFFF";
        twitterInfo.style.color="#FFFFFF";
        for(let i=0;i<icons.length;i++){
            icons[i].setAttribute("style","filter: brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(7062%) hue-rotate(277deg) brightness(121%) contrast(98%);");
        }

    }
    else{
        displaymode.innerText="DARK";
        modeimg.src="./Images/moon-icon.svg"
        wrapper.style.backgroundColor="#F6F8FF";
        heading.style.color="#4B6A9B";
        displaymode.style.color='#4B6A9B';
        content.style.backgroundColor="#FEFEFE";
        datainp.style.backgroundColor="#FEFEFE";
        userName.style.color="#4B6A9B";
        userName.style.setProperty("--c", "#4B6A9B");
        displayUserName.style.color="#2B3442";
        DOJ.style.color="#4B6A9B";
        mid.style.backgroundColor="#F6F8FF"
        for(let i=0;i<title.length;i++){
            title[i].style.color="#4B6A9B";
            det[i].style.color="#2B3442";
        }
        clear.style.color="#4B6A9B"
        bottom.style.color="#4B6A9B"
        bioLink.style.color="#4B6A9B";
        twitterInfo.style.color="#4B6A9B";
        for(let i=0;i<icons.length;i++){
            icons[i].setAttribute("style","filter: brightness(0) saturate(100%) invert(40%) sepia(17%) saturate(1302%) hue-rotate(178deg) brightness(94%) contrast(89%);");
        }
    }
}



async function setDisplay(){
    const name='RaghavBansal1211';
        let result = await fetch(`https://api.github.com/users/${name}`);
        let data = await result.json();
        renderInfo(data);
        displayUserName.innerText=name;
}

clear.addEventListener("click",clearinfo);

function clearinfo(){
    if(userName.value!=''){
        userName.value='';
        clear.setAttribute("style","display:none");
    }
}

searchBtn.addEventListener("click",getInfo);

async function getInfo(){
   
   let userinp = userName.value;
   if(userinp==""){
    return;
   }
   try{
    let result = await fetch(`https://api.github.com/users/${userinp}`);
    if(!result.ok){
        throw result;
    }
    let data = await result.json();
    renderInfo(data);
   }
   catch(err){
    error.innerText="Result not found";
   }
   
   
}

function renderInfo(data){
    error.innerText="";
    if(`${data?.name}`==='null'){
        displayUserName.innerText = `${data?.login}`;
    }
    else{
        displayUserName.innerText =`${data?.name}`;
    }
    userImg.src =`${data?.avatar_url}`;
    profileLink.href= `${data?.html_url}`;
    profileLink.innerText="@"+`${data?.login}`;
    let dateObj = new Date(`${data?.created_at}`);
    let day=  dateObj.getDate();
    let month = dateObj.toLocaleString('default', { month: 'short' });
    let year = dateObj.getFullYear();
    DOJ.innerText = "Joined "+day+" "+month+" "+year;
    bio.innerText = `${data?.bio}`
    if(bio.innerText==='null'){
        bio.innerText='This profile has no bio';
    }
    repoCount.innerText = `${data?.public_repos}`;
    followerCount.innerText = `${data?.followers}`;
    followingCount.innerText = `${data?.following}`;
    userLocation.innerText = `${data?.location}`;
    if(userLocation.innerText==='null'){
        userLocation.innerText='Not Available';
    }


    if(`${data?.twitter_username}`==='null'){
        bioLink.innerText='Not Available';
        bioLink.href="#";
    }
    else{
        bioLink.innerText = `${data?.blog}`;
        bioLink.href="https://"+(`${data?.blog}`).toString();;
    }

    bioLink.innerText = `${data?.blog}`;
    bioLink.href=`${data?.blog}`;
    if(!bioLink.innerText){
        bioLink.innerText='Not Available';
    }
    
    if(`${data?.twitter_username}`==='null'){
        twitterInfo.innerText='Not Available';
        twitterInfo.href="#";
    }
    else{
        twitterInfo.innerText = `${data?.twitter_username}`;
        twitterInfo.href="https://www.x.com/"+(`${data?.twitter_username}`).toString();
    }

    connect.innerText = `${data?.company}`;
    if(connect.innerText==='null'){
        connect.innerText='Not Available';
    }
    
}

