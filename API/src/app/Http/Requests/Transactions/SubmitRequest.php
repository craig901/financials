<?php namespace App\Http\Requests\Transactions;

use Illuminate\Foundation\Http\FormRequest;

class SubmitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'request.category' => 'required',
            'request.date' => 'required',
            'request.description' => 'required',
            'request.type' => 'required',
            'request.value' => 'required'
        ];
    }
}
