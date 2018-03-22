'use strict';
let map;
const initMap = (item) => {
    let position = {lat: item.coordinates.lat, lng: item.coordinates.lng};
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 8,
      });
    new google.maps.Marker({
    position: position,
    map: map,
    });
};

let openModal = (item) => {
    console.log(item);
    initMap(item);
    // Get the modal elements
    let image = document.querySelector('#imageholder');
    let title = document.querySelector('#titleholder');
    let detail = document.querySelector('#detailholder');

    let modal = document.querySelector('#myModal');

    console.log(modal);

    // add data to elements
    image.src = item.image;
    title.innerText = item.title;
    detail.innerText = item.time;

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', (evt) => {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (evt) => {
        if (evt.target == modal) {
            modal.style.display = 'none';
        }
    });

    // jQuery code to open modal. Did find solution above without using this.
    // $('#myModal').modal();

    modal.style.display ='block';
};

// Pictures from the array
const pictures = (picArray) => {
    for(let item of picArray) {
        // create elements
        const column = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h4');
        const detail = document.createElement('p');
        const category = document.createElement('p');

        // add data to elements
        img.src = item.thumbnail;
        title.innerText = item.title;
        detail.innerText = item.details;
        category.innerText = 'Tags: ' + item.category;

        // add required classes
        column.classList.add('col-sm-4');
        img.classList.add('img-fluid');

        // id for the element. Needed in sorting
        column.setAttribute('id', item.category);

        // add data to container element
        column.appendChild(title);
        column.appendChild(img);
        column.appendChild(detail);
        column.appendChild(category);


        // Click event listener for opening modal
        column.addEventListener('click', (evt) => {
            console.log(item.title);
            openModal(item);
        });

        // Put whole container to existing html element
        document.querySelector('#row-content').appendChild(column);
    }
};

// Click events for navbar links
const initButtons = () => {
    // Get elements
    const allWomenBtn = document.querySelector('#allwomen-btn');
    const wifesBtn = document.querySelector('#wife-btn');
    const girlfriendsBtn = document.querySelector('#girlfriend-btn');
    // Add event listeners
    allWomenBtn.addEventListener('click', (evt) => {
        console.log('All women Button clicked.');
        sorting('all');
    });

    wifesBtn.addEventListener('click', (evt) => {
        console.log('wifes Button clicked.');
        sorting('wifes');
    });

    girlfriendsBtn.addEventListener('click', (evt) => {
        console.log('girlfriends Button clicked.');
        sorting('girlfriends');
    });
};

// Sorting when clicked button
const sorting = (type) => {
    // get all column divs from the html
    let categoryList = document.querySelectorAll('.col-sm-4');
    // Go trough them and display only those which has specific category.
    switch (type) {
        case 'all':
            for( let category of categoryList) {
                category.style.display = 'block';
            }
            break;
        case 'wifes':
            for( let category of categoryList) {
                if(category.attributes.id.value === 'Wife') {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
            break;
        case 'girlfriends':
            for( let category of categoryList) {
                if(category.attributes.id.value === 'Girlfriend') {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
        default:
            break;
    }
};

// Fetching data from the json file.
fetch('data.json')
    .then( (response) => {
        // Parsing response from the response
        return response.json();
    })
    .then( (result) => {
        // doing stuff with parsed data and other stuff.
        pictures(result);
        initButtons();
    });
