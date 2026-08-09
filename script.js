let donations = JSON.parse(localStorage.getItem('narar_donations')) || [];

function addDonation() {
  let name = document.getElementById('name').value.trim();
  let date = document.getElementById('date').value;
  let amount = parseFloat(document.getElementById('amount').value);
  let village = document.getElementById('village').value.trim();

  if(!name || !date || !amount) { 
    alert("Please fill Name, Date and Amount"); 
    return; 
  }

  donations.push({name, date, amount, village});
  localStorage.setItem('narar_donations', JSON.stringify(donations));
  showDonations();
  
  document.getElementById('name').value = "";
  document.getElementById('date').value = "";
  document.getElementById('amount').value = "";
  document.getElementById('village').value = "";
}

function showDonations() {
  let table = ""; 
  let monthlyTotal = 0;
  let currentMonth = new Date().toISOString().slice(0,7);
  
  donations.forEach((d, i) => {
    table += `<tr>
      <td>${d.name}</td>
      <td>${d.date}</td>
      <td>${d.amount.toLocaleString()}</td>
      <td>${d.village}</td>
      <td><button class="del-btn" onclick="deleteDonation(${i})">Delete</button></td>
    </tr>`;
    if(d.date.startsWith(currentMonth)) monthlyTotal += d.amount;
  });
  
  document.getElementById('donationTable').innerHTML = table;
  let monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  document.getElementById('monthlyTotal').innerHTML = `Total Donations for ${monthName}: Rs ${monthlyTotal.toLocaleString()}`;
}

function deleteDonation(i) {
  if(confirm("Delete this record?")) {
    donations.splice(i, 1);
    localStorage.setItem('narar_donations', JSON.stringify(donations));
    showDonations();
  }
}

showDonations();

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', () => {
  deferredPrompt.prompt(); 
  deferredPrompt = null;
});