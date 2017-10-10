var formInput=document.getElementsByClassName("formInput");
var contentDiv=document.getElementById('issuecontent');
var buttenGroup=document.getElementsByClassName("addButton");
var addButton=buttenGroup[0];

//add event listener for the add button
addButton.addEventListener("click", submitValue);
//create the function
function submitValue(e){
    e.preventDefault();
    //taking the value from the form inputs
    var discInput=formInput[0].value;
    var sevInput=formInput[1].value;
    var assignInput=formInput[2].value;
    var myID =" "+Math.random().toString(16).substr(2, 4)+" - "+
    Math.random().toString(16).substr(2, 4)+" - "+
    Math.random().toString(16).substr(2, 4);
    //cheking the validation of the inputs values
    if(!checkValidation(discInput,assignInput)){return false;}
    //create an object
    var myObject={
      discription:discInput,
      severity:sevInput,
      assignedTo:assignInput,
      status:"Open",
      id:myID
    };
    //save in local storge
    //first see if the localStorge have been save or not
    if(localStorage.getItem('issueTracker')===null){
      //create new array to submit
      var issueTracker=[];
      //put the new value of myObject in the array
      issueTracker.push(myObject);
      //then submit the array to the localStorge
      localStorage.setItem('issueTracker',JSON.stringify(issueTracker));
    }
    //if the localStorage already have the issueTracker
    else {
      //get back the array from localStorage
      var issueTracker=JSON.parse(localStorage.getItem('issueTracker'));
      //put the new value of myObject in the array
      issueTracker.push(myObject);
      //then submit the array to the localStorge
      localStorage.setItem('issueTracker',JSON.stringify(issueTracker));
    }
    issueContent();
  }

//delete button
  function deleteIssue(i){
    //get back the array from localStorage
    var issueTracker=JSON.parse(localStorage.getItem('issueTracker'));
    issueTracker.splice(i,1);
    //then submit the array to the localStorge
    localStorage.setItem('issueTracker',JSON.stringify(issueTracker));
    //redraw the content
    issueContent();
  }

// close the issues
  function closeIssue(i) {
    //changing the status in this way better than call function again
    document.getElementsByClassName('statusDemo')[i].innerText= "Cloesd";
    //get back the array from localStorage
    var issueTracker=JSON.parse(localStorage.getItem('issueTracker'));
    issueTracker[i].status="Closed";
    //then submit the array to the localStorge
    localStorage.setItem('issueTracker',JSON.stringify(issueTracker));
  }

//check Validation function
function checkValidation(discInput,assignInput){
  if(!discInput && !assignInput){
    alert('Please fill the form');
    return false;
  }else if ( !discInput){
    alert('Please fill the Discription text ');
    return false;
  }else if ( !assignInput) {
    alert('Please fill a Name for assigned To');
    return false;
  }elsereturn true;
}

//create function to draw the issues
function issueContent(){
  //get back the array from localStorage
  var issueTracker=JSON.parse(localStorage.getItem('issueTracker'));
  //reset the contentDiv first, this is so important
  contentDiv.innerHTML = "";
  //now start looping and drawing
  for(var i=0;i<issueTracker.length;i++){
    contentDiv.innerHTML +=   '<div id="addContent">'+
                                '<p id="idDemo">Issue ID:'+issueTracker[i].id+' </p>'+
                                '<p class="statusDemo">'+issueTracker[i].status+'</p>'+
                                '<p id="discriptionDemo">'+issueTracker[i].discription+'</p>'+
                                '<div class="nameDemo">'+
                                  '<i class="material-icons">alarm</i>'+
                                  '<p id="severityDemo">'+issueTracker[i].severity +'</p>'+
                                  '<i class="material-icons">account_circle</i>'+
                                  '<p id="assignedTODemo">'+issueTracker[i].assignedTo+'</p>'+
                                '</div>'+
                                '<button class="addButton yButton" onclick="closeIssue(\''+i+'\')" type="button">Close</button>'+
                                '<button class="addButton rButton" onclick="deleteIssue(\''+i+'\')" type="button">Delete</button>'+
                              '</div>'

    }
}
