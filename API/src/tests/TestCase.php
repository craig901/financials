<?php namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function simpleMock( $class, $method )
    {
        $mock = $this->getMockBuilder( $class )->disableOriginalConstructor()->getMock();
        $mock->expects( $this->once() )->method( $method );
        $this->app->instance( $class, $mock );
    }
}
