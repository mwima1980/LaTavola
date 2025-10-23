  const burger = document.querySelector(".icon-burger");
  const menu   = document.querySelector("#mainmenu"); // id aus deinem <nav>

  if (!burger || !menu) {
    console.warn("Burger oder Menü nicht gefunden.");
  } else {
    // initiale ARIA-States
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");

    const isOpen = () => menu.classList.contains("is-open");

    function toggleMenu(force) {
      const willOpen = typeof force === "boolean" ? force : !isOpen();
      menu.classList.toggle("is-open", willOpen);
      burger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      menu.setAttribute("aria-hidden", willOpen ? "false" : "true");
      burger.setAttribute("alt", willOpen ? "Menü schließen" : "Menü öffnen");
    }

    // Klick auf das Bild
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMenu();
    });

    // Tastatur-Bedienung (Enter/Space)
    burger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggleMenu();
      }
    });

    // ESC schließt
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) toggleMenu(false);
    });

    // Klick auf einen Menülink schließt
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => toggleMenu(false));
    });
    document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }
});
  }
