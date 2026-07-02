// --- Data (Mirroring POS Model) ---
const quickiesMenu = [
    // Mocktails
    { id: 'mk1', name: 'Fresh Lime Soda', price: 60, category: 'Mocktails' },
    { id: 'mk2', name: 'Fresh Orange Soda', price: 70, category: 'Mocktails' },
    { id: 'mk3', name: 'Blue Lagoon', price: 90, category: 'Mocktails' },
    { id: 'mk4', name: 'Mint Mojito', price: 90, category: 'Mocktails' },

    // Sandwiches
    { id: 'sw1', name: 'Golden Butter Toast', price: 50, category: 'Sandwiches' },
    { id: 'sw2', name: 'Classic Comfort Sandwich', price: 80, category: 'Sandwiches' },
    { id: 'sw3', name: 'Grill Melt Veggies', price: 120, category: 'Sandwiches' },
    { id: 'sw4', name: 'Cheesy Veggie Grill', price: 140, category: 'Sandwiches' },
    { id: 'sw5', name: 'Cheese Club S/W', price: 160, category: 'Sandwiches' },

    // Potato Wedges
    { id: 'pw1', name: 'Simply Salted Wedges', price: 80, category: 'Potato Wedges' },
    { id: 'pw2', name: 'Peri Peri Wedges', price: 90, category: 'Potato Wedges' },
    { id: 'pw4', name: 'Cheese Mayo Loaded', price: 120, category: 'Potato Wedges' },

    // French Fries
    { id: 'ff1', name: 'Simply Salted', price: 50, category: 'French Fries' },
    { id: 'ff2', name: 'Peri Peri Fries', price: 60, category: 'French Fries' },
    { id: 'ff4', name: 'Cheese Mayo Loaded', price: 80, category: 'French Fries' },

    // Burgers
    { id: 'mb1', name: 'Chocolate Muska Bun', price: 60, category: 'Muska Bun' },
    { id: 'mb2', name: 'Fruit Jam Muska Bun', price: 60, category: 'Muska Bun' },

    // Pizza
    { id: 'pz1', name: 'Margherita Pizza', price: 90, category: 'Pizza' },
    { id: 'pz2', name: 'Garden Fresh Pizza', price: 100, category: 'Pizza' },
    { id: 'pz6', name: 'Tandoori Veggies Pizza', price: 110, category: 'Pizza' },

    // Waffle
    { id: 'wf1', name: 'Kit Kat Waffle', price: 160, category: 'Waffle' },
    { id: 'wf2', name: 'Oreo Waffle', price: 160, category: 'Waffle' },
    { id: 'wf6', name: 'Simple Chocolate Waffle', price: 150, category: 'Waffle' },

    // Milkshakes
    { id: 'ms1', name: 'Vanilla Milkshake', price: 80, category: 'Milkshakes' },
    { id: 'ms2', name: 'Chocolate Milkshake', price: 90, category: 'Milkshakes' },
    { id: 'ms4', name: 'Kit Kat Milkshake', price: 140, category: 'Milkshakes' },

    // Cold Drinks
    { id: 'cd1', name: 'Water Bottle (10 Rs)', price: 10, category: 'Cold Drinks' },
    { id: 'cd3', name: 'Coca Cola', price: 20, category: 'Cold Drinks' },
    { id: 'cd7', name: 'Red Bull', price: 125, category: 'Cold Drinks' },

    // Coffee
    { id: 'cf1', name: 'Hot Coffee Black', price: 50, category: 'Coffee' },
    { id: 'cf2', name: 'Cappuccino', price: 70, category: 'Coffee' },
    { id: 'cf5', name: 'Cold Coffee', price: 100, category: 'Coffee' }
];

// --- State ---
let cart = []; // Array of { item: obj, qty: num }
let activeCategory = 'All';
let searchQuery = '';

// --- DOM Elements ---
const menuGrid = document.getElementById('menu-grid');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    renderMenu();
    updateCartUI();
    initCheckoutModalEvents();

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderMenu();
    });

    btnCheckout.addEventListener('click', handleCheckout);
});

