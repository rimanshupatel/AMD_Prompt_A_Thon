export const getCity = async (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve("Unknown");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`);
        const data = await res.json();
        resolve(data.city || data.locality || "Unknown");
      } catch (e) {
        resolve("Unknown");
      }
    }, () => resolve("Unknown"));
  });
};
