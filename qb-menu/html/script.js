let buttonParams = [];
var data = null

const openMenu = (data = null) => {
    let html = "";
    data.forEach((item, index) => {
        if(!item.hidden) {
            let header = item.header;
            let message = item.txt || item.text;
            let isMenuHeader = item.isMenuHeader;
            let isDisabled = item.disabled;
            let icon = item.icon;
            html += getButtonRender(header, message, index, isMenuHeader, isDisabled, icon);
            if (item.params) buttonParams[index] = item.params;
        }
    });



    data = data
    $(".echomenuallbuttons").html(html);
    $(".echomenucon").css('display', 'block');
    $(".echomenucon").animate({ right: "3vh",}, 120, function() {});
    // $('.parlgrm').css('display', 'block');


    $('.echoonemenu').click(function() {
        const target = $(this)
        if (!target.hasClass('title') && !target.hasClass('disabled')) {
            postData(target.attr('id'));
        }
    });

    $(".echoonemenu").mouseover(function() {
        buttonid = $(this).attr('id')
        gtaclickaudio();
        // $(this).animate({ 'height' : "5vh",}, 50, function() {});
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line2 > .echopart2line2into').css('transition-delay', "0.1s");
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line1 > .echopart2line1into').css('transition-delay', "0s");

        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line1 > .echopart2line1into').css('height', "100%");
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line2 > .echopart2line2into').css('width', "100%");
        // $('#'+buttonid+' > .echomenubuttondesc').animate({ 'opacity' : "1"}, 100, function() {});
    });

    $(document).on('click', '#close-btn', function () {
    cancelMenu();
    });
    

    $(".echoonemenu").mouseout(function() {
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line2 > .echopart2line2into').css('transition-delay', "0s");
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line1 > .echopart2line1into').css('transition-delay', "0.1s");
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line1 > .echopart2line1into').css('height', "0%");
        $('#'+buttonid+' > .echoonemenupart2 > .echopart2line2 > .echopart2line2into').css('width', "0%");
      });

};

const getButtonRender = (header, message = null, id, isMenuHeader, isDisabled, icon) => {
        if(isMenuHeader){
            // if(message && message.length > 0 && message.length < 25){
            //     menutitle = message
            //     headertextx = 'header'
            // }else if(header && header.length > 0 && header.length < 25){
            //     menutitle = header
            //     headertextx = 'message'
            // }else{
                menutitle = 'Actions menu'
                headertextx = 'noway'
            // }

            if(message){
                headertext = message;
            }else if(header){
                headertext = header;
            }else{
                if(message){
                    headertext = message;
                }else if(header){
                    headertext = header;
                }else{
                    headertext = 'No Header Text';
                }
            }

            if(icon){
                icon = icon
            }else{
                icon = 'fas fa-dog'
            }
            // if(menutitle){
            //     if(menutitle.length > 12){
            //         $('.echomenuheadertext').css('font-size', '1.0vh');
            //     }else if(menutitle.length > 16){
            //         $('.echomenuheadertext').css('font-size', '0.8vh');
            //     }else{
            //         $('.echomenuheadertext').css('font-size', '1.25vh');
            //     }
            //     $('.echomenuheadertext').html(menutitle);
            // }else{
                $('.echomenuheadertext').html('Actions menu');
                $('.echomenuheadertext').css('font-size', '1.25vh');
            // }
            return `<div class="${isMenuHeader ? "echomenutitle" : "echoonemenu"} ${isDisabled ? "disabled" : ""} ${isMenuHeader ? "echomenutitledesc" : ""}" id="${id}">
            ${headertext ? `<div class="echomenubuttondesc ${isMenuHeader ? "echomenutitledesctexting" : ""}">${headertext}</div>` : ""}
            </div>`;
        }else{
            if(icon){
                if(icon !== 'NON')
                icon = icon
            }else{
                icon = 'fas fa-dog'
            }

            return`<div id="${id}" class="${isMenuHeader ? "echomenutitle" : "echoonemenu"} ${isDisabled ? "disabled" : ""}">
                <div class="echoonemenupart1">
                    <div class="echopart1icon noselect"><img src=nui://${icon} width=30px onerror="this.onerror=null; this.remove();"> <i class="${icon}" onerror="this.onerror=null; this.remove();"></i></div>
                    <div class="echopart1title noselect">${header}</div>
                </div>
                <div class="echoonemenupart2">
                ${message ? `<div class="echopart2line1"><div class="echopart2line1into"></div></div>
                <div class="echopart2line2"><div class="echopart2line2into"></div></div>
                    <div class="noselect echopart2text ${isMenuHeader ? "echomenutitledesctexting" : ""}">${message}</div>` : ""}
                </div>
            </div>`;
        }
};

const closeMenu = () => {
    $(".echomenucon") .animate({ right: "-40vh",}, 3, function() {
        $(".echomenucon").css('display', 'none');
        $(".echomenuallbuttons").html("");
      });
    buttonParams = [];
};

const postData = (id) => {
    $.post(`https://${GetParentResourceName()}/clickedButton`, JSON.stringify(parseInt(id) + 1));
    return closeMenu();
};

const cancelMenu = () => {
    $.post(`https://${GetParentResourceName()}/closeMenu`);
    return closeMenu();
};



window.addEventListener("message", (event) => {
    const data = event.data;
    const buttons = data.data;
    const action = data.action;
    switch (action) {
        case "OPEN_MENU":
        case "SHOW_HEADER":
            return openMenu(buttons);
        case "CLOSE_MENU":
            return closeMenu();
        default:
            return;
    }
});

document.onkeyup = function (event) {
    const charCode = event.key;
    if (charCode == "Escape") {
        cancelMenu();
    }
};

$(document).on('click', '#closes', function (e) {
    cancelMenu();
});


$(document).on('click', '#search', function (e) {
    if($('.echomenupositive').css('height') == '23.75px'){
        $( ".echomenuallbuttons" ).animate({
            'max-height': "95%"
        }, 120, function() {});

        $( ".echomenupositive" ).animate({
            'height': "0px"
        }, 120, function() {});
    }else{
        $( ".echomenuallbuttons" ).animate({
            'max-height': "90%"
        }, 120, function() {});

        $( ".echomenupositive" ).animate({
            'height': "23.75px"
        }, 120, function() {});

    }
});


// function echoSearch() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("echomenusearchinpurt");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("buttons");
//     if(){

//     }

//   }

$(document).ready(function(){
    $("#echomenusearchinpurt").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".echomenuallbuttons .echoonemenu").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

gtaclickaudio = function () {
    var audio = document.getElementById("audio");
    audio.volume = 0.2;
}

