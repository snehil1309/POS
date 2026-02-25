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

            html += `
                <div class="col-md-5">
                    <button class="btn ${outlet.active ? 'btn-outline-primary' : 'btn-outline-secondary'} w-100 btn-large ${disabledClass}" 
                            data-outlet-id="${outlet.id}" ${!outlet.active ? 'disabled' : ''}>
                        <i class="bi bi-building"></i>
                        ${outlet.name}
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

    renderHome(outletName) {
        this.mainNav.classList.remove('d-none');
        this.navOutletName.innerText = outletName;

        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-10 text-center">
                    <h2 class="mb-5 text-muted">Welcome to ${outletName}</h2>
                    <div class="row gap-4 justify-content-center mt-5">
                        <div class="col-md-4">
                            <button class="btn btn-primary w-100 btn-large shadow-sm" id="btn-take-order">
                                <i class="bi bi-cart-plus"></i>
                                Take Order
                            </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-info text-white w-100 btn-large shadow-sm" id="btn-sales-reports">
                                <i class="bi bi-graph-up"></i>
                                Sales Reports
                            </button>
                        </div>
                        <div class="col-md-4 mt-4">
                            <button class="btn btn-warning text-dark w-100 btn-large shadow-sm" id="btn-day-closing">
                                <i class="bi bi-cash-stack"></i>
                                Day Closing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderOrderType() {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 text-center">
                    <h2 class="mb-4">Select Order Type</h2>
                    <div class="row g-4 justify-content-center">
                        <div class="col-md-5">
                            <button class="btn btn-outline-primary w-100 btn-large order-type-btn" data-type="Dine-In">
                                <i class="bi bi-cup-hot"></i>
                                Dine-In
                            </button>
                        </div>
                        <div class="col-md-5">
                            <button class="btn btn-outline-success w-100 btn-large order-type-btn" data-type="Take Away">
                                <i class="bi bi-bag"></i>
                                Take Away
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
                    <form id="customer-info-form" class="text-start bg-white p-4 rounded shadow-sm">
                        <div class="mb-3">
                            <label for="cust-name" class="form-label fw-bold">Customer Name</label>
                            <input type="text" class="form-control form-control-lg" id="cust-name" placeholder="Enter Name">
                        </div>
                        <div class="mb-4">
                            <label for="cust-phone" class="form-label fw-bold">Phone Number</label>
                            <input type="tel" class="form-control form-control-lg" id="cust-phone" placeholder="Enter Phone Number">
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
        let itemsHtml = currentOrder.items.map(cartItem => `
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
                                        <td colspan="3" class="text-end fs-4">Grand Total:</td>
                                        <td class="text-end fs-4 fw-bold text-success">₹${cartTotal}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            
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
                            
                            <div class="d-flex justify-content-between mt-5">
                                <button class="btn btn-secondary btn-lg px-4" id="btn-back-menu">Go Back</button>
                                <button class="btn btn-info btn-lg px-4 text-white" id="btn-preview-bill"><i class="bi bi-eye"></i> Print Preview</button>
                                <button class="btn btn-dark btn-lg px-5 fw-bold" id="btn-place-order" disabled>Place Order (Auto Print)</button>
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

    renderSalesReports(stats) {
        this.appContainer.innerHTML = `
            <div class="row justify-content-center mt-4">
                <div class="col-md-10">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>Sales Reports</h2>
                        <button class="btn btn-secondary" id="btn-back-home"><i class="bi bi-arrow-left"></i> Home</button>
                    </div>
                    
                    <ul class="nav nav-tabs mb-4">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Daily</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Weekly (WIP)</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Monthly (WIP)</a>
                        </li>
                    </ul>
                    
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
                                <div class="card-header bg-white">
                                    <h5 class="mb-0">Payment Split</h5>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
                                        <span class="fs-5"><i class="bi bi-cash text-success"></i> Cash</span>
                                        <span class="fs-5 fw-bold">₹${stats.cashSales || 0}</span>
                                    </div>
                                    <div class="d-flex justify-content-between border-bottom pb-2">
                                        <span class="fs-5"><i class="bi bi-qr-code text-primary"></i> UPI</span>
                                        <span class="fs-5 fw-bold">₹${stats.upiSales || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <input type="number" class="form-control text-end" id="opening-cash" value="0" required>
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
}
