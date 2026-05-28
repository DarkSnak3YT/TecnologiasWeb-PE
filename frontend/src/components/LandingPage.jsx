import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { api } from '../services/api';

const noticias = [
  {
    titulo: 'Seminário “Saúde mental e exercício físico”',
    data: '28 de Março de 2026',
    imagem: 'palestrante-2.png',
    alt: 'Palestrante durante seminário sobre saúde mental',
    categoria: 'Saúde Mental',
    texto: (
      <>
        <strong>Programa</strong><br /><br />
        09:00 - 09:15 | Sessão de Abertura<br />
        09:15 - 10:00 | Exercício físico como ferramenta de promoção da saúde mental<br />
        10:00 - 10:45 | Atividade física e prevenção da ansiedade e depressão<br />
        10:45 - 11:15 | Pausa para Café<br />
        11:15 - 11:45 | Mesa Redonda<br />
        Debate sobre estratégias para incentivar estilos de vida ativos<br />
        11:45 - 12:15 | Discussão Aberta<br />
        Perguntas do público e partilha de experiências<br />
        12:15 - 12:30 | Sessão de Encerramento<br /><br />
        Aberto à comunidade académica e ao público geral
      </>
    )
  },
  {
    titulo: 'Formação “Melhorias a Linha de Saúde Açores”',
    data: '15 de Fevereiro de 2026',
    imagem: 'palestra-2.png',
    alt: 'Profissionais durante formação em telemedicina',
    categoria: 'Telemedicina',
    texto: (
      <>
        Profissionais da área da saúde participaram recentemente numa <strong>ação de formação dedicada à melhoria do funcionamento da Linha de Saúde Açores</strong>, com o objetivo de reforçar a qualidade do atendimento, otimizar os processos de triagem e garantir uma resposta mais eficaz às necessidades da população.<br /><br />
        A iniciativa reuniu médicos, enfermeiros e técnicos de atendimento, abordando temas como comunicação clínica à distância, utilização de protocolos de triagem e gestão segura da informação clínica.<br /><br />
        O evento contou ainda com a colaboração de investigadores associados ao Centro Académico Clínico dos Açores (CACA), que apresentaram o <strong>trabalho desenvolvido na área da telemedicina.</strong>
      </>
    )
  },
  {
    titulo: 'Participação no “International Epidemiology Conference”',
    data: '8 de Janeiro de 2026',
    imagem: 'Poster-2.png',
    alt: 'Investigadora apresenta poster sobre Doença de Machado-Joseph',
    categoria: 'Epidemiologia',
    texto: (
      <>
        A investigadora Joana Cabral, associada ao Centro Académico Clínico dos Açores (CACA), participou recentemente num congresso internacional dedicado às doenças neurológicas raras, onde apresentou <strong>novos dados sobre a epidemiologia da Doença de Machado-Joseph no arquipélago.</strong><br /><br />
        Durante a apresentação foram discutidas estatísticas recentes que <strong>confirmam os Açores como uma das regiões do mundo com maior prevalência desta doença genética</strong>.<br /><br />
        A participação no congresso permitiu divulgar o <strong>trabalho desenvolvido no âmbito da área de epidemiologia do CACA</strong>.
      </>
    )
  }
];

const eventosBase = [
  { id: 1, titulo: 'Seminário de Saúde Mental', descricao: 'Exercício físico como ferramenta de promoção da saúde mental.', data: '2026-06-04', hora: '10:00', cidade: 'Ponta Delgada', local: 'Auditório Principal' },
  { id: 2, titulo: 'Formação em Telemedicina', descricao: 'Boas práticas no acompanhamento remoto de utentes.', data: '2026-06-12', hora: '14:30', cidade: 'Angra do Heroísmo', local: 'Sala de Conferências' }
];

const coordenadas = {
  'Ponta Delgada': '37.7412,-25.6756',
  'Angra do Heroísmo': '38.6590,-27.2208',
  Horta: '38.5367,-28.6262'
};

