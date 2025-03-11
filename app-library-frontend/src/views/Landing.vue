<template>
    <div class="containerMainInfo">
        <h1 class="book-disp" > {{ filterDisp.length }} libros disponibles</h1>
        <h3 v-if="librosLectura.length > 0" > {{ librosLectura.length }} en la lista de lectura</h3>

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
            <article v-for="book in filterDisp" :key="book.ISBN" class="art-libro">
                <div class="title-book">
                    <h4>{{ book.title }}</h4>
                    <button @click="changeAvailable(book.title)">+</button>
                </div>
                <img style="width: 100px;" :src="book.cover" :alt="book.ISBN">
            </article>
        </section>
    </div>


    <div class="lista-lectura">
        <h2><strong>Lista de lectura</strong></h2>    
        <section>
            <article v-for="book in librosLectura" :key="book.ISBN">
                <div class="title-book">
                    <h4>{{ book.title }}</h4>
                    <button @click="changeAvailable(book.title)">-</button>
                </div>
                <img style="width: 100px;" :src="book.cover" :alt="book.ISBN">
            </article>
        </section>
     </div>
</template>

<script lang="ts">
import type IBook from '@/interfaces/IBook';
import {loadData, allGenres} from '@/utils/loadBooks';

export default{
    data() {
        return {
            books: [] as IBook[],
            filterDisp: [] as IBook[],
            librosLectura: [] as IBook[],
            genres: [] as string[],
            selectedGenre: 'All' as string,
            numPages: 0 as number

        };
    },
    methods: {
        loadBooks(){
           loadData()
           .then( response => {  
                this.books = response
                this.librosLectura = this.books.filter((book: IBook) => !book.available);
                this.filterDisp = this.books.filter((book: IBook) => book.available);

                localStorage.setItem("booksList", JSON.stringify(this.librosLectura));
            })

           allGenres()
           .then(response => { this.genres = response; })
        },
        filterGenre(){
            if (this.selectedGenre === 'All') {
                this.filterDisp = this.books.filter(book => book.available)
                this.librosLectura = this.books.filter(book => !book.available)
            }
            else {
                this.filterDisp = this.books.filter(book => book.available && book.genre === this.selectedGenre)
                this.librosLectura = this.books.filter(book => !book.available && book.genre === this.selectedGenre)

            }

        },
        filterPages(){
            this.filterDisp = this.books.filter(book => book.available && book.pages > this.numPages)
        },
        changeAvailable(title:string){
            const bookToModify = this.books.find(book => book.title === title);
            if (bookToModify) {
                bookToModify.available = !bookToModify.available; 
            }

            this.filterGenre()
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
    margin-bottom: 20px;
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
    display: flex;
    flex-direction: column;
    width: 50vw; /* Ocupa el 70% de la pantalla */
    gap: 10px;
    margin-top: 10%;
}

.title-book{
    display: flex;
    flex-direction: row;
    gap:10px; 
    margin-bottom: 3px;
}

</style>