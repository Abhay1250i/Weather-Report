
document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements(a)
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const joinNowBtn = document.querySelector(".nav-links .cta-button");
  const registerButtons = document.querySelectorAll(
    ".cta-button.primary, #showRegister"
  );
  const loginButtons = document.querySelectorAll("#showLogin");
  const closeButtons = document.querySelectorAll(".close-modal");
  const mapModal = document.getElementById("mapModal");
  const exploreArtBtn = document.getElementById("exploreArtBtn");
  const mapCloseBtn = document.querySelector(".close-modal");

  // Open Login Modal
  if (joinNowBtn) {
    joinNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginModal) {
        loginModal.style.display = "flex";
        document.body.classList.add("modal-open");
      }
    });
  }

  // Open Register Modal from any register button
  registerButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (registerModal) {
        registerModal.style.display = "flex";
        if (loginModal) loginModal.style.display = "none";
        document.body.classList.add("modal-open");
      }
    });
  });

  // Switch to Login from Register
  loginButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginModal) loginModal.style.display = "flex";
      if (registerModal) registerModal.style.display = "none";
    });
  });

  // Close modals
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  });

  // Close modals when clicking outside
  [loginModal, registerModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.style.display = "none";
          document.body.classList.remove("modal-open");
        }
      });
    }
  });

  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Login functionality would go here!");
      if (loginModal) loginModal.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  }

  // Handle register form submission

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Registration functionality would go here!");
      if (registerModal) registerModal.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  }

  // Open Map Modal
  if (exploreArtBtn) {
    exploreArtBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (mapModal) {
        mapModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Close Map Modal
  if (mapCloseBtn) {
    mapCloseBtn.addEventListener("click", function () {
      if (mapModal) {
        mapModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close Map Modal when clicking outside
  if (mapModal) {
    mapModal.addEventListener("click", function (e) {
      if (e.target === mapModal) {
        mapModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Testimonial Slider
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".testimonial-dot");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);

// ===== Map Interactions =====
//little issue with clicks (a)
function initMapInteractions() {
  const allPaths = document.querySelectorAll(".allPaths");
  const nameTooltip = document.getElementById("name");
  const nameText = document.getElementById("namem");
  const dataDiv = document.getElementById("data");
  const stateSearchInput = document.getElementById("stateSearch");
  const stateList = document.getElementById("stateList");
  let activeState = null;

  // Enhanced mouseover effect for states(a)
  allPaths.forEach((path) => {
    const originalFill = path.style.fill || "#ececec";

    path.addEventListener("mouseover", function () {
      path.style.fill = "#27c22e"; // bright green hover
      path.style.strokeWidth = "1.5px";
      path.style.filter = "drop-shadow(0 4px 8px rgba(39,194,46,0.4))";

      if (nameText) nameText.innerText = path.getAttribute("name") || path.id;
      if (nameTooltip) {
        nameTooltip.style.opacity = "1";
        nameTooltip.style.color = "#27c22e";
        nameTooltip.style.borderColor = "#27c22e";
      }
      if (dataDiv)
        dataDiv.innerHTML = `<h3>${path.getAttribute("name") || path.id}</h3>`;
    });

    path.addEventListener("mouseleave", function () {
      if (activeState !== path.id) {
        path.style.fill = originalFill;
        path.style.strokeWidth = "0.5px";
        path.style.filter = "drop-shadow(0 2px 3px rgba(0,0,0,0.1))";
      }
      if (nameTooltip) nameTooltip.style.opacity = "0";
    });

    path.addEventListener("click", function () {
      if (activeState) {
        const prevActive = document.getElementById(activeState);
        if (prevActive) prevActive.style.fill = originalFill;
      }

      activeState = path.id;
      path.style.fill = "#1e7d22"; // darker green for active state
      path.style.strokeWidth = "2px";
      path.style.filter = "drop-shadow(0 6px 10px rgba(30,125,34,0.5))";

      if (nameText) nameText.innerText = path.getAttribute("name") || path.id;
      if (nameTooltip) nameTooltip.style.opacity = "1";
      setTimeout(() => {
        if (nameTooltip && nameTooltip.style.opacity === "1")
          nameTooltip.style.opacity = "0";
      }, 2000);
    });
  });

  // Tooltip movement
  window.addEventListener("mousemove", function (e) {
    if (nameTooltip) {
      nameTooltip.style.top = `${e.clientY + 15}px`;
      nameTooltip.style.left = `${e.clientX + 15}px`;
    }
  });

  // Search functionality
  if (stateSearchInput) {
    stateSearchInput.addEventListener("input", function () {
      const searchText = this.value.trim().toLowerCase();
      if (stateList) stateList.innerHTML = "";

      if (searchText.length === 0) {
        allPaths.forEach((path) => path.classList.remove("highlight"));
        return;
      }

      let hasResults = false;

      allPaths.forEach((path) => {
        const stateName = (path.getAttribute("name") || path.id).toLowerCase();

        if (stateName.includes(searchText)) {
          hasResults = true;
          path.classList.add("highlight");

          const listItem = document.createElement("li");
          listItem.textContent = path.getAttribute("name") || path.id;
          listItem.dataset.stateId = path.id;
          listItem.classList.add("search-result");

          listItem.addEventListener("click", function () {
            const targetState = document.getElementById(this.dataset.stateId);
            if (targetState) {
              targetState.dispatchEvent(new Event("click"));
            }
          });

          if (stateList) stateList.appendChild(listItem);
        } else {
          path.classList.remove("highlight");
        }
      });

      if (!hasResults && stateList) {
        const noResults = document.createElement("li");
        noResults.textContent = "No states found";
        noResults.style.color = "#27c22e"; // green instead of pink
        noResults.style.fontStyle = "italic";
        stateList.appendChild(noResults);
      }
    });
  }
}


  initMapInteractions();

  // Back to Top Button(a)
  const topBtn = document.getElementById("topBtn");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      if (topBtn) topBtn.style.display = "block";
    } else {
      if (topBtn) topBtn.style.display = "none";
    }
  };

  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
//all color set to green by now
//searchbar(a)
function filterList() {
  let input = document.getElementById('search').value.toLowerCase();
  let listItems = document.querySelectorAll('#list li');
  
  listItems.forEach(item => {
      let text = item.textContent.toLowerCase();
      item.style.display = text.includes(input) ? '' : 'none';
  });
}

