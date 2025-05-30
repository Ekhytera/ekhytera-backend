import { authUser } from "./auth.js";
import createToast from "./toast.js"

const postInput = document.getElementById('writePostInput');
let cargo;
let userId;

authUser().then(dados => {
    if (dados) {
        cargo = dados.cargo;
        userId = dados.id_usuario;
    }
    console.log(dados)

    if (!userId) {
        postInput.setAttribute('readonly', 'true');
        postInput.setAttribute('placeholder', 'Faça login ou crie uma conta para fazer postagens.')
    }
})


function hideMenu() {
    const postOptionsList = document.getElementsByClassName('postOptions');
    if (postOptionsList.length > 0) {
        Array.from(postOptionsList).forEach(element => {
            element.style.height = '0px';
            element.style.opacity = '0%';
            setTimeout(() => { element.remove(); }, 1000);
        });
    }
}

function listItem(text) {
    const li = document.createElement('li');
    li.innerHTML = text;
    return li;
}

export function showMenu(caller) {
    const postElement = caller.closest('article');
    const userPostId = postElement.dataset.id;

    const postOptionsList = document.getElementsByClassName('postOptions');
    if (postOptionsList.length > 0) {
        Array.from(postOptionsList).forEach(element => {
            element.remove();
        });
    }

    const clickOutArea = document.createElement('div');
    clickOutArea.style.display = 'block';
    clickOutArea.style.position = 'fixed';
    clickOutArea.style.top = '0';
    clickOutArea.style.left = '0';
    clickOutArea.style.width = '100vw';
    clickOutArea.style.height = '100vh';
    clickOutArea.addEventListener('mouseup', (e) => { e.target.remove(); hideMenu(); });
    document.body.appendChild(clickOutArea);

    let postOptions = document.createElement('div');
    postOptions.classList.add('postOptions');
    const ul = document.createElement('ul');

    ul.appendChild(listItem('Salvar'));
    ul.appendChild(document.createElement('hr'));
    ul.appendChild(listItem('Denunciar'));
    ul.appendChild(document.createElement('hr'));
    ul.appendChild(listItem('Silenciar Usuário'));

    if (cargo === 'admin' || userId === userPostId) {
        ul.appendChild(document.createElement('hr'));
        const deleteOption = listItem('Deletar');
        deleteOption.classList.add('delete');

        deleteOption.addEventListener('click', function () {
            if (deleteOption.innerHTML === 'Deletar') {
                deleteOption.innerHTML = 'Confirmar';
                deleteOption.removeEventListener('click', arguments.caller);
                deleteOption.addEventListener('click', function () {
                    const post = caller.closest('.postWrapper');
                    if (post) {
                        document.body.removeChild(clickOutArea);
                        post.remove();
                        hideMenu();
                        createToast("Informação", "Post deletado com sucesso.", "vermelho")
                    }
                });
            }
        });
        ul.appendChild(deleteOption);
    }

    postOptions.appendChild(ul);
    document.getElementById('body').appendChild(postOptions);

    const buttonRect = caller.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    postOptions.style.left = (buttonRect.left + scrollLeft - buttonRect.width * 4) + 'px';
    postOptions.style.top = (buttonRect.top + scrollTop + buttonRect.height) + 'px';

    postOptions.style.height = '';
    postOptions.style.opacity = '100%';
}


