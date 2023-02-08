const toastsNotification = document.getElementById('toasts');
function createNotification(message = null, type = null) {
    firstLetterCapital(message);
    const displayNotification = document.createElement('div');
    displayNotification.classList.add('toasts');
    displayNotification.classList.add(type);

    displayNotification.innerText = firstLetterCapital(message);

    toastsNotification.appendChild(displayNotification);

    setTimeout(() => {
        displayNotification.remove();
    }, 3000);
}

function firstLetterCapital(text) {
  return text.split(" ").map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}