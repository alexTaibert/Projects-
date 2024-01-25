//COMP 3450:<Zarin, Tazrian, Alex>

function toggleFilterMenu(button) {
    button.classList.toggle('active');
    const filterMenu = document.getElementById('filterMenu');
    filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
}
function closeFilterMenu() {
    const filterMenu = document.getElementById('filterMenu');
    filterMenu.style.display = 'none';
    const button = document.querySelector('.hamburger-button');
    button.classList.remove('active');
}
