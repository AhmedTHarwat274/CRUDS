let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let creat = document.getElementById('creat');
let mood = 'creat' ;
let temp ;

// get total
function GetTotal(){
    if(price.value != ''){
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result ;
        total.style.background = 'green' ;
    }else{
        total.innerHTML = '' ;
        total.style.background = 'red' ;
    }
}

// creat product
let dataProduct ;
if( localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [] ;
}

creat.onclick = function(){
    let newProduct = {
        title : title.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML , 
        count : count.value ,
        category : category.value.toLowerCase() ,
    }
    
    // count , creat(continous)
if(title.value != '' && price.value != '' && category.value != ''){
    if(mood === 'creat'){
        if(newProduct.count > 1){
            for(let i = 0 ; i < newProduct.count ; i++){
                dataProduct.push(newProduct) ;
            }
        }else{
            dataProduct.push(newProduct) ;
        }
    }else{
        dataProduct[temp] = newProduct ;
        mood = 'creat' ; 
        count.style.display = 'block' ;
        creat.innerHTML = 'creat' ;
    }
    clearInputs() ;
}

    // save localStorage
    localStorage.setItem('product' , JSON.stringify(dataProduct)) ;

    read() ;
}

// clear inputs
function clearInputs(){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}

// read 
function read(){
    GetTotal() ;

    let table = '' ;
    for(let i = 0 ; i < dataProduct.length ; i++){
        table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                        <td></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table ;
    // deletall
    let btn_deleteAll = document.getElementById('deleteAll') ;
    if(dataProduct.length > 0){
        btn_deleteAll.innerHTML = `<button onclick = "deleteAll()">delete All (${dataProduct.length})</button>`
    }else{
        btn_deleteAll.innerHTML = '' ;
    }
}
    read() ;

// delete
function deleteData(i){
    dataProduct.splice(i,1) ;
    localStorage.product = JSON.stringify(dataProduct) ;
    read()
}
// deleteall
function deleteAll(){
    localStorage.clear() ;
    dataProduct.splice(0) ;
    read() ;
}

// update 
function updateData(i){
    title.value = dataProduct[i].title ;
    price.value = dataProduct[i].price ;
    taxes.value = dataProduct[i].taxes ;
    ads.value = dataProduct[i].ads ;
    discount.value = dataProduct[i].discount ;
    category.value = dataProduct[i].category ;
    GetTotal() ;
    count.style.display = 'none' ;
    creat.innerHTML = 'update';
    mood = 'update' ;
    temp = i ;
    scroll({
        top : 0 , 
        behavior : 'smooth' ,
    })
}

// search 
let searchMood = 'title' ;

function getSearchMood(id){
    let search = document.getElementById('search') ;
    if(id == 'searchTitle'){
        searchMood = 'title' ; 
    }else{
        searchMood = 'category' ;
    }
    search.placeholder = 'search by ' + searchMood ;
    search.focus ; 
    search.value = '' ;
    read() ;
}

function searchData(value){
    let table = '' ;
    for(let i = 0 ; i < dataProduct.length ; i++){
    if(searchMood == 'title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                        <td></td>
                    </tr>
        `
            }
        }else{
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
                        <td></td>
                    </tr>
        `
            }
    }
}
    document.getElementById('tbody').innerHTML = table ;
}

// clean data
