class PosModel {
    constructor() {
        this.currentLanguage = localStorage.getItem('pos_language') || 'en';
        this.outlets = [
            { id: 'quickies', name: 'Quickies', shortName: 'Quickies', active: true, logo: 'logo.jpeg' },
            { id: 'okr', name: 'Om Kheteshwar Restaurant', shortName: 'OKR', active: true, logo: 'Kheteshwar Logo.jpeg' }
        ];

        this.menus = {
            quickies: [
                // Mocktails
                { id: 'mk1', name: 'Fresh Lime Soda', price: 60, category: 'Mocktails' },
                { id: 'mk2', name: 'Fresh Orange Soda', price: 70, category: 'Mocktails' },
                { id: 'mk3', name: 'Blue Lagoon', price: 90, category: 'Mocktails' },
                { id: 'mk4', name: 'Mint Mojito', price: 90, category: 'Mocktails' },
                { id: 'mk5', name: 'Extra Addition', price: 40, category: 'Mocktails' },

                // Sandwiches
                { id: 'sw1', name: 'Golden Butter Toast', price: 50, category: 'Sandwiches' },
                { id: 'sw2', name: 'Classic Comfort Sandwich', price: 80, category: 'Sandwiches' },
                { id: 'sw3', name: 'Grill Melt Veggies', price: 120, category: 'Sandwiches' },
                { id: 'sw4', name: 'Cheesy Veggie Grill', price: 140, category: 'Sandwiches' },
                { id: 'sw5', name: 'Cheese Club S/W', price: 160, category: 'Sandwiches' },
                { id: 'sw6', name: 'Extra Topping', price: 40, category: 'Sandwiches' },

                // Potato Wedges
                { id: 'pw1', name: 'Simply Salted Wedges', price: 80, category: 'Potato Wedges' },
                { id: 'pw2', name: 'Peri Peri Wedges', price: 90, category: 'Potato Wedges' },
                { id: 'pw3', name: 'Peppery Crunch Wedges', price: 90, category: 'Potato Wedges' },
                { id: 'pw4', name: 'Cheese Mayo Loaded', price: 120, category: 'Potato Wedges' },
                { id: 'pw5', name: 'Veggie Mayo Loaded', price: 130, category: 'Potato Wedges' },
                { id: 'pw6', name: 'Tandoori Mayo Loaded Wedges', price: 130, category: 'Potato Wedges' },
                { id: 'pw7', name: 'T.I (Thousand Island) Loaded Wedges', price: 130, category: 'Potato Wedges' },
                { id: 'pw8', name: 'Extra Topping', price: 40, category: 'Potato Wedges' },

                // French Fries
                { id: 'ff1', name: 'Simply Salted', price: 50, category: 'French Fries' },
                { id: 'ff2', name: 'Peri Peri Fries', price: 60, category: 'French Fries' },
                { id: 'ff3', name: 'Pepper Crunch', price: 70, category: 'French Fries' },
                { id: 'ff4', name: 'Cheese Mayo Loaded', price: 80, category: 'French Fries' },
                { id: 'ff5', name: 'Veggies Mayo Loaded', price: 100, category: 'French Fries' },
                { id: 'ff6', name: 'Tandoori Mayo Loaded', price: 100, category: 'French Fries' },
                { id: 'ff7', name: 'Thousand Island Loaded', price: 100, category: 'French Fries' },
                { id: 'ff8', name: 'Extra Topping', price: 40, category: 'French Fries' },

                // Burgers
                { id: 'mb1', name: 'Chocolate Muska Bun', price: 60, category: 'Muska Bun' },
                { id: 'mb2', name: 'Fruit Jam Muska Bun', price: 60, category: 'Muska Bun' },
                { id: 'mb3', name: 'Honey Muska Bun', price: 60, category: 'Muska Bun' },


                // Pizza
                { id: 'pz1', name: 'Margherita Pizza', price: 90, category: 'Pizza' },
                { id: 'pz2', name: 'Garden Fresh Pizza', price: 100, category: 'Pizza' },
                { id: 'pz3', name: 'Onion Topping Pizza', price: 100, category: 'Pizza' },
                { id: 'pz4', name: 'Capsicum Topping Pizza', price: 100, category: 'Pizza' },
                { id: 'pz5', name: 'Cherry Tomato Pizza', price: 100, category: 'Pizza' },
                { id: 'pz6', name: 'Tandoori Veggies Pizza', price: 110, category: 'Pizza' },
                { id: 'pz7', name: 'Italiano Pizza', price: 110, category: 'Pizza' },
                { id: 'pz8', name: 'Veggies Classic Bite', price: 120, category: 'Pizza' },
                { id: 'pz9', name: 'Extra Topping', price: 40, category: 'Pizza' },

                // Waffle
                { id: 'wf1', name: 'Kit Kat Waffle', price: 160, category: 'Waffle' },
                { id: 'wf2', name: 'Oreo Waffle', price: 160, category: 'Waffle' },
                { id: 'wf3', name: 'Blueberry Waffle', price: 170, category: 'Waffle' },
                { id: 'wf4', name: 'Double Chocolate Waffle', price: 170, category: 'Waffle' },
                { id: 'wf5', name: 'Chocolate Overload Waffle', price: 170, category: 'Waffle' },
                { id: 'wf6', name: 'Simple Chocolate Waffle', price: 150, category: 'Waffle' },
                { id: 'wf7', name: 'Extra Topping', price: 40, category: 'Waffle' },

                // Milkshakes
                { id: 'ms1', name: 'Vanilla Milkshake', price: 80, category: 'Milkshakes' },
                { id: 'ms2', name: 'Chocolate Milkshake', price: 90, category: 'Milkshakes' },
                { id: 'ms3', name: 'Chocolate Almond Milkshake', price: 140, category: 'Milkshakes' },
                { id: 'ms4', name: 'Kit Kat Milkshake', price: 140, category: 'Milkshakes' },
                { id: 'ms5', name: 'Cookies & Cream Milkshake', price: 120, category: 'Milkshakes' },
                { id: 'ms6', name: 'Kaju Gulkand Milkshake', price: 120, category: 'Milkshakes' },
                { id: 'ms7', name: 'Rajwadi Milkshake', price: 140, category: 'Milkshakes' },
                { id: 'ms8', name: 'Blueberry Milkshake', price: 130, category: 'Milkshakes' },
                { id: 'ms9', name: 'Strawberry Milkshake', price: 100, category: 'Milkshakes' },
                { id: 'ms10', name: 'Mango Milkshake', price: 130, category: 'Milkshakes' },
                { id: 'ms11', name: 'Thandai Milkshake', price: 130, category: 'Milkshakes' },

                // Cold Drinks
                { id: 'cd1', name: 'Water Bottle (10 Rs)', price: 10, category: 'Cold Drinks' },
                { id: 'cd2', name: 'Water Bottle (20 Rs)', price: 20, category: 'Cold Drinks' },
                { id: 'cd3', name: 'Coca Cola', price: 20, category: 'Cold Drinks' },
                { id: 'cd4', name: 'Sprite', price: 20, category: 'Cold Drinks' },
                { id: 'cd5', name: 'Coke Zero', price: 20, category: 'Cold Drinks' },
                { id: 'cd6', name: 'Diet Coke', price: 20, category: 'Cold Drinks' },
                { id: 'cd7', name: 'Red Bull', price: 125, category: 'Cold Drinks' },

                // Coffee
                { id: 'cf1', name: 'Hot Coffee Black', price: 50, category: 'Coffee' },
                { id: 'cf2', name: 'Cappuccino', price: 70, category: 'Coffee' },
                { id: 'cf3', name: 'Latte', price: 70, category: 'Coffee' },
                { id: 'cf4', name: 'Hot Chocolate Coffee', price: 70, category: 'Coffee' },
                { id: 'cf5', name: 'Cold Coffee', price: 100, category: 'Coffee' },
                { id: 'cf6', name: 'Extra Addition', price: 40, category: 'Coffee' },

                // Salad
                { id: 'sd1', name: 'Cottage Cheese-Basil Cream Bomb Salad', price: 120, category: 'Salad' },
                { id: 'sd2', name: 'Guccamoli Salad', price: 150, category: 'Salad' },
                { id: 'sd3', name: 'Greek Salad', price: 120, category: 'Salad' },
                { id: 'sd4', name: 'Mint Tomato Paneer Punch Salad', price: 130, category: 'Salad' },
                { id: 'sd5', name: 'Letuce-Walnut Chrisp Salad', price: 120, category: 'Salad' },
                { id: 'sd6', name: 'Extra Addition', price: 40, category: 'Salad' },

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
            paymentMode: null,
            discount: 0
        };
    }

    getInventory() {
        const inv = JSON.parse(localStorage.getItem('pos_inventory') || '[]');
        if (!this.currentOutlet) return inv;
        return inv.filter(i => i.outletId === this.currentOutlet.id);
    }

    addInventoryItem(name, store) {
        if (!name || !store || !this.currentOutlet) return;
        const inv = JSON.parse(localStorage.getItem('pos_inventory') || '[]');
        inv.push({
            id: 'INV' + Date.now(),
            outletId: this.currentOutlet.id,
            name: name,
            store: store,
            qty: ''
        });
        localStorage.setItem('pos_inventory', JSON.stringify(inv));
    }

    updateInventoryQty(id, qty) {
        const inv = JSON.parse(localStorage.getItem('pos_inventory') || '[]');
        const item = inv.find(i => i.id === id);
        if (item) {
            item.qty = qty;
            localStorage.setItem('pos_inventory', JSON.stringify(inv));
        }
    }

    removeInventoryItem(id) {
        let inv = JSON.parse(localStorage.getItem('pos_inventory') || '[]');
        inv = inv.filter(i => i.id !== id);
        localStorage.setItem('pos_inventory', JSON.stringify(inv));
    }

    setOutlet(outletId) {
        const outlet = this.outlets.find(o => o.id === outletId);
        if (outlet && outlet.active) {
            this.currentOutlet = outlet;
            const baseMenu = this.menus[outletId] || [];
            const customMenuItems = JSON.parse(localStorage.getItem(`pos_custom_menu_${outletId}`) || '[]');
            this.menu = [...baseMenu, ...customMenuItems];
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

    setDiscount(percent) {
        this.currentOrder.discount = percent;
    }

    addToCart(menuItemId) {
        const item = this.menu.find(m => m.id === menuItemId);
        if (!item) return;

        const existing = this.currentOrder.items.find(i => i.item.id === menuItemId);
        if (existing) {
            existing.qty += 1;
            const price = existing.customPrice !== undefined ? existing.customPrice : existing.item.price;
            existing.total = existing.qty * price;
        } else {
            this.currentOrder.items.push({
                item: item,
                qty: 1,
                customPrice: item.price,
                total: item.price
            });
        }
    }

    addCustomItemToCart(name) {
        if (!name || !name.trim()) return;
        const cleanName = name.trim();
        
        // Normalize name: lowercase, trim, and remove all non-alphanumeric characters to handle casing/spacing/formatting
        const normalize = str => str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedNew = normalize(cleanName);
        
        const exists = this.menu.some(item => normalize(item.name) === normalizedNew);
        if (exists) {
            alert("The same item already exists.");
            return;
        }

        const customId = 'custom_' + Date.now();
        const customItem = {
            id: customId,
            name: cleanName,
            price: 0,
            category: 'New Additions'
        };
        
        // Add to active menu list
        this.menu.push(customItem);
        
        // Persist to localStorage for future orders
        if (this.currentOutlet) {
            const outletId = this.currentOutlet.id;
            const customMenuItems = JSON.parse(localStorage.getItem(`pos_custom_menu_${outletId}`) || '[]');
            customMenuItems.push(customItem);
            localStorage.setItem(`pos_custom_menu_${outletId}`, JSON.stringify(customMenuItems));
        }

        this.currentOrder.items.push({
            item: customItem,
            qty: 1,
            customPrice: 0,
            total: 0
        });
    }

    updateCartQty(menuItemId, change) {
        const existingInfo = this.currentOrder.items.findIndex(i => i.item.id === menuItemId);
        if (existingInfo !== -1) {
            const currentItem = this.currentOrder.items[existingInfo];
            currentItem.qty += change;
            if (currentItem.qty <= 0) {
                this.currentOrder.items.splice(existingInfo, 1);
            } else {
                const price = currentItem.customPrice !== undefined ? currentItem.customPrice : currentItem.item.price;
                currentItem.total = currentItem.qty * price;
            }
        }
    }

    updateItemPrice(menuItemId, newPrice) {
        const existingInfo = this.currentOrder.items.find(i => i.item.id === menuItemId);
        if (existingInfo) {
            existingInfo.customPrice = newPrice;
            existingInfo.total = existingInfo.qty * newPrice;
        }

        // Sync the updated price to the menu list so future selections in this session have it
        const menuItem = this.menu.find(m => m.id === menuItemId);
        if (menuItem) {
            menuItem.price = newPrice;
        }

        // If it is a custom item, persist the updated price to localStorage for future orders
        if (this.currentOutlet) {
            const outletId = this.currentOutlet.id;
            const customMenuItems = JSON.parse(localStorage.getItem(`pos_custom_menu_${outletId}`) || '[]');
            const customItem = customMenuItems.find(i => i.id === menuItemId);
            if (customItem) {
                customItem.price = newPrice;
                localStorage.setItem(`pos_custom_menu_${outletId}`, JSON.stringify(customMenuItems));
            }
        }
    }

    getCartTotal() {
        return this.currentOrder.items.reduce((sum, item) => sum + item.total, 0);
    }

    getFinalTotal() {
        const subTotal = this.getCartTotal();
        if (this.currentOrder.discount) {
            return Math.abs(Math.round(subTotal - (subTotal * this.currentOrder.discount / 100)));
        }
        return subTotal;
    }

    clearCart() {
        this.currentOrder = {
            id: null,
            type: null,
            source: null,
            customerName: '',
            customerPhone: '',
            items: [],
            paymentMode: null,
            discount: 0
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
            total: this.getFinalTotal(),
            paymentMode: this.currentOrder.paymentMode || 'Cash',
            discount: this.currentOrder.discount || 0
        };

        const orders = this.getOrders();
        const existingIndex = orders.findIndex(o => o.id === orderRecord.id);
        if (existingIndex !== -1) {
            orders[existingIndex] = orderRecord;
        } else {
            orders.push(orderRecord);
        }
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
            total: this.getCartTotal(),
            discount: this.currentOrder.discount || 0
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
                paymentMode: null,
                discount: order.discount || 0
            };
            return true;
        }
        return false;
    }

    loadPlacedOrder(orderId) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            this.currentOrder = {
                id: order.id,
                type: order.type,
                source: order.source,
                customerName: order.customerName,
                customerPhone: order.customerPhone,
                items: [...order.items],
                paymentMode: order.paymentMode,
                discount: order.discount || 0
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

    getUniqueCustomers() {
        const orders = this.getOrders();
        const customers = [];
        const seen = new Set();

        orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        for (const o of orders) {
            if (o.customerName) {
                const key = `${o.customerName.toLowerCase().trim()}_${o.customerPhone || ''}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    customers.push({ name: o.customerName.trim(), phone: o.customerPhone || '' });
                }
            }
        }
        return customers;
    }

    getSalesStats(period = 'daily', startDate = null, endDate = null) {
        if (!this.currentOutlet) return {};
        const orders = this.getOrders().filter(o => o.outletId === this.currentOutlet.id);

        const now = new Date();
        let targetOrders = [];

        if (period === 'daily') {
            const today = now.toISOString().split('T')[0];
            targetOrders = orders.filter(o => o.date.startsWith(today));
        } else if (period === 'weekly') {
            const past7 = new Date();
            past7.setDate(now.getDate() - 6);
            past7.setHours(0, 0, 0, 0);
            targetOrders = orders.filter(o => new Date(o.date) >= past7);
        } else if (period === 'monthly') {
            const past30 = new Date();
            past30.setDate(now.getDate() - 29);
            past30.setHours(0, 0, 0, 0);
            targetOrders = orders.filter(o => new Date(o.date) >= past30);
        } else if (period === 'custom' && startDate && endDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            targetOrders = orders.filter(o => {
                const d = new Date(o.date);
                return d >= start && d <= end;
            });
        }

        const totalSales = targetOrders.reduce((sum, o) => sum + o.total, 0);
        const cashSales = targetOrders.filter(o => o.paymentMode === 'Cash').reduce((sum, o) => sum + o.total, 0);
        const upiSales = targetOrders.filter(o => o.paymentMode === 'UPI').reduce((sum, o) => sum + o.total, 0);

        // Fetch Expenses for the same period
        const expenses = this.getExpenses(period, startDate, endDate);
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

        return {
            period: period,
            totalOrders: targetOrders.length,
            grossSales: totalSales,
            cashSales: cashSales,
            upiSales: upiSales,
            netSales: totalSales,
            totalExpenses: totalExpenses,
            profitLoss: totalSales - totalExpenses
        };
    }

    addExpense(amount, description) {
        if (!this.currentOutlet) return;
        const expenses = JSON.parse(localStorage.getItem('pos_expenses') || '[]');
        expenses.push({
            id: 'EXP' + Date.now(),
            date: new Date().toISOString(),
            outletId: this.currentOutlet.id,
            amount: parseFloat(amount),
            description: description || 'Daily Expense'
        });
        localStorage.setItem('pos_expenses', JSON.stringify(expenses));
    }

    getExpenses(period = 'daily', startDate = null, endDate = null) {
        if (!this.currentOutlet) return [];
        const allExpenses = JSON.parse(localStorage.getItem('pos_expenses') || '[]');
        const expenses = allExpenses.filter(e => e.outletId === this.currentOutlet.id);

        const now = new Date();
        let targetExpenses = [];

        if (period === 'daily') {
            const today = now.toISOString().split('T')[0];
            targetExpenses = expenses.filter(e => e.date.startsWith(today));
        } else if (period === 'weekly') {
            const past7 = new Date();
            past7.setDate(now.getDate() - 6);
            past7.setHours(0, 0, 0, 0);
            targetExpenses = expenses.filter(e => new Date(e.date) >= past7);
        } else if (period === 'monthly') {
            const past30 = new Date();
            past30.setDate(now.getDate() - 29);
            past30.setHours(0, 0, 0, 0);
            targetExpenses = expenses.filter(e => new Date(e.date) >= past30);
        } else if (period === 'custom' && startDate && endDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            targetExpenses = expenses.filter(e => {
                const d = new Date(e.date);
                return d >= start && d <= end;
            });
        } else {
            targetExpenses = expenses;
        }
        return targetExpenses;
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

    translate(text) {
        if (!text) return text;
        if (this.currentLanguage === 'gu') {
            return this.translations[text] || text;
        }
        return text;
    }

    getRecipe(itemId) {
        return PizzaRecipes[itemId] || null;
    }
}

PosModel.prototype.translations = {
    // Categories
    'Mocktails': 'મોકટેલ્સ',
    'Sandwiches': 'સેન્ડવીચ',
    'Potato Wedges': 'પોટેટો વેજીસ',
    'French Fries': 'ફ્રેન્ચ ફ્રાઈસ',
    'Muska Bun': 'મસ્કા બન',
    'Pizza': 'પિઝા',
    'Waffle': 'વાફલ',
    'Milkshakes': 'મિલ્કશેક',
    'Cold Drinks': 'કોલ્ડ ડ્રિંક્સ',
    'Coffee': 'કોફી',
    'Salad': 'સેલાડ',
    'Raita / Curd / Lassi': 'રાયતું / દહીં / લસ્સી',
    'Punjabi': 'પંજાબી',
    'Indian Breads': 'રોટલી / પરાઠા',
    'Soup': 'સૂપ',
    'Starter': 'સ્ટાર્ટર',
    'Dal': 'દાળ',
    'Rice': 'ભાત',
    'Papad / Salad': 'પાપડ / સેલાડ',
    'Paneer Selections': 'પનીર વાનગીઓ',
    'South Indian': 'સાઉથ ઇન્ડિયન',
    'Veg. Selections': 'શાકાહારી વાનગીઓ',
    'Gujarati / Kathiyawadi': 'ગુજરાતી / કાઠિયાવાડી',
    'New Additions': 'નવા ઉમેરાયેલા',

    // Quickies Menu Items
    'Fresh Lime Soda': 'ફ્રેશ લાઈમ સોડા',
    'Fresh Orange Soda': 'ફ્રેશ ઓરેન્જ સોડા',
    'Blue Lagoon': 'બ્લુ લગૂન',
    'Mint Mojito': 'મીન્ટ મોજીતો',
    'Extra Addition': 'વધારાની ઉમેરણ',
    'Golden Butter Toast': 'ગોલ્ડન બટર ટોસ્ટ',
    'Classic Comfort Sandwich': 'ક્લાસિક કમ્ફર્ટ સેન્ડવીચ',
    'Grill Melt Veggies': 'ગ્રીલ મેલ્ટ વેજીસ',
    'Cheesy Veggie Grill': 'ચીઝી વેજી ગ્રીલ',
    'Cheese Club S/W': 'ચીઝ ક્લબ સેન્ડવીચ',
    'Extra Topping': 'વધારાનું ટોપિંગ',
    'Simply Salted Wedges': 'સીમ્પલી સોલ્ટેડ વેજીસ',
    'Peri Peri Wedges': 'પેરી પેરી વેજીસ',
    'Peppery Crunch Wedges': 'પેપરી ક્રંચ વેજીસ',
    'Cheese Mayo Loaded': 'ચીઝ મેયો લોડેડ',
    'Veggie Mayo Loaded': 'વેજી મેયો લોડેડ',
    'Tandoori Mayo Loaded Wedges': 'તંદૂરી મેયો લોડેડ વેજીસ',
    'T.I (Thousand Island) Loaded Wedges': 'ટી.આઈ લોડેડ વેજીસ',
    'Simply Salted': 'સીમ્પલી સોલ્ટેડ',
    'Peri Peri Fries': 'પેરી પેરી ફ્રાઈસ',
    'Pepper Crunch': 'પેપર ક્રંચ',
    'Veggies Mayo Loaded': 'વેજીસ મેયો લોડેડ',
    'Tandoori Mayo Loaded': 'તંદૂરી મેયો લોડેડ',
    'Thousand Island Loaded': 'થાઉઝન્ડ આઇલેન્ડ લોડેડ',
    'Chocolate Muska Bun': 'ચોકલેટ મસ્કા બન',
    'Fruit Jam Muska Bun': 'ફ્રૂટ જેમ મસ્કા બન',
    'Honey Muska Bun': 'હની મસ્કા બન',
    'Margherita Pizza': 'માર્ગેરિટા પિઝા',
    'Garden Fresh Pizza': 'ગાર્ડન ફ્રેશ પિઝા',
    'Onion Topping Pizza': 'ઓનિયન ટોપિંગ પિઝા',
    'Capsicum Topping Pizza': 'કેપ્સીકમ ટોપિંગ પિઝા',
    'Cherry Tomato Pizza': 'ચેરી ટમેટો પિઝા',
    'Tandoori Veggies Pizza': 'તંદૂરી વેજીસ પિઝા',
    'Italiano Pizza': 'ઇટાલિયાનો પિઝા',
    'Veggies Classic Bite': 'веજીસ ક્લાસિક બાઇટ', // Wait, let's keep it translated
    'Veggies Classic Bite': 'વેજીસ ક્લાસિક બાઇટ',
    
    // Ingredients
    'Pizza Bread': 'પિઝા બ્રેડ',
    'Pizza Sauce': 'પિઝા સોસ',
    'Cheeze liquid': 'લિક્વિડ ચીઝ',
    'Mozzarella cheese': 'મોઝરેલા ચીઝ',
    'Thousand Island': 'થાઉઝન્ડ આઇલેન્ડ સોસ',
    'Pizza Base': 'પિઝા બેઝ',
    'Pizza cheese': 'પિઝા ચીઝ',
    'Tomato, Onion, Capsicum': 'ટમેટા, ડુંગળી, કેપ્સીકમ',
    'Mozzarella (little extra)': 'મોઝરેલા (થોડું વધારે)',
    'Liquid cheese': 'લિક્વિડ ચીઝ',
    '12 Pcs Onion (small)': '૧૨ નંગ ડુંગળી (નાની)',
    '12 Pcs Capsicum (small)': '૧૨ નંગ કેપ્સીકમ (નાનું)',
    'Cherry Tomato': 'ચેરી ટમેટા',
    'Tomato, Onion, Capsicum, Jalapeno': 'ટમેટા, ડુંગળી, કેપ્સીકમ, જલાપેનો',
    'Paneer (optional)': 'પનીર (વૈકલ્પિક)',
    'Tandoori Sauce (20 gms)': 'તંદૂરી સોસ (૨૦ ગ્રામ)',
    'Jalapeno, Black Olives, Red Paprika': 'જલાપેનો, બ્લેક ઓલિવ્સ, રેડ પેપ્રિકા',
    'Baby corn': 'બેબી કોર્ન',
    'Tomato, Capsicum, Onion': 'ટમેટા, કેપ્સીકમ, ડુંગળી',
    'Red Paprika, Black Olives, Jalapeno': 'રેડ પેપ્રિકા, બ્લેક ઓલિવ્સ, જલાપેનો',

    // SOP Steps
    'Take a fresh Pizza Bread base.': 'એક તાજી પિઝા બ્રેડ બેઝ લો.',
    'Spread Pizza Sauce evenly across the base.': 'બેઝ પર પિઝા સોસ સમાન રીતે ફેલાવો.',
    'Drizzle Cheeze liquid over the sauce.': 'સોસ પર લિક્વિડ ચીઝ રેડો.',
    'Generously top with Mozzarella cheese.': 'મોઝરેલા ચીઝ પુષ્કળ પ્રમાણમાં ઉપર ઉમેરો.',
    'Add a finishing drizzle of Thousand Island sauce.': 'છેલ્લે ઉપર થાઉઝન્ડ આઇલેન્ડ સોસ રેડો.',
    'Bake in oven for 2 minutes.': 'ઓવનમાં ૨ મિનિટ માટે બેક કરો.',
    'Cut into slices, plate in 1 minute, and serve hot.': 'ટુકડાઓમાં કાપો, ૧ મિનિટમાં પ્લેટિંગ કરો અને ગરમા-ગરમ સર્વ કરો.',
    'Take a fresh Pizza Base.': 'એક તાજો પિઝા બેઝ લો.',
    'Spread Pizza Sauce evenly.': 'પિઝા સોસ સમાન રીતે ફેલાવો.',
    'Add a layer of Pizza cheese and Mozzarella.': 'પિઝા ચીઝ અને મોઝરેલાનું એક સ્તર બનાવો.',
    'Arrange fresh Tomato, Onion, and Capsicum toppings uniformly.': 'તાજા ટમેટા, ડુંગળી અને કેપ્સીકમના ટોપિંગ્સ એકસરખી રીતે ગોઠવો.',
    'Sprinkle a little extra Mozzarella on top.': 'ઉપર થોડું વધારે મોઝરેલા ચીઝ છાંટો.',
    'Slice, plate in 1 minute, and serve.': 'ટુકડા કરો, ૧ મિનિટમાં પ્લેટિંગ કરો અને સર્વ કરો.',
    'Prepare the fresh Pizza Base.': 'તાજો પિઝા બેઝ તૈયાર કરો.',
    'Layer with liquid cheese and Mozzarella.': 'લિક્વિડ ચીઝ અને મોઝરેલાનું સ્તર બનાવો.',
    'Arrange exactly 12 small pieces of Onion evenly across the pizza slices.': 'પિઝાના ટુકડાઓ પર બરાબર ૧૨ નંગ નાની ડુંગળી સમાન રીતે ગોઠવો.',
    'Top with a little extra Mozzarella.': 'ઉપર થોડું વધારે મોઝરેલા ઉમેરો.',
    'Bake for 2 minutes.': '૨ મિનિટ માટે બેક કરો.',
    'Slice, plate, and serve.': 'ટુકડા કરો, પ્લેટિંગ કરો અને સર્વ કરો.',
    'Arrange exactly 12 small pieces of Capsicum evenly across the pizza.': 'પિઝા પર બરાબર ૧૨ નંગ નાનું કેપ્સીકમ સમાન રીતે ગોઠવો.',
    'Arrange halved Cherry Tomatoes evenly across the pizza.': 'બે ભાગ કરેલા ચેરી ટમેટા પિઝા પર સમાન રીતે ગોઠવો.',
    'Take a fresh Pizza Base and apply Pizza Sauce.': 'તાજો પિઝા બેઝ લો અને પિઝા સોસ લગાવો.',
    'Sprinkle Pizza cheese and Mozzarella.': 'પિઝા ચીઝ અને મોઝરેલા છાંટો.',
    'Weigh/measure 20g of Tandoori Sauce.': '૨૦ ગ્રામ તંદૂરી સોસનું માપ લો.',
    'Mix the veggies (Tomato, Onion, Capsicum, Jalapeno, and optional Paneer) thoroughly in the tandoori sauce.': 'તંદૂરી સોસમાં બધી શાકભાજી (ટમેટા, ડુંગળી, કેપ્સીકમ, જલાપેનો અને વૈકલ્પિક પનીર) બરાબર મિક્સ કરો.',
    'Spread the tandoori-sauced veggies evenly over the cheese layer.': 'તંદૂરી સોસવાળી શાકભાજીને ચીઝના સ્તર પર સમાન રીતે ફેલાવો.',
    'Set Oven Temperature to 200 °C.': 'ઓવનનું તાપમાન ૨૦૦ °સી સેટ કરો.',
    'Bake the pizza for exactly 1 minute and 45 seconds.': 'પિઝાને બરાબર ૧ મિનિટ અને ૪૫ સેકન્ડ માટે બેક કરો.',
    'Slice according to the sample topping distribution diagram, plate, and serve.': 'તોપિંગ વિતરણના નમૂના રેખાચિત્ર મુજબ ટુકડા કરો, પ્લેટિંગ કરો અને સર્વ કરો.',
    'Prepare the fresh Pizza base and spread Pizza Sauce.': 'તાજો પિઝા બેઝ તૈયાર કરો અને પિઝા સોસ ફેલાવો.',
    'Add Pizza cheese and Mozzarella layer.': 'પિઝા ચીઝ અને મોઝરેલાનું સ્તર ઉમેરો.',
    'Distribute toppings: Jalapeno, Black Olives, Red Paprika, and Baby corn slices.': 'ટોપિંગ્સ ગોઠવો: જલાપેનો, બ્લેક ઓલિવ્સ, રેડ પેપ્રિકા અને બેબી કોર્નના ટુકડા.',
    'Add a small sprinkle of Mozzarella cheese on top.': 'ઉપર થોડું મોઝરેલા ચીઝ છાંટો.',
    'Prepare the fresh Pizza Base and apply Pizza Sauce.': 'તાજો પિઝા બેઝ તૈયાર કરો અને પિઝા સોસ લગાવો.',
    'Arrange fresh veggies (Tomato, Capsicum, Onion) evenly.': 'તાજી શાકભાજી (ટમેટા, કેપ્સીકમ, ડુંગળી) સમાન રીતે ગોઠવો.',
    'Arrange specialty toppings (Red Paprika, Black Olives, Jalapeno) evenly.': 'ખાસ ટોપિંગ્સ (રેડ પેપ્રિકા, બ્લેક ઓલિવ્સ, જલાપેનો) સમાન રીતે ગોઠવો.',

    'Kit Kat Waffle': 'કીટ કેટ વાફલ',
    'Oreo Waffle': 'ઓરીયો વાફલ',
    'Blueberry Waffle': 'બ્લુબેરી વાફલ',
    'Double Chocolate Waffle': 'ડબલ ચોકલેટ વાફલ',
    'Chocolate Overload Waffle': 'ચોકલેટ ઓવરલોડ વાફલ',
    'Simple Chocolate Waffle': 'સીમ્પલ ચોકલેટ વાફલ',
    'Vanilla Milkshake': 'веનીલા મિલ્કશેક', // Wait, let's fix Cyrillic 'в' - 'વેનીલા મિલ્કશેક'
    'Vanilla Milkshake': 'વેનીલા મિલ્કશેક',
    'Chocolate Milkshake': 'ચોકલેટ મિલ્કશેક',
    'Chocolate Almond Milkshake': 'ચોકલેટ આલમંડ મિલ્કશેક',
    'Kit Kat Milkshake': 'કીટ કેટ મિલ્કશેક',
    'Cookies & Cream Milkshake': 'કુકીઝ એન્ડ ક્રીમ મિલ્કશેક',
    'Kaju Gulkand Milkshake': 'કાજુ ગુલકંદ મિલ્કશેક',
    'Rajwadi Milkshake': 'રાજવાડી મિલ્કશેક',
    'Blueberry Milkshake': 'બ્લુબેરી મિલ્કશેક',
    'Strawberry Milkshake': 'સ્ટ્રોબેરી મિલ્કશેક',
    'Mango Milkshake': 'મેંગો મિલ્કશેક',
    'Thandai Milkshake': 'ઠંડાઈ મિલ્કશેક',
    'Water Bottle (10 Rs)': 'પાણીની બોટલ (રૂ. ૧૦)',
    'Water Bottle (20 Rs)': 'પાણીની બોટલ (રૂ. ૨૦)',
    'Coca Cola': 'કોકા કોલા',
    'Sprite': 'સ્પ્રેઇટ',
    'Coke Zero': 'કોક ઝીરો',
    'Diet Coke': 'ડાયેટ કોક',
    'Red Bull': 'રેડ બુલ',
    'Hot Coffee Black': 'હોટ કોફી બ્લેક',
    'Cappuccino': 'કેપુચીનો',
    'Latte': 'લેટ્ટે',
    'Hot Chocolate Coffee': 'હોટ ચોકલેટ કોફી',
    'Cold Coffee': 'કોલ્ડ કોફી',
    'Cottage Cheese-Basil Cream Bomb Salad': 'કોટેજ ચીઝ-બેસિલ સેલાડ',
    'Guccamoli Salad': 'ગુઆકામોલી સેલાડ',
    'Greek Salad': 'ગ્રીક સેલાડ',
    'Mint Tomato Paneer Punch Salad': 'મીન્ટ ટોમેટો પનીર સેલાડ',
    'Letuce-Walnut Chrisp Salad': 'લેટસ-વોલનટ સેલાડ',

    // OKR Menu Items
    'Plain curd': 'સાદું દહીં',
    'Veg Raita': 'વેજ રાયતું',
    'Chaas': 'છાશ',
    'Sweet Lassi': 'મીઠી લસ્સી',
    'Dryfruit Lassi': 'ડ્રાયફ્રૂટ લસ્સી',
    'Fix Punjabi Thali': 'ફિક્સ પંજાબી થાળી',
    'Fix Kathiyawadi Thali': 'ફિક્સ કાઠિયાવાડી થાળી',
    'Plain Roti': 'સાદી રોટલી',
    'Butter Roti': 'બટર રોટલી',
    'Plain Paratha': 'સાદો પરાઠો',
    'Butter Paratha': 'બટર પરાઠો',
    'Aloo Paratha': 'આલુ પરાઠો',
    'Manchow': 'મનચાવ સૂપ',
    'Tomato': 'ટોમેટો સૂપ',
    'Hot & Sour Soup': 'હોટ એન્ડ સોર સૂપ',
    'Paneer Chilli': 'પનીર ચીલી',
    'Fry': 'ફ્રાય',
    'Tadka': 'તડકા',
    'Steam Rice': 'સ્ટીમ રાઇસ',
    'Jeera Rice': 'જીરા રાઇસ',
    'Veg Pulav': 'વેજ પુલાવ',
    'Veg Biryani': 'વેજ બિરયાની',
    'Hyderabadi Biryani': 'હૈદરાબાદી બિરયાની',
    'Roasted': 'શેકેલો',
    'Masala': 'મસાલા',
    'Green Salad': 'ગ્રીન સેલાડ',
    'Paneer Tikka Masala': 'પનીર ટીક્કા મસાલા',
    'Paneer Tikka Lababdar': 'પનીર ટીક્કા લબાબદાર',
    'Paneer Butter Masala': 'પનીર બટર મસાલા',
    'Kadai Paneer': 'કડાઈ પનીર',
    'Paneer Lazeez': 'પનીર લઝીઝ',
    'Paneer Handi': 'પનીર હાંડી',
    'Paneer Palak': 'પાલક પનીર',
    'Paneer Hariyali': 'હરિયાળી પનીર',
    'Paneer Toofani': 'પનીર તુફાની',
    'Paneer Pasanda': 'પનીર પસંદા',
    'Paneer Angara': 'પનીર અંગારા',
    'Paneer Bhurji': 'પનીર ભુરજી',
    'Paneer Tawa Mehfil': 'પનીર તવા મહેફિલ',
    'Shahi Paneer': 'શાહી પનીર',
    'Paneer Mutter': 'મટર પનીર',
    'Kaju Paneer': 'કાજુ પનીર',
    'Kaju Curry': 'કાજુ કરી',
    'Koya Kaju Sweet': 'ખોયા કાજુ સ્વીટ',
    'Om Sp. Paneer': 'ઓમ સ્પેશિયલ પનીર',
    'Plain Dosa': 'સાદો ઢોંસા',
    'Cheese Plain Dosa': 'ચીઝ સાદો ઢોંસા',
    'Masala Dosa': 'મસાલા ઢોંસા',
    'Cheese Masala Dosa': 'ચીઝ મસાલા ઢોંસા',
    'Mysore Plain Dosa': 'મૈસુર સાદો ઢોંસા',
    'Cheese Mysore Plain Dosa': 'ચીઝ મૈસુર સાદો ઢોંસા',
    'Mysore Masala Dosa': 'મૈસુર મસાલા ઢોંસા',
    'Cheese Mysore Masala Dosa': 'ચીઝ મૈસુર મસાલા ઢોંસા',
    'Rava Plain Dosa': 'રવા સાદો ઢોંસા',
    'Rava Masala Dosa': 'રવા મસાલા ઢોંસા',
    'Cheese Rava Masala Dosa': 'ચીઝ રવા મસાલા ઢોંસા',
    'Mix Veg Uttapam': 'મિક્સ વેજ ઉત્તપમ',
    'Cheese Mix Veg Uttapam': 'ચીઝ મિક્સ વેજ ઉત્તપમ',
    'Onion Uttapam': 'ડુંગળી ઉત્તપમ',
    'Tomato Uttapam': 'ટોમેટો ઉત્તપમ',
    'Idli Sambhar': 'ઇડલી સંભાર',
    'Mix Veg': 'મિક્સ વેજ',
    'Veg Angara': 'વેજ અંગારા',
    'Veg Toofani': 'વેજ તુફાની',
    'Veg Tawa Masala': 'વેજ તવા મસાલા',
    'Veg Shabnam Curry': 'વેજ શબનમ કરી',
    'Veg Kadai': 'વેજ કડાઈ',
    'Veg Handi': 'વેજ હાંડી',
    'Veg Kolhapuri': 'વેજ કોલ્હાપુરી',
    'Veg Jaipuri': 'વેજ જયપુરી',
    'Veg Makhanwala': 'વેજ મખનવાલા',
    'Aloo Mutter': 'આલુ મટર',
    'Chana Masala': 'ચણા મસાલા',
    'Jeera Aloo': 'જીરા આલુ',
    'Diwani Handi': 'દિવાની હાંડી',
    'Mushroom Masala': 'મશરૂમ મસાલા',
    'Mushroom Butter Masala': 'મશરૂમ બટર મસાલા',
    'Cheese Begam Bahar': 'ચીઝ બેગમ બહાર',
    'Cheese Butter Masala': 'ચીઝ બટર મસાલા',
    'Navrathan Korma (Sweet)': 'નવરત્ન કોર્મા (મીઠું)',
    'Dum Aloo (Punjabi)': 'દમ આલુ (પંજાબી)',
    'Sev Tameta': 'સેવ ટમેટા',
    'Dungari Bataka': 'ડુંગળી બટાકા',
    'Lasaniya Bataka': 'લસણીયા બટાકા',
    'Bhindi Masala': 'ભીંડી મસાલા',
    'Ringan Nu Bhartu': 'રીંગણ નું ભરથું',
    'Kaju lasan': 'કાજુ લસણ',
    'Rajwadi Dhokli': 'રાજવાડી ઢોકળી',
    'Masala Khichdi': 'મસાલા ખીચડી',
    'Kadi': 'કઢી',
    'Ghee': 'ઘી',
    'Gud': 'ગોળ',
    'Makhan': 'માખણ'
};

const PizzaRecipes = {
    'pz1': {
        name: 'Margherita Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min', delivery: '10 Min' },
        ingredients: [
            'Pizza Bread',
            'Pizza Sauce',
            'Cheeze liquid',
            'Mozzarella cheese',
            'Thousand Island'
        ],
        steps: [
            'Take a fresh Pizza Bread base.',
            'Spread Pizza Sauce evenly across the base.',
            'Drizzle Cheeze liquid over the sauce.',
            'Generously top with Mozzarella cheese.',
            'Add a finishing drizzle of Thousand Island sauce.',
            'Bake in oven for 2 minutes.',
            'Cut into slices, plate in 1 minute, and serve hot.'
        ]
    },
    'pz2': {
        name: 'Garden Fresh Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min', delivery: '10 Min' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Pizza cheese',
            'Mozzarella',
            'Tomato, Onion, Capsicum',
            'Mozzarella (little extra)'
        ],
        steps: [
            'Take a fresh Pizza Base.',
            'Spread Pizza Sauce evenly.',
            'Add a layer of Pizza cheese and Mozzarella.',
            'Arrange fresh Tomato, Onion, and Capsicum toppings uniformly.',
            'Sprinkle a little extra Mozzarella on top.',
            'Bake in oven for 2 minutes.',
            'Slice, plate in 1 minute, and serve.'
        ]
    },
    'pz3': {
        name: 'Onion Topping Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min', delivery: '10 Min' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Liquid cheese',
            'Mozzarella',
            '12 Pcs Onion (small)',
            'Mozzarella (little extra)'
        ],
        steps: [
            'Prepare the fresh Pizza Base.',
            'Spread Pizza Sauce evenly.',
            'Layer with liquid cheese and Mozzarella.',
            'Arrange exactly 12 small pieces of Onion evenly across the pizza slices.',
            'Top with a little extra Mozzarella.',
            'Bake for 2 minutes.',
            'Slice, plate, and serve.'
        ]
    },
    'pz4': {
        name: 'Capsicum Topping Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min', delivery: '10 Min' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Liquid cheese',
            'Mozzarella',
            '12 Pcs Capsicum (small)',
            'Mozzarella (little extra)'
        ],
        steps: [
            'Prepare the fresh Pizza Base.',
            'Spread Pizza Sauce evenly.',
            'Layer with liquid cheese and Mozzarella.',
            'Arrange exactly 12 small pieces of Capsicum evenly across the pizza.',
            'Top with a little extra Mozzarella.',
            'Bake for 2 minutes.',
            'Slice, plate, and serve.'
        ]
    },
    'pz5': {
        name: 'Cherry Tomato Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min', delivery: '10 Min' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Liquid cheese',
            'Mozzarella',
            'Cherry Tomato',
            'Mozzarella (little extra)'
        ],
        steps: [
            'Prepare the fresh Pizza Base.',
            'Spread Pizza Sauce evenly.',
            'Layer with liquid cheese and Mozzarella.',
            'Arrange halved Cherry Tomatoes evenly across the pizza.',
            'Top with a little extra Mozzarella.',
            'Bake for 2 minutes.',
            'Slice, plate, and serve.'
        ]
    },
    'pz6': {
        name: 'Tandoori Veggies Pizza',
        time: { prep: '5 Min', baking: '1:45 Min', plating: '1 Min', ovenTemp: '200 °C' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Pizza cheese',
            'Mozzarella',
            'Tomato, Onion, Capsicum, Jalapeno',
            'Paneer (optional)',
            'Tandoori Sauce (20 gms)'
        ],
        steps: [
            'Take a fresh Pizza Base and apply Pizza Sauce.',
            'Sprinkle Pizza cheese and Mozzarella.',
            'Weigh/measure 20g of Tandoori Sauce.',
            'Mix the veggies (Tomato, Onion, Capsicum, Jalapeno, and optional Paneer) thoroughly in the tandoori sauce.',
            'Spread the tandoori-sauced veggies evenly over the cheese layer.',
            'Set Oven Temperature to 200 °C.',
            'Bake the pizza for exactly 1 minute and 45 seconds.',
            'Slice according to the sample topping distribution diagram, plate, and serve.'
        ]
    },
    'pz7': {
        name: 'Italiano Pizza',
        time: { prep: '5 Min', baking: '2 Min', plating: '1 Min' },
        ingredients: [
            'Pizza base',
            'Pizza Sauce',
            'Pizza cheese',
            'Mozzarella',
            'Jalapeno, Black Olives, Red Paprika',
            'Baby corn',
            'Mozzarella (little extra)'
        ],
        steps: [
            'Prepare the fresh Pizza base and spread Pizza Sauce.',
            'Add Pizza cheese and Mozzarella layer.',
            'Distribute toppings: Jalapeno, Black Olives, Red Paprika, and Baby corn slices.',
            'Add a small sprinkle of Mozzarella cheese on top.',
            'Bake in the oven for 2 minutes.',
            'Slice, plate, and serve.'
        ]
    },
    'pz8': {
        name: 'Veggie Classic Bite',
        time: { prep: '8 Min', baking: '2 Min', plating: '1.5 Min' },
        ingredients: [
            'Pizza Base',
            'Pizza Sauce',
            'Pizza cheese',
            'Mozzarella',
            'Tomato, Capsicum, Onion',
            'Red Paprika, Black Olives, Jalapeno'
        ],
        steps: [
            'Prepare the fresh Pizza Base and apply Pizza Sauce.',
            'Layer with Pizza cheese and Mozzarella.',
            'Arrange fresh veggies (Tomato, Capsicum, Onion) evenly.',
            'Arrange specialty toppings (Red Paprika, Black Olives, Jalapeno) evenly.',
            'Bake in the oven for 2 minutes.',
            'Slice, plate, and serve.'
        ]
    }
};


Stop Agent
