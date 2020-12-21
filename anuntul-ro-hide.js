// ==UserScript==
// @name         Anuntul-Ro-Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ascunde anunturile neinteresante in urma apasarii butonului de anunt neinteresant.
// @author       Andrei
// @match        https://www.anuntul.ro/anunturi-imobiliare-vanzari/apartamente-4-camere/*
// @match        https://www.anuntul.ro/anunturi-imobiliare-vanzari/apartamente-3-camere/*
// @match        https://www.anuntul.ro/anunturi-imobiliare-vanzari/case-vile/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var Url = "https://andreialdescu.com/_p/imo-hide/?get"
    var setUrl = "https://andreialdescu.com/_p/imo-hide/?set="
    window.anuntul_ro_get = function(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);
        return Httpreq.responseText;
    };

    window.anuntul_ro_set = function(adID){
        //execute set command
        window.anuntul_ro_get(setUrl+adID)
        // execute hide logic
        var anuntHTMLobj = document.getElementById(adID);
        anuntHTMLobj.style.opacity = 0.2;
    }

    var json_obj = JSON.parse(window.anuntul_ro_get(Url));
    console.log(json_obj);

    var anunturi = document.getElementsByClassName("anunt-w");
    for (const anunt in anunturi) {
        if (!isNaN(parseInt(anunt))){
            var ad_id = anunturi[anunt].id
            //Add the SET action
            var loc_data = anunturi[anunt].getElementsByClassName("loc-data");
            var setLinkContent = loc_data[0].innerHTML
            var setLink = setLinkContent+"<a href='javascript:anuntul_ro_set(\""+ad_id+"\")'> &otimes; </a>";
            loc_data[0].innerHTML = setLink;

            //Change the opacity if found in list
            if (typeof json_obj[ad_id] !== 'undefined'){
                var anuntHTMLobj = document.getElementById(ad_id);
                anuntHTMLobj.style.opacity = 0.2;
            }

        }
    }
})();
