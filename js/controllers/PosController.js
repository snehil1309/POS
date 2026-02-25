class PosController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding events to root app container (Event Delegation)
        this.view.appContainer.addEventListener('click', this.handleAppClick.bind(this));
        this.view.appContainer.addEventListener('input', this.handleAppInput.bind(this));

        // Setup top nav listeners
        document.getElementById('btn-change-outlet').addEventListener('click', () => {
            this.model.clearCart();
            this.showOutletSelection();
        });

        document.getElementById('btn-reset-data').addEventListener('click', () => {
            if (confirm("Are you sure you want to delete all sales and order data? This action cannot be undone.")) {
                localStorage.removeItem('pos_orders');
                localStorage.removeItem('pos_closings');
                sessionStorage.removeItem('pos_active_outlet');
                this.model.clearCart();
                this.showOutletSelection();
                alert("All data has been cleared.");
            }
        });

        // Initial setup check session
        const savedOutlet = sessionStorage.getItem('pos_active_outlet');
        if (savedOutlet && this.model.setOutlet(savedOutlet)) {
            this.showHome();
        } else {
            this.showOutletSelection();
        }
    }

    showOutletSelection() {
        sessionStorage.removeItem('pos_active_outlet');
        this.view.renderOutletSelection(this.model.outlets);
    }

    showHome() {
        this.view.renderHome(this.model.currentOutlet.name);
    }

    showOrderType() {
        this.view.renderOrderType();
    }

    showTakeAwaySource() {
        this.view.renderTakeAwaySource();
    }

    showCustomerInfo() {
        this.view.renderCustomerInfo();
    }

    showMenu() {
        this.view.renderMenu(this.model.menu, this.model.getCartTotal(), this.model.currentOrder);
    }

    showBilling() {
        this.view.renderBilling(this.model.currentOrder, this.model.getCartTotal());
    }

    showSalesReports() {
        const stats = this.model.getDailyStats();
        this.view.renderSalesReports(stats);
    }

    showDayClosing() {
        const stats = this.model.getDailyStats();
        this.view.renderDayClosing(stats);
    }

    handleAppClick(e) {
        // Outlet Selection
        const outletBtn = e.target.closest('[data-outlet-id]');
        if (outletBtn) {
            const id = outletBtn.dataset.outletId;
            if (this.model.setOutlet(id)) {
                sessionStorage.setItem('pos_active_outlet', id);
                this.showHome();
            }
            return;
        }

        // Home Buttons
        if (e.target.closest('#btn-take-order')) {
            this.showOrderType();
            return;
        }
        if (e.target.closest('#btn-sales-reports')) {
            this.showSalesReports();
            return;
        }
        if (e.target.closest('#btn-day-closing')) {
            this.showDayClosing();
            return;
        }

        // Back Buttons
        if (e.target.closest('#btn-back-home')) {
            this.model.clearCart();
            this.showHome();
            return;
        }
        if (e.target.closest('#btn-back-order-type')) {
            this.showOrderType();
            return;
        }
        if (e.target.closest('#btn-back-type-source')) {
            if (this.model.currentOrder.type === 'Take Away') {
                this.showTakeAwaySource();
            } else {
                this.showOrderType();
            }
            return;
        }
        if (e.target.closest('#btn-back-menu')) {
            this.showMenu();
            return;
        }

        // Order Type Selection
        const typeBtn = e.target.closest('.order-type-btn');
        if (typeBtn) {
            const type = typeBtn.dataset.type;
            this.model.setOrderType(type);
            if (type === 'Take Away') {
                this.showTakeAwaySource();
            } else {
                this.showCustomerInfo();
            }
            return;
        }

        // Take Away Source Selection
        const sourceBtn = e.target.closest('.source-btn');
        if (sourceBtn) {
            this.model.setOrderSource(sourceBtn.dataset.source);
            this.showCustomerInfo();
            return;
        }

        // Customer Info Actions
        if (e.target.closest('#btn-skip-customer')) {
            this.model.setCustomerInfo('', '');
            this.showMenu();
            return;
        }

        if (e.target.closest('#customer-info-form button[type="submit"]')) {
            e.preventDefault();
            const form = document.getElementById('customer-info-form');
            const name = document.getElementById('cust-name').value;
            const phone = document.getElementById('cust-phone').value;

            // Allow submission even if empty if they click continue, but normally validate
            if (!name && !phone) {
                if (!confirm("Proceed without customer details?")) return;
            }

            this.model.setCustomerInfo(name, phone);
            this.showMenu();
            return;
        }

        // Menu Item Selection
        const menuCard = e.target.closest('.menu-item-card');
        if (menuCard) {
            const id = menuCard.dataset.menuId;
            this.model.addToCart(id);
            this.view.updateMenuView(this.model.menu, this.model.getCartTotal(), this.model.currentOrder);
            return;
        }

        // Cart Qty Adjust
        const qtyBtn = e.target.closest('.qty-btn');
        if (qtyBtn) {
            const id = qtyBtn.dataset.id;
            const action = qtyBtn.dataset.action;
            this.model.updateCartQty(id, action === 'increase' ? 1 : -1);
            this.view.updateMenuView(this.model.menu, this.model.getCartTotal(), this.model.currentOrder);
            return;
        }

        // Proceed to Billing
        if (e.target.closest('#btn-proceed-billing')) {
            this.showBilling();
            return;
        }

        // Payment Mode Selection
        const payBtn = e.target.closest('.payment-btn');
        if (payBtn) {
            document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active', 'border-3'));
            payBtn.classList.add('active', 'border-3');
            this.model.setPaymentMode(payBtn.dataset.mode);
            document.getElementById('btn-place-order').disabled = false;
            return;
        }

        // Print Preview
        if (e.target.closest('#btn-preview-bill')) {
            const o = this.model.currentOrder;
            const itemsText = o.items.map(i => `${i.item.name.padEnd(15).substring(0, 15)} ${String(i.qty).padStart(3)} ₹${String(i.item.price).padStart(5)}`).join('<br>');

            const content = `
                <div class="text-center mb-3">
                    <strong>${this.model.currentOutlet.name}</strong><br>
                    ${o.type} ${o.source ? ' - ' + o.source : ''}<br>
                    ${o.customerName ? 'Cust: ' + o.customerName + '<br>' : ''}
                    ${o.customerPhone ? 'Ph: ' + o.customerPhone + '<br>' : ''}
                    ------------------------
                </div>
                <div>ITEM            QTY PRICE</div>
                <div>------------------------</div>
                <div>${itemsText}</div>
                <div>------------------------</div>
                <div class="text-end fw-bold mt-2">TOTAL: ₹${this.model.getCartTotal()}</div>
            `;

            document.getElementById('print-preview-content').innerHTML = content;
            new bootstrap.Modal(document.getElementById('previewModal')).show();
            return;
        }

        // Place Order
        if (e.target.closest('#btn-place-order')) {
            const record = this.model.placeOrder();
            if (record) {
                // Show Auto-Printing Modal
                const modalEl = document.getElementById('printModal');
                const modal = new bootstrap.Modal(modalEl);
                document.getElementById('print-order-id').innerText = 'Order ID: ' + record.id;
                modal.show();

                // Simulate Auto-Printing Sequence
                const updateStatus = (id, icon, text, textClass) => {
                    const el = document.getElementById(id);
                    el.innerHTML = `<i class="bi ${icon} ${textClass} me-2"></i> ${text}`;
                    el.className = `w-100 p-2 rounded bg-light border border-${textClass.replace('text-', '')}`;
                };

                // Reset Status UI
                updateStatus('status-bill', 'bi-hourglass-split', 'Printing Bill...', 'text-warning');
                updateStatus('status-kot', 'bi-hourglass-split', 'Printing KOT...', 'text-warning');
                updateStatus('status-drawer', 'bi-hourglass-split', 'Opening Cash Drawer...', 'text-warning');
                document.getElementById('btn-done-order').classList.add('d-none');
                document.getElementById('print-status-text').innerText = 'Auto-Processing...';

                // Sequence triggers
                setTimeout(() => updateStatus('status-bill', 'bi-check-circle-fill', 'Bill Printed', 'text-success'), 800);
                setTimeout(() => updateStatus('status-kot', 'bi-check-circle-fill', 'KOT Printed', 'text-success'), 1600);
                setTimeout(() => {
                    updateStatus('status-drawer', 'bi-check-circle-fill', 'Cash Drawer Opened', 'text-success');
                    document.getElementById('print-status-text').innerText = 'Complete!';
                    document.getElementById('print-status-text').classList.add('text-success');
                    document.getElementById('btn-done-order').classList.remove('d-none');
                }, 2400);

            }
            return;
        }

        if (e.target.closest('#btn-done-order')) {
            const modalEl = document.getElementById('printModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            modalEl.addEventListener('hidden.bs.modal', () => {
                this.showHome();
            }, { once: true });
            return;
        }

        // Day Closing Form Submit (Delegated)
        if (e.target.closest('#day-closing-form button[type="submit"]')) {
            e.preventDefault();
            const form = document.getElementById('day-closing-form');
            if (form.reportValidity()) {
                const data = {
                    openingCash: parseFloat(document.getElementById('opening-cash').value),
                    expenses: parseFloat(document.getElementById('expenses').value),
                    actualCash: parseFloat(document.getElementById('actual-cash').value),
                    expectedCash: parseFloat(document.getElementById('expected-cash').value.replace('₹', '')),
                    cashDiff: parseFloat(document.getElementById('cash-diff').value.replace('₹', ''))
                };
                this.model.saveDayClosing(data);
                alert("Day Closed Successfully. System Locked for current Day.");
                this.showHome();
            }
        }
    }

    handleAppInput(e) {
        if (e.target.id === 'menu-search') {
            const term = e.target.value.toLowerCase();
            const filteredMenu = this.model.menu.filter(m => m.name.toLowerCase().includes(term) || m.category.toLowerCase().includes(term));

            // Re-render just the menu grid logic
            let menuItemsHtml = filteredMenu.map(item => {
                const inCart = this.model.currentOrder.items.find(i => i.item.id === item.id);
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

            if (filteredMenu.length === 0) {
                menuItemsHtml = `<div class="col-12 text-center text-muted mt-5">No items found</div>`;
            }

            document.getElementById('menu-grid').innerHTML = menuItemsHtml;
        }
    }
}
