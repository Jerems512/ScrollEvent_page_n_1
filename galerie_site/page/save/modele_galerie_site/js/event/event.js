/*                              DOCUMENTATION


    EX :


    const var_0 = chemin([ 
        scrInterval(700,  1000,  [ 
            config(["enfant2_left"], [ 
                ["transform", -120, "%)", ["translateX(", -50]]
            ]), 
            config(["enfant2_right"], [ 
                ["transform", 20, "%)", ["translateX(", -50]]
            ])
        ],  80)
    ],  17, "main_scroll_event"); 

    chemin([ 
        scrIntervalMulti(0,  700,  [ 
            configMulti(["mid_left", "ball_mid_right"], "transform", [ 
                [50, "%)", ["translateY(", -50]]
            ]), 
            configMulti(["mid_right", "ball_mid_left"], "transform", [ 
                [-50, "%)", ["translateY(", 50]]
            ])
        ],  80), 

        scrIntervalMulti(200,  500,  [ 
            configMulti(["ball_left", "ball_mid_left", "ball_mid_right", "ball_right"], "background", [ 
                [255, ",", ["rgb(", 38]], 
                [255, ",", ["", 70]], 
                [255, ")", ["", 83]]
            ])
        ],  80), 

        scrStatiqueFunction(600, var_0), 

        scrStatique(680, "parent2_deca", ["parent2"]), 

        scrInterval(800,  1300,  [ 
            config(["enfant2_left", "enfant2_right"], [ 
                ["background", 83, ")", ["rgb(38, 70, ", 255]]
            ])
        ],  80), 

        scrIntervalMulti(1100,  1500,  [ 
            configMulti(["parent3"], "transform", [ 
                [50, "%)", ["translateX(", 0]], 
                [180, "deg)", ["rotate(", 0]]
            ])
        ],  80)
    ],  17, "main_scroll_event")(); 

*/


/*                              EXPLICATION

    chemin (L 7-18) :
        - 1er appel : activation
        - 2ème appel : désactivation

        - 1er paramètre : tableau contenant les effets
        - 2ème paramètre : nombre d'effet activé en même temps
        - 3ème paramètre (optionnel*) : contenant du scroll
            *par défaut : body


        > Effets:

            > scrInterval:

                - 1er paramètre : Appel de début
                - 2ème paramètre : Appel de fin
                - 3ème paramètre : Tableau des configs
                - 4ème paramètre : Délais d'actualisation de l'effet

                > config:
                    - 1er valeur : Tableau contenant les id des éléments
                    - 2ème valeur : Tableau des styles

                    > style:
                        - 1er valeur : Propriété CSS
                        - 2ème valeur : Valeur souhaité
                        - 3ème valeur : String après la valeur
                        - 4ème valeur (optionnel) : Tableau des facultatifs:
                            
                        > option:
                            - 1er valeur : String avant la valeur
                            - 2ème valeur : Valeur initial

        ----------------------------------------------------------------------------------------

            > scrIntervalMulti:

                - 1er paramètre : Appel de début
                - 2ème paramètre : Appel de fin
                - 3ème paramètre : Tableau des configs
                - 4ème paramètre : Délais d'actualisation de l'effet

                > config:
                    - 1er valeur : Tableau contenant les id des éléments
                    - 2ème valeur : Propriété CSS
                    - 3ème valeur : Tableau des styles

                    > style:
                        - 1ère valeur : Valeur souhaité
                        - 2ème valeur : String après la valeur
                        - 3ème valeur (optionnel) : Tableau des facultatifs:
                            
                        > option:
                            - 1er valeur : String avant la valeur
                            - 2ème valeur : Valeur initial

        ----------------------------------------------------------------------------------------

            > scrStatique:

                - 1er paramètre : Appel
                - 2ème paramètre : Chaîne de caractère contenant les classes
                - 3ème paramètre : Tableau contenant les id des éléments
                - 4ème parametre (optionnel) : Delai d'activation de l'effet


        ----------------------------------------------------------------------------------------

            > scrStatiqueFunction:

                - 1er paramètre : Appel
                - 2ème paramètre : Variable contenant un chemin ( ou une fonction type closure )

*/

