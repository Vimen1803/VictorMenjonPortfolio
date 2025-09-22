/* ---------------- PARTICLES ---------------- */
particlesJS('particles-js',{
  particles:{
    number:{value:90,density:{enable:true,value_area:900}},
    color:{value:'#ff2d2d'},
    shape:{type:'circle'},
    opacity:{value:0.5},
    size:{value:3,random:true},
    line_linked:{enable:true,distance:150,color:'#ff2d2d',opacity:0.4,width:1},
    move:{enable:true,speed:1.6,out_mode:'out'}
  },
  interactivity:{
    detect_on:'canvas',
    events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'},resize:true},
    modes:{grab:{distance:170,line_linked:{opacity:0.6}},push:{particles_nb:3}}
  },
  retina_detect:true
});

/* ---------------- TYPEWRITER ---------------- */
function typeText(el, text, speed=21){
  el.innerHTML = '';
  el.style.visibility = 'visible';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);

  let i = 0;
  function step(){
    if(i < text.length){
      const char = text.charAt(i);
      if(char === '\n'){ 
        const br = document.createElement('br');
        el.insertBefore(br, cursor);
      } else {
        el.insertBefore(document.createTextNode(char), cursor);
      }
      i++;
      setTimeout(step, speed);
    } else { 
      cursor.remove(); 
    }
  }
  step();
}

function queueWriters(els){
  let delay=0;
  els.forEach(el=>{
    const txt=el.getAttribute('data-typer') || '';
    setTimeout(()=>typeText(el,txt),delay);
    delay+=Math.min(1800,120+txt.length*6);
  });
}

/* Iniciar typewriter para secciones observadas */
const sections=Array.from(document.querySelectorAll('section'));
const typedSet=new WeakSet();
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const els=Array.from(entry.target.querySelectorAll('.typewriter[data-typer]')).filter(el=>!typedSet.has(el));
      if(els.length){ queueWriters(els); els.forEach(el=>typedSet.add(el)); }
    }
  });
},{threshold:0.25});
sections.forEach(s=>io.observe(s));
window.addEventListener('DOMContentLoaded',()=>{
  const first=document.querySelector('#info');
  if(first){
    const els=Array.from(first.querySelectorAll('.typewriter[data-typer]'));
    queueWriters(els); els.forEach(el=>typedSet.add(el));
  }
});

/* ---------------- NAVBAR ACTIVE ---------------- */
const navLinks=document.querySelectorAll('nav a');
const secciones=Array.from(navLinks).map(a=>document.querySelector(a.getAttribute('href')));
const sectionObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{threshold:0.5});
secciones.forEach(section=>{
  if(section) sectionObserver.observe(section);
});

/* ---------------- MENU HAMBURGUESA ---------------- */
const menuToggle=document.getElementById('menu-toggle'); 
const menu=document.getElementById('menu');
if(menuToggle && menu){
  menuToggle.addEventListener('click',()=>{menu.classList.toggle('show');});
  menu.querySelectorAll('a').forEach(a=>{ a.addEventListener('click', ()=>{ menu.classList.remove('show'); }); });
  document.addEventListener('click', (e) => {
    const isClickInside = menu.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside) menu.classList.remove('show');
  });
}

