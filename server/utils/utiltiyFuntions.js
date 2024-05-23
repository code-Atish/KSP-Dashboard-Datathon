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
  

module.exports = extractRank