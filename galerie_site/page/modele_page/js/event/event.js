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
