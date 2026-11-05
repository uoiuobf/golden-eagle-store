// ==========================================
// 🦅 Golden Eagle Store - Service Worker (PWA)
// ==========================================

const CACHE_NAME = "goldeneagle-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./script.js",

  // Images (الشعار والأيقونات وصور الألعاب)
  "./image/logo.jpg", // تأكد من مطابقة اسم الشعار الفعلي في مجلد image لديك
  "./image/gta-vi.jpg",
  "./image/marvels-spider-man-2.jpg",
  "./image/god-of-war-ragnarok.jpg",
  "./image/ea-sports-fc-25.jpg",
  "./image/elden-ring-shadow-of-the-erdtree.jpg",
  "./image/call-of-duty-mw-iii.jpg",
  "./image/resident-evil-4-remake.jpg"
];

// 1. تثبيت الـ Service Worker وتخزين الملفات مؤقتاً
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("🦅 Golden Eagle: Caching app assets...");
      // استخدام addAll بحذر أو تحميل الملفات الأساسية لضمان عدم حدوث فشل كلي
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. تفعيل النسخة الجديدة وحذف الكاش القديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🦅 Golden Eagle: Clearing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// 3. التعامل مع طلبات الشبكة (جلب الملفات من الكاش أولاً لتسريع المتجر)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // إذا وجدنا الملف مخزناً، نعيده فوراً، وإلا نجلبه من الشبكة
      return cachedResponse || fetch(event.request).catch(() => {
        // يمكنك هنا وضع صفحة بديلة للـ Offline إذا أردت مستقبلاً
      });
    })
  );
});
