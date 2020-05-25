
import api from './api';


class App {
    constructor() {
        this.repositories = [];

        this.form = document.getElementById('repo-form');
        this.input = document.querySelector('input[name=repository]');
        this.list = document.getElementById('repo-list');


        this.registerHandlers();
    }

    registerHandlers() {
        this.form.onsubmit = event => this.addRepository(event);
    }
    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.input.value;

        if(repoInput.length === 0)
            return;

        const response = await api.get(`/repos/${repoInput}`);

        console.log(response);

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url
        });

        this.render();

    }

    render(){
        this.list.innerHTML = '';

        this.repositories.forEach(repo => {
            let img = document.createElement('img');
            img.setAttribute('src', repo.avatar_url);

            let title = document.createElement('strong');
            title.appendChild(document.createTextNode(repo.name));

            let description  = document.createElement('p');
            description.appendChild(document.createTextNode(repo.description));

            let link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.appendChild(document.createTextNode('Acessar'));

            let listItem = document.createElement('li');
            listItem.appendChild(img);
            listItem.appendChild(title);
            listItem.appendChild(description);
            listItem.appendChild(link);

            this.list.appendChild(listItem);

        });

    }

}

new App();