/* ---------------- EMAILJS + FORMULARIO ---------------- */
emailjs.init("MclWiiwxOuM5eq6ca");
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contacto form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const asunto = form.asunto.value.trim();
      const mensaje = form.mensaje.value.trim();
      emailjs.send("service_4p1yfgr", "template_dpssliw", {from_name: nombre, from_email: "victormnjfan@gmail.com", reply_to: email, subject: asunto, message: mensaje})
        .then(() => { 
          form.reset(); 
          mostrarPopup(form.dataset.popupEnviado, false); 
        })
        .catch((err) => { 
          mostrarPopup(form.dataset.popupError, true); 
        });
    });
  }

  function mostrarPopup(texto, esError=false){
    const popup = document.createElement('div');
    popup.textContent = texto;
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.bottom = '30px';
    popup.style.transform = 'translateX(-50%) translateY(50px)';
    popup.style.background = esError ? '#ff2d2d' : 'var(--card)';
    popup.style.color = esError ? '#fff' : 'var(--fg)';
    popup.style.border = esError ? '1px solid rgba(255,45,45,0.5)' : '1px solid var(--card-border)';
    popup.style.padding = '16px 24px';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = esError ? '0 12px 36px rgba(255,45,45,0.3)' : '0 12px 36px rgba(255,45,45,.14)';
    popup.style.fontWeight = '700';
    popup.style.fontSize = '16px';
    popup.style.zIndex = '9999';
    popup.style.textAlign = 'center';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    document.body.appendChild(popup);
    setTimeout(() => { popup.style.opacity = '1'; popup.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
    setTimeout(() => { popup.style.opacity = '0'; popup.style.transform = 'translateX(-50%) translateY(50px)'; setTimeout(() => popup.remove(), 400); }, esError ? 2500 : 2000);
  }
});

/* ---------------- TRADUCCIONES (COMPLETAS) ---------------- */
/* He conservado las traducciones completas (nombre + subtítulo incluidos).
   Si quieres que añada o cambie alguna frase en algún idioma, dime cuál. */
