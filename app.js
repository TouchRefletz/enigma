var enigma = document.getElementById('enigma');
var nivel = document.querySelector('.main__titulo');
var pergunta = document.querySelector('.main__pergunta');
var opcoes = document.querySelectorAll('.main__botao');
var div_botoes = document.querySelector('.main__div-botoes');
var opcao1 = document.getElementById('opcao-1');
var opcao2 = document.getElementById('opcao-2');
var opcao3 = document.getElementById('opcao-3');
var opcao4 = document.getElementById('opcao-4');
var opcao5 = document.createElement('button');
var opcao6 = document.createElement('button');
var div_input = document.createElement('div');
var div_tudo = document.createElement('div');
var nivelAtual = 0;
var comecou = false;
var acabou = false;
var config = false;
var cores = false;
var input = document.createElement('input');
var i = 0;
var pontuacao = 0;
var perguntas = [
    'Qual foi, por muito tempo, o meu jogo favorito?',
    'Quantos anos eu tenho?',
    'Qual foi, por muito tempo, meu outro hobby, além de programar?',
    'Onde eu moro?',
    'Qual é o nome da minha playlist no Spotify?'
];
var respostas = [
    'Fortnite, Roblox, Minecraft, Subway Surfers',
    '13, 14, 15, 16',
    'Editor de Vídeo, Músico, Jogador de futebol, Ator',
    'Ribeirão Pires, Mauá, Ribeirão Preto, Osasco',
    'ToqueReflexo, um toque musical, um TOQUE musical, um TOQUE musical.'
]
var respostasCertas = [
    1,
    2,
    1,
    1,
    4
]

habilitarMenuPrincipal();

function reiniciarVariaveisDeControle() {
    i = 0;
    nivelAtual = 0;
    comecou = false;
    acabou = false;
    pontuacao = 0;
}

function habilitarMenuPrincipal() {
    reiniciarVariaveisDeControle();
    config = false;
    cores = false;
    nivel.style.cssText = '';
    pergunta.style.cssText = '';
    opcoes.forEach(function(opcao) {
        opcao.style.cssText = '';
    });
    nivel.textContent = 'Enigmas';
    pergunta.textContent = '';
    opcao1.innerHTML = 'Jogar';
    opcao2.innerHTML = 'Configurações';
    opcao2.addEventListener('click', configuracoes);
    opcao3.innerHTML = 'Versões';
    opcao4.innerHTML = 'Feedback';
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'entrada 1s ease-in-out';
            botao.style.opacity = '1';
        }, 250 * index);
    });
}

function configuracoes() {
    config = true;
    setTimeout (function () {
    reiniciarVariaveisDeControle();
    nivel.style.cssText = '';
    pergunta.style.cssText = '';
    opcoes.forEach(function(opcao) {
        opcao.style.cssText = '';
    });
    nivel.textContent = 'Configurações';
    pergunta.textContent = '';
    opcao1.innerHTML = 'Mudar cores';
    opcao1.addEventListener('click', irParaMenuMudarCores);
    opcao2.innerHTML = 'Remover animações';
    opcao3.innerHTML = 'n sei';
    opcao4.innerHTML = 'Voltar ao menu principal';
    opcao4.addEventListener('click', voltarAoMenuPrincipal);
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'entrada 1s ease-in-out';
            botao.style.opacity = '1';
        }, 250 * index);
    });
}, 4000);
}

