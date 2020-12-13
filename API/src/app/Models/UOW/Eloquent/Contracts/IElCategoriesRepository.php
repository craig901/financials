<?php namespace App\Models\UOW\Eloquent\Contracts;

use \Illuminate\Database\Eloquent\Collection;

interface IElCategoriesRepository
{
    /**
     * @return Collection
     */
    function getAll(): Collection;
}
