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
        deleteProduct(id) { this.products = this.products.filter(p => p.id !== id); }
    }
}