// Yemen Phone App Logic
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContacts(filterText = '', filterNetwork = '') {
  const list = document.getElementById('contactsList');
  list.innerHTML = '';
  contacts
    .filter(c => (c.name.includes(filterText) || c.number.includes(filterText)))
    .filter(c => (filterNetwork ? c.network === filterNetwork : true))
    .forEach(c => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${c.name}</h3><p>📞 ${c.number}</p><p>📡 ${c.network}</p>`;
      list.appendChild(card);
    });
}

function addContact() {
  const name = prompt('أدخل الاسم:');
  const number = prompt('أدخل الرقم:');
  const network = prompt('أدخل الشبكة (yemenmobile, sabafon, y, u):');
  if (name && number && network) {
    contacts.push({ name, number, network });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
  }
}

document.getElementById('searchInput').addEventListener('input', e => {
  renderContacts(e.target.value, document.getElementById('networkFilter').value);
});
document.getElementById('networkFilter').addEventListener('change', e => {
  renderContacts(document.getElementById('searchInput').value, e.target.value);
});

window.onload = () => renderContacts();
