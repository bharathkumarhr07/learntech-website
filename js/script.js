
"use strict";

/* =========================================
   LEARNTECH - MAIN JAVASCRIPT
========================================= */

/* COURSE DATA */

const courses = [
  {
    id: "python",
    name: "Python Programming",
    image: "images/course-python.jpg",
    level: "Beginner",
    duration: "Self-paced",
    price: "Coming Soon",
    description:
      "Learn Python programming from the basics through practical examples.",
    page: "python.html"
  },
  {
    id: "c",
    name: "C Programming",
    image: "images/course-c.jpg",
    level: "Beginner",
    duration: "Self-paced",
    price: "Coming Soon",
    description:
      "Understand C programming, variables, loops, functions and arrays.",
    page: "c-programming.html"
  },
  {
    id: "web",
    name: "Web Development",
    image: "images/course-web.jpg",
    level: "Beginner",
    duration: "Self-paced",
    price: "Coming Soon",
    description:
      "Learn HTML, CSS and JavaScript to build websites.",
    page: "web-development.html"
  }
];

/* BLOG DATA */

const blogs = [
  {
    id: "welcome",
    title: "Welcome to LearnTech",
    category: "LearnTech Updates",
    description:
      "LearnTech is a learning platform focused on programming, web development, study notes and practical technology skills.",
    content:
      "Welcome to LearnTech. Our goal is to help learners understand technology through clear explanations and practical learning. Explore programming courses, web development lessons, notes and beginner-friendly projects."
  },
  {
    id: "programming",
    title: "Why Learn Programming?",
    category: "Programming",
    description:
      "Programming helps you solve problems, understand software and develop your own applications.",
    content:
      "Programming is the process of giving instructions to a computer. Beginners can start with Python or C, practise small programs regularly and gradually build useful projects."
  },
  {
    id: "web-development",
    title: "Start Your Web Development Journey",
    category: "Web Development",
    description:
      "Begin with HTML for structure, CSS for design and JavaScript for interactive features.",
    content:
      "Web development involves creating websites and web applications. HTML defines the structure, CSS controls the appearance and JavaScript adds interaction. Start with a simple webpage and gradually practise responsive layouts, forms and interactive components."
  }
];

/* ESCAPE TEXT BEFORE INSERTING IT INTO HTML */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

/* HAMBURGER MENU */

function initializeMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mainMenu = document.getElementById("mainMenu");

  if (!menuToggle || !mainMenu) return;

  function closeMenu() {
    mainMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = mainMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.addEventListener("click", function (event) {
    if (
      !menuToggle.contains(event.target) &&
      !mainMenu.contains(event.target)
    ) {
      closeMenu();
    }
  });

  mainMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
}

/* COURSE CARDS */

function renderCourses() {
  const courseList = document.getElementById("course-list");

  if (!courseList) return;

  courseList.innerHTML = courses.map(function (course) {
    return `
      <a
        class="course-card"
        href="${escapeHTML(course.page)}"
        aria-label="Explore ${escapeHTML(course.name)}"
      >
        <div class="course-cover">
          <img
            class="course-image"
            src="${escapeHTML(course.image)}"
            alt="${escapeHTML(course.name)}"
            loading="lazy"
          >

          <div class="course-image-fallback" style="display:none">
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

          <p class="course-hint">Explore Course &rarr;</p>
        </div>
      </a>
    `;
  }).join("");

  courseList.querySelectorAll(".course-image").forEach(function (image) {
    const fallback = image.nextElementSibling;

    function showFallback() {
      image.style.display = "none";

      if (fallback) {
        fallback.style.display = "block";
      }
    }

    image.addEventListener("error", showFallback);

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    } else if (image.complete && image.naturalWidth > 0) {
      if (fallback) fallback.style.display = "none";
    }
  });
}

/* BLOG CARDS */