// --- Logic ---
function initCategories() {
    const categories = ['All', ...new Set(quickiesMenu.map(m => m.category))];
    categoryFilters.innerHTML = categories.map(cat => `
        <button class="btn btn-outline-secondary category-btn ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = e.target.dataset.category;
            renderMenu();
        });
    });
}

function renderMenu() {
    const filteredMenu = quickiesMenu.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `<div class="col-12 text-center text-muted py-5"><i class="bi bi-search fs-1"></i><p class="mt-2">No items found.</p></div>`;
        return;
    }

    menuGrid.innerHTML = filteredMenu.map(item => {
        const inCart = cart.find(c => c.item.id === item.id);
        const qty = inCart ? inCart.qty : 0;

        let btnHtml = `<button class="btn btn-outline-primary btn-add-cart w-100" onclick="addToCart('${item.id}')">Add to Cart</button>`;
        if (qty > 0) {
            btnHtml = `
                <div class="d-flex justify-content-between align-items-center bg-light rounded px-2 py-1 border">
                    <button class="btn btn-sm btn-danger qty-btn" onclick="updateQty('${item.id}', -1)"><i class="bi bi-dash"></i></button>
                    <span class="fw-bold">${qty}</span>
                    <button class="btn btn-sm btn-success qty-btn" onclick="updateQty('${item.id}', 1)"><i class="bi bi-plus"></i></button>
                </div>
            `;
        }

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card menu-card shadow-sm h-100">
                    <div class="card-body menu-card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-start">
                                <h5 class="menu-title">${item.name}</h5>
                            </div>
                            <p class="text-muted small mb-3">${item.category}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-auto gap-3">
                            <span class="menu-price">₹${item.price}</span>
                            <div class="flex-grow-1" style="max-width: 140px;">
                                ${btnHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const item = quickiesMenu.find(m => m.id === id);
    if (!item) return;
    cart.push({ item: item, qty: 1 });
    renderMenu();
    updateCartUI();
}

function updateQty(id, change) {
    const index = cart.findIndex(c => c.item.id === id);
    if (index > -1) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
    }
    renderMenu();
    updateCartUI();
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalPrice = cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);
    
    cartCount.innerText = totalQty;
    
    if (cart.length === 0) {
        emptyCartMsg.classList.remove('d-none');
        btnCheckout.disabled = true;
        
        // Remove existing items from container (keep the empty msg)
        Array.from(cartItemsContainer.children).forEach(child => {
            if (child.id !== 'empty-cart-msg') child.remove();
        });
    } else {
        emptyCartMsg.classList.add('d-none');
        btnCheckout.disabled = false;
        
        const html = cart.map(c => `
            <div class="cart-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold">${c.item.name}</h6>
                    <div class="text-muted small">₹${c.item.price} x ${c.qty} = <strong>₹${c.item.price * c.qty}</strong></div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-outline-danger qty-btn" onclick="updateQty('${c.item.id}', -1)"><i class="bi bi-dash"></i></button>
                    <span class="fw-bold px-1">${c.qty}</span>
                    <button class="btn btn-outline-success qty-btn" onclick="updateQty('${c.item.id}', 1)"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        `).join('');
        
        // Keep empty msg hidden, add items
        cartItemsContainer.innerHTML = html + `<div id="empty-cart-msg" class="d-none"></div>`;
    }
    
    cartTotalPrice.innerText = `₹${totalPrice}`;
}

function handleCheckout() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    
    if (!name || !phone) {
        alert("Please enter your name and phone number to proceed.");
        return;
    }
    
    const totalPrice = cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);
    document.getElementById('checkout-total-price').innerText = `₹${totalPrice}`;
    
    // Reset screenshot and OCR UI state
    const screenshotInput = document.getElementById('screenshot-input');
    const screenshotPreview = document.getElementById('screenshot-preview');
    const previewOverlay = document.querySelector('.preview-overlay');
    const scanningStatus = document.querySelector('.scanning-status');
    const paymentIdInput = document.getElementById('payment-id-input');
    const ocrBadge = document.getElementById('ocr-badge');
    const paymentIdFeedback = document.getElementById('payment-id-feedback');
    const btnConfirmCheckout = document.getElementById('btn-confirm-checkout');
    
    if (screenshotInput) screenshotInput.value = '';
    if (screenshotPreview) screenshotPreview.src = '';
    if (previewOverlay) previewOverlay.classList.add('d-none');
    if (scanningStatus) scanningStatus.classList.add('d-none');
    if (paymentIdInput) paymentIdInput.value = '';
    if (ocrBadge) {
        ocrBadge.innerText = 'Waiting for upload';
        ocrBadge.className = 'badge bg-secondary-subtle text-secondary-emphasis';
    }
    if (paymentIdFeedback) paymentIdFeedback.innerHTML = '';
    if (btnConfirmCheckout) btnConfirmCheckout.disabled = true;
    
    // Hide Cart Offcanvas
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
    if (offcanvas) {
        offcanvas.hide();
    }

    // Show Checkout Modal
    if (checkoutModalInstance) {
        checkoutModalInstance.show();
    }
}

// --- Checkout Modal & OCR Logic ---
let checkoutModalInstance = null;

function initCheckoutModalEvents() {
    const screenshotInput = document.getElementById('screenshot-input');
    const screenshotPreview = document.getElementById('screenshot-preview');
    const previewOverlay = document.querySelector('.preview-overlay');
    const btnRemoveScreenshot = document.getElementById('btn-remove-screenshot');
    const scanningStatus = document.querySelector('.scanning-status');
    const paymentIdInput = document.getElementById('payment-id-input');
    const ocrBadge = document.getElementById('ocr-badge');
    const paymentIdFeedback = document.getElementById('payment-id-feedback');
    const btnConfirmCheckout = document.getElementById('btn-confirm-checkout');
    const dropzone = document.getElementById('screenshot-dropzone');

    // Setup Modal instance
    checkoutModalInstance = new bootstrap.Modal(document.getElementById('checkoutModal'));

    // Handle Drag & Drop styling
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files.length > 0) {
                screenshotInput.files = files;
                handleScreenshotUpload(files[0]);
            }
        });
    }

    // Handle file input selection
    screenshotInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleScreenshotUpload(e.target.files[0]);
        }
    });

    // Handle screenshot removal
    btnRemoveScreenshot.addEventListener('click', () => {
        resetScreenshotState();
    });

    // Validate payment ID input manual edit
    paymentIdInput.addEventListener('input', (e) => {
        // Allow only digits
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 12) val = val.substring(0, 12);
        e.target.value = val;
        
        validatePaymentId(val, false);
    });

    // Confirm Checkout
    btnConfirmCheckout.addEventListener('click', confirmAndSendWhatsApp);

    function handleScreenshotUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        // Show Preview
        const reader = new FileReader();
        reader.onload = (e) => {
            screenshotPreview.src = e.target.result;
            previewOverlay.classList.remove('d-none');
        };
        reader.readAsDataURL(file);

        // Show scanning state
        scanningStatus.classList.remove('d-none');
        ocrBadge.innerText = 'Scanning...';
        ocrBadge.className = 'badge bg-info text-white';
        paymentIdFeedback.innerHTML = '<span class="text-info"><i class="bi bi-cpu"></i> Running OCR text scan on screenshot...</span>';
        btnConfirmCheckout.disabled = true;

        // Perform OCR with Tesseract.js
        Tesseract.recognize(
            file,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            scanningStatus.classList.add('d-none');
            console.log("OCR Extracted Text:", text);

            // Clean the extracted text and search for a 12-digit transaction ID
            const matches = text.match(/\b\d{12}\b/g);
            if (matches && matches.length > 0) {
                const detectedUTR = matches[0];
                paymentIdInput.value = detectedUTR;
                validatePaymentId(detectedUTR, true);
            } else {
                ocrBadge.innerText = 'Not Detected';
                ocrBadge.className = 'badge bg-warning text-dark';
                paymentIdFeedback.innerHTML = '<span class="text-warning"><i class="bi bi-exclamation-triangle-fill"></i> No 12-digit UPI UTR/Ref number detected. Please enter it manually below.</span>';
                
                // If there's already a 12-digit manually entered, keep it valid
                validatePaymentId(paymentIdInput.value, false);
            }
        }).catch(err => {
            console.error("OCR Error:", err);
            scanningStatus.classList.add('d-none');
            ocrBadge.innerText = 'Error';
            ocrBadge.className = 'badge bg-danger text-white';
            paymentIdFeedback.innerHTML = '<span class="text-danger"><i class="bi bi-x-circle-fill"></i> Scanning failed. Please enter the Transaction ID manually.</span>';
            validatePaymentId(paymentIdInput.value, false);
        });
    }

    function validatePaymentId(val, autoDetected) {
        if (val.length === 12 && /^\d{12}$/.test(val)) {
            btnConfirmCheckout.disabled = false;
            if (autoDetected) {
                ocrBadge.innerText = 'Auto-Detected';
                ocrBadge.className = 'badge bg-success text-white';
                paymentIdFeedback.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill"></i> Valid 12-digit Payment ID successfully scanned!</span>';
            } else {
                ocrBadge.innerText = 'Verified';
                ocrBadge.className = 'badge bg-success text-white';
                paymentIdFeedback.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill"></i> Valid 12-digit Transaction ID. Ready to order!</span>';
            }
        } else {
            btnConfirmCheckout.disabled = true;
            if (val.length > 0) {
                paymentIdFeedback.innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-circle"></i> Transaction ID must be exactly 12 digits.</span>';
            } else {
                if (!autoDetected) {
                    paymentIdFeedback.innerHTML = '<span class="text-muted">Enter the 12-digit UTR/Ref number from your payment confirmation.</span>';
                }
            }
        }
    }

    function resetScreenshotState() {
        screenshotInput.value = '';
        screenshotPreview.src = '';
        previewOverlay.classList.add('d-none');
        scanningStatus.classList.add('d-none');
        paymentIdInput.value = '';
        ocrBadge.innerText = 'Waiting for upload';
        ocrBadge.className = 'badge bg-secondary-subtle text-secondary-emphasis';
        paymentIdFeedback.innerHTML = '';
        btnConfirmCheckout.disabled = true;
    }
}

function confirmAndSendWhatsApp() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const utr = document.getElementById('payment-id-input').value.trim();

    if (!name || !phone || !utr || utr.length !== 12) {
        alert("Please complete the payment verification first.");
        return;
    }

    // Generate Order Text
    let orderText = `*NEW ONLINE ORDER* 🍔\n`;
    orderText += `------------------------\n`;
    orderText += `*Name:* ${name}\n`;
    orderText += `*Phone:* ${phone}\n`;
    orderText += `------------------------\n`;
    
    cart.forEach(c => {
        orderText += `▪️ ${c.item.name} x ${c.qty} = ₹${c.item.price * c.qty}\n`;
    });
    
    const totalPrice = cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);
    orderText += `------------------------\n`;
    orderText += `*TOTAL AMOUNT: ₹${totalPrice}*\n`;
    orderText += `------------------------\n`;
    orderText += `*PAYMENT VERIFICATION* ✅\n`;
    orderText += `*Status:* Paid via UPI QR\n`;
    orderText += `*Transaction UTR:* ${utr}\n`;
    orderText += `------------------------\n`;
    orderText += `Thank you! Please verify the transaction and confirm my order.`;

    const encodedText = encodeURIComponent(orderText);
    const waLink = `https://wa.me/919106804063/?text=${encodedText}`;
    window.open(waLink, '_blank');

    // Reset customer app state
    cart = [];
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    updateCartUI();
    renderMenu();
    
    // Hide Modal
    if (checkoutModalInstance) {
        checkoutModalInstance.hide();
    }
}
