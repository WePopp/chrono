/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(\W|^)((\,|\(|\（)\s*)?((ce)\s*)?(Dimanche|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi)(\s*(prochain|en\s*8|en\s*15))?(\s*(\,|\)|\）))?(\W|$)/i;
  
  var DAYS_OFFSET = { 'dimanche': 0, 'lundi': 1, 'mardi': 2, 'mercredi': 3,
    'jeudi': 4,'vendredi': 5,'samedi': 6};
  
  function FRDayOfWeekParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var matchedTokens = text.substr(index).match(PATTERN);
      if(matchedTokens == null){
        finished = true;
        return;
      }
      var text = matchedTokens[0];
      index = index + matchedTokens[1].length;
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[11].length - matchedTokens[1].length);
      
      var prefix = matchedTokens[5];
      var dayOfWeek = matchedTokens[6];
      var suffix = matchedTokens[8];
      
      dayOfWeek = dayOfWeek.toLowerCase();
      var offset = DAYS_OFFSET[dayOfWeek];
      
      if(offset === undefined) return null;
      
      var date = moment(ref).clone();
      

      if(suffix && suffix.toLowerCase().match('8')){
          date.day(offset+7);
      }
      else if(suffix && suffix.toLowerCase().match('15'))  {
          date.day(offset+15);
      }
      else{
        var ref_offset = date.day();

        if(offset > ref_offset)
          date.day(offset);
        else
          date.day(offset+7);
      }
      
      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek: offset,
          impliedComponents: ['day','month','year']
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.FRDayOfWeekParser = FRDayOfWeekParser;
})();

