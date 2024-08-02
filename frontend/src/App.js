// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Options for the dropdown
const fieldOptions = [
  { value: 'is_success', label: 'Success' },
  { value: 'user_id', label: 'User ID' },
  { value: 'email', label: 'Email' },
  { value: 'roll_number', label: 'Roll Number' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' },
];

function App() {
  const [input, setInput] = useState(''); // State for user input
  const [responseData, setResponseData] = useState(null); // State for processed data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedFields, setSelectedFields] = useState([]); // State for selected fields

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    // Split input into array of trimmed values
    const data = input.split(',').map((value) => value.trim());

    try {
      // Send POST request to backend with array of values
      const response = await axios.post('http://localhost:8080/api/data/process', { data });
      setResponseData(response.data); // Set data to response from backend
    } catch (error) {
      // Handle errors if the request fails
      setError('Failed to process data. Please try again.');
      console.error('Error processing data:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Handle selection of fields in the dropdown
  const handleSelectChange = (selectedOptions) => {
    setSelectedFields(selectedOptions || []);
  };

  return (
    <div className="App">
      <h1>Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter comma-separated values"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>Choose Fields to Display:</h2>
          <Select
            isMulti
            options={fieldOptions}
            onChange={handleSelectChange}
            placeholder="Select fields..."
          />

          <h2>Processed Data:</h2>
          <ul>
            {selectedFields.some(field => field.value === 'is_success') && (
              <li><strong>Success:</strong> {responseData.is_success ? 'Yes' : 'No'}</li>
            )}
            {selectedFields.some(field => field.value === 'user_id') && (
              <li><strong>User ID:</strong> {responseData.user_id}</li>
            )}
            {selectedFields.some(field => field.value === 'email') && (
              <li><strong>Email:</strong> {responseData.email}</li>
            )}
            {selectedFields.some(field => field.value === 'roll_number') && (
              <li><strong>Roll Number:</strong> {responseData.roll_number}</li>
            )}
            {selectedFields.some(field => field.value === 'numbers') && (
              <li><strong>Numbers:</strong> {responseData.numbers.join(', ')}</li>
            )}
            {selectedFields.some(field => field.value === 'alphabets') && (
              <li><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</li>
            )}
            {selectedFields.some(field => field.value === 'highest_alphabet') && (
              <li><strong>Highest Alphabet:</strong> {responseData.highest_alphabet.join(', ')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
