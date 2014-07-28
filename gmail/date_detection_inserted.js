var detectedDates = [];


function parseChildByChild(textAsElement){
    if(textAsElement.attr("class") != "gmail_quote"){
        if(textAsElement.prop("tagName") != "A" && !textAsElement.attr("class").match("wetime-date-link")){

            textAsElement.contents()
                .filter(function(){
                    return this.nodeType === 3;
                })
                .each(function(i){
                    var results = chrono.parse($(this).text());
                    var textNode = $(this);
                    if( results.length >0){
                        detectedDates.push({results: results,
                            textNode: textNode,
                            textNodeIndexInElement: i,
                            element: textAsElement});
                    }
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
            var wetime_results = $.grep(part.results, function(e){return e.concordance.match("#wetime-date-link") });
            if(wetime_results.length>0){
                 if(wetime_results[0].start.timezoneOffset==-0){
                     var newDate = wetime_results[0].startDate;
                     newDate.addMinutes((-1)*newDate.getTimezoneOffset());
                     var elementToModify = part.textNode.parent().parent();
                     var partToChange = $.grep(resultsArray, function(e){return e.element.is(elementToModify)});
                     theArray[theArray.indexOf(partToChange[0])].results[0].startDate = newDate;
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


  if(detectedDates.length == 0) {
    return;
  }

  for(var i=0; i<detectedDates.length; i++) {
    var textNode = detectedDates[i].textNode;
    var html = textNode.text();

    detectedDates[i].results.sort(function(detectedDateA, detectedDateB) {
        return detectedDateB.index - detectedDateA.index;
    }).forEach(function(detectedDate){
        var startIndex = detectedDate.index;
        var endIndex = detectedDate.text.length + startIndex;
        var date = detectedDate.startDate;
        var detectedText = detectedDate.text;
        var span = "<span class='wetime-date-link' data-value='" + date.toString("yyyy-MM-dd HH:mm") + "'>" + detectedText + "<div class='conflict-dot'></div></span>"
        html = html.substring(0,startIndex) + span + html.substring(endIndex);
    });

    textNode.replaceWith(html);
    //need to be improved if there is children

  }
  $body.append("<div class='wetime-detection-completed'></div>")
});
