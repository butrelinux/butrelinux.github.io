(() => {
  const variants = {
    lts: { description: "Stock CentOS Stream 10 kernel (6.12). No additional kernel modules or NVIDIA support.", nvidia: false },
    lto: { description: "CachyOS LTO kernel build.", nvidia: true },
    ml: { description: "ELRepo kernel-ml build.", nvidia: true },
    hyperscale: { description: "Hyperscale SIG kernel build.", nvidia: true }
  };

  let selectedKernel = "lts";
  let nvidiaEnabled = false;
  const name = document.querySelector("#variant-name");
  const description = document.querySelector("#variant-description");
  const imageRef = document.querySelector("#image-ref");
  const command = document.querySelector("#switch-command");
  const nvidiaToggle = document.querySelector("#nvidia-toggle");
  const nvidiaHelp = document.querySelector("#nvidia-help");

  function renderVariant() {
    const supportsNvidia = variants[selectedKernel].nvidia;
    const suffix = nvidiaEnabled && supportsNvidia ? "-nvidia" : "";
    const variant = selectedKernel + suffix;
    const ref = `ghcr.io/butrelinux/${variant}:latest`;

    name.textContent = variant;
    description.textContent = variants[selectedKernel].description +
      (nvidiaEnabled && supportsNvidia ? " Includes the NVIDIA-enabled build." : "");
    imageRef.textContent = ref;
    command.textContent = `sudo bootc switch --enforce-container-sigpolicy ${ref} --apply`;

    document.querySelectorAll(".kernel-option").forEach(button => {
      const active = button.dataset.kernel === selectedKernel;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });

    nvidiaToggle.disabled = !supportsNvidia;
    nvidiaToggle.setAttribute("aria-checked", String(nvidiaEnabled && supportsNvidia));
    nvidiaHelp.textContent = supportsNvidia
      ? "Toggle to select the NVIDIA-enabled image for this kernel family."
      : "The stock LTS image has no NVIDIA variant. Choose another kernel family to enable this option.";
  }

  document.querySelectorAll(".kernel-option").forEach(button => {
    button.addEventListener("click", () => {
      selectedKernel = button.dataset.kernel;
      if (!variants[selectedKernel].nvidia) nvidiaEnabled = false;
      renderVariant();
    });
  });

  nvidiaToggle.addEventListener("click", () => {
    if (!nvidiaToggle.disabled) {
      nvidiaEnabled = !nvidiaEnabled;
      renderVariant();
    }
  });

  async function copyText(value, button) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "COPIED";
    } catch {
      button.textContent = "COPY FAILED";
    }
    window.setTimeout(() => { button.textContent = original; }, 1400);
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.copy);
      if (target) copyText(target.textContent.trim(), button);
    });
  });

  document.querySelectorAll("[data-copy-text]").forEach(button => {
    button.addEventListener("click", () => copyText(button.dataset.copyText, button));
  });

  // Keep this fixed example command in sync with the install card markup.
  const installCopy = document.querySelector('[data-copy="install-command"]');
  if (installCopy) {
    installCopy.addEventListener("click", () => copyText(
      "sudo bootc switch --enforce-container-sigpolicy ghcr.io/butrelinux/lts:latest --apply",
      installCopy
    ));
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  renderVariant();
})();
