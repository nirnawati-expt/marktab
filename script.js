tailwind.config = {
  darkMode: "class",
};

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const previewContainer = document.getElementById("preview-container");
const toggleEditorBtn = document.getElementById("toggle-editor-btn");
const togglePreviewBtn = document.getElementById("toggle-preview-btn");
const themeBtn = document.getElementById("theme-btn");
const dyslexicBtn = document.getElementById("dyslexic-btn");
const copyMDBtn = document.getElementById("copy-md-btn");
const copyHTMLBtn = document.getElementById("copy-html-btn");
const downloadMDBtn = document.getElementById("download-md-btn");
const downloadHTMLBtn = document.getElementById("download-html-btn");
const htmlTag = document.documentElement;
let isSourceScroll = false;

marked.use({
  hooks: {
    postprocess(html) {
      let processedHtml = html.replace(
        /<h([1-6])>(.*?)\s*\{#([^\}]+)\}<\/h\1>/g,
        (match, level, content, id) => {
          const cleanId = id
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "")
            .replace(/[\s_]+/g, "-");
          return `<h${level} id="${cleanId}" class="group relative flex items-center"><a href="javascript:void(0)" onclick="document.getElementById('${cleanId}').scrollIntoView({behavior: 'smooth'})" class="absolute -left-5 opacity-0 group-hover:opacity-100 text-blue-500 no-underline font-normal text-base pr-2 transition-opacity duration-150" aria-hidden="false">#</a><span>${content}</span></h${level}>`;
        },
      );
      processedHtml = processedHtml.replace(
        /<h([1-6])(?![^>]*\bid=)>(.*?)<\/h\1>/g,
        (match, level, content) => {
          const id = content
            .replace(/<[^>]*>/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-");
          return `<h${level} id="${id}" class="group relative flex items-center"><a href="javascript:void(0)" onclick="document.getElementById('${id}').scrollIntoView({behavior: 'smooth'})" class="absolute -left-5 opacity-0 group-hover:opacity-100 text-blue-500 no-underline font-normal text-base pr-2 transition-opacity duration-150" aria-hidden="false">#</a><span>${content}</span></h${level}>`;
        },
      );
      processedHtml = processedHtml
        .replace(/==([^=]+)==/g, "<mark>$1</mark>")
        .replace(/\^([^^]+)\^/g, "<sup>$1</sup>")
        .replace(/<del>([\s\S]*?)<\/del>/g, "<sub>$1</sub>");
      return processedHtml;
    },
  },
});

function renderMarkdown() {
  preview.innerHTML = marked.parse(editor.value);
  preview.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("width") && !img.getAttribute("height")) {
      img.addEventListener(
        "load",
        function () {
          img.setAttribute("width", img.naturalWidth);
          img.setAttribute("height", img.naturalHeight);
        },
        { once: true },
      );
    }
  });
}

function debounce(func, timeout = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

editor.addEventListener("input", debounce(renderMarkdown, 150));

editor.addEventListener("scroll", () => {
  if (isSourceScroll || previewContainer.classList.contains("hidden")) return;
  isSourceScroll = true;
  const scrollPercentage =
    editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
  previewContainer.scrollTop =
    scrollPercentage *
    (previewContainer.scrollHeight - previewContainer.clientHeight);
  setTimeout(() => (isSourceScroll = false), 50);
});

previewContainer.addEventListener("scroll", () => {
  if (isSourceScroll || editor.classList.contains("hidden")) return;
  isSourceScroll = true;
  const scrollPercentage =
    previewContainer.scrollTop /
    (previewContainer.scrollHeight - previewContainer.clientHeight);
  editor.scrollTop =
    scrollPercentage * (editor.scrollHeight - editor.clientHeight);
  setTimeout(() => (isSourceScroll = false), 50);
});

function updateButtonStates() {
  const isEditorHidden = editor.classList.contains("hidden");
  const isPreviewHidden = previewContainer.classList.contains("hidden");
  togglePreviewBtn.disabled = isEditorHidden;
  toggleEditorBtn.disabled = isPreviewHidden;
}

toggleEditorBtn.addEventListener("click", () => {
  if (editor.classList.contains("hidden")) {
    editor.classList.remove("hidden");
    previewContainer.classList.replace("w-full", "w-1/2");
    toggleEditorBtn.innerText = "Hide Editor";
  } else {
    editor.classList.add("hidden");
    previewContainer.classList.replace("w-1/2", "w-full");
    toggleEditorBtn.innerText = "Show Editor";
  }
  updateButtonStates();
});

togglePreviewBtn.addEventListener("click", () => {
  if (previewContainer.classList.contains("hidden")) {
    previewContainer.classList.remove("hidden");
    editor.classList.replace("w-full", "w-1/2");
    togglePreviewBtn.innerText = "Hide Preview";
  } else {
    previewContainer.classList.add("hidden");
    editor.classList.replace("w-1/2", "w-full");
    togglePreviewBtn.innerText = "Show Preview";
  }
  updateButtonStates();
});

themeBtn.addEventListener("click", () => {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    themeBtn.innerText = "☀️";
    themeBtn.ariaLabel = "current-mode-light";
  } else {
    htmlTag.classList.add("dark");
    themeBtn.innerText = "🌙";
    themeBtn.ariaLabel = "current-mode-dark";
  }
});

dyslexicBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dyslexic-mode")) {
    document.body.classList.remove("dyslexic-mode");
    dyslexicBtn.innerText = "Easy Read OFF";
    dyslexicBtn.classList.add("bg-orange-800");
    dyslexicBtn.classList.add("hover:bg-orange-900");
    dyslexicBtn.classList.remove("bg-orange-600");
    dyslexicBtn.classList.remove("hover:bg-orange-700");

    previewContainer.classList.remove("p-10");
    previewContainer.classList.add("p-6");

    editor.classList.add("dyslexic-mode");
  } else {
    document.body.classList.add("dyslexic-mode");
    dyslexicBtn.innerText = "Easy Read ON";
    dyslexicBtn.classList.add("bg-orange-600");
    dyslexicBtn.classList.add("hover:bg-orange-700");
    dyslexicBtn.classList.remove("bg-orange-800");
    dyslexicBtn.classList.remove("hover:bg-orange-900");
    editor.classList.remove("dyslexic-mode");

    previewContainer.classList.add("p-10");
    previewContainer.classList.remove("p-6");
  }
});

copyMDBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(editor.value);
    const originalText = copyMDBtn.innerText;
    copyMDBtn.innerText = "Copied!";
    setTimeout(() => (copyMDBtn.innerText = originalText), 2000);
  } catch (err) {
    alert("Gagal menyalin teks");
  }
});

// LOGIKA PENENTUAN NAMA FILE (DIPAKAI BERSAMA)
function getFileName() {
  const firstLine = editor.value.trim().split("\n")[0];
  return firstLine.startsWith("#")
    ? firstLine
        .replace(/^#+\s*/, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
    : "document";
}

copyHTMLBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(preview.innerHTML);
    const originalText = copyHTMLBtn.innerText;
    copyHTMLBtn.innerText = "Copied!";
    setTimeout(() => (copyHTMLBtn.innerText = originalText), 2000);
  } catch (err) {
    alert("Gagal menyalin HTML");
  }
});

downloadMDBtn.addEventListener("click", () => {
  const blob = new Blob([editor.value], {
    type: "text/markdown;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const firstLine = editor.value.trim().split("\n")[0];
  const fileName = getFileName();
  link.href = url;
  link.download = `${fileName || "document"}.md`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

downloadHTMLBtn.addEventListener("click", () => {
  const currentTheme = htmlTag.className; // Mengambil 'light' atau 'dark' dari aplikasi saat ini
  const isDyslexic = document.body.classList.contains("dyslexic-mode")
    ? "dyslexic-mode"
    : "";
  const currentFontSize = preview.style.fontSize || "1rem";

  // Menyusun file HTML mandiri lengkap dengan style pembungkus agar tampilan sama persis
  const fullHtmlContent = `<!doctype html>
<html lang="en" class="${currentTheme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${getFileName() || "Exported Document"}</title>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    <script>tailwind.config = { darkMode: 'class' };</script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
      .preview-content { font-family: ui-sans-serif, system-ui, sans-serif; }
      .dyslexic-mode .preview-content, .dyslexic-mode .preview-content * {
        font-family: "OpenDyslexic", sans-serif !important;
      }
      body { padding: 2rem; max-width: 64rem; margin: 0 auto; }
    </style>
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${isDyslexic}">
    <div class="preview-content prose prose-slate dark:prose-invert max-w-none" style="font-size: ${currentFontSize}">
      ${preview.innerHTML}
    </div>
  </body>
</html>`;

  const blob = new Blob([fullHtmlContent], {
    type: "text/html;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = getFileName();
  link.href = url;
  link.download = `${fileName || "document"}.html`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

renderMarkdown();

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");
let currentZoom = 100;

function applyZoom() {
  // Mengatur ukuran font dasar pada editor dan preview container
  editor.style.fontSize = `${0.875 * (currentZoom / 100)}rem`;
  preview.style.fontSize = `${1 * (currentZoom / 100)}rem`;
}

zoomInBtn.addEventListener("click", () => {
  if (currentZoom < 200) {
    // Batas maksimal zoom 200%
    currentZoom += 10;
    applyZoom();
  }
});

zoomOutBtn.addEventListener("click", () => {
  if (currentZoom > 70) {
    // Batas minimal zoom 70%
    currentZoom -= 10;
    applyZoom();
  }
});
