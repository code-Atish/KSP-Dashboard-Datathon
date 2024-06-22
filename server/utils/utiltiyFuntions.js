function extractRank(data) {
    return data.map(item => {
      const match = item.ioname.match(/\(([^)]+)\)/);
      const rank = match ? match[1] : null;
      const id = item.user_id
      const ioname = item.ioname.replace(/\s*\([^)]+\)\s*$/, '').trim();
      return {
        ioname,
        rank,
        id
      };
    });
  }
  
  function getCurrentISTDateTimeISO() {
    const now = new Date();

    // Get the current date and time in the Indian time zone
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const istDate = new Date(now.toLocaleString('en-US', options));

    // Get the date components
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');
    const hours = String(istDate.getHours()).padStart(2, '0');
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');

    // Format the date in ISO 8601 format with the time zone offset
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
    return isoString;
}


module.exports = {getCurrentISTDateTimeISO,extractRank}
