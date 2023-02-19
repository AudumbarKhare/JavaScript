class notification {
    // const toastsNotification = document.getElementById('toasts');
    showSuccess(toastsNotification = null, message = null, type = null) {
        const displayNotification = document.createElement('div');
        displayNotification.innerHTML = this.displayToasts(message, type);
        toastsNotification.appendChild(displayNotification);
        this.toastaProgressBar();

        setTimeout(() => {
            displayNotification.remove();
        }, 3000);
    }

    // (text) {
    //     return text.split(" ").map((word) => {
    //         return word[0].toUpperCase() + word.substring(1);
    //     }).join(" ");
    // }

    displayToasts(message, type) {
        return ` <div class="${type} toasts-type">
        <div class="toasts-progress" id="toasts-progress"></div>
        <div class="show-toasts">
            <i class="fa ${this.selectIcon(type)}" id="start-icon"></i>
            <div class="toasts-heading">
                <div class="toasts-title">${message}</div>
                <div class="toasts-sub-title"></div>
            </div>
        </div>

    </div>`;
    }

    toastaProgressBar() {
        let i = 0;
        if (i == 0) {
            i = 1;
            var toastsProgress = document.getElementById('toasts-progress');
            var width = 100;
            console.log(toastsProgress);
            var interval = setInterval(() => {
                if (width <= 0) {
                    clearInterval(interval);
                    i = 0;
                } else {
                    width--;
                    toastsProgress.style.width =  width + "%";
                }
            }, 30);
        }

    }

    selectIcon(type){
        var type = type.toLowerCase();
        switch(type){
            case 'success':
                return 'fa-check';
                break;
            case 'info':
                return 'fa-info-circle';
                break;
            case 'error':
                return 'fa-times-circle';
                break;
            case 'warning':
                return 'fa-exclamation-triangle';
                break;
            default:
                return '';
        }
    }
}
export default notification;