/* EventListener.js */

/* 
function eId(id) { return document.getElementById(id); }
function eQuery(selecteur) { return document.querySelector(selecteur); }
function recuperer(string) { 
    switch(string) {
        case "id" : return eId;
        case "query" : return eQuery;
        default: 
            console.log('nop : ' + string);
    }
}
function choiceType(typeEvent) {
    switch(typeEvent) {
        case "hover" : return ["mouseenter", "mouseleave"];
        default : console.log("type d'évènement non enregistré");
    }
}

function activateEvent(e, fonction, typeEvent) {
    e.addEventListener(typeEvent[0], fonction);
    e.addEventListener(typeEvent[1], fonction);
}

function takeElement(e, typeE = "query") {
    return recuperer(typeE)(e);
}

function styleDone(tabDataEffect) { 
    var tabEffect = a();
    function a() {
        var b = []
        for(var i = 0; i < tabDataEffect.length; i++) {
            var r = tabDataEffect[i];
            b.push([takeElement(r[0], r[2]), r[1]]);
        }
        return b;
    }

    return ()=>{
        for( var b = 0; b < tabEffect.length; b++) {
            tabEffect[b][0].classList.toggle(tabEffect[b][1]);
            tabEffect[b][0].classList.toggle(tabEffect[b][1]+"2");
        }
    }
}

 */
var t, tabScroll = [], intervalActivationListener = 60; /* 11 */
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function runAntici(idEffect, idChemin) {
    var effet = tabChemin[idChemin].tabScroll[idEffect];
    if(effet.content) {
        if(effet.activate) {
            effet.content.addEventListener('scroll', effet.anticip, false);
        } else {
            effet.content.removeEventListener('scroll', effet.anticip, false);
        }    
    } else {
        if(effet.activate) {
            window.addEventListener('scroll', effet.anticip, false);
        } else {
            window.removeEventListener('scroll', effet.anticip, false);
        }    
    }
}

class ScrollEvent {
    constructor(timeCall) {
        this.timeCall = timeCall; 
        this.bo = true;
        this.activate = false;
        this.pause = false;
        this.idChemin;
        this.anticip = ()=>{this.anticipation()};
        
    }


    conteneur() {
        if(this.content) {
            this.content.addEventListener('scroll',()=>{this.anticipation()}, false);
        } else {
            window.addEventListener('scroll',()=>{this.anticipation()}, false);
        }
    }

    condi() {
        return this.bo === (t > this.timeCall);
    }

    run(bool) { 
        if(!bool) {            
            this.activate = true;
            runAntici(this.id, this.idChemin);
        } else {
            this.activate = false;
            runAntici(this.id, this.idChemin);
        }
    }

    anticipation() {
        if(this.activate) {
            t = this.scrollContent();
            if(this.condi()) {
                this.bo = !this.bo;
                this.c();
                this.runEvent();
            }    
        }
    }

    idAddNb(nb) {
        return this.id + nb;
    }

    c() { 
        var EmIal = this.idAddNb(-(tabChemin[this.idChemin].intervalActivationListener)), EpIal = this.idAddNb(tabChemin[this.idChemin].intervalActivationListener);
        this.addRemFunc2(EpIal, this.bo);
        this.addRemFunc2(EmIal, !this.bo);    
    
    } 

    addRemFunc2(eId, bool) {
        if(tabChemin[this.idChemin].tabScroll[eId]) { tabChemin[this.idChemin].tabScroll[eId].run(bool); }
    }
    
}



class Interval extends ScrollEvent {
    constructor(timeCall, proTimeCall, sensActivation, timeForCall, functionOnInterval, endFunctionOnInterval) {
        super(timeCall);
        this.timeCall = timeCall;
        this.sensActivation = sensActivation;
        this.timeForCall = timeForCall;
        this.afterId = proTimeCall;
        this.s = this.sensActivation ? [this.timeCall, this.afterId] : [this.afterId, this.timeCall]; 
        this.x = this.s[0];
        this.y = this.s[1];
        this.size = this.y - this.x;
        this.pct = (this.size) / 100;
        this.functionOnInterval = functionOnInterval ? functionOnInterval : ()=>{ return this.functionInterval((t-this.x) / this.pct);};
        this.endFunctionOnInterval = endFunctionOnInterval ? endFunctionOnInterval : ()=>{this.functionInterval(t > this.y ? (this.size / this.pct /*  etat secondaire */) : 0);}   
    }

    player(s) {
        switch(s) {
            case 'play':
                this.pause = false;
                this.funcTimeCall();
                break;
            case 'pause':
                this.pause = true;
                break
            default:
                console.log("Error player command")
        }
    }


