var product = new Vue({
	el: '#sale',
  data: {
    selectedData:{
      id: 0,
      name: "",
      pic: "",
      price :""
    },
    qty: 1,
    size: "1",
    req: "",
    pack: "normal",
    total: 0,
    visibility: "no",
    showenKarten: "no",


    variants: [
      {
        id:1,
        name:"Sonderkraftfahrzeug 234/2 Puma",
        pic:"assets/list1.webp",
        price:100000,
      },

      {
        id:2,
        name:"Homyped",
        pic:"assets/list2.webp",
        price:200000,
      },

      {
        id:3,
        name:"Nike",
        pic:"assets/list3.webp",
        price:300000,
      },

      {
        id:4,
        name:"Adidas",
        pic: "assets/testi2.jpeg",
        price: 400000,
      },

    ],
    kart: [],
  },

  methods: {
    showModal(id) {
      this.changeVariant(id);
      this.visibility = "yes"
    },

    hideModal() {
      this.visibility = "no";
      this.qty = 1;
    },

    showCart() {
      this.showenKarten = "yes"
      this.calculate();
    },

    hideCart() {
      this.showenKarten = "no";
    },

    changeVariant(id) {
      var res = this.variants.find(element => id === element.id);

      this.selectedData.id = res.id;
      this.selectedData.name = res.name;
      this.selectedData.pic = res.pic;
      this.selectedData.price = res.price;

    },
    qtyAdd(){
      if (this.qty < 99) {
        this.qty = parseInt(this.qty) + 1;
      }
    },
    qtySub(){
      if (this.qty > 1) {
        this.qty = parseInt(this.qty) - 1;
      }
    },
    calculate(){
      for (let o = 0; o < this.kart.length; o++ ) {
        this.total += this.kart[o].price;
      }
    },
    addToCart(){

      for (let i = 0; i < this.kart.length; i++) {
        if(this.selectedData.id === this.kart[i].id){
            this.kart[i].qty += parseInt(this.qty);
            this.hideModal();
            return;
         }
        }

        this.kart.push({
          id: this.selectedData.id,
          name: this.selectedData.name,
          pic: this.selectedData.pic,
          qty: this.qty,
          price: this.selectedData.price * this.qty,
          size: this.size,
          req: this.req,
          pack: this.pack
        });
        
      this.hideModal();

    },
    deleteKart(index){
      this.kart.splice(index, 1);
    },
    buyNow() {
      window.location.href = "https://wa.me/6285920027156?text=Hallo%2C%20Saya%20ingin%20memesan%20%0Asepatu%20" 
                              + this.selectedData.name + "%0Adengan jumlah%20" + this.qty + "%2e%0A%0ATerimakasih."
    },
    buyCart() {
      var message = "https://wa.me/6285920027156?text=Hallo%2C%20Saya%20ingin%20memesan%20sepatu%20";

      for(i = 0; i < this.kart.length; i++){
        message = message + "%0AProduk : " + this.kart[i].name  + " Ukuran : " + this.kart[i].size + " Jumlah : " + this.kart[i].qty;
      }

      window.location.href = message;
    }
  }
})