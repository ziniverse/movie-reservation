// JavaScript to handle modals
document.addEventListener('DOMContentLoaded', () => {
    // Get all current and upcoming movie buttons and modals
    const movieButtons = document.querySelectorAll('.movie-button');
    const upcomingMovieButtons = document.querySelectorAll('.upcoming-movie-button');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Function to open a modal
    const openModal = (modal) => {
        modal.style.display = 'block';
    };

    // Function to close a modal
    const closeModal = (modal) => {
        modal.style.display = 'none';
    };

    // Add event listeners for current movie buttons
    movieButtons.forEach((button, index) => {
        button.addEventListener('click', () => openModal(modals[index]));
    });

    // Add event listeners for upcoming movie buttons
    upcomingMovieButtons.forEach((button, index) => {
        button.addEventListener('click', () => openModal(modals[movieButtons.length + index]));
    });

    // Add event listeners for close buttons
    closeButtons.forEach((button) => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Find all trailer buttons
    const trailerButtons = document.querySelectorAll('.trailer-btn');

    // Add click event to each button
    trailerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoUrl = button.getAttribute('data-trailer-url');
            window.open(videoUrl, '_blank'); // Open the video in a new tab
        });
    });
});
document.querySelectorAll('.book-now-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        document.getElementById(`ticket-modal-movie-${index+1}`).style.display = 'block';
        // If you want to close the current movie modal when opening the ticket modal, uncomment the line below
        // this.closest('.modal').style.display = 'none';
    });
});

// Close the respective ticket modal
document.querySelectorAll('[id^="close-ticket-modal-movie-"]').forEach(closeButton => {
  closeButton.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
  });
});
// Select all the modals
const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {
    // For each modal, find its location buttons and the date selection container within it
    const locationButtons = modal.querySelectorAll('.location-button');
    const dateSelectionContainer = modal.querySelector('.date-selection-container');
  
    // Define a function that shows the date selection container
    function showDateSelection() {
        dateSelectionContainer.style.display = 'block'; // Change 'block' to 'flex' or 'grid' depending on your layout
    }
  
    // Add click event listeners to each location button within the current modal
    locationButtons.forEach(button => {
        button.addEventListener('click', showDateSelection);
    });
  });
  // Select all the modals
  modals.forEach(modal => {
    // Select the date buttons and the time selection container within this modal
    const dateButtons = modal.querySelectorAll('.date-button');
    const timeSelectionContainer = modal.querySelector('.time-selection-container');
    const timeSlots = modal.querySelectorAll('.time-slot');
  
    // Function to show the time selection container and the appropriate time slots
    function showTimeSelection(event) {
        // Hide all time slots first
        timeSlots.forEach(slot => slot.style.display = 'none');
        
        // Get the selected date from the data attribute of the clicked button
        const selectedDate = event.target.textContent;
  
        // Find the time slot that matches the selected date and show it
        const matchingTimeSlot = Array.from(timeSlots).find(slot => slot.getAttribute('data-date') === selectedDate);
        if (matchingTimeSlot) {
            matchingTimeSlot.style.display = 'block';
        }
        // Inside your showTimeSelection function or equivalent
        if (matchingTimeSlot) {
            matchingTimeSlot.style.display = 'flex'; // This should match your CSS styling for .time-slot
  }
  
        // Show the time selection container
        timeSelectionContainer.style.display = 'block';
    }
  
    // Add click event listeners to each date button
    dateButtons.forEach(button => {
        button.addEventListener('click', showTimeSelection);
    });
  });
// Function to change the ticket count and update the total price
function changeTicketCount(button, change) {
    var counterDiv = button.parentElement; 
    var input = counterDiv.querySelector('input[type="text"]');
    var currentValue = parseInt(input.value);
    var newValue = currentValue + change;

    // Ensure the ticket count doesn't go below 0
    if (newValue >= 0) {
        input.value = newValue;
        var modal = counterDiv.closest('.modal');
        if (modal) {
            updateTotal(modal);
        }
    }
}

