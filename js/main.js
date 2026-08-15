/* ==========================================================================
   DOODLE LEARNING CENTER - MAIN INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Contact Form Validation (contact.html) --- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('emailAddress');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      const feedback = document.getElementById('formFeedback');

      [nameError, emailError, messageError].forEach(err => {
        if (err) err.style.display = 'none';
      });
      if (feedback) {
        feedback.className = '';
        feedback.style.display = 'none';
      }

      // Full Name Validation
      if (nameInput && !nameInput.value.trim()) {
        if (nameError) {
          nameError.textContent = 'Please enter your full name.';
          nameError.style.display = 'block';
        }
        isValid = false;
      }

      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address.';
          emailError.style.display = 'block';
        }
        isValid = false;
      }

      // Message Validation
      if (messageInput && messageInput.value.trim().length < 10) {
        if (messageError) {
          messageError.textContent = 'Message must be at least 10 characters long.';
          messageError.style.display = 'block';
        }
        isValid = false;
      }

      if (isValid && feedback) {
        feedback.textContent = 'Thank you! Your message has been submitted successfully.';
        feedback.classList.add('success');
        contactForm.reset();
      }
    });
  }

  /* --- 2. Interactive Feature Filter Tabs & Modal (index.html) --- */
  const filterButtons = document.querySelectorAll('.tab-btn');
  const featureCards = document.querySelectorAll('.interactive-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.dataset.filter;

        featureCards.forEach(card => {
          if (filterValue === 'all' || card.dataset.category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Feature Modal Data
  const featureDetails = {
    modules: {
      title: "Interactive Learning Modules",
      description: "Our course modules keep students engaged through active participation rather than passive viewing.",
      bullets: [
        "Bite-sized video lessons paired with instant quizzes",
        "Downloadable code playgrounds & exercise assets",
        "Self-paced learning paths customized to individual skill levels"
      ]
    },
    analytics: {
      title: "Real-Time Progress Analytics",
      description: "Never lose track of your growth with dynamic student dashboards designed for transparent evaluation.",
      bullets: [
        "Visual milestones for completed assignments & modules",
        "Automated grade estimates and feedback tracking",
        "Exportable learning summaries for academic reporting"
      ]
    },
    community: {
      title: "Collaborative Study Community",
      description: "Learning is better together. Our embedded forums bring students and mentors into one shared ecosystem.",
      bullets: [
        "24/7 student discussion forums and Q&A boards",
        "Peer code review and group assignment collaboration",
        "Direct messaging channel with certified course tutors"
      ]
    }
  };

  const learnMoreButtons = document.querySelectorAll('.btn-learn-more[data-feature]');
  const featureModal = document.getElementById('featureModal');
  const closeFeatureModal = document.getElementById('closeFeatureModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalBullets = document.getElementById('modalBullets');

  if (learnMoreButtons.length > 0 && featureModal) {
    learnMoreButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const featureKey = btn.dataset.feature;
        const data = featureDetails[featureKey];

        if (data) {
          if (modalTitle) modalTitle.textContent = data.title;
          if (modalDescription) modalDescription.textContent = data.description;
          if (modalBullets) {
            modalBullets.innerHTML = data.bullets.map(bullet => `<li>${bullet}</li>`).join('');
          }
          featureModal.classList.add('active');
        }
      });
    });

    const hideModal = () => featureModal.classList.remove('active');

    if (closeFeatureModal) closeFeatureModal.addEventListener('click', hideModal);
    featureModal.addEventListener('click', (e) => {
      if (e.target === featureModal) hideModal();
    });
  }

  /* --- 3. Live Search & Category Filter (courses.html) --- */
  const courseSearch = document.getElementById('courseSearch');
  const courseCategoryBtns = document.querySelectorAll('.course-tab-btn');
  const courseCards = document.querySelectorAll('.course-card');
  const noResultsMsg = document.getElementById('noResultsMsg');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function filterCourses() {
    let visibleCount = 0;

    courseCards.forEach(card => {
      const categoryMatch = (currentCategory === 'all') || (card.dataset.category === currentCategory);
      const titleData = card.dataset.title || '';
      const textMatch = titleData.toLowerCase().includes(currentSearchQuery.toLowerCase());

      if (categoryMatch && textMatch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (courseSearch) {
    courseSearch.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      filterCourses();
    });
  }

  if (courseCategoryBtns.length > 0) {
    courseCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        courseCategoryBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        currentCategory = btn.dataset.category;
        filterCourses();
      });
    });
  }

});