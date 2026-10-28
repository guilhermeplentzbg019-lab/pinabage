// --- DADOS E GERENCIAMENTO DO ACERVO, ARTISTAS, VÍDEOS E USUÁRIOS (PINABAGE.COM) ---

const IMAGEM_PADRAO = 'imagens/obra1.jpg';

// Obras padrão
const obrasIniciais = [
    { id: 1, titulo: "Natureza-Morta com Flores", autor: "Adriana Riet", ano: "2024", tipo: "Pintura", img: "imagens/obra1.jpg", desc: "Obra em acrílico sobre tela retratando arranjos florais com texturas expressivas." },
    { id: 2, titulo: "Estudo Floral", autor: "Aline Fontoura de Leon", ano: "2023", tipo: "Pintura", img: "imagens/obra2.jpg", desc: "Composição delicada em aquarela explorando a leveza e transparência das pétalas." },
    { id: 3, titulo: "Figura Feminina e Ânfora", autor: "Amélia Teresinha Pinheiro", ano: "2021", tipo: "Desenho", img: "imagens/obra3.jpg", desc: "Estudo focado na figura humana e elementos tradicionais de cerâmica." }
];

// Artistas padrão (atualizados com foto, nascimento e obras do artista)
const artistasIniciais = [
    { 
        id: 1, 
        nome: "Adriana Riet", 
        origem: "Bagé, RS", 
        nascimento: "15/05/1970",
        fotoPerfil: "imagens/obra1.jpg",
        bio: "Adriana Bernardi Riet possui formação em Farmácia, mas encontrou na Arte a sua grande paixão. Iniciou seus estudos de pintura em Florianópolis (1994), participando de diversas exposições e desenvolvendo uma linguagem expressiva única no sul do estado.",
        obrasArtista: [
            { titulo: "Composição Pampeana", ano: "2022", img: "imagens/obra1.jpg", desc: "Estudo de cores acrílicas sobre tela." }
        ]
    },
    { 
        id: 2, 
        nome: "Aline de Leon", 
        origem: "Dom Pedrito, RS", 
        nascimento: "20/08/1968",
        fotoPerfil: "imagens/obra2.jpg",
        bio: "Aline Fontoura de Leon reside em Bagé e decidiu trilhar o caminho das artes, encontrando na aquarela a plenitude de sua criação e o retrato sensível das paisagens da região.",
        obrasArtista: [
            { titulo: "Aquarela do Pampa", ano: "2021", img: "imagens/obra2.jpg", desc: "Paisagem em técnica mista sobre papel." }
        ]
    }
];

// Vídeos padrão
const videosIniciais = [
    { 
        id: 1, 
        titulo: "A Gravura Social de Bagé", 
        categoria: "Documentário", 
        desc: "Registro histórico detalhando o Clube de Gravura de Bagé e seus fundadores.", 
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    }
];

// Usuários padrão (Senha do admin: 123)
const usuariosIniciais = [
    { id: 1, usuario: "admin", senha: "123", role: "admin" }
];

// --- FUNÇÕES DE OBRAS ---
function getObras() {
    const salvo = localStorage.getItem('obras_pinabage');
    if (!salvo) {
        localStorage.setItem('obras_pinabage', JSON.stringify(obrasIniciais));
        return obrasIniciais;
    }
    return JSON.parse(salvo);
}

function salvarObra(novaObra) {
    const obras = getObras();
    novaObra.id = Date.now();
    obras.unshift(novaObra);
    localStorage.setItem('obras_pinabage', JSON.stringify(obras));
}

function atualizarObra(obraAtualizada) {
    let obras = getObras();
    obras = obras.map(o => o.id === obraAtualizada.id ? obraAtualizada : o);
    localStorage.setItem('obras_pinabage', JSON.stringify(obras));
}

function deletarObra(id) {
    let obras = getObras();
    obras = obras.filter(o => o.id !== id);
    localStorage.setItem('obras_pinabage', JSON.stringify(obras));
}

// --- FUNÇÕES DE ARTISTAS ---
function getArtistas() {
    const salvo = localStorage.getItem('artistas_pinabage');
    if (!salvo) {
        localStorage.setItem('artistas_pinabage', JSON.stringify(artistasIniciais));
        return artistasIniciais;
    }
    return JSON.parse(salvo);
}

function salvarArtista(novoArtista) {
    const artistas = getArtistas();
    novoArtista.id = Date.now();
    if (!novoArtista.obrasArtista) novoArtista.obrasArtista = [];
    artistas.unshift(novoArtista);
    localStorage.setItem('artistas_pinabage', JSON.stringify(artistas));
}

function atualizarArtista(artistaAtualizado) {
    let artistas = getArtistas();
    artistas = artistas.map(a => a.id === artistaAtualizado.id ? artistaAtualizado : a);
    localStorage.setItem('artistas_pinabage', JSON.stringify(artistas));
}

function deletarArtista(id) {
    let artistas = getArtistas();
    artistas = artistas.filter(a => a.id !== id);
    localStorage.setItem('artistas_pinabage', JSON.stringify(artistas));
}

// --- FUNÇÕES DE VÍDEOS ---
function getVideos() {
    const salvo = localStorage.getItem('videos_pinabage');
    if (!salvo) {
        localStorage.setItem('videos_pinabage', JSON.stringify(videosIniciais));
        return videosIniciais;
    }
    return JSON.parse(salvo);
}

function salvarVideo(novoVideo) {
    const videos = getVideos();
    novoVideo.id = Date.now();
    videos.unshift(novoVideo);
    localStorage.setItem('videos_pinabage', JSON.stringify(videos));
}

function deletarVideo(id) {
    let videos = getVideos();
    videos = videos.filter(v => v.id !== id);
    localStorage.setItem('videos_pinabage', JSON.stringify(videos));
}

// --- FUNÇÕES DE USUÁRIOS E AUTENTICAÇÃO ---
function getUsuarios() {
    const salvo = localStorage.getItem('usuarios_pinabage');
    if (!salvo) {
        localStorage.setItem('usuarios_pinabage', JSON.stringify(usuariosIniciais));
        return usuariosIniciais;
    }
    return JSON.parse(salvo);
}

function cadastrarUsuario(usuario, senha) {
    const usuarios = getUsuarios();
    if (usuarios.find(u => u.usuario.toLowerCase() === usuario.toLowerCase())) {
        return { sucesso: false, mensagem: "Este nome de usuário já existe!" };
    }
    const novo = { id: Date.now(), usuario: usuario, senha: senha, role: "comum" };
    usuarios.push(novo);
    localStorage.setItem('usuarios_pinabage', JSON.stringify(usuarios));
    return { sucesso: true, mensagem: "Conta criada com sucesso! Faça login." };
}

function fazerLogin(usuario, senha) {
    const usuarios = getUsuarios();
    const u = usuarios.find(item => item.usuario.toLowerCase() === usuario.toLowerCase() && item.senha === senha);
    if (u) {
        sessionStorage.setItem('usuario_logado', JSON.stringify(u));
        return { sucesso: true, usuario: u };
    }
    return { sucesso: false, mensagem: "Usuário ou senha incorretos!" };
}

function getUsuarioLogado() {
    const logado = sessionStorage.getItem('usuario_logado');
    return logado ? JSON.parse(logado) : null;
}

function fazerLogout() {
    sessionStorage.removeItem('usuario_logado');
    window.location.href = "login.html";
}