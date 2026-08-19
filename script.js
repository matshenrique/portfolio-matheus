
// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// Card tilt microinteraction
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = (y / rect.height) * -10;
        const ry = (x / rect.width) * 10;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Form validation and mock submit
const form = document.getElementById('contact-form');
if (form) {
    const msg = document.getElementById('form-msg');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        // Simple validation
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            msg.textContent = 'Por favor, preencha todos os campos.';
            msg.style.color = '#ffb3b3';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            msg.textContent = 'Por favor, informe um email válido.';
            msg.style.color = '#ffb3b3';
            return;
        }

        // Simula envio
        msg.style.color = '#b7ffcb';
        msg.textContent = 'Enviando mensagem...';
        form.querySelector('button[type="submit"]').disabled = true;

        setTimeout(() => {
            msg.textContent = 'Mensagem enviada com sucesso — obrigado!';
            form.reset();
            form.querySelector('button[type="submit"]').disabled = false;
        }, 1000);
    });
}
