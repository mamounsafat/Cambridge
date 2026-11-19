// =========================
// Sample Data (Fictional)
// =========================
const trainingCenters = [
  {
    id: "TC-101",
    name: "Al-Manar International Academy",
    location: "Amman, Jordan",
    description: "Provides Cambridge-aligned language and academic preparation programs for learners and educators.",
    status: "Active",
    accreditationDate: "2023-03-15"
  },
  {
    id: "TC-102",
    name: "Crescent Digital & STEM Institute",
    location: "Dubai, UAE",
    description: "Specializes in structured teaching methodologies, digital literacy, and professional skill assessment.",
    status: "Active",
    accreditationDate: "2024-01-20"
  },
  {
    id: "TC-103",
    name: "Heritage Scholars Center",
    location: "Cairo, Egypt",
    description: "Offers teacher training workshops and standardized curriculum support across partner schools.",
    status: "Inactive",
    accreditationDate: "2021-09-10"
  },
  {
    id: "TC-104",
    name: "Northgate Pedagogical Hub",
    location: "Riyadh, Saudi Arabia",
    description: "Focuses on modern classroom assessment, instructional design, and certified trainer development.",
    status: "Active",
    accreditationDate: "2024-06-05"
  },
  {
    id: "TC-105",
    name: "Horizon Vocational & Language House",
    location: "Beirut, Lebanon",
    description: "Delivers foundational English communication and academic readiness courses.",
    status: "Inactive",
    accreditationDate: "2020-11-18"
  },
  {
    id: "TC-106",
    name: "Cedar Ridge Education Center",
    location: "Doha, Qatar",
    description: "Supports accredited instruction with ongoing mentor coaching and quality assurance reviews.",
    status: "Active",
    accreditationDate: "2025-02-12"
  }
];

const trainers = [
  {
    id: "TR-201",
    name: "Nadia Al-Khatib",
    specialization: "English Language Instruction & Assessment",
    centerId: "TC-101",
    status: "Active",
    accreditationDate: "2023-05-01"
  },
  {
    id: "TR-202",
    name: "Tariq Mansour",
    specialization: "STEM Curriculum & Inquiry Learning",
    centerId: "TC-102",
    status: "Active",
    accreditationDate: "2024-03-11"
  },
  {
    id: "TR-203",
    name: "Salma Ibrahim",
    specialization: "Early Childhood & Literacy Standards",
    centerId: "TC-103", // Belongs to an Inactive center -> must not appear publicly
    status: "Active",
    accreditationDate: "2022-02-14"
  },
  {
    id: "TR-204",
    name: "Omar Farooq",
    specialization: "Educational Leadership & Teacher Mentoring",
    centerId: "TC-104",
    status: "Inactive", // Inactive trainer -> must not appear publicly
    accreditationDate: "2023-10-22"
  },
  {
    id: "TR-205",
    name: "Layla Haddad",
    specialization: "Academic Writing & Classroom Evaluation",
    centerId: "TC-106",
    status: "Active",
    accreditationDate: "2025-04-08"
  },
  {
    id: "TR-206",
    name: "Karim Darwish",
    specialization: "Interactive Teaching & Digital Pedagogy",
    centerId: "TC-101",
    status: "Active",
    accreditationDate: "2024-09-19"
  }
];

// =========================
// Helper & Filtering Functions
// =========================
function isActiveStatus(status) {
  return String(status).trim().toLowerCase() === "active";
}

function getActiveCenters() {
  return trainingCenters.filter((center) => isActiveStatus(center.status));
}

function getCenterById(centerId) {
  return trainingCenters.find((center) => center.id === centerId) || null;
}

function getPublicTrainers() {
  const activeCenterMap = new Map(
    getActiveCenters().map((center) => [center.id, center])
  );

  return trainers.filter((trainer) => {
    const hasActiveTrainerStatus = isActiveStatus(trainer.status);
    const associatedCenter = activeCenterMap.get(trainer.centerId);
    return hasActiveTrainerStatus && Boolean(associatedCenter);
  });
}

function filterByName(items, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return items;
  }
  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery)
  );
}

