document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('search');
  const suggestions = document.getElementById('suggestions');

  const chapters = {
    physics: [
      { name: "1. Chapter 1", url: "quiz.html" },
      { name: "2. Chapter 2", url: "physics/chapter2.html" },
      { name: "1. Unit and dimensions", url: "quiz.html" },
      
      // Add more Physics chapters
    ],
    chemistry: [
      { name: "Chemistry - Chapter 1", url: "chemistry/chapter1.html"},
      { name: "Chemistry - Chapter 2", url: "chemistry/chapter2.html"},
      // Add more Chemistry chapters
    ],
    biology: [
      { name: "» Biological classification", url: "/quiz/Biology/each chp qType/biological-Classification-qType.html" },
       { name: "» Biomolecules", url: "/quiz/Biology/each chp qType/biomolecules-qType.html" },
       { name: "» Living world", url: "/quiz/Biology/each chp qType/living-world-qType.html" },
      { name: "» plant kingdom", url: "physics/chapter2.html" },
      // Add more Biology chapters
    ]
  };

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestions.innerHTML = '';

    if (query) {
      const filteredChapters = Object.values(chapters).flat().filter(chapter =>
        chapter.name.toLowerCase().includes(query)
      );

      filteredChapters.forEach(chapter => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = chapter.name;
        suggestionItem.onclick = () => location.href = chapter.url;
        suggestions.appendChild(suggestionItem);
      });
    }

    // Show suggestions if there's a query
    if (query) {
      suggestions.style.display = 'block';
    } else {
      suggestions.style.display = 'none';
    }
  });

  document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
      suggestions.style.display = 'none';
    }
  });

  const subjectCards = document.querySelectorAll('.subject-card');

  subjectCards.forEach(card => {
    card.addEventListener('click', () => {
      const subject = card.getAttribute('data-subject');
      const subjectChapters = chapters[subject];
      showPopup(subjectChapters);
    });
  });

  function showPopup(subjectChapters) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup-content">
        <span class="close-button">&times;</span>
        <ul>
          ${subjectChapters.map(chapter => `<li><strong>${chapter.name}</strong></li>`).join('')}
        </ul>
      </div>
    `;
    document.body.appendChild(popup);

    const closeButton = popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => closePopup(popup));

    const chapterListItems = popup.querySelectorAll('li');
    chapterListItems.forEach((li, index) => {
      li.addEventListener('click', () => {
        location.href = subjectChapters[index].url;
      });
    });

    // Add event listener to close popup when clicking outside the popup-content
    function handleOutsideClick(event) {
      if (!popup.contains(event.target)) {
        closePopup(popup);
      }
    }
    // Use capture phase to ensure the click event is caught before it reaches other elements
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick, true);
    }, 0);

    function closePopup(popup) {
      document.body.removeChild(popup);
      window.removeEventListener("click", handleOutsideClick, true);
    }
  }
});
