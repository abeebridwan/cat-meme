var model = {
    currentModel : [],                  
      data : [ {
            catName : "Cute Cat",
            src: "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
            clickcount: 0
          },  
          {
            catName : "Shy Cat",
            src: "https://www.our-happy-cat.com/images/xshy-hiding-cat.jpg.pagespeed.ic.aGWMLHO7sn.jpg",
            clickcount: 0
          },
          {
            catName : "Mamami Cat",
            src: "https://funcatpictures.com/wp-content/uploads/2013/11/funny-cat-pics-iq-result-came-back-277x300.jpg",
            clickcount: 0
          },
           {
            catName : "Trump Cat",
            src: "https://www.catster.com/wp-content/uploads/2016/05/cats-politics-TN.jpg",
            clickcount: 0
          },
          {
            catName : "Obama Cat",
            src: "http://media.breitbart.com/media/2016/02/obama-cat-scratch-post-kickstarter-640x480.jpg",
            clickcount: 0
          } 
        ]
  };   

var octopus = {
      init: function() {
         model.currentModel.push
         ("Cute Cat", "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80", 0 ); 
         view.init();
      },

      currentdata: function() {
          return model.currentModel;
      },
   
      updateCurrentdata : function(a,b,c){
          model.currentModel.splice(0, 3, a.toString(), b.toString(),  Number(c));
          view.render();           
    },
   
    display : function(catname) {
      model.data.forEach(function(val) {
         if( val["catName"] == catname){
            model.currentModel.splice(0, 3, val["catName"], val["src"], val["clickcount"]);               
         }
        
       view.render();         
      });        
      
    },
   
    clickedimage : function(catsrc){
      model.data.forEach(function(val) {
         if( val["src"] == catsrc){
           val["clickcount"] += 1; 
           model.currentModel[2] += 1 ;    
         }         
     });
       view.countrender();
    },  
 submit : function(a,b,c){ 
     var stop = false;
    model.data.forEach(function(val) {
        if( (val["src"] == b) || (val["catName"] == a)){
            view.rendererror();  
            stop = true;                 
    }      
 });
 if(stop){
     return
 }
      var new_value= {
          catName : a.toString(),
            src: b.toString(),
            clickcount: Number(c),        
      }
      model.data.push(new_value);
      view.rewrite(a);      
  }
   
};

var view = {
      
    init: function() {                 
         
        var container = document.getElementById("container");
        var img = document.getElementById("catimg");         
       var button = document.getElementById("button");
       var admin = document.getElementById("form"); 
         admin.style.display = "none";
      var cancel = document.getElementById("cancel"); 
      var submit = document.getElementById("submit"); 
      var error = document.getElementById("error"); 
      error.style.display = "none";
      container.addEventListener('click', function(e) {
          var name = e.target.textContent;
           octopus.display(name);        
                view.adminrender();
        });  

        img.addEventListener('click', function(e) {
          var src = e.target.src;
          octopus.clickedimage(src); 
          view.adminrender();
        });  
     button.addEventListener('click', function() {
          if(admin.style.display === "none"){
            admin.style.display = "block";
             view.adminrender();
          }else {
            admin.style.display = "none";
          }
            
        }); 
      cancel.addEventListener('click', function() {            
            admin.style.display = "none";                 
        }); 
    
     submit.addEventListener('click', function() {            
        var inputName = document.getElementById("name").value;
        var inputUrl = document.getElementById("imgurl").value;
        var inputNum = document.getElementById("number").value;
          octopus.submit(inputName, inputUrl, inputNum );  
          octopus.updateCurrentdata(inputName, inputUrl, inputNum );
        
       }); 
      
      view.render();
      
    },

   render: function(){    
          var data = octopus.currentdata();     
         document.getElementById("displayname").innerHTML = data[0];
        document.getElementById("catimg").src = data[1];
        document.getElementById("displaycounter").innerHTML = data[2]
    },

  countrender: function(){      
    var data = octopus.currentdata();
     
     document.getElementById("displaycounter").innerHTML = data[2]
     },

adminrender :function(){
      var data = octopus.currentdata();
       document.getElementById("name").setAttribute("value", data[0]); 
        document.getElementById("imgurl").setAttribute("value", data[1]); 
        document.getElementById("number").setAttribute("value", data[2]); 
      },
 rendererror: function(){
    var adminsec = document.getElementById("form"); 
    error.style.display = "block";
    setTimeout(function(){
        error.style.display = "none";
        adminsec.style.display = "none";
    },3000)
 }, 
rewrite : function(a){
  var adminsec = document.getElementById("form"); 
  var node = document.createElement("DIV");
  var textnode = document.createTextNode(a.toString());
  node.appendChild(textnode);
  node.classList.add("catname");
  document.getElementById("container").appendChild(node);   
  adminsec.style.display = "none";        
} 
};      

  
octopus.init();

