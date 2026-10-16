// =====================
// CART (عربة التسوق)
// =====================
function toggleCart(){
  alert("السلة لسه هنركبها في الجزء الجاي 😎");
}

// =====================
// LOGIN & PROFILE SYSTEM
// =====================

function openLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin(){
  document.getElementById("loginModal").style.display = "none";
}

// تسجيل المستخدم بالبريد الإلكتروني الحقيقي
function loginUserByEmail(){
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if(email === "" || !email.includes("@") || !email.includes(".")){
    alert("من فضلك أدخل بريد إلكتروني صحيح");
    return;
  }

  if(password.length < 6){
    alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  // استخراج اسم المستخدم من البريد الإلكتروني
  const username = email.split('@')[0];

  // حفظ بيانات المستخدم في المتصفح
  localStorage.setItem("loggedUser", username);
  localStorage.setItem("loggedEmail", email);
  
  if(!localStorage.getItem("userAvatar")){
    localStorage.setItem("userAvatar", "image/logo.jpg");
  }

  updateUIAfterLogin();
  closeLogin();
  
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  alert("تم تسجيل الدخول بنجاح أهلاً بك في Golden Eagle! 🦅");
}

// تحديث واجهة الموقع بعد تسجيل الدخول (إخفاء الزر وإظهار دائرة البروفايل)
function updateUIAfterLogin(){
  const user = localStorage.getItem("loggedUser");
  const loginBtn = document.getElementById("loginButton");
  const userProfileArea = document.getElementById("userProfileArea");
  const userAvatarImg = document.getElementById("userAvatarImg");

  if(user){
    loginBtn.style.display = "none";
    userProfileArea.style.display = "flex";

    const savedAvatar = localStorage.getItem("userAvatar") || "image/logo.jpg";
    userAvatarImg.src = savedAvatar;
  } else {
    loginBtn.style.display = "flex";
    userProfileArea.style.display = "none";
  }
}

// فتح نافذة إعدادات البروفايل عند الضغط على الدائرة فوق
function openProfileModal(){
  const user = localStorage.getItem("loggedUser");
  const avatar = localStorage.getItem("userAvatar") || "image/logo.jpg";

  document.getElementById("editUsernameInput").value = user;
  document.getElementById("modalAvatarPreview").src = avatar;
  
  // تفريغ حقل الملفات عند الفتح
  const fileInput = document.getElementById("editAvatarFile");
  if(fileInput) fileInput.value = "";

  document.getElementById("profileModal").style.display = "flex";
}

function closeProfileModal(){
  document.getElementById("profileModal").style.display = "none";
}

// حفظ تعديلات الاسم أو صورة البروفايل المرفوعة من الجهاز
function saveProfileChanges(){
  const newName = document.getElementById("editUsernameInput").value.trim();
  const fileInput = document.getElementById("editAvatarFile");

  if(newName !== ""){
    localStorage.setItem("loggedUser", newName);
  }

  // التحقق إذا اختار المستخدم صورة جديدة من جهازه
  if(fileInput && fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(e){
      // حفظ الصورة كبيانات داخل المتصفح
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
function logoutUser(){
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("loggedEmail");
  localStorage.removeItem("userAvatar");
  location.reload();
}

// تنفيذ عند تحميل الصفحة
window.onload = function(){
  updateUIAfterLogin();
};
