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
var animacaoRemovida = false;
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

function bloquearBotoes() {
    opcoes.forEach(botao => {
        botao.style.pointerEvents = 'none';
    });
}

function desbloquearBotoes() {
    opcoes.forEach(botao => {
        botao.style.pointerEvents = 'auto';
    });
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

if (animacaoRemovida) {
    opcoes.forEach(botao => {
        botao.style.transition = '';
    });
    opcoes.forEach(botao => {
        botao.forEach(() => {
            botao.removeEventListener('mouseenter', function () {
                botao.style.backgroundColor = 'var(--cor-terciaria)';
            });
            botao.removeEventListener('mouseleave', function () {
                botao.style.backgroundColor = 'var(--cor-secundaria)';
            });
        });
    });
}

function destacarBotaoClicado(botao) {
    if (animacaoRemovida) {
        botaoClicado.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(() => {
            botaoClicado.style.backgroundColor = '';
        }, 1000);
        return;
    } else {
        removerTodososEventListeners();
        bloquearBotoes();
        var botaoClicado = botao;
        botaoClicado.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(() => {
            botaoClicado.style.backgroundColor = '';
        }, 1000);
    }
}

function puxarBotoes() {
    if (animacaoRemovida) {
        opcoes.forEach(botao => {
            botao.style.opacity = '1';
        });
        return;
    } else {
        bloquearBotoes();
        opcoes.forEach(function (botao, index) {
            setTimeout(function () {
                botao.style.animation = 'entrada 1s ease-in-out';
                botao.style.opacity = '1';
                setTimeout(() => {
                    desbloquearBotoes();
                }, 1500);
            }, 250 * index);
        });
    }
}

function comecarEnigma(botao) {
    destacarBotaoClicado(botao);
    if (animacaoRemovida) {
        sairPergunta();
        reiniciarVariaveisDeControle();
        enviarSinal();
        entrarPergunta();
    } else {
        setTimeout(() => {
            sairPergunta();
            setTimeout(() => {
                reiniciarVariaveisDeControle();
                enviarSinal();
                entrarPergunta();
            }, 1500);
        }, 1500);
    }
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
    addEventListenerComHistorico(opcao2, 'click', function () {
        puxarConfiguracoes(opcao2);
    });
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
        addEventListenerComHistorico(opcao2, 'click', function () {
            irParaMenuRemoverAnimacoes(opcao2);
        });
        addEventListenerComHistorico(opcao3, 'click', mostrarCreditos);
        addEventListenerComHistorico(opcao4, 'click', function () {
            puxarMenuPrincipal(opcao4);
        });
        puxarBotoes();
    }, 500);
}

function irParaMenuRemoverAnimacoes(botao) {
    destacarBotaoClicado(botao);
    setTimeout(function () {
        sairPergunta();
        setTimeout(function () {
            removerAnimacoes();
        }, 1500)
    }, 1500)
}

function removerAnimacoes() {
    removerTodososEventListeners();
    removerAnimacao = true;
    setTimeout(() => {
        reiniciarVariaveisDeControle();
        resetCSSNoHTML();
        nomearTitulo('Remover Animações');
        limparParagrafo();
        nomearBotoes('Remover Animações, Adicionar Animações, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', removeAnimacoes);
        addEventListenerComHistorico(opcao2, 'click', adicionaAnimacoes);
        addEventListenerComHistorico(opcao3, 'click', function () {
            if (animacaoRemovida) {
                criarBotoes(1, 'opcao4');
                deixarBotaoNormal(opcao3);
                puxarMenuPrincipal(opcao3);
            } else {
                puxarMenuPrincipal(opcao3);
                setTimeout(() => {
                    criarBotoes(1, 'opcao4');
                    deixarBotaoNormal(opcao3);
                }, 4500)
            }
        });
        deixarBotaoMaior(opcao3);
        removerBotoes(opcao4);
        puxarBotoes();
    }, 500);
}

