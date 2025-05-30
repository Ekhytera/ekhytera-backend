import { authUser } from "./auth.js";
import { showMenu } from "./forum.js";
import createToast from "./toast.js";

const fotoPerfil = document.querySelector('.fotoPerfil');

let userPost;
let userId;
let userFoto;

authUser().then(dados => {
	if (dados) {
		userPost = dados.nome_usuario;
		userId = dados.id_usuario;
		userFoto = dados.foto;
		console.log(userFoto);
		fotoPerfil.src = dados.foto ? `http://localhost:3000/files/${dados.foto}` : 'imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
	}
})

function addPost(settings) {
	function loadCategories() {
		let buttons = '';
		if (settings.categories.length > 0) {
			settings.categories.forEach(element => {
				buttons += `<button type="button" class="button secundario arredondado">${element}</button>`;
			});
		}
		return buttons;
	}

	let post = document.createElement('div');
	post.className = 'postWrapper';

	const htmlPost = `<article class="post" id="postagem" data-id="${settings.id}">
				<div class="postDetails">
					<div class="postAuthor">
					${!userFoto ?
						`<img class="fotoPerfil" src="imgs/${settings.pfp}"></img>` :
						`<img class="fotoPerfil" src="http://localhost:3000/files/${settings.pfp}"></img>`
					}
						
						<div>
							<span class="username">${settings.username}</span>
							<span class="subtitle">2h atrás</span>
						</div>
					</div>
					<div class="postAside">
						<div class="categoryButtons">
							${loadCategories()}                        
						</div>
						<div class="moreOptions">
							<button type="button" class="iconButton" onclick="showMenu(this)"><img src="imgs/moreOptions.png"></button>
						</div>
					</div>
				</div>
				<div class="postBody">
					<p>${settings.text}</p>
					${settings.attachment ? `<img src="imgs/${settings.attachment}">` : ''}
				</div>
				<hr>
				<div class="postFooter">
                    <div class="icon">
                        <button class="iconButton likeIcon" onclick=darLike(this)><span class="material-symbols-outlined">thumb_up</span>
                            <span class="likeCount">484</span>
                        </button>
                    </div>
                    <div class="icon">
                        <button class="share iconButton" onclick=compartilhar(this)><span class="material-symbols-outlined">share</span>
                            <span class="shareCount">560</span>
                        </button>
                    </div>
                    <div class="icon">
                        <button class="iconButton add-comment"><span class="material-symbols-outlined">sms</span>
                            <span class="comment">123</span>
                        </button>
                    </div>
				</div>
			</article>`;

	post.innerHTML = htmlPost;
	const postsContainer = document.getElementById('postsContainer');
	postsContainer.appendChild(post);
}

// Função dar Like -------------------------------

function darLike(el) {
	const likeCount = el.querySelector('.likeCount');
	if (userId) {
		if (!el.classList.contains('like')) {
			el.classList.add('like')
			likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;
		} else {
			el.classList.remove('like');
			likeCount.innerHTML = parseInt(likeCount.innerHTML) - 1;
		}
	} else {
		modal.classList.remove('hide');
	}
}

document.querySelector('.writePostContainer').addEventListener('click', function () {
	if (!userId) {
		modal.classList.remove('hide');
	}
})

// Função compartilhar -------------------------------------------
async function compartilhar(el) {
	const shareCount = el.querySelector('.shareCount');

	if (navigator.share) {
		try {
			await navigator.share({
				title: 'Olhe nosso Forum',
				text: 'Confira esses comentarios!',
				url: 'https://ekhytera.github.io/newEkhytera/forum.html'
			})
			shareCount.innerHTML++

		} catch (error) {
			console.error('Erro ao compartilhar:', error)
		}
	} else {
		createToast('Erro','Função de compartilhar não suportada pelo navegador.', 'vermelho')
	}
}


function addCommunities() {
	let comm = document.createElement('div');
	const htmlComm = `<section class="communitiesContainer">
				<h2>Comunidades</h2>
				<div>
					<button type="button" class="iconButton"><img src="imgs/arrow_left.png"></button>
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>NVIDIA Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>AMD Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					
					<div class="communityCard">
						<img class="communityIcon arredondado" src="imgs/codebackimg.png">
						<h3>Intel Fans</h3>
						<h4>126,309 membros</h5>
							<h5>
								<div class="statusIndicator"></div>63 online
							</h5>
							<button type="button" class="button primario">Entrar</button>
					</div>
					<button type="button" class="iconButton"><img src="imgs/arrow_right.png"></button>
				</div>
			</section>
`

	comm.innerHTML = htmlComm
	const commContainer = document.getElementById("communitiesContainer")

	commContainer.appendChild(comm)
}

const textArea = document.getElementById('writePostInput');

// Capturando informações do usuario logado


authUser().then(dados => {
	if (dados) {
		userPost = dados.nome_usuario;
		userId = dados.id_usuario;
	}
})

function postar() {
	if (userPost === null) {
		return
	}
	else if (textArea.value === '') {
		return
	}
	else {
		addPost({
			id: userId,
			username: userPost,
			pfp: userFoto ? userFoto : '1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
			text: document.getElementById('writePostInput').value,
			categories: ['Teste']
		});

		textArea.value = '';
		createToast("Informação", "Seu post foi enviado!", "padrao")
	}
}

addPost({
	id: 1,
	username: 'Usuário 1',
	pfp: 'pexels-danxavier-1239291.jpg',
	text: 'A placa de vídeo GT 730 roda Red Dead Redemption 2 em 4k?',
	attachment: 'gpubackimg.png',
	categories: ['Teste']
})

addPost({
	id: 2,
	username: 'Usuário 2',
	pfp: 'pexels-justin-shaifer-501272-1222271.jpg',
	text: 'Acredito que a UniFOA seja a melhor faculdade do mundo.',
	attachment: 'codebackimg.png',
	categories: ['Code']
})

addPost({
	id: 3,
	username: 'Usuário 3',
	pfp: 'pexels-jjagtenberg-103123.jpg',
	text: 'Como faz pra montar um pc gamer com 20 reais???',
	attachment: '',
	categories: ['Teste']
})


// definindo variaveis, constantes e funções globais:
window.postar = postar;
window.addCommunities = addCommunities;
window.compartilhar = compartilhar;
window.darLike = darLike;
window.showMenu = showMenu;
