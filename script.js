// ==========================================
// 🦅 Golden Eagle Store - Main Script Engine
// ==========================================

// 📌 اكتب هنا بيانات التواصل الخاصة بك لتوجيه العملاء إليها تلقائياً
const MY_PHONE_NUMBER = "201000000000"; // اكتب رقم الواتساب بدون علامة + (مثال: 201012345678)
const MY_DISCORD_SERVER = "https://discord.gg/your-server-invite"; // رابط سيرفر الديسكورد الخاص بك

let selectedProduct = { name: "", price: "" };

// =====================
// ORDER & CONTACT SYSTEM
// =====================

// فتح نافذة اختيار طريقة الشراء
function openOrderModal(productName, productPrice) {
  selectedProduct.name = productName;
  selectedProduct.price = productPrice;

  document.getElementById("selectedItemTitle").innerText = productName;
  document.getElementById("selectedItemPrice").innerText = "السعر: " + productPrice;

  document.getElementById("orderModal").style.display = "flex";
}

// إغلاق نافذة الشراء
function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

// التوجيه إلى الواتساب مع رسالة جاهزة
function sendToWhatsApp() {
  const loggedUser = localStorage.getItem("loggedUser") || "زائر جديد";
  const message = `مرحباً متجر Golden Eagle 🦅\nأرغب في شراء: *${selectedProduct.name}*\nالسعر المعلن: *${selectedProduct.price}*\nاسم العميل: *${loggedUser}*`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
  closeOrderModal();
}

// التوجيه مباشرة إلى زر الشراء السريع من الهيرو
function buyViaWhatsApp(productName, productPrice) {
  openOrderModal(productName, productPrice);
}

// التوجيه إلى سيرفر الديسكورد
function sendToDiscord() {
  const loggedUser = localStorage.getItem("loggedUser") || "زائر جديد";
  alert(`سيتم تحويلك لسيرفر الديسكورد، يرجى فتح تكت بنفس التفاصيل التالية:\nالمنتج: ${selectedProduct.name}\nالسعر: ${selectedProduct.price}\nالاسم: ${loggedUser}`);
  window.open(MY_DISCORD_SERVER, "_blank");
  closeOrderModal();
}

// =====================
// SEARCH & NAVIGATION
// =====================

// البحث الفوري في المنتجات داخل الصفحة
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

// الانتقال السلس إلى الأقسام
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// =====================
// CART (عربة التسوق)
// =====================
function toggleCart() {
  alert("السلة قيد التطوير والتحديث لتشمل الطلبات المتعددة 😎");
}

// =====================
// LOGIN & PROFILE SYSTEM
// =====================

function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

// تسجيل المستخدم بالبريد الإلكتروني الحقيقي
function loginUserByEmail() {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    alert("من فضلك أدخل بريد إلكتروني صحيح");
    return;
  }

  if (password.length < 6) {
    alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  // استخراج اسم المستخدم من البريد الإلكتروني
  const username = email.split('@')[0];

  // حفظ بيانات المستخدم في المتصفح
  localStorage.setItem("loggedUser", username);
  localStorage.setItem("loggedEmail", email);

  if (!localStorage.getItem("userAvatar")) {
    localStorage.setItem("userAvatar", "image/logo.jpg");
  }

  updateUIAfterLogin();
  closeLogin();

  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  alert("تم تسجيل الدخول بنجاح، أهلاً بك في Golden Eagle! 🦅");
}

// تحديث واجهة الموقع بعد تسجيل الدخول
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

// فتح نافذة إعدادات البروفايل
function openProfileModal() {
  const user = localStorage.getItem("loggedUser") || "";
  const avatar = localStorage.getItem("userAvatar") || "image/logo.jpg";

  document.getElementById("editUsernameInput").value = user;
  document.getElementById("modalAvatarPreview").src = avatar;

  const fileInput = document.getElementById("editAvatarFile");
  if (fileInput) fileInput.value = "";

  document.getElementById("profileModal").style.display = "flex";
}

function closeProfileModal() {
  document.getElementById("profileModal").style.display = "none";
}

// حفظ تعديلات الاسم أو صورة البروفايل
function saveProfileChanges() {
  const newName = document.getElementById("editUsernameInput").value.trim();
  const fileInput = document.getElementById("editAvatarFile");

  if (newName !== "") {
    localStorage.setItem("loggedUser", newName);
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

// تسجيل الخروج
function logoutUser() {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("loggedEmail");
  localStorage.removeItem("userAvatar");
  location.reload();
}

// تنفيذ الوظائف فور تحميل الصفحة
window.onload = function() {
  updateUIAfterLogin();
};