const DISTANCE = 1200,
    INTERVAL = 120,
    ORDER_QUART = [3,0,1,2,3,0],
    ORDER = [
        {
            "x": -1,
            "y": -1
        },{
            "x": 1,
            "y": -1
        },{
            "x": 1,
            "y": 1
        },{
            "x": -1,
            "y": 1
        },
    ]

let tab_image = [];

class Image {
    constructor() {
        this.id = ++compteur;
        this.distance = DISTANCE;
        this.interval = INTERVAL;

        /* 
        this.x_initial;
        this.y_initial;
        this.x;
        this.y;
        this.quart;
        
        */

        this.start()
    }

    start() {
        this.initial()
        this.direction()
    }

    effet() {
        return [
            this.passage(),
            this.opaque()
        ]
    }

    passage() {
        return scrIntervalMulti(INTERVAL * (this.id), (INTERVAL * (this.id))+DISTANCE, [ 
            configMulti([`image_${this.id}`], "transform", [ 
                [this.x, "vw,", ["perspective(600px) translate3d(",this.x_initial]], /* X */
                [this.y, "vh,", [this.y_initial]], /* Y */ /* r1()*ins(bool_passage) -> this.x_initial */
                [400 + this.ajout_z, "px) ", ["", -0]], /* Z */
                [1, ") ", ["scale(", 0.1]]
            ])
        ],  80)
    }
    
    opaque() {
        return scrInterval(INTERVAL * (this.id), (INTERVAL * (this.id))+100, [
            config([`image_${this.id}`],[
                ["opacity", 1, "", [0]]
            ])
        ], 80)
    }

    filter_tab(nb1, nb2 = 0) {
        return ORDER_QUART.filter(e => e !== nb1 && e !== nb2)
    }

    clear_tab(tab) {
        return tab.filter((x, i) => tab.indexOf(x) === i)
    }

    calcul_quart() {
        if(this.x < 0) {
            if(this.y < 0) {
                return 1;
            }
            return 4;
        } else if(this.y < 0) {
            return 2;
        }
        return 3;
    }

    modify_coord(obj) {
        var random_x = Math.round(Math.random()*5),
            random_y = Math.round(Math.random()*5);

        this.x_initial = random_x * obj.x;
        this.y_initial = random_y * obj.y;

        
    }

    initial() {
        var quart_1 = tab_image[0] ? tab_image[0].quart : 4,
            quart_2 = tab_image[1] ? tab_image[1].quart : 4,
            possibility = this.clear_tab(this.filter_tab(quart_1, quart_2)),
            choice = possibility[Math.floor(Math.random()* possibility.length)];
/*             
            console.log(`
                quart 1 : ${quart_1}
                quart 2 : ${quart_2}
                possibilité : [${possibility.toString()}]
                choix : ${choice}
            `)
 */

        this.quart = choice;
        this.modify_coord(ORDER[choice])
        console.log(`
            choisi :
                x : ${this.x_initial}
                y : ${this.y_initial}
                quart : ${this.quart}
        `)    
    
    }
    
    direction() {
        var rayon_max_x = rayon_max(this.x_initial),
            rayon_max_y = rayon_max(this.y_initial);

        this.ajout_z = 100 - (rayon_max_x + rayon_max_y);


        this.x = (50 - rayon_max_x) * r_neg(this.x_initial)
        this.y = (50 - rayon_max_y) * r_neg(this.y_initial) // (25 - rayon_max_y + 25)
        
    }
    
    
}

var compteur = 0,
    historique = [{
        "x": 0,
        "y": 0
    }]
    historique = {
        "x": 0,
        "y": 0
    },
    r1 = ()=>{return Math.round(Math.random()*50)+50},
    r2 = ()=>{return Math.round(Math.random()*10)};


function rayon_max(nb) {
    if(nb < 0) {
        return nb * -1;
    } return nb;
}

function r_neg(nb) {
    if(nb < 0) return -1
    return 1
}


function insertion(nb) {
    var tab_for_way = [],
        new_image;
    for(var i = 0; i < nb; i++) {
        new_image = new Image()
        tab_image.unshift(new_image);
        tab_for_way.push(new_image.effet())
        
    }


    console.log(tab_for_way.flat())
    
    return chemin(tab_for_way.flat(), 10)
}

insertion(9)()

/* 
chemin([

    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque(),
    passage(),
    opaque()

], 10)()
 */











