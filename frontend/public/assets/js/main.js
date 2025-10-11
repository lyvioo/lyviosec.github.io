// LyvioSec - Main JavaScript

// Update year in footer
document.getElementById('y').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Smooth scroll for all anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.dark-nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form handling with validation
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
const btn = document.getElementById('submitBtn');
const replyto = document.getElementById('_replyto');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.style.color = '';
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    const data = new FormData(form);
    const nome = (data.get('nome') || '').trim();
    const email = (data.get('email') || '').trim();
    const empresa = (data.get('empresa') || '').trim();
    const mensagem = (data.get('mensagem') || '').trim();
    
    // Validation
    if (!nome) {
      msg.textContent = '⚠️ Informe seu nome.';
      msg.style.color = '#FF6B6B';
      btn.disabled = false;
      btn.textContent = 'Enviar proposta';
      return;
    }
    
    if (!/.+@.+\..+/.test(email)) {
      msg.textContent = '⚠️ Informe um e-mail válido.';
      msg.style.color = '#FF6B6B';
      btn.disabled = false;
      btn.textContent = 'Enviar proposta';
      return;
    }
    
    if (!empresa) {
      msg.textContent = '⚠️ Informe o nome da empresa.';
      msg.style.color = '#FF6B6B';
      btn.disabled = false;
      btn.textContent = 'Enviar proposta';
      return;
    }
    
    if (!mensagem) {
      msg.textContent = '⚠️ Descreva brevemente seu cenário/objetivo.';
      msg.style.color = '#FF6B6B';
      btn.disabled = false;
      btn.textContent = 'Enviar proposta';
      return;
    }
    
    // Set reply-to field
    replyto.value = email;
    
    // Submit form
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      
      if (res.ok) {
        form.reset();
        msg.textContent = '✅ Recebido! Obrigado — retornamos em até 1 dia útil.';
        msg.style.color = 'var(--brand-primary)';
      } else {
        const out = await res.json().catch(() => ({}));
        msg.textContent = out?.errors?.[0]?.message || '❌ Não foi possível enviar agora. Tente novamente.';
        msg.style.color = '#FF6B6B';
      }
    } catch {
      msg.textContent = '❌ Erro de rede. Verifique sua conexão.';
      msg.style.color = '#FF6B6B';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar proposta';
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards and timeline items
const animatedElements = document.querySelectorAll('.service-card, .timeline-item, .cert-badge');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});