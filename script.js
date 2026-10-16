// =====================
// CART (عربة التسوق)
// =====================
function toggleCart(){
  alert("السلة لسه هنركبها في الجزء الجاي 😎");
}

// =====================
// LOGIN SYSTEM
// =====================

function openLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin(){
  document.getElementById("loginModal").style.display = "none";
}

// تسجيل المستخدم لأول مرة
function loginUser(){
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if(username === "" || password === ""){
    alert("من فضلك املأ جميع البيانات");
    return;
  }

  // حفظ البيانات في localStorage
  localStorage.setItem("loggedUser", username);
  if(!localStorage.getItem("userAvatar")){
    // صورة افتراضية مبدئية
    localStorage.setItem("userAvatar", "image/logo.jpg");
  }

  updateUIAfterLogin();
  closeLogin();
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
}

// تحديث واجهة الموقع بعد تسجيل الدخول
function updateUIAfterLogin(){
  const user = localStorage.getItem("loggedUser");
  const loginBtn = document.getElementById("loginButton");
  const userProfileArea = document.getElementById("userProfileArea");
  const userAvatarImg = document.getElementById("userAvatarImg");

  if(user){
    // إخفاء زر تسجيل الدخول التقليدي وإظهار دائرة البروفايل
    loginBtn.style.display = "none";
    userProfileArea.style.display = "flex";

    // جلب صورة البروفايل المحفوظة
    const savedAvatar = localStorage.getItem("userAvatar") || "image/logo.jpg";
    userAvatarImg.src = savedAvatar;
  } else {
    loginBtn.style.display = "flex";
    userProfileArea.style.display = "none";
  }
}

// =====================
// PROFILE MANAGEMENT (إدارة البروفايل)
// =====================

function openProfileModal(){
  const user = localStorage.getItem("loggedUser");
  const avatar = localStorage.getItem("userAvatar") || "image/logo.jpg";

  document.getElementById("editUsernameInput").value = user;
  document.getElementById("editAvatarInput").value = avatar;
  document.getElementById("modalAvatarPreview").src = avatar;

  document.getElementById("profileModal").style.display = "flex";
}

function closeProfileModal(){
  document.getElementById("profileModal").style.display = "none";
}

// حفظ تعديلات الاسم أو الصورة
function saveProfileChanges(){
  const newName = document.getElementById("editUsernameInput").value.trim();
  const newAvatar = document.getElementById("editAvatarInput").value.trim();

  if(newName !== ""){
    localStorage.setItem("loggedUser", newName);
  }
  if(newAvatar !== ""){
    localStorage.setItem("userAvatar", newAvatar);
  }

  updateUIAfterLogin();
  closeProfileModal();
  alert("تم تحديث البروفايل بنجاح! ✨");
}

// تسجيل الخروج
function logoutUser(){
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("userAvatar");
  location.reload();
}

// تنفيذ عند تحميل الصفحة
window.onload = function(){
  updateUIAfterLogin();
};
