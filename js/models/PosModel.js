class PosModel {
    constructor() {
        this.outlets = [
            { id: 'quickies', name: 'Quickies', shortName: 'Quickies', active: true, logo: 'logo.jpeg' },
            { id: 'okr', name: 'Om Kheteshwar Restaurant', shortName: 'OKR', active: true, logo: 'Kheteshwar Logo.jpeg' }
        ];

        this.menus = {
            quickies: [
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
                { id: 'p4', name: 'Tandoori Clasic Pizza', price: 110, category: 'Mini Pizzas' },
                { id: 'p4', name: 'Mint Clasic Pizza', price: 120, category: 'Mini Pizzas' },

                // Beverages
                { id: 'b1', name: 'Zesty Fresh Lime', price: 40, category: 'Beverages' },
                { id: 'b2', name: 'Sparkling Lime Soda', price: 50, category: 'Beverages' },
                { id: 'b3', name: 'Orange Pop Soda', price: 70, category: 'Beverages' },
                { id: 'b4', name: 'Mint Mojito', price: 70, category: 'Beverages' },
                { id: 'b5', name: 'Cold Coffee', price: 90, category: 'Beverages' },

                // Sandwiches & Toasts
                { id: 's1', name: 'Golden Butter Toast', price: 50, category: 'Sandwiches & Toasts' },
                { id: 's2', name: 'Clasic Comfort Sandwich', price: 80, category: 'Sandwiches & Toasts' },
                { id: 's3', name: 'Grill Melt Veggies', price: 120, category: 'Sandwiches & Toasts' },
                { id: 's4', name: 'Cheesy Veggies Grilled Sandwich', price: 140, category: 'Sandwiches & Toasts' },
                { id: 's5', name: 'Cheese Club Sandwich', price: 160, category: 'Sandwiches & Toasts' },
                { id: 's6', name: 'Minty Magic Sandwich', price: 140, category: 'Sandwiches & Toasts' },
                { id: 's7', name: 'Tandoori Flames Sandwich', price: 140, category: 'Sandwiches & Toasts' },

                // Potato Wedges
                { id: 'pw1', name: 'Simplly Salted Wedges', price: 70, category: 'Potato Wedges' },
                { id: 'pw2', name: 'Peri Peri Wedges', price: 80, category: 'Potato Wedges' },
                { id: 'pw3', name: 'Cheese Mayo Wedges', price: 100, category: 'Potato Wedges' },
                { id: 'pw4', name: 'Honey Chilly Lemon Wedges', price: 120, category: 'Potato Wedges' },

                // Burgers
                { id: 'br1', name: 'Veg Clasic Burger', price: 80, category: 'Burgers' },
                { id: 'br2', name: 'Tandoori Burger', price: 90, category: 'Burgers' },
                { id: 'br3', name: 'Double Cheese Burger', price: 110, category: 'Burgers' },
                { id: 'br4', name: 'Cheese Pull Burger', price: 120, category: 'Burgers' },
                { id: 'br5', name: 'Minty Magic Burger', price: 130, category: 'Burgers' }
            ],
            okr: [
                // Raita / Curd / Lassi
                { id: 'okr_r1', name: 'Plain curd', price: 30, category: 'Raita / Curd / Lassi' },
                { id: 'okr_r2', name: 'Veg Raita', price: 100, category: 'Raita / Curd / Lassi' },
                { id: 'okr_r3', name: 'Chaas', price: 25, category: 'Raita / Curd / Lassi' },
                { id: 'okr_r4', name: 'Sweet Lassi', price: 80, category: 'Raita / Curd / Lassi' },
                { id: 'okr_r5', name: 'Dryfruit Lassi', price: 100, category: 'Raita / Curd / Lassi' },

                // Punjabi
                { id: 'okr_p1', name: 'Fix Punjabi Thali', price: 190, category: 'Punjabi' },
                { id: 'okr_p2', name: 'Fix Kathiyawadi Thali', price: 180, category: 'Punjabi' },

                // Indian Breads
                { id: 'okr_ib1', name: 'Plain Roti', price: 15, category: 'Indian Breads' },
                { id: 'okr_ib2', name: 'Butter Roti', price: 18, category: 'Indian Breads' },
                { id: 'okr_ib3', name: 'Plain Paratha', price: 50, category: 'Indian Breads' },
                { id: 'okr_ib4', name: 'Butter Paratha', price: 60, category: 'Indian Breads' },
                { id: 'okr_ib5', name: 'Aloo Paratha', price: 80, category: 'Indian Breads' },

                // Soup
                { id: 'okr_s1', name: 'Manchow', price: 125, category: 'Soup' },
                { id: 'okr_s2', name: 'Tomato', price: 110, category: 'Soup' },
                { id: 'okr_s3', name: 'Hot & Sour Soup', price: 120, category: 'Soup' },

                // Starter
                { id: 'okr_st1', name: 'Paneer Chilli', price: 190, category: 'Starter' },

                // Dal
                { id: 'okr_d1', name: 'Fry', price: 100, category: 'Dal' },
                { id: 'okr_d2', name: 'Tadka', price: 120, category: 'Dal' },

                // Rice
                { id: 'okr_ri1', name: 'Steam Rice', price: 90, category: 'Rice' },
                { id: 'okr_ri2', name: 'Jeera Rice', price: 100, category: 'Rice' },
                { id: 'okr_ri3', name: 'Veg Pulav', price: 130, category: 'Rice' },
                { id: 'okr_ri4', name: 'Veg Biryani', price: 140, category: 'Rice' },
                { id: 'okr_ri5', name: 'Hyderabadi Biryani', price: 160, category: 'Rice' },

                // Papad / Salad
                { id: 'okr_ps1', name: 'Roasted', price: 20, category: 'Papad / Salad' },
                { id: 'okr_ps2', name: 'Fry', price: 30, category: 'Papad / Salad' },
                { id: 'okr_ps3', name: 'Masala', price: 50, category: 'Papad / Salad' },
                { id: 'okr_ps4', name: 'Green Salad', price: 50, category: 'Papad / Salad' },

                // Paneer Selections
                { id: 'okr_pan1', name: 'Paneer Tikka Masala', price: 160, category: 'Paneer Selections' },
                { id: 'okr_pan2', name: 'Paneer Tikka Lababdar', price: 170, category: 'Paneer Selections' },
                { id: 'okr_pan3', name: 'Paneer Butter Masala', price: 170, category: 'Paneer Selections' },
                { id: 'okr_pan4', name: 'Kadai Paneer', price: 160, category: 'Paneer Selections' },
                { id: 'okr_pan5', name: 'Paneer Lazeez', price: 165, category: 'Paneer Selections' },
                { id: 'okr_pan6', name: 'Paneer Handi', price: 160, category: 'Paneer Selections' },
                { id: 'okr_pan7', name: 'Paneer Palak', price: 140, category: 'Paneer Selections' },
                { id: 'okr_pan8', name: 'Paneer Hariyali', price: 155, category: 'Paneer Selections' },
                { id: 'okr_pan9', name: 'Paneer Toofani', price: 180, category: 'Paneer Selections' },
                { id: 'okr_pan10', name: 'Paneer Pasanda', price: 190, category: 'Paneer Selections' },
                { id: 'okr_pan11', name: 'Paneer Angara', price: 190, category: 'Paneer Selections' },
                { id: 'okr_pan12', name: 'Paneer Bhurji', price: 190, category: 'Paneer Selections' },
                { id: 'okr_pan13', name: 'Paneer Tawa Mehfil', price: 180, category: 'Paneer Selections' },
                { id: 'okr_pan14', name: 'Shahi Paneer', price: 150, category: 'Paneer Selections' },
                { id: 'okr_pan15', name: 'Paneer Mutter', price: 150, category: 'Paneer Selections' },
                { id: 'okr_pan16', name: 'Kaju Paneer', price: 220, category: 'Paneer Selections' },
                { id: 'okr_pan17', name: 'Kaju Curry', price: 200, category: 'Paneer Selections' },
                { id: 'okr_pan18', name: 'Koya Kaju Sweet', price: 210, category: 'Paneer Selections' },
                { id: 'okr_pan19', name: 'Om Sp. Paneer', price: 220, category: 'Paneer Selections' },

                // South Indian
                { id: 'okr_si1', name: 'Plain Dosa', price: 100, category: 'South Indian' },
                { id: 'okr_si2', name: 'Cheese Plain Dosa', price: 120, category: 'South Indian' },
                { id: 'okr_si3', name: 'Masala Dosa', price: 130, category: 'South Indian' },
                { id: 'okr_si4', name: 'Cheese Masala Dosa', price: 150, category: 'South Indian' },
                { id: 'okr_si5', name: 'Mysore Plain Dosa', price: 120, category: 'South Indian' },
                { id: 'okr_si6', name: 'Cheese Mysore Plain Dosa', price: 140, category: 'South Indian' },
                { id: 'okr_si7', name: 'Mysore Masala Dosa', price: 140, category: 'South Indian' },
                { id: 'okr_si8', name: 'Cheese Mysore Masala Dosa', price: 160, category: 'South Indian' },
                { id: 'okr_si9', name: 'Rava Plain Dosa', price: 120, category: 'South Indian' },
                { id: 'okr_si10', name: 'Rava Masala Dosa', price: 150, category: 'South Indian' },
                { id: 'okr_si11', name: 'Cheese Rava Masala Dosa', price: 170, category: 'South Indian' },
                { id: 'okr_si12', name: 'Mix Veg Uttapam', price: 140, category: 'South Indian' },
                { id: 'okr_si13', name: 'Cheese Mix Veg Uttapam', price: 160, category: 'South Indian' },
                { id: 'okr_si14', name: 'Onion Uttapam', price: 130, category: 'South Indian' },
                { id: 'okr_si15', name: 'Tomato Uttapam', price: 120, category: 'South Indian' },
                { id: 'okr_si16', name: 'Idli Sambhar', price: 80, category: 'South Indian' },

                // Veg. Selections
                { id: 'okr_v1', name: 'Mix Veg', price: 140, category: 'Veg. Selections' },
                { id: 'okr_v2', name: 'Veg Angara', price: 170, category: 'Veg. Selections' },
                { id: 'okr_v3', name: 'Veg Toofani', price: 160, category: 'Veg. Selections' },
                { id: 'okr_v4', name: 'Veg Tawa Masala', price: 160, category: 'Veg. Selections' },
                { id: 'okr_v5', name: 'Veg Shabnam Curry', price: 175, category: 'Veg. Selections' },
                { id: 'okr_v6', name: 'Veg Kadai', price: 150, category: 'Veg. Selections' },
                { id: 'okr_v7', name: 'Veg Handi', price: 155, category: 'Veg. Selections' },
                { id: 'okr_v8', name: 'Veg Kolhapuri', price: 150, category: 'Veg. Selections' },
                { id: 'okr_v9', name: 'Veg Jaipuri', price: 150, category: 'Veg. Selections' },
                { id: 'okr_v10', name: 'Veg Makhanwala', price: 140, category: 'Veg. Selections' },
                { id: 'okr_v11', name: 'Aloo Mutter', price: 130, category: 'Veg. Selections' },
                { id: 'okr_v12', name: 'Chana Masala', price: 110, category: 'Veg. Selections' },
                { id: 'okr_v13', name: 'Jeera Aloo', price: 100, category: 'Veg. Selections' },
                { id: 'okr_v14', name: 'Diwani Handi', price: 150, category: 'Veg. Selections' },
                { id: 'okr_v15', name: 'Mushroom Masala', price: 160, category: 'Veg. Selections' },
                { id: 'okr_v16', name: 'Mushroom Butter Masala', price: 170, category: 'Veg. Selections' },
                { id: 'okr_v17', name: 'Cheese Begam Bahar', price: 185, category: 'Veg. Selections' },
                { id: 'okr_v18', name: 'Cheese Butter Masala', price: 190, category: 'Veg. Selections' },
                { id: 'okr_v19', name: 'Navrathan Korma (Sweet)', price: 180, category: 'Veg. Selections' },
                { id: 'okr_v20', name: 'Dum Aloo (Punjabi)', price: 130, category: 'Veg. Selections' },

                // Gujarati / Kathiyawadi
                { id: 'okr_g1', name: 'Sev Tameta', price: 130, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g2', name: 'Dungari Bataka', price: 120, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g3', name: 'Lasaniya Bataka', price: 130, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g4', name: 'Bhindi Masala', price: 135, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g5', name: 'Ringan Nu Bhartu', price: 150, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g6', name: 'Kaju lasan', price: 180, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g7', name: 'Rajwadi Dhokli', price: 170, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g8', name: 'Masala Khichdi', price: 140, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g9', name: 'Kadi', price: 130, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g10', name: 'Ghee', price: 30, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g11', name: 'Gud', price: 25, category: 'Gujarati / Kathiyawadi' },
                { id: 'okr_g12', name: 'Makhan', price: 35, category: 'Gujarati / Kathiyawadi' }
            ]
        };

        this.menu = [];

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
            this.menu = this.menus[outletId] || [];
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
