var enigma = document.getElementById('enigma');
var nivel = document.querySelector('.main__titulo');
var pergunta = document.querySelector('.main__pergunta');
var opcoes = document.querySelectorAll('.main__botao');
var div_botoes = document.querySelector('.main__div-botoes');
var opcao1 = document.getElementById('opcao-1');
var opcao2 = document.getElementById('opcao-2');
var opcao3 = document.getElementById('opcao-3');
var opcao4 = document.getElementById('opcao-4');
var div_input = document.createElement('div');
var div_tudo = document.createElement('div');
var nivelAtual = 1;
var eventListeners = [];
var erro = false;
var comecou = false;
var acabou = false;
var config = false;
var cores = false;
var input = document.createElement('input');
var i = 0;
var pontuacao = 0;
var perguntas = [
    'Qual foi, por muito tempo, o meu jogo favorito?',
];
var respostas = [
    'Fortnite, Roblox, Minecraft, Subway Surfers',
]
var respostasCertas = [
    1,
]

function reiniciarVariaveisDeControle() {
    i = 0;
    nivelAtual = 1;
    acabou = false;
    cores = false;
    pontuacao = 0;
    enigma.style.opacity = '1';
}

function addEventListenerComHistorico(elemento, tipoDeEvento, funcao) {
    elemento.addEventListener(tipoDeEvento, funcao);
    eventListeners.push({ elemento, tipoDeEvento, funcao});
}

function removerTodososEventListeners() {
    eventListeners.forEach(({ elemento, tipoDeEvento, funcao }) => {
       elemento.removeEventListener(tipoDeEvento, funcao);
   });
   eventListeners = [];
}

function resetCSSNoHTML() {
    nivel.style.cssText = '';
    pergunta.style.cssText = '';
    opcoes.forEach(function(opcao) {
        opcao.style.cssText = '';
    });
}

function nomearTitulo(nome) {
    nivel.textContent = nome;
}

function nomearBotoes(nomes) {
    opcoes = document.querySelectorAll('.main__botao');
    var nomesDosBotoes = nomes.split(', ');
    for (var i = 0; i < nomesDosBotoes.length; i++) {
        if (opcoes[i]) {
            opcoes[i].innerHTML = nomesDosBotoes[i];
        } else {
            console.error("Não há botão suficiente para o nome", nomesDosBotoes[i]);
        }
    }
}

function criarBotoes(quantidade, nomes) {
    var nomesDosBotoes = nomes.split(', ');
    for (var i = 0; i < quantidade; i++) {
        var botaoCriado = document.createElement('button');
        botaoCriado.classList.add('main__botao');
        div_botoes.appendChild(botaoCriado);
        botaoCriado.id = nomesDosBotoes[i];
    }
}

function limparParagrafo() {
    pergunta.textContent = '';
}

function criarInput() {
    div_input.classList.add('div_input');
    div_tudo.appendChild(div_input);
}

function criarDivTudo() {
    div_tudo.classList.add('div_tudo');
    input.type = 'color';
    input.classList.add('input');
    div_input.appendChild(input);
    enigma.appendChild(div_tudo);
}

function colocarBotoesNaDivTudo() {
    div_tudo.appendChild(div_botoes);
}

function puxarInput() {
    input.style.animation = 'real-fade-in 1s ease-in-out';
    setTimeout(() => {
        input.style.opacity = '1';
    }, 1000);
}

function definirCorDeFundo() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-de-fundo', corSelecionada);
  }  

function definirCorDosTextos() {
   var corSelecionada = document.querySelector('.input').value;
   document.documentElement.style.setProperty('--cor-do-texto', corSelecionada);
 }   

function definirCorDosBotoes() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-secundaria', corSelecionada);
}   

function definirCorDosBotoesNoHover() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-terciaria', corSelecionada);
}  

function definirCorPrincipal() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-principal', corSelecionada);
}  

function definirCorDeErro() {
    var corSelecionada = document.querySelector('.input').value;
    document.documentElement.style.setProperty('--cor-de-erro', corSelecionada);
}  

function desfazerDivsDasCores() {
    enigma.style.opacity = '0';
    div_botoes.removeChild(opcao5);
    div_botoes.removeChild(opcao6);
    div_botoes.removeChild(opcao7);
    enigma.appendChild(div_botoes);
    enigma.removeChild(div_tudo);
}

function removerInput() {
    input.style.animation = 'saida-texto 1s ease-in-out';
    setTimeout(() => {
        input.style.opacity = '0';
    }, 1000);
}

function resetarBotoes() {
    opcoes.forEach(botao => {
        if (botao.style.backgroundColor == 'var(--cor-de-erro)') {
            botao.style.backgroundColor = '';
        }
    })};

function hoverBotao() {
    opcoes.forEach(botao => {
        addEventListenerComHistorico(botao, 'mouseenter', function () {
            botao.style.backgroundColor = 'var(--cor-terciaria)';
        });
        addEventListenerComHistorico(botao, 'mouseleave', function () {
            botao.style.backgroundColor = 'var(--cor-secundaria)';
        });
    });
}

hoverBotao();

