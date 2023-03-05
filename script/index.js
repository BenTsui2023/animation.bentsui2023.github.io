//STUDENT NAME: Kei Wai Tsui
//Student id:300361374

//ref texts, buttons, select list and constant
let addMember = document.getElementsByTagName("input")[0];
let deleteMember = document.getElementsByTagName("input")[1];
let sortMember = document.getElementsByTagName("input")[2];

let lastN = document.getElementById("lastname");
let firstN = document.getElementById("firstname");
let list = document.getElementById("members");
let groupSize = document.getElementById("GroupSize");
let discount = document.getElementById("discRate");

const PRICE = 50;

function CheckForGroupMemberInput(){
    if(lastN.value == ""){
        //throw an exception if no inputs have been entered to last name
        throw "Please first enter a group member's last name";
    }
    if(firstN.value == ""){
        //throw an exception if no inputs have been entered to first name
        throw "Please first enter a group member's first name";
    }
}

function CheckForGroupSizeInput(){
    if(groupSize.value == ""){
        //throw an exception if no inputs have been entered to group size
        throw "Please first enter a group size";
    }
    if(isNaN(groupSize.value)){
        //throw an exception if the inputs of group size is not a numeric value
        throw "Invalid input for group size. please enter a numeric value";
    }
}

function CalcGroupDiscount(){
    try{
        //call Function
        CheckForGroupSizeInput();
        //calculate the applicable discount per group member based on group size
        if(parseFloat(groupSize.value)>= 25){
            discount.value = ((groupSize.value * PRICE * 0.75)/groupSize.value).toFixed(2);
        }
        else if(parseFloat(groupSize.value)>=11 && parseFloat(groupSize.value)<=24){
            discount.value = ((groupSize.value * PRICE * 0.8)/groupSize.value).toFixed(2);
        }
        else if(parseFloat(groupSize.value)>=5 && parseFloat(groupSize.value)<=10){
            discount.value = ((groupSize.value * PRICE * 0.9)/groupSize.value).toFixed(2);
        }
        else{
            discount.value = ((groupSize.value * PRICE)/groupSize.value).toFixed(2);
        }
    }
    catch(e){
        alert(e);
    }
}

function AddGroupMember(){
    try{
        //call Function
        CheckForGroupMemberInput();
        //create option element and the text node for it
        let newList = document.createElement("option");
        let listText = document.createTextNode(lastN.value + ", " + firstN.value);
        newList.appendChild(listText);
        //set value for the new option element
        newList.setAttribute("value", `${lastN.value}, ${firstN.value}`);
        //add new option element to the select element        
        list.appendChild(newList);
        //clear input boxes after a user clicks “Add Member” button
        lastN.value = "";
        firstN.value = "";
    }
    catch(e){
        alert(e);
    }
}

function RemoveGroupMember(){
    //find the index of the selected option
    let index = list.selectedIndex;
    //if no option is selected, the default index is -1
    if(index == -1){
        alert("There are no group members to delete!");
    }
    else{
        list.removeChild(list.options[index]);
    }
}

function SortGroupMembers(){
    //ref the option element and the controlled boolean
    let newOption = document.getElementsByTagName("option");
    let change = true
    while(change){
        change = false;
        for(let i=0; i < (newOption.length-1);i++){
            //Compare the order of current option and the next option
            if (newOption[i].innerHTML.toLowerCase() > newOption[i + 1].innerHTML.toLowerCase()){
                //insert the next option before the current option if the order of current option is higher than the next option
                newOption[i].parentNode.insertBefore(newOption[i + 1], newOption[i]);
                change = true;
            }
        }
    }
}
//ref the original position of bee and the browser height and width for locating the sunflower, and the bee
let xPos = -150;
let yPos = 0;
let w = window.innerWidth;
let h = window.innerHeight;
let bee = document.getElementById("bee");
function FlyingBee(){    
    //change the visibility of the bee to visible
    bee.style.visibility = "visible";
    xPos += 15;
    yPos += 4;
    //change the location of the bee
    bee.style.left = `${xPos}px`;
    bee.style.top = `${yPos}px`;
    if(xPos >= (w/2 + 200) || yPos >= (h/2)){
        //Once the bee stops at the sunflower, the text of the span display and stop
        document.getElementById("advice").style.display = "inline";
        clearInterval(intId);
    }
}
//Call the CalcGroupDiscount() function whwn the user change the content of group size
groupSize.onchange = function(){CalcGroupDiscount();}
//Call the functions when user clicks the button
addMember.onclick = function(){AddGroupMember();}
deleteMember.onclick = function(){RemoveGroupMember();}
sortMember.onclick = function(){SortGroupMembers();}
//timing of events methods
let intId = setInterval(FlyingBee,100);
