import { useState } from 'react';
import { InventoryItem } from '../contexts/InventoryContext';

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const addItem = (item: InventoryItem) => {
    if (!inventory.some((i) => i.id === item.id)) {
      setInventory((prev) => [...prev, item]);
    }
  };

  const removeItem = (itemId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  const selectItem = (item: InventoryItem | null) => {
    setSelectedItem(item);
  };

  const hasItem = (itemId: string): boolean => {
    return inventory.some((item) => item.id === itemId);
  };

  return {
    inventory,
    selectedItem,
    addItem,
    removeItem,
    selectItem,
    hasItem,
  };
};