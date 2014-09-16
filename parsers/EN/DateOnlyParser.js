/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  
  function DateOnlyParser(text, ref, opt){
    
    var PATTERN = /(\W|_|^)((on|the|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*)([0-2]?[0-9]|3[0-1])(th|rd|nd|st)(\W|_|$)/i;
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var matchedTokens = text.substr(index).match(PATTERN);
      if(text.substr(index-1).search(PATTERN) == 0) return; //Replicate
      if(matchedTokens == null){
        finished = true;
        return;
      }
      
      var text = matchedTokens[0];
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[1].length - matchedTokens[6].length);
      index = index + matchedTokens[1].length;
      
      var day = matchedTokens[4];
      day = parseInt(day);
      
      var date = moment(ref);
      date.date(day);

        if(date<ref){
            date.month(date.month() + 1);
        }
      
      //Impossible Date or Invalid Date
      if(day > 31 || date.date() != day) {
        return;
      }
      
      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          impliedComponents: ['month','year'],
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.DateOnlyParser = DateOnlyParser;
})();

