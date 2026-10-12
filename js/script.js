
"use strict";

// ========================================
// LEARNTECH - COURSES AND BLOGS
// ========================================

// Add your actual images inside the images folder.
const courses = [
  {
    id: "python",
    name: "Python Programming",
    image: "images/course-python.jpg",
    price: "Coming Soon",
    level: "Beginner",
    duration: "Self-paced",
    description:
      "Learn Python programming from the basics. Understand variables, data types, conditions, loops, functions, and object-oriented programming. Practise coding and build beginner-friendly projects.",
    content: [
      "Introduction to Python",
      "Installing Python and setting up the environment",
      "Variables and data types",
      "Operators and expressions",
      "Conditional statements",
      "Loops",
      "Lists, tuples, sets and dictionaries",
      "Functions and modules",
      "File handling",
      "Object-oriented programming",
      "Exception handling",
      "Mini projects and practical exercises"
    ]
  },
  {
    id: "c",
    name: "C Programming",
    image: "images/course-c.jpg",
    price: "Coming Soon",
    level: "Beginner",
    duration: "Self-paced",
    description:
      "Learn C programming step by step. Understand programming fundamentals, decision-making, loops, arrays, functions, pointers, and structures through practical examples.",
    content: [
      "Introduction to C Programming",
      "Structure of a C program",
      "Variables and data types",
      "Input and output",
      "Operators",
      "Conditional statements",
      "Loops",
      "Arrays and strings",
      "Functions",
      "Pointers",
      "Structures and unions",
      "File handling",
      "Practical programming exercises"
    ]
  },
  {
    id: "web",
    name: "Web Development",
    image: "images/course-web.jpg",
    price: "Coming Soon",
    level: "Beginner",
    duration: "Self-paced",
    description:
      "Learn to create websites using HTML, CSS, and JavaScript. Build responsive web pages, create forms, add interactive features, and understand how websites work.",
    content: [
      "Introduction to Web Development",
      "How websites work",
      "HTML elements and page structure",
      "Links, images, tables and forms",
      "CSS selectors and styling",
      "Colors, fonts and layouts",
      "Flexbox and CSS Grid",
      "Responsive web design",
      "JavaScript fundamentals",
      "DOM manipulation",
      "Events and form validation",
      "Website project development"
    ]
  }
];

// ========================================
// BLOG DATA
// ========================================

const blogs = [
  {
    id: "welcome",
    title: "Welcome to LearnTech",
    category: "LearnTech Updates",
    description:
      "LearnTech is a learning platform focused on programming, web development, study notes, and practical technology skills.",
    content:
      "Welcome to LearnTech. Our goal is to help learners understand technology through clear explanations and practical learning. Explore programming courses, web development lessons, notes, and beginner-friendly projects. New learning content can be added as the platform grows."
  },
  {
    id: "programming",
    title: "Why Learn Programming?",
    category: "Programming",
    description:
      "Programming helps you solve problems, understand software, and develop your own applications.",
    content:
      "Programming is the process of giving instructions to a computer. Learning programming improves logical thinking and problem-solving skills. Beginners can start with Python or C, practise small programs regularly, and gradually build useful projects."
  },
  {
    id: "web-development",
    title: "Start Your Web Development Journey",
    category: "Web Development",
    description:
      "Begin with HTML for structure, CSS for design, and JavaScript for interactive features.",
    content:
      "Web development involves creating websites and web applications. HTML defines the structure, CSS controls the appearance, and JavaScript adds interaction. Start with a simple personal webpage and gradually practise responsive layouts, forms, and interactive components."
  }
];

// ========================================
// SAFE HTML TEXT
// ========================================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

// ========================================
// FIND PAGE CONTAINERS
// ========================================

const courseList = document.getElementById("course-list");
const blogList = document.getElementById("blog-list");

// ========================================
// RENDER COURSE CARDS
// ========================================

