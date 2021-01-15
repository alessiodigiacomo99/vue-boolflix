let app = new Vue({
    el: '#root',
    data:{
        film:"pa",
        films:[],
        input: document.getElementById("input"),
        series:[],
    },
    methods:{
        manipolazioniElemento(elemento){
            elemento.vote_average = Math.ceil(elemento.vote_average / 2);
            if(elemento.original_language == "en"){
                elemento.original_language = "gb"; 
            }else if(elemento.original_language == "ja"){
                elemento.original_language = "jp";
            };
            if (elemento.overview.length >= 50) {
                elemento.overview = elemento.overview.slice(0, 50) + "...";
            }
        },
        cast(tipo, elemento){
            axios.get(`https://api.themoviedb.org/3/${tipo}/${elemento.id}/credits?api_key=447ce90d24c1fcb65e78b03135e2905b`)
            .then(results =>{
                elemento.cast = results.data.cast.slice(0, 5);
                let cast = [];
                for (let i = 0; i < elemento.cast.length; i++) {
                    cast.push(results.data.cast[i].name)
                }
                this.$set(elemento, 'casts', cast);
            })
        },
        genere(tipo, elemento){
            axios.get(`https://api.themoviedb.org/3/${tipo}/${elemento.id}?api_key=447ce90d24c1fcb65e78b03135e2905b`)
            .then(results =>{
                elemento.genres = results.data.genres;
                let genres = [];
                for (let i = 0; i < elemento.genres.length; i++) {
                    genres.push(results.data.genres[i].name)
                }
                this.$set(elemento, 'generi', genres);
            })
        },
        searchFilms(){
            if(this.film.length > 0){
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
                .then(response =>{
                    this.films = response.data.results;
                    this.films.forEach(element => {
                        this.manipolazioniElemento(element);
                        this.cast("movie", element);
                        this.genere("movie", element);
                    })
                })
            }
        },
        searchSeries(){
            if(this.film.length > 0){
                axios.get(`https://api.themoviedb.org/3/search/tv/?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
                .then(response =>{
                    this.series = response.data.results;
                    this.series.forEach(element => {
                        this.manipolazioniElemento(element);
                        this.cast("tv", element);
                        this.genere("tv", element);
                    })
                })
            }
        },
        search(){
            this.searchFilms();
            this.searchSeries();
        }
    },
    mounted(){
        this.search();
        
    }
})