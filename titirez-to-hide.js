// ==UserScript==
// @name         Titirez-Ro-Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.titirez.ro/vanzari-apartamente-4-camere/*
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
        var anuntHTMLobj = document.querySelector("article[rel='"+adID+"']");
        anuntHTMLobj.style.opacity = 0.2;
    }

    var json_obj = JSON.parse(window.anuntul_ro_get(Url));
    // Identificare anunturi si incarcare in array
    var anunturi = document.getElementsByClassName("item-anunt");
    console.log(anunturi);
    // Procesare fiecare anunt
    for (const anunt in anunturi) {
        if (!isNaN(parseInt(anunt))){
            var ad_id = anunturi[anunt].getAttribute("rel")
            console.log(ad_id);
            //Add the SET action
            var iconDetailsOBJ = anunturi[anunt].getElementsByClassName("icon-details");
            var iconDetailsUL= iconDetailsOBJ[0];
            if (iconDetailsUL !== undefined){
               var setLink = "<a href='javascript:anuntul_ro_set(\""+ad_id+"\")'> &otimes; </a>";
               var li = document.createElement("li");
               var span = document.createElement("span");
               span.innerHTML = setLink;
               li.appendChild(span);
               iconDetailsUL.appendChild(li);
               console.log(iconDetailsUL);
               //Change the opacity if found in list
               if (typeof json_obj[ad_id] !== 'undefined'){
                   var anuntHTMLobj = document.querySelector("article[rel='"+ad_id+"']");
                   console.log(anuntHTMLobj)
                   //anuntHTMLobj.style.opacity = 0.2;
               }
            }

        }
    }
})();
