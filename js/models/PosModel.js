class PosModel {
    constructor() {
        this.outlets = [
            { id: 'quickies', name: 'Quickies', active: true },
            { id: 'okr', name: 'OKR', active: false }
        ];

        this.menu = [
            // Value Combos
            { id: 'vc1', name: 'Snack & Sip Combo', price: 129, category: 'Value Combos' },
            { id: 'vc2', name: 'Cheesy Hunger Combo', price: 199, category: 'Value Combos' },
            { id: 'vc3', name: 'Sweet Treat Combo', price: 249, category: 'Value Combos' },
            { id: 'vc4', name: 'Mini Party Combo', price: 299, category: 'Value Combos' },
            // Desserts
            { id: 'd1', name: 'Molten Bliss Brownie', price: 200, category: 'Desserts' },
            // Waffles
            { id: 'w1', name: 'Cocoa Dream Waffle', price: 150, category: 'Waffles' },
            { id: 'w2', name: 'Cookies & Cream Crunch', price: 160, category: 'Waffles' },
            { id: 'w3', name: 'KitKat Choco Crave', price: 160, category: 'Waffles' },
            // Milkshakes
            { id: 'm1', name: 'Velvet Vanilla Shake', price: 80, category: 'Milkshakes' },
            { id: 'm2', name: 'Midnight Chocolate Shake', price: 90, category: 'Milkshakes' },
            { id: 'm3', name: 'Strawberry Swirl Shake', price: 100, category: 'Milkshakes' },
            { id: 'm4', name: 'Mango Magic Shake', price: 130, category: 'Milkshakes' },
            { id: 'm5', name: 'Royal Rajwadi Shake', price: 140, category: 'Milkshakes' },
            // Beverages
            { id: 'b1', name: 'Zesty Fresh Lime', price: 40, category: 'Beverages' },
            { id: 'b2', name: 'Sparkling Lime Soda', price: 50, category: 'Beverages' },
            { id: 'b3', name: 'Sunrise Orange Juice', price: 60, category: 'Beverages' },
            { id: 'b4', name: 'Orange Pop Soda', price: 70, category: 'Beverages' },
            // Sandwiches & Toasts
            { id: 's1', name: 'Golden Butter Toast', price: 50, category: 'Sandwiches & Toasts' },
            { id: 's2', name: 'Classic Comfort Sandwich', price: 80, category: 'Sandwiches & Toasts' },
            { id: 's3', name: 'Grill Melt Veggie', price: 120, category: 'Sandwiches & Toasts' },
            { id: 's4', name: 'Cheesy Veggie Grill', price: 140, category: 'Sandwiches & Toasts' },
            { id: 's5', name: 'Triple Layer Cheese Club', price: 160, category: 'Sandwiches & Toasts' },
            // Mini Pizzas
            { id: 'p1', name: 'Mini Margherita Delight', price: 90, category: 'Mini Pizzas' },
            { id: 'p2', name: 'Garden Fresh Toppings', price: 100, category: 'Mini Pizzas' },
            { id: 'p3', name: 'Veggie Classic Bite', price: 110, category: 'Mini Pizzas' },
            // Fries
            { id: 'f1', name: 'Simply Salted Fries', price: 50, category: 'Fries' },
            { id: 'f2', name: 'Peri Peri Fire Fries', price: 60, category: 'Fries' },
            { id: 'f3', name: 'Peppery Crunch Fries', price: 70, category: 'Fries' },
            { id: 'f4', name: 'Cheese Mayo Loaded Fries', price: 80, category: 'Fries' },
            { id: 'f5', name: 'Honey Chilli Lemon Fries', price: 90, category: 'Fries' },
            // Potato Wedges
            { id: 'pw1', name: 'Peri Peri Wedges', price: 80, category: 'Potato Wedges' },
            { id: 'pw2', name: 'Pepper Salt Wedges', price: 90, category: 'Potato Wedges' },
            { id: 'pw3', name: 'Honey Chilli Lemon Wedges', price: 100, category: 'Potato Wedges' }
        ];

        this.currentOutlet = null;
        this.currentOrder = {
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
            id: 'ORD' + Date.now(),
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

        this.clearCart();
        return orderRecord;
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
