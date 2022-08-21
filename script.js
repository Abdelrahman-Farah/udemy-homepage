let courses;

const getCourses = async () => {
    const res = await fetch('http://localhost:3000/courses');
    courses = await res.json();
    buildCourses();
}

window.addEventListener('DOMContentLoaded', () => getCourses());

const form = document.querySelector('form');


form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(1);
    buildCourses();
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
function buildCourses ()
{
    container.innerHTML = '';
    for (let course of courses.filter(containsSearch))
    {
       const li = document.createElement('li');

       const image = document.createElement('img');
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

       li.append(image, title, instructors, price);

       container.append(li);
    }
}