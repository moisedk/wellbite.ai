import React, { useState } from 'react';

const FoodCollector = () => {
  const [foodItem, setFoodItem] = useState('');   // State for the current food input
  const [foodList, setFoodList] = useState([]);   // State for the list of food items
  const [successMessage, setSuccessMessage] = useState('');  // Success message
  const [errorMessage, setErrorMessage] = useState('');      // Error message
  const [saveMessage, setSaveMessage] = useState('');        // Save confirmation message
  const [isFormVisible, setIsFormVisible] = useState(true);  // State to toggle form visibility

  // Handle input changes
  const handleChange = (e) => {
    setFoodItem(e.target.value);
  };

  // Handle form submission to add food to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (foodItem.trim()) {
      setFoodList([...foodList, foodItem]);   // Add the food item to the list
      setFoodItem('');  // Clear input field
      setSuccessMessage(`"${foodItem}" has been added to your food list.`);
      setErrorMessage('');  // Clear previous error message
    } else {
      setErrorMessage('Please enter a valid food name.');
      setSuccessMessage('');
    }
  };

  // Handle removing a food item from the list
  const removeFoodItem = (index) => {
    const updatedList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedList);
  };

  // Handle saving the food list to the server
  const handleSave = async () => {
    if (foodList.length === 0) {
      setSaveMessage('No food items to save.');
      return;
    }
  
    // Immediately hide the form and show a saving message
    setIsFormVisible(false);
    setSaveMessage('Processing... Please wait.');
  
    try {
      const response = await fetch('http://localhost:8787', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodSource: 'text', 
          foodList: foodList,
          restrictions: 'Mango, Apple, Banana',
        }),
      });
  
      const data = await response.json();
      console.log('Food list saved:', data);
  
      if (response.ok) {
        const formattedResponse = formatResponse(data.response);  // Format the response
        setSaveMessage(formattedResponse);
        setErrorMessage('');
      } else {
        setSaveMessage('Failed to save the food list.');
      }
    } catch (error) {
      console.error('Error during saving:', error);
      setSaveMessage('An error occurred while saving.');
    }
  };
  
  // Function to format the response
  const formatResponse = (response) => {
    // Replace newlines with <br/>
    let formatted = response.replace(/\n/g, '<br/>');
  
    // Convert bold markdown (**text**) to <strong> tags
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Convert list markdown (* text) to HTML list items
    formatted = formatted.replace(/\* (.*?)(<br\/>|$)/g, '<li>$1</li>');
  
    // Wrap list items in <ul> tags
    formatted = formatted.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
  
    return formatted;
  };
  

  return (
    <div className="flex items-center justify-center" style={{ paddingTop: '10px' }}>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md" style={{ margin: '0 auto' }}>
        
        {/* Conditionally render either the form or the save message */}
        {isFormVisible ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-center text-gray-800">Food List</h2>

            {/* Form to add food */}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="foodItem" className="block text-sm font-medium text-gray-700">
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodItem"
                  id="foodItem"
                  value={foodItem}
                  onChange={handleChange}
                  placeholder="Enter food name..."
                  className="mt-1 p-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-1 px-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add +
              </button>
            </form>

            {/* Display success or error messages */}
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

            {/* Display the list of added food items */}
            <div className="mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              <ul>
                {foodList.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-1 border-b border-gray-200"
                  >
                    {item}
                    <button
                      onClick={() => removeFoodItem(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove x
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              className="w-full bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
            >
              Submit
            </button>
          </>
        ) : (
          // Display the save message when form is hidden
          <div 
          className="text-center" 
          style={{ 
            maxHeight: '150px', 
            overflowY: 'auto', 
            whiteSpace: 'pre-wrap' 
          }}
        >
          <p 
            className="text-blue-500 mt-2" 
            dangerouslySetInnerHTML={{ __html: saveMessage }}
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default FoodCollector;
