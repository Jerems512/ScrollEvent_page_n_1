/*                            Utilité

    Permet d'activer une fonction si elle ce trouve dans l'intervalle indiqué, 
    optionnellement on peut indiqué si on souhaite que la fonction soit
    ré-exécuté lorsqu'on sort de l'intervalle ( par défaut: true )


*//*                          DOCUMENTATION 

    EX :

        const min_width_700 = ()=>{
            // est exécuté entre 700 et + pixel de largeur de page

        },

        max_width_700 = ()=>{
            // est exécuté entre 0 et 700 pixel de largeur de page
        },

        way_header = chemin([...], 10); ( Ce referer à la doc de event.js)

        const phone = new Resize_page(max_width_700, "max-width: 700", false),
            computer = new Resize_page(min_width_700, "min-width: 700", false),
            accueil_computer_header = new Resize_page(way_header, "min-width: 700");

        function activeResize() { 
            phone.start_resize()
            computer.start_resize()
            accueil_computer_header.start_resize()
        }

        window.onresize = activeResize;


*//*                            Explication


    - 1er paramètre : Une fonction / closure
    - 2ème paramètre : Paramètre mediaquerie type attribut HTML
    - 3ème paramètre (défaut = true) : Réactiver la fonction lors
        de la sortie de l'intervalle



    min_width_700 et max_width_700 sont des fonction simples
    lors de la déclaration de new Resize_page() le 3ème paramètre 
    est sur False.


    way_header est une fonction utilisant une closure, lors de la sortie
    de l'intervalle on souhaitera ré-activer la fonction pour la
    désactiver ( chemin ).

    Lors de la déclaration de new Resize_page() le 3ème paramètre 
    est sur True(par défaut).


    Pour que la fenêtre observe le changement de taille
    on définit window.onresize et on lui attribut
    toute les instances de Resize_page (L 27-33)
    

*/