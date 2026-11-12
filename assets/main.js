/* ---- Edit once: every call / WhatsApp link on every page uses this ---- */
const CFG = { phone: "919443421194" };

document.querySelectorAll('[data-call]').forEach(a => a.href = 'tel:+' + CFG.phone);
document.querySelectorAll('[data-wa]').forEach(a => a.href = 'https://wa.me/' + CFG.phone + '?text=' + encodeURIComponent("Hello Saravanakumar, I would like to know more about health insurance."));
document.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());

/* mobile menu */
const hdr = document.querySelector('header.site'), burger = document.getElementById('burger');
if (burger) {
  const set = o => { hdr.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; };
  burger.addEventListener('click', () => set(!hdr.classList.contains('open')));
  document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}

/* reveal, once */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08, rootMargin: '0px 0px -4% 0px' });
document.querySelectorAll('.r').forEach(el => io.observe(el));

/* mobile call bar after the first screen */
const mbar = document.getElementById('mbar'), first = document.querySelector('.hero, .phero, .article');
if (mbar && first) new IntersectionObserver(([e]) => mbar.classList.toggle('show', !e.isIntersecting)).observe(first);

/* booking form -> WhatsApp with the message pre-written */
document.querySelectorAll('form.f').forEach(f => {
  const note = f.querySelector('.fnote');
  const d = f.querySelector('input[type=date]');
  if (d) { const t = new Date(); d.min = t.toISOString().slice(0, 10); }
  f.addEventListener('submit', e => {
    e.preventDefault();
    note.classList.remove('err');
    const name = f.name.value.trim(), ph = f.phone.value.replace(/\D/g, '');
    if (!name || ph.length < 10 || !f.consent.checked) {
      note.textContent = 'Please add your name, a 10-digit mobile number and tick the consent box.';
      note.classList.add('err'); return;
    }
    const date = f.date && f.date.value ? new Date(f.date.value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'any day';
    const msg = `Hello Saravanakumar, I am ${name} (${ph}). I would like a ${f.mode.value.toLowerCase()} consultation about: ${f.topic.value}. Preferred: ${date}, ${f.slot.value.toLowerCase()}.` + (f.msg.value.trim() ? ` Note: ${f.msg.value.trim()}` : '');
    window.open('https://wa.me/' + CFG.phone + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    note.textContent = 'Thank you. WhatsApp should now be open with your request ready to send. I will confirm your slot personally.';
  });
});
