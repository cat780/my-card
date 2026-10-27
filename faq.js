const faqSearch = document.querySelector("#faq-search");
const faqItems = [...document.querySelectorAll(".faq-item")];
const noResults = document.querySelector("#no-results");

faqSearch.addEventListener("input", () => {
  const searchTerm = faqSearch.value.trim().toLocaleLowerCase();
  let visibleItems = 0;

  faqItems.forEach((item) => {
    const matches = item.textContent.toLocaleLowerCase().includes(searchTerm);
    item.hidden = !matches;
    visibleItems += Number(matches);
  });

  noResults.hidden = visibleItems > 0;
});