function destacarBotaoClicado(botao) {
    var botaoClicado = botao;
    botaoClicado.style.backgroundColor = 'var(--cor-principal)';
    setTimeout(() => {
        botaoClicado.style.backgroundColor = '';
    }, 1000);
}

function puxarBotoes() {
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'entrada 1s ease-in-out';
            botao.style.opacity = '1';
        }, 250 * index);
    });
}

function comecarEnigma(botao) {
    destacarBotaoClicado(botao);
    setTimeout(() => {
        sairPergunta();
        setTimeout(() => {
            reiniciarVariaveisDeControle();
            enviarSinal();
            entrarPergunta();
        }, 1500);
    }, 1500);
}

function habilitarMenuPrincipal() {
    reiniciarVariaveisDeControle();
    removerTodososEventListeners();
    resetCSSNoHTML();
    config = false;
    nomearTitulo('Enigma');
    limparParagrafo();
    nomearBotoes('Jogar, Configurações, Versões, Feedback');
    addEventListenerComHistorico(opcao1, 'click', function () {
        comecarEnigma(opcao1);
    });
    addEventListenerComHistorico(opcao2, 'click', puxarConfiguracoes);
    addEventListenerComHistorico(opcao4, 'click', puxarFeedback);
    puxarBotoes();
}

function enviarSinal() {
    comecou = true;
}

function puxarFeedback() {
    setTimeout(() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSezlu_qzMfavu-fHJdHLMeIe6Sknq006YStxnE5ElU8GOF8gQ/viewform?usp=sf_link';
    }, 4000);
}

function puxarLinktree() {
    setTimeout(() => {
        window.location.href = 'https://linktr.ee/ToqueReflexo';
    }, 4000);
}

function puxarGithub() {
    setTimeout(() => {
        window.location.href = 'https://github.com/TouchRefletz';
    }, 4000);
}

function configuracoes() {
    removerTodososEventListeners();
    config = true;
    setTimeout(() => {
        reiniciarVariaveisDeControle();
        resetCSSNoHTML();
        nomearTitulo('Configurações');
        limparParagrafo();
        nomearBotoes('Mudar cores, Remover animações, Créditos, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', irParaMenuMudarCores);
        addEventListenerComHistorico(opcao3, 'click', mostrarCreditos);
        addEventListenerComHistorico(opcao4, 'click', puxarMenuPrincipal);
        puxarBotoes();
    }, 500);
}

function mostrarCreditos() {
    removerTodososEventListeners();
    setTimeout (function () {
        resetCSSNoHTML();
        nomearTitulo('Créditos');
        limparParagrafo();
        pergunta.innerHTML = 'Site desenvolvido por Willian Campos Costa.';
        mostrarParagrafo();
        nomearBotoes('Redes Sociais (Linktree), GIthub, Feedback, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', puxarLinktree);
        addEventListenerComHistorico(opcao2, 'click', puxarGithub);
        addEventListenerComHistorico(opcao3, 'click', puxarFeedback);
        addEventListenerComHistorico(opcao4, 'click', puxarMenuPrincipal);
        puxarBotoes();
        puxarInput();
    }, 4000);
}

function irParaMenuMudarCores() {
    removerTodososEventListeners();
    setTimeout (function () {
        cores = true;
        criarInput();
        criarDivTudo();
        colocarBotoesNaDivTudo();
        resetCSSNoHTML();
        nomearTitulo('Mudar cores');
        limparParagrafo();
        criarBotoes(3, 'opcao5, opcao6, opcao7');
        nomearBotoes('Mudar cor de fundo, Mudar cor dos textos, Mudar cor dos botões, Mudar cor dos botões no hover, Mudar cor principal, Mudar cor de erro, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', definirCorDeFundo);
        addEventListenerComHistorico(opcao2, 'click', definirCorDosTextos);
        addEventListenerComHistorico(opcao3, 'click', definirCorDosBotoes);
        addEventListenerComHistorico(opcao4, 'click', definirCorDosBotoesNoHover);
        addEventListenerComHistorico(opcao5, 'click', definirCorPrincipal);
        addEventListenerComHistorico(opcao6, 'click', definirCorDeErro);
        addEventListenerComHistorico(opcao7, 'click', voltarAoMenuPrincipal);
        puxarBotoes();
        puxarInput();
    }, 4000);
}

function voltarAoMenuPrincipal() {
    destacarBotaoClicado(opcao7);
    enigma.style.transition = 'none';
    setTimeout(function () {
        acabou = true;
        sairPergunta();
        removerInput();
        setTimeout(() => {
            desfazerDivsDasCores();
        }, 2500);
        setTimeout(function () {
            habilitarMenuPrincipal();
            setTimeout(() => {
                enigma.style.transition = '';
            }, 1000);
        }, 3500)
    }, 1500)
}

function resetarPerguntas() {
    pergunta.innerHTML = perguntas[i];
    nomearTitulo(`Nível ${nivelAtual}`);
    nomearBotoes(respostas[i]);
}

