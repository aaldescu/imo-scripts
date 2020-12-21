// ==UserScript==
// @name         Imobiliare-Ro-Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.imobiliare.ro/vanzare-apartamente/*
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
    // Identificare anunturi si incarcare in array
    var anunturi = document.getElementsByClassName("box-anunt");
    // Procesare fiecare anunt
    for (const anunt in anunturi) {
        if (!isNaN(parseInt(anunt))){
            var ad_id = anunturi[anunt].id
            //Add the SET action
            var caracteristiciOBJ = anunturi[anunt].getElementsByClassName("caracteristici");
            var caracteristiciUL= caracteristiciOBJ[0];
            if (caracteristiciUL !== undefined){
               var setLink = "<a href='javascript:anuntul_ro_set(\""+ad_id+"\")'> &otimes; </a>";
               var li = document.createElement("li");
               var span = document.createElement("span");
               span.innerHTML = setLink;
               li.appendChild(span);
               caracteristiciUL.appendChild(li);
               console.log(caracteristiciUL);
               //Change the opacity if found in list
               if (typeof json_obj[ad_id] !== 'undefined'){
                   var anuntHTMLobj = document.getElementById(ad_id);
                   anuntHTMLobj.style.opacity = 0.2;
               }
            }

        }
    }
})();
