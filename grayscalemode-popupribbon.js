// Memorial CDN Script - For Royal Condolence
(function() {
    'use strict';
    
    // ตรวจสอบว่า script นี้ถูกโหลดแล้วหรือยัง
    if (window.memorialCDNLoaded) return;
    window.memorialCDNLoaded = true;
    
    function loadMemorialFeatures() {
        // เพิ่ม CSS styles
        const styles = `
            #black-ribbon {
                position: fixed;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                background-image: url('https://www.eda-edamame.com/wp-content/plugins/black-ribbon/image/ribbon-top-left.svg');
                background-repeat: no-repeat;
                background-size: contain;
                z-index: 9998;
                pointer-events: none;
            }
            
            #condolencePopup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .popup-content {
                position: relative;
                width: 95%;
                height: 95%;
                max-width: 1200px;
                max-height: 800px;
                background: #000000;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                transform: scale(0.95);
                transition: transform 0.4s ease;
            }
            
            .popup-close-btn {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                border: 2px solid #fff;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                font-weight: bold;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .popup-close-btn:hover {
                background: rgba(255, 255, 255, 0.9) !important;
                color: #000 !important;
                transform: scale(1.1) !important;
            }
            
            .popup-image-container {
                width: 100%;
                height: 100%;
                background: #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }
            
            .popup-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            }
            
            .grayscale-effect {
                filter: grayscale(100%) !important;
                -webkit-filter: grayscale(100%) !important;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // เพิ่มริบบิ้นดำ
        const ribbon = document.createElement('div');
        ribbon.id = 'black-ribbon';
        document.body.appendChild(ribbon);
        
        // ตั้งค่า grayscale ให้หน้าเว็บ
        document.documentElement.classList.add('grayscale-effect');
        
        // แสดง popup
        showCondolencePopup();
    }
    
    // ฟังก์ชันแสดง Popup
    function showCondolencePopup() {
        // สร้าง overlay
        const overlay = document.createElement('div');
        overlay.id = 'condolencePopup';
        
        // สร้าง content popup
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        // สร้างปุ่มปิด
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close-btn';
        closeButton.innerHTML = '✕';
        closeButton.setAttribute('aria-label', 'Close popup');
        
        // สร้างพื้นที่รูปภาพ
        const imageContainer = document.createElement('div');
        imageContainer.className = 'popup-image-container';
        
        const img = document.createElement('img');
        img.className = 'popup-image';
        img.src = 'https://www.eda-edamame.com/wp-content/uploads/2025/10/Queen_Mom_th_eng.png';
        img.alt = 'สมเด็จพระบรมราชชนนีพันปีหลวง';
        img.loading = 'eager';
        
        imageContainer.appendChild(img);
        
        // ฟังก์ชันปิด popup
        function closePopup() {
            overlay.style.opacity = '0';
            popupContent.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 400);
        }
        
        // Event listeners
        closeButton.addEventListener('click', closePopup);
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
        
        // รวมองค์ประกอบ
        popupContent.appendChild(imageContainer);
        popupContent.appendChild(closeButton);
        overlay.appendChild(popupContent);
        document.body.appendChild(overlay);
        
        // Animation เข้า
        setTimeout(() => {
            overlay.style.opacity = '1';
            popupContent.style.transform = 'scale(1)';
        }, 10);
    }
    
    // ฟังก์ชันสำหรับปิด grayscale (optional)
    function removeGrayscale() {
        document.documentElement.classList.remove('grayscale-effect');
    }
    
    // ฟังก์ชันสำหรับลบริบบิ้น (optional)
    function removeRibbon() {
        const ribbon = document.getElementById('black-ribbon');
        if (ribbon) {
            ribbon.remove();
        }
    }
    
    // รอจนหน้าเว็บโหลดเสร็จ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMemorialFeatures);
    } else {
        loadMemorialFeatures();
    }
    
    // Global functions สำหรับควบคุมจากภายนอก
    window.MemorialCDN = {
        showPopup: showCondolencePopup,
        removeGrayscale: removeGrayscale,
        removeRibbon: removeRibbon,
        enableGrayscale: function() {
            document.documentElement.classList.add('grayscale-effect');
        },
        disableAll: function() {
            this.removeGrayscale();
            this.removeRibbon();
            const popup = document.getElementById('condolencePopup');
            if (popup) popup.remove();
        }
    };
})();
