<?php
error_reporting(0);
ini_set('display_errors', 0);
require_once ("c-salary.php");
$result = array(
    'data' => array(),
    'error' => array(),
);
$request_body = file_get_contents('php://input');
$PARAMS = json_decode($request_body, true );

if (!isset($PARAMS['token'])) {
    $result['error'][] = "Please add token ";
}
if (isset($PARAMS['token']) && $PARAMS['token'] == "") {
    $result['error'][] = "Please insert a valid token ";
}
if (!isset($PARAMS['user_id'])) {
    $result['error'][] = "Please add user_id ";
}
if (isset($PARAMS['user_id']) && $PARAMS['user_id'] == "") {
    $result['error'][] = "Please insert a valid user id ";
}

if (!isset($PARAMS['holding_start_date'])) {
    $result['error'][] = "Please add holding_start_date ";
}
if (isset($PARAMS['holding_start_date']) && $PARAMS['holding_start_date'] == "") {
    $result['error'][] = "Please insert a Holding amount start date";
}
if (!isset($PARAMS['holding_end_date'])) {
    $result['error'][] = "Please add holding_end_date ";
}
if (isset($PARAMS['holding_end_date']) && $PARAMS['holding_end_date'] == "") {
    $result['error'][] = "Please insert a Holding amount end date";
}
if (!isset($PARAMS['holding_amt'])) {
    $result['error'][] = "Please add Holding amount ";
}
if (isset($PARAMS['holding_amt']) && $PARAMS['holding_amt'] == "") {
    $result['error'][] = "Please insert a Holding amount";
}
if (isset($PARAMS['reason']) && $PARAMS['reason'] == "") {
    $result['error'][] = "Please insert a valid reason";
}

if (sizeof($result['error']) <= 0) {
    foreach ($PARAMS as $key => $val) {
        if ($key != 'token' && $key != 'user_id' && $key != 'holding_amt' && $key != 'reason') {
            if (!preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$val)) {
                $result['error'][] = "Please insert a valid $key date";
            }
        }
        if($key == 'holding_amt' || $key == 'user_id'){
           if (!is_numeric($val)) {
                $result['error'][] = "Please insert a valid $key number";
            } 
        }
        
    }
}

if (isset($PARAMS['token']) && $PARAMS['token'] != "") {
    $userid = Salary::getIdUsingToken($PARAMS['token']);
    if ($userid != false) {
        if (sizeof($result['error']) <= 0) {
            $re = Salary::insertHoldingInfo($PARAMS);
            if ($re == "Successfully Inserted into table") {
                $result['data'] = $re;
            } else {
                $result['error'][] = 'Some error occured';
            }
        }
    }
    else {
       $result['error'][] = 'Invalid token'; 
    }
    
}
echo json_encode($result);