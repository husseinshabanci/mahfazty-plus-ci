fetch('http://localhost:1337/api/landing-page?populate=*')
  .then(res => res.json())
  .then(data => console.log("Real API Response:", JSON.stringify(data, null, 2)))
  .catch(err => console.error("Error fetching:", err));
