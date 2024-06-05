class Resize_page{
    constructor(func, ordre, go_to = 0, closure = false) {
        this.bool = true;
        this.func = func;
        this.activ_externe = true;
        this.passage = true;
        this.reactivate = closure;
        this.go_to = go_to;
        this.conversion(ordre);
        this.accept_go()
        this.start_resize();
    }

    accept_go() {
        if(this.go_to && ((this.go_to < this.px) == this.sup)) {
            console.error(` le resize ne peut pas finir par ${this.go_to}px`)
        }
    }

    conversion(s) {
        var e = s.split("-"),
            z = e[1].split(":");
        this.referentiel = this.get_referentiel(z[0]);
        this.px = z[1]*1;
        if(e[0] === "max") {
            this.sup = false;
        } else {
            this.sup = true;
        }
    }

    get_referentiel(r) {
        return r === "width" ? this.get_width : this.get_height;
    }

    get_width() {
        return window.innerWidth;
    }

    get_height() {
        return window.innerHeight;
    }

    e() {
        if(this.go_to) {
            return !((this.referentiel() > this.go_to) == this.sup); 
        } else {
            return true;
        }
        
    }

    start_resize() {
        if((this.sup && (this.referentiel() > this.px && this.bool)) || (!this.sup && (this.referentiel() <= this.px && this.bool))) {
            this.bool = !this.bool;
            this.func();
        }
        if(this.e() && ((this.sup && (this.referentiel() <= this.px && !this.bool)) || (!this.sup && (this.referentiel() > this.px && !this.bool)))) {
            this.bool = !this.bool;
            if(this.reactivate) {
                this.func();
                refresh_system();
            } 

        } 
    }
}
