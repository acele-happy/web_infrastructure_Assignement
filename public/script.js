const fetchNutrition = async () => {
  const food = document.getElementById("foodInput").value.trim();
  if (!food) return;

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "Loading...";

  try {
    const res = await fetch(`/api/nutrition?query=${encodeURIComponent(food)}`);
    const data = await res.json();
    console.log(data + "heree")

    if (!Array.isArray(data) || data.length === 0) {
      resultBox.innerHTML = "No data found for that food item.";
      return;
    }

    const item = data[0];
    resultBox.innerHTML = `
      <p><strong>Item:</strong> ${item.name}</p>
      <p><strong>Sugar:</strong> ${item.sugar_g}</p>
      <p><strong>Potassium:</strong> ${item.potassium_mg}g</p>
      <p><strong>Carbs:</strong> ${item.carbohydrates_total_g}g</p>
      <p><strong>Fat:</strong> ${item.fat_total_g}g</p>
      <p><strong>Fiber:</strong> ${item.fiber_g}</p>
    `;
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "Failed to fetch data.";
  }
};