function renderBlogs() {
  const blogList = document.getElementById("blog-list");

  if (!blogList) return;

  blogList.innerHTML = blogs.map(function (blog) {
    return `
      <article class="blog-card">
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
    `;
  }).join("");
}

/* BLOG DETAILS POPUP */

function createBlogDialog() {
  let dialog = document.getElementById("learntech-details");

  if (dialog) return dialog;

  if (!document.createElement("dialog").showModal) {
    return null;
  }

  if (!document.getElementById("learntech-dialog-styles")) {
    const styles = document.createElement("style");

    styles.id = "learntech-dialog-styles";

    styles.textContent = `
      #learntech-details {
        width: min(680px, 92%);
        max-height: 85vh;
        overflow-y: auto;
        padding: 0;
        margin: auto;
        border: none;
        border-radius: 16px;
        color: #18352a;
        background: #ffffff;
        box-shadow: 0 20px 60px rgba(0,0,0,.25);
      }

      #learntech-details::backdrop {
        background: rgba(15,23,42,.65);
      }

      .lt-details-header {
        padding: 24px;
        color: white;
        background: #176b45;
      }

      .lt-details-header h2 {
        margin-top: 12px;
        font-size: 25px;
        line-height: 1.4;
      }

      .lt-details-close {
        float: right;
        padding: 7px 12px;
        border: 1px solid white;
        border-radius: 7px;
        color: white;
        background: transparent;
      }

      .lt-details-content {
        padding: 24px;
      }

      .lt-details-content h3 {
        margin: 18px 0 10px;
        color: #176b45;
      }

      .lt-details-content p {
        margin: 12px 0;
        line-height: 1.8;
        overflow-wrap: anywhere;
      }

      .lt-blog-label {
        color: #176b45;
        font-weight: 700;
      }
    `;

    document.head.appendChild(styles);
  }

  dialog = document.createElement("dialog");
  dialog.id = "learntech-details";

  dialog.innerHTML = `
    <div class="lt-details-header">
      <button
        type="button"
        class="lt-details-close"
        aria-label="Close article"
      >
        Close
      </button>

      <div id="lt-details-tag" class="lt-details-tag">
        LEARNTECH
      </div>

      <h2 id="lt-details-title"></h2>
    </div>

    <div id="lt-details-content" class="lt-details-content"></div>
  `;

  document.body.appendChild(dialog);

  dialog.querySelector(".lt-details-close").addEventListener(
    "click",
    function () {
      dialog.close();
    }
  );

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return dialog;
}

/* OPEN BLOG DETAILS */

function showBlogDetails(blog) {
  const dialog = createBlogDialog();

  if (!dialog) {
    window.alert(blog.title + "\n\n" + blog.content);
    return;
  }

  dialog.querySelector("#lt-details-title").textContent = blog.title;
  dialog.querySelector("#lt-details-tag").textContent = blog.category;

  const content = dialog.querySelector("#lt-details-content");

  content.innerHTML = `
    <span class="lt-blog-label">
      ${escapeHTML(blog.category)}
    </span>

    <h3>About This Article</h3>

    <p>${escapeHTML(blog.description)}</p>

    <p>${escapeHTML(blog.content)}</p>
  `;

  if (!dialog.open) {
    dialog.showModal();
  }
}

/* BLOG READ MORE EVENT */

function initializeBlogEvents() {
  const blogList = document.getElementById("blog-list");

  if (!blogList) return;

  blogList.addEventListener("click", function (event) {
    const button = event.target.closest(".read-blog");

    if (!button) return;

    const blog = blogs.find(function (item) {
      return item.id === button.dataset.blogId;
    });

    if (blog) showBlogDetails(blog);
  });
}

/* FOOTER YEAR */

function setFooterYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* INITIALIZE */

function initializeLearnTech() {
  initializeMenu();
  renderCourses();
  renderBlogs();
  initializeBlogEvents();
  setFooterYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLearnTech);
} else {
  initializeLearnTech();
}
