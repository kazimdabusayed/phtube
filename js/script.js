const handleCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const menuContainer = document.getElementById("menu-container");
    data.data.forEach((category) => {
        const button = document.createElement("button");
        button.setAttribute("id", category.category_id);
        button.setAttribute(
            "onclick",
            `changeCategory(${category.category_id}); currActiveButton(${category.category_id})`
        );
        // button.classList = "";
        button.innerText = category.category;
        menuContainer.appendChild(button);
    });
}

const currActiveButton = async (id) => {
    const catContainer = document.getElementById("menu-container");
    for (const child of catContainer.children) {
        console.log(child);
        child.classList =
            "bg-[#25252526] text-[#252525B3] px-2 py-1 md:px-5 md:py-2 rounded-md font-inter";
    }
    document.getElementById(id).classList =
        "bg-[red] text-white px-2 py-1 md:px-5 md:py-2 rounded-md font-inter";
};

// change category function
const changeCategory = (id) => {
    categoryId = id;
    sortCategory = false;
    const changeButton = document.getElementById("sort-btn");
    changeButton.innerText = "Sort by view";
    changeButton.classList.remove(
        "bg-gradient-to-b",
        "from-[#FF1F3D]",
        "to-[#FF1F3D]",
        "text-white",
        "text-xs"
    );
    handleVideos();
};

let sortCategory = false;

// Function to sort items by view count
function sortByViewCount() {
    if (sortCategory) {
        sortCategory = false;
        const changeButton = document.getElementById("sort-btn");
        changeButton.innerText = "Sort by view";
        changeButton.classList.remove(
            "bg-gradient-to-b",
            "from-[#FF1F3D]",
            "to-[#FF1F3D]",
            "text-white",
            "text-xs"
        );
    } else {
        sortCategory = true;
        const changeButton = document.getElementById("sort-btn");
        changeButton.innerText = "Sort by default";
        changeButton.classList.add(
            "bg-gradient-to-b",
            "from-[#FF1F3D]",
            "to-[#FF1F3D]",
            "text-white",
            "text-xs"
        );
    }
    handleVideos();
}

const sortButton = document.getElementById("sort-btn");
sortButton.addEventListener("click", sortByViewCount);


// Video function
const handleVideos = async () => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const json = await res.json();
    const data = json.data;
    let videos = [...data];
    if (sortCategory) {
        videos = videos?.sort(
            (a, b) =>
                parseFloat(b.others.views.slice(0, -1)) -
                parseFloat(a.others.views.slice(0, -1))
        );
    } else {
        videos = [...data];
    }

    const videoContainer = document.getElementById("video-container");
    videoContainer.innerText = "";

    if (videos.length !== 0) {
        videos.forEach((video) => {
            videoContainer.classList.add(
                "grid",
                "grid-cols-1",
                "md:grid-cols-2",
                "lg:grid-cols-3",
                "xl:grid-cols-4",
                "gap-8",
                "mb-8"
            );

            const div = document.createElement("div");
            div.classList = "bg-base-500";
            div.innerHTML = `
                <figure>
                    <img class="w-full h-[240px] md:h-[200px] rounded-lg hover:rounded-none hover:scale-105 transition delay-75 duration-200 ease-in-out" src="${
                        video.thumbnail
                    }" alt="" />
                </figure>
                <div class="flex items-start gap-4 mt-5 relative">
                    <div>
                        <img class="w-[40px] h-[40px] rounded-full" src="${
                            video.authors[0].profile_picture
                        }" alt="">
                    </div>
                    <div class="w-64">
                        <h2 class="text-xl font-semibold">${video.title}</h2>
                        <div class="flex gap-2 items-center mt-1">
                        <p class="font-medium">${
                            video.authors[0].profile_name
                        }</p>
                        ${
                            video.authors[0].verified === true
                                ? `<img src=${"images/blue_tik.png"}>`
                                : ""
                        }
                    </div>
                    <p>${video?.others.views} views</p>
                    </div>
                    <div class="absolute right-4 -top-16">
                        ${
                            convertSecondsToHoursAndMinutes(
                                video.others.posted_date
                            ) !== "0 hrs 0 mins ago"
                                ? `<p class="bg-[#171717] text-white px-1 rounded-md">${convertSecondsToHoursAndMinutes(
                                        video.others.posted_date
                                    )}</p>`
                                : ""
                        }
                    </div>
                </div>
            `;
            videoContainer.appendChild(div);
        });
    } else {
        const changeButton = document.getElementById("sort-btn");
        changeButton.innerText = "Sort by view";
        changeButton.classList.remove(
            "bg-gradient-to-b",
            "from-[#FF1F3D]",
            "to-[#FF1F3D]",
            "text-white",
            "text-xs"
        );

        const div = document.createElement("div");
        videoContainer.classList.remove(
            "grid",
            "grid-cols-1",
            "md:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
            "gap-8",
            "mb-8"
        );
        div.classList = "flex justify-center items-center  w-full my-24 md:my-22";
        div.innerHTML = `
            <div class="flex flex-col justify-center items-center text-center">
                <img src=${"images/Icon.png"} alt="">
                <h3 class="text-xl md:text-4xl font-bold md:w-[400px] mt-8">Oops!! Sorry, There is no content here</h3>
            </div>
        `;
        videoContainer.appendChild(div);
    }
};


// second to hour, minute function
function convertSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hrs ${minutes} mins ago`;
}


handleCategory();
changeCategory("1000");