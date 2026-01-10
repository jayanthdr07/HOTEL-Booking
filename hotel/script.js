const cityBackgrounds = {
    Bangalore: 'https://images.unsplash.com/photo-1550479708-f4041b655519?auto=format&fit=crop&w=2071&q=80',
    Pune: 'https://images.unsplash.com/photo-1587823521235-9614a904033b?auto=format&fit=crop&w=2071&q=80',
    Hyderabad: 'https://images.unsplash.com/photo-1627993202970-1f9e235d9685?auto=format&fit=crop&w=2070&q=80'
};

const genericBackground = 'https://images.unsplash.com/photo-1502604018318-c288d6138676?auto=format&fit=crop&w=2070&q=80';

const hotelsData = {
    Bangalore: [
        {
            name: "Grand Palace Hotel",
            rating: 4.8,
            pricePerNight: 7500,
            image: "https://images.unsplash.com/photo-1551892589-865f698694f3?auto=format&fit=crop&w=600&q=80",
            website: "#",
            rooms: [
                { type: "Single Room with Pool View", price: 7500, image: "https://images.unsplash.com/photo-1501117716987-c8f86a81aff4?auto=format&fit=crop&w=500&q=60" },
                { type: "Double Bed Room", price: 11000, image: "https://images.unsplash.com/photo-1560448075-bd0a79c42f74?auto=format&fit=crop&w=500&q=60" }
            ],
            email: "contact@grandpalacehotel.in",
            phone: "+91 98765 43210",
            address: "No 12, MG Road, Bangalore, Karnataka, India"
        }
        // Add more hotels as needed
    ],
    Pune: [ /* similar structure */ ],
    Hyderabad: [ /* similar structure */ ]
};

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const bodyElement = document.body;

const citySelect = document.getElementById('city-select');
const cityHeader = document.getElementById('city-header');
const expensiveHotels = document.getElementById('expensive-hotels');
const budgetHotels = document.getElementById('budget-hotels');
const backToPage1Btn = document.getElementById('back-to-page1');

const hotelNameElem = document.getElementById('hotel-name');
const hotelMainImage = document.getElementById('hotel-main-image');
const roomTypesContainer = document.getElementById('room-types');
const hotelContactContainer = document.getElementById('hotel-contact');
const backToPage2Btn = document.getElementById('back-to-page2');
const bookingForm = document.getElementById('booking-form');
const roomSelect = document.getElementById('room-select');
const nightsInput = document.getElementById('nights-input');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');

let selectedCity = null;
let selectedHotel = null;

function updateBackground(city){
    bodyElement.style.backgroundImage = `url('${city ? cityBackgrounds[city] : genericBackground}')`;
}

function showPage(pageNum){
    page1.classList.remove('active');
    page2.classList.remove('active');
    page3.classList.remove('active');
    if(pageNum===1) page1.classList.add('active');
    if(pageNum===2) page2.classList.add('active');
    if(pageNum===3) page3.classList.add('active');
    if(pageNum===1) updateBackground(null);
    else if(selectedCity) updateBackground(selectedCity);
}

showPage(1);

citySelect.addEventListener('change', () => {
    selectedCity = citySelect.value;
    cityHeader.textContent = `${selectedCity} Hotels`;
    expensiveHotels.innerHTML = '';
    budgetHotels.innerHTML = '';

    const hotels = hotelsData[selectedCity] || [];
    const expensive = hotels.filter(h => h.pricePerNight >= 6000);
    const budget = hotels.filter(h => h.pricePerNight < 6000);

    function createHotelCard(hotel){
        const card = document.createElement('div');
        card.className = 'hotel-card';

        const img = document.createElement('img');
        img.src = hotel.image;
        img.alt = hotel.name;

        const details = document.createElement('div');
        details.className = 'hotel-details';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'hotel-name';
        nameDiv.textContent = hotel.name;

        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'hotel-rating';
        ratingDiv.textContent = `Rating: ${hotel.rating.toFixed(1)} ?`;

        const priceDiv = document.createElement('div');
        priceDiv.className = 'hotel-price';
        priceDiv.textContent = `?${hotel.pricePerNight.toLocaleString()}/night`;

        details.append(nameDiv, ratingDiv, priceDiv);
        card.append(img, details);

        card.addEventListener('click', () => showHotelDetails(hotel));
        return card;
    }

    expensive.forEach(h => expensiveHotels.appendChild(createHotelCard(h)));
    budget.forEach(h => budgetHotels.appendChild(createHotelCard(h)));

    showPage(2);
});

backToPage1Btn.addEventListener('click', () => {
    citySelect.value = "";
    showPage(1);
});

backToPage2Btn.addEventListener('click', () => showPage(2));

function showHotelDetails(hotel){
    selectedHotel = hotel;
    hotelNameElem.textContent = hotel.name;
    hotelMainImage.src = hotel.image;
    hotelMainImage.alt = hotel.name;

    roomTypesContainer.innerHTML = '';
    roomSelect.innerHTML = '<option value="" disabled selected>-- Choose a Room --</option>';

    hotel.rooms.forEach((room, idx) => {
        const card = document.createElement('div');
        card.className = 'room-card';
        const img = document.createElement('img');
        img.src = room.image;
        img.alt = room.type;

        const info = document.createElement('div');
        info.className = 'room-info';
        const title = document.createElement('div');
        title.className = 'room-title';
        title.textContent = room.type;
        const price = document.createElement('div');
        price.className = 'room-price';
        price.textContent = `?${room.price.toLocaleString()}/night`;

        info.append(title, price);
        card.append(img, info);
        roomTypesContainer.appendChild(card);

        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${room.type} - ?${room.price.toLocaleString()}`;
        roomSelect.appendChild(option);
    });

    hotelContactContainer.innerHTML = `
        <p><strong>Email:</strong> <a href="mailto:${hotel.email}">${hotel.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${hotel.phone}">${hotel.phone}</a></p>
        <p><strong>Address:</strong> ${hotel.address}</p>
        <p><strong>Website:</strong> <a href="${hotel.website}" target="_blank">${hotel.website}</a></p>
    `;

    bookingForm.reset();
    nightsInput.value = 1;
    showPage(3);
}

bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const roomIndex = roomSelect.value;
    if(roomIndex==="") return alert("Please select a room type.");
    const room = selectedHotel.rooms[roomIndex];
    const nights = parseInt(nightsInput.value);
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    if(!name||!email||!phone) return alert("Please fill all contact details.");
    const total = room.price*nights;
    alert(`Booking Details:
Hotel: ${selectedHotel.name}
Room: ${room.type}
Nights: ${nights}
Name: ${name}
Email: ${email}
Phone: ${phone}
Total Cost: ?${total.toLocaleString()}
Thank you for booking!`);
    bookingForm.reset();
    nightsInput.value = 1;
});
