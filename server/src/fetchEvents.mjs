import axios from 'axios';

// Function to fetch events data using Axios
const fetchEventsData = async () => {
  try {
    const response = await axios.get('https://somersetcollegeprep.org/events-list');
    return response.data; // Assuming the response is JSON and contains an array of events
  } catch (error) {
    console.error('Error fetching events data:', error);
    return []; // Return an empty array in case of error
  }
};

export { fetchEventsData };
