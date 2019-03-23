let urlNewest = "https://newsapi.org/v2/everything?" +
            "sortBy=publishedAt&" +
            "domains=wsj.com,nytimes.com,bbc.co.uk&" +
            "apiKey=462d92a7733345858b5247b4686fdfee";

let urlHeadline = "https://newsapi.org/v2/top-headlines?" +
                "country=us&" +
                "apiKey=462d92a7733345858b5247b4686fdfee";

let urlSearch = "https://newsapi.org/v2/top-headlines?";


let currentSite = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
let req;
let searchQuery;
let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");


switch(currentSite){

    case "index.html": 
        req = new Request(urlNewest);
        fetchNews();
        break;
    case "headline.html": 
        req = new Request(urlHeadline);
        fetchNews();
        break;
    case "search.html": 
        searchBtn.addEventListener("click", getQuery);
        break;
}


function fetchNews(){
    fetch(req).then(function(response){
        //console.log(response);
        return response.json();
    }).then(function(response){
        //console.log(response);
        render(response);
    })
}


function render(res){
    let newsSection = document.getElementById("newsDiv");
    let title, paragraph;
    let articles = res.articles;

    articles.forEach(element => {
        let article = document.createElement("article");
        article.className = "newsArticle";
        let title = document.createElement("h2");
        let paragraph = document.createElement("p");
        //let newsURL = document.createElement("p");
        let newsIMG = document.createElement("img")

        title.textContent = element.title;
        paragraph.textContent = element.description;
        //newsURL.textContent = element.url;
        newsIMG.src = element.urlToImage;

        article.appendChild(title);
        article.appendChild(paragraph);
        article.appendChild(newsIMG);

        newsSection.appendChild(article);
    });
}


function getQuery(){
    var elements = document.getElementsByClassName("newsArticle");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    searchQuery = searchBar.value;
    req = new Request(urlSearch + "q=" + searchQuery + "&apiKey=462d92a7733345858b5247b4686fdfee");
    fetchNews();
}
