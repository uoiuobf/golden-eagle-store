// ========================================================
// 🦅 Golden Eagle Store - Production Engine
// ========================================================

const MY_PHONE_NUMBER = "201033139050";
const MY_DISCORD_SERVER = "https://discord.gg/eV38XtmmJc";

// بيانات المنتجات بالكامل
const productsData = [
  // --- قسم روبلوكس و Blox Fruits ---
  {
    id: 1,
    title: "Blox Fruits - Permanent Kitsune",
    category: "roblox",
    badge: "الأكثر طلباً 🔥",
    price: 1850,
    desc: "فاكهة كيتسوني الدائمة (Permanent Kitsune) تسليم مباشر داخل السيرفر الخاص.",
    img: "image/logo.jpg"
  },
  {
    id: 2,
    title: "Blox Fruits - Permanent Dragon",
    category: "roblox",
    badge: "نادر جداً 🐉",
    price: 2100,
    desc: "فاكهة التنين الدائمة بعد التحديث الجديد (Permanent Dragon).",
    img: "image/logo.jpg"
  },
  {
    id: 3,
    title: "Blox Fruits - Max Level Farm (1 - 2550)",
    category: "roblox",
    badge: "خدمة فارم ⚡",
    price: 350,
    desc: "رفع لفل حسابك إلى الحد الأقصى (Max Level) بأمان تام 100%.",
    img: "image/logo.jpg"
  },
  {
    id: 4,
    title: "Blox Fruits - Race V4 Full Unlock",
    category: "roblox",
    badge: "خدمات تفتيح",
    price: 450,
    desc: "تفتيح ريس V4 كامل مع المهارات والتداين للسباق المفضل لك.",
    img: "image/logo.jpg"
  },
  {
    id: 5,
    title: "Roblox - 1,000 Robux",
    category: "roblox",
    badge: "شحن روبوكس",
    price: 320,
    desc: "شحن 1000 روبوكس حساب مباشر أو عبر Gamepass.",
    img: "image/logo.jpg"
  },

  // --- قسم الشحن والعملات ---
  {
    id: 6,
    title: "FC 25 - 1,050 FC Points",
    category: "coins",
    badge: "كرة قدم ⚽",
    price: 490,
    desc: "شحن نقاط فيفا FC 25 فورياً لجميع المنصات (PS/PC/Xbox).",
    img: "image/logo.jpg"
  },
  {
    id: 7,
    title: "PUBG Mobile - 660 UC",
    category: "coins",
    badge: "شحن شدات 📱",
    price: 420,
    desc: "شحن شدات ببجي موبايل برقم الـ Player ID فقط.",
    img: "image/logo.jpg"
  },
  {
    id: 8,
    title: "Valorant - 1,000 VP",
    category: "coins",
    badge: "فالورانت 🎯",
    price: 450,
    desc: "شحن نقاط فالورانت كروت تفعيل رسمية سريعة.",
    img: "image/logo.jpg"
  },

  // --- قسم الألعاب الحسابات ---
  {
    id: 9,
    title: "Grand Theft Auto V & VI (Steam Offline)",
    category: "games",
    badge: "أوفلاين ممتاز 🎮",
    price: 120,
    desc: "حساب ستيم أوفلاين محمل بالكامل مع ضمان الاستمرار والتحديثات.",
    img: "image/logo.jpg"
  },
  {
    id: 10,
    title: "EA SPORTS FC 25 (Steam Offline)",
    category: "games",
    badge: "ألعاب أوفلاين",
    price: 150,
    desc: "حساب EA FC 25 أوفلاين للكمبيوتر بتسليم فوري مع الضمان.",
    img: "image/logo.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("ge_cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderProductsList(productsData);
  updateCartUI();

  // Search filter
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      const filtered = productsData.filter(p => 
        p.title.toLowerCase().includes(val) || 
        p.desc.toLowerCase().includes(val)
      );
      renderProductsList(filtered);
    });
  }
});

// Switch Tab Logic
function switchTab(category) {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(btn => btn.classList.remove("active"));
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  if (category === "all") {
    renderProductsList(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProductsList(filtered);
  }
}

// Render Products
function renderProductsList(list) {
  const container = document.getElementById("productsContainer");
  if (!container) return;
  
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; font-weight: 700;">لا توجد منتجات تطابق بحثك حالياً.</div>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="card-badge">${p.badge}</span>
      <img src="${p.img}" alt="${p.title}" class="product-img">
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-bottom">
          <span class="product-price">${p.price} ج.م</span>
          <button class="add-btn" onclick="addToCart(${p.id})">
            <i class="fas fa-cart-plus"></i> إضافة للسلة
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Cart Operations
function addToCart(productId) {
  const item = productsData.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    saveCart();
    updateCartUI();
    toggleCartModal(true);
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("ge_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.innerText = cart.length;

  const listElem = document.getElementById("cartItemsList");
  if (!listElem) return;

  listElem.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    listElem.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">السلة فارغة حالياً</p>`;
  } else {
    cart.forEach((item, idx) => {
      total += item.price;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div>
          <button class="remove-item-btn" onclick="removeFromCart(${idx})"><i class="fas fa-trash"></i></button>
          <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="cart-item-price">${item.price} ج.م</span>
      `;
      listElem.appendChild(row);
    });
  }

  const totalElem = document.getElementById("cartTotalVal");
  if (totalElem) totalElem.innerText = `${total} ج.م`;
}

function toggleCartModal(forceOpen = false) {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  if (forceOpen) {
    modal.classList.add("active");
  } else {
    modal.classList.toggle("active");
  }
}

// WhatsApp Direct Checkout
function sendOrderWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فارغة! برجاء إضافة منتجات أولاً.");
    return;
  }

  const name = document.getElementById("custName")?.value.trim();
  const phone = document.getElementById("custPhone")?.value.trim();
  const payment = document.getElementById("custPayment")?.value;

  if (!name || !phone) {
    alert("برجاء كتابة اسمك ورقم هاتفك لإكمال الطلب.");
    return;
  }

  let itemsText = "";
  let total = 0;
  cart.forEach((item, index) => {
    itemsText += `${index + 1}. ${item.title} (${item.price} ج.م)\n`;
    total += item.price;
  });

  const msg = `🦅 *طلب شراء جديد من Golden Eagle Store* 🦅\n\n` +
              `👤 *اسم العميل:* ${name}\n` +
              `📞 *رقم الهاتف:* ${phone}\n` +
              `💳 *طريقة الدفع:* ${payment}\n\n` +
              `🛒 *المنتجات المطلوبة:* \n${itemsText}\n` +
              `💰 *الإجمالي النهائي:* ${total} جنيه مصري\n\n` +
              `برجاء إرسال تفاصيل التحويل لإكمال الطلب فوراً.`;

  window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}
