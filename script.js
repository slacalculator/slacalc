function calculate() {
  // Get the selected period values from checkboxes
  const checkboxes = document.querySelectorAll('#periodsDropdown input[type="checkbox"]:checked');
  const periodValues = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
  
  // Get the total downtime value
  const downtimeInput = document.getElementById("downtime");
  const downtimeValue = parseInt(downtimeInput.value);
  
  // Calculate the total uptime percentage
  const totalMinutes = periodValues.reduce((sum, value) => sum + value, 0);
  const uptimePercentage = ((totalMinutes - downtimeValue) / totalMinutes) * 100;
  
  // Display the result
  const resultElement = document.getElementById("output");
  resultElement.innerHTML = "Total uptime: " + uptimePercentage.toFixed(3) + "%";
}

function updatePeriodOptions() {
  // Get the dropdown content element for periods
  const periodsDropdown = document.getElementById("periodsDropdown");
  
  // Clear the current options
  periodsDropdown.innerHTML = "";
  
  // Get the selected period type (Quarter or Month)
  const periodTypeSelect = document.getElementById("periodType");
  const periodType = periodTypeSelect.value;
  
  // Define the number of minutes in each month (non-leap year and leap year)
  const months = {
    "January": { normal: 44640, leap: 44640 },
    "February": { normal: 40320, leap: 41760 },
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
  
  // Define the number of minutes in each quarter (non-leap year and leap year)
  const quarters = {
    "Q1": { normal: 129600, leap: 131040 },
    "Q2": { normal: 131040, leap: 131040 },
    "Q3": { normal: 132480, leap: 132480 },
    "Q4": { normal: 132480, leap: 132480 }
  };
  
  // Determine if the current year is a leap year
  const currentYear = new Date().getFullYear();
  const isLeapYear = (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0));
  
  // Add options based on the selected period type
  if (periodType === "Quarter") {
    for (const [quarter, values] of Object.entries(quarters)) {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = isLeapYear ? values.leap : values.normal;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(quarter + (isLeapYear ? " (leap year)" : "")));
      periodsDropdown.appendChild(label);
    }
  } else if (periodType === "Month") {
    for (const [month, values] of Object.entries(months)) {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = isLeapYear ? values.leap : values.normal;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(month + (isLeapYear ? " (leap year)" : "")));
      periodsDropdown.appendChild(label);
    }
  }
}

// Initialize the period options on page load
window.onload = updatePeriodOptions;
