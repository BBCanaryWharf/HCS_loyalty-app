// Load counts from localStorage
let stamps = {
  coffee: parseInt(localStorage.getItem("coffee")) || 0,
  soup: parseInt(localStorage.getItem("soup")) || 0,
  salad: parseInt(localStorage.getItem("salad")) || 0
};

// Save to localStorage
function saveStamps() {
  localStorage.setItem("coffee", stamps.coffee);
  localStorage.setItem("soup", stamps.soup);
  localStorage.setItem("salad", stamps.salad);
}

// Update the UI
function updateUI() {
  updateStamps("coffee");
  updateStamps("soup");
  updateStamps("salad");
}

function updateStamps(type) {
  const icons = {
    coffee: { filled: "☕️", empty: "⬜️" },
    soup: { filled: "🍲", empty: "⬜️" },
    salad: { filled: "🥗", empty: "⬜️" }
  };

  const container = document.getElementById(`${type}-stamps`);
  container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const icon = document.createElement("span");
    icon.textContent = i < stamps[type] ? icons[type].filled : icons[type].empty;
    icon.className = "stamp-icon";
    container.appendChild(icon);
  }
}

// Redeem logic
function redeem(type) {
  if (stamps[type] < 6) {
    alert(`You need 6 stamps to redeem a free ${type}.`);
    return;
  }
  const confirmRedeem = confirm(`Redeem your free ${type}? This will reset your stamps.`);
  if (confirmRedeem) {
    stamps[type] = 0;
    saveStamps();
    updateUI();
    alert(`You've redeemed your free ${type}. Enjoy!`);
  }
}

// Reset all stamps
function resetStamps() {
  stamps = { coffee: 0, soup: 0, salad: 0 };
  saveStamps();
  updateUI();
  document.getElementById("qr-result").textContent = "Stamps reset.";
}

// Cooldown logic to prevent duplicate scans
let scanCooldown = false;

function handleQRScan(decodedText) {
  if (scanCooldown) return;

  const type = decodedText.trim().toLowerCase();

  if (["coffee", "soup", "salad"].includes(type)) {
    if (stamps[type] < 6) {
      stamps[type]++;
      saveStamps();
      updateUI();
      document.getElementById("qr-result").textContent = `${type} stamped!`;

      // Cooldown: ignore further scans for 3 seconds
      scanCooldown = true;
      setTimeout(() => {
        scanCooldown = false;
      }, 3000);
    } else {
      document.getElementById("qr-result").textContent = `Already 6 ${type} stamps. Please redeem.`;
    }
  } else {
    document.getElementById("qr-result").textContent = "Invalid QR code.";
  }
}

// Start the scanner
const qrScanner = new Html5Qrcode("qr-reader");
qrScanner.start(
  { facingMode: "environment" },
  {
    fps: 10,
    qrbox: 250
  },
  handleQRScan,
  (errorMessage) => {
    // Optional: ignore scan errors
  }
);

// Initial UI update
updateUI();
