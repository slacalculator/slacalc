function calculate() {
  // Get the selected period value
  const periodSelect = document.getElementById("period");
  const periodValue = periodSelect.options[periodSelect.selectedIndex].value;
  
  // Get the total downtime value
  const downtimeInput = document.getElementById("downtime");
  const downtimeValue = downtimeInput.value;
  
  // Calculate the total uptime percentage
  const totalMinutes = parseInt(periodValue);
  const totalDowntime = parseInt(downtimeValue);
  const uptimePercentage = ((totalMinutes - totalDowntime) / totalMinutes) * 100;
  
  // Display the result
  const resultElement = document.getElementById("output");
  resultElement.innerHTML = "Total uptime: " + uptimePercentage.toFixed(3) + "%";
}

function updatePeriodOptions() {
  const periodSelect = document.getElementById("period");
  periodSelect.innerHTML = "";

  const periodTypeSelect = document.getElementById("periodType");
  const periodType = periodTypeSelect.options[periodTypeSelect.selectedIndex].value;

  const currentYear = new Date().getFullYear();
  const isLeapYear = (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0));

  const months = {
    "January": { normal: 44640, leap: 44640 },
    "February Non-leap-year": { normal: 40320, leap: 40320 },
    "February Leap-year": { normal: 41760, leap: 41760 },
    "March": { normal: 44640, leap: 44640 },
    "April": { normal: 43200, leap: 43200 },
    "May": { normal: 44640, leap: 44640 },
    "June": { normal: 43200, leap: 43200 },
    "July": { normal: 44640, leap: 44640 },
    "August": { normal: 44640, leap: 44640 },
    "September": { normal: 43200, leap: 43200 },
    "October": { normal: 44640, leap: 44640 },
    "November": { normal: 43200, leap: 43200 },
    "December": { normal: 44640, leap: 44640 }
  };

  const quarters = {
    "Q1": { normal: 129600, leap: 131040 },
    "Q1 Leap-Year": { normal: 131040, leap: 131040 },
    "Q2": { normal: 131040, leap: 131040 },
    "Q3": { normal: 132480, leap: 132480 },
    "Q4": { normal: 132480, leap: 132480 }
  };

  // Add options based on the selected period type
  if (periodType === "Quarter") {
    for (const [quarter, values] of Object.entries(quarters)) {
      const option = document.createElement("option");
      option.value = isLeapYear ? values.leap : values.normal;
      option.text = quarter + (isLeapYear ? " (leap year)" : "");
      periodSelect.add(option);
    }
  } else if (periodType === "Month") {
    for (const [month, values] of Object.entries(months)) {
      const option = document.createElement("option");
      option.value = isLeapYear ? values.leap : values.normal;
      option.text = month + (isLeapYear ? " (leap year)" : "");
      periodSelect.add(option);
    }
  } else if (periodType === "Week") {
    for (let i = 1; i <= 4; i++) {
      const option = document.createElement("option");
      option.value = 10080; // 7 days * 24 hours * 60 minutes = 10080 minutes
      option.text = `Week ${i}`;
      periodSelect.add(option);
    }
  }
}
// Initialize the period options on page load
window.onload = updatePeriodOptions;