    runEvent() {
        if(this.bo != this.sensActivation) {
            this.funcTimeCall();
        }
    }

    funcTimeCall() {
        if(t <= this.y && t > this.x) {
            if(!this.pause) {
                window.requestAnimationFrame(this.functionOnInterval);
                setTimeout(()=>{this.funcTimeCall()}, this.timeForCall);    
            }
        } else {
            window.requestAnimationFrame(this.endFunctionOnInterval);
        }
        
    }
}

class IntervalMulti extends Interval {
    constructor(timeCall, proTimeCall, sensActivation, tabIndicationValeur, timeForCall) {
        super(timeCall, proTimeCall, sensActivation, timeForCall);
        this.tabIndicationValeur = tabIndicationValeur;
    }

    functionInterval(r) {
        for(var i = 0; i < this.tabIndicationValeur.length; i++) {
            var retourStyle = "";
            for(var b = 0; b < this.tabIndicationValeur[i][2].length; b++) {
                retourStyle += this.tabIndicationValeur[i][4][b][0] + (this.tabIndicationValeur[i][2][b] * r + this.tabIndicationValeur[i][4][b][1]) + this.tabIndicationValeur[i][3][b];
            }
            for(var a = 0; a < this.tabIndicationValeur[i][0].length; a++) {
                document.getElementById(this.tabIndicationValeur[i][0][a]).style[this.tabIndicationValeur[i][1]] = retourStyle;
            } 
        }
    }
}


class IntervalStatic extends Interval {
    constructor(timeCall, proTimeCall, sensActivation, tabIndication, timeForCall, functionOnInterval, endFunctionOnInterval) {
        super(timeCall, proTimeCall, sensActivation, timeForCall, functionOnInterval, endFunctionOnInterval);
        this.tabIndication = tabIndication;
    }

    functionInterval(r) { 
        for(var a = 0; a < this.tabIndication.length; a++) {
            var choiceConfigArray = this.tabIndication[a],
                tabElement = choiceConfigArray[0],
                tabStyle = choiceConfigArray[1],
                tabValue = choiceConfigArray[2],
                tabMesure = choiceConfigArray[3],
                tabfacultatif = choiceConfigArray[4];


            for(var c = 0; c < tabElement.length; c++) {
                var e = document.getElementById(tabElement[c]);
                for(var i = 0;i < tabStyle.length; i++) {
                    var prop = tabStyle[i],
                        valueTot = tabValue[i] * r,
                        tabfacultatifString = tabfacultatif[i][0],
                        tabfacultatifNumber = tabfacultatif[i][1];
                    e.style[prop] = tabfacultatifString + (tabfacultatifNumber + valueTot) + tabMesure[i];
                }
            }
        }
    }
}


class Statique extends ScrollEvent {
    constructor(timeCall, scrEvent, idElement, timeForCall = [0, 0]) {
        super(timeCall);
        this.timeCall = timeCall;
        this.scrEvent = scrEvent.split(" "); 
        this.el = idElement;
        this.timeForCall = ()=>{return (this.bo ? (timeForCall[1] ? timeForCall[1] : 0) : timeForCall[0]);};
    }

    runEvent() {
        this.eventClass();
    }

eventClass() {
        const b1 = ()=>{
            for(var i = 0; i < this.el.length; i++) {
                var c = document.getElementById(this.el[i]);
                for(var b = 0; b < this.scrEvent.length; b++) {
                    c.classList.toggle(this.scrEvent[b]);
                }
            }
        }
        setTimeout(()=>{window.requestAnimationFrame(b1)}, this.timeForCall()); // les classes doivent être sous le format [classEventScroll2] - [classEventScroll]
    }

}

class StatiqueFunction extends ScrollEvent{
    constructor(timeCall, eventStatiqueFunction) {
        super(timeCall),
        this.timeCall = timeCall,
        this.eventStatiqueFunction = eventStatiqueFunction; // cette variable sera une closure qui par appel ressortira le bon éléments ( tout est calculé dans la closure )
    }
    runEvent() {
        this.eventStatiqueFunction();
    }
}

/* configScroll.js */



var tabChemin = [];
var idChemin = 0;

class Chemin {
    constructor(tabEffect, intervalActivationListener = 11, contenu) {
        this.intervalActivationListener = intervalActivationListener;
        this.tabEffect = tabEffect;
        this.tabScroll = [];
        this.id = idChemin++;
        this.contenu = contenu;
        this.start();
    } 

    start() {
        this.modificationContenu();
        this.organisation();
    }

    modificationContenu() {
        if(this.contenu) {
            this.funcContenu = ()=>{return this.contenu.scrollTop};
        } else {
            this.funcContenu = ()=>{return window.scrollY};
        }
    }

