<?php namespace Tests\Functional\app\Http\Controllers;

use App\Models\Objects\Entities\Transaction;
use App\Models\Requests\TransactionSubmitRequest;
use App\Models\ViewModelBuilders\DashboardReportsBuilder;
use App\Models\ViewModelBuilders\SubmitTransactionBuilder;
use App\Models\ViewModelBuilders\TransactionFilterOptionsBuilder;
use App\Models\ViewModelBuilders\TransactionsListBuilder;
use Tests\TestCase;

class TransactionsControllerTest extends TestCase
{
    /**
     * Test the dashboard reports
     *
     * @return void
     */
    public function test_getDashboard()
    {
        $this->simpleMock( DashboardReportsBuilder::class, 'getModel' );
        $response = $this->get('/api/dashboard');
        $response->assertStatus(200);
    }

    /**
     * Test the transactions
     *
     * @return void
     */
    public function test_getTransactions()
    {
        $this->simpleMock( TransactionsListBuilder::class, 'getModel' );
        $response = $this->get('/api/transactions');
        $response->assertStatus(200);
    }

    /**
     * Test the transactions filters
     *
     * @return void
     */
    public function test_getTransactionFilters()
    {
        $this->simpleMock( TransactionFilterOptionsBuilder::class, 'getModel' );
        $response = $this->get('/api/transactions/filters');
        $response->assertStatus(200);
    }

    /**
     * Test the get submit model
     *
     * @return void
     */
    public function test_getSubmit()
    {
        $this->simpleMock( SubmitTransactionBuilder::class, 'getModel' );
        $response = $this->get('/api/transactions/submit');
        $response->assertStatus(200);
        $this->assertTrue( true );
    }

    /**
     * Test the transactions filters
     *
     * @return void
     */
    public function test_postSubmit()
    {
        $transactionMock = $this->getMockBuilder( Transaction::class )->disableOriginalConstructor()->getMock();
        $transactionMock->expects( $this->once() )->method( 'save' )->willReturn( true );

        $mock = $this->getMockBuilder( TransactionSubmitRequest::class )->disableOriginalConstructor()->getMock();
        $mock->expects( $this->once() )->method( 'getTransaction' )->willReturn( $transactionMock );
        $this->app->instance( TransactionSubmitRequest::class, $mock );

        $response = $this->post('/api/transactions/submit');
        $response->assertStatus(200);
    }
}
