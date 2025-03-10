<template>
    <div class="containerMainInfo">

        <h1 class="book-disp" style="background-color: red;"> {{ librosDisp.length }} libros disponibles</h1>
        <h3 v-if="librosLectura.length > 0" style="background-color: red;"> {{ librosLectura.length }} en la lista de lectura</h3>

        <div class="filtros">
            <label class="filtro-label">
                Filtrar por páginas:
                <input type="number" v-model="numPages" @change="filterPages">
            </label>
            <label class="filtro-label">
                Filtrar por género: 
                <select id="genres" v-model="selectedGenre" @change="filterGenre">
                    <option :value="'All'">Todos</option>
                    <option v-for="genre in genres" :value="genre">{{ genre }}</option>
                </select>
            </label>
        </div>

        <section class="libros">
            <article v-for="book in genreDisp" :key="book.ISBN" class="art-libro">
                <!-- AÑADIR BOTON PARA CAMBIAR A LA LISTA DE LECTURAS-->
                <div style="display: flex; flex-direction: row; gap:10px; margin-bottom: 3px;">
                    <h4>{{ book.title }}</h4>
                    <button>+</button>
                </div>
                <img style="width: 100px;" :src="book.cover" :alt="book.ISBN">
            </article>
        </section>
    </div>


    <div class="lista-lectura">
        LISTA DE LECTURA
     </div>
</template>

<script lang="ts">
import axios from 'axios'
import type IBook from '@/interfaces/IBook';
import {loadData, allGenres} from '@/utils/loadBooks';

export default{
    data() {
        return {
            librosDisp: [] as IBook[],
            genreDisp: [] as IBook[],
            librosLectura: [] as IBook[],
            genres: [] as string[],
            selectedGenre: 'All' as string,
            numPages: 0 as number

        };
    },
    methods: {
        loadBooks(){
            /*
            axios.get('http://localhost:3000/books')
            .then( response => {  this.librosDisp = response.data; }
            ).catch(err => { console.log(err) })
            */

           loadData().then( response => {  this.librosDisp = response;
            this.genreDisp = response;
           })
           allGenres().then(response => { this.genres = response; })
        },
        filterGenre(){
            if (this.selectedGenre === 'All') {
                this.genreDisp = this.librosDisp;
            }
            else {
                this.genreDisp = this.librosDisp.filter(book => book.genre === this.selectedGenre)
            }

        },
        filterPages(){
            this.genreDisp = this.librosDisp.filter(book => book.pages > this.numPages)
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
    margin-top: 10%;
}

.filtros{
    display: flex;
    flex-direction: row;
    gap: 20%;
    background-color: green;
}

.filtro-label{
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.libros{
    display: flex;
    flex-wrap: wrap; /* permite que los elementos se muevan a la siguiente línea si no hay suficiente espacio. */
    gap: 10px;
}

.art-libro {
    flex: 1 1 33%; /* cada tamaño de los artículos será el 33% del ancho disponible */
}

.lista-lectura {
    margin-top: 10%;
    margin-left: 10%;
}

</style>