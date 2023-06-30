import { useState, useEffect } from 'react';
import Body from '../components/Body';
import { getCurrentMonth } from '../components/dateFilter';
// import { Item } from '../data/Item';
// import { Category } from '../data/Category';
// import { categories } from '../data/categories';
import { Category, categories } from '../data/categories';
import { Item, items } from '../data/items';
// import Cars from '../components/Cars';
import Breadcrumb from '../components/Breadcrumb';

export default function ListCarPage() {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(() => {
    setFilteredList( filterListByMonth(list, currentMonth) )
  }, [list, currentMonth]);

  return (
    <Body sidebar>
      <Breadcrumb />
      <h2>Controle Financeiro</h2>
      <hr style={{ backgroundColor: 'black', height: '3px', width: '100%', fill-rule: 'evenodd' }} />
    </Body>
  );
}