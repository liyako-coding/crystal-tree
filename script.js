// 初始化 Lucide 圖標
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * 切換主展示圖
 * @param {string} imageSrc 主大圖路徑
 * @param {string} caption 款式名稱標籤
 * @param {HTMLElement} triggerButton 被點擊的按鈕
 * @param {string} altText 圖片無障礙替代文字
 */
function changeHeroImage(imageSrc, caption, triggerButton, altText) {
  const mainImg = document.getElementById('mainHeroImage');
  const counterSpan = document.getElementById('imageCounter');
  
  if (!mainImg) return;

  // 淡出過渡
  mainImg.style.opacity = '0.35';
  mainImg.style.transform = 'scale(0.985)';
  
  setTimeout(() => {
    mainImg.src = imageSrc;
    if (altText) mainImg.alt = altText;
    if (counterSpan) counterSpan.textContent = caption;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 160);

  // 更新所有縮圖的選中樣式與 aria-current
  const buttons = document.querySelectorAll('.thumb-btn');
  buttons.forEach(btn => {
    btn.classList.remove('border-stone-900', 'bg-stone-50', 'active', 'opacity-100');
    btn.classList.add('border-transparent', 'bg-white', 'opacity-70');
    btn.setAttribute('aria-current', 'false');

    const span = btn.querySelector('span');
    if (span) {
      span.classList.remove('font-bold', 'text-stone-900');
      span.classList.add('font-medium', 'text-stone-700');
    }
  });

  if (triggerButton) {
    triggerButton.classList.remove('border-transparent', 'bg-white', 'opacity-70');
    triggerButton.classList.add('border-stone-900', 'bg-stone-50', 'active', 'opacity-100');
    triggerButton.setAttribute('aria-current', 'true');

    const span = triggerButton.querySelector('span');
    if (span) {
      span.classList.remove('font-medium', 'text-stone-700');
      span.classList.add('font-bold', 'text-stone-900');
    }
  }
}

/**
 * FAQ 手風琴摺疊切換 (支援 aria-expanded 與 aria-controls)
 * @param {HTMLButtonElement} button 
 */
function toggleFaq(button) {
  const answerId = button.getAttribute('aria-controls');
  const answer = answerId ? document.getElementById(answerId) : button.nextElementSibling;
  const icon = button.querySelector('i, svg');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  // 關閉其他展開的 FAQ 項目
  document.querySelectorAll('.faq-item button').forEach(otherBtn => {
    if (otherBtn !== button) {
      otherBtn.setAttribute('aria-expanded', 'false');
      const otherAnsId = otherBtn.getAttribute('aria-controls');
      const otherAns = otherAnsId ? document.getElementById(otherAnsId) : otherBtn.nextElementSibling;
      if (otherAns) otherAns.classList.add('hidden');
      const otherIcon = otherBtn.querySelector('i, svg');
      if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
    }
  });

  if (!isExpanded) {
    button.setAttribute('aria-expanded', 'true');
    if (answer) answer.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    button.setAttribute('aria-expanded', 'false');
    if (answer) answer.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

// 平滑捲動至頁首
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 平滑捲動至頁尾
function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

// 捲動監聽：導航列陰影與回到頁首按鈕顯示
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (navbar) {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  }

  // 捲動超過 180px 顯示回到頁首按鈕
  if (scrollTopBtn) {
    if (window.scrollY > 180) {
      scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
      scrollTopBtn.classList.add('opacity-100', 'scale-100');
    } else {
      scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
      scrollTopBtn.classList.remove('opacity-100', 'scale-100');
    }
  }
});
