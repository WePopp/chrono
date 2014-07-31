var detectedDates = [];


function parseChildByChild(textAsElement){
    if(textAsElement.attr("class") != "gmail_quote"){
        var bool;
        try{
          bool =  !textAsElement.attr("class").match("wetime-date-link");
        }
        catch(err){
          bool = true;
        }

        if(textAsElement[0].tagName != "A" && bool){

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

function dateToString(date) {
    var hours = date.getHours().toString();
    var mins = date.getMinutes().toString();
    var days= date.getDate().toString();
    var month = (date.getMonth()+1).toString() ;
    if(hours.length == 1){
         hours = "0" + hours;
    }
    if(mins.length == 1){
        mins = "0" + mins;
    }
    if(days.length == 1){
        days = "0" + days;
    }
    if(month.length == 1){
        month = "0" + month;
    }
    var dateStr = date.getFullYear().toString() + "-" +
        month + "-" +
        days + " " +
        hours + ":" +
        mins;

    return dateStr ;
}

//function findDateGeneratedByPlugin(resultsArray){
//    resultsArray.forEach(
//        function(part, index, theArray){
//            var wetime_results = $.grep(part.results, function(e){return e.concordance.match("#wetime-date-link") });
//            if(wetime_results.length>0){
//                 if(wetime_results[0].start.timezoneOffset==-0){
//                     var newDate = wetime_results[0].startDate;
//                     newDate.addMinutes((-1)*newDate.getTimezoneOffset());
//                     var elementToModify = part.textNode.parent().parent();
//                     var partToChange = $.grep(resultsArray, function(e){return e.element.is(elementToModify)});
//                     theArray[theArray.indexOf(partToChange[0])].results[0].startDate = newDate;
//                 }
//            }
//        }
//    );
//    return resultsArray;
//}

function findDateGeneratedByPlugin(resultsArray){
    resultsArray.forEach(
        function(part, index, theArray){
            var parent = part.textNode.parent();
            var grandparent = part.textNode.parent().parent();
            //check if part is an hour generated by wetime

            if( part.results.length == 1 &&
                part.results[0].start.hour &&
                part.results[0].start.impliedComponents)
            {

                if( part.results[0].start.impliedComponents.indexOf("day") != -1 &&
                    parent[0].tagName == "DIV" &&
                    parent.children()[0].tagName == "A" &&
                    grandparent[0].tagName == "DIV" &&
                    grandparent.contents()
                        .filter(function(){
                            return this.nodeType === 3;
                        }).length > 0
                    )
                {

                    //check if grandparent is in results and is generated by wetime
                    var wetime_results = $.grep(theArray,
                        function(e)
                        {
                            return e.element.is(grandparent) &&
                                e.results.length == 1 &&
                                !(e.results[0].start.hour) &&
                                e.results[0].start.impliedComponents.indexOf("day") == -1 &&
                                e.results[0].start.impliedComponents.indexOf("month") == -1
                        }
                    );

                    if(wetime_results.length == 1){

                        var dateObject = wetime_results[0].results[0];
                        var newDate = dateObject.startDate;
                        theArray[index].results[0].startDate.setDate(newDate.getDate());
                        theArray[index].results[0].startDate.setMonth(newDate.getMonth());
                        theArray[index].results[0].startDate.setFullYear(newDate.getFullYear());
                    }


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
        var dateString = dateToString(date);
        var span = "<span class='wetime-date-link' data-value='" + dateString + "'>" + detectedText + "<div class='conflict-dot'></div></span>"
        html = html.substring(0,startIndex) + span + html.substring(endIndex);
    });

    textNode.replaceWith(html);


  }
  $body.append("<div class='wetime-detection-completed'></div>")
});
