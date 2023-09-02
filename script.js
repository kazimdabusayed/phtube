const handleCategory = async() => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const menuContainer = document.getElementById("menu-container");

    data.data.forEach((category) => {
        // console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
            <li><a onclick="handleLoadVideo(${category.category_id})">${category.category}</a></li>
        `;
        menuContainer.appendChild(div);
    });
}

const handleLoadVideo = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const id = await res.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    id.data.forEach((video) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <!-- Video -->
            <div class="max-w-[18rem] rounded-lg bg-neutral-400 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <card class="flex flex-col">
                    <div class="relative overflow-hidden bg-cover bg-no-repeat">
                        <!-- Thumbnail -->
                        <a href="#">
                            <img src="${
                                video?.thumbnail
                            }" class="w-94 h-70 rounded-lg hover:rounded-none hover:scale-105 transition delay-75 duration-200 ease-in-out"/>
                        </a>
                        <p class="absolute right-6 bottom-2 bg-gray-900 text-gray-100 text-xs p-1">${toDaysMinutesSeconds(
                            video.others.posted_date
                        )}</p>
                    </div>

                    <div class="flex flex-row my-2 gap-2">
                        <!-- Profile Picture -->
                        <a href="#">
                            <img src="${
                                video?.authors[0]?.profile_picture
                            }" class="rounded-full max-h-10 max-w-10" />
                        </a>
            
                        <!-- Title -->
                        <div clas="flex flex-col">
                            <a href="#">
                                <p class="text-gray-800 text-sm font-semibold">${
                                    video?.title
                                }</p>
                            </a>
                            <a class="text-gray-500 text-xs mt-2 hover:text-gray-600" href="#">${
                                video?.authors[0]?.profile_name
                            }</a>
                            <p class="text-gray-400 text-xs mt-1">${
                                video?.others?.views
                            } views</p>
                        </div>
                    </div>
                </card>
            </div>
        `;
        cardContainer.appendChild(div);

        // seconds to days,hours, minutes
        function toDaysMinutesSeconds(totalSeconds) {
            const seconds = Math.floor(totalSeconds % 60);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const days = Math.floor(totalSeconds / (3600 * 24));

            const minutesStr = makeHumanReadable(minutes, "min");
            const hoursStr = makeHumanReadable(hours, "hr");
            const daysStr = makeHumanReadable(days, "day");

            return `${daysStr}${hoursStr}${minutesStr}ago`.replace(
                /,\s*$/,"");
        }

        function makeHumanReadable(num, singular) {
            return num > 0
                ? num + (num === 1 ? ` ${singular} ` : ` ${singular}s `)
                : "";
        }
    });

}





handleCategory();
handleLoadVideo('1000');