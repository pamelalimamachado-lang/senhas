// BANCO DE DADOS DE SENHAS ABSURDAS
const pioresSenhas = [
    { senha: "senha", comentario: "Parabéns! Você usou a palavra secreta para facilitar a vida do invasor." },
    { senha: "123456", comentario: "O equivalente digital a trancar a casa e deixar a chave na fechadura do lado de fora." },
    { senha: "flamengo", comentario: "Seu time pode até ser campeão, mas a sua segurança foi rebaixada." },
    { senha: "batman", comentario: "Nem o Batman consegue proteger seus dados com uma senha dessas." },
    { senha: "mudar123", comentario: "Você aceitou o conselho do sistema de 'mudar a senha', mas levou muito ao pé da letra." },
    { senha: "asdfghjkl", comentario: "Apenas um passeio preguiçoso pelos dedos no teclado. Nota zero." },
    { senha: "iloveyou", comentario: "O amor é lindo, mas os hackers não terão nenhuma compaixão com você." }
];

// REQUISITO 1: LÓGICA DO GERADOR DE SENHAS ABSURDAS
const btnGerador = document.getElementById('btn-gerador');
const displayGerador = document.getElementById('display-gerador');
const textoSenha = document.getElementById('texto-senha');
const textoComentario = document.getElementById('texto-comentario');

btnGerador.addEventListener('click', () => {
    // Escolhe um elemento aleatório do array
    const indiceAleatorio = Math.floor(Math.random() * pioresSenhas.length);
    const senhaSorteada = pioresSenhas[indiceAleatorio];

    // Atualiza a interface
    textoSenha.textContent = `"${senhaSorteada.senha}"`;
    textoComentario.textContent = senhaSorteada.comentario;
    
    // Mostra a caixinha caso esteja escondida
    displayGerador.classList.remove('hidden');
});

// REQUISITO 2: MEDIDOR DE ABSURDO (VALIDADOR)
const inputSenha = document.getElementById('input-senha');
const barraProgresso = document.getElementById('barra-progresso');
const textoStatus = document.getElementById('texto-status');
const btnToggle = document.getElementById('btn-toggle');

inputSenha.addEventListener('input', () => {
    const valor = inputSenha.value;
    
    // Se estiver vazio
    if (valor.length === 0) {
        barraProgresso.style.width = '0%';
        textoStatus.textContent = 'Esperando você digitar...';
        textoStatus.style.color = '#9ca3af';
        return;
    }

    // Validação simples de nível
    let pontos = 0;
    
    // Critérios básicos de tamanho
    if (valor.length > 4) pontos += 1;
    if (valor.length >= 8) pontos += 1;
    if (valor.length >= 12) pontos += 1;
    
    // Mistura de caracteres (Regex simples)
    if (/[A-Z]/.test(valor) && /[0-9]/.test(valor)) pontos += 1;
    if (/[^A-Za-z0-9]/.test(valor)) pontos += 1; // Símbolos

    // Cruzamento com piores casos manjados
    const adaptada = valor.toLowerCase().trim();
    if (adaptada === "123456" || adaptada === "senha" || adaptada === "password" || adaptada === "123") {
        pontos = 0; // Penalidade máxima por burrice extrema
    }

    // Renderizando o feedback visual baseado na pontuação
    if (pontos <= 1) {
        barraProgresso.style.width = '25%';
        barraProgresso.style.backgroundColor = '#ef4444'; // Vermelho
        textoStatus.textContent = '🚨 Absurdamente Fraca! Um hacker adivinha piscando os olhos.';
        textoStatus.style.color = '#ef4444';
    } else if (pontos === 2 || pontos === 3) {
        barraProgresso.style.width = '60%';
        barraProgresso.style.backgroundColor = '#f59e0b'; // Amarelo
        textoStatus.textContent = '⚠️ Ainda Ruim. Um robô amador quebra isso em 5 minutos.';
        textoStatus.style.color = '#f59e0b';
    } else {
        barraProgresso.style.width = '100%';
        barraProgresso.style.backgroundColor = '#10b981'; // Verde
        textoStatus.textContent = '🛡️ Finalmente uma senha digna! O hacker vai chorar no banho.';
        textoStatus.style.color = '#10b981';
    }
});

// EXTRA: Botão de Mostrar/Esconder Senha
btnToggle.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        btnToggle.textContent = 'Esconder';
    } else {
        inputSenha.type = 'password';
        btnToggle.textContent = 'Mostrar';
    }
});
