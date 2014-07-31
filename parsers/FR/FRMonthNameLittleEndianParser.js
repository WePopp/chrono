/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var DAYS_OFFSET = { 'dimanche': 0, 'dim': 0, 'lundi': 1, 'lun': 1,'mardi': 2, 'mar':2, 'mercredi': 3, 'mer': 3,
    'jeudi': 4, 'jeu': 4, 'vendredi': 5, 'ven': 5,'samedi': 6, 'sam': 6,}

  var MONTHS_TRANSLATION = { 'jan': 'January', 'janvier': 'January',
                             'fev': 'February', 'fév': 'February', 'février': 'February', 'fevrier': 'February',
                             'mars': 'March', 'mar': 'March',
                             'avril': 'April', 'avr': 'April',
                             'mai': 'May',
                             'juin': 'June',
                             'juillet': 'July', 'juil': 'July',
                             'aout': 'August', 'août': 'August',
                            'septembre': 'September', 'sept': 'September',
                            'octobre': 'October', 'oct': 'Oct',
                            'novembre': 'November', 'nov': 'Nov',
                            'décembre': 'December', 'dec': 'December', 'déc': 'December', 'decembre': 'December'};

  var regPattern  = /(\s+|^)((Dimanche|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dim|Lun|Mar|Mer|Jeu|Ven|Sam)\s*,?\s*)?([0-9]{1,2})(\s*(Janvier|Jan|Février|Fevrier|Fev|Mars|Mar|Avril|Avr|Mai|Juin|Juillet|Juil|Aout|Août|Septembre|Sept|Octobre|Oct|Novembre|Nov|Decembre|Décembre|Dec))((\s*[0-9]{2,4})(\s*BE)?)?(\W|$)/i;



  function FRMonthNameLittleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return regPattern; }
    
    parser.extract = function(text,index){ 
      
      var impliedComponents = [];
      var date = null;
      var dayOfWeek = null;
      
      text = text.substr(index);
      var originalText = text;
      var remainingText = text;
      
      var matchedTokens = text.match(regPattern);
        console.log(matchedTokens);
      text = matchedTokens[0];
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[10].length - matchedTokens[1].length);
      index = index + matchedTokens[1].length;

      var remainingText = remainingText.substr(matchedTokens[1].length + text.length);
      var originalText = text;
      if(matchedTokens[5]) text = text.replace(matchedTokens[5],'');
      if(matchedTokens[6]) text = text.replace(matchedTokens[6],'');

      var years = null
      if(matchedTokens[7]){
        years = matchedTokens[8];
        years = parseInt(years);

        if(years < 100){ 

          //This should be TIME not YEAR
          if(remainingText.match(/\s*(:|am|pm)/i) != null){
            text = text.replace(matchedTokens[7], '');
            originalText = originalText.replace(matchedTokens[7], '');
            years = null;
          }else{
            if(years > 20) years = null; //01 - 20
            else years = years + 2000;
          }
        }
        else if(matchedTokens[9]){ //BC
          text = text.replace(matchedTokens[9], '');
          years = years - 543;
        }
      }
        matchedTokens[6] = MONTHS_TRANSLATION[matchedTokens[6].toLowerCase()];
      if(years){
        text = matchedTokens[4] + ' ' + matchedTokens[6] + ' ' + years;
        date = moment(text,'DD MMMM YYYY');
        if(!date) return null;
      }else{
        text  = matchedTokens[4] + ' ' + matchedTokens[6];
        date  = moment(text,'DD MMMM');
        if(!date) return null;
        
        //Find the most appropriated year
        impliedComponents.push('year')
        date.year(moment(ref).year());
        var nextYear = date.clone().add('y',1);
        var lastYear = date.clone().add('y',-1);
        if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){	
        	date = nextYear;
        }
        else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){	
        	date = lastYear;
        }
      }
      
      //Day of week
      if(matchedTokens[3]) dayOfWeek =  DAYS_OFFSET[matchedTokens[3].toLowerCase()]
      
      // Text text can be 'range' value. Such as '12 - 13 January 2012'
      //deleted
        //Check leap day or impossible date
        if(date.format('D') != parseInt(matchedTokens[4]) || matchedTokens[4].length>2) return;
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
            dayOfWeek: dayOfWeek,
            impliedComponents: impliedComponents
          }
        });

  };
  
  //Override for day of the week suffix - MM dd (Thuesday) 
  var baseExtractTime = parser.extractTime;
  parser.extractTime = function(text, result){
    
      var DAY_OF_WEEK_SUFFIX_PATTERN = /(\,|\(|\s)*(Sun|Sunday|Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thur|Thursday|Fri|Friday|Sat|Saturday)(\,|\)|\s)*/i;
      
      if(text.length <= result.index + result.text.length) return null;
        
      var suffix_text = text.substr(result.index + result.text.length);
      var matchedTokens = suffix_text.match(DAY_OF_WEEK_SUFFIX_PATTERN);
      if( matchedTokens && suffix_text.indexOf(matchedTokens[0]) == 0){
        result.text = result.text + matchedTokens[0];
      }
      
      return baseExtractTime.call(this, text, result);
    }
    
  	return parser;
  }
  
  chrono.parsers.FRMonthNameLittleEndianParser = FRMonthNameLittleEndianParser;
})();

