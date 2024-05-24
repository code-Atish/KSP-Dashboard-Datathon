function generateRandomColor() {
    // Generate random values for red, green, and blue channels
    
    const r = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random number between 0 and 255
    
    // Construct a CSS color string using the RGB values
    const color = `rgb(${r}, ${g}, ${b})`;
    
    return color;
}

function getRandomColor(count) {
    return Array.from({ length: count }, () => generateRandomColor(count));
}

function countElements(array) {
    // Create an empty object to store counts
    const counts = {};

    // Loop through the array
    array.forEach(item => {
        // If the item is not in the counts object, initialize its count to 1
        // Otherwise, increment its count by 1
        counts[item.fir_stage] = (counts[item.fir_stage] || 0) + 1;
    });

    // Return the counts object
    return counts;
}

const policeRanks = {
    "Dy.SP": "Deputy Superintendent of Police",
    "ASI": "Assistant Sub-Inspector",
    "PI": "Police Inspector",
    "PSI": "Police Sub-Inspector",
    "HC" : "Head Constable"
};
function formatString(str) {
    // Remove underscores and replace them with spaces
    let result = str.split('_').join(' ');
    result = result.charAt(0).toUpperCase() + result.slice(1);

    // Add spaces before uppercase letters (not preceded by a space)
    result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    return result;
  }
  
export {getRandomColor,countElements,policeRanks,formatString}