// Function to calculate and update the total price for a given modal
function updateTotal(modal) {
    var adultPrice = 16.52;
    var childrenPrice = 11.92;
    var seniorPrice = 13.72;
    var studentPrice = 11.92;
    var wheelchairPrice = 11.92;

    var total = 0;

    // Safely calculating total
    total += calculatePrice(modal, '#adults', adultPrice);
    total += calculatePrice(modal, '#children', childrenPrice);
    total += calculatePrice(modal, '#seniors', seniorPrice);
    total += calculatePrice(modal, '#students', studentPrice);
    total += calculatePrice(modal, '#wheelchair', wheelchairPrice);

    // Update total
    var totalElement = modal.querySelector('#total');
    if (totalElement) {
        totalElement.value = `€${total.toFixed(2)}`;
    }
}

// Helper function to safely calculate price for each ticket type
function calculatePrice(modal, selector, price) {
    var element = modal.querySelector(selector);
    return element ? parseInt(element.value) * price : 0;
}

// Attach event listeners to all + and - buttons and initialize the total for each modal
document.querySelectorAll('.modal').forEach(function(modal) {
    modal.querySelectorAll('.button').forEach(function(button) {
        button.onclick = function() {
            var change = button.textContent.trim() === '+' ? 1 : -1;
            changeTicketCount(button, change);
        };
    });
    updateTotal(modal);
});
// JavaScript for Seat Selection with Dynamic Content and Seat Buttons
document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll('.modal');

    modals.forEach(function(modal) {
        var timeButtons = modal.querySelectorAll('.time-button');
        function updateSeatSelection(timeButtonText, modal) {
            var seatSelectionContainer = modal.querySelector('.seat-selection-container');
            var seatSelectionHeader = seatSelectionContainer.querySelector('h3');
            var seatsContainer = modal.querySelector('.seats-container');
            var totalTickets = getTotalTickets(modal);
            var selectedSeats = 0;
            if (seatSelectionHeader) {
                seatSelectionHeader.textContent = 'Select Your Seats ' + timeButtonText;
            }

            seatsContainer.innerHTML = '';

            var totalSeats = parseInt(timeButtonText.split('/')[1]);
            var activeSeats = parseInt(timeButtonText.split(' ')[1].split('/')[0]);
            var seatStates = new Array(totalSeats).fill(false);
            var existingBuyButton = modal.querySelector('.buy-ticket-button');
            if (existingBuyButton) {
                existingBuyButton.remove();
            }
            // Randomly set activeSeats number of seats to active (true)
            for (let i = 0; i < activeSeats; i++) {
                let index;
                do {
                    index = Math.floor(Math.random() * totalSeats);
                } while (seatStates[index]);
                seatStates[index] = true;
            }

            // Calculate the number of rows
            const seatsPerRow = 20;
            const numberOfRows = Math.ceil(totalSeats / seatsPerRow);

            // Create row labels and seat buttons
            for (let row = 0; row < numberOfRows; row++) {
                let rowLabel = document.createElement('div');
                rowLabel.className = 'row-label';
                rowLabel.textContent = 'Row ' + (row + 1);
                seatsContainer.appendChild(rowLabel);

                for (let seat = 0; seat < seatsPerRow; seat++) {
                    let seatIndex = row * seatsPerRow + seat;
                    if (seatIndex < totalSeats) {
                        let seatButton = document.createElement('button');
                        let isActive = seatStates[seatIndex];
                        seatButton.className = isActive ? 'seat-button active' : 'seat-button inactive';
                        seatButton.textContent = 'Seat ' + (seat + 1);

                        if (isActive) {
                            seatButton.addEventListener('click', function() {
                                if (selectedSeats < totalTickets) {
                                    if (!this.classList.contains('selected')) {
                                        this.classList.add('selected');
                                        selectedSeats++;
                                    } else {
                                        this.classList.remove('selected');
                                        selectedSeats--;
                                    }
                                } else if (this.classList.contains('selected')) {
                                    this.classList.remove('selected');
                                    selectedSeats--;
                                }
                            });
                        } else {
                            seatButton.disabled = true;
                        }

                        seatsContainer.appendChild(seatButton);
                    }
                }
            }
            var buyTicketButton = document.createElement('button');
            buyTicketButton.className = 'buy-ticket-button';
            buyTicketButton.textContent = 'Buy Ticket';
            seatsContainer.appendChild(buyTicketButton);
            seatSelectionContainer.style.display = 'flex';
        }

        function getTotalTickets(modal) {
            var adultTickets = parseInt(modal.querySelector('#adults').value) || 0;
            var childrenTickets = parseInt(modal.querySelector('#children').value) || 0;
            var seniorTickets = parseInt(modal.querySelector('#seniors').value) || 0;
            var studentTickets = parseInt(modal.querySelector('#students').value) || 0;
            var wheelchairTickets = parseInt(modal.querySelector('#wheelchair').value) || 0;
            return adultTickets + childrenTickets + seniorTickets + studentTickets + wheelchairTickets;
        }

        timeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var timeButtonText = button.textContent.trim();
                updateSeatSelection(timeButtonText, modal);
            });
        });
    });
});
  // Function to reset all buttons of a particular class to the initial color
  function resetButtonColors(buttonClass) {
      let buttons = document.querySelectorAll(buttonClass);
      buttons.forEach(button => {
        button.classList.remove('clicked');
      });
    }
    
    // Function to handle location button click
    function handleLocationClick(event) {
      resetButtonColors('.location-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here like showing the date-selection-container, etc.
    }
    
    // Function to handle date button click
    function handleDateClick(event) {
      resetButtonColors('.date-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here like showing the time-selection-container, etc.
    }
    
    // Function to handle time button click
    function handleTimeClick(event) {
      resetButtonColors('.time-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here if needed.
    }
    
    // Attach event listeners to the location buttons
    document.querySelectorAll('.location-button').forEach(button => {
      button.addEventListener('click', handleLocationClick);
    });
    
    // Attach event listeners to the date buttons
    document.querySelectorAll('.date-button').forEach(button => {
      button.addEventListener('click', handleDateClick);
    });
    
    // Attach event listeners to the time buttons within each time-slot
    document.querySelectorAll('.time-slot .time-button').forEach(button => {
      button.addEventListener('click', handleTimeClick);
    });  
  document.getElementById('userIcon').addEventListener('click', function() {
    var modal = document.getElementById("modal-user");
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting the traditional way

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;

    // Handle the collected data (e.g., send it to a server or log it)
    console.log(firstName, lastName, email);

    // Optionally, close the modal after submission
    document.getElementById('modal-user').style.display = 'none';
});
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    var firstName = document.getElementById('firstName').value;
    // You can retrieve lastName and email as well if needed

    // Update the greeting
    var greetingElement = document.getElementById('greeting');
    greetingElement.textContent = 'Hi ' + firstName + '!';

    // Optionally, close the modal after submission
    document.getElementById('modal-user').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    const seeAllCurrentMovies = document.getElementById('seeAllCurrentMovies');
    const seeAllUpcomingMovies = document.getElementById('seeAllUpcomingMovies');
    const allMoviesModal = document.getElementById('allMoviesModal'); // No change needed here
    const moviesGrid = document.querySelector('.movies-grid');
    
    // Update the selector for the close button within the new modal structure
    const closeButton = allMoviesModal.querySelector('.see-all-modal-content .close-button');

    seeAllCurrentMovies.addEventListener('click', function () {
        populateMoviesGrid('current');
        allMoviesModal.style.display = 'block';
    });

    seeAllUpcomingMovies.addEventListener('click', function () {
        populateMoviesGrid('upcoming');
        allMoviesModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        allMoviesModal.style.display = 'none';
    });

    function populateMoviesGrid(type) {
        // Clear existing content
        moviesGrid.innerHTML = '';

        // Select the source elements based on type
        let sourceElements;
        if (type === 'current') {
            sourceElements = document.querySelectorAll('.current-movies .movie');
        } else {
            sourceElements = document.querySelectorAll('.upcoming-movies .upcoming-movie');
        }

        // Clone and append each source element
        sourceElements.forEach(function (element) {
            const clone = element.cloneNode(true);
            moviesGrid.appendChild(clone);
        });
    }

    // Updated event delegation for movie buttons inside the modal
    moviesGrid.addEventListener('click', function (event) {
    // Check if the clicked element is a movie button or a child of it
        let targetElement = event.target;
        while (targetElement != null && !targetElement.classList.contains('movie-button') && !targetElement.classList.contains('upcoming-movie-button')) {
            targetElement = targetElement.parentElement;
        }

        if (targetElement) {
            const movieId = targetElement.parentElement.id; // Assuming the ID is on the parent element of the button
            const isUpcoming = targetElement.classList.contains('upcoming-movie-button'); // Check if it's an upcoming movie
            openMovieDetailModal(movieId, isUpcoming);
        }
    });
    function openMovieDetailModal(movieId, isUpcoming) {
        allMoviesModal.style.display = 'none';
    
        // Adjust the ID based on whether the movie is current or upcoming
        const prefix = isUpcoming ? 'upcoming-' : '';
        const detailModalId = `modal-${prefix}movie-${movieId.split('-').pop()}`;
    
        // Find the movie detail modal using its ID
        const detailModal = document.getElementById(detailModalId);
    
        if (detailModal) {
            // Display the movie detail modal
            detailModal.style.display = 'block';
    
            // Close button for the movie detail modal
            const closeDetailButton = detailModal.querySelector('.close-button');
    
            // Add event listener to close the movie detail modal
            closeDetailButton.addEventListener('click', function() {
                detailModal.style.display = 'none';
            });
        }
    }
});
document.querySelector('.search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchText = document.querySelector('.search-input').value.toLowerCase();
    const movies = document.querySelectorAll('.movie');
    let foundMovies = [];

    movies.forEach(movie => {
        const title = movie.querySelector('h4').textContent.toLowerCase();

        if (title.includes(searchText)) {
            foundMovies.push({ title: title, id: movie.id });
        }
    });

    displaySearchResults(foundMovies);
}

function displaySearchResults(foundMovies) {
    const searchModalContainer = document.getElementById('search-modal-container');
    searchModalContainer.innerHTML = `
        <div class="full-screen-modal show">
            <span class="close-button">&times;</span>
            <div class="search-modal-content"></div>
        </div>`;

    const searchModalContent = searchModalContainer.querySelector('.search-modal-content');

    if (foundMovies.length === 0) {
        searchModalContent.innerHTML = 'No search found';
    } else {
        foundMovies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'search-movie-title';
            movieDiv.textContent = movie.title;
            movieDiv.onclick = () => openMovieModal(`#modal-${movie.id}`);
            searchModalContent.appendChild(movieDiv);
        });
    }

    // Close button functionality
    const closeButton = searchModalContainer.querySelector('.close-button');
    closeButton.onclick = () => {
        searchModalContainer.innerHTML = '';
    };
}

function openMovieModal(movieId) {
    document.querySelector(movieId).style.display = 'block';
    document.getElementById('search-modal-container').innerHTML = '';
}
document.querySelectorAll('.buy-ticket-button').forEach(function(button) {
    button.addEventListener('click', function() {
        console.log('Buy Ticket button was clicked.');

        // Attempt to display the confirmation modal
        var confirmationModal = document.querySelector('.confirmation-modal');
        if (confirmationModal) {
            console.log('Confirmation modal found:', confirmationModal);
            confirmationModal.style.display = 'block';
        } else {
            console.log('Confirmation modal not found. Please check the class name.');
        }
    });
});