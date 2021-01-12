let app = new Vue({
    el: '#root',
    data:{
        film:"ci",
        films:[],
    },
    methods:{
        searchFilms(){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
            .then(response =>{
                this.films = response.data.results;
            })
        }
    },
    beforeUpdate(){
        
    },
    mounted(){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=447ce90d24c1fcb65e78b03135e2905b&query=${this.film}`)
        .then(response =>{
            this.films = response.data.results;
        })
    }
})