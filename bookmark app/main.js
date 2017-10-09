var bookmarkDiv=document.getElementById("divBookmark");
var submitButton=document.getElementById("sbutton");
var siteName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");



submitButton.addEventListener("click",createDivs);

function createDivs(e) {
      //calling upon validation function
      // if the inputs are vaild the function will pass true so the rest
      //of codes executed, but if the inputs are valid , the function will also
      //return true so, by using if with ! mean there's need to stop the
      // rest of codes, that why used false here.
      if(!validForm(siteName.value,siteUrl.value))
      { return false;}
      //create new object for submiting
      var myObject= {
            name:siteName.value,
            Url:siteUrl.value
      }
      //make test for localStorage
      if(localStorage.getItem('bookmark')===null)
      {
            var bookmark=[];              //create array
            bookmark.push(myObject);      //push array element
            //send it to localStorage
            localStorage.setItem('bookmark',JSON.stringify(bookmark));
      }else {
            //get the array back from localStorage
            bookmark=JSON.parse(localStorage.getItem('bookmark'));
            bookmark.push(myObject);      //push array element
            //send it to localStorage
            localStorage.setItem('bookmark',JSON.stringify(bookmark));
      }

      createBookmark();
      e.preventDefault();
}
// drwing the bookmark section
function createBookmark(){
      //get the array back from localStorage
      var bookmark=JSON.parse(localStorage.getItem('bookmark'));
      //clear the bookmarkDiv
      bookmarkDiv.innerHTML ='';
      //start looping and drawing
      for(var i=0;i<bookmark.length;i++)
      {
            var name=bookmark[i].name;
            var url=bookmark[i].Url;
              bookmarkDiv.innerHTML +='<article class="artic">'+
                                      '<h2>'+name+'</h2>'+
                                      '<div>'+
                                      '<a class="gbutton"  target="_blanck" href='+url+'>Visit</a>'+
                                      '<a class="rbutton"  onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a>'+
                                      '</div>'+
                                      '</article>'
      }
}

//delete bookmark on press delete
function deleteBookmark(aUrl){
      //get the array back from localStorage
      var bookmark=JSON.parse(localStorage.getItem('bookmark'));
      //splice the elemnt want to Delete
      for(var i=0;i<bookmark.length;i++){
            if(bookmark[i].Url ==aUrl){
                  bookmark.splice(i,1);
            }
      }
      //send it to localStorage
      localStorage.setItem('bookmark',JSON.stringify(bookmark));
      //redraw the bookmark once again
      createBookmark();
}

//validation function
function validForm(siteName,siteUrl){
      //check if the form empty
      if(!siteName || !siteUrl){
            alert('Please fill the form');
            return false;            //return false to stop the program
      }
      //check if vaild url
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if(!siteUrl.match(regex)){
            alert('Please input vaild URL');
            return false;           //return false to stop the program
      }
      return true;
}
