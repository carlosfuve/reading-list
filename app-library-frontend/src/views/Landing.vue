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
                <select id="genres" v-model="selectedGenreId" @change="filterGenre">
                    <option :value="-1">Todos</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
            </label>
        </div>

        <section class="libros">
            <article v-for="book in filterDisp" :key="book.ISBN" class="art-libro">
                <div class="title-book">
                    <h4>{{ book.title }}</h4>
                    <button @click="changeAvailable(book.id)">+</button>
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
                    <button @click="changeAvailable(book.id)">-</button>
                </div>
                <img style="width: 100px;" :src="book.cover" :alt="book.ISBN">
            </article>
        </section>
     </div>
</template>

<script lang="ts">
import type IBook from '@/interfaces/IBook';
import type IGenre from '@/interfaces/IGenre';
import {getAllGenres, getAllBooks, changeAvailableBook, getFilterByPages, getFilterByGenre} from '@/utils/loadBooks';

export default{
    data() {
        return {
            filterDisp: [] as IBook[],
            librosLectura: [] as IBook[],
            genres: [] as IGenre[],
            selectedGenreId: -1 as number,
            selectedGenreName: 'Todos' as string,
            numPages: 0 as number

        };
    },
    methods: {
        loadGenres(){
            getAllGenres().then(response  => {
                this.genres = response.data;
            })
        },
        getGenreNameSelected(){
            const selectedGenre = this.genres.find(genre => genre.id === this.selectedGenreId);
            if (selectedGenre) {
                this.selectedGenreName = selectedGenre.name;
            } else {
                this.selectedGenreName = 'Todos';
            }
        },
        async loadBooks(){
            const books: IBook[] = await getAllBooks()
            this.filterDisp = books.filter((book: IBook) => book.available);
            this.librosLectura = books.filter((book: IBook) => !book.available);
        },
        async filterGenre(){
            this.getGenreNameSelected()
            if (this.selectedGenreId === -1) { this.loadBooks(); }
            else {
                this.getGenreNameSelected()
                const books: IBook[] = await getFilterByGenre(this.selectedGenreId) 
                console.log(this.selectedGenreName)
                this.filterDisp = books.filter(book => book.available)
                this.librosLectura = books.filter(book => !book.available)
            }

        },
        async filterPages(){
            this.filterDisp = await getFilterByPages(this.numPages)
        },
        async changeAvailable(idBook:string | undefined){
            if (idBook) await changeAvailableBook(idBook)
            
            this.filterGenre()
        }
    },
    mounted() {
        this.loadBooks();
        this.loadGenres();
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