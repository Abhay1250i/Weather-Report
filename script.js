document.addEventListener("DOMContentLoaded", function () {
  const stateSearchInput = document.getElementById("stateSearch");
  const stateList = document.getElementById("stateList");
  const allPaths = document.querySelectorAll(".allPaths");
  const nameTooltip = document.getElementById("name");
  const nameText = document.getElementById("namem");
  let activeState = null;
  document.querySelectorAll(".allPaths").forEach((e) => {
    const originalFill = e.style.fill || "#ececec";
e.addEventListener("mouseover", function () {
  e.style.fill = "#27c22e"; // Bright green
  e.style.transform = "scale(1.02) translate(-2px, -2px)";
  e.style.filter = "drop-shadow(0 5px 10px rgba(39, 194, 46, 0.4))"; // Green shadow

  document.getElementById("namem").innerText =
    e.getAttribute("name") || e.id;
  document.getElementById("name").style.opacity = 1;
  document.getElementById("name").style.color = "#27c22e"; // Green text
  document.getElementById("name").style.borderColor = "#27c22e"; // Green border
});

e.addEventListener("mouseleave", function () {
  e.style.fill = originalFill;
  e.style.transform = "";
  e.style.filter = "drop-shadow(0 2px 3px rgba(0,0,0,0.1))";
  document.getElementById("name").style.opacity = 0;
});

e.addEventListener("click", function () {
  e.style.fill = "#1e7d22"; // Darker green for clicked state
  e.style.filter = "drop-shadow(0 6px 12px rgba(30, 125, 34, 0.5))"; // Deeper green shadow
});

  });
  // Enhanced mouseover effect for states
  allPaths.forEach((e) => {
    // Store original fill color
    const originalFill = e.style.fill || "#ececec";

    e.addEventListener("mouseover", function () {
      // Cancel any ongoing animations
      e.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      // Apply hover effect
      e.style.fill = "#ff6b9d";
      e.style.strokeWidth = "1.5px";
      e.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.2))";

      // Update tooltip
      nameText.innerText = e.getAttribute("name") || e.id;
      nameTooltip.style.opacity = "1";
      nameTooltip.style.transform = "scale(1.05)";

      // Highlight corresponding item in state list
      highlightListItems(e.id);
    });

    e.addEventListener("mouseleave", function () {
      // Only revert if not the active state
      if (activeState !== e.id) {
        e.style.fill = originalFill;
        e.style.strokeWidth = "0.5px";
        e.style.filter = "drop-shadow(0 2px 3px rgba(0,0,0,0.1))";
      }

      // Hide tooltip
      nameTooltip.style.opacity = "0";
      nameTooltip.style.transform = "scale(1)";
    });

    e.addEventListener("click", function () {
      // Reset previously active state
      if (activeState) {
        const prevActive = document.getElementById(activeState);
        if (prevActive) {
          prevActive.style.fill = originalFill;
          prevActive.style.strokeWidth = "0.5px";
        }
      }

      // Set new active state
      activeState = e.id;
      e.style.fill = "#1e7d22";
      e.style.strokeWidth = "2px";
      e.style.filter = "drop-shadow(0 6px 10px rgba(0,0,0,0.3))";

      // Show state name in tooltip for 2 seconds
      nameText.innerText = e.getAttribute("name") || e.id;
      nameTooltip.style.opacity = "1";
      setTimeout(() => {
        if (nameTooltip.style.opacity === "1") {
          nameTooltip.style.opacity = "0";
        }
      }, 2000);
    });
  });

  // Improved tooltip movement
  window.addEventListener("mousemove", function (j) {
    const x = j.clientX;
    const y = j.clientY;
    nameTooltip.style.top = `${y + 15}px`;
    nameTooltip.style.left = `${x + 15}px`;
  });

  // Enhanced search functionality
  stateSearchInput.addEventListener("input", function () {
    const searchText = this.value.trim().toLowerCase();
    stateList.innerHTML = "";

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

        // Click handler for list items
        listItem.addEventListener("click", function () {
          const targetState = document.getElementById(this.dataset.stateId);
          if (targetState) {
            targetState.dispatchEvent(new Event("click"));
            targetState.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });

        stateList.appendChild(listItem);
      } else {
        path.classList.remove("highlight");
      }
    });

    // Show "no results" message if needed
    if (!hasResults) {
      const noResults = document.createElement("li");
      noResults.textContent = "No states found";
      noResults.style.color = "#ff6b9d";
      noResults.style.fontStyle = "italic";
      stateList.appendChild(noResults);
    }
  });

  // Click outside to clear search
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest("#stateSearch") &&
      !event.target.closest("#stateList")
    ) {
      stateSearchInput.value = "";
      stateList.innerHTML = "";
      allPaths.forEach((path) => path.classList.remove("highlight"));
    }
  });

  // Highlight corresponding list item when hovering on state
  function highlightListItems(stateId) {
    const listItems = document.querySelectorAll("#stateList li");
    listItems.forEach((item) => {
      if (item.dataset.stateId === stateId) {
        item.style.backgroundColor = "#ff6b9d";
        item.style.color = "white";
      } else {
        item.style.backgroundColor = "";
        item.style.color = "";
      }
    });
  }

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // State weather & soil data - All Indian States + UTs
  const stateArtData = {
    "Andhra Pradesh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Andhra_Pradesh_India.svg/640px-Andhra_Pradesh_India.svg.png",
      title: "Andhra Pradesh - Weather & Soil",
      description: "Weather: Tropical climate with hot summers and heavy monsoon rains. Soil: Red, black, and alluvial soils.",
    },
    "Arunachal Pradesh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Arunachal_Pradesh_India.svg/640px-Arunachal_Pradesh_India.svg.png",
      title: "Arunachal Pradesh - Weather & Soil",
      description: "Weather: Humid subtropical to alpine; heavy rainfall. Soil: Mostly alluvial and lateritic soils.",
    },
    "Assam": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Assam_India.svg/640px-Assam_India.svg.png",
      title: "Assam - Weather & Soil",
      description: "Weather: Tropical monsoon, heavy rainfall. Soil: Alluvial soils of the Brahmaputra valley.",
    },
    "Bihar": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Bihar_India.svg/640px-Bihar_India.svg.png",
      title: "Bihar - Weather & Soil",
      description: "Weather: Hot summers, cold winters, monsoon rains. Soil: Extremely fertile Indo-Gangetic alluvial plains.",
    },
    "Chhattisgarh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chhattisgarh_India.svg/640px-Chhattisgarh_India.svg.png",
      title: "Chhattisgarh - Weather & Soil",
      description: "Weather: Tropical wet and dry climate. Soil: Red and lateritic soils.",
    },
    "Goa": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Goa_India.svg/640px-Goa_India.svg.png",
      title: "Goa - Weather & Soil",
      description: "Weather: Warm and humid tropical monsoon. Soil: Lateritic soils dominate.",
    },
    "Gujarat": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gujarat_India.svg/640px-Gujarat_India.svg.png",
      title: "Gujarat - Weather & Soil",
      description: "Weather: Hot desert and semi-arid. Soil: Black cotton soil (regur) and sandy soils.",
    },
    "Haryana": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Haryana_India.svg/640px-Haryana_India.svg.png",
      title: "Haryana - Weather & Soil",
      description: "Weather: Hot summers, cold winters. Soil: Alluvial and sandy soils.",
    },
    "Himachal Pradesh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Himachal_Pradesh_India.svg/640px-Himachal_Pradesh_India.svg.png",
      title: "Himachal Pradesh - Weather & Soil",
      description: "Weather: Cool summers, cold snowy winters. Soil: Mountain forest soils.",
    },
    "Jharkhand": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jharkhand_India.svg/640px-Jharkhand_India.svg.png",
      title: "Jharkhand - Weather & Soil",
      description: "Weather: Tropical monsoon with heavy rains. Soil: Lateritic and red soils.",
    },
    "Karnataka": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Karnataka_India.svg/640px-Karnataka_India.svg.png",
      title: "Karnataka - Weather & Soil",
      description: "Weather: Tropical monsoon climate. Soil: Red, lateritic, and black cotton soils.",
    },
    "Kerala": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kerala_India.svg/640px-Kerala_India.svg.png",
      title: "Kerala - Weather & Soil",
      description: "Weather: Tropical monsoon, heavy rainfall. Soil: Laterite and alluvial soils.",
    },
    "Madhya Pradesh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Madhya_Pradesh_India.svg/640px-Madhya_Pradesh_India.svg.png",
      title: "Madhya Pradesh - Weather & Soil",
      description: "Weather: Tropical climate, hot summers. Soil: Black cotton soil dominates.",
    },
    "Maharashtra": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Maharashtra_India.svg/640px-Maharashtra_India.svg.png",
      title: "Maharashtra - Weather & Soil",
      description: "Weather: Tropical monsoon, hot summers. Soil: Black regur soil and laterite.",
    },
    "Manipur": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Manipur_India.svg/640px-Manipur_India.svg.png",
      title: "Manipur - Weather & Soil",
      description: "Weather: Moderate climate, heavy rainfall. Soil: Red and lateritic soils.",
    },
    "Meghalaya": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Meghalaya_India.svg/640px-Meghalaya_India.svg.png",
      title: "Meghalaya - Weather & Soil",
      description: "Weather: Heavy monsoon rains, humid. Soil: Lateritic soils.",
    },
    "Mizoram": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mizoram_India.svg/640px-Mizoram_India.svg.png",
      title: "Mizoram - Weather & Soil",
      description: "Weather: Humid subtropical climate. Soil: Red and yellow soils.",
    },
    "Nagaland": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Nagaland_India.svg/640px-Nagaland_India.svg.png",
      title: "Nagaland - Weather & Soil",
      description: "Weather: Pleasant summers, heavy rainfall. Soil: Lateritic soils.",
    },
    "Odisha": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Odisha_India.svg/640px-Odisha_India.svg.png",
      title: "Odisha - Weather & Soil",
      description: "Weather: Tropical climate with heavy monsoons. Soil: Lateritic and alluvial soils.",
    },
    "Punjab": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Punjab_India.svg/640px-Punjab_India.svg.png",
      title: "Punjab - Weather & Soil",
      description: "Weather: Hot summers, cold winters. Soil: Fertile alluvial soils.",
    },
    "Rajasthan": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rajasthan_India.svg/640px-Rajasthan_India.svg.png",
      title: "Rajasthan - Weather & Soil",
      description: "Weather: Hot desert, arid climate. Soil: Sandy desert soils.",
    },
    "Sikkim": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Sikkim_India.svg/640px-Sikkim_India.svg.png",
      title: "Sikkim - Weather & Soil",
      description: "Weather: Alpine to subtropical. Soil: Mountain forest soils.",
    },
    "Tamil Nadu": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Tamil_Nadu_India.svg/640px-Tamil_Nadu_India.svg.png",
      title: "Tamil Nadu - Weather & Soil",
      description: "Weather: Tropical climate with scanty rainfall in some parts. Soil: Black cotton soil and red soils.",
    },
    "Telangana": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Telangana_India.svg/640px-Telangana_India.svg.png",
      title: "Telangana - Weather & Soil",
      description: "Weather: Semi-arid, hot summers. Soil: Red and black soils.",
    },
    "Tripura": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Tripura_India.svg/640px-Tripura_India.svg.png",
      title: "Tripura - Weather & Soil",
      description: "Weather: Humid subtropical, heavy rainfall. Soil: Lateritic and alluvial soils.",
    },
    "Uttar Pradesh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Uttar_Pradesh_India.svg/640px-Uttar_Pradesh_India.svg.png",
      title: "Uttar Pradesh - Weather & Soil",
      description: "Weather: Hot summers, cold winters, monsoon rains. Soil: Extremely fertile Indo-Gangetic alluvial soils.",
    },
    "Uttarakhand": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Uttarakhand_India.svg/640px-Uttarakhand_India.svg.png",
      title: "Uttarakhand - Weather & Soil",
      description: "Weather: Cool climate in hills, tropical in valleys. Soil: Mountain soils and alluvial soils.",
    },
    "West Bengal": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/West_Bengal_India.svg/640px-West_Bengal_India.svg.png",
      title: "West Bengal - Weather & Soil",
      description: "Weather: Tropical monsoon, humid. Soil: Alluvial soils in plains, lateritic in plateau regions.",
    },

    // ✅ Union Territories
    "AndamanNicobar": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Andaman_and_Nicobar_Islands_India.svg/640px-Andaman_and_Nicobar_Islands_India.svg.png",
      title: "Andaman and Nicobar Islands - Weather & Soil",
      description: "Weather: Tropical, humid climate with heavy rainfall. Soil: Lateritic soils.",
    },
    "Chandigarh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chandigarh_India.svg/640px-Chandigarh_India.svg.png",
      title: "Chandigarh - Weather & Soil",
      description: "Weather: Hot summers, cold winters. Soil: Alluvial soils.",
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Dadra_and_Nagar_Haveli_and_Daman_and_Diu_India.svg/640px-Dadra_and_Nagar_Haveli_and_Daman_and_Diu_India.svg.png",
      title: "Dadra and Nagar Haveli and Daman and Diu - Weather & Soil",
      description: "Weather: Tropical, humid climate. Soil: Coastal alluvial soils.",
    },
    "Delhi": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Delhi_India.svg/640px-Delhi_India.svg.png",
      title: "Delhi - Weather & Soil",
      description: "Weather: Hot summers, cold winters. Soil: Alluvial soils of Yamuna plains.",
    },
    "JammuKashmir": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jammu_and_Kashmir_India.svg/640px-Jammu_and_Kashmir_India.svg.png",
      title: "Jammu and Kashmir - Weather & Soil",
      description: "Weather: Cold desert in Ladakh, temperate Kashmir valley. Soil: Mountain soils and alluvium.",
    },
    "Ladakh": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ladakh_India.svg/640px-Ladakh_India.svg.png",
      title: "Ladakh - Weather & Soil",
      description: "Weather: Cold desert climate, very dry. Soil: Sandy and skeletal soils.",
    },
    "Lakshadweep": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lakshadweep_India.svg/640px-Lakshadweep_India.svg.png",
      title: "Lakshadweep - Weather & Soil",
      description: "Weather: Tropical, humid climate. Soil: Coral sandy soils.",
    },
    "Puducherry": {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Puducherry_India.svg/640px-Puducherry_India.svg.png",
      title: "Puducherry - Weather & Soil",
      description: "Weather: Tropical coastal climate. Soil: Alluvial and sandy soils.",
    },
  };
});


  // Grab HTML elements
  const input = document.getElementById("stateInput");
  const button = document.getElementById("searchBtn");
  const resultDiv = document.getElementById("result");

  // Function to search and display state arts
  function showStateArt() {
    const userInput = input.value.trim();
    const state = stateArtData[userInput]; // lookup exact key

    if (state) {
      resultDiv.innerHTML = `
        <h2>${state.title}</h2>
        <img src="${state.image}" alt="${state.title}" />
        <p>${state.description}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p style="color:red;">No data found for "${userInput}".</p>`;
    }
  }

  // On button click
  button.addEventListener("click", showStateArt);

  // On Enter key press
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      showStateArt();
    }
  });

  // Create tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "state-tooltip";
  document.body.appendChild(tooltip);

  // Add hover effects to all state paths
  document.querySelectorAll("path[id]").forEach((path) => {
    const stateName = path.getAttribute("name") || path.getAttribute("id");

    path.addEventListener("mouseenter", (e) => {
      if (stateArtData[stateName]) {
        const art = stateArtData[stateName];
        tooltip.innerHTML = `
          <img src="${art.image}" alt="${stateName} Traditional Art">
          <h3>${art.title}</h3>
          <p>${art.description}</p>
        `;

        // Position tooltip
        const rect = path.getBoundingClientRect();
        tooltip.style.left = `${
          window.scrollX + rect.left + rect.width / 2 - 150
        }px`;
        tooltip.style.top = `${window.scrollY + rect.bottom + 10}px`;
        tooltip.style.display = "block";
      }
    });

    path.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