const texts = {
  es: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"ESTUDIANTE DE INGENIERÍA INFORMÁTICA",
    menu:["Información","Formación","Proyectos","Habilidades","Contacto"],
    info:"Tengo 19 años y soy estudiante de Ingeniería Informática, apasionado por la programación, la Inteligencia Artificial y la Ciberseguridad.\nMe considero constante, proactivo y autodidacta, siempre motivado por aprender y afrontar nuevos retos tecnológicos.",
    habilidades:"HABILIDADES",
    formacion:"FORMACIÓN",
    objetivo:"Desarrollarme en el ámbito de la informática, aportando valor en proyectos tecnológicos y creciendo de manera continua como profesional, con especial interés en la IA y la Ciberseguridad.",
    estudios:[
      { titulo:"Grado Universitario", datos:[
        { label:"Universidad", value:"Universidad de Zaragoza" },
        { label:"Carrera", value:"Grado en Ingeniería Informática" },
        { label:"Fecha", value:"2024 - Actual" }
      ]},
      { titulo:"Objetivo Profesional", datos:[
        { label:"", value:"Desarrollarme en el ámbito de la informática, aportando valor en proyectos tecnológicos y creciendo de manera continua como profesional, con especial interés en la IA y la Ciberseguridad." }
      ]}
    ],
    portfolio:"MIS PROYECTOS",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino creado en Python. Completamente funcional basado en juegos de azar, guardado de cuentas con contraseña y 2FA, con base de datos alojada en JSON." },
      { titulo:"WebLA-Django", descripcion:"Plataforma web desarrollada en Django para mostrar información detallada sobre datos extraidos desde APIs externas y JSON locales." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio el cual trata diferentes ámbitos, incluyendo un formulario de contacto y demás especialidades." },
      { titulo:"GSenku - C++", descripcion:"Famoso juego chino recreado en C++. Con distintos tipos de tablero y movimientos habilitados, se maneja a través de la terminal o un compilador de C++" }
    ],
    contacto:"CONTACTO",
    formulario:{ nombre:"Tu nombre", email:"Tu email", asunto:"Asunto", mensaje:"Tu mensaje", boton:"Enviar",mensajeEnviado: "Mensaje Enviado",errorEnvio: "Error al enviar el mensaje"},
    cv:"Descargar CV",
    banner: "img/banner/banner_ES.png"
  },
  en: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"COMPUTER ENGINEERING STUDENT",
    menu:["Info","Education","Projects","Skills","Contact"],
    info:"I am 19 years old and a Computer Engineering student, passionate about programming, AI and Cybersecurity.\nI am constant, proactive and self-taught, always motivated to learn and face new technological challenges.",
    habilidades:"SKILLS",
    formacion:"EDUCATION",
    objetivo:"To develop myself in the field of computer science, contributing value to technological projects and continuously growing as a professional, with special interest in AI and Cybersecurity.",
    estudios:[
      { titulo:"University Degree", datos:[
        { label:"University", value:"University of Zaragoza" },
        { label:"Degree", value:"Computer Engineering" },
        { label:"Date", value:"2024 - Present" }
      ]},
      { titulo:"Professional Goal", datos:[
        { label:"", value:"To develop myself in the field of computer science, contributing value to technological projects and continuously growing as a professional, with special interest in AI and Cybersecurity." }
      ]}
    ],
    portfolio:"MY PROJECTS",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino created in Python. Fully functional based on games of chance, account storage with password and 2FA, with a JSON database." },
      { titulo:"WebLA-Django", descripcion:"Web platform developed in Django to display detailed information from external APIs and local JSON data." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio covering different areas, including a contact form and other specialties." },
      { titulo:"GSenku - C++", descripcion:"Famous Chinese game recreated in C++. With different types of boards and enabled moves, managed via terminal or C++ compiler." }
    ],
    contacto:"CONTACT",
    formulario:{ nombre:"Your name", email:"Your email", asunto:"Subject", mensaje:"Your message", boton:"Send",mensajeEnviado: "Message Sent",errorEnvio: "Error sending message"},
    cv:"Download CV",
    banner: "img/banner/banner_EN.png"
  },
  ca: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"ESTUDIANT D'ENGINYERIA INFORMÀTICA",
    menu:["Informació","Formació","Portfolio","Habilitats","Contacte"],
    info:"Tinc 19 anys i sóc estudiant d'Enginyeria Informàtica, apassionat per la programació, la IA i la Ciberseguretat.\nEm considero constant, proactiu i autodidacta, sempre motivat per aprendre i afrontar nous reptes tecnològics.",
    habilidades:"HABILITATS",
    formacion:"FORMACIÓ",
    objetivo:"Desenvolupar-me en l'àmbit de la informàtica, aportant valor en projectes tecnològics i creixent de manera contínua com a professional, amb especial interès per IA i Ciberseguretat.",
    estudios:[
      { titulo:"Grau Universitari", datos:[
        { label:"Universitat", value:"Universitat de Saragossa" },
        { label:"Carrera", value:"Grau en Enginyeria Informàtica" },
        { label:"Data", value:"2024 - Actual" }
      ]},
      { titulo:"Objectiu Professional", datos:[
        { label:"", value:"Desenvolupar-me en l'àmbit de la informàtica, aportant valor en projectes tecnològics i creixent de manera contínua com a professional, amb especial interès per IA i Ciberseguretat." }
      ]}
    ],
    portfolio:"ELS MEUS PROJECTES",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino creat en Python. Completament funcional basat en jocs d'atzar, emmagatzematge de comptes amb contrasenya i 2FA, amb base de dades en JSON." },
      { titulo:"WebLA-Django", descripcion:"Plataforma web desenvolupada en Django per mostrar informació detallada de dades extretes d'APIs externes i JSON locals." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio que tracta diferents àmbits, incloent un formulari de contacte i altres especialitats." },
      { titulo:"GSenku - C++", descripcion:"Famos joc xinès recreat en C++. Amb diferents tipus de tauler i moviments habilitats, es maneja a través del terminal o un compilador de C++." }
    ],
    contacto:"CONTACTE",
    formulario:{ nombre:"El teu nom", email:"El teu email", asunto:"Assumpte", mensaje:"El teu missatge", boton:"Enviar",mensajeEnviado: "Missatge enviat",errorEnvio: "Error en enviar el missatge"},
    cv:"Descarregar CV",
    banner: "img/banner/banner_CA.png"
  },
  fr: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"ÉTUDIANT EN INFORMATIQUE",
    menu:["Info","Éducation","Portfolio","Compétences","Contact"],
    info:"J'ai 19 ans et je suis étudiant en informatique, passionné par la programmation, l'IA et la cybersécurité.\nJe me considère constant, proactif et autodidacte, toujours motivé pour apprendre et relever de nouveaux défis technologiques.",
    habilidades:"COMPÉTENCES",
    formacion:"ÉDUCATION",
    objetivo:"Me développer dans le domaine de l'informatique, en apportant de la valeur aux projets technologiques et en évoluant continuellement en tant que professionnel, avec un intérêt particulier pour l'IA et la cybersécurité.",
    estudios:[
      { titulo:"Diplôme Universitaire", datos:[
        { label:"Université", value:"Université de Saragosse" },
        { label:"Filière", value:"Ingénierie Informatique" },
        { label:"Date", value:"2024 - Présent" }
      ]},
      { titulo:"Objectif Professionnel", datos:[
        { label:"", value:"Me développer dans le domaine de l'informatique, en apportant de la valeur aux projets technologiques et en évoluant continuellement en tant que professionnel, avec un intérêt particulier pour l'IA et la cybersécurité." }
      ]}
    ],
    portfolio:"MES PROJETS",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino créé en Python. Entièrement fonctionnel basé sur des jeux de hasard, stockage des comptes avec mot de passe et 2FA, avec une base de données JSON." },
      { titulo:"WebLA-Django", descripcion:"Plateforme web développée en Django pour afficher des informations provenant d'APIs externes et JSON locaux." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio couvrant différents domaines, incluant un formulaire de contact et d'autres spécialités." },
      { titulo:"GSenku - C++", descripcion:"Jeu chinois recréé en C++. Différents plateaux et mouvements, géré via terminal ou compilateur C++." }
    ],
    contacto:"CONTACT",
    formulario:{ nombre:"Votre nom", email:"Votre email", asunto:"Sujet", mensaje:"Votre message", boton:"Envoyer", mensajeEnviado:"Message envoyé", errorEnvio:"Erreur lors de l'envoi du message"},
    cv:"Télécharger CV",
    banner: "img/banner/banner_FR.png"
  },
  it: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"STUDENTE DI INGEGNERIA INFORMATICA",
    menu:["Informazioni","Formazione","Portfolio","Competenze","Contatto"],
    info:"Ho 19 anni e sono uno studente di Ingegneria Informatica, appassionato di programmazione, IA e Cybersecurity.\nMi considero costante, proattivo e autodidatta, sempre motivato ad apprendere e affrontare nuove sfide tecnologiche.",
    habilidades:"COMPETENZE",
    formacion:"FORMAZIONE",
    objetivo:"Svilupparmi nel campo dell'informatica, apportando valore ai progetti tecnologici e crescendo continuamente come professionista, con particolare interesse per l'IA e la Cybersecurity.",
    estudios:[
      { titulo:"Laurea Universitaria", datos:[
        { label:"Università", value:"Università di Saragozza" },
        { label:"Corso", value:"Ingegneria Informatica" },
        { label:"Data", value:"2024 - Attuale" }
      ]},
      { titulo:"Obiettivo Professionale", datos:[
        { label:"", value:"Svilupparmi nel campo dell'informatica, apportando valore ai progetti tecnologici e crescendo continuamente come professionista, con particolare interesse per l'IA e la Cybersecurity." }
      ]}
    ],
    portfolio:"I MIEI PROGETTI",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino creato in Python. Completamente funzionante basato su giochi d'azzardo, salvataggio account con password e 2FA, con database JSON." },
      { titulo:"WebLA-Django", descripcion:"Piattaforma web sviluppata in Django per mostrare informazioni dettagliate da API esterne e JSON locali." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio che tratta diversi ambiti, inclusi modulo di contatto e altre specialità." },
      { titulo:"GSenku - C++", descripcion:"Famoso gioco cinese ricreato in C++. Diversi tabelloni e movimenti, gestito tramite terminale o compilatore C++." }
    ],
    contacto:"CONTATTO",
    formulario:{ nombre:"Il tuo nome", email:"La tua email", asunto:"Oggetto", mensaje:"Il tuo messaggio", boton:"Invia", mensajeEnviado:"Messaggio inviato", errorEnvio:"Errore nell'invio del messaggio"},
    cv:"Scarica CV",
    banner: "img/banner/banner_IT.png"
  },
  de: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"INFORMATIKSTUDENT",
    menu:["Information","Bildung","Portfolio","Fähigkeiten","Kontakt"],
    info:"Ich bin 19 Jahre alt und Informatikstudent, leidenschaftlich für Programmierung, KI und Cybersicherheit.\nIch betrachte mich als konstant, proaktiv und autodidaktisch, immer motiviert zu lernen und neue technologische Herausforderungen anzugehen.",
    habilidades:"FÄHIGKEITEN",
    formacion:"BILDUNG",
    objetivo:"Mich im Bereich Informatik weiterzuentwickeln, Werte zu technologischen Projekten beizutragen und kontinuierlich als Fachkraft zu wachsen, mit besonderem Interesse an KI und Cybersicherheit.",
    estudios:[
      { titulo:"Universitätsabschluss", datos:[
        { label:"Universität", value:"Universität Zaragoza" },
        { label:"Studiengang", value:"Informatik" },
        { label:"Datum", value:"2024 - Gegenwart" }
      ]},
      { titulo:"Berufliches Ziel", datos:[
        { label:"", value:"Mich im Bereich Informatik weiterzuentwickeln, Werte zu technologischen Projekten beizutragen und kontinuierlich als Fachkraft zu wachsen, mit besonderem Interesse an KI und Cybersicherheit." }
      ]}
    ],
    portfolio:"MEINE PROJEKTE",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Casino in Python erstellt. Voll funktionsfähig basierend auf Glücksspielen, Kontospeicherung mit Passwort und 2FA, mit JSON-Datenbank." },
      { titulo:"WebLA-Django", descripcion:"Webplattform in Django entwickelt, um detaillierte Informationen von externen APIs und lokalen JSON-Daten anzuzeigen." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfolio, das verschiedene Bereiche abdeckt, einschließlich eines Kontaktformulars und anderer Spezialitäten." },
      { titulo:"GSenku - C++", descripcion:"Berühmtes chinesisches Spiel in C++ nachgebildet. Verschiedene Bretter und Bewegungen, verwaltet über Terminal oder Compiler." }
    ],
    contacto:"KONTAKT",
    formulario:{ nombre:"Ihr Name", email:"Ihre Email", asunto:"Betreff", mensaje:"Ihre Nachricht", boton:"Senden", mensajeEnviado:"Nachricht gesendet", errorEnvio:"Fehler beim Senden der Nachricht"},
    cv:"CV Herunterladen",
    banner: "img/banner/banner_DE.png"
  },
  ru: {
    nombre:"ВИКТОР МЕНХОН",
    subtitulo:"СТУДЕНТ КОМПЬЮТЕРНОЙ ИНЖЕНЕРИИ",
    menu:["Информация","Образование","Портфолио","Навыки","Контакт"],
    info:"Мне 19 лет, я студент факультета компьютерной инженерии, увлечен программированием, ИИ и кибербезопасностью.\nЯ считаю себя целеустремленным, проактивным и самоучкой, всегда мотивирован учиться и решать новые технологические задачи.",
    habilidades:"НАВЫКИ",
    formacion:"ОБРАЗОВАНИЕ",
    objetivo:"Развиваться в области информатики, вносить ценность в технологические проекты и непрерывно расти как профессионал, с особым интересом к ИИ и кибербезопасности.",
    estudios:[
      { titulo:"Университетская степень", datos:[
        { label:"Университет", value:"Университет Сарагосы" },
        { label:"Специальность", value:"Компьютерная инженерия" },
        { label:"Дата", value:"2024 - настоящее время" }
      ]},
      { titulo:"Профессиональная цель", datos:[
        { label:"", value:"Развиваться в области информатики, вносить ценность в технологические проекты и непрерывно расти как профессионал, с особым интересом к ИИ и кибербезопасности." }
      ]}
    ],
    portfolio:"МОИ ПРОЕКТЫ",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Казино, созданное на Python. Полностью функциональное, основано на азартных играх, хранение аккаунтов с паролем и 2FA, база данных в формате JSON." },
      { titulo:"WebLA-Django", descripcion:"Веб-платформа, разработанная на Django, для отображения подробной информации из внешних API и локальных JSON данных." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Портфолио, охватывающее различные области, включая форму обратной связи и другие особенности." },
      { titulo:"GSenku - C++", descripcion:"Известная китайская игра, воссозданная на C++. С различными типами досок и разрешенными ходами, управляется через терминал или компилятор C++." }
    ],
    contacto:"КОНТАКТ",
    formulario:{ nombre:"Ваше имя", email:"Ваш email", asunto:"Тема", mensaje:"Ваше сообщение", boton:"Отправить", mensajeEnviado:"Сообщение отправлено", errorEnvio:"Ошибка при отправке сообщения"},
    cv:"Скачать CV",
    banner: "img/banner/banner_RU.png"
  },
  pt: {
    nombre:"VICTOR MENJÓN",
    subtitulo:"ESTUDANTE DE ENGENHARIA INFORMÁTICA",
    menu:["Informações","Formação","Portfólio","Habilidades","Contato"],
    info:"Tenho 19 anos e sou estudante de Engenharia Informática, apaixonado por programação, IA e Cibersegurança.\nConsidero-me constante, proativo e autodidata, sempre motivado para aprender e enfrentar novos desafios tecnológicos.",
    habilidades:"HABILIDADES",
    formacion:"FORMAÇÃO",
    objetivo:"Desenvolver-me na área da informática, contribuindo com valor em projetos tecnológicos e crescendo continuamente como profissional, com especial interesse em IA e Cibersegurança.",
    estudios:[
      { titulo:"Graduação Universitária", datos:[
        { label:"Universidade", value:"Universidade de Zaragoza" },
        { label:"Curso", value:"Engenharia Informática" },
        { label:"Período", value:"2024 - Presente" }
      ]},
      { titulo:"Objetivo Profissional", datos:[
        { label:"", value:"Desenvolver-me na área da informática, contribuindo com valor em projetos tecnológicos e crescendo continuamente como profissional, com especial interesse em IA e Cibersegurança." }
      ]}
    ],
    portfolio:"MEUS PROJETOS",
    proyectos:[
      { titulo:"Casino-2FA-JsonDB-Python", descripcion:"Cassino criado em Python. Totalmente funcional, baseado em jogos de azar, armazenamento de contas com senha e 2FA, com base de dados em JSON." },
      { titulo:"WebLA-Django", descripcion:"Plataforma web desenvolvida em Django para exibir informações detalhadas de APIs externas e dados JSON locais." },
      { titulo:"Portfolio - Victor Menjon", descripcion:"Portfólio cobrindo diferentes áreas, incluindo um formulário de contato e outras especialidades." },
      { titulo:"GSenku - C++", descripcion:"Famoso jogo chinês recriado em C++. Com diferentes tipos de tabuleiros e movimentos habilitados, gerenciado via terminal ou compilador C++." }
    ],
    contacto:"CONTATO",
    formulario:{ nombre:"Seu nome", email:"Seu email", asunto:"Assunto", mensaje:"Sua mensagem", boton:"Enviar", mensagemEnviado:"Mensagem enviada", errorEnvio:"Erro ao enviar a mensagem"},
    cv:"Baixar CV",
    banner: "img/banner/banner_PT.png"
  }
};

