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
    'Quais o menor e o maior país do mundo?',
    'Qual o livro mais vendido no mundo a seguir à Bíblia?',
    'Quantas casas decimais tem o número pi?',
    'Atualmente, quantos elementos químicos a tabela periódica possui?',
    'Quais os países que têm a maior e a menor expectativa de vida do mundo?',
    'O que a palavra "legend" significa em português?',
    'Quais as duas datas que são comemoradas em novembro?',
    'Quem pintou a "Mona Lisa"?',
    'Quanto tempo a luz do Sol demora para chegar à Terra?',
    'Em que ordem surgiram os modelos atômicos?',
];
var respostas = [
    'Vaticano e Rússia, Nauru e China, Mônaco e Canadá, Malta e Estados Unidos',
    'O Senhor dos Anéis, Dom Quixote, O Pequeno Príncipe, Ela,a Feiticeira',
    'Duas, Centenas, Infinitas, Milhares',
    '113, 109, 108, 118',
    'Japão e Serra Leoa, Austrália e Afeganistão, Itália e Chade, Brasil e Congo',
    'Legenda, Conto, História, Lenda',
    'Independência do Brasil e Dia da Bandeira, Proclamação da República e Dia Nacional da Consciência Negra, Dia do Médico e Dia de São Lucas, Dia de Finados e Dia Nacional do Livro',
    'Leonardo da Vinci, Michelangelo, Vincent van Gogh, Pablo Picasso',
    '12 minutos, 1 dia, 12 horas, 8 minutos',
    'Thomson/Dalton/Rutherford/Rutherford-Bohr, Rutherford-Bohr/Rutherford/Thomson/Dalton, Dalton/Thomson/Rutherford/Rutherford-Bohr, Dalton/Thomson/Rutherford-Bohr/Rutherford',
];
var respostasCertas = [
    0,
    1,
    2,
    3,
    0,
    3,
    1,
    0,
    3,
    2,
];

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
    if (animacaoRemovida) {
        removeTransicoes();
        opcoes.forEach(function(opcao) {
            opcao.style.opacity = '1';
        });
    }
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

function removeTransicoes() {
    var opcoes = document.querySelectorAll('.main__botao');
        opcoes.forEach(botao => {
            botao.style.transition = 'none';
        });
}

function destacarBotaoClicado(botao) {
        removerTodososEventListeners();
        if (animacaoRemovida == true) {
           return;
        }
        bloquearBotoes();
        var botaoClicado = botao;
        botaoClicado.style.backgroundColor = 'var(--cor-principal)';
        setTimeout(() => {
            botaoClicado.style.backgroundColor = '';
        }, 1000);
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
    addEventListenerComHistorico(opcao3, 'click', function () {
        puxarVersoes(opcao3);
    });
    addEventListenerComHistorico(opcao4, 'click', () => {
        puxarRedirecionamentos(opcao4);
        puxarFeedback();
    })
    puxarBotoes();
}

function enviarSinal() {
    comecou = true;
}

function puxarFeedback() {
    if (animacaoRemovida) {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSezlu_qzMfavu-fHJdHLMeIe6Sknq006YStxnE5ElU8GOF8gQ/viewform?usp=sf_link';
    }
    setTimeout(() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSezlu_qzMfavu-fHJdHLMeIe6Sknq006YStxnE5ElU8GOF8gQ/viewform?usp=sf_link';
    }, 4000);
}

function puxarLinktree() {
    if (animacaoRemovida) {
        window.location.href = 'https://linktr.ee/ToqueReflexo';
    }
    setTimeout(() => {
        window.location.href = 'https://linktr.ee/ToqueReflexo';
    }, 4000);
}

function puxarGithub() {
    if (animacaoRemovida) {
        window.location.href = 'https://github.com/TouchRefletz';
    }
    setTimeout(() => {
        window.location.href = 'https://github.com/TouchRefletz';
    }, 4000);
}