function renderCourses() {
  if (!courseList) return;

  courseList.innerHTML = courses.map(course => `
    <article
      class="course-card"
      data-course-id="${escapeHTML(course.id)}"
      tabindex="0"
      role="button"
      aria-label="Open ${escapeHTML(course.name)} course details"
    >
      <div class="course-cover">
        <img
          class="course-image"
          src="${escapeHTML(course.image)}"
          alt="${escapeHTML(course.name)} course image"
          loading="lazy"
        >

        <div class="course-image-fallback" hidden>
          <span class="course-label">LEARNTECH COURSE</span>
          <h3>${escapeHTML(course.name)}</h3>
        </div>
      </div>

      <div class="course-body">
        <span class="course-level">
          ${escapeHTML(course.level)}
        </span>

        <h3>${escapeHTML(course.name)}</h3>

        <p>${escapeHTML(course.description)}</p>

        <div class="course-foot">
          <span>${escapeHTML(course.duration)}</span>
          <span>${escapeHTML(course.price)}</span>
        </div>

        <p class="course-hint">Click to explore course</p>
      </div>
    </article>
  `).join("");

  // Show a fallback if an image cannot be loaded.
  courseList.querySelectorAll(".course-image").forEach(img => {
    function showFallback() {
      img.hidden = true;
      const fallback = img.nextElementSibling;
      if (fallback) fallback.hidden = false;
    }

    img.addEventListener("error", showFallback);

    if (img.complete && img.naturalWidth === 0) {
      showFallback();
    }
  });
}

// ========================================
// RENDER BLOG CARDS
// ========================================

function renderBlogs() {
  if (!blogList) return;

  blogList.innerHTML = blogs.map(blog => `
    <article class="blog-card" data-blog-id="${escapeHTML(blog.id)}">
      <div class="blog-content">
        <span class="blog-category">
          ${escapeHTML(blog.category)}
        </span>

        <h3>${escapeHTML(blog.title)}</h3>

        <p>${escapeHTML(blog.description)}</p>

        <button
          type="button"
          class="read-blog"
          data-blog-id="${escapeHTML(blog.id)}"
        >
          Read More
        </button>
      </div>
    </article>
  `).join("");
}

// ========================================
// CREATE DETAILS DIALOG
// ========================================

function createDetailsDialog() {
  let dialog = document.getElementById("learntech-details");
  if (dialog) return dialog;

  const styles = document.createElement("style");

  styles.textContent = `
    #learntech-details {
      width: min(680px, 92%);
      max-height: 85vh;
      overflow-y: auto;
      padding: 0;
      border: none;
      border-radius: 16px;
      color: #243044;
      background: #fff;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
    }

    #learntech-details::backdrop {
      background: rgba(15,23,42,.70);
    }

    .lt-details-header {
      padding: 25px;
      color: #fff;
      background: #176b45;
    }

    .lt-details-header h2 {
      margin: 10px 0 0;
      font-size: 26px;
    }

    .lt-details-tag {
      font-size: 12px;
      letter-spacing: 1px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .lt-details-close {
      float: right;
      border: 1px solid rgba(255,255,255,.7);
      border-radius: 8px;
      padding: 6px 12px;
      color: white;
      background: transparent;
      cursor: pointer;
    }

    .lt-details-content {
      padding: 24px;
    }

    .lt-details-content h3 {
      margin: 22px 0 10px;
      color: #176b45;
    }

    .lt-details-content p {
      line-height: 1.8;
    }

    .lt-syllabus {
      padding-left: 24px;
      line-height: 2;
    }

    .lt-details-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 18px 0;
    }

    .lt-details-meta span {
      padding: 7px 12px;
      border-radius: 20px;
      background: #edf7f0;
      color: #176b45;
      font-size: 13px;
    }

    .lt-details-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 18px 24px 24px;
      border-top: 1px solid #e5e7eb;
    }

    .lt-details-actions button {
      flex: 1;
      min-width: 120px;
      padding: 12px 18px;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
    }

    .lt-share-btn {
      color: #176b45;
      background: #e7f5eb;
    }

    .lt-purchase-btn {
      color: white;
      background: #176b45;
    }

    .lt-blog-label {
      color: #176b45;
      font-weight: 700;
    }

    .course-card {
      cursor: pointer;
    }

    .course-card:focus-visible {
      outline: 3px solid #176b45;
      outline-offset: 4px;
    }

    .course-hint {
      margin-bottom: 0;
      color: #176b45;
      font-size: 13px;
      font-weight: 600;
    }

    .course-cover {
      position: relative;
      overflow: hidden;
    }

    .course-image {
      display: block;
      width: 100%;
      height: 190px;
      object-fit: cover;
    }

    .course-image-fallback {
      min-height: 190px;
      padding: 24px;
      color: white;
      background: linear-gradient(135deg,#176b45,#39a96b);
      box-sizing: border-box;
    }

    .course-image-fallback[hidden] {
      display: none;
    }
  `;

  document.head.appendChild(styles);

  dialog = document.createElement("dialog");
  dialog.id = "learntech-details";

  dialog.innerHTML = `
    <div class="lt-details-header">
      <button
        type="button"
        class="lt-details-close"
        id="lt-close-details"
        aria-label="Close details"
      >Close</button>

      <div id="lt-details-tag" class="lt-details-tag">
        LEARNTECH
      </div>

      <h2 id="lt-details-title"></h2>
    </div>

    <div id="lt-details-content" class="lt-details-content"></div>

    <div id="lt-details-actions" class="lt-details-actions">
      <button type="button" class="lt-share-btn" id="lt-share-course">
        Share
      </button>

      <button type="button" class="lt-purchase-btn" id="lt-purchase-course">
        Purchase
      </button>
    </div>
  `;

  document.body.appendChild(dialog);

  dialog.querySelector("#lt-close-details").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  return dialog;
}

