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



const container = document.querySelector('#container');
function buildCourses (tab)
{
    container.innerHTML = '';
    for (let course of courses[tab]['courses'].filter(containsSearch))
    {
       const div = document.createElement('div');
       div.classList.add('swiper-slide');

       const image = document.createElement('img');
    //    image.classList.add('d-block');
       image.src = `${course['image']}`;
       image.alt = `course ${course['id']}`;

       const title = document.createElement('h3');
       title.innerText = course['title'];
       title.classList.add('title');


       const instructors = document.createElement('h4');
       instructors.innerText = course['instructors'][0]['name'];

       const price = document.createElement('h3');
       price.innerText = `$${course['price']}`;
       price.classList.add('price');

       div.append(image, title, instructors, price);

       container.append(div);
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
