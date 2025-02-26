// First charts
     var options = {
          series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
          chart: { 
            height: 280,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Income',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

// Second charts 
var options = {
     series: [{
       name: "Desktops",
       data: [148, 91, 69, 62, 52, 49, 35, 20, 11]
   }],
     chart: { 
       height: 280,
     type: 'line',
     zoom: {
       enabled: false
     }
   },
   colors: ['#d92002'],
   dataLabels: {
     enabled: false
   },
   stroke: {
     curve: 'straight'
   },
   title: {
     text: 'Expense',
     align: 'left'
   },
   grid: {
     row: {
       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
       opacity: 0.5
     },
   },
   xaxis: {
     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
   }
   };

   var chart = new ApexCharts(document.querySelector("#chart2"), options);
   chart.render();

// For calculate 

function calculatePayroll() {
    // Get values from form
    const employeeName = document.getElementById("employeeName").value;
    const position = document.getElementById("position").value;
    const absenceDays = parseInt(document.getElementById("absenceDays").value) || 0;
    const lateDays = parseInt(document.getElementById("lateDays").value) || 0;

    // Salary structure
    const salaries = {
        "HR": 1000,
        "Internship": 300,
        "Finance": 1200,
        "Designer": 1000,
        "Boss": 2500
    };

    let baseSalary = salaries[position];

    // Deduction calculation
    let absenceDeduction = (baseSalary * 0.10) * absenceDays; // 10% per absent day
    let lateDeduction = (baseSalary * 0.05) * lateDays; // 5% per late day

    let totalDeductions = absenceDeduction + lateDeduction;
    let finalSalary = baseSalary - totalDeductions;

    // Apply tax (10%)
    const tax = finalSalary * 0.10;
    finalSalary -= tax;

    // Display results in modal
    document.getElementById("resultEmployee").textContent = employeeName;
    document.getElementById("resultPosition").textContent = position;
    document.getElementById("resultAttendance").innerHTML = 
        `Absent: ${absenceDays}, Late: ${lateDays}`;
    document.getElementById("baseSalary").textContent = baseSalary.toFixed(2);
    document.getElementById("resultSalary").textContent = finalSalary.toFixed(2);

    // Show result modal
    new bootstrap.Modal(document.getElementById("payrollResultModal")).show();
}

// For sidebar in mobile

const navbar = document.getElementById('navbar')
const openButton = document.getElementById('open-sidebar-button')
const media = window.matchMedia("(width < 768px")

function openSidebar (){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expand','true')
    navbar.removeAttribute('inert')
}
function closeSidebar (){
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expand','false')
}
