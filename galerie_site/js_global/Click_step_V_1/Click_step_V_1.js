function doc(s) {
    return document.getElementById(s);
}

function docQuery(s) {
    return document.querySelector(s);
}

//var funcForEffect = [[[funcActivation, delayBeforeOtherEffect], [funcDesactivation, delayBeforeOtherEffect]],[[funcActivation, delayBeforeOtherEffect], [funcDesactivation, delayBeforeOtherEffect]]],
function clickEffect(tabFunc){
    var bool = false,
        changeBool = true,
        additionBool = true,
        etatActuelle = -1,
        activate = true;

    function avance() {
        additionBool = bool === changeBool;
        if(additionBool) etatActuelle += d(bool);
        changeBool = bool;
        if(etatActuelle >= 0 && etatActuelle < tabFunc.length) {
            activate = false;
            if(bool) {
                tabFunc[etatActuelle][0][0]();
                setTimeout(()=>{avance()}, tabFunc[etatActuelle][0][1]);
            } else {
                tabFunc[etatActuelle][1][0]();
                setTimeout(()=>{avance()}, tabFunc[etatActuelle][1][1]);
            }
        } else if(etatActuelle < 0 || etatActuelle >= tabFunc.length) {
            activate = true;
            if(etatActuelle < 0) etatActuelle = 0;
            if(etatActuelle >= tabFunc.length) etatActuelle = (tabFunc.length)-1;
        }
    }

    return(b = true)=>{
        if(b) {
            bool = !bool;
            if(activate) avance();    
        } else {
            return bool; /* si false : effet non cliqué / si true : effet cliqué */
        }
    }
};

function d(b) {
    return b ? 1 : -1;
}