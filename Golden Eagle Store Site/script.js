// =====================
// CART (هنطوره بعدين)
// =====================
function toggleCart(){
  alert("السلة لسه هنركبها في الجزء الجاي 😎");
}

// =====================
// LOGIN SYSTEM
// =====================

// فتح نافذة تسجيل الدخول
function openLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

// إغلاق نافذة تسجيل الدخول
function closeLogin(){
  document.getElementById("loginModal").style.display = "none";
}

// تسجيل المستخدم
function loginUser(){

  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if(username === "" || password === ""){
    alert("من فضلك املأ جميع البيانات");
    return;
  }

  // حفظ اسم المستخدم في المتصفح
  localStorage.setItem("loggedUser", username);

  updateUIAfterLogin();
  closeLogin();
}

// تحديث شكل زر تسجيل الدخول بعد الدخول
function updateUIAfterLogin(){

  const user = localStorage.getItem("loggedUser");
  const loginBtn = document.getElementById("loginButton");

  if(user){
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${user}`;
    loginBtn.onclick = logoutUser;
  }
}

// تسجيل الخروج
function logoutUser(){
  localStorage.removeItem("loggedUser");
  location.reload();
}

// تنفيذ عند تحميل الصفحة
window.onload = function(){
  updateUIAfterLogin();
};