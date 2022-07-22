console.log("hello");
let data=document.getElementById('formbox');
console.log(data);


class datas
{
    constructor(name,email)
    {
        this.name=name;
        this.email=email;
    }
}

axios({
    method:'get',
    url:'http://localhost:3000/booking',
}).then((res)=> showfunction(res.data));


function showfunction(res)
{

    console.log(res);
    for(let i=0;i<res.length;i++)
    {
        let dt=res[i].id;
        let dname=res[i].name;
        let demail=res[i].email;
        let data=document.createElement('li');
        data.id=dt;
        data.innerHTML=`${res[i].name}-----${res[i].email}--<button onclick=deletes('${dt}')>Delete</button>-<button onclick=edits('${dt}')>Edit</button>`
        document.getElementById('showdata').appendChild(data);
    }
}

data.addEventListener('submit',getdata);
function getdata(e)
{
    e.preventDefault();
    
    console.log(document.getElementById('email').value,document.getElementById('name').value);
    let datat=new datas(document.getElementById('name').value,document.getElementById('email').value);

    axios({
        method:'post',
        url:'http://localhost:3000/booking',
        data:datat
    }).then((res)=>showfunction(res));
    location.reload();
    
    
}
function deleteFromScreen(res)
{
    console.log(res);
    let parent=document.getElementById('showdata');
    let child=document.getElementById(res);
    parent.removeChild(child);
}

function deletes(res)
{
   
    deleteFromScreen(res);
    axios({
        method:'delete',
        url:`http://localhost:3000/booking/${res}`
    }).then((res)=>{
        console.log("Deletion done");
    });
    
}


function edits(res)
{
    axios({
        method:'get',
        url:`http://localhost:3000/booking/${res}`
    }).then((res)=>{
        console.log(res.data.id);
        deletes(res.data.id);
        document.getElementById('name').value=res.data.name;
        document.getElementById('email').value=res.data.email;

    }).catch((err)=>{
        console.log(err);
    })
}





















































// const keys=Object.keys(localStorage);
// let datalength=keys.length;

// while(datalength--)
// {
// let obj= JSON.parse(localStorage.getItem(keys[datalength]));
// let data=document.createElement('li');
// let button=document.createElement('button');
// button.className="delete";

// data.innerHTML=`<li> ${obj.email}----${obj.name}--<button class ="delete" onclick=deletes('${keys[datalength]}')>Delete</button> -<button class ="edit" onclick=edit('${keys[datalength]}')>Edit</button></li>`
// // document.getElementById('showdata').appendChild(data);
// }


// function edit(data)
// {
//     let obj=JSON.parse(localStorage.getItem(data));
//     document.getElementById('name').value=obj.name;
//     document.getElementById('email').value=obj.email;
//     localStorage.removeItem(data);
//     // data.addEventListener('submit',xyz);


    
// }