/* ---------------- helper: PONER ICONO + HREF en el botón CV ---------------- */
const cvButton = document.querySelector('.btn-cv');

function setCvButton(lang){
  if(!cvButton) return;
  // SVG de Heroicons para "download" (inline)
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-download" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/></svg>';
  const href = `CV/CV_Victor_Menjon_${(lang||'es').toUpperCase()}.pdf`;
  cvButton.setAttribute('href', href);
  cvButton.setAttribute('download', '');
  // Usamos innerHTML para no eliminar el SVG y mostramos el texto traducido
  cvButton.innerHTML = `${svg}<span>${texts[lang]?.cv || texts['es'].cv}</span>`;
}

/* ---------------- ACTUALIZAR FORMACIÓN ---------------- */
function updateFormacion(lang){
  const cardContainer = document.querySelector('#formacion .formacion');
  if(!cardContainer) return;
  cardContainer.innerHTML='';
  (texts[lang].estudios || []).forEach(est=>{
    const card = document.createElement('div');
    card.className = 'fo-card';
    let html = `<h3>${est.titulo}</h3>`;
    est.datos.forEach(d=>{
      if(d.label) html += `<p class="muted"><strong>${d.label}:</strong> ${d.value}</p>`;
      else html += `<p class="muted">${d.value}</p>`;
    });
    card.innerHTML = html;
    cardContainer.appendChild(card);
  });
}

