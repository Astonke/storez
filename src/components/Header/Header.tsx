import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Header({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange
}: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full">
            <SearchBar value={searchTerm} onChange={onSearchChange} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
            <Link
              to="/admin"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}