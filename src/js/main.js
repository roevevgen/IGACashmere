
var sourceOfTruth = {
    shop:'Your cart is emptyTime to start shopping!',
    href1:'/catalog',
    links1: 'Catalog',
    href2:'/about',
    links2: 'About',
    href3:'/blog',
    links3: 'Blog',
    href4:'/jobs',
    links4: 'Jobs',
    href5:'/top',
    links5: 'Top',
    href6:'subscribe',
    links6: 'Subscribe',
    isActive: false,
    isActivatus: false,};

var vmA = new Vue({
    el: '#app',
    data: sourceOfTruth,
    methods: {
        activate() {
            this.isActive = !this.isActive;
            if (this.isActive) {
                document.getElementById("mySidebar").style.width = "320px";
                document.getElementById("main").style.marginLeft = "1px";
            } else {
                document.getElementById("mySidebar").style.width = "0px";
                document.getElementById("main").style.marginLeft = "0px";
            }

        },
        activates() {
            this.isActivatus = !this.isActivatus;
            if (this.isActivatus) {
                document.getElementById("myShopings").style.width = "320px";
                document.getElementById("main__shoop").style.marginLeft = "1px";
            } else {
                document.getElementById("myShopings").style.width = "0px";
                document.getElementById("main__shoop").style.marginLeft = "0px";
            }

        }
    }


});
var vmB = new Vue({
    el: '#app2',
    data: sourceOfTruth,
    methods: {
        activate() {
            this.isActive = !this.isActive;
            if (this.isActive) {
                document.getElementById("mySidebar2").style.width = "320px";
                document.getElementById("main2").style.marginLeft = "1px";
            } else {
                document.getElementById("mySidebar2").style.width = "0px";
                document.getElementById("main2").style.marginLeft = "0px";
            }

        },
        activates() {
            this.isActivatus = !this.isActivatus;
            if (this.isActivatus) {
                document.getElementById("myShopings2").style.width = "320px";
                document.getElementById("main__shoop2").style.marginLeft = "1px";
            } else {
                document.getElementById("myShopings2").style.width = "0px";
                document.getElementById("main__shoop2").style.marginLeft = "0px";
            }

        }
    }

});