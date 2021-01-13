let app = new Vue({
    el: '#root',
    data:{
        film:"pa",
        films:[],
        input: document.getElementById("input"),
        series:[],
    },
    methods:{
        searchFilms(){
            if(this.film.length > 0){
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
                .then(response =>{
                    this.films = response.data.results;
                    this.films.forEach(element => {
                        element.vote_average = Math.ceil(element.vote_average / 2);
                        if(element.original_language == "en"){
                            element.original_language = "gb"; 
                        }else if(element.original_language == "ja"){
                            element.original_language = "jp";
                        };
                    });
                    axios.get(`https://api.themoviedb.org/3/search/tv/?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
                    .then(response =>{
                        this.series = response.data.results;
                        this.series.forEach(element => {
                            element.vote_average = Math.ceil(element.vote_average / 2);
                            if(element.original_language == "en"){
                                element.original_language = "gb";
                            }else if(element.original_language == "ja"){
                                element.original_language = "jp";
                            }
                        });
                    })
                })
            }
        },
    },
    mounted(){
        this.searchFilms();
    }
})