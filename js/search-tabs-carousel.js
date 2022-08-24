let courses = {
    "Python": {},
    "Excel": {},
    "Web-Development": {},
    "JavaScript": {},
    "Data-Science": {},
    "AWS-Certification": {},
    "Drawing": {}
};

let activeTab = document.querySelector('#python');
let activeTabHeader = document.querySelector('#tab-header');
let activeTabDescription = document.querySelector('#tab-description');
let activeTabButton = document.querySelector('#tab-button');

const getCourses = async () => {
    for (let track in courses)
    {
        const res = await fetch(`http://localhost:3000/${track}`);
        courses[track] = await res.json();
    }

    let key = 'Python';
    activeTabHeader.innerText = courses[key]['header'];
    activeTabDescription.innerText = courses[key]['description'];
    activeTabButton.innerText = `Explore ${key}`;
    buildCourses(key);
}
window.addEventListener('DOMContentLoaded', () => getCourses());

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let key = activeTab.innerText.replace(' ', '-');
    buildCourses(key);
});

const box = document.querySelector('.search_box');
function containsSearch (course)
{
    if (course['title'].toLowerCase().includes(box.value.toLowerCase())
     || course['headline'].toLowerCase().includes(box.value.toLowerCase()))
        return true;

    for (let instructor of course['instructors'])
    {
        if (instructor['name'].toLowerCase().includes(box.value.toLowerCase()))
            return true;
    }
    return false;
}


const indicators = document.querySelector('.carousel-indicators');
const slides = document.querySelector('.carousel-inner');
function buildCourses (tab)
{
    indicators.innerHTML = '';
    slides.innerHTML = '';

    let temp = courses[tab]['courses'].filter(containsSearch);
    for (let i=0; i<temp.length; i+=4) {
        const indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-bs-slide-to', `${i/4}`);
        indicator.setAttribute('aria-label', `Slide ${(i/4)+1}`);

        if (i == 0) {
            indicator.setAttribute('class', 'active');
            indicator.setAttribute('aria-current', 'true');
        }

        const carouselItem = document.createElement('div');

        carouselItem.classList.add('carousel-item');
        if (i === 0){
            carouselItem.classList.add('active');
        }

        const individualSlide = document.createElement('div');
        individualSlide.classList.add('courses-inject', 'row', 'd-flex', 'justify-content-start');

        for (let k=i; k<Math.min(i+4, temp.length); k++) {
            let course = temp[k];
            individualSlide.innerHTML += `
                <div class="mx-3">
                    <img src="${course['image']}" alt="course ${course['id']}">
                    <h3 class="title">${course['title']}</h3>
                    <h4>${course['instructors'][0]['name']}</h4>
                    <h3 class="price">$${course['price']}</h3>
                </div>

            `;
        }
        carouselItem.append(individualSlide);
        slides.append(carouselItem);

        indicators.append(indicator);
    }
}



let coursesNav = document.querySelector('#courses-tabs');
coursesNav.addEventListener('click', function (event)
{
    event.preventDefault();
    //box.value = '';

    let newActiveTab = event.target;
    if (activeTab != newActiveTab)
    {
        activeTab.classList.remove('active');
        newActiveTab.classList.add('active');

        let key = event.target.innerText.replace(' ', '-');
        buildCourses(key);

        activeTabHeader.innerText = courses[key]['header'];
        activeTabDescription.innerText = courses[key]['description'];
        activeTabButton.innerText = `Explore ${event.target.innerText}`;

        activeTab = newActiveTab;
    }
});
