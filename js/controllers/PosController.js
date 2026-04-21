class PosController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding events to root app container (Event Delegation)
        this.view.appContainer.addEventListener('click', this.handleAppClick.bind(this));
        this.view.appContainer.addEventListener('input', this.handleAppInput.bind(this));
        this.view.appContainer.addEventListener('change', this.handleAppChange.bind(this));

        // Setup top nav listeners
        document.getElementById('btn-change-outlet').addEventListener('click', () => {
            this.model.clearCart();
            this.showOutletSelection();
        });

        // Setup password modal listener
        document.getElementById('btn-submit-password').addEventListener('click', () => {
            const pass = document.getElementById('admin-password').value;
            if (pass === 'Effective1?') {
                const modal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
                modal.hide();
                document.getElementById('admin-password').value = '';
                if (this.onPasswordSuccess) {
                    this.onPasswordSuccess();
                    this.onPasswordSuccess = null;
                }
            } else {
                alert("Incorrect Password!");
                document.getElementById('admin-password').value = '';
            }
        });

        document.getElementById('admin-password').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('btn-submit-password').click();
            }
        });

        document.getElementById('passwordModal').addEventListener('shown.bs.modal', () => {
            document.getElementById('admin-password').focus();
        });

        document.getElementById('passwordModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('admin-password').value = '';
        });

        // Setup expense modal listener
        const btnSaveExpense = document.getElementById('btn-save-expense');
        if (btnSaveExpense) {
            btnSaveExpense.addEventListener('click', () => {
                const amount = document.getElementById('expense-amount').value;
                const desc = document.getElementById('expense-desc').value;
                if (!amount || amount <= 0) {
                    alert('Please enter a valid amount.');
                    return;
                }
                this.model.addExpense(amount, desc);
                
                // Hide modal and clear fields
                const modal = bootstrap.Modal.getInstance(document.getElementById('expenseModal'));
                if (modal) modal.hide();
                
                document.getElementById('expense-amount').value = '';
                document.getElementById('expense-desc').value = '';
                
                alert('Expense saved successfully!');
            });
        }

        document.getElementById('btn-reset-data').addEventListener('click', () => {
            this.promptPassword(() => {
                if (confirm("Are you sure you want to delete all sales, order data, and saved orders? This action cannot be undone.")) {
                    localStorage.removeItem('pos_orders');
                    localStorage.removeItem('pos_closings');
                    localStorage.removeItem('pos_saved_orders');
                    sessionStorage.removeItem('pos_active_outlet');
                    this.model.clearCart();
                    this.showOutletSelection();
                    alert("All data has been cleared.");
                }
            });
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
        this.view.renderHome(this.model.currentOutlet);
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

    showSalesReports(period = 'daily', startDate = null, endDate = null) {
        let stats;
        if (period === 'custom' && (!startDate || !endDate)) {
            stats = { grossSales: 0, totalOrders: 0, netSales: 0, cashSales: 0, upiSales: 0 };
        } else {
            stats = this.model.getSalesStats(period, startDate, endDate);
        }
        this.view.renderSalesReports(stats, period);

        if (period === 'custom' && startDate && endDate) {
            setTimeout(() => {
                const s = document.getElementById('report-start-date');
                const e = document.getElementById('report-end-date');
                if (s) s.value = startDate;
                if (e) e.value = endDate;
            }, 0);
        }
    }

    showSavedOrders() {
        const savedOrders = this.model.getSavedOrders();
        this.view.renderSavedOrders(savedOrders);
    }

    showDayClosing() {
        const stats = this.model.getDailyStats();
        this.view.renderDayClosing(stats);
    }

    showInventory() {
        const inventory = this.model.getInventory();
        this.view.renderInventory(inventory);
    }

    showPlacedOrders() {
        const orders = this.model.getOrders();
        // Sort by date descending (latest first)
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.view.renderPlacedOrders(orders);
    }

    showOrderDetails(orderId) {
        const orders = this.model.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            this.view.renderOrderDetails(order);
        }
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
        if (e.target.closest('#btn-saved-orders')) {
            this.showSavedOrders();
            return;
        }
        if (e.target.closest('#btn-sales-reports')) {
            if (this.model.currentOutlet.id === 'quickies') {
                this.promptPassword(() => this.showSalesReports());
            } else {
                this.showSalesReports();
            }
            return;
        }

        if (e.target.closest('#btn-add-expense')) {
            const modalEl = document.getElementById('expenseModal');
            if (modalEl) {
                const modalParams = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modalParams.show();
            }
            return;
        }

        const reportTab = e.target.closest('.report-tab');
        if (reportTab) {
            e.preventDefault();
            const period = reportTab.dataset.period;
            this.showSalesReports(period);
            return;
        }

        if (e.target.closest('#custom-report-form button[type="submit"]')) {
            e.preventDefault();
            const startDate = document.getElementById('report-start-date').value;
            const endDate = document.getElementById('report-end-date').value;
            if (startDate && endDate) {
                this.showSalesReports('custom', startDate, endDate);
            } else {
                alert('Please select both Start Date and End Date.');
            }
            return;
        }
        if (e.target.closest('#btn-day-closing')) {
            const inventory = this.model.getInventory();
            this.view.showInventoryCheckModal(inventory);

            const modalEl = document.getElementById('inventoryCheckModal');

            const sendBtns = modalEl.querySelectorAll('.btn-send-store-wa');
            sendBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const storeName = btn.dataset.store;
                    const phone = btn.dataset.phone;

                    // Save all quantities from modal
                    document.querySelectorAll('.inv-modal-qty').forEach(input => {
                        this.model.updateInventoryQty(input.dataset.invId, input.value);
                    });

                    // Filter items for this store
                    const storeItems = this.model.getInventory().filter(i => (i.store || 'Others') === storeName);

                    // Format WhatsApp Message
                    const invText = storeItems.map(i => `${i.name}: ${i.qty || 0}`).join('\n');
                    const msg = `*Inventory Update* - ${storeName} (${this.model.currentOutlet.name})\n-----------------\n${invText}`;
                    window.open(`https://wa.me/${phone}/?text=${encodeURIComponent(msg)}`, "_blank");
                });
            });

            modalEl.addEventListener('hidden.bs.modal', () => {
                // When modal is closed, proceed to day closing
                this.showDayClosing();
            }, { once: true });

            return;
        }
        if (e.target.closest('#btn-inventory')) {
            this.showInventory();
            return;
        }
        if (e.target.closest('#btn-placed-orders') || e.target.closest('#btn-placed-orders-inner')) {
            this.showPlacedOrders();
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
        if (e.target.closest('#btn-back-placed-orders')) {
            this.showPlacedOrders();
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

        // Inventory Management
        if (e.target.closest('#add-inventory-form button[type="submit"]')) {
            e.preventDefault();
            const nameInput = document.getElementById('new-inv-name');
            const storeInput = document.getElementById('new-inv-store');
            this.model.addInventoryItem(nameInput.value, storeInput.value);
            this.showInventory();
            return;
        }

        const deleteInvBtn = e.target.closest('.btn-delete-inv');
        if (deleteInvBtn) {
            if (confirm("Delete this inventory item?")) {
                this.model.removeInventoryItem(deleteInvBtn.dataset.invId);
                this.showInventory();
            }
            return;
        }

        if (e.target.closest('#btn-save-inventory')) {
            document.querySelectorAll('.inv-qty-input').forEach(input => {
                this.model.updateInventoryQty(input.dataset.invId, input.value);
            });
            alert("Inventory quantities saved!");
            return;
        }

        // Customer Auto-suggestion selection
        const custSuggestion = e.target.closest('.cust-suggestion-item');
        if (custSuggestion) {
            document.getElementById('cust-name').value = custSuggestion.dataset.name;
            document.getElementById('cust-phone').value = custSuggestion.dataset.phone;
            document.getElementById('customer-suggestions').classList.add('d-none');
            return;
        }

        // Hide customer suggestions if clicking outside
        const suggestions = document.getElementById('customer-suggestions');
        if (suggestions && !suggestions.classList.contains('d-none')) {
            if (!e.target.closest('#customer-suggestions') && !e.target.closest('#cust-name')) {
                suggestions.classList.add('d-none');
            }
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

        // Save Order (from billing)
        if (e.target.closest('#btn-save-order')) {
            if (this.model.saveCurrentOrder()) {
                alert("Order Saved Successfully!");
                this.showHome();
            } else {
                alert("Failed to save order.");
            }
            return;
        }

        // Saved Order Actions
        const loadBtn = e.target.closest('.load-saved-btn');
        if (loadBtn) {
            const id = loadBtn.dataset.orderId;
            if (this.model.loadSavedOrder(id)) {
                this.showMenu();
            }
            return;
        }
        const deleteBtn = e.target.closest('.delete-saved-btn');
        if (deleteBtn) {
            if (confirm("Are you sure you want to delete this saved order?")) {
                const id = deleteBtn.dataset.orderId;
                this.model.deleteSavedOrder(id);
                this.showSavedOrders();
            }
            return;
        }

        // Placed Order Actions
        const viewPlacedBtn = e.target.closest('.view-placed-btn');
        if (viewPlacedBtn) {
            const id = viewPlacedBtn.dataset.orderId;
            this.showOrderDetails(id);
            return;
        }

        if (e.target.closest('#btn-edit-placed-order')) {
            const id = e.target.closest('#btn-edit-placed-order').dataset.orderId;
            this.promptPassword(() => {
                if (this.model.loadPlacedOrder(id)) {
                    this.showMenu();
                }
            });
            return;
        }

        if (e.target.closest('#btn-reprint-order')) {
            const id = e.target.closest('#btn-reprint-order').dataset.orderId;
            const orders = this.model.getOrders();
            const order = orders.find(o => o.id === id);
            if (order) {
                this.triggerFullOrderPrint(order);
                alert("Re-print job sent to printer.");
            }
            return;
        }

        // Render placed order details
        if (e.target.closest('.view-placed-btn')) {
            const id = e.target.closest('.view-placed-btn').dataset.orderId;
            const orders = this.model.getOrders();
            const order = orders.find(o => o.id === id);
            if (order) {
                this.view.renderOrderDetails(order);
                window.scrollTo(0, 0);
            }
            return;
        }

        // WhatsApp Notification
        const waBtn = e.target.closest('.whatsapp-notify-btn');
        if (waBtn) {
            let phone = waBtn.dataset.phone;
            if (!phone) return;
            phone = phone.replace(/\D/g, ''); // Remove non-digits
            if (phone.length === 10) {
                phone = "91" + phone;
            }
            const msg = "Hello%20your%20order%20is%20ready%20______QUICKIES%20SERVED%20HOT%20SERVED%20QUICK";
            window.open(`https://wa.me/${phone}/?text=${msg}`, "_blank");
            return;
        }

        // Apply Discount
        const discountBtn = e.target.closest('.discount-btn');
        if (discountBtn) {
            const percent = parseInt(discountBtn.dataset.discount, 10);
            if (this.model.currentOrder.discount === percent) {
                this.model.setDiscount(0); // Toggle off
            } else {
                this.model.setDiscount(percent);
            }
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

            // Toggle Cash Calculator
            if (payBtn.dataset.mode === 'Cash') {
                document.getElementById('cash-calculator-section').classList.remove('d-none');
                this.cashReceived = 0;
                this.updateCashCalculator();
            } else {
                document.getElementById('cash-calculator-section').classList.add('d-none');
            }
            return;
        }

        // Cash Denomination Buttons
        const denomBtn = e.target.closest('.cash-denom-btn');
        if (denomBtn) {
            this.cashReceived = (this.cashReceived || 0) + parseInt(denomBtn.dataset.amt, 10);
            this.updateCashCalculator();
            return;
        }

        if (e.target.closest('.cash-clear-btn')) {
            this.cashReceived = 0;
            this.updateCashCalculator();
            return;
        }

        // Print Preview
        if (e.target.closest('#btn-preview-bill')) {
            const o = this.model.currentOrder;
            const itemsText = o.items.map(i => {
                const currentPrice = i.customPrice !== undefined ? i.customPrice : i.item.price;
                return `${i.item.name.padEnd(15).substring(0, 15)} ${String(i.qty).padStart(3)} ₹${String(currentPrice).padStart(5)}`;
            }).join('<br>');

            const logoHtml = this.model.currentOutlet.logo ? `<img src="${this.model.currentOutlet.logo}" alt="${this.model.currentOutlet.name} Logo" class="mb-2" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"><br>` : '';

            const content = `
                <div class="text-center mb-3">
                    ${logoHtml}
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
                ${o.discount ? `
                <div class="text-end fw-bold mt-2">Sub Total: ₹${this.model.getCartTotal()}</div>
                <div class="text-end fw-bold">Discount (${o.discount}%): -₹${Math.round(this.model.getCartTotal() * o.discount / 100)}</div>
                ` : ''}
                <div class="text-end fw-bold mt-2">TOTAL: ₹${this.model.getFinalTotal()}</div>
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

                // Reset Status UI
                const updateStatus = (id, icon, text, textClass) => {
                    const el = document.getElementById(id);
                    el.innerHTML = `<i class="bi ${icon} ${textClass} me-2"></i> ${text}`;
                    el.className = `w-100 p-2 rounded bg-light border border-${textClass.replace('text-', '')}`;
                };

                // Consolidated Printing Sequence
                setTimeout(() => {
                    this.triggerFullOrderPrint(record);
                    updateStatus('status-kot', 'bi-check-circle-fill', 'KOT Printed', 'text-success');
                    updateStatus('status-bill', 'bi-check-circle-fill', 'Bill Printed', 'text-success');
                    updateStatus('status-drawer', 'bi-check-circle-fill', 'Cash Drawer Opened', 'text-success');

                    document.getElementById('print-status-text').innerText = 'Complete!';
                    document.getElementById('print-status-text').classList.add('text-success');
                    document.getElementById('btn-done-order').classList.remove('d-none');
                }, 500);
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
            return;
        }
    }

    promptPassword(callback) {
        this.onPasswordSuccess = callback;
        new bootstrap.Modal(document.getElementById('passwordModal')).show();
    }

    updateCashCalculator() {
        const receivedEl = document.getElementById('cash-received-display');
        const returnEl = document.getElementById('cash-return-display');
        if (receivedEl && returnEl) {
            receivedEl.value = '₹' + (this.cashReceived || 0);
            const total = this.model.getFinalTotal();
            const change = (this.cashReceived || 0) - total;

            if (change > 0) {
                returnEl.value = '₹' + change;
                returnEl.classList.add('text-success');
                returnEl.classList.remove('text-danger');
            } else if (change < 0) {
                returnEl.value = '-₹' + Math.abs(change) + ' (Short)';
                returnEl.classList.add('text-danger');
                returnEl.classList.remove('text-success');
            } else {
                returnEl.value = '₹0';
                returnEl.classList.remove('text-danger', 'text-success');
            }
        }
    }

    triggerFullOrderPrint(order) {
        const printContainer = document.getElementById('print-section');
        const outletLogo = this.model.currentOutlet.logo;

        // 1. KOT Section HTML
        const kotHtml = `
            <div class="print-header">
                <div class="print-title">KITCHEN ORDER TICKET (KOT)</div>
                <div>${order.id}</div>
                <div>${new Date(order.date).toLocaleString()}</div>
                <div class="print-bold">Type: ${order.type} ${order.source ? '(' + order.source + ')' : ''}</div>
            </div>
            <div class="print-divider"></div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th style="width: 80%" class="print-bold">ITEM</th>
                        <th style="width: 20%" class="print-text-right print-bold">QTY</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(i => `
                        <tr>
                            <td class="print-bold">${i.item.name}</td>
                            <td class="print-text-right print-bold">${i.qty}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="print-divider"></div>
            <div class="print-text-center">*** KOT END ***</div>
        `;

        // 2. Bill Section HTML
        const billHtml = `
            <div>
                <div class="print-header">
                    ${outletLogo ? `<img src="${outletLogo}" style="width: 40px; height: 40px; margin-bottom: 5px;"><br>` : ''}
                    <div class="print-title">${this.model.currentOutlet.name.toUpperCase()}</div>
                    <div>Order ID: ${order.id}</div>
                    <div>Date: ${new Date(order.date).toLocaleString()}</div>
                    <div class="print-bold">Type: ${order.type} ${order.source ? '(' + order.source + ')' : ''}</div>
                    ${order.customerName ? `<div>Cust: ${order.customerName}</div>` : ''}
                </div>
                <div class="print-divider"></div>
                <table class="print-table">
                    <thead>
                        <tr>
                            <th style="width: 50%" class="print-bold">ITEM</th>
                            <th style="width: 15%" class="print-text-center print-bold">QTY</th>
                            <th style="width: 35%" class="print-text-right print-bold">PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(i => `
                            <tr>
                                <td class="print-bold">${i.item.name}</td>
                                <td class="print-text-center print-bold">${i.qty}</td>
                                <td class="print-text-right print-bold">₹${i.total}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="print-divider"></div>
                ${order.discount ? `
                <div class="print-text-right print-bold">Sub Total: ₹${order.items.reduce((sum, item) => sum + item.total, 0)}</div>
                <div class="print-text-right print-bold">Discount (${order.discount}%): -₹${order.items.reduce((sum, item) => sum + item.total, 0) - order.total}</div>
                ` : ''}
                <div class="print-text-right print-bold" style="font-size: 1.2rem;">TOTAL: ₹${order.total}</div>
                <div class="print-text-right print-bold">Paid via: ${order.paymentMode}</div>
                <div class="print-divider"></div>
                <div class="print-header" style="margin-top: 5mm">
                    <strong class="print-bold">THANK YOU! VISIT AGAIN</strong><br>
                    <small class="print-bold">Pallav: +91-9106804063</small>
                </div>
                <!-- Drawer Kick Character -->
                <div style="font-size: 1px; color: white;">\u0007</div>
            </div>
        `;

        // Command 1: Print KOT
        printContainer.innerHTML = kotHtml;
        window.print();

        // Command 2: Print Bill (with slight delay to separate printer buffers)
        setTimeout(() => {
            printContainer.innerHTML = billHtml;
            window.print();

            // Clear after both jobs are sent
            setTimeout(() => {
                printContainer.innerHTML = '';
            }, 1000);
        }, 500);
    }

    handleAppChange(e) {
        if (e.target.classList.contains('custom-price-input')) {
            const id = e.target.dataset.menuId;
            const newPrice = parseFloat(e.target.value);
            if (!isNaN(newPrice) && newPrice >= 0) {
                this.model.updateItemPrice(id, newPrice);
                this.showBilling();
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

        // Customer Search Autocomplete
        if (e.target.id === 'cust-name') {
            const term = e.target.value.toLowerCase().trim();
            const container = document.getElementById('customer-suggestions');
            if (!container) return;

            if (term.length < 2) {
                container.classList.add('d-none');
                return;
            }

            const customers = this.model.getUniqueCustomers();
            const matches = customers.filter(c => c.name && c.name.toLowerCase().includes(term)).slice(0, 5);

            if (matches.length > 0) {
                container.innerHTML = matches.map(c => `
                    <button type="button" class="list-group-item list-group-item-action cust-suggestion-item py-2" data-name="${c.name || ''}" data-phone="${c.phone || ''}">
                        <strong>${c.name}</strong> ${c.phone ? `<span class="text-muted small ms-2">${c.phone}</span>` : ''}
                    </button>
                `).join('');
                container.classList.remove('d-none');
            } else {
                container.classList.add('d-none');
            }
        }
    }
}
