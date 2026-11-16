
const perfis = {
    R: { nome: 'Prático e realizador', descricao: 'Você demonstra interesse em colocar a mão na massa, construir, consertar e ver resultados concretos.', cursos: ['Engenharia Civil', 'Agronomia', 'Engenharia Mecânica', 'Tecnologia em Automação Industrial'] },
    I: { nome: 'Investigativo e curioso', descricao: 'Você gosta de compreender problemas, pesquisar, analisar informações e encontrar explicações.', cursos: ['Ciência da Computação', 'Biomedicina', 'Estatística', 'Engenharia de Software'] },
    A: { nome: 'Criativo e expressivo', descricao: 'Você se interessa por imaginar possibilidades, criar projetos e expressar ideias de formas diferentes.', cursos: ['Design Gráfico', 'Publicidade e Propaganda', 'Arquitetura e Urbanismo', 'Produção Audiovisual'] },
    S: { nome: 'Social e acolhedor', descricao: 'Você encontra motivação em ouvir, ensinar, apoiar e contribuir com o desenvolvimento das pessoas.', cursos: ['Psicologia', 'Pedagogia', 'Enfermagem', 'Serviço Social'] },
    E: { nome: 'Empreendedor e comunicativo', descricao: 'Você gosta de apresentar ideias, organizar iniciativas, negociar e mobilizar pessoas.', cursos: ['Administração', 'Marketing', 'Gestão Comercial', 'Relações Públicas'] },
    C: { nome: 'Organizado e detalhista', descricao: 'Você se interessa por planejamento, organização de informações e atividades que exigem atenção aos detalhes.', cursos: ['Ciências Contábeis', 'Gestão Financeira', 'Logística', 'Processos Gerenciais'] }
};
const perguntas = [
    ['Montar, ajustar ou consertar algum objeto.', 'R'],
    ['Pesquisar por que um fenômeno acontece.', 'I'],
    ['Criar a identidade visual de um evento.', 'A'],
    ['Ajudar alguém a aprender algo difícil.', 'S'],
    ['Apresentar uma ideia e convencer um grupo.', 'E'],
    ['Organizar informações em tabelas e planilhas.', 'C'],
    ['Trabalhar em um projeto que envolva equipamentos ou ferramentas.', 'R'],
    ['Comparar dados para descobrir a causa de um problema.', 'I'],
    ['Escrever, desenhar ou produzir conteúdo original.', 'A'],
    ['Ouvir alguém com atenção e ajudar a encontrar alternativas.', 'S'],
    ['Coordenar uma equipe para alcançar uma meta.', 'E'],
    ['Planejar etapas e acompanhar prazos de um projeto.', 'C'],
    ['Testar soluções práticas até algo funcionar.', 'R'],
    ['Estudar um assunto a fundo antes de chegar a uma conclusão.', 'I'],
    ['Pensar em maneiras diferentes de comunicar uma mensagem.', 'A'],
    ['Participar de atividades voltadas ao bem-estar de outras pessoas.', 'S'],
    ['Negociar propostas ou organizar um pequeno negócio.', 'E'],
    ['Conferir detalhes para evitar erros em um trabalho.', 'C']
];
const alternativas = ['Não gostaria', 'Gostaria pouco', 'Talvez gostasse', 'Gostaria', 'Gostaria muito'];
let atual = 0; let respostas = Array(perguntas.length).fill(null);
const el = id => document.getElementById(id);
el('comecar').addEventListener('click', () => { el('inicio-quiz').hidden = true; el('perguntas').hidden = false; mostrar(); });
function mostrar() { el('contador').textContent = `Pergunta ${atual + 1} de ${perguntas.length}`; el('percentual').textContent = `${Math.round((atual / perguntas.length) * 100)}% concluído`; el('progresso').style.width = `${atual / perguntas.length * 100}%`; el('pergunta').textContent = perguntas[atual][0]; el('opcoes').innerHTML = ''; alternativas.forEach((nome, nota) => { const b = document.createElement('button'); b.className = 'opcao' + (respostas[atual] === nota ? ' selecionada' : ''); b.textContent = nome; b.setAttribute('aria-pressed', String(respostas[atual] === nota)); b.addEventListener('click', () => { respostas[atual] = nota; mostrar(); }); el('opcoes').appendChild(b); }); el('voltar').disabled = atual === 0; el('avancar').disabled = respostas[atual] === null; el('avancar').textContent = atual === perguntas.length - 1 ? 'Ver meu resultado →' : 'Próxima →'; }
el('voltar').addEventListener('click', () => { if (atual > 0) { atual--; mostrar(); } });
el('avancar').addEventListener('click', () => { if (respostas[atual] === null) return; if (atual < perguntas.length - 1) { atual++; mostrar(); } else { resultado(); } });
function resultado() { const pontos = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }; perguntas.forEach((p, i) => pontos[p[1]] += respostas[i]); const ordem = Object.keys(pontos).sort((a, b) => pontos[b] - pontos[a]); const principais = ordem.slice(0, 2); el('perguntas').hidden = true; el('resultado').hidden = false; el('resultado').innerHTML = ''; const titulo = document.createElement('h3'); titulo.textContent = 'Seu mapa de interesses 🌟'; el('resultado').appendChild(titulo); const intro = document.createElement('p'); intro.textContent = 'Com base no que você respondeu, estas são as áreas que mais despertaram seu interesse:'; el('resultado').appendChild(intro); principais.forEach((chave, i) => { const bloco = document.createElement('div'); bloco.className = 'perfil'; const h = document.createElement('h3'); h.textContent = `${i + 1}º perfil: ${perfis[chave].nome}`; const p = document.createElement('p'); p.textContent = perfis[chave].descricao; const curso = document.createElement('p'); curso.textContent = 'Cursos para pesquisar: ' + perfis[chave].cursos.join(', ') + '.'; bloco.append(h, p, curso); el('resultado').appendChild(bloco); }); const aviso = document.createElement('p'); aviso.textContent = 'Este resultado é uma indicação educativa baseada em interesses, não um diagnóstico ou uma garantia de sucesso profissional. Pesquise a grade curricular, converse com estudantes e profissionais e considere sua realidade.'; el('resultado').appendChild(aviso); const reiniciar = document.createElement('button'); reiniciar.className = 'botao'; reiniciar.textContent = 'Refazer o teste'; reiniciar.addEventListener('click', () => { atual = 0; respostas.fill(null); el('resultado').hidden = true; el('perguntas').hidden = false; mostrar(); }); el('resultado').appendChild(reiniciar); el('resultado').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
const emojis = { R: '🛠️', I: '🔬', A: '🎨', S: '🤝', E: '📣', C: '📊' }; Object.keys(perfis).forEach(chave => { const card = document.createElement('article'); card.className = 'card'; const simbolo = document.createElement('span'); simbolo.textContent = emojis[chave]; const h = document.createElement('h3'); h.textContent = perfis[chave].nome; const p = document.createElement('p'); p.textContent = perfis[chave].cursos.join(' • '); card.append(simbolo, h, p); el('lista-cursos').appendChild(card); });
