const app = new Vue({
    el: '#app',
    data: {
        suma: 0,
        costo: 0,
        /*items: [
            { id: 0, nombre: 'Cama', metros: 1, cantidad: 3 },
            { id: 1, nombre: 'Escritorio', metros: 1, cantidad: 8 },
            { id: 2, nombre: 'Heladera', metros: 2, cantidad: 2 },
            { id: 3, nombre: 'Computadora', metros: 1, cantidad: 2}
            ],*/
            items: [],
            dato: '',
            mts: '',
            cant: '',
            baulera: '',
            mensaje: '',
            m1: 'te recomiendo',
            data: [
                'Cama',
                'Escritorio',
                'Heladera',
                'Cocina',
                'Computadora',
                'Sillon',
                'Televisor',
                'Radio',
                'Mesa',
                'Sillas',
                'Bicicleta',
                'Auto'
            ],
            name: '',
            selected: null,
            columns: [
                {
                    field: 'nombre',
                    label: 'Nombre'
                },
                {
                    field: 'cantidad',
                    label: 'Cantidad'
                },
                {
                    field: 'metros',
                    label: 'Tamaño'
                }           
            ]
        },
    computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }},
    methods: {
        total: function() {
            this.suma = this.items.reduce((acc, item) => acc + (item.cantidad * item.metros), 0);
            this.costo = this.suma * 3;
            this.seleccionar();
            this.alertCustom();
        },
        alertCustom() {
            this.$buefy.dialog.confirm({
                title: 'Seleción de baulera',
                message: 'Se estima una superficie total de <b>' + this.suma + ' metros cuadrados</b> para los items que usted ha seleccionado.<br>Se recomienda utilizar una baulera de <b>' + this.baulera + ' metros cuadrados</b>.<br>El costo por metro cuadrado es de <b>3 U$S</b>, estimando un costo total de <b>' + this.costo + ' U$S (dólares estadounidenses)</b> mensuales, que podrá ser abonado con los medios de pago que se detallan en el pie de la página.',
                cancelText: 'Modificar',
                confirmText: 'Aceptar',
                type: 'is-success',
                onConfirm: () => this.$buefy.toast.open('Baulera seleccionada')
            })
        },
        agregaritem: function(){ //Defino funcion para agregar items
            this.items.push({
                nombre: this.name,
                metros: this.mts,
                cantidad: this.cant
            });
            localStorage.setItem('info', JSON.stringify(this.items));
            this.dato = ''; //Elimino lo que tiene el cuadro de texto luego de presionar el boton
            this.success();
        },
        eliminar: function(index){
            this.items.splice(index,1);
            localStorage.setItem('info', JSON.stringify(this.items));
        },
        success() {
            this.$buefy.toast.open({
                message: 'Item agregado a la lista!',
        })},
        agregarcama: function(){
            this.name = 'Cama',
            this.mts = '2'
            /*this.items.push({
                nombre: 'Cama',
                metros: '2',
                cantidad: '1'
            })*/
        },
        seleccionar: function(){
            if (this.suma < 11){
              this.baulera = 10
            }
            else if (this.suma < 16){
              this.baulera = 15
            }
            else if (this.suma < 22) {
              this.baulera = 21
            }
            else {
              this.baulera = 0
            }
        }
    },
    created: function(){
        let datosDB = JSON.parse(localStorage.getItem('info'));
        if (datosDB === null){
            this.items = [];
        }
        else {
            this.items = datosDB;
        }
    }
    }
)