const mapas = {
  'Ponta Delgada': '-25.72,37.72,-25.63,37.77',
  'Angra do Heroísmo': '-27.25,38.63,-27.19,38.68',
  Horta: '-28.66,38.51,-28.59,38.56'
};

function formatarData(data) {
  if (!data) return '';
  return new Date(`${data}T00:00:00`).toLocaleDateString('pt-PT');
}

function DnaAnimado() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
    const ballGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x84D0F0 });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xFED162 });
    const purpleMaterial = new THREE.MeshBasicMaterial({ color: 0x651E59 });
    const dnaGroup = new THREE.Group();

    for (let i = 0; i <= 20; i++) {
      const row = new THREE.Group();
      const yPos = i * 2 - 20;

      const blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
      blueTube.rotation.z = Math.PI / 2;
      blueTube.position.set(-3, 0, 0);

      const yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
      yellowTube.rotation.z = Math.PI / 2;
      yellowTube.position.set(3, 0, 0);

      const ballLeft = new THREE.Mesh(ballGeometry, purpleMaterial);
      ballLeft.position.set(-6, 0, 0);

      const ballRight = new THREE.Mesh(ballGeometry, purpleMaterial);
      ballRight.position.set(6, 0, 0);

      row.add(blueTube, yellowTube, ballLeft, ballRight);
      row.position.y = yPos;
      row.rotation.y = i * 0.5;
      dnaGroup.add(row);
    }

    scene.add(dnaGroup);
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      dnaGroup.rotation.x += 0.005;
      dnaGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      tubeGeometry.dispose();
      ballGeometry.dispose();
      blueMaterial.dispose();
      yellowMaterial.dispose();
      purpleMaterial.dispose();
      container.innerHTML = '';
    };
  }, []);

  return <div id="dna-container" ref={containerRef} aria-label="Animação 3D de ADN" />;
}

