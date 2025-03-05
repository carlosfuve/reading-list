<template>
    <div class="containerMainInfo">
        <div id="numDisp"> 
            <h1> {{ librosDisp.length }} libros disponibles</h1>
            <h3 v-if="numLectura > 0"> {{ numLectura }} en la lista de lectura</h3>
        </div>
        <div id="filtros"> 
            <h4> Filtro paginas </h4>
            <h4> Filtro genero </h4>
        </div>
        <div id="libros" v-for="(book, index) in librosDisp" :key="index"> 
            <h4>{{book.title}}</h4>
            <img :src=book.cover :alt="book.ISBN">
        </div>
    </div>
    <!-- AQUI PONER LA LISTA DE LECTURA-->
</template>

<script lang="ts">
import axios from 'axios'

export default{
    data() {
        return {
            librosDisp: [],
            numLectura: 0
        };
    },
    methods: {
        loadBooks(){
            axios.get('http://localhost:3000/books')
            .then( response => {  this.librosDisp = response.data; }
            ).catch(err => { console.log(err) })
        }
    },
    mounted() {
        this.loadBooks();
    },
};
</script>

<style lang="css" scoped>
.containerMainInfo{
    display: flex;
    flex-direction: column;
    width: 50vw; /* Ocupa el 70% de la pantalla */
    gap: 10px;
}
#numDisp {
    background-color: red;
}
#filtros{
    display: flex;
    flex-direction: row;
    gap: 30px;
    background-color: green;
}
#libros {
    background-color: blue;
    color: white;
}
</style>