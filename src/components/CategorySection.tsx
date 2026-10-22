import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0F5132]">
              Explore Organic Food Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pick your favorite unadulterated Bangladeshi & imported gourmet staples
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-[#0F5132] hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group text-left relative rounded-2xl overflow-hidden p-4 border transition-all duration-300 shadow-xs flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'border-[#0F5132] bg-[#0F5132] text-white ring-2 ring-[#0F5132]/30 scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                {/* Background image overlay with gradient */}
                {cat.image && (
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-50 text-[#0F5132]'
                  }`}>
                    Category
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className={`font-bold text-sm font-serif ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#0F5132]'}`}>
                    {cat.name}
                  </h3>
                  <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
