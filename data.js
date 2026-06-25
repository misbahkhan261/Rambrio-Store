// Rimberio Store — Central Data Layer (PNG Format Fixed)
const initialData = {
    tickerItems: [
        'FREE EXPRESS SHIPPING OVER Rs 5000', 'NEW DROP EVERY 48 HOURS', 
        'CARBON-NEUTRAL DELIVERY', 'MEMBERS-ONLY EARLY ACCESS', 
        '30-DAY EASY RETURNS'
    ],
    categories: [
        { id: 'gadgets', title: 'Gadgets', count: 48, copy: 'Next-gen audio, wearables & desk tech.', img: 'public/bento-gadgets.png' },
        { id: 'fashion', title: 'Cyber-Fashion', count: 132, copy: 'Avant-garde techwear built for the streets.', img: 'public/bento-fashion.png' },
        { id: 'lifestyle', title: 'Lifestyle', count: 76, copy: 'Objects that elevate your everyday space.', img: 'public/bento-lifestyle.png' }
    ],
    products: [
        { 
            id: 'luna-glow-moon', 
            name: 'LUNA GLOW 3D Moon Lamp', 
            price: 2999, 
            compareAt: 4499, 
            tag: 'LIFESTYLE', 
            img1: 'public/moon-lamp-1.png', 
            img2: 'public/moon-lamp-2.png',
            img3: 'public/moon-lamp-3.png',
            img4: 'public/moon-lamp-4.png',
            img5: 'public/moon-lamp-5.png',
            img6: 'public/moon-lamp-6.png'
        },
        {
            id: 'cosmic-crystal-orb', 
            name: 'NEBULA 3D Crystal Ball Orb Light', 
            price: 1299, 
            compareAt: 2499, // Elite marketing trick: -48% OFF automatic badge calculate hoga
            tag: 'LIFESTYLE', 
            img1: 'public/crystal-ball-1.png', 
            img2: 'public/crystal-ball-2.png',
            img3: 'public/crystal-ball-3.png',
            img4: 'public/crystal-ball-4.png'
        },
        {
            id: 'lumos-study-hub', 
            name: 'LED Study Lamp with Pen Holder & Phone Stand | Touch Dimmable Desk Light', 
            price: 2399, 
            compareAt: 3999, // Automatic Pro Max Discount Generation
            tag: 'GADGETS', 
            img1: 'public/study-lamp-1.png', 
            img2: 'public/study-lamp-2.png',
            img3: 'public/study-lamp-3.png'
        },
        { 
            id: 'wild-canopy-feeder', 
            name: 'Waterproof Outdoor Wild Bird Hanging Grains Feeder, Hanging Seed Feeder For Home Garden, Cages, Terrace & Yard Decoration, For Sparrows, Parrots, Doves and Small Birds', 
            price: 1599, 
            compareAt: 2999, 
            tag: 'LIFESTYLE', 
            img1: 'public/bird-feeder-1.png',
            img2: 'public/bird-feeder-2.png',
            img3: 'public/bird-feeder-3.png',
            img4: 'public/bird-feeder-4.png'    
        }
    ],
    testimonials: [
        { handle: '@kai.exe', text: 'Unreal build quality. Feels like wearing the future.' },
        { handle: '@nova_rin', text: 'Shipping was insane fast and the packaging is art.' },
        { handle: '@dr1pcollector', text: 'VOLT Runners are the cleanest sneakers I own. Period.' },
        { handle: '@syntax.zoe', text: 'AURA cans cancel my whole apartment. 11/10.' }
    ]
};