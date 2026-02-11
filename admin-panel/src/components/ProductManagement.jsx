import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../api';

const ProductManagement = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        price: '',
        gender: 'Men',
        subCategory: '',
        description: '',
        image: '',
        sizes: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = currentProduct.image;

            if (imageFile) {
                setUploadingImage(true);
                const uploadData = await uploadImage(imageFile, token);
                imageUrl = uploadData.url;
                setUploadingImage(false);
            }

            const productData = { ...currentProduct, image: imageUrl };

            if (isEditing) {
                await updateProduct(currentProduct.id, productData, token);
            } else {
                await createProduct(productData, token);
            }

            setShowModal(false);
            resetForm();
            loadProducts();
        } catch (error) {
            alert('Failed to save product');
        } finally {
            setLoading(false);
            setUploadingImage(false);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id, token);
                loadProducts();
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const resetForm = () => {
        setCurrentProduct({
            name: '',
            price: '',
            gender: 'Men',
            subCategory: '',
            description: '',
            image: '',
            sizes: []
        });
        setImageFile(null);
        setIsEditing(false);
    };

    return (
        <div className="product-management">
            <div className="section-header">
                <h2>Product Catalog</h2>
                <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    + Add New Product
                </button>
            </div>

            {loading && !showModal ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} style={{ width: '40px', height: '53px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.gender} // {product.subCategory}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(product)}>✏️</button>
                                        <button className="action-btn delete" onClick={() => handleDelete(product.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" name="name" value={currentProduct.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input type="number" name="price" value={currentProduct.price} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={currentProduct.gender} onChange={handleInputChange}>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Sub-Category (e.g. T-Shirt, Jacket)</label>
                                <input type="text" name="subCategory" value={currentProduct.subCategory} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={currentProduct.description} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" onChange={handleFileChange} />
                                {uploadingImage && <small>Uploading to Cloudinary...</small>}
                                {currentProduct.image && !imageFile && <small>Current: {currentProduct.image.substring(0, 30)}...</small>}
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={uploadingImage}>
                                    {isEditing ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
