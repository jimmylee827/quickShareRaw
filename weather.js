var warningHidden = true;
window.onload = () => {
    var headtitle = document.createElement("h1");
    headtitle.id = "headtitle";
    var headtitleText = document.createTextNode(document.title.toString());
    headtitle.appendChild(headtitleText);
    document.body.appendChild(headtitle);

    var headerBlock = document.createElement("div");
    headerBlock.id = "header_block";
    document.body.appendChild(headerBlock);
    //fetch('https://raw.githubusercontent.com/jimmylee827/quickShareRaw/main/weather.Feb17.json');
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?' + new URLSearchParams({
        dataType: 'rhrread',
        lang: 'en',
    })).then(function(res) {
        return res.json();
    }).then(function(currentWeatherData) {
        //console.log(currentWeatherData);
        geolocation(currentWeatherData);
        temperatureListUpdate(currentWeatherData);
        var headerBlockTitle = document.createElement("h2");
        headerBlockTitle.id = "header_block_title";
        var headerBlockTitleText = document.createTextNode("Hong Kong");
        headerBlockTitle.appendChild(headerBlockTitleText);
        headerBlock.appendChild(headerBlockTitle);
            var headerRow1 = document.createElement("div");
            headerRow1.id = "header_block_row1";
            headerBlock.appendChild(headerRow1);
                var headerRow1Cell1 = document.createElement("div");
                headerRow1Cell1.classList = ["header_block_row1_cell"];
                headerRow1.appendChild(headerRow1Cell1);
                    var iconBox = document.createElement("div");
                    iconBox.id = "icon_box";
                    headerRow1Cell1.appendChild(iconBox);
                        var weatherIcon = document.createElement("img");
                        weatherIcon.id = "weather_icon";
                        weatherIcon.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+currentWeatherData.icon[0]+".png";
                        iconBox.appendChild(weatherIcon);
                    var temperatureBox = document.createElement("div");
                    temperatureBox.id = "temperature_box";
                    headerRow1Cell1.appendChild(temperatureBox);
                        var temperatureWord = document.createElement("div");
                        temperatureWord.id = "temperature_word";
                        var hongKongTemperature = -1;
                        currentWeatherData.temperature.data.forEach(function(element){
                            if(element.place=="Hong Kong Observatory"){
                                hongKongTemperature = element.value;
                            }
                        });
                        var temperatureWordText = document.createTextNode(hongKongTemperature);
                        temperatureWord.appendChild(temperatureWordText);
                        temperatureBox.appendChild(temperatureWord);
                        var temperatureSymbol = document.createElement("div");
                        temperatureSymbol.id = "temperature_symbol";
                        var temperatureSymbolText = document.createTextNode("°C");
                        temperatureSymbol.appendChild(temperatureSymbolText);
                        temperatureBox.appendChild(temperatureSymbol);
                var headerRow1Cell2 = document.createElement("div");
                headerRow1Cell2.classList = ["header_block_row1_cell"];
                headerRow1.appendChild(headerRow1Cell2);
                    var humidityBox = document.createElement("div");
                    humidityBox.id = "humidity_box";
                    headerRow1Cell2.appendChild(humidityBox);
                        var humidityIcon = document.createElement("img");
                        humidityIcon.id = "humidity_icon";
                        humidityIcon.src = "images/drop-48.png"
                        humidityBox.appendChild(humidityIcon);
                        var humidityWord = document.createElement("div");
                        humidityWord.id = "humidity_word";
                        var hongKongHumidity = -1;
                        currentWeatherData.humidity.data.forEach(function(element){
                            if(element.place=="Hong Kong Observatory"){
                                hongKongHumidity = element.value;
                            }
                        });
                        var humidityWordText = document.createTextNode(hongKongHumidity);
                        humidityWord.appendChild(humidityWordText);
                        humidityBox.appendChild(humidityWord);
                        var humiditySymbol = document.createElement("div");
                        humiditySymbol.id = "humidity_symbol";
                        var humiditySymbolText = document.createTextNode("%");
                        humiditySymbol.appendChild(humiditySymbolText);
                        humidityBox.appendChild(humiditySymbol);
                    var rainfallBox = document.createElement("div");
                    rainfallBox.id = "rainfall_box";
                    headerRow1Cell2.appendChild(rainfallBox);
                        var rainfallIcon = document.createElement("img");
                        rainfallIcon.id = "rainfall_icon";
                        rainfallIcon.src = "images/rain-48.png"
                        rainfallBox.appendChild(rainfallIcon);
                        var rainfallWord = document.createElement("div");
                        rainfallWord.id = "rainfall_word";
                        var hongKongRainfall = -1;
                        currentWeatherData.rainfall.data.forEach(function(element){
                            if(element.place=="Yau Tsim Mong"){
                                hongKongRainfall = element.max;
                            }
                        });
                        var rainfallWordText = document.createTextNode(hongKongRainfall);
                        rainfallWord.appendChild(rainfallWordText);
                        rainfallBox.appendChild(rainfallWord);
                        var rainfallSymbol = document.createElement("div");
                        rainfallSymbol.id = "rainfall_symbol";
                        var rainfallSymbolText = document.createTextNode("mm");
                        rainfallSymbol.appendChild(rainfallSymbolText);
                        rainfallBox.appendChild(rainfallSymbol);
                
                var headerBlockBackgroundImageUrl = "images/blue-sky.jpg";
                var currentHour = new Date().getHours();
                //console.log("currentHour "+currentHour);
                if(currentHour<6||currentHour>=18){
                    headerBlockBackgroundImageUrl = "images/night-sky.jpg";
                    headerBlock.style.color = 'white';
                }
                else{
                    headerBlock.style.color = 'black';
                }
                if(hongKongRainfall<0){
                    if(currentHour<6||currentHour>=18)
                        headerBlockBackgroundImageUrl = "images/water-drops-glass-night.jpg";
                    else
                        headerBlockBackgroundImageUrl = "images/water-drops-glass-day.jpg";
                }
                headerBlock.style.backgroundImage = 'url(' + headerBlockBackgroundImageUrl + ')';
                headerBlock.style.backgroundSize = 'cover';

                var hongKongUV = "N/A";
                if(currentWeatherData.uvindex.hasOwnProperty('data')){
                    currentWeatherData.uvindex.data.forEach(function(element){
                        if(element.place=="King's Park"){
                            hongKongUV = element.value;
                        }
                    });
                }
                if(hongKongUV!="N/A"){
                    var headerRow1Cell3 = document.createElement("div");
                    headerRow1Cell3.classList = ["header_block_row1_cell"];
                    headerRow1.appendChild(headerRow1Cell3);
                        var UVBox = document.createElement("div");
                        UVBox.id = "UV_box";
                        headerRow1Cell3.appendChild(UVBox);
                            var UVIcon = document.createElement("img");
                            UVIcon.id = "UV_icon";
                            UVIcon.src = "images/UVindex-48.png"
                            UVBox.appendChild(UVIcon);
                            var UVWord = document.createElement("div");
                            UVWord.id = "UV_word";
                            var UVWordText = document.createTextNode(hongKongUV);
                            UVWord.appendChild(UVWordText);
                            UVBox.appendChild(UVWord);
                }
            
            var headerRow2 = document.createElement("div");
            headerRow2.id = "header_block_row2";
            headerBlock.appendChild(headerRow2);
            if (!(typeof currentWeatherData.warningMessage === 'string' || currentWeatherData.warningMessage instanceof String)){
                var warningBox = document.createElement("div");
                warningBox.id = "warning_box";
                warningBox.onclick = warningBoxOnClick;
                headerRow2.appendChild(warningBox);
                    var warningBoxTitle = document.createElement("h3");
                    warningBoxTitle.id = "warning_box_title";
                    warningBox.appendChild(warningBoxTitle);
                    var warningBoxText = document.createTextNode("Warning");
                    warningBoxTitle.appendChild(warningBoxText);
                    warningUl = document.createElement("ul");
                    warningUl.id = "warning_ul";
                    warningBox.appendChild(warningUl);
                    if (typeof currentWeatherData.warningMessage === 'string' || currentWeatherData.warningMessage instanceof String){
                        var warningLi = document.createElement("li");
                        warningLi.id = "warning_li";
                        var warningLiText = document.createTextNode("No warning currently.");
                        warningLi.appendChild(warningLiText);
                        warningUl.appendChild(warningLi);
                    }
                    else{
                        currentWeatherData.warningMessage.forEach(function(element){
                            var warningLi = document.createElement("li");
                            warningLi.id = "warning_li";
                            var warningLiText = document.createTextNode(element);
                            warningLi.appendChild(warningLiText);
                            warningUl.appendChild(warningLi);
                        });
                    }
                    warningUl.hidden = warningHidden;
            }
                var lastUpdateBox = document.createElement("div");
                lastUpdateBox.id = "last_update_box";
                var lastUpdateTimeString = currentWeatherData.updateTime;
                var indexStart = lastUpdateTimeString.indexOf("T")+1;
                lastUpdateTimeString = lastUpdateTimeString.substring(indexStart, indexStart+5);
                var lastUpdateText = document.createTextNode("Last Update: "+lastUpdateTimeString);
                lastUpdateBox.appendChild(lastUpdateText);
                headerRow2.appendChild(lastUpdateBox);
    });
    var locationSection = document.createElement("div");
    locationSection.id = "location_section";
    document.body.appendChild(locationSection);
        var myDataBlock = document.createElement("div");
        myDataBlock.id = "mydata_block";
        locationSection.appendChild(myDataBlock);
            var myDataBlockTitle = document.createElement("h2");
            myDataBlockTitle.id = "mydata_block_title";
            var myDataBlockTitleText = document.createTextNode("My Location");
            myDataBlockTitle.appendChild(myDataBlockTitleText);
            myDataBlock.appendChild(myDataBlockTitle);
                var myDataRow1 = document.createElement("div");
                myDataRow1.id = "mydata_block_row1";
                myDataBlock.appendChild(myDataRow1);
                    var addressBox = document.createElement("div");
                    addressBox.id = "address_box";
                    myDataRow1.appendChild(addressBox);
                        var district = document.createElement("div");
                        district.id = "district";
                        var districtText = document.createTextNode("Waiting for Location...");
                        district.appendChild(districtText);
                        addressBox.appendChild(district);
                var myDataRow2 = document.createElement("div");
                myDataRow2.id = "mydata_block_row2";
                myDataBlock.appendChild(myDataRow2);
        var temperatureBlock = document.createElement("div");
        temperatureBlock.id = "temperature_block";
        locationSection.appendChild(temperatureBlock);
            var temperatureBlockTitle = document.createElement("h2");
            temperatureBlockTitle.id = "temperature_block_title";
            var temperatureBlockTitleText = document.createTextNode("Temperatures");
            temperatureBlockTitle.appendChild(temperatureBlockTitleText);
            temperatureBlock.appendChild(temperatureBlockTitle);
                var temperatureRow1 = document.createElement("div");
                temperatureRow1.id = "temperature_block_row1";
                temperatureBlock.appendChild(temperatureRow1);
                    var locationSelectLabel = document.createElement("div");
                    locationSelectLabel.id = "location_select_label";
                    var locationSelectLabelText = document.createTextNode("Select the location");
                    locationSelectLabel.appendChild(locationSelectLabelText);
                    temperatureRow1.appendChild(locationSelectLabel);
                var temperatureRow2 = document.createElement("div");
                temperatureRow2.id = "temperature_block_row2";
                temperatureBlock.appendChild(temperatureRow2);
                    var locationSelectList = document.createElement("select");
                    locationSelectList.id = "location_select_list";
                    temperatureRow2.appendChild(locationSelectList);
                    locationSelectList.onchange = locationSelectListOnChange;
                        var locationSelectOption = document.createElement("option");
                        var locationSelectOptionText = document.createTextNode("-");
                        locationSelectOption.appendChild(locationSelectOptionText);
                        locationSelectList.appendChild(locationSelectOption);
                var temperatureRow3 = document.createElement("div");
                temperatureRow3.id = "temperature_block_row3";
                temperatureBlock.appendChild(temperatureRow3);
                    var locationTemperatureWord = document.createElement("div");
                    locationTemperatureWord.id = "location_select_temperature_word";
                    temperatureRow3.appendChild(locationTemperatureWord);
                    var locationTemperatureSymbol = document.createElement("div");
                    locationTemperatureSymbol.id = "location_select_temperature_symbol";
                    temperatureRow3.appendChild(locationTemperatureSymbol);
    var forecastBlock = document.createElement("div");
    forecastBlock.id = "forecast_block";
    document.body.appendChild(forecastBlock);
        var forecastBlockTitle = document.createElement("h2");
        forecastBlockTitle.id = "forecast_block_title";
        var forecastBlockTitleText = document.createTextNode("9-Day Forecast");
        forecastBlockTitle.appendChild(forecastBlockTitleText);
        forecastBlock.appendChild(forecastBlockTitle);
        var forecastRow1 = document.createElement("div");
        forecastRow1.id = "forecast_block_row1";
        forecastBlock.appendChild(forecastRow1);
    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?' + new URLSearchParams({
        dataType: 'fnd',
        lang: 'en',
    })).then(function(res) {
        return res.json();
    }).then(function(nineDaysWeatherData) {
        //console.log(nineDaysWeatherData);
        nineDaysWeatherData.weatherForecast.forEach(function(element){
            var weatherIconSrc = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+element.ForecastIcon+".png";
            var weekdayString = element.week.substring(0,3);
            var dateString = element.forecastDate;
            var monthString = dateString.substring(4,6);
            if(monthString.charAt(0)=='0')
                monthString = monthString.substring(1,2);
            var dayString = dateString.substring(6,8);
            if(dayString.charAt(0)=='0')
                dayString = dayString.substring(1,2);
            var minTemp = element.forecastMintemp.value;
            var maxTemp = element.forecastMaxtemp.value;
            var minH = element.forecastMinrh.value;
            var maxH = element.forecastMaxrh.value;
            var dayBoxLine1String = weekdayString+" "+dayString+"/"+monthString;
            var dayBoxLine2String = weatherIconSrc;
            var dayBoxLine3String = minTemp+"-"+maxTemp+" °C";
            var dayBoxLine4String = minH+"-"+maxH+" %";

            var dayBox = document.createElement("div");
            dayBox.classList = ["day_box"];
            forecastRow1.appendChild(dayBox);
                var dayBoxLine1 = document.createElement("div");
                dayBoxLine1.classList = ["day_box_line"];
                var dayBoxLine1Text = document.createTextNode(dayBoxLine1String);
                dayBoxLine1.appendChild(dayBoxLine1Text);
                dayBox.appendChild(dayBoxLine1);
                var dayBoxLine2 = document.createElement("img");
                dayBoxLine2.classList = ["day_box_weather_icon"];
                dayBoxLine2.src = dayBoxLine2String;
                dayBox.appendChild(dayBoxLine2);
                var dayBoxLine3 = document.createElement("div");
                dayBoxLine3.classList = ["day_box_line"];
                var dayBoxLine3Text = document.createTextNode(dayBoxLine3String);
                dayBoxLine3.appendChild(dayBoxLine3Text);
                dayBox.appendChild(dayBoxLine3);
                var dayBoxLine4 = document.createElement("div");
                dayBoxLine4.classList = ["day_box_line"];
                var dayBoxLine4Text = document.createTextNode(dayBoxLine4String);
                dayBoxLine4.appendChild(dayBoxLine4Text);
                dayBox.appendChild(dayBoxLine4);

        });
    });
}
function warningBoxOnClick(){
    if(warningHidden)
        warningHidden = false;
    else
        warningHidden = true;
    var warningUl = document.getElementById("warning_ul") ;
    if(warningUl!=null)
        warningUl.hidden = warningHidden;
}
function getStationGPSLocation(stationData,stationName){
    var ans = {
        first: -9999,
        second: -9999,
    };
    stationData.forEach(function(element){
        if(stationName == element.station_name_en){
            ans = {
                first: element.latitude,
                second: element.longitude,
            };
        }
    });
    return ans;
}
function getAQHIGPSLocation(stationData,stationName){
    var ans = {
        first: -9999,
        second: -9999,
    };
    stationData.forEach(function(element){
        if(stationName == element.station){
            ans = {
                first: element.lat,
                second: element.lng,
            };
        }
    });
    return ans;
}
function toRadian(value){
    return value*Math.PI/180;
}
function geoDistance(lat1, lon1, lat2, lon2){
    const R = 6371;
    const x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    const y = (lat2-lat1);
    const d = Math.sqrt(x*x + y*y) * R;
    return d;
}
function geolocation(currentWeatherData) {
    function success(position) {
        var row1 = document.getElementById("mydata_block_row1");
        var row2 = document.getElementById("mydata_block_row2");
        var addressBox = document.getElementById("address_box");
        var district = document.getElementById("district") ;
        var districtString = "";
        var suburb = document.createElement("div");
        suburb.id = "suburb";
        var suburbText = document.createTextNode("");
        suburb.appendChild(suburbText);
        addressBox.appendChild(suburb);
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        district.innerHTML="Latitude: "+latitude+", Longitude: "+longitude;
        //console.log("latitude "+latitude);
        //console.log("longitude "+longitude);
        fetch('https://nominatim.openstreetmap.org/reverse?' + new URLSearchParams({
            format: 'json',
            lat: latitude,
            lon: longitude,
            zoom: 18,
            addressdetails: 1,
            'accept-language': 'en'
        })).then(function(res) {
            return res.json();
        }).then(function(locationData) {
            //console.log(locationData);
            if(locationData.hasOwnProperty('address')){
                if(locationData.address.hasOwnProperty('city_district')){
                    districtString=locationData.address.city_district
                }
                else if(locationData.address.hasOwnProperty('county')){
                    districtString=locationData.address.county
                }
                else{
                    districtString="Unknown";
                }
                district.innerHTML=districtString;
                if(locationData.address.hasOwnProperty('suburb')){
                    suburb.innerHTML=locationData.address.suburb;
                }
                else if(locationData.address.hasOwnProperty('borough')){
                    suburb.innerHTML=locationData.address.borough;
                }
                else if(locationData.address.hasOwnProperty('town')){
                    suburb.innerHTML=locationData.address.town;
                }
                else{
                    suburb.innerHTML="Unknown";
                }
                var findStationForRain = true;
                currentWeatherData.rainfall.data.forEach(function(element){
                    //console.log("districtString:"+districtString+" element.place:"+element.place);
                    var foundDistrict = false;
                    if(element.place==districtString){
                        foundDistrict = true;
                    }
                    else if(districtString.includes(element.place)||element.place.includes(districtString)){
                        foundDistrict = true;
                    }
                    else{
                        if(element.place.includes("Central")&&element.place.includes("Western")){
                            if(districtString.includes("Central")&&districtString.includes("Western")){
                                foundDistrict = true;
                            }
                        }
                    }
                    if(foundDistrict){
                        //console.log(element.place+"(districtRain)");
                        findStationForRain = false;
                        var rainfallBox = document.createElement("div");
                        rainfallBox.id = "closest_rainfall_box";
                        row2.appendChild(rainfallBox);
                            var rainfallIcon = document.createElement("img");
                            rainfallIcon.id = "closest_rainfall_icon";
                            rainfallIcon.src = "images/rain-48.png"
                            rainfallBox.appendChild(rainfallIcon);
                            var rainfallWord = document.createElement("div");
                            rainfallWord.id = "closest_rainfall_word";
                            var hongKongRainfall = element.max;
                            var rainfallWordText = document.createTextNode(hongKongRainfall);
                            rainfallWord.appendChild(rainfallWordText);
                            rainfallBox.appendChild(rainfallWord);
                            var rainfallSymbol = document.createElement("div");
                            rainfallSymbol.id = "closest_rainfall_symbol";
                            var rainfallSymbolText = document.createTextNode("mm");
                            rainfallSymbol.appendChild(rainfallSymbolText);
                            rainfallBox.appendChild(rainfallSymbol);
                    }
                });
                if(findStationForRain){
                    fetch('https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json').then(function(res) {
                        return res.json();
                    }).then(function(stationData) {
                        var shortestRainfallDistance = -1;
                        var shortestRainfallStation = "";
                        //console.log(currentWeatherData.rainfall.data);
                        currentWeatherData.rainfall.data.forEach(function(element){
                            var stationGPSLocation = getStationGPSLocation(stationData,element.place);
                            var stationLatitude = stationGPSLocation.first;
                            var stationLongitude = stationGPSLocation.second;
                            if(!(stationLatitude<-9000||stationLongitude<-9000)){
                                var distance = geoDistance(toRadian(latitude),toRadian(longitude),toRadian(stationLatitude),toRadian(stationLongitude));
                                if(shortestRainfallDistance<0||distance<shortestRainfallDistance){
                                    //console.log(element.place+", distance: "+distance);
                                    shortestRainfallDistance = distance;
                                    shortestRainfallStation = element.place;
                                }
                            }
                        });
                        if(shortestRainfallDistance>=0){
                            currentWeatherData.rainfall.data.forEach(function(element){
                                if(element.place==shortestRainfallStation){
                                    //console.log(shortestRainfallStation+", shortestRainDistance: "+shortestRainfallDistance);
                                    var rainfallBox = document.createElement("div");
                                    rainfallBox.id = "closest_rainfall_box";
                                    row2.appendChild(rainfallBox);
                                        var rainfallIcon = document.createElement("img");
                                        rainfallIcon.id = "closest_rainfall_icon";
                                        rainfallIcon.src = "images/rain-48.png"
                                        rainfallBox.appendChild(rainfallIcon);
                                        var rainfallWord = document.createElement("div");
                                        rainfallWord.id = "closest_rainfall_word";
                                        var hongKongRainfall = element.max;
                                        var rainfallWordText = document.createTextNode(hongKongRainfall);
                                        rainfallWord.appendChild(rainfallWordText);
                                        rainfallBox.appendChild(rainfallWord);
                                        var rainfallSymbol = document.createElement("div");
                                        rainfallSymbol.id = "closest_rainfall_symbol";
                                        var rainfallSymbolText = document.createTextNode("mm");
                                        rainfallSymbol.appendChild(rainfallSymbolText);
                                        rainfallBox.appendChild(rainfallSymbol);
                                }
                            });
                        }
                    });
                }
                fetch('https://raw.githubusercontent.com/jimmylee827/quickShareRaw/main/aqhi-station-info.json').then(function(res1) {
                    return res1.json();
                }).then(function(stationData) {
                    fetch('https://dashboard.data.gov.hk/api/aqhi-individual?format=json').then(function(res2) {
                        return res2.json();
                    }).then(function(aqhiData) {
                        //console.log(stationData);
                        var shortestAQHIDistance = -1;
                        var shortestAQHIStation = "";
                        aqhiData.forEach(function(element){
                            var stationGPSLocation = getAQHIGPSLocation(stationData,element.station);
                            var stationLatitude = stationGPSLocation.first;
                            var stationLongitude = stationGPSLocation.second;
                            if(!(stationLatitude<-9000||stationLongitude<-9000)){
                                var distance = geoDistance(toRadian(latitude),toRadian(longitude),toRadian(stationLatitude),toRadian(stationLongitude));
                                //console.log(element.station+", distance: "+distance);
                                if(shortestAQHIDistance<0||distance<shortestAQHIDistance){
                                    shortestAQHIDistance = distance;
                                    shortestAQHIStation = element.station;
                                }
                            }
                        });
                        if(shortestAQHIDistance>=0){
                            aqhiData.forEach(function(element){
                                if(element.station==shortestAQHIStation){
                                    var AQHIlevel = element.aqhi;
                                    var AQHIRisklevel = element.health_risk;
                                    var AQHIRisklevelLower = AQHIRisklevel.toLowerCase();
                                    //console.log(shortestAQHIStation+", shortestAQHIDistance: "+shortestAQHIDistance);
                                    var AQHIBox = document.createElement("div");
                                    AQHIBox.id = "closest_aqhi_box";
                                    row2.appendChild(AQHIBox);
                                        var AQHIIcon = document.createElement("img");
                                        AQHIIcon.id = "closest_AQHI_icon";
                                        AQHIIcon.src = "images/aqhi-low.png"
                                        if(AQHIRisklevelLower=="moderate")
                                            AQHIIcon.src = "images/aqhi-moderate.png";
                                        else if(AQHIRisklevelLower=="high")
                                            AQHIIcon.src = "images/aqhi-high.png";
                                        else if(AQHIRisklevelLower.includes("very"))
                                            AQHIIcon.src = "images/aqhi-very_high.png";
                                        else if(AQHIRisklevelLower=="serious")
                                            AQHIIcon.src = "images/aqhi-serious.png";
                                        AQHIBox.appendChild(AQHIIcon);
                                        var AQHISubBox = document.createElement("div");
                                        AQHISubBox.id = "closest_aqhi_box_subbox";
                                        AQHIBox.appendChild(AQHISubBox);
                                            var AQHIWord = document.createElement("div");
                                            AQHIWord.id = "closest_aqhi_word";
                                            var AQHIWordText = document.createTextNode(AQHIlevel);
                                            AQHIWord.appendChild(AQHIWordText);
                                            AQHISubBox.appendChild(AQHIWord);
                                            var AQHIRisk = document.createElement("div");
                                            AQHIRisk.id = "closest_aqhi_symbol";
                                            var AQHIRiskText = document.createTextNode(AQHIRisklevel);
                                            AQHIRisk.appendChild(AQHIRiskText);
                                            AQHISubBox.appendChild(AQHIRisk);
                                }
                            });
                        }
                    });
                });
            }
        });
        fetch('https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json').then(function(res) {
            return res.json();
        }).then(function(stationData) {
            //console.log(stationData);
            var shortestTemperatureDistance = -1;
            var shortestTemperatureStation = "";
            currentWeatherData.temperature.data.forEach(function(element){
                var stationGPSLocation = getStationGPSLocation(stationData,element.place);
                var stationLatitude = stationGPSLocation.first;
                var stationLongitude = stationGPSLocation.second;
                if(!(stationLatitude<-9000||stationLongitude<-9000)){
                    var distance = geoDistance(toRadian(latitude),toRadian(longitude),toRadian(stationLatitude),toRadian(stationLongitude));
                    //console.log(element.place+", distance: "+distance);
                    if(shortestTemperatureDistance<0||distance<shortestTemperatureDistance){
                        shortestTemperatureDistance = distance;
                        shortestTemperatureStation = element.place;
                    }
                }
            });
            if(shortestTemperatureDistance>=0){
                currentWeatherData.temperature.data.forEach(function(element){
                    if(element.place==shortestTemperatureStation){
                        //console.log(shortestTemperatureStation+", shortestTempDistance: "+shortestTemperatureDistance);
                        var temperatureBox = document.createElement("div");
                        temperatureBox.id = "closest_temperature_box";
                        row1.appendChild(temperatureBox);
                            var temperatureWord = document.createElement("div");
                            temperatureWord.id = "closest_temperature_word";
                            var hongKongTemperature = element.value;
                            var temperatureWordText = document.createTextNode(hongKongTemperature);
                            temperatureWord.appendChild(temperatureWordText);
                            temperatureBox.appendChild(temperatureWord);
                            var temperatureSymbol = document.createElement("div");
                            temperatureSymbol.id = "closest_temperature_symbol";
                            var temperatureSymbolText = document.createTextNode("°C");
                            temperatureSymbol.appendChild(temperatureSymbolText);
                            temperatureBox.appendChild(temperatureSymbol);
                    }
                });
            }
        });
    }
    function error() {
        var district = document.getElementById("district") ;
        district.innerHTML="Failed to get Location.";
    }
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else{
        error();
    }
}
var temperatures = null;
function temperatureListUpdate(currentWeatherData){
    temperatures = currentWeatherData.temperature.data.slice();
    temperatures.sort(function(first, second) {
        return first.place.localeCompare(second.place);
    });
    var row1 = document.getElementById("temperature_block_row1");
    var row2 = document.getElementById("temperature_block_row2");
    var row3 = document.getElementById("temperature_block_row3");
    var locationSelectList = document.getElementById("location_select_list");
    
    temperatures.forEach(function(element){
        var locationSelectOption = document.createElement("option");
        var locationSelectOptionText = document.createTextNode(element.place);
        locationSelectOption.appendChild(locationSelectOptionText);
        locationSelectList.appendChild(locationSelectOption);
    });
}
function locationSelectListOnChange(){
    var locationSelectList = document.getElementById("location_select_list");
    var listIndex  = locationSelectList.selectedIndex;
    var listValue = locationSelectList.options[listIndex].value
    var locationTemperatureWord = document.getElementById("location_select_temperature_word");
    var locationTemperatureSymbol = document.getElementById("location_select_temperature_symbol");
    if(listValue!="-"){
        if(temperatures!=null){
            temperatures.forEach(function(element){
                if(element.place==listValue){
                    //console.log("selectedListValue: "+listValue);
                    locationTemperatureWord.innerHTML=element.value;
                    locationTemperatureSymbol.innerHTML="°C";
                }
            });
        }
    }
    else{
        //console.log("Not selected");
        locationTemperatureWord.innerHTML="";
        locationTemperatureSymbol.innerHTML="";
    }
    return true;
}
