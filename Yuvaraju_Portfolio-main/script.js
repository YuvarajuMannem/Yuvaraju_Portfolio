// Mobile Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// Handle Direct Quick Message Submission
function handleDirectMessageSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const statusMsg = document.getElementById('form-status-msg');
  const submitBtn = form.querySelector('.btn-send-msg');

  const name = document.getElementById('msg-name').value || 'Anonymous Visitor';
  const contact = document.getElementById('msg-contact').value || 'Not provided';
  const message = document.getElementById('msg-text').value;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

  // Check if page is opened locally as file:/// or on web server (https://)
  const isLocalFile = window.location.protocol === 'file:';

  if (isLocalFile) {
    // When opened directly as local file:// (FormSubmit requires http/https web server)
    const mailtoUrl = `mailto:mannemyuvaraju9503@gmail.com?subject=${encodeURIComponent("Portfolio Message from " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nContact Details: " + contact + "\n\nMessage:\n" + message)}`;
    window.location.href = mailtoUrl;

    if (statusMsg) {
      statusMsg.className = 'form-status-badge success';
      statusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening your email client to send message directly to Yuvaraju... (Background FormSubmit active on live Vercel deployment)';
      statusMsg.style.display = 'inline-flex';
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Direct Message';
    form.reset();
  } else {
    // On Live Vercel / Web Server (https://)
    fetch('https://formsubmit.co/ajax/mannemyuvaraju9503@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Direct Message from ${name} (Portfolio)`,
        Sender_Name: name,
        Contact_Info: contact,
        Message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      if (statusMsg) {
        statusMsg.className = 'form-status-badge success';
        statusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent directly to Yuvaraju.';
        statusMsg.style.display = 'inline-flex';
      }
      form.reset();
    })
    .catch(error => {
      const mailtoUrl = `mailto:mannemyuvaraju9503@gmail.com?subject=${encodeURIComponent("Portfolio Message from " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nContact Details: " + contact + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoUrl;
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Direct Message';
    });
  }
}

// Smooth Scrolling for Internal Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Scroll Reveal Animations
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    '.about-card, .education-card, .experience-card, .skill-category, .cert-card, .project-card, .contact-card, .direct-message-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
