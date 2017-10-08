var bookmarkDiv=document.getElementById("divBookmark");
var submitButton=document.getElementById("sbutton");
var siteName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");



submitButton.addEventListener("click",createDivs);

function createDivs(e) {
      var myObject= {
            name:siteName.value,
            Url:siteUrl.value
      }
      var myJson=JSON.stringify(myObject);
      localStorage.setItem("bookmark",myJson );


      e.preventDefault();
}








// '<article class="artic">'+
//                         '<h2>Facebook</h2>'+
//                         '<div>'+
//                         '<button class="gbutton" type="button" name="button">Visit</button>'+
//                         '<button class="rbutton" type="button" name="button">Delete</button>'+
//                         '</div>'+
//                         '</article>'
