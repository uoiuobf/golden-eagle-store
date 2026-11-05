// ==========================================
// 🦅 Golden Eagle Store - Main Script Engine
// ==========================================

const MY_PHONE_NUMBER = "201033139050"; // رقم الواتساب الخاص بك
const MY_DISCORD_SERVER = "https://discord.gg/eV38XtmmJc"; // رابط ديسكورد الخاص بك

let selectedProduct = { name: "", price: "" };

function openOrderModal(productName, productPrice) {
  selectedProduct.name = productName;
  selectedProduct.price = productPrice;

  const titleEl = document.getElementById("selectedItemTitle");
  const priceEl = document.getElementById("selectedItemPrice");
  
  if(titleEl) titleEl.innerText = productName;
  if(priceEl) priceEl.innerText = "السعر: " + productPrice;

  const modal = document.getElementById("orderModal");
  if(modal) modal.style.display = "flex";
}

function closeOrderModal() {
  const modal = document.getElementById("orderModal");
  if(modal) modal.style.display = "none";
}

function sendToWhatsApp() {
  const loggedUser = localStorage.getItem("loggedUser") || "زائر جديد";
  const message = `مرحباً متجر Golden Eagle 🦅\nأرغب في شراء: *${selectedProduct.name}*\nالسعر المعلن: *${selectedProduct.price}*\nاسم العميل: *${loggedUser}*`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
  closeOrderModal();
}

function buyViaWhatsApp(productName, productPrice) {
  openOrderModal(productName, productPrice);
}

function sendToDiscord() {
  const loggedUser = localStorage.getItem("loggedUser") || "زائر جديد";
  alert(`سيتم تحويلك لسيرفر الديسكورد، يرجى فتح تكت بنفس التفاصيل:\nالمنتج: ${selectedProduct.name}\nالسعر: ${selectedProduct.price}\nالاسم: ${loggedUser}`);
  window.open(MY_DISCORD_SERVER, "_blank");
  closeOrderModal();
}

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".game-card");

  cards.forEach(card => {
    const title = card.querySelector("h4").innerText.toLowerCase();
    const description = card.querySelector("p").innerText.toLowerCase();

    if (title.includes(input) || description.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterCategory(category) {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === 'all' || cardCat === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleCart() {
  alert("السلة قيد التحديث والتطوير 😎");
}

function openLogin() {
  const modal = document.getElementById("loginModal");
  if(modal) modal.style.display = "flex";
}

function closeLogin() {
  const modal = document.getElementById("loginModal");
  if(modal) modal.style.display = "none";
}

function loginUserByEmail() {
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  
  if(!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    alert("من فضلك أدخل بريد إلكتروني صحيح");
    return;
  }

  if (password.length < 6) {
    alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  const username = email.split('@')[0];
  localStorage.setItem("loggedUser", username);
  localStorage.setItem("loggedEmail", email);

  if (!localStorage.getItem("userAvatar")) {
    localStorage.setItem("userAvatar", "image/logo.jpg");
  }

  updateUIAfterLogin();
  closeLogin();

  emailInput.value = "";
  passwordInput.value = "";
  alert("تم تسجيل الدخول بنجاح، أهلاً بك في Golden Eagle! 🦅");
}

function updateUIAfterLogin() {
  const user = localStorage.getItem("loggedUser");
  const loginBtn = document.getElementById("loginButton");
  const userProfileArea = document.getElementById("userProfileArea");
  const userAvatarImg = document.getElementById("userAvatarImg");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (userProfileArea) userProfileArea.style.display = "flex";

    const savedAvatar = localStorage.getItem("userAvatar") || "image/logo.jpg";
    if (userAvatarImg) userAvatarImg.src = savedAvatar;
  } else {
    if (loginBtn) loginBtn.style.display = "flex";
    if (userProfileArea) userProfileArea.style.display = "none";
  }
}

function openProfileModal() {
  const user = localStorage.getItem("loggedUser") || "";
  const avatar = localStorage.getItem("userAvatar") || "image/logo.jpg";

  const usernameInput = document.getElementById("editUsernameInput");
  const avatarPreview = document.getElementById("modalAvatarPreview");
  
  if(usernameInput) usernameInput.value = user;
  if(avatarPreview) avatarPreview.src = avatar;

  const modal = document.getElementById("profileModal");
  if(modal) modal.style.display = "flex";
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  if(modal) modal.style.display = "none";
}

function saveProfileChanges() {
  const usernameInput = document.getElementById("editUsernameInput");
  const fileInput = document.getElementById("editAvatarFile");

  if (usernameInput && usernameInput.value.trim() !== "") {
    localStorage.setItem("loggedUser", usernameInput.value.trim());
  }

  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem("userAvatar", e.target.result);
      updateUIAfterLogin();
      closeProfileModal();
      alert("تم تحديث البروفايل والصورة بنجاح! ✨");
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    updateUIAfterLogin();
    closeProfileModal();
    alert("تم تحديث البروفايل بنجاح! ✨");
  }
}

function logoutUser() {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("loggedEmail");
  localStorage.removeItem("userAvatar");
  location.reload();
}

window.onload = function() {
  updateUIAfterLogin();
};
