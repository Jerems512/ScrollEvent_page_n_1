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

const DISTANCE = 1200, /*  */
    INTERVAL = 300, /* délai en px entre chaque apparition de card */
    DIAMETRE_DIRECTION = 40, /* diamètre du cercle de direction */
    PERSPECTIVE = 800, /* la différence de PERSPECTIVE et DISTANCE définit la distance de scroll */
    BASE_DIRECTION_Z = 100, /* translateZ() initial en px */
    AJOUT_DIRECTION_Z = 600, /* Ajout à BASE_DIRECTION_Z en f() de distance au centre plus proche plus haut  */
    MULTIPLICATEUR_RANDOM = 8,/* 8 */
    DURATION_OPACITY = 200,
    DISTANCE_INITIAL_MAX = 0.75,
    DISTANCE_INITIAL_MINI = 0.2,
    INTERVAL_APPARITION_INITIAL = DISTANCE_INITIAL_MAX - DISTANCE_INITIAL_MINI,
    ORDER_QUART = [3,0,1,2,3,0],
    ORDER_QUART2 = [7,0,1,2,3,4,5,6,7,0],
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
    ],
    ORDER2 = [
        {
            "x": DISTANCE_INITIAL_MINI, // DISTANCE_INITIAL_MINI
            "y": [-1] // [-1]
        },{
            "x": [1], // [1]
            "y": -DISTANCE_INITIAL_MINI // -DISTANCE_INITIAL_MINI
        },{
            "x": [1],
            "y": DISTANCE_INITIAL_MINI
        },{
            "x": DISTANCE_INITIAL_MINI,
            "y": [1]
        },{
            "x": -DISTANCE_INITIAL_MINI,
            "y": [1]
        },{
            "x": [-1],
            "y": DISTANCE_INITIAL_MINI
        },{
            "x": [-1],
            "y": -DISTANCE_INITIAL_MINI
        },{
            "x": -DISTANCE_INITIAL_MINI,
            "y": [-1]
        }
    ],
    SMOOTH_EFFECT_WAY = 10,
    OPAQUE = doc("fond_opaque");

let tab_image = [],
    tab_url_image = [],
    compteur = 0;

const element_description = {
    container: doc('content_description'),
    titre: doc("title"),
    titre_bottom: doc("title_after"),
    description_titre: doc("description_h3"),
    description_top: doc('barre_description'),
    description_p: doc("container_description"),
    description_bottom: doc('descri_after'),
    auteur_titre: doc("auteur"),
    auteur_nom: doc("auteur_nom"),
    auteur_bottom: doc("aut_after"),
    prix: doc("container_prix")
};
    



class Image {
    constructor(url) {
        this.id = ++compteur;
        this.distance = DISTANCE;
        this.interval = INTERVAL;
        this.url_img = url;
        this.id_image = `image_${this.id}`;

        /* 
        this.x_initial;
        this.y_initial;
        this.x;
        this.y;
        this.quart;
        
        */

        this.start()
        this.element = doc(this.id_image);
        this.e_description = docQuery(`#${this.id_image} .description`);
        this.content_img = docQuery(`#${this.id_image} .content_img`);
        this.nb_vh = this.calcul_nb_vw()
        this.decalage = this.calcul_decalage()/2;
        this.instance_click = this.create_click_image()
        this.add_click_image()
        this.tab_effet = [
            this.passage(),
            this.opaque()
        ];

    }

    calcul_decalage() {
        var container_width = clear_nb_string(getComputedStyle(element_description.container).width),
            img_width = clear_nb_string(getComputedStyle(this.content_img).width),
            body_width = clear_nb_string(getComputedStyle(docQuery("body")).width);

        return ((container_width + img_width)/2) / (body_width/100); /* retourne largeur en vw */

    }

    calcul_nb_vw() {
        var description = getComputedStyle(this.e_description).width,
            description_vw = clear_nb_string(description),
            screen_with = screen.availWidth;

        return description_vw / (screen_with / 100);
    }

