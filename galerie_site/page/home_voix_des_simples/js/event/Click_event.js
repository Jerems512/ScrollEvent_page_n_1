/*                                Utilité

    Permet d'avoir une activation en étape lors du click sur un élément ou au hover
    peut aussi être interrompu pendant le processus



*//*                                DOCUMENTATION

Ex:

const menu_bar = clickEffect([
    [
        [()=>{                                                                   // param[i][0]
            docQuery(".parentHeader").style.backdropFilter = "blur(20px)";   
        }, 150],
        [()=>{                                                                   // param[i][1]
            docQuery(".parentHeader").style.backdropFilter = "blur(0px)";    
        }, 150]
    ], [
        [()=>{                                                                   // param[i][0]
            docQuery(".styleblock_1").style.opacity = "1";     
            doc("nav_accueil").style.opacity = "1";

        }],
        [()=>{                                                                   // param[i][1]
            docQuery(".styleblock_1").style.opacity = "0";     
            doc("nav_accueil").style.opacity = "0";

        }, 50]
    ]
])


*//*                                   Explication

    La variable menu_bar devient une closure:
        - Le premier appel active param[i][0]
        - Le second appel active param[i][1]

    Chaque tableau de param[i][x] possèdent 2 entités:
        - 1er : fonction fléché
        - 2ème : le nombre de ms avant activation de la prochaine étape

*/
/* 
let rappel_image_1;

function create_click_image(id) {
    return clickEffect([
        [
            [()=>{
                docQuery("body").style.overflow = "hidden";
                chemin_home("pause")
            }],
            [()=>{
                docQuery("body").style.overflow = "visible";
                chemin_home("play")
            }]
        ],[
            [()=>{
                rappel_id = doc(id).style.transform;
                doc(id).style.transform = "perspective(800px) translateY(-10%) translate3d(0px, 0px, 300px) scale(0.5)";
            }, 400],
            [()=>{
                doc(id).style.transform = rappel_id
            }]
        ],[
            [()=>{
                doc(id).style.transform = "perspective(800px) translate(50%,-10%) translate3d(0px, 0px, 300px) scale(0.5)";
    
            }],
            [()=>{
                
            }]
    
        ]
    ]);
}
 */
/* 
const image_1 = clickEffect([
    [
        [()=>{
            docQuery("body").style.overflow = "hidden";
            chemin_home("pause")
        }],
        [()=>{
            docQuery("body").style.overflow = "visible";
            chemin_home("play")
        }]
    ],[
        [()=>{
            rappel_image_1 = doc("image_1").style.transform;
            doc("image_1").style.transform = "perspective(800px) translateY(-10%) translate3d(0px, 0px, 300px) scale(0.5)";
        }, 400],
        [()=>{
            doc("image_1").style.transform = rappel_image_1;
        }]
    ],[
        [()=>{
            doc("image_1").style.transform = "perspective(800px) translate(50%,-10%) translate3d(0px, 0px, 300px) scale(0.5)";

        }],
        [()=>{
            
        }]

    ]
]);
 */