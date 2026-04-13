class PosView {
    constructor() {
        this.appContainer = document.getElementById('app-container');
        this.mainNav = document.getElementById('main-nav');
        this.navOutletName = document.getElementById('nav-outlet-name');

        // Setup clock
        setInterval(() => {
            document.getElementById('nav-clock').innerText = new Date().toLocaleTimeString();
        }, 1000);
    }

    renderOutletSelection(outlets) {
        this.mainNav.classList.add('d-none');

        let html = `
            <div class="row justify-content-center align-items-center" style="min-height: 80vh;">
                <div class="col-md-8 text-center">
                    <h1 class="display-4 mb-5 text-primary fw-bold"><i class="bi bi-shop"></i> Select Outlet</h1>
                    <div class="row g-4 justify-content-center">
        `;

        outlets.forEach(outlet => {
            const disabledClass = outlet.active ? '' : 'disabled-outlet';
            const statusBadge = outlet.active ?
                '<span class="badge bg-success mt-2">Active</span>' :
                '<span class="badge bg-secondary mt-2">Coming Soon</span>';

            const iconOrLogo = outlet.logo
                ? `<img src="${outlet.logo}" alt="${outlet.name} Logo" class="mb-2 rounded shadow-sm" style="width: 60px; height: 60px; object-fit: cover;">`
                : '<i class="bi bi-building fs-1 mb-2 d-block"></i>';

            html += `
                <div class="col-md-5">
                    <button class="btn ${outlet.active ? 'btn-outline-primary' : 'btn-outline-secondary'} w-100 btn-large ${disabledClass} py-4 d-flex flex-column align-items-center h-100" 
                            data-outlet-id="${outlet.id}" ${!outlet.active ? 'disabled' : ''}>
                        ${iconOrLogo}
                        <span class="fs-4 fw-bold">${outlet.shortName || outlet.name}</span>
                        ${statusBadge}
                    </button>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        this.appContainer.innerHTML = html;
    }

    renderHome(outlet) {
        this.mainNav.classList.remove('d-none');
        if (outlet.logo) {
            this.navOutletName.innerHTML = `<img src="${outlet.logo}" alt="${outlet.name} Logo" class="me-2 rounded" style="height: 20px; width: 20px; object-fit: cover; display: inline-block;"> ${outlet.name}`;
        } else {
            this.navOutletName.innerText = outlet.name;
        }

        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-10 text-center">
                    <h2 class="mb-5 text-muted">Welcome to ${outlet.name}</h2>
                    <div class="row g-4 justify-content-center mt-5">
                        <div class="col-md-4">
                            <button class="btn btn-primary w-100 btn-large shadow-sm" id="btn-take-order">
                                <i class="bi bi-cart-plus"></i>
                                Take Order
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-secondary w-100 btn-large shadow-sm" id="btn-placed-orders">
                                <i class="bi bi-clock-history"></i>
                                Placed Orders
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-success w-100 btn-large shadow-sm" id="btn-saved-orders">
                                <i class="bi bi-bookmark-fill"></i>
                                Saved Orders
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-info text-white w-100 btn-large shadow-sm" id="btn-sales-reports">
                                <i class="bi bi-graph-up"></i>
                                Sales Reports
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-warning text-dark w-100 btn-large shadow-sm" id="btn-day-closing">
                                <i class="bi bi-cash-stack"></i>
                                Day Closing
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-dark w-100 btn-large shadow-sm" id="btn-inventory">
                                <i class="bi bi-box-seam"></i>
                                Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderInventory(inventory) {
        const stores = ["Mayur Enterprise", "R.S Traders", "Others", "Other"];
        let accordionHtml = stores.map((store, index) => {
            let storeItems = inventory.filter(i => (i.store || 'Others') === store);
            if (store === "Other") {
                storeItems = inventory.filter(i => !stores.includes(i.store) && i.store !== 'Others');
            }
            if (storeItems.length === 0 && store === "Other") return '';

            let itemsHtml = storeItems.map(item => `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div><strong>${item.name}</strong></div>
                    <div class="d-flex align-items-center gap-2">
                        <input type="text" class="form-control form-control-sm text-center inv-qty-input" style="width: 80px;" placeholder="Qty" value="${item.qty}" data-inv-id="${item.id}">
                        <button class="btn btn-sm btn-outline-danger btn-delete-inv" data-inv-id="${item.id}"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            `).join('');
            if (storeItems.length === 0) itemsHtml = `<div class="p-3 text-muted text-center">No items in this category.</div>`;

            return `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading-${index}">
                        <button class="accordion-button ${index === 0 ? '' : 'collapsed'} py-3 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}">
                            ${store} <span class="badge bg-secondary ms-2">${storeItems.length}</span>
                        </button>
                    </h2>
                    <div id="collapse-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#inventory-accordion">
                        <div class="accordion-body p-0">
                            <div class="list-group list-group-flush">
                                ${itemsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.appContainer.innerHTML = `
            <div class="container mt-4 mb-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-box-seam text-dark"></i> Inventory Management</h2>
                    <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                </div>
                
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card shadow-sm mb-4">
                            <div class="card-body">
                                <form id="add-inventory-form" class="d-flex flex-wrap gap-2">
                                    <input type="text" id="new-inv-name" class="form-control flex-grow-1" placeholder="Enter Material Name" style="min-width: 200px;" required>
                                    <select id="new-inv-store" class="form-select" style="width: auto;" required>
                                        <option value="Mayur Enterprise">Mayur Enterprise</option>
                                        <option value="R.S Traders">R.S Traders</option>
                                        <option value="Others" selected>Others</option>
                                    </select>
                                    <button type="submit" class="btn btn-primary px-4">Add</button>
                                </form>
                            </div>
                        </div>

                        <div class="card shadow-sm">
                            <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                <h5 class="mb-0">Current Inventory</h5>
                                <button class="btn btn-success btn-sm px-3" id="btn-save-inventory"><i class="bi bi-save"></i> Save All Quantities</button>
                            </div>
                            <div class="accordion accordion-flush" id="inventory-accordion">
                                ${accordionHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showInventoryCheckModal(inventory) {
        let existingModal = document.getElementById('inventoryCheckModal');
        if (existingModal) existingModal.remove();

        const stores = [
            { name: "Mayur Enterprise", phone: "919426702292" },
            { name: "R.S Traders", phone: "919537005274" },
            { name: "Others", phone: "919106804063" }
        ];

        let accordionHtml = stores.map((store, index) => {
            let storeItems = inventory.filter(i => (i.store || 'Others') === store.name);
            if (storeItems.length === 0) return '';

            let itemsHtml = storeItems.map(item => `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>${item.name}</span>
                    <input type="text" class="form-control form-control-sm text-center inv-modal-qty" style="width: 80px;" value="${item.qty}" data-inv-id="${item.id}">
                </div>
            `).join('');

            return `
                <div class="accordion-item border">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#modal-collapse-${index}">
                            ${store.name} <span class="badge bg-secondary ms-2">${storeItems.length}</span>
                        </button>
                    </h2>
                    <div id="modal-collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#inventory-modal-accordion">
                        <div class="accordion-body p-2 bg-light">
                            ${itemsHtml}
                            <button type="button" class="btn btn-success btn-sm w-100 mt-2 fw-bold btn-send-store-wa" data-store="${store.name}" data-phone="${store.phone}">
                                <i class="bi bi-whatsapp"></i> Update & Send ${store.name}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (accordionHtml === '') {
            accordionHtml = `<div class="text-center text-muted p-3">No inventory items tracked. <br><small>Skip to proceed.</small></div>`;
        }

        const modalHtml = `
            <div class="modal fade" id="inventoryCheckModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            <h5 class="modal-title"><i class="bi bi-box-seam"></i> Inventory Check</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-3">
                            <p class="text-muted small mb-3">Please verify quantities and send WhatsApp requests directly to the stores.</p>
                            <div class="accordion" id="inventory-modal-accordion">
                                ${accordionHtml}
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between bg-light">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-dark fw-bold" data-bs-dismiss="modal">Proceed to Close Day</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modalEl = document.getElementById('inventoryCheckModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    renderOrderType() {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 text-center">
                    <h2 class="mb-4">Select Order Type</h2>
                    <div class="row g-4 justify-content-center">
                        <div class="col-md-4">
                            <button class="btn btn-outline-primary w-100 btn-large order-type-btn" data-type="Dine-In">
                                <i class="bi bi-cup-hot"></i>
                                Dine-In
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-success w-100 btn-large order-type-btn" data-type="Take Away">
                                <i class="bi bi-bag"></i>
                                Take Away
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-secondary w-100 btn-large" id="btn-placed-orders-inner">
                                <i class="bi bi-clock-history"></i>
                                Placed Order
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-secondary mt-5 px-5" id="btn-back-home"><i class="bi bi-arrow-left"></i> Back</button>
                </div>
            </div>
        `;
    }

    renderTakeAwaySource() {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 text-center">
                    <h2 class="mb-4">Select Source</h2>
                    <div class="row g-4 justify-content-center">
                        <div class="col-md-4">
                            <button class="btn btn-outline-danger w-100 btn-large source-btn" data-source="Zomato">
                                Zomato
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-warning w-100 btn-large source-btn" data-source="Swiggy">
                                Swiggy
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-secondary w-100 btn-large disabled-outlet" disabled>
                                Quickies App<br><small>(Coming Soon)</small>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-secondary mt-5 px-5" id="btn-back-order-type"><i class="bi bi-arrow-left"></i> Back</button>
                </div>
            </div>
        `;
    }

    renderCustomerInfo() {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-6 text-center">
                    <h2 class="mb-4">Customer Details</h2>
                    <form id="customer-info-form" class="text-start bg-white p-4 rounded shadow-sm position-relative">
                        <div class="mb-3 position-relative">
                            <label for="cust-name" class="form-label fw-bold">Customer Name</label>
                            <input type="text" class="form-control form-control-lg" id="cust-name" placeholder="Enter Name" autocomplete="off">
                            <div id="customer-suggestions" class="list-group position-absolute w-100 shadow-sm d-none" style="z-index: 1000; max-height: 200px; overflow-y: auto;"></div>
                        </div>
                        <div class="mb-4 position-relative">
                            <label for="cust-phone" class="form-label fw-bold">Phone Number</label>
                            <input type="tel" class="form-control form-control-lg" id="cust-phone" placeholder="Enter Phone Number" autocomplete="off">
                        </div>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary btn-lg px-4" id="btn-skip-customer">Skip / Later</button>
                            <button type="submit" class="btn btn-primary btn-lg px-5">Continue to Menu</button>
                        </div>
                    </form>
                    <button class="btn btn-link mt-3 text-muted" id="btn-back-type-source"><i class="bi bi-arrow-left"></i> Back</button>
                </div>
            </div>
        `;
    }

    renderMenu(menu, cartTotal, currentOrder) {
        let menuItemsHtml = menu.map(item => {
            const inCart = currentOrder.items.find(i => i.item.id === item.id);
            const selectedClass = inCart ? 'selected' : '';
            return `
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="card p-3 menu-item-card ${selectedClass}" data-menu-id="${item.id}">
                        <h5 class="card-title">${item.name}</h5>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <span class="text-muted">${item.category}</span>
                            <span class="fw-bold text-success">₹${item.price}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        let cartItemsHtml = currentOrder.items.map(cartItem => `
            <div class="order-item-list">
                <div class="d-flex justify-content-between fw-bold">
                    <span>${cartItem.item.name}</span>
                    <span>₹${cartItem.total}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="text-muted small">₹${cartItem.item.price} x ${cartItem.qty}</span>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-danger qty-btn" data-action="decrease" data-id="${cartItem.item.id}"><i class="bi bi-dash"></i></button>
                        <span class="fw-bold px-2">${cartItem.qty}</span>
                        <button class="btn btn-outline-success qty-btn" data-action="increase" data-id="${cartItem.item.id}"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

        if (currentOrder.items.length === 0) {
            cartItemsHtml = `<div class="text-center text-muted mt-5"><i class="bi bi-cart-x fs-1"></i><p>Cart is empty</p></div>`;
        }

        this.appContainer.innerHTML = `
            <div class="row g-0">
                <!-- Menu Section -->
                <div class="col-md-8 p-4">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                        <h4 class="mb-0">Menu</h4>
                        <div class="w-100" style="max-width: 300px;">
                            <input type="text" class="form-control form-control-lg" placeholder="Search menu..." id="menu-search">
                        </div>
                    </div>
                    <div class="row" id="menu-grid">
                        ${menuItemsHtml}
                    </div>
                    <button class="btn btn-secondary mt-4" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                </div>
                
                <!-- Cart Section -->
                <div class="col-md-4 cart-panel">
                    <div class="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
                        <h5 class="m-0"><i class="bi bi-receipt"></i> Current Order</h5>
                        <span class="badge bg-primary">${currentOrder.type} ${currentOrder.source ? `(${currentOrder.source})` : ''}</span>
                    </div>
                    
                    <div class="cart-items-container" id="cart-items">
                        ${cartItemsHtml}
                    </div>
                    
                    <div class="cart-footer">
                        <div class="d-flex justify-content-between fs-4 fw-bold mb-3">
                            <span>Total</span>
                            <span>₹${cartTotal}</span>
                        </div>
                        <button class="btn btn-success btn-lg w-100 fw-bold" id="btn-proceed-billing" ${currentOrder.items.length === 0 ? 'disabled' : ''}>
                            Proceed to Billing <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateMenuView(menu, cartTotal, currentOrder) {
        // Find existing elements and update them to avoid full re-render
        let cartItemsHtml = currentOrder.items.map(cartItem => `
            <div class="order-item-list">
                <div class="d-flex justify-content-between fw-bold">
                    <span>${cartItem.item.name}</span>
                    <span>₹${cartItem.total}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="text-muted small">₹${cartItem.item.price} x ${cartItem.qty}</span>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-danger qty-btn" data-action="decrease" data-id="${cartItem.item.id}"><i class="bi bi-dash"></i></button>
                        <span class="fw-bold px-2">${cartItem.qty}</span>
                        <button class="btn btn-outline-success qty-btn" data-action="increase" data-id="${cartItem.item.id}"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

        if (currentOrder.items.length === 0) {
            cartItemsHtml = `<div class="text-center text-muted mt-5"><i class="bi bi-cart-x fs-1"></i><p>Cart is empty</p></div>`;
        }

        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) cartItemsContainer.innerHTML = cartItemsHtml;

        // Update Total
        const totalElems = document.querySelectorAll('.cart-footer span:last-child');
        if (totalElems.length) totalElems[0].innerText = `₹${cartTotal}`;

        // Update Proceed Button state
        const proceedBtn = document.getElementById('btn-proceed-billing');
        if (proceedBtn) proceedBtn.disabled = currentOrder.items.length === 0;

        // Update menu card highlights
        document.querySelectorAll('.menu-item-card').forEach(card => {
            const id = card.getAttribute('data-menu-id');
            const inCart = currentOrder.items.find(i => i.item.id === id);
            if (inCart) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    renderBilling(currentOrder, cartTotal) {
        let itemsHtml = currentOrder.items.map(cartItem => {
            const currentPrice = cartItem.customPrice !== undefined ? cartItem.customPrice : cartItem.item.price;
            return `
            <tr>
                <td class="align-middle">${cartItem.item.name}</td>
                <td class="text-center align-middle">${cartItem.qty}</td>
                <td class="text-end">
                    <div class="input-group input-group-sm justify-content-end" style="width: 100px; float: right;">
                        <span class="input-group-text">₹</span>
                        <input type="number" class="form-control text-end custom-price-input" data-menu-id="${cartItem.item.id}" value="${currentPrice}" min="0" step="1">
                    </div>
                </td>
                <td class="text-end fw-bold align-middle">₹${cartItem.total}</td>
            </tr>
            `;
        }).join('');

        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-4">
                <div class="col-md-8">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                            <h3 class="text-center mb-0">Billing Summary</h3>
                            <p class="text-center text-muted">${currentOrder.type} ${currentOrder.source ? `- ${currentOrder.source}` : ''}</p>
                        </div>
                        <div class="card-body p-4">
                            <table class="table table-borderless table-striped">
                                <thead class="table-light">
                                    <tr>
                                        <th>Item</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-end">Price</th>
                                        <th class="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                </tbody>
                                <tfoot>
                                    <tr class="border-top">
                                        <td colspan="3" class="text-end fs-5">Sub Total:</td>
                                        <td class="text-end fs-5 fw-bold">₹${cartTotal}</td>
                                    </tr>
                                    <tr class="${currentOrder.discount ? '' : 'd-none'}">
                                        <td colspan="3" class="text-end text-danger fs-6">Discount (${currentOrder.discount || 0}%):</td>
                                        <td class="text-end text-danger fs-6 fw-bold">-₹${currentOrder.discount ? Math.round(cartTotal * currentOrder.discount / 100) : 0}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end fs-4">Grand Total:</td>
                                        <td class="text-end fs-4 fw-bold text-success">₹${currentOrder.discount ? Math.abs(Math.round(cartTotal - (cartTotal * currentOrder.discount / 100))) : cartTotal}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            
                            <hr class="my-4">
                            
                            <h5 class="mb-3">Apply Discount</h5>
                            <div class="row g-2 mb-4">
                                <div class="col-4">
                                    <button class="btn ${currentOrder.discount === 5 ? 'btn-info text-white' : 'btn-outline-info'} w-100 py-2 fw-bold discount-btn" data-discount="5">5% OFF</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn ${currentOrder.discount === 10 ? 'btn-info text-white' : 'btn-outline-info'} w-100 py-2 fw-bold discount-btn" data-discount="10">10% OFF</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn ${currentOrder.discount === 15 ? 'btn-info text-white' : 'btn-outline-info'} w-100 py-2 fw-bold discount-btn" data-discount="15">15% OFF</button>
                                </div>
                            </div>
                            
                            <hr class="my-4">
                            
                            <h5 class="mb-3">Select Payment Mode</h5>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary w-100 py-3 fs-5 payment-btn" data-mode="UPI">
                                        <i class="bi bi-qr-code-scan"></i> UPI
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-outline-success w-100 py-3 fs-5 payment-btn" data-mode="Cash">
                                        <i class="bi bi-cash"></i> Cash
                                    </button>
                                </div>
                            </div>
                            
                            <div id="cash-calculator-section" class="mt-4 p-3 bg-light rounded border d-none">
                                <h6>Cash Received Calculator</h6>
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="10">₹10</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="20">₹20</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="50">₹50</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="100">₹100</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="200">₹200</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="500">₹500</button>
                                    <button class="btn btn-outline-secondary cash-denom-btn" data-amt="2000">₹2000</button>
                                    <button class="btn btn-danger cash-clear-btn">Clear</button>
                                </div>
                                <div class="row text-end align-items-center mb-2">
                                    <label class="col-6 col-form-label fw-bold text-muted">Amount Given:</label>
                                    <div class="col-6">
                                        <input type="text" class="form-control text-end fs-5 fw-bold" id="cash-received-display" value="₹0" readonly>
                                    </div>
                                </div>
                                <div class="row text-end align-items-center">
                                    <label class="col-6 col-form-label fw-bold text-muted">Return Change:</label>
                                    <div class="col-6">
                                        <input type="text" class="form-control text-end fs-5 fw-bold" id="cash-return-display" value="₹0" readonly>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-flex justify-content-between mt-5 gap-2">
                                <button class="btn btn-secondary btn-lg flex-fill" id="btn-back-menu">Go Back</button>
                                <button class="btn btn-warning btn-lg flex-fill" id="btn-save-order">Save Order</button>
                                <button class="btn btn-info btn-lg flex-fill text-white" id="btn-preview-bill"><i class="bi bi-eye"></i> Preview</button>
                                <button class="btn btn-dark btn-lg flex-fill fw-bold" id="btn-place-order" disabled>Place & Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Print Preview Modal -->
            <div class="modal fade" id="previewModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content border-0 shadow">
                        <div class="modal-header bg-light border-bottom-0 pb-0">
                            <h5 class="modal-title w-100 text-center fw-bold">BILL PREVIEW</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4 pt-2 font-monospace" style="font-size: 0.85rem;" id="print-preview-content">
                            <!-- Preview Content populated dynamically -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Printing Modal -->
            <div class="modal fade" id="printModal" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title"><i class="bi bi-check-circle"></i> Processing Order</h5>
                        </div>
                        <div class="modal-body text-center p-4">
                            <h4 id="print-status-text" class="mb-4">Auto-Processing...</h4>
                            <p class="text-muted fw-bold mb-4" id="print-order-id"></p>
                            
                            <div class="d-flex flex-column align-items-start w-75 mx-auto gap-3 text-start">
                                <div id="status-bill" class="w-100 p-2 rounded bg-light border"><i class="bi bi-hourglass-split text-warning me-2"></i> Printing Bill...</div>
                                <div id="status-kot" class="w-100 p-2 rounded bg-light border"><i class="bi bi-hourglass-split text-warning me-2"></i> Printing KOT...</div>
                                <div id="status-drawer" class="w-100 p-2 rounded bg-light border"><i class="bi bi-hourglass-split text-warning me-2"></i> Opening Cash Drawer...</div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-success btn-lg w-100 d-none" id="btn-done-order">Done (New Order)</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSavedOrders(savedOrders) {
        let ordersHtml = savedOrders.map(order => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 saved-order-card" data-order-id="${order.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${order.customerName || 'Walk-in Customer'}</h5>
                            <span class="badge bg-primary">${order.type}</span>
                        </div>
                        <p class="text-muted small mb-3">
                            <i class="bi bi-clock"></i> ${new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>
                            <i class="bi bi-telephone"></i> ${order.customerPhone || 'N/A'}<br>
                            <i class="bi bi-hash"></i> ${order.id}
                        </p>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fs-5 fw-bold text-success">₹${order.total}</span>
                            <div class="gap-2 d-flex">
                                <button class="btn btn-sm btn-outline-success whatsapp-notify-btn" ${order.customerPhone ? `data-phone="${order.customerPhone}"` : 'disabled'} title="${order.customerPhone ? 'Notify via WhatsApp' : 'No phone number provided'}">
                                    <i class="bi bi-whatsapp"></i> Notify
                                </button>
                                <button class="btn btn-sm btn-outline-danger delete-saved-btn" data-order-id="${order.id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <button class="btn btn-sm btn-primary load-saved-btn" data-order-id="${order.id}">
                                    Load Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        if (savedOrders.length === 0) {
            ordersHtml = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-bookmark-x display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">No Saved Orders</h3>
                    <p>Orders saved during billing will appear here.</p>
                </div>
            `;
        }

        this.appContainer.innerHTML = `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-bookmark-fill text-success"></i> Saved Orders</h2>
                    <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                </div>
                <div class="row">
                    ${ordersHtml}
                </div>
            </div>
        `;
    }

    renderSalesReports(stats, currentPeriod = 'daily') {
        const isActive = (p) => p === currentPeriod ? 'active' : '';

        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-4 mb-5">
                <div class="col-md-10">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>Sales Reports</h2>
                        <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                    </div>
                    
                    <ul class="nav nav-tabs mb-4">
                        <li class="nav-item">
                            <a class="nav-link report-tab ${isActive('daily')}" href="#" data-period="daily">Daily</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link report-tab ${isActive('weekly')}" href="#" data-period="weekly">Weekly</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link report-tab ${isActive('monthly')}" href="#" data-period="monthly">Monthly</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link report-tab ${isActive('custom')}" href="#" data-period="custom">Custom Date</a>
                        </li>
                    </ul>

                    <div id="custom-date-section" class="${currentPeriod === 'custom' ? '' : 'd-none'} card p-3 mb-4 shadow-sm border-0">
                        <form id="custom-report-form" class="row gx-3 align-items-end">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <label class="form-label text-muted">Start Date</label>
                                <input type="date" class="form-control" id="report-start-date" required>
                            </div>
                            <div class="col-md-4 mb-2 mb-md-0">
                                <label class="form-label text-muted">End Date</label>
                                <input type="date" class="form-control" id="report-end-date" required>
                            </div>
                            <div class="col-md-4">
                                <button type="submit" class="btn btn-primary w-100"><i class="bi bi-search"></i> Get Report</button>
                            </div>
                        </form>
                    </div>
                    
                    ${(currentPeriod === 'custom' && stats.grossSales === 0 && stats.totalOrders === 0 && !stats.period) ? `
                    <div class="text-center py-5 text-muted">
                        <i class="bi bi-calendar3 display-4"></i>
                        <h4 class="mt-3">Select Dates to View Report</h4>
                    </div>
                    ` : `
                    <div class="row g-4">
                        <div class="col-md-4">
                            <div class="card report-card p-4">
                                <h6 class="text-muted">Total Gross Sales</h6>
                                <h3 class="fw-bold">₹${stats.grossSales || 0}</h3>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card report-card p-4 border-success">
                                <h6 class="text-muted">Total Orders</h6>
                                <h3 class="fw-bold text-success">${stats.totalOrders || 0}</h3>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card report-card p-4 border-info">
                                <h6 class="text-muted">Net Sales</h6>
                                <h3 class="fw-bold text-info">₹${stats.netSales || 0}</h3>
                            </div>
                        </div>
                        
                        <div class="col-md-6 mt-4">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-white py-3">
                                    <h5 class="mb-0">Payment Split</h5>
                                </div>
                                <div class="card-body p-4">
                                    <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
                                        <span class="fs-5"><i class="bi bi-cash text-success"></i> Cash</span>
                                        <span class="fs-5 fw-bold">₹${stats.cashSales || 0}</span>
                                    </div>
                                    <div class="d-flex justify-content-between pb-1">
                                        <span class="fs-5"><i class="bi bi-qr-code text-primary"></i> UPI</span>
                                        <span class="fs-5 fw-bold">₹${stats.upiSales || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `}
                </div>
            </div>
        `;
    }

    renderDayClosing(stats) {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-4 mb-5">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>Day Closing</h2>
                        <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                    </div>
                    
                    <div class="card shadow-sm border-0">
                        <div class="card-body p-4">
                            <div class="row mb-4">
                                <div class="col-6">
                                    <div class="p-3 bg-light rounded text-center">
                                        <p class="text-muted mb-1">Cash Sales</p>
                                        <h4 class="text-success mb-0">₹${stats.cashSales || 0}</h4>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="p-3 bg-light rounded text-center">
                                        <p class="text-muted mb-1">UPI Sales</p>
                                        <h4 class="text-primary mb-0">₹${stats.upiSales || 0}</h4>
                                    </div>
                                </div>
                            </div>
                            
                            <hr>
                            
                            <form id="day-closing-form">
                                <div class="mb-3 row text-end align-items-center">
                                    <label class="col-sm-6 col-form-label fw-bold">Opening Cash:</label>
                                    <div class="col-sm-6">
                                        <input type="number" class="form-control text-end" id="opening-cash" value="50" required>
                                    </div>
                                </div>
                                <div class="mb-3 row text-end align-items-center">
                                    <label class="col-sm-6 col-form-label fw-bold">Expenses (Payout):</label>
                                    <div class="col-sm-6">
                                        <input type="number" class="form-control text-end text-danger" id="expenses" value="0" required>
                                    </div>
                                </div>
                                
                                <div class="mb-3 row text-end align-items-center mt-4">
                                    <label class="col-sm-6 col-form-label fs-5 fw-bold">Expected Drawer Cash:</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control text-end fs-5 fw-bold bg-light" id="expected-cash" readonly>
                                    </div>
                                </div>
                                
                                <div class="mb-3 row text-end align-items-center">
                                    <label class="col-sm-6 col-form-label fw-bold">Actual Drawer Cash:</label>
                                    <div class="col-sm-6">
                                        <input type="number" class="form-control text-end" id="actual-cash" value="0" required>
                                    </div>
                                </div>
                                
                                <div class="mb-4 row text-end align-items-center">
                                    <label class="col-sm-6 col-form-label fw-bold">Difference (Short/Excess):</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control text-end fw-bold" id="cash-diff" readonly>
                                    </div>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-warning btn-lg fw-bold text-dark">Close Day</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Setup autocalc logic
        const calcFields = () => {
            const openC = parseFloat(document.getElementById('opening-cash').value) || 0;
            const exp = parseFloat(document.getElementById('expenses').value) || 0;
            const actual = parseFloat(document.getElementById('actual-cash').value) || 0;
            const cashSales = stats.cashSales || 0;

            const expected = openC + cashSales - exp;
            const diff = actual - expected;

            document.getElementById('expected-cash').value = '₹' + expected;

            const diffEl = document.getElementById('cash-diff');
            diffEl.value = '₹' + diff;
            diffEl.className = 'form-control text-end fw-bold ' + (diff < 0 ? 'text-danger' : (diff > 0 ? 'text-success' : ''));
        };

        document.getElementById('opening-cash').addEventListener('input', calcFields);
        document.getElementById('expenses').addEventListener('input', calcFields);
        document.getElementById('actual-cash').addEventListener('input', calcFields);

        calcFields(); // initial calculation
    }

    renderPlacedOrders(orders) {
        let ordersHtml = orders.map(order => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 placed-order-card" data-order-id="${order.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${order.customerName || 'Walk-in Customer'}</h5>
                            <span class="badge bg-secondary">${order.type}</span>
                        </div>
                        <p class="text-muted small mb-3">
                            <i class="bi bi-clock"></i> ${new Date(order.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}<br>
                            <i class="bi bi-telephone"></i> ${order.customerPhone || 'N/A'}<br>
                            <i class="bi bi-hash"></i> ${order.id}
                        </p>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fs-5 fw-bold text-success">₹${order.total}</span>
                            <div class="d-flex gap-2">
                                ${order.customerPhone ? `<button class="btn btn-sm btn-outline-success whatsapp-notify-btn" data-phone="${order.customerPhone}"><i class="bi bi-whatsapp"></i> Notify</button>` : ''}
                                <button class="btn btn-sm btn-outline-primary view-placed-btn" data-order-id="${order.id}">
                                    <i class="bi bi-eye"></i> View Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        if (orders.length === 0) {
            ordersHtml = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-card-checklist display-1 text-muted"></i>
                    <h3 class="mt-3 text-muted">No Placed Orders</h3>
                    <p>Orders that have been completed and printed will appear here.</p>
                </div>
            `;
        }

        this.appContainer.innerHTML = `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-clock-history text-secondary"></i> Placed Orders</h2>
                    <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                </div>
                <div class="row">
                    ${ordersHtml}
                </div>
            </div>
        `;
    }

    renderOrderDetails(order) {
        let itemsHtml = order.items.map(cartItem => `
            <tr>
                <td>${cartItem.item.name}</td>
                <td class="text-center">${cartItem.qty}</td>
                <td class="text-end">₹${cartItem.item.price}</td>
                <td class="text-end fw-bold">₹${cartItem.total}</td>
            </tr>
        `).join('');

        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-4">
                <div class="col-md-8">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white border-bottom-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
                            <button class="btn btn-sm btn-outline-secondary" id="btn-back-placed-orders"><i class="bi bi-arrow-left"></i> Back</button>
                            <h3 class="mb-0">Order Details</h3>
                            <div style="width: 60px;"></div> <!-- Spacer -->
                        </div>
                        <div class="card-body p-4">
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <p class="mb-1 text-muted">Order ID</p>
                                    <p class="fw-bold">${order.id}</p>
                                    <p class="mb-1 text-muted">Date & Time</p>
                                    <p class="fw-bold">${new Date(order.date).toLocaleString()}</p>
                                </div>
                                <div class="col-sm-6 text-sm-end">
                                    <p class="mb-1 text-muted">Customer</p>
                                    <p class="fw-bold">${order.customerName || 'Walk-in'}</p>
                                    <p class="mb-1 text-muted">Type</p>
                                    <p class="fw-bold"><span class="badge bg-secondary">${order.type} ${order.source ? `(${order.source})` : ''}</span></p>
                                </div>
                            </div>

                            <table class="table table-borderless table-striped">
                                <thead class="table-light">
                                    <tr>
                                        <th>Item</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-end">Price</th>
                                        <th class="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHtml}
                                </tbody>
                                <tfoot>
                                    <tr class="border-top">
                                        <td colspan="3" class="text-end fs-5">Sub Total:</td>
                                        <td class="text-end fs-5 fw-bold">₹${order.items.reduce((sum, item) => sum + item.total, 0)}</td>
                                    </tr>
                                    ${order.discount ? `
                                    <tr>
                                        <td colspan="3" class="text-end text-danger fs-6">Discount (${order.discount}%):</td>
                                        <td class="text-end text-danger fs-6 fw-bold">-₹${order.items.reduce((sum, item) => sum + item.total, 0) - order.total}</td>
                                    </tr>
                                    ` : ''}
                                    <tr>
                                        <td colspan="3" class="text-end fs-4">Grand Total:</td>
                                        <td class="text-end fs-4 fw-bold text-success">₹${order.total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            
                            <hr class="my-4">
                            
                            <div class="row mb-4">
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Payment Mode</p>
                                    <p class="fw-bold fs-5">${order.paymentMode}</p>
                                </div>
                                <div class="col-6 text-end d-flex justify-content-end gap-2 flex-wrap">
                                    ${order.customerPhone ? `<button class="btn btn-success whatsapp-notify-btn" data-phone="${order.customerPhone}"><i class="bi bi-whatsapp"></i> Notify</button>` : ''}
                                    <button class="btn btn-warning" id="btn-edit-placed-order" data-order-id="${order.id}"><i class="bi bi-pencil"></i> Edit Order</button>
                                    <button class="btn btn-dark" id="btn-reprint-order" data-order-id="${order.id}"><i class="bi bi-printer"></i> Re-print Bill</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
