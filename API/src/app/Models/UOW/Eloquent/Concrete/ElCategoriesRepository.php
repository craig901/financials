<?php namespace App\Models\UOW\Eloquent\Concrete;

use App\Models\Objects\Entities\Category;
use App\Models\UOW\Eloquent\Contracts\IElCategoriesRepository;
use \Illuminate\Database\Eloquent\Collection;

class ElCategoriesRepository implements IElCategoriesRepository
{
    /**
     * @return Category[]|Collection
     */
    public function getAll(): Collection
    {
        return Category::all();
    }
}
