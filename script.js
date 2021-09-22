Vue.createApp({
    data() {
        return {
            inputCity: "",
            citiesArr: [
                'Abay',
                'Ayteke Bi',
                'Aktau',
                'Aktobe',
                'Almaty',
                'Almatau',
                'Atyrau',
                'Aitei',
                'Almaly',
                'Almarasan',
                'Arkalyk',
                'Atbasar',
                'Beyneu',
                'Yesik',
                'Zhana Turmis',
                'Zhanaozen',
                'Zharkent',
                'Zhezkazgan',
                'Zhetisay',
                'Kandiagash',
                'Karaganda',
                'Kaskelen',
                'Kentau',
                'Kokshetau',
                'Kostanay',
                'Kyzylorda',
                'Nur - Sultan',
                'Pavlodar',
                'Petropavlovsk',
                'Rudnyiy',
                'Saryagash',
                'Satpayev',
                'Semey',
                'Taldykorgan',
                'Taraz',
                'Temirtau',
                'Turkestan',
                'Uzynagash',
                'Uralsk',
                'Ust-Kamenogorsk',
                'Hromtau',
                'Shymkent',
                'Shahtinsk',
                'Shiel',
                'Shimkent',
                'Ekibastuz'
            ],
            citiesArrSmall: [],
            pickUp: [],
            courier: [],
            post: []
        }
    },
    methods: {
        findCity(inputStr) {
            inputStr=inputStr.toLowerCase().replace(/\s/g, "");
            if (inputStr === "") {
                preventDefault();
            } else if (inputStr === 'almaty' || inputStr === 'aktau' || inputStr === 'nur-sultan') {
                this.addOrRemoveWarning(2);
                this.searchCity(inputStr.toLowerCase());
            } else {
                console.log("No such city or cannot deliver");
                this.addOrRemoveWarning(1);
                this.searchCity(inputStr.toLowerCase());
            }
        },
        addOrRemoveWarning(i) {
            let errorClass = document.querySelector("#error");
            let btnEnter = document.querySelector("#btn-enter");
            let btnClear = document.querySelector("#btn-clear");
            if (i === 1) {
                errorClass.classList.remove("hidden");
                btnEnter.classList.add("hidden");
                btnClear.classList.remove("hidden");
                btnClear.style.backgroundImage = "url(\"images/exit.png\"), linear-gradient(279.56deg, #FF4757 15.15%, rgba(255, 255, 255, 0) 171.55%)";
            } else if (i === 2) {
                errorClass.classList.add("hidden");
                btnEnter.classList.add("hidden");
                btnClear.classList.remove("hidden");
                btnClear.style.backgroundImage = "url(\"images/exit.png\"), linear-gradient(279.56deg, #65B3E4 15.15%, rgba(255, 255, 255, 0) 171.55%)";
            } else if (i === 3) {
                errorClass.classList.add("hidden");
                btnClear.classList.add("hidden");
                btnEnter.classList.remove("hidden");
                btnClear.style.backgroundImage = "url(\"images/exit.png\"), linear-gradient(279.56deg, #FF4757 15.15%, rgba(255, 255, 255, 0) 171.55%)";
                this.suggests();
                if (this.inputCity === "") {
                    this.noList();
                }
            }
        },
        noList() {
            let input = document.querySelector("#input-city");
            let list = document.querySelector("#list");
            input.style.borderRadius ="50px";
            input.style.borderBottom ="1px solid #E9F0EB";
            list.classList.add("hidden");
        },
        textAdded(e) {
            let char = String.fromCharCode(e.keyCode).toLowerCase();
            if (!(/^[A-Za-z0-9]+$/.test(char))) {
                e.preventDefault();
                return
            }
            let input = document.querySelector("#input-city");
            let list = document.querySelector("#list");
            input.style.borderRadius ="31px 31px 0 0";
            input.style.borderBottom ="0";
            list.style.borderTop ="0";
            input.style.boxShadow ="0";
            list.classList.remove("hidden");
            this.suggests();
            if (this.citiesArrSmall.length === 0) {
                input.style.borderRadius ="50px";
                input.style.borderBottom ="1px solid #E9F0EB";
                list.classList.add("hidden");
            }
        },
        suggests() {
            let len=this.inputCity.length;
            let counter = 0;
            this.citiesArrSmall = [];
            for (let str of this.citiesArr) {
                if (str.substr(0,len).toLowerCase() === this.inputCity) {
                    this.citiesArrSmall.push(str);
                    counter++;
                }
                if (counter === 4) {
                    break
                }
            }
        },
        clearCity() {
            this.inputCity = "";
            this.addOrRemoveWarning(3);
            this.noDel();
        },
        addCity(cityStr) {
            this.inputCity = cityStr;
            this.findCity(this.inputCity)
        },
        choseDel(info) {
            console.log(info);
            this.pickUp = [info[0].available, info[0].price, info[0].type]
            this.courier = [info[1].available, info[1].price, info[1].type]
            this.post = [info[2].available, info[2].price, info[2].type]
            console.log(this.pickUp, this.courier, this.post);

            let imgVag = document.querySelector("#img-vag");
            let typeBtn = document.querySelector("#type-btn");
            imgVag.classList.add("hidden");
            typeBtn.classList.remove("hidden");
            for (i = 0;i < 3;i++) {
                this.available(info[i].available, info[i].type);
            }
        },
        available(someBool, delType) {
            if (someBool === false) {
                let delivery = document.querySelector(`#${delType}`);
                let availability = document.querySelector(`#${delType}-availability`);
                delivery.classList.add("op-50");
                availability.classList.remove("op-0");
            } else {
                let delivery = document.querySelector(`#${delType}`);
                let availability = document.querySelector(`#${delType}-availability`);
                delivery.classList.remove("op-50");
                availability.classList.add("op-0");
            }
        },
        noDel() {
            let imgVag = document.querySelector("#img-vag");
            let typeBtn = document.querySelector("#type-btn");
            imgVag.classList.remove("hidden");
            typeBtn.classList.add("hidden");
        },
        choosenDel(del) {
            let choosen = document.querySelector(`#${del}`);
            let v = document.querySelector(`#v-${del}`);

            let pickup = document.querySelector(`#pickup`);
            let v_pickup = document.querySelector(`#v-pickup`);
            let avail_pickup = this.pickUp[0];

            let courier = document.querySelector(`#courier`);
            let v_courier = document.querySelector(`#v-courier`);
            let avail_courier = this.courier[0];

            let post = document.querySelector(`#post`);
            let v_post = document.querySelector(`#v-post`);
            let avail_post = this.post[0];
            
            pickup.classList.remove("filter");
            v_pickup.classList.add("hidden");
            courier.classList.remove("filter");
            v_courier.classList.add("hidden");
            post.classList.remove("filter");
            v_post.classList.add("hidden");

            if (avail_pickup === false && del === this.pickUp[2]) {
                return
            }

            if (avail_courier === false && del === this.courier[2]) {
                return
            }

            if (avail_post === false && del === this.post[2]) {
                return
            }

            choosen.classList.add("filter");
            v.classList.remove("hidden");
        },
        async searchCity(city) {
            const response = await fetch(`https://qvjgl.mocklab.io/delivery/check?search=${city}`);
            if (response.status === 200) {
                const data = await response.json();
                this.choseDel(data);
            } else {
                console.log(`Error ${response.status} ${response.statusText}`);
                this.noDel();
            }
        }
    }
}).mount('#container');