function removeAnimacoes() {
    animacaoRemovida = true;
}

function adicionaAnimacoes() {
    animacaoRemovida = false;
}

function deixarBotaoNormal(botao) {
    botao.classList.remove('main__botao-maior');
    botao.classList.add('main__botao');
}

function deixarBotaoMaior(botao) {
    botao.classList.add('main__botao-maior');
    botao.classList.remove('main__botao');
}

function removerBotoes(botao) {
    div_botoes.removeChild(botao);
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
    if (animacaoRemovida) {
        return;
    } else {
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
}

function entrarPergunta() {
    if (i >= perguntas.length) {
        mostrarTelaFinal();
    } else if ((acabou) || (config)) {
        return;
    }
    setTimeout(() => {
        if ((i >= perguntas.length) == false) {
            resetarPerguntas();
            mostrarTituloEParagrafo();
            mostrarParagrafo();
            opcoes.forEach(botao => {
                addEventListenerComHistorico(botao, 'click', clickDoBotao);
            });
        }
    }, 700);
}

function retirarBotoes() {
    if (animacaoRemovida) {
        return;
    } else {
        opcoes.forEach(function (botao, index) {
            setTimeout(function () {
                botao.style.animation = 'saida 1s ease-in-out';
                botao.style.opacity = '0';
            }, 250 * index);
        });
    }
}

function retirarTituloEParagrafo() {
    if (animacaoRemovida) {
        return;
    } else {
        setTimeout(function () {
            nivel.style.animation = 'saida-texto 1s ease-in-out';
            pergunta.style.animation = 'saida-texto 1s ease-in-out';
            setTimeout(function () {
                pergunta.style.opacity = '0';
                nivel.style.opacity = '0';
            }, 500);
            }, 500);
    }
}

function mostrarTituloEParagrafo() {
    if (animacaoRemovida) {
        return;
    } else {
        setTimeout(function () {
            nivel.style.animation = 'entrada-texto 1s ease-in-out';
            pergunta.style.animation = 'entrada-texto 1s ease-in-out';
            setTimeout(function () {
                pergunta.style.opacity = '1';
                nivel.style.opacity = '1';
            }, 500);
            }, 500);
    }
}

function mostrarTelaFinal() {
    pergunta.innerHTML = `Você respondeu todas as perguntas corretamente. Sua pontuação foi de ${pontuacao}.`;
    mostrarParagrafo();
    nomearTitulo('Parabéns!');
    mostrarTituloEParagrafo();
    nomearBotoes('Voltar ao menu, Escolher outra versão, Configurações, Feedback');
    addEventListenerComHistorico(opcao1, 'click', function () {
        puxarMenuPrincipal(opcao1);
    })
    addEventListenerComHistorico(opcao3, 'click', function () {
        puxarConfiguracoes(opcao3);
    })
    addEventListenerComHistorico(opcao4, 'click', puxarFeedback)
    comecou = false;
    acabou = true;
}

function puxarMenuPrincipal(botao) {
    destacarBotaoClicado(botao);
    if (animacaoRemovida) {
        acabou = true;
        sairPergunta();
        habilitarMenuPrincipal();
        desbloquearBotoes();
        return;
    } else {
        setTimeout(function () {
            acabou = true;
            sairPergunta();
            setTimeout(function () {
                habilitarMenuPrincipal();
            }, 3000)
        }, 1500)
    }
}

function puxarConfiguracoes(botao) {
    destacarBotaoClicado(botao);
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
    var alternativaErrada = botao;
    erro = true;
    alternativaErrada.style.backgroundColor = 'var(--cor-de-erro)';
    pontuacao--;
}

function puxarProximaPergunta(botao, indice) {
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
}

function clickDoBotao(botao) {
    var botaoClicado = botao.target;
    var indice = botao.target.id.split('-')[1];
    puxarProximaPergunta(botaoClicado, indice);
}

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