// ========================================
// SHOW COURSE OR BLOG DETAILS
// ========================================

let selectedCourse = null;
let selectedBlog = null;

function showDetails(item, type) {
  const dialog = createDetailsDialog();

  selectedCourse = type === "course" ? item : null;
  selectedBlog = type === "blog" ? item : null;

  const title = document.getElementById("lt-details-title");
  const tag = document.getElementById("lt-details-tag");
  const content = document.getElementById("lt-details-content");
  const actions = document.getElementById("lt-details-actions");

  title.textContent = item.name || item.title;
  tag.textContent =
    type === "course" ? "LEARNTECH COURSE" : item.category;

  if (type === "course") {
    content.innerHTML = `
      <h3>About This Course</h3>
      <p>${escapeHTML(item.description)}</p>

      <div class="lt-details-meta">
        <span>Level: ${escapeHTML(item.level)}</span>
        <span>Duration: ${escapeHTML(item.duration)}</span>
        <span>${escapeHTML(item.price)}</span>
      </div>

      <h3>Course Content</h3>
      <ol class="lt-syllabus">
        ${item.content.map(topic => `
          <li>${escapeHTML(topic)}</li>
        `).join("")}
      </ol>
    `;

    actions.style.display = "flex";
    document.getElementById("lt-purchase-course").textContent = "Purchase";
  } else {
    content.innerHTML = `
      <span class="lt-blog-label">${escapeHTML(item.category)}</span>
      <h3>About This Article</h3>
      <p>${escapeHTML(item.description)}</p>
      <p>${escapeHTML(item.content)}</p>
    `;

    actions.style.display = "none";
  }

  if (!dialog.open) dialog.showModal();
}

// ========================================
// COURSE CARD CLICK AND KEYBOARD SUPPORT
// ========================================

if (courseList) {
  courseList.addEventListener("click", event => {
    const card = event.target.closest(".course-card");
    if (!card) return;

    const course = courses.find(
      item => item.id === card.dataset.courseId
    );

    if (course) showDetails(course, "course");
  });

  courseList.addEventListener("keydown", event => {
    if (
      event.target.classList.contains("course-card") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();

      const course = courses.find(
        item => item.id === event.target.dataset.courseId
      );

      if (course) showDetails(course, "course");
    }
  });
}

// ========================================
// BLOG READ MORE
// ========================================

if (blogList) {
  blogList.addEventListener("click", event => {
    const button = event.target.closest(".read-blog");
    if (!button) return;

    const blog = blogs.find(
      item => item.id === button.dataset.blogId
    );

    if (blog) showDetails(blog, "blog");
  });
}

// ========================================
// SHARE COURSE
// ========================================

document.addEventListener("click", async event => {
  if (event.target.id !== "lt-share-course") return;
  if (!selectedCourse) return;

  const shareText =
    `${selectedCourse.name}\n\n` +
    `${selectedCourse.description}\n\nLearnTech`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: selectedCourse.name,
        text: shareText
      });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      alert("Course details copied. You can now share them.");
    } else {
      prompt("Copy and share these course details:", shareText);
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      alert("Unable to share right now. Please try again.");
    }
  }
});

// ========================================
// PURCHASE / WHATSAPP ENQUIRY
// ========================================

document.addEventListener("click", event => {
  if (event.target.id !== "lt-purchase-course") return;
  if (!selectedCourse) return;

  const message =
    `Hello LearnTech, I am interested in the ` +
    `${selectedCourse.name} course. Please share the course ` +
    `price and enrollment details.`;

  const whatsappURL =
    "https://wa.me/919148816072?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// ========================================
// FOOTER YEAR
// ========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ========================================
// INITIALIZE
// ========================================

renderCourses();
renderBlogs();
