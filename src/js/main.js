// $('.menu-btn').on('click', function(e) {
//     e.preventDefault();
//     $('.menu').toggleClass('menu_active');
// })
var vm = new Vue({
    el: '#app',
    data: {
        isActive: false,
        isActivatus:false,
    },
    methods: {
        activate()
        {
            this.isActive = !this.isActive;
            if (this.isActive)
            {
                document.getElementById("mySidebar").style.width = "320px";
                document.getElementById("main").style.marginLeft = "1px";
            }

            else
            {
                document.getElementById("mySidebar").style.width = "0px";
                document.getElementById("main").style.marginLeft = "0px";
            }

        },
        activates()
        {
            this.isActivatus = !this.isActivatus;
            if (this.isActivatus)
            {
                document.getElementById("myShopings").style.width = "320px";
                document.getElementById("main__shoop").style.marginLeft = "1px";
            }

            else
            {
                document.getElementById("myShopings").style.width = "0px";
                document.getElementById("main__shoop").style.marginLeft = "0px";
            }

        }
    }

});
var vm = new Vue({
    el: '#app2',
    data: {
        isActive: false,
        isActivatus:false,
    },
    methods: {
        activate()
        {
            this.isActive = !this.isActive;
            if (this.isActive)
            {
                document.getElementById("mySidebar2").style.width = "320px";
                document.getElementById("main2").style.marginLeft = "1px";
            }

            else
            {
                document.getElementById("mySidebar2").style.width = "0px";
                document.getElementById("main2").style.marginLeft = "0px";
            }

        },
        activates()
        {
            this.isActivatus = !this.isActivatus;
            if (this.isActivatus)
            {
                document.getElementById("myShopings2").style.width = "320px";
                document.getElementById("main__shoop2").style.marginLeft = "1px";
            }

            else
            {
                document.getElementById("myShopings2").style.width = "0px";
                document.getElementById("main__shoop2").style.marginLeft = "0px";
            }

        }
    }

});