var detectedDates = [];


function parseChildByChild(textAsElement){
    if(textAsElement.attr("class") != "gmail_quote"){
        if(textAsElement.prop("tagName") != "A"){

            textAsElement.contents()
                .filter(function(){
                    return this.nodeType === 3;
                })
                .each(function(i){
                    var results = chrono.parse($(this).text());
                    var textNode = $(this);
                    results.forEach(function(part, index, theArray){
                        theArray[index] = {
                            result: part,
                            textNode: textNode,
                            textNodeIndexInElement: index,
                            element: textAsElement
                        };
                    });

                    $.merge(detectedDates, results);
                });
        }

        if(textAsElement.children().length>0){
            textAsElement.children().each(function(){parseChildByChild($(this))});
            // body.children().each(parseChildByChild(this));
        }
    }
}

function findDateGeneratedByPlugin(resultsArray){
    resultsArray.forEach(
        function(part, index, theArray){
            if(part.result.concordance.match("#wetime-date-link")){
                 if(part.result.start.timezoneOffset==-0){
                     var newDate = part.result.startDate;
                     newDate.addMinutes((-1)*newDate.getTimezoneOffset());
                     var elementToModify = part.textNode.parent().parent();
                     var partToChange = $.grep(resultsArray, function(e){return e.element.is(elementToModify)});
                     theArray[theArray.indexOf(partToChange[0])].result.startDate = newDate;
                 }
            }
        }
    );
    return resultsArray;
}

insertionQ('.a3s').every(function(e) {  
  $(".aBn").replaceWith(function() {
      return $(this).text();
  });
  
  $body = $(e);

  if($(this).hasClass("wetime-processed")) {
    return;
  }
  $(this).addClass("wetime-processed");

  var text = $body.html();
 // var bounds = getRealBodyBounds(text);

  
  //var detectedDates = detectDatesFromBody(text.substring(bounds[0], bounds[1]));
  detectedDates = [];

  parseChildByChild($body);

  detectedDates = findDateGeneratedByPlugin(detectedDates);


  detectedDates = detectedDates.sort(function(detectedDateB, detectedDateA) {
    return detectedDateB.result.startDate - detectedDateA.result.startDate;
  });

  if(detectedDates.length == 0) {
    return;
  }

  for(var i=0; i<detectedDates.length; i++) {
    var detectedDate = detectedDates[i].result;
    var textNode = detectedDates[i].textNode;
    var startIndex = detectedDate.index;
    var endIndex = detectedDate.text.length + startIndex;
    var date = detectedDate.startDate;
    var detectedText = detectedDate.text;



    var span = "<span class='wetime-date-link' data-value='" + date.toString("yyyy-MM-dd HH:mm") + "'>" + detectedText + "<div class='conflict-dot'></div></span>"


    textNode.replaceWith(textNode.text().substring(0,startIndex) + span + textNode.text().substring(endIndex));
    //need to be improved if there is children

  }
  $body.append("<div class='wetime-detection-completed'></div>")
});