/* ---------------- CAMBIO DE IDIOMA ---------------- */
const dropdown = document.getElementById('language-selector');
const selected = dropdown ? dropdown.querySelector('.language-selected') : null;
const options = dropdown ? dropdown.querySelector('.language-options') : null;
const menuLinks = document.querySelectorAll('nav .menu a');

function changeLanguage(lang){
  // actualizar menú
  menuLinks.forEach((link,i)=>{
    if(texts[lang].menu && texts[lang].menu[i]) {
      link.setAttribute('data-typer',texts[lang].menu[i]);
      link.textContent='';
      typeText(link,texts[lang].menu[i],18);
    }
  });

  // nombre / subtítulo (se tipean)
  const nombreEl = document.querySelector('#info .nombre');
  const subtEl = document.querySelector('#info .subtitulo');
  if(nombreEl) nombreEl.setAttribute('data-typer', texts[lang].nombre || '');
  if(subtEl) subtEl.setAttribute('data-typer', texts[lang].subtitulo || '');

  // texto principal del banner y secciones (typewriters)
  const infoType = document.querySelector('#info .typewriter');
  if(infoType) infoType.setAttribute('data-typer',texts[lang].info || '');
  const habType = document.querySelector('#hab-apt .typewriter');
  if(habType) habType.setAttribute('data-typer',texts[lang].habilidades || '');
  const formType = document.querySelector('#formacion .typewriter');
  if(formType) formType.setAttribute('data-typer',texts[lang].formacion || '');
  const portType = document.querySelector('#portfolio .typewriter');
  if(portType) portType.setAttribute('data-typer',texts[lang].portfolio || '');
  const contType = document.querySelector('#contacto .typewriter');
  if(contType) contType.setAttribute('data-typer',texts[lang].contacto || '');

  // CV: href + icono + texto
  setCvButton(lang);

  // portfolio items (titulos y descripciones)
  const portfolioItems=document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item,i)=>{
    if(texts[lang].proyectos && texts[lang].proyectos[i]){
      const t = texts[lang].proyectos[i];
      const titleEl = item.querySelector('.portfolio-title');
      const descEl = item.querySelector('.portfolio-desc');
      if(titleEl) titleEl.textContent = t.titulo;
      if(descEl) descEl.textContent = t.descripcion;
    }
  });

  // formulario: placeholders y mensajes
  const form=document.querySelector('#contacto form');
  if(form && texts[lang].formulario){
    form.nombre.placeholder=texts[lang].formulario.nombre;
    form.email.placeholder=texts[lang].formulario.email;
    form.asunto.placeholder=texts[lang].formulario.asunto;
    form.mensaje.placeholder=texts[lang].formulario.mensaje;
    form.querySelector('button[type="submit"]').textContent=texts[lang].formulario.boton;
    form.dataset.popupEnviado = texts[lang].formulario.mensajeEnviado;
    form.dataset.popupError = texts[lang].formulario.errorEnvio;
  }

  updateFormacion(lang);

  // encolamos los writers (nombre, subtitulo y demás)
  const writers = [
    document.querySelector('#info .nombre'),
    document.querySelector('#info .subtitulo'),
    document.querySelector('#info .typewriter'),
    document.querySelector('#hab-apt .typewriter'),
    document.querySelector('#formacion .typewriter'),
    document.querySelector('#portfolio .typewriter'),
    document.querySelector('#contacto .typewriter')
  ].filter(Boolean);
  queueWriters(writers);
}

