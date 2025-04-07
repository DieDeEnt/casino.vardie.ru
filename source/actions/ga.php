<?php

require __DIR__ . '/../../vendor/autoload.php';

putenv("GOOGLE_APPLICATION_CREDENTIALS=" . __DIR__ . '/../../json/saga.json');

use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;

/**
 * TODO(developer): Replace this variable with your Google Analytics 4
 *   property ID before running the sample.
 */
$property_id = '475671861';

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
$client = new BetaAnalyticsDataClient();



// Make an API call.
$request = (new RunReportRequest())
    ->setProperty('properties/' . $property_id)
    ->setDateRanges([
        new DateRange([
            'start_date' => '7daysAgo',
            'end_date' => 'today',
        ]),
    ])
    ->setDimensions([new Dimension([
            'name' => 'year',
        ]),
    ])
    ->setMetrics([new Metric([
            'name' => 'activeUsers',
        ])
    ]);
$response = $client->runReport($request);

// Print results of an API call.
echo 'Report result: ' . PHP_EOL;

foreach ($response->getRows() as $row) {
    print $row->getDimensionValues()[0]->getValue()
        . ' ' . $row->getMetricValues()[0]->getValue() . PHP_EOL;
}

?>