function irParaMenuMudarCores() {
    opcao1.removeEventListener('click', irParaMenuMudarCores);
    opcao2.removeEventListener('click', configuracoes);
    opcao4.removeEventListener('click', voltarAoMenuPrincipal);
    setTimeout (function () {
        cores = true;
        div_tudo.classList.add('div_tudo');
        div_input.classList.add('div_input');
        enigma.appendChild(div_tudo);
        div_tudo.appendChild(div_botoes);
        div_tudo.appendChild(div_input);
        input.type = 'color';
        input.classList.add('input');
        div_input.appendChild(input);
        nivel.style.cssText = '';
        pergunta.style.cssText = '';
        opcoes.forEach(function(opcao) {
            opcao.style.cssText = '';
        });
        nivel.textContent = 'Mudar cores';
        pergunta.textContent = '';
        opcao1.innerHTML = 'Mudar cor de fundo';
        opcao1.addEventListener('click', definirCorDeFundo);
        opcao2.innerHTML = 'Mudar cor dos textos';
        opcao2.addEventListener('click', definirCorDosTextos);
        opcao3.innerHTML = 'Mudar cor dos botões';
        opcao3.addEventListener('click', definirCorDosBotoes);
        opcao4.innerHTML = 'Mudar cor dos botões no hover';
        opcao4.addEventListener('click', definirCorDosBotoesNoHover);
        opcao5.classList.add('main__botao');
        setInterval(function () {
            opcao5.style.cssText = opcao1.style.cssText;
        }, 1000);
        div_botoes.appendChild(opcao5);
        opcao5.innerHTML = 'Voltar ao menu principal';
        opcao5.addEventListener('click', voltarAoMenuPrincipal);
        opcoes.forEach(function (botao, index) {
            setTimeout(function () {
                botao.style.animation = 'entrada 1s ease-in-out';
                botao.style.opacity = '1';
            }, 250 * index);
        });
    }, 4000);
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

function voltarAoMenuPrincipal() {
    setTimeout(function () {
        acabou = true;
        cores = false;
        enigma.removeChild(input);
        sairPergunta();
        setTimeout(function () {
            habilitarMenuPrincipal();
        }, 3000)
    }, 1500)
}

function entrarPergunta() {
    opcao2.removeEventListener('click', configuracoes);
    opcao4.removeEventListener('click', voltarAoMenuPrincipal);
    if (i == 0) {
        pergunta.innerHTML = perguntas[0];
        nivel.innerHTML = `Nível ${nivelAtual}`;
        var respostasDaPergunta = respostas[i].split(',');
        opcao1.innerHTML = respostasDaPergunta[0];
        opcao2.innerHTML = respostasDaPergunta[1];
        opcao3.innerHTML = respostasDaPergunta[2];
        opcao4.innerHTML = respostasDaPergunta[3];
    }
    var perguntaTexto = pergunta.textContent;
    var animacaoPergunta = perguntaTexto.split(' ');
    pergunta.innerHTML = '';
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

function puxarBotoes() {
    opcoes.forEach(function (botao, index) {
        setTimeout(function () {
            botao.style.animation = 'entrada 1s ease-in-out';
            botao.style.opacity = '1';
        }, 250 * index);
    });
}

function sairPergunta() {
    if (cores) {
        return;
    }
    setTimeout(function () {
        nivel.style.animation = 'saida-texto 1s ease-in-out';
        pergunta.style.animation = 'saida-texto 1s ease-in-out';
        setTimeout(function () {
            pergunta.style.opacity = '0';
            nivel.style.opacity = '0';
        }, 500);
        }, 500);
        opcoes.forEach(function (botao, index) {
            setTimeout(function () {
                botao.style.animation = 'saida 1s ease-in-out';
                botao.style.opacity = '0';
            }, 250 * index);
        });
        setTimeout(function () {
            setTimeout(function () {
                nivelAtual++;
                if (comecou == false && config == false) {
                    if (i == 0) {
                        pergunta.innerHTML = perguntas[i];
                        nivel.innerHTML = `Nível ${nivelAtual}`;
                        respostasDaPergunta = respostas[i].split(',');
                        opcao1.innerHTML = respostasDaPergunta[0];
                        opcao2.innerHTML = respostasDaPergunta[1];
                        opcao3.innerHTML = respostasDaPergunta[2];
                        opcao4.innerHTML = respostasDaPergunta[3];
                        setTimeout(function () {
                            entrarPergunta();
                            pergunta.style.opacity = '1';
                            nivel.style.opacity = '1';
                    }, 500);   
                        comecou = true;
                        return;
                    }
                }
                i++;
                pontuacao++;
                    if (i >= perguntas.length) {
                        pergunta.innerHTML = `Você respondeu todas as perguntas corretamente. Sua pontuação foi de ${pontuacao}.`;
                        nivel.innerHTML = `Parabéns!`;
                        opcao1.innerHTML = 'Voltar ao menu';
                        opcao2.innerHTML = 'Escolher outra versão';
                        opcao3.innerHTML = 'Configurações';
                        opcao3.addEventListener('click', configuracoes);
                        opcao4.innerHTML = 'Feedback';
                    } else {
                        pergunta.innerHTML = perguntas[i];
                        nivel.innerHTML = `Nível ${nivelAtual}`;
                        respostasDaPergunta = respostas[i].split(',');
                        opcao1.innerHTML = respostasDaPergunta[0];
                        opcao2.innerHTML = respostasDaPergunta[1];
                        opcao3.innerHTML = respostasDaPergunta[2];
                        opcao4.innerHTML = respostasDaPergunta[3];
                    }
                setTimeout(function () {
                        if ((acabou) || (config)) {
                            return;
                        }
                        entrarPergunta();
                        pergunta.style.opacity = '1';
                        nivel.style.opacity = '1';
                }, 500);    
            }, 500);
        }, 1500);
}


opcao1.addEventListener('click', function () {
    if (i >= perguntas.length) {
        opcao1.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(function () {
            acabou = true;
            sairPergunta();
            setTimeout(function () {
                habilitarMenuPrincipal();
            }, 3000)
        }, 1500)
        setTimeout(function () {
        opcao1.style.backgroundColor = 'var(--cor-secundaria)';
        opcao2.style.backgroundColor = 'var(--cor-secundaria)';
        opcao3.style.backgroundColor = 'var(--cor-secundaria)';
        opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000);
        i = 0;
        nivelAtual = 0;
    } else {
        if ((respostasCertas[i] == 1) || (comecou == false)) {
            opcao1.style.backgroundColor = 'var(--cor-principal)';
            setTimeout(function () {
                sairPergunta();
            }, 1500)
            setTimeout(function () {
            opcao1.style.backgroundColor = 'var(--cor-secundaria)';
            opcao2.style.backgroundColor = 'var(--cor-secundaria)';
            opcao3.style.backgroundColor = 'var(--cor-secundaria)';
            opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000)
    } else {
        opcao1.style.backgroundColor = 'var(--cor-vermelha)';
        pontuacao--;
    }
    }
});
opcao2.addEventListener('click', function () {
    if (i >= perguntas.length) {
        opcao2.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(function () {
            acabou = true;
            sairPergunta();
            setTimeout(function () {
                habilitarMenuPrincipal();
            }, 1500)
        }, 1500)
        setTimeout(function () {
        opcao1.style.backgroundColor = 'var(--cor-secundaria)';
        opcao2.style.backgroundColor = 'var(--cor-secundaria)';
        opcao3.style.backgroundColor = 'var(--cor-secundaria)';
        opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000);
        i = 0;
        nivelAtual = 0;
    } else {
        if ((respostasCertas[i] == 2) || (comecou == false)) {
            opcao2.style.backgroundColor = 'var(--cor-principal)';
            setTimeout(function () {
                sairPergunta();
            }, 1500)
            setTimeout(function () {
            opcao1.style.backgroundColor = 'var(--cor-secundaria)';
            opcao2.style.backgroundColor = 'var(--cor-secundaria)';
            opcao3.style.backgroundColor = 'var(--cor-secundaria)';
            opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000)
    } else {
        opcao2.style.backgroundColor = 'var(--cor-vermelha)';
        pontuacao--;
    }
}});
opcao3.addEventListener('click', function () {
    if (i >= perguntas.length) {
        opcao3.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(function () {
            acabou = true;
            sairPergunta();
            setTimeout(function () {
                habilitarMenuPrincipal();
            }, 1500)
        }, 1500)
        setTimeout(function () {
        opcao1.style.backgroundColor = 'var(--cor-secundaria)';
        opcao2.style.backgroundColor = 'var(--cor-secundaria)';
        opcao3.style.backgroundColor = 'var(--cor-secundaria)';
        opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000);
        i = 0;
        nivelAtual = 0;
    } else {
        if ((respostasCertas[i] == 3) || (comecou == false)) {
            opcao3.style.backgroundColor = 'var(--cor-principal)';
            setTimeout(function () {
                sairPergunta();
            }, 1500)
            setTimeout(function () {
            opcao1.style.backgroundColor = 'var(--cor-secundaria)';
            opcao2.style.backgroundColor = 'var(--cor-secundaria)';
            opcao3.style.backgroundColor = 'var(--cor-secundaria)';
            opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000)
    } else {
        opcao3.style.backgroundColor = 'var(--cor-vermelha)';
        pontuacao--;
    }
}});
opcao4.addEventListener('click', function () {
    if (i >= perguntas.length) {
        opcao4.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(function () {
            acabou = true;
            sairPergunta();
            setTimeout(function () {
                habilitarMenuPrincipal();
            }, 1500)
        }, 1500)
        setTimeout(function () {
        opcao1.style.backgroundColor = 'var(--cor-secundaria)';
        opcao2.style.backgroundColor = 'var(--cor-secundaria)';
        opcao3.style.backgroundColor = 'var(--cor-secundaria)';
        opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000);
        i = 0;
        nivelAtual = 0;
    } else {
        if ((respostasCertas[i] == 4) || (comecou == false)) {
            opcao4.style.backgroundColor = 'var(--cor-principal)';
            setTimeout(function () {
                sairPergunta();
            }, 1500)
            setTimeout(function () {
            opcao1.style.backgroundColor = 'var(--cor-secundaria)';
            opcao2.style.backgroundColor = 'var(--cor-secundaria)';
            opcao3.style.backgroundColor = 'var(--cor-secundaria)';
            opcao4.style.backgroundColor = 'var(--cor-secundaria)';
        }, 1000)
    } else {
        opcao4.style.backgroundColor = 'var(--cor-vermelha)';
        pontuacao--;
    }
}});