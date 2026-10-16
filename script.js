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

// تسجيل المستخدم بالبريد الإلكتروني الحقيقي
function loginUserByEmail(){
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  // التحقق من صحة الإيميل
  if(email === "" || !email.includes("@") || !email.includes(".")){
    alert("من فضلك أدخل بريد إلكتروني صحيح");
    return;
  }

  if(password.length < 6){
    alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    return;
  }

  // استخراج اسم المستخدم من الإيميل (الجزء اللي قبل علامة @)
  const username = email.split('@')[0];

  // حفظ البيانات محلياً
  localStorage.setItem("loggedUser", username);
  localStorage.setItem("loggedEmail", email);
  
  if(!localStorage.getItem("userAvatar")){
    localStorage.setItem("userAvatar", "image/logo.jpg");
  }

  updateUIAfterLogin();
  closeLogin();
  
  // تفريغ الحقول
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  alert("تم تسجيل الدخول بنجاح أهلاً بك في Golden Eagle! 🦅");
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