function GraficoProducao() {
  const data = [
    { categoria: 'Projetos', valores: [{ tipo: 'Em curso', valor: 3 }, { tipo: 'Concluídos', valor: 6 }] },
    { categoria: 'Estágios', valores: [{ tipo: 'Em curso', valor: 8 }, { tipo: 'Concluídos', valor: 14 }] },
    { categoria: 'Mestrados/Doutoramentos', valores: [{ tipo: 'Em curso', valor: 4 }, { tipo: 'Concluídos', valor: 9 }] },
    { categoria: 'Publicações', valores: [{ tipo: 'Indexadas', valor: 16 }, { tipo: 'Não indexadas', valor: 5 }] }
  ];
  const cores = { 'Em curso': '#1E88E5', 'Concluídos': '#FFC107', Indexadas: '#4CAF50', 'Não indexadas': '#F44336' };
  const width = 1550;
  const height = 300;
  const marginLeft = 190;
  const marginRight = 310;
  const max = 22;
  const scale = (v) => (v / max) * (width - marginLeft - marginRight);

  return (
    <div className="grafico-container">
      <h3>Produção Académica e Científica</h3>
      <div id="grafico-producao" role="img" aria-label="Gráfico de barras mostrando a produção académica por categoria">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '100%', height: 'auto' }}>
          {[0, 5, 10, 15, 20].map(tick => (
            <g key={tick} transform={`translate(${marginLeft + scale(tick)}, 20)`}>
              <line y1="0" y2="8" stroke="#333" />
              <text y="-4" textAnchor="middle" fontSize="14">{tick}</text>
            </g>
          ))}
          {data.map((row, i) => {
            let x = marginLeft;
            const y = 50 + i * 60;
            return (
              <g key={row.categoria}>
                <text x={marginLeft - 10} y={y + 23} textAnchor="end" fontSize="14">{row.categoria}</text>
                {row.valores.map(item => {
                  const w = scale(item.valor);
                  const el = <g key={item.tipo}><rect x={x} y={y} width={w} height="45" fill={cores[item.tipo]} /><text x={x + w - 8} y={y + 28} textAnchor="end" fill="white" fontWeight="700" fontSize="14">{item.valor}</text></g>;
                  x += w;
                  return el;
                })}
              </g>
            );
          })}
          {Object.entries(cores).map(([tipo, cor], i) => (
            <g key={tipo} transform={`translate(${width - 250}, ${35 + i * 28})`}>
              <rect width="18" height="18" fill={cor} />
              <text x="28" y="14" fontSize="14" textAnchor="start">{tipo}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [slide, setSlide] = useState(0);
  const [eventos, setEventos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newsletterFeedback, setNewsletterFeedback] = useState('');
  const [contactoFeedback, setContactoFeedback] = useState('');
  const [newsletter, setNewsletter] = useState({ email: '', pais: 'default' });
  const [contacto, setContacto] = useState({ nome: '', email: '', telefone: '', assunto: 'default', mensagem: '' });
  const [mostrarExtra, setMostrarExtra] = useState({});
  const [form, setForm] = useState({ titulo: '', descricao: '', data: '', hora: '', cidade: 'default', local: '' });

  const noticiaAtual = noticias[slide];

  const paises = useMemo(() => ['Portugal', 'Espanha', 'França', 'Brasil', 'Estados Unidos', 'Reino Unido'], []);

  useEffect(() => {
    async function carregarEventos() {
      try {
        const dados = await api.listarEventos();
        setEventos(dados);
      } catch (erro) {
        setEventos(eventosBase);
        setFeedback('Não foi possível carregar os eventos da base de dados. Foram carregados eventos locais.');
      }
    }
    carregarEventos();
  }, []);


  function mudarSlide(delta) {
    setSlide((slide + delta + noticias.length) % noticias.length);
  }

  function limparFormulario() {
    setForm({ titulo: '', descricao: '', data: '', hora: '', cidade: 'default', local: '' });
    setEditId(null);
  }

  async function guardarEvento(e) {
    e.preventDefault();
    if (!form.titulo || !form.descricao || !form.data || !form.hora || !form.local || form.cidade === 'default') {
      setFeedback('Todos os campos são obrigatórios');
      return;
    }

    try {
      if (editId) {
        const eventoAtualizado = await api.atualizarEvento(editId, form);
        setEventos(eventos.map(evento => evento.id === editId ? eventoAtualizado : evento));
        setFeedback('Evento atualizado com sucesso na base de dados.');
      } else {
        const novoEvento = await api.criarEvento(form);
        setEventos([...eventos, novoEvento]);
        setFeedback('Evento adicionado com sucesso à base de dados.');
      }
      limparFormulario();
    } catch (erro) {
      setFeedback(erro.message || 'Erro ao guardar evento.');
    }
  }

  function editarEvento(evento) {
    setForm({ titulo: evento.titulo, descricao: evento.descricao, data: evento.data, hora: evento.hora, cidade: evento.cidade, local: evento.local });
    setEditId(evento.id);
    setFeedback('');
  }

  async function removerEvento(id) {
    try {
      await api.removerEvento(id);
      setEventos(eventos.filter(evento => evento.id !== id));
      setFeedback('Evento removido da base de dados.');
    } catch (erro) {
      setFeedback(erro.message || 'Erro ao remover evento.');
    }
  }

  async function subscrever(e) {
    e.preventDefault();
    setNewsletterFeedback('');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email.trim());

    if (!emailValido) {
      setNewsletterFeedback('Indique um e-mail válido para subscrever a newsletter.');
      return;
    }
    if (newsletter.pais === 'default') {
      setNewsletterFeedback('Selecione o país antes de subscrever.');
      return;
    }

    try {
      await api.subscreverNewsletter(newsletter);
      setNewsletter({ email: '', pais: 'default' });
      setNewsletterFeedback('Subscrição registada com sucesso na base de dados.');
    } catch (erro) {
      setNewsletterFeedback(erro.message || 'Erro ao registar subscrição.');
    }
  }


  async function enviarContacto(e) {
    e.preventDefault();
    setContactoFeedback('');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email.trim());
    const telefoneValido = /^\d{9}$/.test(contacto.telefone.trim());

    if (contacto.nome.trim().length < 2) {
      setContactoFeedback('Indique um nome válido.');
      return;
    }
    if (!emailValido) {
      setContactoFeedback('Indique um e-mail válido, por exemplo nome@dominio.pt.');
      return;
    }
    if (!telefoneValido) {
      setContactoFeedback('O telemóvel deve ter exatamente 9 dígitos.');
      return;
    }
    if (contacto.assunto === 'default') {
      setContactoFeedback('Selecione um assunto.');
      return;
    }
    if (contacto.mensagem.trim().length < 5) {
      setContactoFeedback('Escreva uma mensagem com pelo menos 5 caracteres.');
      return;
    }

    try {
      await api.enviarContacto(contacto);
      setContacto({ nome: '', email: '', telefone: '', assunto: 'default', mensagem: '' });
      setContactoFeedback('Mensagem de contacto guardada com sucesso na base de dados.');
    } catch (erro) {
      setContactoFeedback(erro.message || 'Erro ao guardar mensagem de contacto.');
    }
  }

  return (
    <>
      <button className="to-top" aria-label="Voltar ao topo da página" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>

      <section id="apresentacao" className="apresentacao" tabIndex="0">
        <div className="banner">
          <img src="/media/universidade.png" alt="Vista aérea da Universidade dos Açores" />
        </div>
        <div className="texto">
          <p>O <strong>Centro Académico Clínico dos Açores (CACA)</strong> é uma unidade de cooperação entre instituições de ensino superior, unidades de saúde e centros de investigação.</p>
          <p>O objetivo é aprofundar a investigação científica para que se conheça a realidade regional e os problemas diversos ao nível da saúde, como também apoiar a decisão política na área da saúde, contribuindo para a capacitação da área clínica.</p>
        </div>
      </section>

      <hr className="linebreak" />

      <section id="noticias" className="noticias" tabIndex="0">
        <h1>Notícias</h1>
        <div className="carrossel-noticias" aria-label="Notícias em destaque">
          <button className="carrossel-btn prev" aria-label="Notícia anterior" onClick={() => mudarSlide(-1)}>&lt;</button>
          <div className="carrossel-wrapper">
            <div className="carrossel-slides">
              <div className="carrossel-item active">
                <div className="grid-titulo-data">
                  <div className="grid-titulo"><h3>{noticiaAtual.titulo}</h3></div>
                  <div className="grid-data"><h3>{noticiaAtual.data}</h3></div>
                </div>
                <div className="grid-noticias">
                  <div className="grid-box-imagem"><img src={`/media/${noticiaAtual.imagem}`} alt={noticiaAtual.alt} /></div>
                  <div className="grid-box-texto"><p>{noticiaAtual.texto}</p></div>
                </div>
                <p className="noticias-categoria"><strong>{noticiaAtual.categoria}</strong></p>
              </div>
            </div>
          </div>
          <button className="carrossel-btn next" aria-label="Notícia seguinte" onClick={() => mudarSlide(1)}>&gt;</button>
          <div className="carrossel-indicadores" role="group" aria-label="Indicadores do carrossel">
            {noticias.map((_, i) => <span key={i} className={`indicador ${i === slide ? 'active' : ''}`} tabIndex="0" role="button" aria-label={`Ir para notícia ${i + 1}`} onClick={() => setSlide(i)} />)}
          </div>
        </div>

        <div className="newsletter-container">
          <div className="newsletter-logotipo3d"><DnaAnimado /></div>
          <div className="newsletter-formulario">
            <h3>Subscreva a nossa newsletter!</h3>
            <form aria-label="Formulário de subscrição da newsletter" onSubmit={subscrever} noValidate>
              <input type="email" placeholder="  📧 Insira o seu e-mail aqui" aria-label="Endereço de e-mail" value={newsletter.email} onChange={e => setNewsletter({ ...newsletter, email: e.target.value })} required />
              <select aria-label="País de residência" value={newsletter.pais} onChange={e => setNewsletter({ ...newsletter, pais: e.target.value })} required>
                <option value="default">🏳️ Selecione o seu país</option>
                {paises.map(pais => <option key={pais} value={pais}>{pais}</option>)}
              </select>
              <button type="submit">Subscrever</button>
              {newsletterFeedback && <p className={`form-feedback ${newsletterFeedback.includes('sucesso') ? 'sucesso' : 'erro'}`}>{newsletterFeedback}</p>}
            </form>
          </div>
        </div>
      </section>

      <hr className="linebreak" />

      <section id="investigacao" className="investigacao" tabIndex="0">
        <h1>Áreas de Investigação</h1>
        <div className="grid-investigacao">
          {[
            ['Epidemiologia', 'A epidemiologia é a ciência que estuda a distribuição, determinantes e prevenção de doenças em populações, sendo essencial para a tomada de decisões em saúde pública. Nos Açores, a doença Machado-Joseph é estudada epidemiologicamente, permitindo compreender sua prevalência, risco e impacto na comunidade.', 'Maria Silva', 'maria.silva@uac.pt'],
            ['Telemedicina', 'A telemedicina representa a prestação de cuidados de saúde à distância, sendo potenciada por plataformas que garantem a integridade dos dados, protocolos automáticos para a triagem eficiente e acesso rápido a histórico clínico. Nos Açores, a telemedicina pode permitir encaminhamentos rápidos entre ilhas, gerindo os diferentes recursos e incluindo a transferência segura de informações clínicas.', 'Ana Campos', 'ana.campos@uac.pt'],
            ['Saúde Mental', 'A saúde mental refere-se ao bem-estar emocional, psicológico e social de uma pessoa, influenciando como pensa, sente e age no dia a dia, bem como a capacidade de lidar com o stress, relacionar-se e tomar decisões. Sendo os Açores a região do país com maior taxa de obesidade e suicídios, a promoção estruturada do exercício físico pode contribuir simultaneamente para a saúde física e mental.', 'José Rocha', 'jose.rocha@uac.pt']
          ].map(([area, texto, professor, contacto]) => (
            <div className="grid-box-investigacao" key={area}>
              <h3>{area}</h3>
              <p>{texto} <a className="saiba-mais" role="button" tabIndex="0" onClick={() => setMostrarExtra({ ...mostrarExtra, [area]: !mostrarExtra[area] })}>Saiba mais</a></p>
              {mostrarExtra[area] && <div className="texto-extra visivel">A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores, profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações de mestrado e doutoramento dedicadas à saúde pública e às doenças genéticas na região.</div>}
              <p><strong>Professor Responsável:</strong> {professor}<br /><strong>Contacto:</strong> <a href={`mailto:${contacto}`}>{contacto}</a></p>
            </div>
          ))}
        </div>
        <GraficoProducao />
      </section>

      <hr className="linebreak" />

      <section id="eventos" className="eventos" tabIndex="0">
        <h1>Gestão de Eventos</h1>
        {feedback && <p className="feedback">{feedback}</p>}
        <div className="eventos-container">
          <form className="eventos-formulario" onSubmit={guardarEvento}>
            <h2>{editId ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
            <div className="form-group"><label>Título do Evento</label><input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder="Seminário de Saúde Mental" /></div>
            <div className="form-group"><label>Descrição</label><input type="text" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva o evento..." /></div>
            <div className="form-group"><label>Data do Evento</label><input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></div>
            <div className="form-group"><label>Hora do Evento</label><input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} /></div>
            <div className="form-group"><label>Local do Evento</label><select className="local-evento" value={form.cidade} onChange={e => setForm({ ...form, cidade: e.target.value })}><option value="default">Selecione um local</option><option value="Ponta Delgada">Ponta Delgada</option><option value="Angra do Heroísmo">Angra do Heroísmo</option><option value="Horta">Horta</option></select></div>
            <div className="form-group"><input value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} placeholder="Auditório Principal" /></div>
            <div className="form-buttons"><button className="btn-submit" type="submit">{editId ? 'Guardar Alterações' : 'Adicionar Evento'}</button>{editId && <button type="button" className="btn-cancelar" onClick={limparFormulario}>Cancelar</button>}</div>
          </form>

          <div className="eventos-lista">
            <h2>Eventos Registados</h2>
            <div id="lista-eventos" aria-label="Lista de eventos">
              {eventos.length === 0 && <p className="sem-eventos">Nenhum evento registado ainda.</p>}
              {eventos.map(evento => (
                <article className="evento-card" key={evento.id}>
                  <div className="evento-header">
                    <h3>{evento.titulo}</h3>
                    <div className="evento-actions"><button className="btn-editar" onClick={() => editarEvento(evento)}>Editar</button><button className="btn-remover" onClick={() => removerEvento(evento.id)}>Remover</button></div>
                  </div>
                  <div className="evento-weather"><span className="weather-placeholder">Indisponível para esta data/hora</span></div>
                  <div className="evento-info">
                    <div className="event-details-grid">
                      <div className="event-detail-item"><span className="detail-label">📅 Data</span><span className="detail-value">{formatarData(evento.data)}</span></div>
                      <div className="event-detail-item"><span className="detail-label">⏰ Hora</span><span className="detail-value">{evento.hora}</span></div>
                      <div className="event-detail-item"><span className="detail-label">📍 Auditório</span><span className="detail-value">{evento.local}</span></div>
                      <div className="event-detail-item"><span className="detail-label">📝 Descrição</span><span className="detail-value">{evento.descricao}</span></div>
                    </div>
                  </div>
                  <iframe className="mapa-container" title={`Mapa de ${evento.cidade}`} src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapas[evento.cidade] || mapas['Ponta Delgada']}&layer=mapnik&marker=${coordenadas[evento.cidade] || coordenadas['Ponta Delgada']}`} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="linebreak" />

      <section id="parceiros" className="parceiros" tabIndex="0">
        <h1>Instituições Parceiras</h1>
        <div className="grid-parceiros">
          {[
            ['UAc-2.png', 'Universidade dos Açores'],
            ['HDES-2.png', 'Hospital do Divino Espírito Santo'],
            ['USISM-2.png', 'Unidade de Saúde de Ilha de São Miguel'],
            ['INOVA-2.png', 'INOVA']
          ].map(([img, nome]) => (
            <a className="grid-box" href="#" key={img} aria-label={nome}>
              <span className="parceiro-brilho" />
              <img src={`/media/${img}`} alt={nome} />
              <span className="parceiro-nome">{nome}</span>
            </a>
          ))}
        </div>
      </section>

      <hr className="linebreak" />

      <section id="oportunidades" className="oportunidades" tabIndex="0">
        <h1>Oportunidades</h1>
        <div className="oportunidades-container">
          <div className="oportunidades-img"><img src="/media/oportunidades.jpg" alt="Investigador em laboratório" /></div>
          <div className="oportunidades-content">
            <p>Recrutamentos em curso no Centro Académico Clínico dos Açores:</p>
            <div className="tabela-content">
              <table className="tabela-oportunidades">
                <thead><tr><th>Nome da Oportunidade</th><th>Área</th><th>Modalidade</th><th>Estado</th></tr></thead>
                <tbody>
                  <tr><td>Bolsa de Investigação Epidemiológica</td><td>Saúde Pública</td><td>Voluntariado</td><td><span className="status aberta">ABERTA</span></td></tr>
                  <tr><td>Estágio Clínico - Medicina Interna</td><td>Clínica</td><td>Bolseiro</td><td><span className="status aberta">ABERTA</span></td></tr>
                  <tr><td>Projeto de Monitorização Genética</td><td>Genética</td><td>Contrato com termo certo</td><td><span className="status fechada">FECHADA</span></td></tr>
                  <tr><td>Doutoramento em Ciências Biomédicas</td><td>Investigação</td><td>Bolseiro</td><td><span className="status aberta">ABERTA</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <hr className="linebreak" />

      <section id="contactos" className="contactos" tabIndex="0">
        <h1 id="titulo-contactos">Contactos</h1>
        <div className="contactos-container">
          <div className="contacto-mapa">
            <iframe src="https://www.google.com/maps?q=Universidade+dos+Açores+Ponta+Delgada&output=embed" title="Mapa da Universidade dos Açores em Ponta Delgada" aria-label="Mapa mostrando a localização da Universidade dos Açores" />
          </div>
          <div className="contacto-info">
            <h4>📍 Morada:</h4>
            <p>Centro Académico Clínico dos Açores</p>
            <p>Universidade dos Açores</p>
            <p>Campus Universitário de Ponta Delgada</p>
            <p>9500-018 Ponta Delgada</p>
            <p>Ilha de São Miguel - Açores - Portugal</p>
            <br /><br />
            <h4>📞 Telefone:</h4>
            <p>(+351) 296 650 000</p>
            <br /><br />
            <h4>📧 Email:</h4>
            <a href="mailto:caca@uac.pt" aria-label="Enviar e-mail para caca@uac.pt">caca@uac.pt</a>
          </div>
          <div className="contacto-form">
            <h4>Contacte-nos:</h4>
            <form aria-label="Formulário de contacto" onSubmit={enviarContacto} noValidate>
              <input type="text" placeholder="Nome Completo" className="nome_contacto" aria-label="Nome completo" value={contacto.nome} onChange={e => setContacto({ ...contacto, nome: e.target.value })} required />
              <div className="mensagem-erro" aria-label="Nome não pode estar vazio"></div>
              <input type="email" placeholder="Email" className="email_contacto" aria-label="Endereço de e-mail" value={contacto.email} onChange={e => setContacto({ ...contacto, email: e.target.value })} required />
              <div className="mensagem-erro" aria-label="Email não pode estar vazio"></div>
              <div className="telemovel-group">
                <select aria-label="País de residência" className="indicativo_contacto" required>
                  <option value="+351">🇵🇹 +351</option>
                </select>
                <input type="tel" placeholder="Número de Telemóvel" className="telemovel_contacto" value={contacto.telefone} onChange={e => setContacto({ ...contacto, telefone: e.target.value })} required />
              </div>
              <div className="mensagem-erro" aria-label="Telemóvel não pode estar vazio"></div>
              <select className="assunto_contacto" aria-label="Assunto da mensagem" value={contacto.assunto} onChange={e => setContacto({ ...contacto, assunto: e.target.value })} required>
                <option value="default">Selecione um assunto</option>
                <option value="Pedido de informações">Pedido de informações</option>
                <option value="Proposta de parceria/colaboração">Proposta de parceria/colaboração</option>
                <option value="Informações sobre oportunidades">Informações sobre oportunidades</option>
                <option value="Participação em eventos/seminários">Participação em eventos/seminários</option>
                <option value="Sugestão/Reclamação">Sugestão/Reclamação</option>
                <option value="Outro Assunto">Outro Assunto</option>
              </select>
              <div className="mensagem-erro" aria-label="Assunto não pode estar vazio"></div>
              <textarea placeholder="Mensagem" className="mensagem_contacto" aria-label="Conteúdo da mensagem" value={contacto.mensagem} onChange={e => setContacto({ ...contacto, mensagem: e.target.value })} required />
              <div className="mensagem-erro" aria-label="Mensagem não pode estar vazio"></div>
              {contactoFeedback && <p className={`form-feedback ${contactoFeedback.includes('sucesso') ? 'sucesso' : 'erro'}`}>{contactoFeedback}</p>}
              <button type="submit" className="enviar">Enviar mensagem</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