    add_click_image() {
        this.content_img.addEventListener('click', ()=>{this.instance_click()})
    }

    delete_click_image() {
        this.content_img.removeEventListener('click', this.instance_click)
    }

    start() {
        this.initial()
        this.direction()
        this.create_component()
    }

    create_click_image() {
        return clickEffect([
            [
                [()=>{
                    docQuery("body").style.overflow = "hidden";
                    chemin_home("pause")

                    //this.content_img.insertBefore(document.adoptNode(element_description.container));
                    this.e_description.insertBefore(element_description.container, this.content_img)
                    element_description.container.style.display = "flex";

                }],
                [()=>{
                    docQuery("body").style.overflow = "visible";
                    chemin_home("play")

                    element_description.container.style.display = "none";

                }]
            ],[
                [()=>{
                    //console.log(this.decalage)
                    this.rappel_transform = this.element.style.transform;
                    this.rappel_opacity = this.element.style.opacity;

                    this.element.parentNode.style.zIndex = 2001;
                    OPAQUE.style.opacity = 1;
                    OPAQUE.style.pointerEvents = "all";

                    

                    this.element.style.transform = `scale(1)`;// translateX(-${this.calcul_nb_vw()}vw) translateX(100%)`; // perspective(800px) translate3d(0px, 0px, 300px) translateY(-10%)
                    this.element.style.opacity = 1;

                    element_description.container.style.opacity = "1";

                }, 250],
                [()=>{
                    this.content_img.style.transform = "translateX(-50%)";
                    this.element.style.transform = this.rappel_transform
                    this.element.style.opacity = this.rappel_opacity;
                    this.element.parentNode.style.zIndex = 1000 - this.id;
                    OPAQUE.style.opacity = 0;
                    OPAQUE.style.pointerEvents = "none";

                }]
            ],[
                [()=>{
                    element_description.container.style.transform = `translate(-100%) translateX(${this.decalage}vw) scaleX(1)`;
                    element_description.container.style.opacity = "1";
                    this.content_img.style.transform = `translateX(${this.decalage}vw)`;
                }, 250],
                [()=>{
                    element_description.container.style.transform = "translateX(-50%) scaleX(0.3)";
                    element_description.container.style.opacity = "0";
                }, 80]
            ],[
                [()=>{
                    element_description.titre.style.opacity = "1";
                    element_description.titre_bottom.style.transform = "scaleX(1)";
                }, 81],
                [()=>{
                    element_description.titre.style.opacity = "0";
                    element_description.titre_bottom.style.transform = "scaleX(0)";
                }, 80]
            ],[
                [()=>{
                    element_description.description_titre.style.opacity = "1";

                }, 81],
                [()=>{
                    element_description.description_titre.style.opacity = "0";
                }, 80]
            ],[
                [()=>{
                    element_description.description_top.style.transform = "scaleX(1)";

                }, 81],
                [()=>{
                    element_description.description_top.style.transform = "scaleX(0)";
                }, 80]
            ],[
                [()=>{
                    element_description.description_p.style.opacity = "1";

                }, 81],
                [()=>{
                    element_description.description_p.style.opacity = "0";
                }, 80]
            ],[
                [()=>{
                    element_description.description_bottom.style.transform = "scaleX(1)";

                }, 81],
                [()=>{
                    element_description.description_bottom.style.transform = "scaleX(0)";
                    element_description.container.style.opacity = "0";

                }, 80]
            ],[
                [()=>{
                    element_description.auteur_titre.style.opacity = "1";
                    element_description.auteur_nom.style.opacity = "1";
                    
                }, 81],
                [()=>{
                    element_description.auteur_titre.style.opacity = "0";
                    element_description.auteur_nom.style.opacity = "0";
                }, 80]
            ],[
                [()=>{
                    element_description.auteur_bottom.style.transform = "scaleX(1)";

                }, 81],
                [()=>{
                    element_description.auteur_bottom.style.transform = "scaleX(0)";
                }, 80]
            ],[
                [()=>{
                    element_description.prix.style.opacity = "1";

                }],
                [()=>{
                    element_description.prix.style.opacity = "0";
                }, 80]
            ]
        ]);
    }

