const accesskey = "UlvMCSW9qw4xo92Rxyn6DSuWEsag98Jxi7hKebIs9wI";
const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");
const searchresult = document.getElementById("search-result");
const showmore = document.getElementById("showmore");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;


    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchresult.innerHTML = "";
    }

    const results = data.results; // Corrected: it should be data.results, not data.result
    results.forEach(result => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        searchresult.appendChild(imagelink);
    });
    showmore.style.display = "block";
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchresult.innerHTML = ''; // Clear previous search results
    searchImages();
});

showmore.addEventListener("click", () =>{
    page++;
    searchImages();
});
