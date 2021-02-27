const getYear = () => {
    const date = new Date();
    return date.getFullYear();
}

document.getElementById('year').textContent = getYear() + ' - ';