function mostrarParagrafo() {
    var perguntaTexto = pergunta.textContent;
    var animacaoPergunta = perguntaTexto.split(' ');
    limparParagrafo();
    setTimeout(function () {
        for (var i = 0; i < animacaoPergunta.length; i++) {
            (function(i) {
                var span = document.createElement('span');
                span.textContent = animacaoPergunta[i] + ' ';
                span.style.transition = 'all 1s ease-in-out';
                span.classList.add('main__pergunta');
                span.style.opacity = '0';
                span.style.animation = 'fade-in 0.3s ease-in-out';
                setTimeout(function () {
                    span.style.opacity = '1';
                    pergunta.appendChild(span);
                }, 200 * i);
            })(i);
        }
        setTimeout(function() {
            puxarBotoes();
        }, 200 * animacaoPergunta.length);
    }, 500)
}

function entrarPergunta() {
    if (i >= perguntas.length) {
        mostrarTelaFinal();
    } else if ((acabou) || (config)) {
        return;
    }
    removerTodososEventListeners();
    setTimeout(() => {
        if ((i >= perguntas.length) == false) {
            resetarPerguntas();
            mostrarTituloEParagrafo();
            mostrarParagrafo();
        }
    }, 700);
}

function retirarBotoes() {
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'saida 1s ease-in-out';
            botao.style.opacity = '0';
        }, 250 * index);
    });
}

function retirarTituloEParagrafo() {
    setTimeout(function () {
        nivel.style.animation = 'saida-texto 1s ease-in-out';
        pergunta.style.animation = 'saida-texto 1s ease-in-out';
        setTimeout(function () {
            pergunta.style.opacity = '0';
            nivel.style.opacity = '0';
        }, 500);
        }, 500);
}

function mostrarTituloEParagrafo() {
    setTimeout(function () {
        nivel.style.animation = 'entrada-texto 1s ease-in-out';
        pergunta.style.animation = 'entrada-texto 1s ease-in-out';
        setTimeout(function () {
            pergunta.style.opacity = '1';
            nivel.style.opacity = '1';
        }, 500);
        }, 500);
}

function mostrarTelaFinal() {
    pergunta.innerHTML = `Você respondeu todas as perguntas corretamente. Sua pontuação foi de ${pontuacao}.`;
    mostrarParagrafo();
    nomearTitulo('Parabéns!');
    mostrarTituloEParagrafo();
    nomearBotoes('Voltar ao menu, Escolher outra versão, Configurações, Feedback');
    comecou = false;
    acabou = true;
}

function puxarMenuPrincipal() {
    setTimeout(function () {
        acabou = true;
        sairPergunta();
        setTimeout(function () {
            habilitarMenuPrincipal();
        }, 3000)
    }, 1500)
}

function puxarConfiguracoes() {
    setTimeout(function () {
        acabou = true;
        sairPergunta();
        setTimeout(function () {
            configuracoes();
        }, 1500)
    }, 1500)
}

function avancarNivel() {
    if (comecou) {
        nivelAtual++;
        i++;
        pontuacao++; 
    } else {
        return;
    }
}

function sairPergunta() {
    retirarTituloEParagrafo();
    retirarBotoes();
}

function alternativaErrada(botao) {
    erro = true;
    botao.style.backgroundColor = 'var(--cor-de-erro)';
    pontuacao--;
}

function criarEventoParaOpcao(botao, indice) {
    botao.addEventListener('click', function () {
            if (comecou == true) {
                if (respostasCertas[i] == indice) {
                    erro = false;
                    avancarNivel();
                    destacarBotaoClicado(botao);
                    setTimeout(function () {
                        sairPergunta();
                        setTimeout(() => {
                            entrarPergunta();
                        }, 1500);
                    }, 1500)
                    setTimeout(resetarBotoes, 1000);
                } else {
                    alternativaErrada(botao);
                }
            } else {
                if (cores == true) {
                    return;
                } else if (acabou == true) {
                    destacarBotaoClicado(botao);
                    if (botao == opcao1) {
                        puxarMenuPrincipal();
                    } else if (botao == opcao3) {
                        puxarConfiguracoes();
                    }
                } else {
                    destacarBotaoClicado(botao);
                    setTimeout(function () {
                        sairPergunta();
                    }, 1500)
                    setTimeout(resetarBotoes, 1000); 
                }
            }
        }
    )};

    criarEventoParaOpcao(opcao1, 1);
    criarEventoParaOpcao(opcao2, 2);
    criarEventoParaOpcao(opcao3, 3);
    criarEventoParaOpcao(opcao4, 4);

    function ajustarAltura() {
        enigma.style.opacity = '0';
        setTimeout(() => {
            const enigmaBounds = enigma.getBoundingClientRect();
            const contentBounds = div_botoes.getBoundingClientRect();
            if (contentBounds.top < enigmaBounds.top || contentBounds.bottom > enigmaBounds.bottom) {
                enigma.style.height = '100%';
                setTimeout(() => {
                    enigma.style.opacity = '1';
                }, 250);
            } else {
                enigma.style.height = '100vh';
                setTimeout(() => {
                    enigma.style.opacity = '1';
                }, 250);
            }
        }, 250);
    }
    
    window.addEventListener('resize', ajustarAltura);
    ajustarAltura();
    habilitarMenuPrincipal();