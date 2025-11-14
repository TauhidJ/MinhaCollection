/* CONFIG */
const BRAND = 'Minha Collection';
const WHATSAPP = '917415281959'; // use without '+' for wa.me links
const products = [
    { id: 1, title: 'Royal Blue Kurta', filename: 'down.jpg', price: '₹499', description: 'Lightweight cotton kurta with straight cut.', tags: ['casual', 'wedding'] },
    { id: 2, title: 'Pista green Kurta Pajama', filename: 'download.jpg', price: '₹499', description: 'Cotton kurta with tapered pajama — perfect for functions.', tags: ['casual', 'festive', 'wedding'] },
    { id: 3, title: 'Classic White Kurta', filename: 'secondImage.jpg', price: '₹999', description: 'Versatile white kurta for puja and daily wear.', tags: ['casual'] },
    { id: 4, title: 'Maroon Festive Set', filename: 'download.jpg', price: '₹1,890', description: 'Rich maroon kurta with subtle thread work.', tags: ['casual', 'festive', 'wedding'] },
    { id: 5, title: 'Navy Blue Embroidered Kurta', filename: 'down.jpg', price: '₹1,750', description: 'Elegant navy blue kurta with intricate embroidery.', tags: ['casual', 'festive'] },
    { id: 6, title: 'Beige Cotton Kurta Pajama', filename: 'secondImage.jpg', price: '₹1,200', description: 'Comfortable beige cotton kurta with matching pajama.', tags: ['casual'] },
    { id: 7, title: 'Olive Green Kurta Set', filename: 'down.jpg', price: '₹1,650', description: 'Stylish olive green kurta with modern fit.', tags: ['casual', 'festive'] },
    { id: 8, title: 'Black Festive Kurta', filename: 'download.jpg', price: '₹2,100', description: 'Classic black kurta with golden accents for festive occasions.', tags: ['wedding'] },
    { id: 9, title: 'Cream Linen Kurta Pajama', filename: 'secondImage.jpg', price: '₹1,300', description: 'Breathable cream linen kurta with relaxed pajama.', tags: ['casual'] },
    { id: 10, title: 'Rust Orange Kurta Set', filename: 'download.jpg', price: '₹1,800', description: 'Vibrant rust orange kurta with traditional patterns.', tags: ['casual', 'festive'] },
    { id: 11, title: 'Rust Orange Kurta Set', filename: 'down.jpg', price: '₹1,800', description: 'Vibrant rust orange kurta with traditional patterns.', tags: ['casual', 'festive'] },
    { id: 12, title: 'Rust Orange Kurta Set', filename: 'secondImage.jpg', price: '₹1,800', description: 'Vibrant rust orange kurta with traditional patterns.', tags: ['festive'] }
    // add more products here; ensure images are in /images folder
];

/* DOM refs */
const grid = document.getElementById('grid');
const chips = document.getElementById('chipContainer');
const searchInput = document.getElementById('search');
const noResult = document.getElementById('noResult');
const year = document.getElementById('year');
const topWhats = document.getElementById('topWhats');

year.textContent = new Date().getFullYear();
topWhats.href = `https://wa.me/${WHATSAPP}`;

/* tags */
const allTags = Array.from(new Set(products.flatMap(p => p.tags || [])));
const activeTags = new Set();

function createChip(name) {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    b.addEventListener('click', () => {
        if (activeTags.has(name)) activeTags.delete(name); else activeTags.add(name);
        renderChips(); renderGrid();
    });
    return b;
}
function renderChips() {
    chips.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'chip ' + (activeTags.size === 0 ? 'active' : '');
    allBtn.textContent = 'All';
    allBtn.onclick = () => { activeTags.clear(); renderChips(); renderGrid(); };
    chips.appendChild(allBtn);
    allTags.forEach(t => {
        const c = createChip(t);
        if (activeTags.has(t)) c.classList.add('active');
        chips.appendChild(c);
    });
}

function productImage(p) {
    return `images/${p.filename}`;
}

function renderGrid() {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = products.filter(p => {
        const matchesTag = activeTags.size === 0 || p.tags.some(t => activeTags.has(t));
        const text = [p.title, p.description, ...(p.tags || [])].join(' ').toLowerCase();
        const matchesQuery = q === '' || text.includes(q);
        return matchesTag && matchesQuery;
    });

    grid.innerHTML = '';
    if (filtered.length === 0) { noResult.style.display = 'block'; return } else { noResult.style.display = 'none'; }

    filtered.forEach(p => {
        const card = document.createElement('div'); card.className = 'card fade-in';
        const thumb = document.createElement('div'); thumb.className = 'thumb';
        thumb.style.backgroundImage = `url('${productImage(p)}')`;
        thumb.setAttribute('role', 'img'); thumb.setAttribute('aria-label', p.title);

        const info = document.createElement('div'); info.className = 'info';
        const t = document.createElement('div'); t.className = 'p-title'; t.textContent = p.title;
        const d = document.createElement('div'); d.className = 'p-desc'; d.textContent = p.description;
        const bottom = document.createElement('div'); bottom.className = 'p-bottom';
        const price = document.createElement('div'); price.className = 'price'; price.textContent = p.price;
        const btns = document.createElement('div'); btns.className = 'btns';
        const view = document.createElement('button'); view.className = 'btn ghost'; view.textContent = 'View'; view.onclick = () => openModal(p);
        const order = document.createElement('button'); order.className = 'btn order'; order.textContent = 'Order'; order.onclick = () => openModal(p);
        btns.appendChild(view); btns.appendChild(order);
        bottom.appendChild(price); bottom.appendChild(btns);

        info.appendChild(t); info.appendChild(d); info.appendChild(bottom);
        card.appendChild(thumb); card.appendChild(info);
        grid.appendChild(card);
    });
}

/* modal */
const backdrop = document.getElementById('backdrop');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalOrder = document.getElementById('modalOrder');
const modalCopy = document.getElementById('modalCopy');
const closeModal = document.getElementById('closeModal');
let current = null;

function openModal(p) {
    current = p;
    //modalImg.style.backgroundImage = `url('${productImage(p)}')`;
    modalImg.style.backgroundImage = 'none';
    modalImg.style.backgroundImage = `url('${productImage(p)}')`;
    //modalImg.style.backgroundSize = 'cover';
    modalImg.style.backgroundRepeat = 'no-repeat';
    modalImg.style.backgroundPosition = 'center';
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.description;
    modalPrice.textContent = p.price;
    backdrop.style.display = 'flex';
    const text = encodeURIComponent(`Hi Minha Collection, I want to order: ${p.title} (ID:${p.id}) - Price: ${p.price}. Please share size & delivery details.`);
    modalOrder.onclick = () => window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank');
    modalCopy.onclick = () => {
        const link = `${location.origin}${location.pathname}#product-${p.id}`;
        navigator.clipboard?.writeText(link).then(() => alert('Product link copied'));
    };
    window.location.hash = `product-${p.id}`;
}
function hideModal() {
    backdrop.style.display = 'none';
    current = null;
    try { history.replaceState(null, '', location.pathname); } catch (e) { }
}
closeModal.addEventListener('click', hideModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) hideModal(); });

/* deep link */
function checkHash() {
    if (location.hash && location.hash.startsWith('#product-')) {
        const id = location.hash.replace('#product-', '');
        const p = products.find(x => String(x.id) === id);
        if (p) openModal(p);
    }
}

/* search debounce */
let timeout = null;
searchInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(renderGrid, 150);
});

/* init */
(function init() {
    document.title = BRAND + ' — Kurta Pajama';
    renderChips();
    renderGrid();
    checkHash();
})();