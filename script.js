let container=document.createElement("div");
container.classList.add("container-fluid");

let h1=document.createElement("h1");
h1.innerHTML="Ice And Fire API";

let table=document.createElement("table");
table.classList.add("table","table-hover","table-striped");

let thead=document.createElement("thead");
thead.classList.add("thead-dark");

let tr=document.createElement("tr");

let th1=document.createElement("th");
th1.innerHTML="S.No";
let th2=document.createElement("th");
th2.innerHTML="Book Name";
let th3=document.createElement("th");
th3.innerHTML="ISBN";
let th4=document.createElement("th");
th4.innerHTML="Number of Pages";
let th5=document.createElement("th");
th5.innerHTML="Author";
let th6=document.createElement("th");
th6.innerHTML="Publisher Name";
let th7=document.createElement("th");
th7.innerHTML="Released Date";
let th8=document.createElement("th");
th8.innerHTML="Characters";

let tbody=document.createElement("tbody");

tr.append(th1,th2,th3,th4,th5,th6,th7,th8);
thead.append(tr);
table.append(thead,tbody);
container.append(h1,table);
document.body.append(container);

async function displayData(){
    try {
        let response=await fetch("https://www.anapioficeandfire.com/api/books");
        let data=await response.json();
        
        for(i=0;i<data.length;i++){
            tbody.innerHTML+=`
            <tr>
                <td>${i+1}</td>
                <td>${data[i].name}</td>
                <td>${data[i].isbn}</td>
                <td>${data[i].numberOfPages}</td>
                <td>${data[i].authors.join("")}</td>
                <td>${data[i].publisher}</td>
                <td>${data[i].released.split("T").slice(0,1)}</td>
                <td>    
                ${characternames()}
                </td>
            </tr>`;

            function characternames(){
                let charname=[];
                for(j=8;j<13;j++){
                    async function character(){
                        try {
                            let charResponse=await fetch(`${data[i].characters[j]}`);
                            let charData=await charResponse.json();
                            charname.push(charData.name);
                        } catch (error) {
                            console.log("There is an error in character()");
                        }
                    }
                    character();
                }
                // console.log(charname);
                return (charname);
            }
        }      
    } catch (error) {
        console.log("There is an error in displayData()");
    }
}
displayData();