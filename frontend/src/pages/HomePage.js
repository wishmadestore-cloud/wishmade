// Hero content for animation
const heroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: 'Redefine Your Style',
        subtitle: 'Discover the latest trends in fashion with our premium collection.'
    },
    {
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: 'Exclusive Offers',
        subtitle: 'Get up to 50% off on new arrivals this week.'
    },
    {
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: 'For Her, For Him',
        subtitle: 'Curated collections for every occasion.'
    }
];

const HomePage = ({ addToCart }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError("Unable to load products. Please ensure the backend is running.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = products;

        if (genderFilter !== 'All') {
            result = result.filter(p => p.gender === genderFilter);
        }

        if (categoryFilter !== 'All') {
            result = result.filter(p => p.subCategory === categoryFilter);
        }

        setFilteredProducts(result);
    }, [genderFilter, categoryFilter, products]);

    // Get unique categories for filter buttons
    const categories = ['All', ...new Set(products.map(p => p.subCategory))];

    if (loading) return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading curated items...</div>;
    if (error) return <div className="container" style={{ padding: '50px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div>
            {/* Animated Hero Section */}
            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroSlides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                transition: 'background-image 1s ease-in-out',
                position: 'relative'
            }}>
                <div style={{ zIndex: 2, padding: '20px' }}>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {heroSlides[currentSlide].title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 24px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {heroSlides[currentSlide].subtitle}
                    </p>
                    <a href="#shop" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                        Shop Now
                    </a>
                </div>

                {/* Slide Indicators */}
                <div style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '10px' }}>
                    {heroSlides.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Filters Section */}
            <div id="shop" className="container" style={{ padding: '40px 20px 20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                    {/* Gender Tabs */}
                    <div style={{ display: 'flex', gap: '10px', background: '#f5f5f5', padding: '5px', borderRadius: '30px' }}>
                        {['All', 'Men', 'Women'].map(gender => (
                            <button
                                key={gender}
                                onClick={() => setGenderFilter(gender)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '25px',
                                    border: 'none',
                                    backgroundColor: genderFilter === gender ? '#2a5298' : 'transparent',
                                    color: genderFilter === gender ? 'white' : '#666',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>

                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid #ddd',
                                    backgroundColor: categoryFilter === cat ? '#333' : 'white',
                                    color: categoryFilter === cat ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#333' }}>
                        {genderFilter === 'All' ? 'Latest Arrivals' : `${genderFilter}'s Collection`}
                    </h2>
                    <span style={{ color: '#666' }}>{filteredProducts.length} Items</span>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
                        <h3>No items match your selection.</h3>
                        <p>Try adjusting the filters.</p>
                        <button
                            onClick={() => { setGenderFilter('All'); setCategoryFilter('All'); }}
                            style={{ marginTop: '15px', color: '#2a5298', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-4">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
