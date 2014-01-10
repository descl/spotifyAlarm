require([
    '$api/models'
], function(models) {
    'use strict';

    var startMusic = function() {
        models.player.play();
    }


    var ConvertDateFromDiv = function (divTimeStr) {
        //eg:-divTimeStr=18/03/2013 12:53:00
        divTimeStr = divTimeStr.replace(/-/g,"/").replace(/T/g," ")
        var tmstr = divTimeStr.toString().split(' '); //'21-01-2013 PM 3:20:24'
        var dt = tmstr[0].split('/');
        var str = dt[2] + "/" + dt[0] + "/" + dt[1] + " " + tmstr[1]; //+ " " + tmstr[1]//'2013/01/20 3:20:24 pm'
        var time = new Date(str);
        if (time == "Invalid Date") {
            time = new Date(divTimeStr);
        }
        return time;
    }



    var checkPlay = function() {
        var curDate=new Date();
        var alarmdate = new Date(Date.parse(ConvertDateFromDiv($("#wakeup").val())));



        var difference = alarmdate.getTime() - curDate.getTime();

        if(difference < 0) {
            startMusic();

            var tomorowB= new Date();
            tomorowB.setDate(tomorowB.getDate()+1);
            setDateInput(tomorowB);
        }
        $("#countdown").html(difference)
    }

    var setDateInput = function(d){
        console.log(d);
        var stringDate = d.getFullYear()+"-"+d.getMonth()+1+"-"+("0" + d.getDate()).slice(-2)+"T"+("0" + d.getHours()).slice(-2)+":"+("0" + d.getMinutes()).slice(-2)+":"+("0" + d.getSeconds()).slice(-2);
        console.log(stringDate)
        $("#wakeup").val(stringDate);
    }



    setInterval(function(){checkPlay()},1000);

    var tomorow= new Date();
    tomorow.setDate(tomorow.getDate()+1);
    setDateInput(tomorow);


});