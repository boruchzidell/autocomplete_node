let Autocomplete = {
  wrapInput() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');

    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    // overlay.style.width = `${this.input.clientWidth}px`  // see what happens without this
    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  handlers() {
    let url = this.url;
    let listUI = this.listUI;
    let input = this.input;

    this.input.addEventListener('input', function (event) {
      let query = this.value;

      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', () => {
        let response = xhr.response;

        listUI.innerHTML = '';
        response.forEach((country) => {
          let li = document.createElement('li');
          li.innerHTML = country.name;
          listUI.appendChild(li);
        });
      });

      xhr.open('get', `${url}${query}`);
      xhr.send();
    });

    listUI.addEventListener('click', function (event) {
      input.value = event.target.textContent;
    });

    input.addEventListener('keydown', function (event) {
      console.log(event);
    });
  },

  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.wrapInput();
    this.createUI();

    this.handlers();

    // this.overlay.textContent = 'test';
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
});
