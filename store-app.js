// Rimberio Store — Core Engine Logic
function storeCore() {
    return {
        cartOpen: false, adminOpen: false, detailOpen: false, searchOpen: false, scrolled: false, menuOpen: false,
        selectedProduct: {}, cart: [], email: '', emailState: 'idle',
        tickerItems: initialData.tickerItems,
        categories: initialData.categories,
        products: initialData.products,
        testimonials: initialData.testimonials,
        newPName: '', newPPrice: '', newPTag: '', newPCompare: '',
        
        // Checkout Fields
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        paymentMethod: 'COD',
        orderState: 'idle', // idle, loading, success, error

        init() { 
            window.addEventListener('scroll', () => { this.scrolled = window.scrollY > 24 }) 
        },
        addToCart(product) {
            let found = this.cart.find(item => item.id === product.id);
            if (found) { found.qty++; } else { this.cart.push({ ...product, qty: 1 }); }
            this.cartOpen = true;
        },
        get cartTotal() { return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0); },
        get cartCount() { return this.cart.reduce((sum, item) => sum + item.qty, 0); },
        submitNewsletter() {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                this.emailState = 'success'; this.email = '';
                setTimeout(() => this.emailState = 'idle', 3000);
            } else { this.emailState = 'error'; }
        },
        addProduct() {
            if(this.newPName && this.newPPrice) {
                this.products.unshift({
                    id: 'custom-' + Date.now(), name: this.newPName, price: parseFloat(this.newPPrice),
                    compareAt: this.newPCompare ? parseFloat(this.newPCompare) : 0,
                    tag: this.newPTag.toUpperCase() || 'GENERAL',
                    img1: 'public/placeholder.svg', img2: 'public/placeholder.svg'
                });
                this.newPName = ''; this.newPPrice = ''; this.newPTag = ''; this.newPCompare = '';
                alert('Ecosystem Synchronized!');
            }
        },
        deleteProduct(id) { this.products = this.products.filter(p => p.id !== id); },

        // Live Order Submit Logic with Railway Connected
        async placeOrder() {
            if (!this.customerName || !this.customerEmail || !this.customerPhone || !this.customerAddress) {
                alert('Please fill all fields!');
                return;
            }
            if (this.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            this.orderState = 'loading';

            const orderData = {
                customer: {
                    name: this.customerName,
                    email: this.customerEmail,
                    phone: this.customerPhone,
                    address: this.customerAddress
                },
                items: this.cart,
                total: this.cartTotal + 399, // Total + Delivery charges
                payment: this.paymentMethod
            };

            try {
                // Connecting to your Live Railway Backend
                const response = await fetch('https://rambrio-store-production.up.railway.app/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    this.orderState = 'success';
                    alert('🎉 Order Placed Successfully!');
                    this.cart = [];
                    this.customerName = '';
                    this.customerEmail = '';
                    this.customerPhone = '';
                    this.customerAddress = '';
                    this.cartOpen = false;
                } else {
                    this.orderState = 'error';
                    alert('❌ Server rejected order. Check console.');
                }
            } catch (error) {
                this.orderState = 'error';
                console.error(error);
                alert('❌ Connection Error! Railway Server is awake but something went wrong.');
            } finally {
                setTimeout(() => this.orderState = 'idle', 5000);
            }
        }
    }
}