// =========================
// DOM Rendering Functions
// =========================
function createCenterCard(center) {
  const article = document.createElement("article");
  article.className = "card";
  article.setAttribute("data-center-id", center.id);

  const topRow = document.createElement("div");
  topRow.className = "card-top";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = center.name;

  const badge = document.createElement("span");
  badge.className = "status-badge";
  badge.textContent = center.status;

  topRow.append(title, badge);

  const location = document.createElement("p");
  location.className = "card-location";
  location.textContent = `Location: ${center.location}`;

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = center.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const dateLine = document.createElement("span");
  dateLine.innerHTML = `<strong>Accreditation Date:</strong> ${center.accreditationDate}`;

  meta.appendChild(dateLine);
  article.append(topRow, location, description, meta);

  return article;
}

function createTrainerCard(trainer) {
  const associatedCenter = getCenterById(trainer.centerId);
  const centerName = associatedCenter ? associatedCenter.name : "Unassigned Center";

  const article = document.createElement("article");
  article.className = "card";
  article.setAttribute("data-trainer-id", trainer.id);

  const topRow = document.createElement("div");
  topRow.className = "card-top";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = trainer.name;

  const badge = document.createElement("span");
  badge.className = "status-badge";
  badge.textContent = trainer.status;

  topRow.append(title, badge);

  const specialization = document.createElement("p");
  specialization.className = "card-specialization";
  specialization.textContent = `Specialization: ${trainer.specialization}`;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const centerLine = document.createElement("span");
  centerLine.innerHTML = `<strong>Training Center:</strong> ${centerName}`;

  const dateLine = document.createElement("span");
  dateLine.innerHTML = `<strong>Accreditation Date:</strong> ${trainer.accreditationDate}`;

  meta.append(centerLine, dateLine);
  article.append(topRow, specialization, meta);

  return article;
}

function renderTrainingCenters(searchQuery = "") {
  const container = document.getElementById("centers-container");
  const emptyMessage = document.getElementById("centers-empty-message");
  if (!container || !emptyMessage) return;

  const activeCenters = getActiveCenters();
  const filteredCenters = filterByName(activeCenters, searchQuery);

  container.replaceChildren();

  if (activeCenters.length === 0) {
    emptyMessage.textContent = "No accredited training centers are available at this time.";
    emptyMessage.hidden = false;
    return;
  }

  if (filteredCenters.length === 0) {
    emptyMessage.textContent = `No accredited training centers match "${searchQuery.trim()}".`;
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;
  const fragment = document.createDocumentFragment();
  filteredCenters.forEach((center) => {
    fragment.appendChild(createCenterCard(center));
  });
  container.appendChild(fragment);
}

function renderTrainers(searchQuery = "") {
  const container = document.getElementById("trainers-container");
  const emptyMessage = document.getElementById("trainers-empty-message");
  if (!container || !emptyMessage) return;

  const publicTrainers = getPublicTrainers();
  const filteredTrainers = filterByName(publicTrainers, searchQuery);

  container.replaceChildren();

  if (publicTrainers.length === 0) {
    emptyMessage.textContent = "No accredited trainers are available at this time.";
    emptyMessage.hidden = false;
    return;
  }

  if (filteredTrainers.length === 0) {
    emptyMessage.textContent = `No accredited trainers match "${searchQuery.trim()}".`;
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;
  const fragment = document.createDocumentFragment();
  filteredTrainers.forEach((trainer) => {
    fragment.appendChild(createTrainerCard(trainer));
  });
  container.appendChild(fragment);
}

function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function bindSearchEvents() {
  const centerSearchInput = document.getElementById("center-search");
  const trainerSearchInput = document.getElementById("trainer-search");

  if (centerSearchInput) {
    centerSearchInput.addEventListener("input", (event) => {
      renderTrainingCenters(event.target.value);
    });
  }

  if (trainerSearchInput) {
    trainerSearchInput.addEventListener("input", (event) => {
      renderTrainers(event.target.value);
    });
  }
}

// =========================
// Initialization
// =========================
document.addEventListener("DOMContentLoaded", () => {
  updateFooterYear();
  renderTrainingCenters();
  renderTrainers();
  bindSearchEvents();
});