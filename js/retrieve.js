let alldata;
let sorted;
let filteredData;


const tbody = document.querySelector('#tabelle tbody');
console.log(tbody);
fetch('../json/data.json')
.then(response => response.json())
  .then(data => {
    console.log(data);
    alldata=data;
    anwendenFilter();
    buildTable();
    
  })
.catch(error => console.error('Fehler beim Laden der JSON:', error));

function sortieren(criteria){
console.log(criteria)
  switch (criteria){
    case ("rang"):
      filteredData.sort((a, b) => Number(a.rang) - Number(b.rang));
      break;
    case("typ"):
      filteredData.sort((a, b) => a.typ.localeCompare(b.typ));
      break;
    case("name"):
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case("co2"):
      filteredData.sort((a, b) => Number(a.co2) - Number(b.co2));
      break;
  }


  buildTable();
  
}

function buildTable(){
    console.log(filteredData);
    clearTable();
    filteredData.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.rang}</td>
        <td>${item.typ}</td>
        <td>${item.name}</td>
        <td>${item.co2}</td>
      `;
      tbody.appendChild(row);
    });
}

function clearTable() {
  const tbody = document.querySelector('#tabelle tbody');
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }
}

function anwendenFilter() {
  const kriterien = {
    name: document.getElementById('filter-name').value,
    typ: document.getElementById('filter-typ').value,
    maxCo2: document.getElementById('filter-maxco2').value,
    minRang: document.getElementById('filter-minrang').value
  };

  filteredData = alldata.filter(item => {
    const matchName = !kriterien.name || item.name.toLowerCase().includes(kriterien.name.toLowerCase());
    const matchTyp = !kriterien.typ || item.typ.toLowerCase().includes(kriterien.typ.toLowerCase());
    const matchCo2 = !kriterien.maxCo2 || Number(item.co2) <= Number(kriterien.maxCo2);
    const matchRang = !kriterien.minRang || Number(item.rang) >= Number(kriterien.minRang);
    return matchName && matchTyp && matchCo2 && matchRang;
  });

  buildTable();
}

function resetFilter() {
  document.getElementById('filter-name').value = "";
  document.getElementById('filter-typ').value = "";
  document.getElementById('filter-maxco2').value = "";
  document.getElementById('filter-minrang').value = "";

  filteredData = [...alldata];
  buildTable();
}