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
const smapleFirValues = {
    district: 'Bengaluru City',
    UnitName: 'East Zone Women PS',
    FirNo: '0001/2016',
    RI: '1',
    year: '2016',
    Month: '1',
    Offence_From_Date: '00:00.0',
    Offence_To_Date: '00:00.0',
    FIR_Reg_DateTime: '10:00.0',
    Fir_Date: '07-13-2004',
    FIR_Type: 'Non Heinous',
    fir_stage: 'Pending Trial',
    Complaint_Mode: 'Written',
    CrimeGroup_Name: 'CRUELTY BY HUSBAND',
    CrimeHead_Name: 'CRUELTY BY HUSBAND',
    Latitude: '13.01528',
    Longitude: '77.390757',
    ActSection: 'IPC 1860 U/s: 498A,506',
    IOName: 'ANJUMALA T NAYAK (Dy.SP)',
    KGID: '1841136',
    IOAssignment: 'NaN',
    Internal_IO: '200045',
    place_of_offence: 'NO 5TH MAIN 1ST CROSS SPANDANA LAYOUT NEXT MOHREE, NO 5TH MAIN 1ST CROSS SPANDANA LAYOUT NEXT MOHREE',
    distance_from_ps: 'TOWORDS EAST 10 KM',
    beat_name: 'EAST DIVISION 2',
    village_area_name: 'BOWRING HOSPITAL',
    male: '2123',
    female: '1',
    boy: '0',
    girl: '0',
    age_0: '0',
    victim_count: '0',
    accused_count: '1',
    arrested_male: '1',
    arrested_female: '0',
    arrested_count_no: '1',
    accused_chargesheeted_count: '1',
    conviction_count: '0',
    fir_id: '2016000001',
    unit_id: '1978',
    crime_no: '10443100000000000'
  }
  
export {getRandomColor,countElements,policeRanks,formatString,smapleFirValues}