function configuracoes() {
    removerTodososEventListeners();
    config = true;
    if (animacaoRemovida) {
        reiniciarVariaveisDeControle();
        resetCSSNoHTML();
        nomearTitulo('Configurações');
        limparParagrafo();
        nomearBotoes('Mudar cores, Remover animações, Créditos, Voltar ao menu principal');
        desbloquearBotoes();
        addEventListenerComHistorico(opcao1, 'click', () => {
            puxarMenuMudarCores(opcao1);
        });
        addEventListenerComHistorico(opcao2, 'click', function () {
            irParaMenuRemoverAnimacoes(opcao2);
        });
        addEventListenerComHistorico(opcao3, 'click', () => {
            puxarCreditos(opcao3);
        });
        addEventListenerComHistorico(opcao4, 'click', function () {
            puxarMenuPrincipal(opcao4);
        });
        return;
    }
    setTimeout(() => {
        reiniciarVariaveisDeControle();
        resetCSSNoHTML();
        nomearTitulo('Configurações');
        limparParagrafo();
        nomearBotoes('Mudar cores, Remover animações, Créditos, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', () => {
            puxarMenuMudarCores(opcao1);
        });
        addEventListenerComHistorico(opcao2, 'click', function () {
            irParaMenuRemoverAnimacoes(opcao2);
        });
        addEventListenerComHistorico(opcao3, 'click', () => {
            puxarCreditos(opcao3);
        });
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
    setTimeout(() => {
        reiniciarVariaveisDeControle();
        resetCSSNoHTML();
        nomearTitulo('Remover Animações');
        limparParagrafo();
        nomearBotoes('Remover Animações, Adicionar Animações, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', function () {
            removeAnimacoes();
            removeTransicoes();
        });
        addEventListenerComHistorico(opcao2, 'click', adicionaAnimacoes);
        addEventListenerComHistorico(opcao3, 'click', function () {
            if (animacaoRemovida) {
                criarBotoes(1, 'opcao-4');
                deixarBotaoNormal(opcao3);
                puxarMenuPrincipal(opcao3);
            } else {
                puxarMenuPrincipal(opcao3);
                setTimeout(() => {
                    criarBotoes(1, 'opcao-4');
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
    pergunta.innerHTML = 'Animações Removidas.';
    animacaoRemovida = true;
}

function adicionaAnimacoes() {
    pergunta.innerHTML = 'Animações Adicionadas.';
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
    if (animacaoRemovida) {
        resetCSSNoHTML();
        nomearTitulo('Créditos');
        limparParagrafo();
        pergunta.innerHTML = 'Site desenvolvido por Willian Campos Costa.';
        mostrarParagrafo();
        nomearBotoes('Redes Sociais (Linktree), GIthub, Feedback, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', () => {
            puxarRedirecionamentos(opcao1);
            puxarLinktree();
        })
        addEventListenerComHistorico(opcao2, 'click', () => {
            puxarRedirecionamentos(opcao2);
            puxarGithub();
        })
        addEventListenerComHistorico(opcao3, 'click', () => {
            puxarRedirecionamentos(opcao3);
            puxarFeedback();
        })
        addEventListenerComHistorico(opcao4, 'click', () => {
            puxarMenuPrincipal(opcao4);
        });
        puxarBotoes();
        puxarInput();
        desbloquearBotoes();
        return;
    }
        resetCSSNoHTML();
        nomearTitulo('Créditos');
        limparParagrafo();
        pergunta.innerHTML = 'Site desenvolvido por Willian Campos Costa.';
        mostrarParagrafo();
        nomearBotoes('Redes Sociais (Linktree), GIthub, Feedback, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', () => {
            puxarRedirecionamentos(opcao1);
            puxarLinktree();
        })
        addEventListenerComHistorico(opcao2, 'click', () => {
            puxarRedirecionamentos(opcao2);
            puxarGithub();
        })
        addEventListenerComHistorico(opcao3, 'click', () => {
            puxarRedirecionamentos(opcao3);
            puxarFeedback();
        })
        addEventListenerComHistorico(opcao4, 'click', () => {
            puxarMenuPrincipal(opcao4);
        });
        puxarBotoes();
        puxarInput();
}

function puxarMenuMudarCores(botao) {
        destacarBotaoClicado(botao);
        if (animacaoRemovida) {
            sairPergunta();
            irParaMenuMudarCores();
            desbloquearBotoes();
            return;
        } else {
            setTimeout(function () {
                acabou = true;
                sairPergunta();
                setTimeout(function () {
                    irParaMenuMudarCores();
                }, 3000)
            }, 1500)
        }
    }

function irParaMenuMudarCores() {
    removerTodososEventListeners();
    if (animacaoRemovida) {
        cores = true;
        criarInput();
        criarDivTudo();
        colocarBotoesNaDivTudo();
        resetCSSNoHTML();
        nomearTitulo('Mudar cores');
        limparParagrafo();
        criarBotoes(3, 'opcao5, opcao6, opcao7');
        nomearBotoes('Mudar cor de fundo, Mudar cor dos textos, Mudar cor dos botões, Mudar cor dos botões no hover, Mudar cor principal, Mudar cor de erro, Voltar ao menu principal');
        desbloquearBotoes();
        addEventListenerComHistorico(opcao1, 'click', definirCorDeFundo);
        addEventListenerComHistorico(opcao2, 'click', definirCorDosTextos);
        addEventListenerComHistorico(opcao3, 'click', definirCorDosBotoes);
        addEventListenerComHistorico(opcao4, 'click', definirCorDosBotoesNoHover);
        addEventListenerComHistorico(opcao5, 'click', definirCorPrincipal);
        addEventListenerComHistorico(opcao6, 'click', definirCorDeErro);
        addEventListenerComHistorico(opcao7, 'click', voltarAoMenuPrincipal);
        puxarBotoes();
        removeTransicoes();
        input.style.opacity = '1';
        input.style.pointerEvents = 'auto';
        opcao7.classList.add('main__botao-maior');
        opcao7.classList.remove('main__botao');
        ajustarAltura();
        return;
    }
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
        input.style.pointerEvents = 'auto';
        opcao7.classList.add('.main__botao-maior');
        opcao7.classList.remove('.main__botao');
        ajustarAltura();
}

function puxarRedirecionamentos(botao) {
    if (animacaoRemovida) {
        return;
    } else {
        destacarBotaoClicado(botao);
        setTimeout(function () {
            sairPergunta();
        }, 1500)
    }
}

function voltarAoMenuPrincipal() {
    if (animacaoRemovida) {
        acabou = true;
        removerInput();
        ajustarAltura();
        desfazerDivsDasCores();
        habilitarMenuPrincipal();
        desbloquearBotoes();
        return;
    }
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
            ajustarAltura();
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
    if (animacaoRemovida) {
        if ((i >= perguntas.length) == false) {
            resetarPerguntas();
            mostrarTituloEParagrafo();
            mostrarParagrafo();
            opcoes.forEach(botao => {
                addEventListenerComHistorico(botao, 'click', clickDoBotao);
            });
        }
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
    if (animacaoRemovida) {
        removerTodososEventListeners();
    }
    pergunta.innerHTML = `Você respondeu todas as perguntas corretamente. Sua pontuação foi de ${pontuacao}.`;
    mostrarParagrafo();
    nomearTitulo('Parabéns!');
    mostrarTituloEParagrafo();
    nomearBotoes('Voltar ao menu, Escolher outra versão, Configurações, Feedback');
    addEventListenerComHistorico(opcao1, 'click', function () {
        puxarMenuPrincipal(opcao1);
    })
    addEventListenerComHistorico(opcao2, 'click', function () {
        puxarVersoes(opcao2);
    })
    addEventListenerComHistorico(opcao3, 'click', function () {
        puxarConfiguracoes(opcao3);
    })
    addEventListenerComHistorico(opcao4, 'click', () => {
        puxarRedirecionamentos(opcao4);
        puxarFeedback();
    })
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

function puxarCreditos(botao) {
    destacarBotaoClicado(botao);
    if (animacaoRemovida) {
        sairPergunta();
        mostrarCreditos();
        desbloquearBotoes();
        return;
    } else {
        setTimeout(function () {
            sairPergunta();
            setTimeout(function () {
                mostrarCreditos();
            }, 3000)
        }, 1500)
    }
}

function puxarConfiguracoes(botao) {
    if (animacaoRemovida) {
        acabou = true;
        configuracoes();
        return;
    }
    destacarBotaoClicado(botao);
    setTimeout(function () {
        acabou = true;
        sairPergunta();
        setTimeout(function () {
            configuracoes();
        }, 1500)
    }, 1500)
}

function puxarVersoes(botao) {
    if (animacaoRemovida) {
        versoes();
        return;
    }
    destacarBotaoClicado(botao);
    setTimeout(function () {
        sairPergunta();
        setTimeout(function () {
            versoes();
        }, 1500)
    }, 1500)
}

function versoes() {
    removerTodososEventListeners();
    if (animacaoRemovida) {
        resetCSSNoHTML();
        nomearTitulo('Versões');
        limparParagrafo();
        pergunta.innerHTML = 'Escolha uma outra versão/tema do enigma. Padrão: Perguntas Gerais';
        mostrarParagrafo();
        criarBotoes(1, 'opcao5');
        nomearBotoes('Perguntas Gerais, ToqueReflexo, Jogos, Matemática, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', trocarPerguntasParaPadrao);
        addEventListenerComHistorico(opcao2, 'click', trocarPerguntasParaDoMeuCanal);
        addEventListenerComHistorico(opcao3, 'click', trocarPerguntasParaDeJogos);
        addEventListenerComHistorico(opcao4, 'click', trocarPerguntasParaDeMatematica);
        addEventListenerComHistorico(opcao5, 'click', () => {
            puxarMenuPrincipal(opcao5);
            div_botoes.removeChild(opcao5);
            div_botoes.style.display = 'grid';
            div_botoes.style.flexDirection = '';
            div_botoes.style.width = '';
        });
        opcao5.classList.add('main__botao-maior');
        opcao5.classList.remove('main__botao');
        opcoes.forEach(botao => {
            botao.style.margin = '1%';
        });
        div_botoes.style.display = 'flex';
        div_botoes.style.flexDirection = 'column';
        puxarBotoes();
        removeTransicoes();
        desbloquearBotoes();
        return;
    }
    setTimeout (function () {
        resetCSSNoHTML();
        nomearTitulo('Versões');
        limparParagrafo();
        pergunta.innerHTML = 'Escolha uma outra versão/tema do enigma. Padrão: Perguntas Gerais';
        mostrarParagrafo();
        criarBotoes(1, 'opcao5');
        nomearBotoes('Perguntas Gerais, ToqueReflexo, Jogos, Matemática, Voltar ao menu principal');
        addEventListenerComHistorico(opcao1, 'click', trocarPerguntasParaPadrao);
        addEventListenerComHistorico(opcao2, 'click', trocarPerguntasParaDoMeuCanal);
        addEventListenerComHistorico(opcao3, 'click', trocarPerguntasParaDeJogos);
        addEventListenerComHistorico(opcao4, 'click', trocarPerguntasParaDeMatematica);
        addEventListenerComHistorico(opcao5, 'click', () => {
            puxarMenuPrincipal(opcao5);
            setTimeout(() => {
                div_botoes.removeChild(opcao5);
                div_botoes.style.display = 'grid';
                div_botoes.style.flexDirection = '';
                div_botoes.style.width = '';
            }, 3500);
        });
        opcao5.classList.add('main__botao-maior');
        opcao5.classList.remove('main__botao');
        puxarBotoes();
        opcoes.forEach(botao => {
            botao.style.margin = '1%';
        });
        div_botoes.style.display = 'flex';
        div_botoes.style.flexDirection = 'column';
    }, 1000);
}

function trocarPerguntasParaPadrao() {
    pergunta.textContent = 'Perguntas Definidas para Perguntas Gerais.';
    perguntas = [
        'Quais o menor e o maior país do mundo?',
        'Qual o livro mais vendido no mundo a seguir à Bíblia?',
        'Quantas casas decimais tem o número pi?',
        'Atualmente, quantos elementos químicos a tabela periódica possui?',
        'Quais os países que têm a maior e a menor expectativa de vida do mundo?',
        'O que a palavra "legend" significa em português?',
        'Quais as duas datas que são comemoradas em novembro?',
        'Quem pintou a "Mona Lisa"?',
        'Quanto tempo a luz do Sol demora para chegar à Terra?',
        'Em que ordem surgiram os modelos atômicos?',
    ];
    respostas = [
        'Vaticano e Rússia, Nauru e China, Mônaco e Canadá, Malta e Estados Unidos',
        'O Senhor dos Anéis, Dom Quixote, O Pequeno Príncipe, Ela,a Feiticeira',
        'Duas, Centenas, Infinitas, Milhares',
        '113, 109, 108, 118',
        'Japão e Serra Leoa, Austrália e Afeganistão, Itália e Chade, Brasil e Congo',
        'Legenda, Conto, História, Lenda',
        'Independência do Brasil e Dia da Bandeira, Proclamação da República e Dia Nacional da Consciência Negra, Dia do Médico e Dia de São Lucas, Dia de Finados e Dia Nacional do Livro',
        'Leonardo da Vinci, Michelangelo, Vincent van Gogh, Pablo Picasso',
        '12 minutos, 1 dia, 12 horas, 8 minutos',
        'Thomson/Dalton/Rutherford/Rutherford-Bohr, Rutherford-Bohr/Rutherford/Thomson/Dalton, Dalton/Thomson/Rutherford/Rutherford-Bohr, Dalton/Thomson/Rutherford-Bohr/Rutherford',
    ];
    respostasCertas = [
        0,
        1,
        2,
        3,
        0,
        1,
        1,
        0,
        3,
        2,
    ];
}

function trocarPerguntasParaDoMeuCanal() {
    pergunta.textContent = 'Perguntas Definidas para ToqueReflexo.';
    perguntas = [
        'Quantos canais principais eu já tive?',
        'Qual jogo eu joguei por muito tempo no meu canal?',
        'Quais são os amigos que mais apareceram no meu canal?',
        'Qual foi meu vídeo mais bem sucedido no youtube?',
        'Em que ano e mês eu postei o primeiro vídeo no youtube?'
    ];
    respostas = [
        '1, 2, 3, 4',
        'Fifa, Minecraft, Fortnite, Brawl Stars',
        'Gamer/Contour/C9, Contour/Ample/Gamer, Gamer/Contour/Bugha, Bugha/Ample/Gamer',
        'Como deixar a barra de tarefas transparente, Fifa mas..., Pou, Fortnite mas...',
        'Jan-2021, Março-2021, Abril-2021, Fev-2021'
    ]
    respostasCertas = [
        1,
        2,
        0,
        2,
        3
    ]
}

function trocarPerguntasParaDeMatematica() {
    pergunta.textContent = 'Perguntas Definidas para Matemática.';
    perguntas = [
        'João comprou 3 maçãs por R$ 5,00. Quanto ele pagaria por 7 maçãs?',
        'Um trem viaja a 80 km/h e percorre 400 km. Quanto tempo durou a viagem?',
        'Em um triângulo equilátero, todos os lados têm a mesma medida. Se um lado mede 6 cm, qual é o perímetro do triângulo?',
        'Uma caixa contém 12 bolas vermelhas, 8 bolas azuis e 5 bolas verdes. Qual a probabilidade de tirar uma bola azul da caixa?',
        'Um número é múltiplo de 3 se a soma de seus algarismos for divisível por 3. Qual dos seguintes números é múltiplo de 3?',
        'Ana tem 15 anos e seu irmão Pedro é 3 anos mais velho que ela. Quantos anos Pedro terá quando Ana tiver 20 anos?',
        'Um relógio marca 3 horas. Que horas serão após 180 minutos?',
        'Um jardim retangular tem 10 metros de comprimento e 6 metros de largura. Qual é a área do jardim?',
        'Um litro de água pesa 1 kg. Quantos quilos pesam 2 litros de água?',
        'Um avião decola às 9h da manhã e pousa às 13h da tarde. Quanto tempo durou o voo?'
    ];
    respostas = [
        'R$ 7,50, R$ 10,00, R$ 12,50,  R$ 15,00',
        '5 horas, 6 horas, 7 horas, 8 horas',
        '12 cm, 18 cm, 24cm, 30cm',
        '1/3, 1/4, 1/5, 1/6',
        '124, 135, 146, 157',
        '20 anos, 21 anos, 22 anos, 23 anos',
        '4 horas, 5 horas, 6 horas, 7 horas',
        '30 m², 40 m², 50 m², 60m²',
        '1 kg, 2 kg, 3 kg, 4 kg',
        '2 horas, 3 horas, 4 horas, 5 horas'
    ]
    respostasCertas = [
        3,
        0,
        1,
        1,
        1,
        3,
        2,
        1,
        1,
        2
    ]
}

function trocarPerguntasParaDeJogos() {
    pergunta.textContent = 'Perguntas Definidas para Jogos.';
    perguntas = [
        'Qual encanador bigodudo é o protagonista da série Super Mario Bros?',
        'Em Fortnite, qual é o nome do modo de jogo em que 100 jogadores se enfrentam em uma ilha até que reste apenas um?',
        'Qual dessas celebridades está ou já foi disponibilizado como roupa comprável no jogo Free Fire?',
        'No clássico Tetris, qual era o objetivo principal do jogo?',
        'Qual é o nome do famoso castelo em Super Mario Bros?',
        'Em League of Legends, qual é o nome do campeão conhecido por ser o "Yasuo do gelo"?',
        'Qual é o nome do jogo em que o jogador controla um personagem que precisa pular plataformas e evitar obstáculos?',
        'Qual é o nome do personagem principal do jogo Minecraft?',
        'Em God of War, qual é o nome do filho de Kratos?',
        'Qual é o nome da personagem principal do jogo The Last of Us?'
    ];
    respostas = [
        'Luigi, Mario, Wario, Waluigi',
        'Battle Royale, Creative, Save the World, Arena',
        'Neymar, Alok, Messi, Marshmello',
        'Fazer pontuação, Evitar que não haja jogadas possíveis, Fazer um desenho, Montar um quebra-cabeça',
        "Bowser's Castle, Peach's Castle, Mushroom Castle, Toad Castle",
        'Ahri, Zed, Yasuo, Yone',
        'Space Invaders, Pac-Man, Super Mario Bros, Donkey Kong',
        'Alex, Steve, Herobrine, Entity 303',
        'Atreus, Baldur, Thor, Freya',
        'Tommy, Joel, Ellie, Bill'
    ]
    respostasCertas = [
        1,
        0,
        1,
        1,
        0,
        3,
        2,
        1,
        0,
        2
    ]
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
    if (animacaoRemovida) {
        if (respostasCertas[i] == (indice - 1)) {
            erro = false;
            avancarNivel();
            entrarPergunta();
            resetarBotoes();
        } else {
            alternativaErrada(botao);
        }
        return;
    }
    if (respostasCertas[i] == (indice - 1)) {
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