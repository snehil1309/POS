class PosModel {
    constructor() {
        this.outlets = [
            { id: 'quickies', name: 'Quickies', active: true },
            { id: 'okr', name: 'OKR', active: false }
        ];

        this.menu = [
            // Ice Cream
            { id: 'ic1', name: 'Vanilla Ice Cream', price: 40, category: 'Ice Cream' },
            { id: 'ic2', name: 'Chocolate Chips Ice Cream', price: 60, category: 'Ice Cream' },
            { id: 'ic3', name: 'Cookies and Cream Ice Cream', price: 65, category: 'Ice Cream' },
            { id: 'ic4', name: 'Raj Bhog Ice Cream', price: 70, category: 'Ice Cream' },
            { id: 'ic5', name: 'Mango Ice Cream', price: 65, category: 'Ice Cream' },

            // Waffles
            { id: 'w1', name: 'Milk Chocolate Waffle', price: 150, category: 'Waffles' },
            { id: 'w2', name: 'Cookies and Cream Waffle', price: 160, category: 'Waffles' },
            { id: 'w3', name: 'Kitkat Waffle', price: 160, category: 'Waffles' },

            // Milkshakes
            { id: 'm1', name: 'Vanilla Milkshake', price: 80, category: 'Milkshakes' },
            { id: 'm2', name: 'Chocolate Milkshake', price: 90, category: 'Milkshakes' },
            { id: 'm3', name: 'Strawberry Milkshake', price: 100, category: 'Milkshakes' },
            { id: 'm4', name: 'Mango Milkshake', price: 130, category: 'Milkshakes' },
            { id: 'm5', name: 'Rajwadi Milkshake', price: 140, category: 'Milkshakes' },

            // Desserts
            { id: 'd1', name: 'Hot Chocolate Brownie', price: 200, category: 'Desserts' },

            // Fries
            { id: 'f1', name: 'Simply Salted Fries', price: 50, category: 'Fries' },
            { id: 'f2', name: 'Peri Peri Fries', price: 60, category: 'Fries' },
            { id: 'f3', name: 'Pepper Crunch Fries', price: 70, category: 'Fries' },
            { id: 'f4', name: 'Cheese Mayo Loaded Fries', price: 80, category: 'Fries' },
            { id: 'f5', name: 'Honey Chilly Lemon Fries', price: 90, category: 'Fries' },

            // Mini Pizzas
            { id: 'p1', name: 'Mini Margirita Pizza', price: 90, category: 'Mini Pizzas' },
            { id: 'p2', name: 'Garden Fresh Pizza', price: 100, category: 'Mini Pizzas' },
            { id: 'p3', name: 'Veggie Clasic Pizza', price: 110, category: 'Mini Pizzas' },

            // Beverages
            { id: 'b1', name: 'Zesty Fresh Lime', price: 40, category: 'Beverages' },
            { id: 'b2', name: 'Sparkling Lime Soda', price: 50, category: 'Beverages' },
            { id: 'b3', name: 'Orange Pop Soda', price: 70, category: 'Beverages' },
            { id: 'b4', name: 'Mint Mojito', price: 70, category: 'Beverages' },

            // Sandwiches & Toasts
            { id: 's1', name: 'Golden Butter Toast', price: 50, category: 'Sandwiches & Toasts' },
            { id: 's2', name: 'Clasic Comfort Sandwich', price: 80, category: 'Sandwiches & Toasts' },
            { id: 's3', name: 'Grill Melt Veggies', price: 120, category: 'Sandwiches & Toasts' },
            { id: 's4', name: 'Cheesy Veggies Grilled Sandwich', price: 140, category: 'Sandwiches & Toasts' },
            { id: 's5', name: 'Cheese Club Sandwich', price: 160, category: 'Sandwiches & Toasts' },

            // Potato Wedges
            { id: 'pw1', name: 'Simplly Salted Wedges', price: 70, category: 'Potato Wedges' },
            { id: 'pw2', name: 'Peri Peri Wedges', price: 80, category: 'Potato Wedges' },
            { id: 'pw3', name: 'Cheese Mayo Wedges', price: 100, category: 'Potato Wedges' },
            { id: 'pw4', name: 'Honey Chilly Lemon Wedges', price: 120, category: 'Potato Wedges' }
        ];

        this.currentOutlet = null;
        this.currentOrder = {
            id: null,
            type: null, // Dine-In, Take Away
            source: null, // Swiggy, Zomato
            customerName: '',
            customerPhone: '',
            items: [], // { item: {}, qty: 1, total: 120 }
            paymentMode: null
        };
    }

    setOutlet(outletId) {
        const outlet = this.outlets.find(o => o.id === outletId);
        if (outlet && outlet.active) {
            this.currentOutlet = outlet;
            return true;
        }
        return false;
    }

    setOrderType(type) {
        this.currentOrder.type = type;
        if (type === 'Dine-In') {
            this.currentOrder.source = 'Direct';
        }
    }

    setOrderSource(source) {
        this.currentOrder.source = source;
    }

    setCustomerInfo(name, phone) {
        this.currentOrder.customerName = name;
        this.currentOrder.customerPhone = phone;
    }

    setPaymentMode(mode) {
        this.currentOrder.paymentMode = mode;
    }

    addToCart(menuItemId) {
        const item = this.menu.find(m => m.id === menuItemId);
        if (!item) return;

        const existing = this.currentOrder.items.find(i => i.item.id === menuItemId);
        if (existing) {
            existing.qty += 1;
            existing.total = existing.qty * existing.item.price;
        } else {
            this.currentOrder.items.push({
                item: item,
                qty: 1,
                total: item.price
            });
        }
    }

    updateCartQty(menuItemId, change) {
        const existingInfo = this.currentOrder.items.findIndex(i => i.item.id === menuItemId);
        if (existingInfo !== -1) {
            this.currentOrder.items[existingInfo].qty += change;
            if (this.currentOrder.items[existingInfo].qty <= 0) {
                this.currentOrder.items.splice(existingInfo, 1);
            } else {
                this.currentOrder.items[existingInfo].total = this.currentOrder.items[existingInfo].qty * this.currentOrder.items[existingInfo].item.price;
            }
        }
    }

    getCartTotal() {
        return this.currentOrder.items.reduce((sum, item) => sum + item.total, 0);
    }

    clearCart() {
        this.currentOrder = {
            id: null,
            type: null,
            source: null,
            customerName: '',
            customerPhone: '',
            items: [],
            paymentMode: null
        };
    }

    placeOrder() {
        if (!this.currentOutlet || !this.currentOrder.type || this.currentOrder.items.length === 0) {
            return false;
        }

        const orderRecord = {
            id: this.currentOrder.id || ('ORD' + Date.now()),
            date: new Date().toISOString(),
            outletId: this.currentOutlet.id,
            type: this.currentOrder.type,
            source: this.currentOrder.source,
            customerName: this.currentOrder.customerName,
            customerPhone: this.currentOrder.customerPhone,
            items: [...this.currentOrder.items],
            total: this.getCartTotal(),
            paymentMode: this.currentOrder.paymentMode || 'Cash'
        };

        const orders = this.getOrders();
        orders.push(orderRecord);
        localStorage.setItem('pos_orders', JSON.stringify(orders));

        // If it was a saved order, remove it
        if (this.currentOrder.id) {
            this.deleteSavedOrder(this.currentOrder.id);
        }

        this.clearCart();
        return orderRecord;
    }

    saveCurrentOrder() {
        if (!this.currentOutlet || this.currentOrder.items.length === 0) {
            return false;
        }

        const savedOrder = {
            id: this.currentOrder.id || ('SAV' + Date.now()),
            date: new Date().toISOString(),
            outletId: this.currentOutlet.id,
            type: this.currentOrder.type,
            source: this.currentOrder.source,
            customerName: this.currentOrder.customerName,
            customerPhone: this.currentOrder.customerPhone,
            items: [...this.currentOrder.items],
            total: this.getCartTotal()
        };

        const savedOrders = this.getSavedOrders();
        const index = savedOrders.findIndex(o => o.id === savedOrder.id);
        if (index !== -1) {
            savedOrders[index] = savedOrder;
        } else {
            savedOrders.push(savedOrder);
        }
        
        localStorage.setItem('pos_saved_orders', JSON.stringify(savedOrders));
        this.clearCart();
        return true;
    }

    getSavedOrders() {
        const allSaved = JSON.parse(localStorage.getItem('pos_saved_orders') || '[]');
        if (!this.currentOutlet) return allSaved;
        return allSaved.filter(o => o.outletId === this.currentOutlet.id);
    }

    loadSavedOrder(orderId) {
        const savedOrders = this.getSavedOrders();
        const order = savedOrders.find(o => o.id === orderId);
        if (order) {
            this.currentOrder = {
                id: order.id,
                type: order.type,
                source: order.source,
                customerName: order.customerName,
                customerPhone: order.customerPhone,
                items: [...order.items],
                paymentMode: null
            };
            return true;
        }
        return false;
    }

    deleteSavedOrder(orderId) {
        let savedOrders = JSON.parse(localStorage.getItem('pos_saved_orders') || '[]');
        savedOrders = savedOrders.filter(o => o.id !== orderId);
        localStorage.setItem('pos_saved_orders', JSON.stringify(savedOrders));
    }

    getOrders() {
        return JSON.parse(localStorage.getItem('pos_orders') || '[]');
    }

    getDailyStats() {
        if (!this.currentOutlet) return {};
        const orders = this.getOrders().filter(o => o.outletId === this.currentOutlet.id);

        // Simple filter for today
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(o => o.date.startsWith(today));

        const totalSales = todayOrders.reduce((sum, o) => sum + o.total, 0);
        const cashSales = todayOrders.filter(o => o.paymentMode === 'Cash').reduce((sum, o) => sum + o.total, 0);
        const upiSales = todayOrders.filter(o => o.paymentMode === 'UPI').reduce((sum, o) => sum + o.total, 0);

        return {
            date: today,
            totalOrders: todayOrders.length,
            grossSales: totalSales,
            cashSales: cashSales,
            upiSales: upiSales,
            netSales: totalSales
        };
    }

    saveDayClosing(data) {
        const closings = JSON.parse(localStorage.getItem('pos_closings') || '[]');
        data.date = new Date().toISOString();
        data.outletId = this.currentOutlet.id;
        closings.push(data);
        localStorage.setItem('pos_closings', JSON.stringify(closings));
    }
}
