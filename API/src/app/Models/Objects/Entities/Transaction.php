<?php namespace App\Models\Objects\Entities;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    /**
     * @var string
     */
    protected $table = 'transactions';

    /**
     * @return BelongsTo
     */
    public function type()
    {
        return $this->belongsTo( TransactionType::class );
    }

    /**
     * @return BelongsTo
     */
    public function category()
    {
        return $this->belongsTo( Category::class );
    }
}
