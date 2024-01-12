        function saveEvent() {
            // Get selected date
            var selectedDate = document.getElementById('eventDateTime').value;

            // Get event name
            var eventName = document.getElementById('eventName').value;

            // Do something with the selected date and event name
            alert('Event saved!\nEvent Name: ' + eventName + '\nDate and Time: ' + selectedDate);

            // Display the appointment in the appointments container
            displayAppointment(eventName, selectedDate);
        }

        // Function to display the appointment in the appointments container
        function displayAppointment(name, date) {
            const appointmentsContainer = document.getElementById('appointments');
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment-box');

            const detailsElement = document.createElement('div');
            detailsElement.classList.add('appointment-details');

            // Parse the date to a JavaScript Date object
            const parsedDate = new Date(date);

            // Format the time in 12-hour clock with AM/PM
            const formattedTime = parsedDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            detailsElement.textContent = `${name}'s appointment on ${formattedTime} ${parsedDate.toLocaleString('en-US', { weekday: 'long' })}, ${parsedDate.toLocaleString('en-US', { month: 'long' })} ${parsedDate.getDate()}`;

            const nameElement = document.createElement('div');
            nameElement.classList.add('appointment-name');
            nameElement.textContent = name;

            appointmentElement.appendChild(detailsElement);
            appointmentElement.appendChild(nameElement);

            appointmentsContainer.appendChild(appointmentElement);
        }

        // Initialize the calendar
        createCalendar();

        // Function to create the calendar
        function createCalendar() {
            var calendarHeader = document.getElementById('calendarHeader');
            var calendar = document.getElementById('calendar');
            var selectedMonthElement = null; // To store the selected month element
            var selectedDayElement = null; // To store the selected day element

            // Months array for header
            var months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            // Create month selectors
            months.forEach(function (month) {
                var monthSelector = document.createElement('div');
                monthSelector.className = 'month-selector';
                monthSelector.textContent = month;
                monthSelector.onclick = function () {
                    // Remove active class from the previous selected month
                    if (selectedMonthElement) {
                        selectedMonthElement.classList.remove('active');
                    }
                    // Add active class to the clicked month
                    monthSelector.classList.add('active');
                    // Update selectedMonthElement
                    selectedMonthElement = monthSelector;
                    updateCalendar(month);
                };
                calendarHeader.appendChild(monthSelector);
            });

            // Call updateCalendar with the initial month
            updateCalendar(months[0]);

            // Function to update the calendar for the selected month
            function updateCalendar(selectedMonth) {
                calendar.innerHTML = ''; // Clear previous content
                var daysInMonth = new Date(2024, months.indexOf(selectedMonth) + 1, 0).getDate();

                // Create day headers
                var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                daysOfWeek.forEach(function (day) {
                    var dayHeader = document.createElement('div');
                    dayHeader.className = 'day day-header';
                    dayHeader.textContent = day;
                    calendar.appendChild(dayHeader);
                });

                // Create days
                var firstDayOfMonth = new Date(2024, months.indexOf(selectedMonth), 1).getDay();

                for (var i = 1; i <= daysInMonth; i++) {
                    var dayElement = document.createElement('div');
                    dayElement.className = 'day';
                    dayElement.textContent = i;

                    // Calculate the correct index for the day based on the first day of the month
                    var dayIndex = (firstDayOfMonth + i - 1) % 7;

                    // Set the style to highlight the current day
                    if (dayIndex === 0) {
                        dayElement.classList.add('sunday');
                    } else if (dayIndex === 6) {
                        dayElement.classList.add('saturday');
                    }

                    dayElement.onclick = function () {
                        // Remove active class from the previous selected day
                        var activeDay = document.querySelector('.active-day');
                        if (activeDay) {
                            activeDay.classList.remove('active-day');
                        }

                        // Add active class to the clicked day
                        this.classList.add('active-day');

                        // Update selected date input when a day is clicked
                        var selectedDateTime = selectedMonth + ' ' + this.textContent;
                        var selectedTime = document.getElementById('timeSelector').value;
                        if (selectedTime) {
                            selectedDateTime += ' ' + selectedTime;
                        }
                        document.getElementById('eventDateTime').value = selectedDateTime;
                    };
                    calendar.appendChild(dayElement);
                }
            }
        }
