document.addEventListener("DOMContentLoaded", function () {
    // The API URL to fetch data
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    // Get a reference to the postList container
    const postList = document.getElementById("postList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    
    let originalPosts = [];

    // Function to fetch and display posts
    function fetchAndDisplayPosts() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            
                originalPosts = data;
            
                // Call the function to render posts
                renderPosts(originalPosts);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    // Function to render posts
    function renderPosts(posts) {
        // Clear the existing content in postList
        postList.innerHTML = "";

        // Iterate through the fetched data and create cards for each post
        posts.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.className = "col-lg-4 col-md-6 col-sm-12 mb-4";
            postCard.innerHTML = `
                <div class="card bg-primary">
                    <div class="card-body bg-light">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                    </div>
                </div>
            `;

            // Append the card to the postList container
            postList.appendChild(postCard);
        });
    }

    // Function to filter posts based on search input
    function filterPosts() {
        const keyword = searchInput.value.toLowerCase();
        
        if (keyword === "") {
            // If the search input is empty, display the original posts
            renderPosts(originalPosts);
            return;
        }

        const filteredPosts = originalPosts.filter((post) => {
            const postText = `${post.title} ${post.body}`.toLowerCase();
            return postText.includes(keyword);
        });

            // Call the function to render filtered posts
        renderPosts(filteredPosts);
    }

    // Event listener for the search button
    searchButton.addEventListener("click", filterPosts);
    searchInput.addEventListener("input", filterPosts);

    // Call the function to fetch and display posts
    fetchAndDisplayPosts();
});