/* ---------------- DROPDOWN IDIOMA ---------------- */
if(selected){
  selected.addEventListener('click', (e) => {
    const isOpen = dropdown.classList.toggle('open');
    dropdown.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    options.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });
}

document.addEventListener('click', (e) => {
  if(dropdown && !dropdown.contains(e.target)){
    dropdown.classList.remove('open');
    dropdown.setAttribute('aria-expanded', 'false');
    options.setAttribute('aria-hidden', 'true');
  }
});

const optionDivs = options ? options.querySelectorAll('div[data-lang]') : [];
function actualizarOpcionesVisibles() {
  if(!selected) return;
  const currentLang = selected.getAttribute('data-lang');
  optionDivs.forEach(opt => {
    if (opt.getAttribute('data-lang') === currentLang) opt.classList.add('selected');
    else opt.classList.remove('selected');
    opt.style.display = 'flex';
  });
}

optionDivs.forEach(opt => {
  opt.addEventListener('click', () => {
    const lang = opt.getAttribute('data-lang');
    const svg = opt.querySelector('svg') ? opt.querySelector('svg').outerHTML : '';
    const text = opt.textContent.trim();
    selected.innerHTML = svg + ' ' + text;
    selected.setAttribute('data-lang', lang);
    dropdown.classList.remove('open');
    dropdown.setAttribute('aria-expanded', 'false');
    options.setAttribute('aria-hidden', 'true');
    
    changeLanguage(lang);
    actualizarOpcionesVisibles();

    localStorage.setItem('preferredLang', lang);
  });
});

actualizarOpcionesVisibles();
(function initLanguage(){
  let initLang = localStorage.getItem('preferredLang') || 'es';

  const opt = options ? options.querySelector(`div[data-lang="${initLang}"]`) : null;
  const svg = opt && opt.querySelector('svg') ? opt.querySelector('svg').outerHTML : '';
  const text = opt ? opt.textContent.trim() : initLang.toUpperCase();
  if(selected) selected.innerHTML = svg + ' ' + text;
  if(selected) selected.setAttribute('data-lang', initLang);

  // Aseguramos que el botón CV tenga icono en carga inicial
  setCvButton(initLang);

  changeLanguage(initLang);
  actualizarOpcionesVisibles();

  // --- POPUPS DE LENGUAJES ---
document.querySelectorAll('.lang-info').forEach(el => {
  const popup = el.querySelector('.lang-popup');
  try {
    const langs = JSON.parse(el.dataset.langs);
    const ul = document.createElement('ul');
    langs.forEach(l => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${l.img}" alt="${l.name}"> ${l.name}: ${l.pct}`;
      ul.appendChild(li);
    });
    popup.appendChild(ul);
  } catch (err) {
    popup.textContent = el.dataset.langs; // fallback por si no es JSON válido
  }
});
})();