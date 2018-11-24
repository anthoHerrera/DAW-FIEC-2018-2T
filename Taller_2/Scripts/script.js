function add(autor, contenido, fecha) {
  var img = $("<img/>", {
    "class":"rounded float-left",
    "src": "t.jpg"
  })

  var author = $("<h5/>", {
    "class":"card-title",
    html: autor.substring(2,autor.length-1) + ' ,dijo:'
  })

  var p = $("<p/>",{
    "class": "card-text",
    html: contenido
  })

  var pDate = $("<p/>",{
    "class": "card-text font-italic text-right",
    html: fecha.substring(0,fecha.length-5)
  })

  var div = $( "<div/>", {
    "class": "card-body"
  });

  var divPadre = $( "<div/>", {
    "class": "card w-75 border-info mb-3",
    "style": "max-width: 46rem;"
  });
  img.appendTo(div)  
  author.appendTo(div)
  p.appendTo(div)
  pDate.appendTo(div)
  div.appendTo(divPadre)
  divPadre.appendTo( "#tweets" );
}

function loadXml() {
  $.ajax({
      type: "GET",
      url: "https://twitrss.me/twitter_search_to_rss/?term=Espol",
      dataType: "xml",
      success: function(xml){
          $(xml).find('item').each(function(){
            var autor = $(this).find('dc\\:creator').text();
            var contenido = $(this).find('description').text();
            var fecha = $(this).find('pubDate').text();
            
            
            add(autor, contenido, fecha)

          });
      },
      error: function() {
        alert("Error al procesar el xml");
      }
  });
}


$(document).ready(function(){
  loadXml();

  $("button").click(function(e){

    var texto = $('input#buscador').val();

    
    if(texto.length != 0) {
      
      var tweets = $('#tweets .card-body');
      $('#tweets .card-body').filter(function(index){
        
        $(this).show();
        
        var tweet = $(this).text()
        if(tweet.indexOf(texto) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#tweets .card-body').each(function(){
        $(this).show();
      });
    }

    return false;
    
  })
  
});
