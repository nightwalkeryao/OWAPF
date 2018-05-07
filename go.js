//go.js for online admin finder tool by Huntr@inspiratesNG

function $id(elt){
    return document.getElementById(elt);
}
function xhandler(){
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Sorry, your web browser does not run XMLHTTPRequest object.");
    }
    return xhr;
}


var demarrer = $id("find");
demarrer.addEventListener("click", function(){
    var cible = $id("website").value;
    if(!/^https?:\/\/.+$/i.test(cible))
        cible = 'http://'+cible;
    var dCar = cible.substr(cible.length-1,1);
    if(dCar == '/')
        cible = cible.substr(0,cible.length-1);
    $id("website").value = cible;
    var bonnecible = (cible.length>=11 ? true : false);
    if($id("statut"))
        $id("statut").parentNode.removeChild($id("statut"));
    //if(xhr1)
        //xhr1.abort();
    var ndiv = document.createElement("div");
    ndiv.id = "statut";
    if(!bonnecible)
        ndiv.innerHTML = '<span style="color:red;">Please enter good URL<br></span>';
    else
        ndiv.innerHTML = ' <br><img src="loading.gif" id="gify"><br><span id="stext">Getting wordlists..</span><br>';
    ndiv.style.fontFamily = 'Courier,serif';
    $id("formulaire").appendChild(ndiv);
    
    //$id('gify').style.display = "none";
    var mots = null;
    
    var xhr1 = xhandler();
    if(xhr1 != null){
        xhr1.open("GET", "./wdlst.txt");
        xhr1.onreadystatechange = function(){
            if(xhr1.readyState == 4 && xhr1.status == 200){
                //alert(788);
                var xyz = xhr1.responseText;
                //xyz = xyz.replace(/[\s\t\r\n]/g,"*");
                mots = xyz;
                
                //alert(mots);
                var tltests = mots.split('|').length, succs = 0, echc=0, dilem = 0, reds = 0, tstd = 0, i=0;
                
                //registres
                var tsucces = [], techecs = [], tocheck = []; faits = [];
                
                $id('stext').innerHTML += '<br> '+tltests+' words found in 3 files.<br> Starting tests..<br>';
                $id('stext').innerHTML += '<span id="fraction"></span><br>';
                $id('fraction').innerHTML = 'Tested: '+tstd+'/'+tltests+' - Succes: '+succs+' - Failed: '+echc;
                
                var suffix = mots.split('|');
                $id('stext').innerHTML += '<br><br><table id="restable"><tr><th>URL</th><th>Status</th><th>Result</th></tr></table>';
                
                $id('restable').style.border = '0px';
                var intval = setInterval(function(){ //interval here!
                    if(i<tltests){
                        var ligne = cible+'/'+suffix[i];
                        var xhrs = xhandler();
                        //alert(ligne);
                        xhrs.open('GET', 'tst.php?cible='+encodeURIComponent(ligne));
                        xhrs.setRequestHeader('Access-Control-Allow-Origin','*');
                        xhrs.onreadystatechange = function(){
                        if(xhrs.readyState == 4 && xhrs.status == 200){
                            /*if(tstd>=tltests){
                                $id("gify").style.display = 'none';
                                $id("fraction").innerHTML += "<br><br> Job finished!";
                                clearInterval(intval);
                            }*/
                            var ntr = document.createElement("tr");
                            var rep = xhrs.responseText;
                            rep = JSON.parse(rep);
                            var nom = i;

                            faits.push(ligne);

                            if(rep.statut >= 200 && rep.statut<=206){
                                succs++;
                                tsucces.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:lime;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:lime;">tested</td><td  style="color:lime;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else if(rep.statut >= 300 && rep.statut<=307){
                                reds++;
                                tocheck.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:green;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:green;">tested</td><td  style="color:green;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else if(rep.statut>=500){
                                dilem++;
                                tocheck.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:blue;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:blue;">tested</td><td  style="color:blue;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else{
                                echc++;
                                techecs.push(ligne);
                                ntr.innerHTML = '<tr><td>'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td>tested</td><td>'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }
                            //}
                            tstd++;
                            $id('fraction').innerHTML = 'Tested: '+tstd+'/'+tltests+' - Succes: '+succs+' - Failed: '+echc+' - Redirected: '+reds+' - To Check: '+dilem;
                            $id('restable').appendChild(ntr);

                            if(nom>=tltests){
                                $id("gify").style.display = 'none';
                                $id("fraction").innerHTML += "<br><br> Job finished!";
                                clearInterval(intval);
                            }
                        }
                        };
                        xhrs.send(null);
                        //alert(typeof(xhrs[i]));
                        i++;
                    }

                }, 1000);

                //repasser
                var a = 0, secondTour = [], b = 5;
                do{
                    for(a=0; a<suffix.length; a++){
                        for(var b=0; b<faits.length; b++){
                            if(cible+'/'+suffix[a] != faits[b])
                                secondTour.push(suffix[a]);
                        }
                    }

                    var c = faits.length, d=0;
                    var intval = setInterval(function(){ //interval here!
                    if(d<c){
                        var ligne = faits[d];
                        var xhrs = xhandler();
                        //alert(ligne);
                        xhrs.open('GET', 'tst.php?cible='+encodeURIComponent(ligne));
                        xhrs.setRequestHeader('Access-Control-Allow-Origin','*');
                        xhrs.onreadystatechange = function(){
                        if(xhrs.readyState == 4 && xhrs.status == 200){

                            
                            var ntr = document.createElement("tr");
                            var rep = xhrs.responseText;
                            rep = JSON.parse(rep);
                            var nom = i;

                            faits.push(ligne);

                            if(rep.statut >= 200 && rep.statut<=206){
                                succs++;
                                tsucces.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:lime;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:lime;">tested</td><td  style="color:lime;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else if(rep.statut >= 300 && rep.statut<=307){
                                reds++;
                                tocheck.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:green;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:green;">tested</td><td  style="color:green;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else if(rep.statut>=500){
                                dilem++;
                                tocheck.push(ligne);
                                ntr.innerHTML = '<tr><td style="color:blue;">'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td style="color:blue;">tested</td><td  style="color:blue;">'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }else{
                                echc++;
                                techecs.push(ligne);
                                ntr.innerHTML = '<tr><td>'+nom+'/'+tltests+' <a href="'+ligne+'" class="ligne faireCR">'+ligne+'</a></td><td>tested</td><td>'+rep.statut+' - '+rep.xplic+'</td></tr>';
                            }
                            //}
                            tstd++;
                            $id('fraction').innerHTML = 'Tested: '+tstd+'/'+tltests+' - Succes: '+succs+' - Failed: '+echc+' - Redirected: '+reds+' - To Check: '+dilem;
                            $id('restable').appendChild(ntr);

                            if(nom>=tltests){
                                $id("gify").style.display = 'none';
                                $id("fraction").innerHTML += "<br><br> Job finished!";
                                clearInterval(intval);
                            }
                        }
                        };
                        xhrs.send(null);
                        //alert(typeof(xhrs[i]));
                        d++;
                        i++;
                    }
                }, 1000);
                    b--;
                }while(b>=0);
            }
        };
        xhr1.send(null);

    }else{
        $id("statut").innerHTML = "<span style='color:red'>Can not proceed to your request. Please change your web browser.</span>";
    }
    
}, false);

//alert(typeof(xhr1));
