/*
  Parser, is base object of every chrono parser. The parser must provides these following method  
    
    - (public) exec()         : Parse the text for one matching index. This method may return a pasring result, or NULL.
        
    - (public) execAll()      : Parse the whole text. (run exec() for all of remaining text) 
      
    - (public) results()      : Get array of parsing results
    
    - (public) finished()     : All of the text has benn parsed ?
    
    
    - (protected**) pattern()   : RegEx for matching the date pattern from the text. 
                              : The parser should OVERRIDE this method. 
    
    - (protected**) extract(text, index) : This method will be called after detected matched pattern 
                                          to create a parsing result from text at index. 
                                       : The parser should OVERRIDE this method.
    
    - (protected**) extractTime(text, result) : This method will be called for every result of extract() 
                                                that doesn't have time component. 
                                         : The parser may not need to override this method
    
    
    - (protected**) mergeOverlapResult(text, result1, result2) :
                                      Check whether two parsing result are overlapped each other as 'start-end' date.
                                      If they do, this function will merged them into one.
                                   : The parser may not need to override this method
                                    
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  /**
   * Parser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function Parser(text, ref, opt){
    
    opt = opt || {};
    
    var timezoneMap    = opt.timezoneMap || chrono.timezoneMap;
    var searchingIndex = 0;
    var searchingText = text;
    var searchingFinished = false;
    var searchingResults = [];
    
    var parser = {};
    
    /**
     * Parser.pattern - Matching Pattern 
     *
     * @return { CNParser } 
     */
    parser.pattern = function() { return /./i; }
    
    /**
     * Parser.extract - Extract a parsing result from text at index
     *
     * @param  { String }    text - Orginal text to be parsed
     * @param  { Integer }   index  - Pattern matching index
     * @return { CNResult } 
     */
    parser.extract = function(text,index){ return null; };
    
    /**
     * Parser.results - Get results
     * @return { Array<CNParser> } 
     */
    parser.results = function(){ return searchingResults; }
    
    /**
     * Parser.finished - Check whether all of the text has been parsed 
     * @return { Bool } 
     */
    parser.finished = function(){ return searchingFinished; }
    
    
    /**
     * Parser.mergeOverlapResult
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result1
     * @param  { CNResult } result2
     * @return { CNResult } 
     */
    parser.mergeOverlapResult = function(text, result1, result2){
      
      if(result2.index < result1.index){
        var tmp = result1; result1 = result2; result2 = tmp;
      }
      
      var begin = result1.index + result1.text.length;
      var end   = result2.index; 
      if(end < begin &&  result1.index < result2.index && begin < result2.index + result2.text.length){
        var mergedIndex = result1.index;
        var mergedText = text.substring(result1.index, result2.index+result2.text.length);
        var impliedComponents1 = result1.start.impliedComponents || [];
        var impliedComponents2 = result2.start.impliedComponents || [];
        
        if(impliedComponents1.length < impliedComponents2.length){
          var tmp = result1; result1 = result2; result2 = tmp;
          impliedComponents1 = result1.start.impliedComponents || [];
          impliedComponents2 = result2.start.impliedComponents || [];
        }
        
        if(impliedComponents1.indexOf('day') < 0 || impliedComponents1.indexOf('month') < 0 || impliedComponents1.indexOf('year') < 0)
          return;
        
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :mergedIndex,
          start :result2.start,
          end   :result2.end,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      
      var textBetween = text.substring(begin,end);
      
      var OVERLAP_PATTERN = /^\s*(to|\-)\s*$/i;
      if(!textBetween.match(OVERLAP_PATTERN)) return null;
      var mergedText = result1.text + textBetween + result2.text;
      
      var components1 = new Object(result1.start);
      var components2 = new Object(result2.start);
      var impliedComponents1 = result1.start.impliedComponents || [];
      var impliedComponents2 = result2.start.impliedComponents || [];
      
      impliedComponents1.forEach(function(unknown_component) {
        if(components2.isCertain(unknown_component)){
          components1.assign(unknown_component, components2[unknown_component]);
        } 
      });

      impliedComponents2.forEach(function(unknown_component) {
        if(components1.isCertain(unknown_component)){
          components2.assign(unknown_component, components1[unknown_component]);
        }
      });
      
      if(moment(components2.date()).diff(moment(components1.date())) > 0){ 

        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components1,
          end   :components2,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      else{

        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components2,
          end   :components1,
          text  :mergedText,
          referenceDate :result1.referenceDate,
        });
      }

    }
    
    /**
     * Parser.extractDate
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result
     * @return { CNResult } 
     */
    parser.extractTime = function(text, result){
      var SUFFIX_PATTERN = /^\s*,?\s*(at\s+|from\s+|T|a\s+|à\s+|l[']|dans l[']|le\s+|in the\s+)?\s*,?\s*((([0-9]{1,4})(((h|\:|\：)([0-5]?[0-9]|60)((\.|\:|\：)([0-9]{1,3}))?)?(\s*(AM|PM)?)|h))|(noon|midnight|minuit|midi|apres-midi|après-midi|matin|morning|afternoon))(\W|$|Z)/i;

      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);
      
      var matchedTokens = text.match(SUFFIX_PATTERN);
      if( !matchedTokens ) return null;
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      if(hour.toLowerCase() == 'noon' || hour.toLowerCase() == 'midi'){
        result.start.meridiem = 'pm'
        hour = 12;
      }else if(hour.toLowerCase() == 'midnight' || hour.toLowerCase() == 'minuit'){
        result.start.meridiem = 'am'
        hour = 0;
      }
      else if(hour.toLowerCase() == 'morning'|| hour.toLowerCase() == 'matin'){
          hour = 9
      }
      else if(hour.toLowerCase() == 'apres-midi' || hour.toLowerCase() == 'après-midi' || hour.toLowerCase() == 'afternoon'){
          hour = 14
      }
      else
        hour = parseInt(hour);
      
      if(matchedTokens[8]){
        
        minute = matchedTokens[8];
        minute = parseInt(minute);
        if(minute >= 60) return null;
        
      }else if(hour > 100){
        minute = hour%100;
        hour   = (hour - minute)/100;
      }
      


      if(matchedTokens[11]){
        
        second = matchedTokens[11];
        second = parseInt(second);
        if(second >= 60) return null;
      }
      
      if(matchedTokens[13]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[13].toLowerCase() == "am"){
          if(hour == 12) hour = 0;
        }
        if(matchedTokens[13].toLowerCase() == "pm"){
          if(hour != 12) hour += 12;
        }
        
        result.start.meridiem = matchedTokens[13].toLowerCase();
      }
      if(hour >= 12) result.start.meridiem = 'pm';
      if(hour > 24) return null;
      result.text = result.text + matchedTokens[0].substr(0, 
        matchedTokens[0].length - matchedTokens[15].length);
      
      if(result.start.hour == undefined){
        result.start.hour = hour;
        result.start.minute = minute;
        result.start.second = second;
      }
      
      var TO_SUFFIX_PATTERN = /^\s*(to)\s*([0-9]{1,4})((\.|\:|\：|h)([0-9]{1,2})((\.|\:|\：)([0-9]{1,2}))?)?(\s*(AM|PM))?/i;
      text = text.substr(matchedTokens[0].length - matchedTokens[15].length);
      matchedTokens = text.match(TO_SUFFIX_PATTERN)
      
      if( !matchedTokens ) {
        
        //Time in POINT format.
        // Return
        if(result.end && result.end.hour == undefined){
          result.end.hour = hour;
          result.end.minute = minute;
          result.end.second = second;
        }

        return new chrono.ParseResult(result);
      }
      //Time in RANGE format. 
      // Calculate the END point...
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      hour = parseInt(hour);
      
      if(matchedTokens[5]){
        
        minute = matchedTokens[5];
        minute = parseInt(minute);
        if(minute >= 60) return null;
        
      }else if(hour > 100){
        if(!matchedTokens[10]) return null;
        
        minute = hour%100;
        hour   = (hour - minute)/100;
      }

      if(matchedTokens[8]){
        
        second = matchedTokens[8];
        second = parseInt(second);
        if(second >= 60) return null;
      }
      
      if(matchedTokens[10]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[10].toLowerCase() == "am"){
          if(hour == 12) {
            hour = 0;
            if(!result.end) result.end = new chrono.DateComponents(result.start);
            result.end.day += 1;
          }
        }
        if(matchedTokens[10].toLowerCase() == "pm"){
          if(hour != 12) hour += 12;
        }
        
        if(!result.start.meridiem){
          if(matchedTokens[10].toLowerCase() == "am"){
            if(result.start.hour == 12) result.start.hour = 0;
          }
          if(matchedTokens[10].toLowerCase() == "pm"){
            if(result.start.hour != 12) result.start.hour += 12;
          }
          
          result.start.imply('meridiem', matchedTokens[10].toLowerCase())
        }
      }
      
      
      result.text = result.text + matchedTokens[0];
      
      if(!result.end){
        result.end = new chrono.DateComponents(result.start);
        result.end.hour = hour;
        result.end.minute = minute;
        result.end.second = second;
      }else{
        result.end.hour = hour;
        result.end.minute = minute;
        result.end.second = second;
      }
      
      if(matchedTokens[10]) result.end.meridiem = matchedTokens[10].toLowerCase();
      if(hour >= 12) result.end.meridiem = 'pm';
      
      return new chrono.ParseResult(result);
    }
    
    
    parser.extractTimezone = function(text, result) {
      
      var PATTERN = /^\s*(GMT|UTC)?(\+|\-)(\d{1,2}):?(\d{2})/;
      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);

      var matchedTokens = text.match(PATTERN);
      if(matchedTokens){

        var timezoneOffset = parseInt(matchedTokens[3])*60 + parseInt(matchedTokens[4])
        var timezoneOffset = parseInt(matchedTokens[2] + timezoneOffset)*(-1);
        if(result.end) result.end.timezoneOffset = timezoneOffset;
        result.start.timezoneOffset = timezoneOffset;
        result.text += matchedTokens[0];
        text = text.substr(matchedTokens[0].length);
      }
      
      var PATTERN = /^\s*\(?([A-Z]{1,4})\)?(\W|$)/;
      var matchedTokens = text.match(PATTERN);
      if(matchedTokens && timezoneMap[matchedTokens[1]] !== undefined){
        var timezoneAbbr = matchedTokens[1];
        var timezoneOffset =- timezoneMap[timezoneAbbr];
        var timezoneRegion;
        if(matchedTokens[1].toLowerCase()=="z"){
            timezoneRegion = "GMT"
        }
        else if(!!moment.tz.zone(matchedTokens[1])){
            timezoneRegion = moment.tz.zone(matchedTokens[1]).name;
        }

        if(result.start.timezoneOffset === undefined){
          result.start.timezoneOffset = timezoneOffset;
          result.start.timezoneAbbr = matchedTokens[1];
          result.start.timezoneRegion = timezoneRegion;
          if(result.end) result.end.timezoneOffset = timezoneOffset;
        }
        
        result.text += matchedTokens[0].substring(0, matchedTokens[0].length 
          - matchedTokens[2].length);
      }

      if(result.start.timezoneOffset == undefined){
          PATTERN = "^\\s*\\(?(";
//          var i;
//          var zoneNames = moment.tz.names();
//          for(i in zoneNames){
//              if(zoneNames.hasOwnProperty(i) && zoneNames[i]){
//                  PATTERN +=  zoneNames[i].replace("_", " ") + "|"
//              }
//
//          }
//          PATTERN.substr(0,PATTERN.length-1);

          //result of execution of above code:

          PATTERN += "Africa/Abidjan|Africa/Accra|Africa/Addis Ababa|Africa/Algiers|Africa/Asmara|Africa/Asmera|Africa/Bamako|Africa/Bangui|Africa/Banjul|Africa/Bissau|Africa/Blantyre|Africa/Brazzaville|Africa/Bujumbura|Africa/Cairo|Africa/Casablanca|Africa/Ceuta|Africa/Conakry|Africa/Dakar|Africa/Dar es_Salaam|Africa/Djibouti|Africa/Douala|Africa/El Aaiun|Africa/Freetown|Africa/Gaborone|Africa/Harare|Africa/Johannesburg|Africa/Juba|Africa/Kampala|Africa/Khartoum|Africa/Kigali|Africa/Kinshasa|Africa/Lagos|Africa/Libreville|Africa/Lome|Africa/Luanda|Africa/Lubumbashi|Africa/Lusaka|Africa/Malabo|Africa/Maputo|Africa/Maseru|Africa/Mbabane|Africa/Mogadishu|Africa/Monrovia|Africa/Nairobi|Africa/Ndjamena|Africa/Niamey|Africa/Nouakchott|Africa/Ouagadougou|Africa/Porto-Novo|Africa/Sao Tome|Africa/Timbuktu|Africa/Tripoli|Africa/Tunis|Africa/Windhoek|America/Adak|America/Anchorage|America/Anguilla|America/Antigua|America/Araguaina|America/Argentina/Buenos Aires|America/Argentina/Catamarca|America/Argentina/ComodRivadavia|America/Argentina/Cordoba|America/Argentina/Jujuy|America/Argentina/La Rioja|America/Argentina/Mendoza|America/Argentina/Rio Gallegos|America/Argentina/Salta|America/Argentina/San Juan|America/Argentina/San Luis|America/Argentina/Tucuman|America/Argentina/Ushuaia|America/Aruba|America/Asuncion|America/Atikokan|America/Atka|America/Bahia|America/Bahia Banderas|America/Barbados|America/Belem|America/Belize|America/Blanc-Sablon|America/Boa Vista|America/Bogota|America/Boise|America/Buenos Aires|America/Cambridge Bay|America/Campo Grande|America/Cancun|America/Caracas|America/Catamarca|America/Cayenne|America/Cayman|America/Chicago|America/Chihuahua|America/Coral Harbour|America/Cordoba|America/Costa Rica|America/Creston|America/Cuiaba|America/Curacao|America/Danmarkshavn|America/Dawson|America/Dawson Creek|America/Denver|America/Detroit|America/Dominica|America/Edmonton|America/Eirunepe|America/El Salvador|America/Ensenada|America/Fort Wayne|America/Fortaleza|America/Glace Bay|America/Godthab|America/Goose Bay|America/Grand Turk|America/Grenada|America/Guadeloupe|America/Guatemala|America/Guayaquil|America/Guyana|America/Halifax|America/Havana|America/Hermosillo|America/Indiana/Indianapolis|America/Indiana/Knox|America/Indiana/Marengo|America/Indiana/Petersburg|America/Indiana/Tell City|America/Indiana/Vevay|America/Indiana/Vincennes|America/Indiana/Winamac|America/Indianapolis|America/Inuvik|America/Iqaluit|America/Jamaica|America/Jujuy|America/Juneau|America/Kentucky/Louisville|America/Kentucky/Monticello|America/Knox IN|America/Kralendijk|America/La Paz|America/Lima|America/Los Angeles|America/Louisville|America/Lower Princes|America/Maceio|America/Managua|America/Manaus|America/Marigot|America/Martinique|America/Matamoros|America/Mazatlan|America/Mendoza|America/Menominee|America/Merida|America/Metlakatla|America/Mexico City|America/Miquelon|America/Moncton|America/Monterrey|America/Montevideo|America/Montreal|America/Montserrat|America/Nassau|America/New York|America/Nipigon|America/Nome|America/Noronha|America/North Dakota/Beulah|America/North Dakota/Center|America/North Dakota/New_Salem|America/Ojinaga|America/Panama|America/Pangnirtung|America/Paramaribo|America/Phoenix|America/Port-au-Prince|America/Port of_Spain|America/Porto Acre|America/Porto Velho|America/Puerto Rico|America/Rainy River|America/Rankin Inlet|America/Recife|America/Regina|America/Resolute|America/Rio Branco|America/Rosario|America/Santa Isabel|America/Santarem|America/Santiago|America/Santo Domingo|America/Sao Paulo|America/Scoresbysund|America/Shiprock|America/Sitka|America/St Barthelemy|America/St Johns|America/St Kitts|America/St Lucia|America/St Thomas|America/St Vincent|America/Swift Current|America/Tegucigalpa|America/Thule|America/Thunder Bay|America/Tijuana|America/Toronto|America/Tortola|America/Vancouver|America/Virgin|America/Whitehorse|America/Winnipeg|America/Yakutat|America/Yellowknife|Antarctica/Casey|Antarctica/Davis|Antarctica/DumontDUrville|Antarctica/Macquarie|Antarctica/Mawson|Antarctica/McMurdo|Antarctica/Palmer|Antarctica/Rothera|Antarctica/South Pole|Antarctica/Syowa|Antarctica/Troll|Antarctica/Vostok|Arctic/Longyearbyen|Asia/Aden|Asia/Almaty|Asia/Amman|Asia/Anadyr|Asia/Aqtau|Asia/Aqtobe|Asia/Ashgabat|Asia/Ashkhabad|Asia/Baghdad|Asia/Bahrain|Asia/Baku|Asia/Bangkok|Asia/Beirut|Asia/Bishkek|Asia/Brunei|Asia/Calcutta|Asia/Choibalsan|Asia/Chongqing|Asia/Chungking|Asia/Colombo|Asia/Dacca|Asia/Damascus|Asia/Dhaka|Asia/Dili|Asia/Dubai|Asia/Dushanbe|Asia/Gaza|Asia/Harbin|Asia/Hebron|Asia/Ho Chi_Minh|Asia/Hong Kong|Asia/Hovd|Asia/Irkutsk|Asia/Istanbul|Asia/Jakarta|Asia/Jayapura|Asia/Jerusalem|Asia/Kabul|Asia/Kamchatka|Asia/Karachi|Asia/Kashgar|Asia/Kathmandu|Asia/Katmandu|Asia/Khandyga|Asia/Kolkata|Asia/Krasnoyarsk|Asia/Kuala Lumpur|Asia/Kuching|Asia/Kuwait|Asia/Macao|Asia/Macau|Asia/Magadan|Asia/Makassar|Asia/Manila|Asia/Muscat|Asia/Nicosia|Asia/Novokuznetsk|Asia/Novosibirsk|Asia/Omsk|Asia/Oral|Asia/Phnom Penh|Asia/Pontianak|Asia/Pyongyang|Asia/Qatar|Asia/Qyzylorda|Asia/Rangoon|Asia/Riyadh|Asia/Saigon|Asia/Sakhalin|Asia/Samarkand|Asia/Seoul|Asia/Shanghai|Asia/Singapore|Asia/Taipei|Asia/Tashkent|Asia/Tbilisi|Asia/Tehran|Asia/Tel Aviv|Asia/Thimbu|Asia/Thimphu|Asia/Tokyo|Asia/Ujung Pandang|Asia/Ulaanbaatar|Asia/Ulan Bator|Asia/Urumqi|Asia/Ust-Nera|Asia/Vientiane|Asia/Vladivostok|Asia/Yakutsk|Asia/Yekaterinburg|Asia/Yerevan|Atlantic/Azores|Atlantic/Bermuda|Atlantic/Canary|Atlantic/Cape Verde|Atlantic/Faeroe|Atlantic/Faroe|Atlantic/Jan Mayen|Atlantic/Madeira|Atlantic/Reykjavik|Atlantic/South Georgia|Atlantic/St Helena|Atlantic/Stanley|Australia/ACT|Australia/Adelaide|Australia/Brisbane|Australia/Broken Hill|Australia/Canberra|Australia/Currie|Australia/Darwin|Australia/Eucla|Australia/Hobart|Australia/LHI|Australia/Lindeman|Australia/Lord Howe|Australia/Melbourne|Australia/NSW|Australia/North|Australia/Perth|Australia/Queensland|Australia/South|Australia/Sydney|Australia/Tasmania|Australia/Victoria|Australia/West|Australia/Yancowinna|Brazil/Acre|Brazil/DeNoronha|Brazil/East|Brazil/West|CET|CST6CDT|Canada/Atlantic|Canada/Central|Canada/East-Saskatchewan|Canada/Eastern|Canada/Mountain|Canada/Newfoundland|Canada/Pacific|Canada/Saskatchewan|Canada/Yukon|Chile/Continental|Chile/EasterIsland|Cuba|EET|EST|EST5EDT|Egypt|Eire|Etc/GMT|Etc/GMT+0|Etc/GMT+1|Etc/GMT+10|Etc/GMT+11|Etc/GMT+12|Etc/GMT+2|Etc/GMT+3|Etc/GMT+4|Etc/GMT+5|Etc/GMT+6|Etc/GMT+7|Etc/GMT+8|Etc/GMT+9|Etc/GMT-0|Etc/GMT-1|Etc/GMT-10|Etc/GMT-11|Etc/GMT-12|Etc/GMT-13|Etc/GMT-14|Etc/GMT-2|Etc/GMT-3|Etc/GMT-4|Etc/GMT-5|Etc/GMT-6|Etc/GMT-7|Etc/GMT-8|Etc/GMT-9|Etc/GMT0|Etc/Greenwich|Etc/UCT|Etc/UTC|Etc/Universal|Etc/Zulu|Europe/Amsterdam|Europe/Andorra|Europe/Athens|Europe/Belfast|Europe/Belgrade|Europe/Berlin|Europe/Bratislava|Europe/Brussels|Europe/Bucharest|Europe/Budapest|Europe/Busingen|Europe/Chisinau|Europe/Copenhagen|Europe/Dublin|Europe/Gibraltar|Europe/Guernsey|Europe/Helsinki|Europe/Isle of_Man|Europe/Istanbul|Europe/Jersey|Europe/Kaliningrad|Europe/Kiev|Europe/Lisbon|Europe/Ljubljana|Europe/London|Europe/Luxembourg|Europe/Madrid|Europe/Malta|Europe/Mariehamn|Europe/Minsk|Europe/Monaco|Europe/Moscow|Europe/Nicosia|Europe/Oslo|Europe/Paris|Europe/Podgorica|Europe/Prague|Europe/Riga|Europe/Rome|Europe/Samara|Europe/San Marino|Europe/Sarajevo|Europe/Simferopol|Europe/Skopje|Europe/Sofia|Europe/Stockholm|Europe/Tallinn|Europe/Tirane|Europe/Tiraspol|Europe/Uzhgorod|Europe/Vaduz|Europe/Vatican|Europe/Vienna|Europe/Vilnius|Europe/Volgograd|Europe/Warsaw|Europe/Zagreb|Europe/Zaporozhye|Europe/Zurich|GB|GB-Eire|GMT|GMT+0|GMT-0|GMT0|Greenwich|HST|Hongkong|Iceland|Indian/Antananarivo|Indian/Chagos|Indian/Christmas|Indian/Cocos|Indian/Comoro|Indian/Kerguelen|Indian/Mahe|Indian/Maldives|Indian/Mauritius|Indian/Mayotte|Indian/Reunion|Iran|Israel|Jamaica|Japan|Kwajalein|Libya|MET|MST|MST7MDT|Mexico/BajaNorte|Mexico/BajaSur|Mexico/General|NZ|NZ-CHAT|Navajo|PRC|PST8PDT|Pacific/Apia|Pacific/Auckland|Pacific/Chatham|Pacific/Chuuk|Pacific/Easter|Pacific/Efate|Pacific/Enderbury|Pacific/Fakaofo|Pacific/Fiji|Pacific/Funafuti|Pacific/Galapagos|Pacific/Gambier|Pacific/Guadalcanal|Pacific/Guam|Pacific/Honolulu|Pacific/Johnston|Pacific/Kiritimati|Pacific/Kosrae|Pacific/Kwajalein|Pacific/Majuro|Pacific/Marquesas|Pacific/Midway|Pacific/Nauru|Pacific/Niue|Pacific/Norfolk|Pacific/Noumea|Pacific/Pago Pago|Pacific/Palau|Pacific/Pitcairn|Pacific/Pohnpei|Pacific/Ponape|Pacific/Port Moresby|Pacific/Rarotonga|Pacific/Saipan|Pacific/Samoa|Pacific/Tahiti|Pacific/Tarawa|Pacific/Tongatapu|Pacific/Truk|Pacific/Wake|Pacific/Wallis|Pacific/Yap|Poland|Portugal|ROC|ROK|Singapore|Turkey|UCT|US/Alaska|US/Aleutian|US/Arizona|US/Central|US/East-Indiana|US/Eastern|US/Hawaii|US/Indiana-Starke|US/Michigan|US/Mountain|US/Pacific|US/Pacific-New|US/Samoa|UTC|Universal|W-SU|WET|Zulu";

          PATTERN += ")\\)?(\\W|$)";
          PATTERN = new RegExp(PATTERN, "i");
          var matchedTokens = text.match(PATTERN);
          if(matchedTokens && matchedTokens[1]){
              var date = result.startDate;
              var timezoneRegion = matchedTokens[1].replace(" ", "_");
              result.start.timezoneAbbr = moment.tz([date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()], timezoneRegion).format('z');
              result.start.timezoneRegion = timezoneRegion;
              result.start.timezoneOffset = -timezoneMap[result.start.timezoneAbbr];

              result.text += matchedTokens[0].substring(0, matchedTokens[0].length - matchedTokens[2].length);
          }
      }



      
      return result;
    }
    
    /**
     * Parser.extractConcordance
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result
     * @return { CNResult } 
     */
    parser.extractConcordance = function(text, result) {
      
      var conLength =  30;
      
      preText = text.substr(0, result.index)
      preText = preText.replace(/(\r\n|\n|\r)/gm," ");
    	preText = preText.replace(/(\s+)/gm," ");
    	
    	if(preText.length > conLength)
    	  preText = '...' + preText.substr( preText.length - conLength +3, conLength-3)
    	else
        preText = preText.substr( 0, conLength)
        
      posText = text.substr(result.index+result.text.length)
      posText = posText.replace(/(\r\n|\n|\r)/gm," ");
    	posText = posText.replace(/(\s+)/gm," ");
    	
    	if(posText.length > conLength)
    	  posText = posText.substr(0, conLength - 3)+'...';
    	else
    	  posText = posText.substr(0, conLength)
      
      result.concordance = preText + result.text + posText;
      return new chrono.ParseResult(result);
    }
    
    
    /**
     * Parser.exec - Parse the text for one matching index.
     * @return { CNResult or NULL} 
     */
    parser.exec = function(){
      if(searchingFinished) return null;
      
      //Search for the pattern
      var index  = searchingText.search( this.pattern() );
      if(index < 0) {
        searchingFinished = true;
        return null; 
      }
      
      //Extract the result
      var matchedIndex = index + searchingIndex;
      var result  = this.extract(text, matchedIndex);
      
      if(!result){ // Failed to extract the date result, MOVE ON
        searchingText = searchingText.substr(index + 1);
        searchingIndex = matchedIndex + 1;
        return null;
      }
      
      // Try extracting time infomation
      if(result.start.hour === undefined || (result.end && result.end.hour === undefined)){
        var timedResult = this.extractTime(text, result);
        result = timedResult || result; 
      }
      
      // Try extracting timezone infomation
      if(result.start.timezoneOffset === undefined || (result.end && result.end.timezoneOffset === undefined)){
        var resultWithTimezone = this.extractTimezone(text, result);
        result = resultWithTimezone || result; 
        
        if(opt.timezoneOffset){ //Fallback to opt.timezoneOffset
          if(result.start.timezoneOffset === undefined){
            result.start.imply('timezoneOffset', opt.timezoneOffset);
          }
  
          if(result.end && result.end.timezoneOffset === undefined){
            result.end.imply('timezoneOffset', opt.timezoneOffset);
          }
        }
      }

      
      
      // Try merging overlap results
      if(searchingResults.length > 0){
       var oldResult = searchingResults[searchingResults.length - 1];
       var overlapResult = this.mergeOverlapResult(text, oldResult, result);
       
       result = overlapResult || result;
      }
      
      // Extract Concordance
      this.extractConcordance(text, result);
      
      searchingResults.push(result); 
      searchingText  = text.substr(result.index + result.text.length + 1);
      searchingIndex = result.index + result.text.length + 1;
      return result;
  	}
  	
  	/**
     * Parser.execAll - Parse the whole text.
     */
  	parser.execAll = function () {
  	  while(!this.finished()) this.exec();
  	}
  	
  	return parser;
  }
  
  chrono.Parser = Parser;
})();

