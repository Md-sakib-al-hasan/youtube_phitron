 let loaddata = async () => {
    const apiUrl = `https://openapi.programming-hero.com/api/videos/categories`
    try{
        const response = await fetch(apiUrl);
        const data= await response.json();
        data.status ? display(data.data) :console.log("not found");
    
    }catch(erre){
        console.log(erre);
    }
    
}
 
let short_handeler = 1000;

let card_data = async (id) => {
        short_handeler = id;
    const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${id}`
    try{
        const response = await fetch(apiUrl);
        const data= await response.json();
        data.status ? display_card(data.data) :display_card_not_found(data.data);

    
    }catch(erre){
        console.log("ss");
    }
    
}

//sort by view
let sort = async (id) => {
    
const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${id}`
try{
    const response = await fetch(apiUrl);
    const data= await response.json();
    data.status ? display_card_sort(data.data) :display_card_not_found(data.data);


}catch(erre){
    console.log("ss");
}

}

// select elements from the html file

let select = (id) => {
  let select_element = document.getElementById(id);
  return select_element;
}
// calcuted time and date

let time_calculated = (seconds) => {
    if(seconds <=0){
        return ""
    }
    const hours = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    return `Time  ${hours<10?"0"+hours:hours}:${minute<10?"0"+minute:minute}`
  };

 // create categories button
  let create_btn = (id,data,)=>{
    let select_element = select(id)
    let button = document.createElement("button");
    button.innerText=data.category;
    button.addEventListener('click',()=>{card_data(data.category_id)})
    button.setAttribute("class",`btn m-2 ${data.category_id== 1000? "btn_cutomise_nav_right":"btn_cutomise_nav_center" }`);
    select_element.appendChild(button);

  }


  let create_card = (id,element)=> {
    let select_parrent = select(id);
    let new_div = document.createElement("div");
    new_div.classList.add("card");
    new_div.classList.add("mt-2")
    new_div.setAttribute("style","width: 18rem;");
    new_div.innerHTML=`
                                <div class="position-relative">
                                    <img src="${element.thumbnail}" class="card-img-top" alt="...">
                                    <div class="position-absolute bottom-0 end-0"><p class="bg-black text-light rounded-2">${time_calculated(element.others.posted_date)}</p></div>
                                </div>
                                <div class="card-body  mt-2">
                                    <div class="row">
                                        <div class="col-2 m-0 p-0">
                                            <img class="rounded-circle w-75" src="${element.authors[0].profile_picture}" alt="">
                                        </div>
                                        <div class="col m-0 p-0">
                                            <p class="author_font_size mb-1">${element.title}</p>
                                            <div class="row m-0 p-0">
                                                <p class=" m-0 p-0 col-5 author_name ">${element.authors[0].profile_name}</p>
                                                <img class="col-3" src="${element.authors[0].verified ? `./resource/verified.png` : ""}">
                                            </div>
                                            <p class="author_name">${element.others.views} views</p>
                                        </div>
                                        
                                    </div>

                                </div>
                            `
    select_parrent.appendChild(new_div);
  }
// start to create desigenous 


loaddata();
card_data(1000)

let display = (data)=>{
    data.forEach(element => {
        create_btn("ban",element);
    });
}

// create_card("ban",data);
let display_card = (data)=>{
     let clear = select("card_b");
     clear.innerHTML= " ";
    data.forEach(element => {
        create_card("card_b",element);
    });
}

let display_card_not_found = (data) => {
    let select_parent = select("card_b");
    select_parent.innerHTML= " ";
    let new_div = document.createElement("div");
    new_div.classList.add("text-center");
    new_div.innerHTML = `<img class="w-25" src="./resource/Icon.png" alt="">
                         <p class="fw-bold fs-4">Oops!! Sorry, There is no<br> content here</p>`
    select_parent.appendChild(new_div);

}
let  short_by_view = () =>{
    sort(short_handeler);
}

let display_card_sort = (data)=>{
    data.sort((a,b)=>parseInt(b.others.views)-parseInt(a.others.views));
    let clear = select("card_b");
    clear.innerHTML= " ";
   data.forEach(element => {
       create_card("card_b",element);
       
   });
}