    effet() {
        if(this.id > SMOOTH_EFFECT_WAY) {
            this.tab_effet.unshift(this.exist_element())
        }
        this.tab_effet.push(this.disappear_element())
        return this.tab_effet.flat();
    }

    disappear_element() {
        return scrStatique((this.id + SMOOTH_EFFECT_WAY-2)* INTERVAL, "disappear_image", [this.id_image])
    }

    exist_element() {
        return scrStatique((this.id - SMOOTH_EFFECT_WAY+2)* INTERVAL, "disappear_image", [this.id_image])
    }

    passage() {
        //console.log(this.x, this.y, this.x_initial, this.y_initial)
        return scrIntervalMulti(INTERVAL * (this.id), (INTERVAL * (this.id))+DISTANCE, [ 
            configMulti([this.id_image], "transform", [ 
                [this.x, "vw,", [`perspective(${PERSPECTIVE}px) translate3d(`,this.x_initial]], /* X */
                [this.y, "vh,", [this.y_initial]], /* Y */ 
                [this.ajout_z, "px) ", ["", -0]], /* Z */
                [1, ") ", ["scale(", 0.1]]
            ])
        ],  80)
    }
    
    opaque() {
        return scrInterval(INTERVAL * (this.id), (INTERVAL * (this.id)) + DURATION_OPACITY, [
            config([this.id_image],[
                ["opacity", 1, "", [0]]
            ])
        ], 80)
    }

    filter_tab(nb1, nb2) {
        var r = ORDER_QUART2.filter((e) => 
         e !== (nb1 - 1) &&
         e !== nb1 &&
         e !== (nb1 + 1) &&
         e !== (nb2 - 1) &&
         e !== nb2 &&
         e !== (nb2 + 1));
        return r;
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
        var random_x = Math.round(Math.random() * MULTIPLICATEUR_RANDOM),
            random_y = Math.round(Math.random() * MULTIPLICATEUR_RANDOM),
            choice = Math.round((Math.random() * (INTERVAL_APPARITION_INITIAL*100)))/100 + DISTANCE_INITIAL_MINI,
            x_initial,
            y_initial;

        //console.log(INTERVAL_APPARITION_INITIAL)

        if(Array.isArray(obj.x)) {
            x_initial = (obj.x[0] < 0 ? -1 : 1) * choice;
            y_initial = obj.y;
        } else {
            y_initial = (obj.y[0] < 0 ? -1 : 1) * choice;
            x_initial = obj.x;
        }

        x_initial = obj.x
        y_initial = obj.y


        //console.log(x_initial, y_initial)

        this.x_initial = random_x * x_initial;
        this.y_initial = random_y * y_initial;

        
    }

    initial() {
        var quart_1 = tab_image[0] ? tab_image[0].quart : -3, /* -3 car ce nombre n'est pas dans la liste */
            quart_2 = tab_image[1] ? tab_image[1].quart : -3,
            possibility = this.clear_tab(this.filter_tab(quart_1, quart_2)),
            choice = possibility[Math.floor(Math.random()* possibility.length)];


        this.quart = choice;
        this.modify_coord(ORDER2[choice])
        console.log(possibility)
        //console.log(choice)
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

        this.ajout_z = AJOUT_DIRECTION_Z - (rayon_max_x + rayon_max_y);


        this.x = (DIAMETRE_DIRECTION - rayon_max_x) * r_neg(this.x_initial)
        this.y = (DIAMETRE_DIRECTION - rayon_max_y) * r_neg(this.y_initial) // (25 - rayon_max_y + 25)
        console.log(`
this.x : ${this.x},
this.y : ${this.y},

initial:
this.x_initial : ${this.x_initial}
this.y_initial : ${this.y_initial}

var: 
- x : ${rayon_max_x}
- y : ${rayon_max_y}
        `)
        
    }

    
    create_component() {
        var container_component = document.getElementById("container_component");
        container_component.insertAdjacentHTML("beforeend", this.text_component());
        this.modify_position();
    }