    organisation() {
        this.tabEffect.flat().map(x => this.fit(x));
    }

    fit(nba, i = 0) {

        if(this.tabScroll[i]) {
            if(nba.timeCall > this.tabScroll[i].timeCall) {
                this.fit(nba, ++i);
            } else {
                this.tabScroll.splice(i, 0, nba);
            }
        } else {
            this.tabScroll.push(nba);
        }
    }

    player(s) { /* play / pause */
        for(var i = 0; i < this.tabScroll.length; i++) {
            if(this.tabScroll[i].player) this.tabScroll[i].player(s)
        }
    }

    runProgramme() {
        for (let i = 0; i < this.tabScroll.length; i++) {
            this.tabScroll[i].id = i;
            this.tabScroll[i].idChemin = this.id;
            this.tabScroll[i].scrollContent = this.funcContenu;
            this.tabScroll[i].content = this.contenu;            

        }
        var runBoucle = Math.min(this.intervalActivationListener, this.tabScroll.length);
        for(var b = 0; b < runBoucle; b++) {
            this.tabScroll[b].run(false);
        } 
        console.log(tabChemin);
    }
}

function chemin(tab, intervalActivationListener, contenu) {
    var chemin = new Chemin(tab, intervalActivationListener, contenu);
    tabChemin.push(chemin);
    var activate = true,
        idWay = chemin.id;

    return (bool = "true")=>{
        switch(bool) {
            case "true":
                if(activate) {
                    chemin.runProgramme();
                } else {
        
                    var tab = chemin.tabScroll;
                    for(var i = 0; i < tab.length; i++) {
                        tab[i].run(true);
                    }
                
                }
                activate = !activate;
                break;
            case "false" :
                return activate;
            case "play": 
                chemin.player(bool);
                break;
            case "pause": 
                chemin.player(bool);
                console.log("En "+bool)
                break
            default:
                console.log("commande non reconnue");
        }
    }

}


function config(e, tab) {
    if (!e) {
        return [];
    }
    var r = [];
    r.push(e);
    for (let i = 0; i < 5; i++) {
        r.push([]);
    }
    for(var a = 0; a < tab.length; a++) {    
            r[1].push(tab[a][0]);
            var tabR = tab[a][3] ? tab[a][3][1] ? [tab[a][3][0], tab[a][3][1]] : typeof tab[a][3][0] === "string" ? [tab[a][3][0], 0] : ["", tab[a][3][0]] : ["", 0];
            r[2].push((tab[a][1] - (tabR[1])) / 100);
            r[3].push(tab[a][2]);
            r[4].push(tabR);
    }
    return r;
}

function configMulti(e, prop, tab) {
    if (!e || !prop) {
        return [];
    }
    var r = [];
    r.push(e, prop);
    for (let i = 0; i < 3; i++) {
        r.push([]);
    }
    for(var a = 0; a < tab.length; a++) {
        var tabR = tab[a][2] ? tab[a][2][1] ? [tab[a][2][0], tab[a][2][1]] :  typeof tab[a][2][0] === "string" ? [tab[a][2][0], 0] : ["", tab[a][2][0]] : ["", 0];
        r[2].push((tab[a][0] - (tabR[1])) / 100);
        r[3].push(tab[a][1]);
        r[4].push(tabR);
    }
    return r;
}

function scrStatique(nbB, listClass, listId, timeForCall) {
    var obj = new Statique(
        nbB, 
        listClass,
        listId, 
        timeForCall
    )    
    return obj;
}

function scrInterval(nbB, nbH, tabConfig, timeForCall) {
    var nbB = nbB, nbH = nbH, timeForCall = timeForCall ? timeForCall : 300;
    function fitRun(bool) {
        var obj = new IntervalStatic(
            nbB,
            nbH,
            bool,
            tabConfig,
            timeForCall
        )
        nbB = obj.y;
        nbH = obj.x;
        return obj;
    }

    return [fitRun(true) ,fitRun(false)];
}

function scrIntervalMulti(nbB, nbH, tabConfig, timeForCall) {
    var nbB = nbB, nbH = nbH, timeForCall = timeForCall ? timeForCall : 300;
    function fitRun(bool) {
        var obj = new IntervalMulti(
            nbB,
            nbH,
            bool,
            tabConfig,
            timeForCall
        )
        nbB = obj.y;
        nbH = obj.x;
        return obj;

    }

    return [fitRun(true), fitRun(false)];
}


function scrStatiqueFunction(nbB, fonction) {
    var obj = new StatiqueFunction(Math.round(nbB), fonction); // format number  
    return obj;

}

