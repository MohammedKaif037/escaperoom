import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  canCombine?: boolean;
  combinesWith?: string[];
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string) => void;
  hasItem: (itemId: string) => boolean;
  combineItems: (item1Id: string, item2Id: string) => InventoryItem | null;
  selectedItem: InventoryItem | null;
  setSelectedItem: (item: InventoryItem | null) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const addItem = (item: InventoryItem) => {
    if (!hasItem(item.id)) {
      setItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  const hasItem = (itemId: string) => {
    return items.some((item) => item.id === itemId);
  };

  const combineItems = (item1Id: string, item2Id: string): InventoryItem | null => {
    const item1 = items.find((item) => item.id === item1Id);
    const item2 = items.find((item) => item.id === item2Id);

    if (!item1 || !item2) return null;
    if (!item1.canCombine || !item2.canCombine) return null;
    if (!item1.combinesWith?.includes(item2Id) && !item2.combinesWith?.includes(item1Id)) return null;

    // Define combinations in gameData.ts and import them here
    // This is a placeholder for demonstration
    const combinedItem: InventoryItem = {
      id: `${item1Id}_${item2Id}`,
      name: `Combined ${item1.name} and ${item2.name}`,
      description: `A combination of ${item1.name} and ${item2.name}`,
      canCombine: false,
    };

    // Remove the original items
    removeItem(item1Id);
    removeItem(item2Id);

    // Add the new combined item
    addItem(combinedItem);

    return combinedItem;
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        hasItem,
        combineItems,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};