    modify_position() {
        this.image = document.getElementById(this.id_image)
        this.image.style.transform = `perspective(${PERSPECTIVE}px) translate3d(${this.x_initial}vw, ${this.y_initial}vh, ${BASE_DIRECTION_Z + this.ajout_z}px))`;
        this.image.parentElement.style.zIndex = `${1000 - this.id}`;
    }

    
/* 
    text_component() {
        var hidden = this.id > SMOOTH_EFFECT_WAY ? "disappear_image" : "";
        return `
            <div class="container_image">
                <div id="${this.id_image}" class="image ${hidden}">
                    <section class="description">

                        <article class="content_description">

                            <h2 class="title effet_opacity">
                                Titre Photo
                                <div class="title_after effet_scaleX"></div>
                            </h2>
                            <div class="descri">
                                <h3 class="description_h3 effet_opacity">Description</h3>
                                <div class="barre_description effet_scaleX"></div>
                                <p class="container_description effet_opacity">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ipsum iusto distinctio unde! Assumenda vitae doloribus ullam ea quaerat necessitatibus similique, exercitationem harum qui hic earum labore voluptas molestias magnam?</p>
                                <div class="descri_after effet_scaleX"></div>
                            </div>
                            <div class="aut">
                                <h3 class="auteur effet_opacity">Auteur</h3>
                                <p class="auteur_nom effet_opacity">Lorem Ipsum</p>
                                <div class="aut_after effet_scaleX"></div>
                            </div>
                            <div class="container_prix effet_opacity">
                                <h3 class="price">Prix</h3>
                                <p>300.00€</p>
                            </div>
                    
                        </article>

                        <aside class="content_img">
                            <img src="${this.url_img}" loading="lazy" alt="">   
                        </aside>
                    
                        <div class="image_hover">
                        </div>
                    </section>

                </div>
            </div>
        `; //<img src="${this.url_img}" alt="">
    }
 */

    text_component() {
        var hidden = this.id > SMOOTH_EFFECT_WAY ? "disappear_image" : "";
        return `
            <div class="container_image">
                <div id="${this.id_image}" class="image ${hidden}">
                    <section class="description">


                        <aside class="content_img">
                            <img src="${this.url_img}" loading="lazy" alt="">   
                        </aside>
                    
                        <div class="image_hover">
                        </div>
                    </section>

                </div>
            </div>
        `; //<img src="${this.url_img}" alt="">
    }




    
    
}

function clear_nb_string(s) {
    return s.slice(0, s.length - 2)*1;
}


function rayon_max(nb) {
    if(nb < 0) {
        return nb * -1;
    } return nb;
}

function r_neg(nb) {
    if(nb < 0) return -1
    return 1
}


function insertion(tab) {
    var tab_for_way = [],
        new_image;
    for(var i = 0; i < tab.length; i++) {
        new_image = new Image(tab[i])
        tab_image.unshift(new_image);
        tab_for_way.push(new_image.effet())
        
    }


    ////console.log(tab_for_way.flat())
    
    return chemin(tab_for_way.flat(), SMOOTH_EFFECT_WAY)
}

function add_tab_image(tab_string) {
    var tab = tab_string.split(".png ");
    tab.forEach(e => tab_url_image.push(`${e}.png`))
    //console.log(tab_url_image)
}

add_tab_image("design/picture/liber' nez.png design/picture/Mes jours de Lune.png design/picture/Pause_Tété.png design/picture/Plénitude au sommet.png design/picture/Refuge du roupillon.png design/picture/tisane_détox.png design/picture/Tisane_du_centenaire.png design/picture/Chat Chatouille.png design/picture/Douce Naviguation.png design/picture/Gambette légère")

var chemin_home = insertion(tab_url_image);
chemin_home();



doc("image_1").click()








