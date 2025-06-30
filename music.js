    var on = false;

    function play_audio() {
        if(!on){
             $(".my_audio").trigger('play');
             $(".musicbutton")[0].innerHTML = "Stop Music";
        }else {
             $(".my_audio").trigger('pause');
             $(".my_audio").prop("currentTime",0);
             $(".musicbutton")[0].innerHTML = "Play Music";
        }
        on=!on;
    }