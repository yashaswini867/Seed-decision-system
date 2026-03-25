function checkResult() {

  let mode = document.getElementById("mode").value;
  let seed = document.getElementById("seed").value;
  let soil = document.getElementById("soil").value;
  let temp = document.getElementById("temp").value;

  let result = "";
  let color = "";

  // RULE 1: Hybrid seeds
  if (seed === "Hybrid") {
    result = "❌ Not Reusable\n";
    result += "Reason: Hybrid seeds lose traits in next generation.\n";
    result += "Awareness: Farmers need to buy hybrid seeds every season.\n";
    color = "red";
  }

  // RULE 2: Best case reuse
  else if (soil === "Good" && temp === "Medium") {
    result = "✅ Reusable\n";
    result += "Reason: Good soil and stable environmental conditions.\n";
    result += "Awareness: Local seeds can be reused and reduce cost.\n";
    color = "green";
  }

  // RULE 3: Risky condition
  else {
    result = "⚠️ Risky\n";
    result += "Reason: Soil or temperature conditions are not ideal.\n";
    result += "Awareness: Reuse may reduce yield.\n";
    color = "orange";
  }

  // Cost saving
  result += "Estimated Saving: ₹1000–₹2000 per season\n";

  // Mode info
  result += "Access Mode: " + mode;

  let box = document.getElementById("resultBox");
  box.innerText = result;
  box.style.backgroundColor = color;
}