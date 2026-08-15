/**
 * GitHub Pages OS Yönlendirme ve İndirme Portalı Logic
 * 
 * Bu dosyadaki CONFIG nesnesini değiştirerek kendi indirme/yönlendirme linklerinizi
 * kolayca güncelleyebilirsiniz.
 */

const CONFIG = {
  // Windows 10/11 Yönlendirme Linki
  windowsUrl: 'https://github.com/example/project/releases/latest/download/Setup-win64.exe',
  
  // Linux Dağıtım Linkleri
  linux: {
    // Debian Tabanlı (Ubuntu, Debian, Linux Mint, Pop!_OS vb.)
    debianUrl: 'https://github.com/example/project/releases/latest/download/app-amd64.deb',
    
    // Fedora Tabanlı (Fedora, RHEL, Nobara, CentOS vb.)
    fedoraUrl: 'https://github.com/example/project/releases/latest/download/app-x86_64.rpm',
    
    // Tüm Dağıtımlar / Evrensel (AppImage, Flatpak, Tarball vb.)
    universalUrl: 'https://github.com/example/project/releases/latest/download/app-x86_64.AppImage'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // DOM Öğeleri
  const mainView = document.getElementById('view-main');
  const linuxView = document.getElementById('view-linux');
  const btnSelectWindows = document.getElementById('btn-windows');
  const btnSelectLinux = document.getElementById('btn-linux');
  const btnBack = document.getElementById('btn-back');
  const detectedOsText = document.getElementById('detected-os-text');

  // Linkleri CONFIG nesnesinden dinamik olarak ata
  setupLinks();

  // Otomatik İşletim Sistemi Algılama
  detectUserOS();

  // Etkinlik Dinleyicileri
  btnSelectWindows.addEventListener('click', (e) => {
    e.preventDefault();
    handleWindowsRedirect();
  });

  btnSelectLinux.addEventListener('click', (e) => {
    e.preventDefault();
    showLinuxView();
  });

  btnBack.addEventListener('click', () => {
    showMainView();
  });
});

/**
 * CONFIG nesnesindeki linkleri HTML butonlarına bağlar
 */
function setupLinks() {
  const linkDebian = document.getElementById('link-debian');
  const linkFedora = document.getElementById('link-fedora');
  const linkUniversal = document.getElementById('link-universal');

  if (linkDebian) linkDebian.href = CONFIG.linux.debianUrl;
  if (linkFedora) linkFedora.href = CONFIG.linux.fedoraUrl;
  if (linkUniversal) linkUniversal.href = CONFIG.linux.universalUrl;
}

/**
 * Windows seçildiğinde belirtilen linke yönlendirir
 */
function handleWindowsRedirect() {
  const targetUrl = CONFIG.windowsUrl;
  if (targetUrl && targetUrl !== '#') {
    window.location.href = targetUrl;
  } else {
    alert('Windows indirme linki henüz ayarlanmadı.');
  }
}

/**
 * Linux menüsünü gösterir
 */
function showLinuxView() {
  const mainView = document.getElementById('view-main');
  const linuxView = document.getElementById('view-linux');

  mainView.classList.remove('visible');
  mainView.classList.add('hidden');

  setTimeout(() => {
    linuxView.classList.remove('hidden');
    linuxView.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 150);
}

/**
 * Ana İşletim Sistemi seçim menüsünü gösterir
 */
function showMainView() {
  const mainView = document.getElementById('view-main');
  const linuxView = document.getElementById('view-linux');

  linuxView.classList.remove('visible');
  linuxView.classList.add('hidden');

  setTimeout(() => {
    mainView.classList.remove('hidden');
    mainView.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 150);
}

/**
 * Kullanıcının tarayıcısına bakarak işletim sistemini tahmin eder
 */
function detectUserOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const detectedOsText = document.getElementById('detected-os-text');
  let osName = 'Bilinmiyor';

  if (userAgent.includes('win')) {
    osName = 'Windows';
  } else if (userAgent.includes('linux')) {
    osName = 'Linux';
  } else if (userAgent.includes('mac')) {
    osName = 'macOS';
  }

  if (detectedOsText) {
    detectedOsText.textContent = osName;
  }
}
