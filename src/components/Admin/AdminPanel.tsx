import { Product } from '../../types';
import { ProductForm } from './ProductForm';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
}

export function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: AdminPanelProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <ProductForm
            onSubmit={onAddProduct}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      const updatedProduct = {
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        category: product.category
                      };
                      onUpdateProduct(product.id, updatedProduct);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}