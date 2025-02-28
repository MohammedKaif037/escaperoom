import React from 'react';
import { Package } from 'lucide-react';
import { useInventory, InventoryItem } from '../contexts/InventoryContext';

interface InventoryProps {
  className?: string;
}

const Inventory: React.FC<InventoryProps> = ({ className = '' }) => {
  const { items, selectedItem, setSelectedItem } = useInventory();
  
  const handleItemClick = (item: InventoryItem) => {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null); // Deselect if already selected
    } else {
      setSelectedItem(item); // Select the item
    }
  };
  
  return (
    <div className={`bg-gray-100 p-4 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">Inventory</h2>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm italic">Your inventory is empty.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative p-2 bg-white rounded border cursor-pointer transition-all hover:bg-gray-50 ${
                selectedItem?.id === item.id
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-gray-200'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.image ? (
                <div className="w-full h-16 mb-1 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-16 mb-1 bg-gray-200 flex items-center justify-center rounded">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <p className="text-xs font-medium text-center truncate">{item.name}</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedItem && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <h3 className="font-medium text-gray-800">{selectedItem.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;