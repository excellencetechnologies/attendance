<?php
    require_once 'c-database.php';
    require_once 'c-jwt.php';

    //comman format for dates = "Y-m-d" eg "04/07/2016"

    class HR extends DATABASE {

        const DEFAULT_WORKING_HOURS = 9;

        private static $SLACK_client_id = '';
        private static $SLACK_client_secret = '';
        private static $SLACK_token = '';
        
        const JWT_SECRET_KEY = 'HR_APP';
        //-------------------------------------
        function __construct(){
            $q = "SELECT * from admin";
            $runQuery = self::DBrunQuery($q );
            $rows = self::DBfetchRows($runQuery);
            foreach( $rows as $p ){
                self::$SLACK_client_id = $p['client_id'];
                self::$SLACK_client_secret = $p['client_secret'];
                self::$SLACK_token = $p['token'];
            }

            //self::getSlackChannelIds();
            //die;
        }
        
        //--start login------------------------------------------------------------
        public static function deleteUserTokens( $userid ){
            $q = "DELETE FROM login_tokens WHERE userid='$userid'";
            self::DBrunQuery($q);
            return true;
        }

        public static function logout( $token ){
            $userInfo = JWT::decode( $token, self::JWT_SECRET_KEY );
            $userInfo = json_decode(json_encode($userInfo), true);
            self::deleteUserTokens( $userInfo['id']);
            $return = array();
            $return['error'] = 0;
            $r_data = array();
            $r_data['message'] = 'Successfully logout';
            $return['data'] = $r_data;
            return $return;
        }

        public static function validateToken( $token ){
            $token = mysql_real_escape_string( $token );
            $q = "select * from login_tokens where token='$token' ";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);
            if( sizeof( $rows ) > 0 ){
                return true;
            }else{
                return false;
            }

        }

        public static function insertToken( $userid, $token ){
            $creation_timestamp = time();
            $creation_date_time = date('d-M-Y H:i:s');
            $ins = array(
                'userid' => $userid,
                'token' => $token,
                'creation_timestamp' => $creation_timestamp,
                'creation_date_time' => $creation_date_time
            );
            self::DBinsertQuery( 'login_tokens', $ins );
            return true;
        }

        public static function login( $username, $password ){
            $r_error = 1;
            $r_message = "";
            $r_data = array();
            $q = "select * from users where username='$username' AND password='$password' AND status='Enabled' ";
            $runQuery = self::DBrunQuery($q);
            $row = self::DBfetchRow($runQuery);

            if( $row == false  ){
                $r_error = 1;
                $r_message = "Invalid Login";
            }else{
                $userid = $row['id'];
                $userInfo = self::getUserInfo( $userid );

                $userProfileImage = '';
                try{
                    $userProfileImage = $userInfo['slack_profile']['profile']['image_192'];
                }catch(Exception $e){
                }
                
                if( $userInfo == false ){
                    $r_message = "Invalid Login";
                }else{
                    $r_error = 0;
                    $r_message = "Success Login";

                    $u = array(
                        "id" => $userInfo['user_Id'],
                        "username" => $userInfo['username'],
                        "role" => $userInfo['type'],
                        "name" =>  $userInfo['name'],
                        "jobtitle" => $userInfo['jobtitle'],
                        "profileImage" => $userProfileImage
                    );

                    $jwtToken = JWT::encode( $u, self::JWT_SECRET_KEY );

                    self::insertToken( $userInfo['user_Id'],  $jwtToken );
                    $r_data = array(
                        "token" => $jwtToken
                    );
                }
            }

            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = $r_message;
            $return['data'] = $r_data;

            return $return;
            
        }
        public static function getUserInfo( $userid ){
            $q = "SELECT users.*,user_profile.* FROM users LEFT JOIN user_profile ON users.id = user_profile.user_Id where users.id = $userid ";
            $runQuery = self::DBrunQuery($q);
            $row = self::DBfetchRow($runQuery);
            //slack info if user
            $userSlackInfo = self::getSlackUserInfo( $row['work_email'] );
            $row['slack_profile'] = $userSlackInfo;
            return $row;
        }

        public static function getEnabledUsersList(){
            $q = "SELECT users.*,user_profile.* FROM users LEFT JOIN user_profile ON users.id = user_profile.user_Id where users.status = 'Enabled' ";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);
            $newRows = array();
            foreach( $rows as $pp ){
                if( $pp['username'] == 'Admin' || $pp['username'] == 'admin' ){

                }else{
                    $pp['slack_profile'] = array();
                    $newRows[] = $pp;
                }
            }
            // slack users 
            $slackUsersList = self::getSlackUsersList();

            if( sizeof( $slackUsersList) >  0 ){
                foreach( $newRows as $key => $pp ){
                    $pp_work_email = $pp['work_email'];
                    foreach( $slackUsersList as $sl ){
                        if( $sl['profile']['email'] == $pp_work_email ){
                            $newRows[$key]['slack_profile'] = $sl['profile'];
                            break;
                        }
                    }
                }
            }

            return $newRows;
        }
       
        public static function getEnabledUsersListWithoutPass(){
            
            $row = self::getEnabledUsersList();
            foreach ($row as $val){
               unset($val['password']);
               $rows[]=$val;
           }
           $return = array();
            $return['error'] = 0;
            $return['data'] = $rows;
            return $return;
        }


        

        //--end login------------------------------------------------------------

        //--start attendance------------------------------------------------------------
        public static function _secondsToTime($seconds){
            // extract hours
            $hours = floor($seconds / (60 * 60));
         
            // extract minutes
            $divisor_for_minutes = $seconds % (60 * 60);
            $minutes = floor($divisor_for_minutes / 60);
         
            // extract the remaining seconds
            $divisor_for_seconds = $divisor_for_minutes % 60;
            $seconds = ceil($divisor_for_seconds);
         
            // return the final array
            $obj = array(
                "h" => (int) $hours,
                "m" => (int) $minutes,
                "s" => (int) $seconds,
            );
            return $obj;
        }

        public static function _beautyDaySummary( $dayRaw){
            $TIMESTAMP = '';
            $numberOfPunch = sizeof( $dayRaw );
            
            $timeStampWise = array();
            foreach( $dayRaw as $pp ){
                $TIMESTAMP = $pp['timestamp'];
                $timeStampWise[$pp['timestamp']] = $pp;
            }
            ksort($timeStampWise);

            $inTimeKey = key($timeStampWise);
            end($timeStampWise);
            $outTimeKey = key($timeStampWise);

            $inTime = date( 'h:i A', $inTimeKey);
            $outTime = date( 'h:i A', $outTimeKey );

            $r_date = (int)date('d', $TIMESTAMP );
            $r_day = date('l', $TIMESTAMP );

            
            $r_total_time = $r_extra_time_status = $r_extra_time = '';

            $r_total_time = (int)$outTimeKey - (int)$inTimeKey;

            $r_extra_time = (int)$r_total_time - (int)( 9 * 60 * 60 ) ;

            if( $r_extra_time < 0 ){ // not completed minimum hours
                $r_extra_time_status = "-";
                $r_extra_time = $r_extra_time * -1;
            }else if( $r_extra_time > 0 ){
                $r_extra_time_status = "+";
            }

            $return = array();
            $return['in_time'] = $inTime;
            $return['out_time'] = $outTime;
            $return['total_time'] = $r_total_time;
            $return['extra_time_status'] = $r_extra_time_status;
            $return['extra_time'] = $r_extra_time;
            
            return $return;
        }
        

        // get generic month days will have date, day, and full date
        public static function getDaysOfMonth( $year, $month ){
            $list = array();
            for($d=1; $d<=31; $d++){
                $time=mktime(12, 0, 0, $month, $d, $year);          
                if (date('m', $time)==$month) {
                    $c_full_date = date('Y-m-d', $time );
                    $c_date = date('d', $time );
                    $c_day = date('l', $time );
                    $row = array(
                        'full_date' => $c_full_date,
                        'date' => $c_date,
                        'day' => $c_day
                    );
                    $list[ $c_date ] = $row;
                }
            }
            return $list;
        }
        // get month holidays list
        public static function getHolidaysOfMonth( $year, $month ){
            $q = "SELECT * FROM holidays";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);
            $list = array();
            foreach( $rows as $pp ){
                $h_date = $pp['date'];
                $h_month = date('m',strtotime($h_date));
                $h_year = date('Y',strtotime($h_date));
                if( $h_year == $year && $h_month == $month ){
                    $h_full_date = date( "Y-m-d", strtotime( $h_date ) );
                    $h_date = date( "d", strtotime( $h_date ) );
                    $pp['date'] = $h_date;
                    $list[$h_date] = $pp;
                }
            }
            return $list;
        }
        // get weekends off list
        public static function getWeekendsOfMonth( $year, $month ){
            $list = array();
            $monthDays = self::getDaysOfMonth( $year, $month );
            $alternateSaturdayCheck = false;
            foreach( $monthDays as $k => $v ){
                if( $v['day'] == 'Sunday' ){
                    $list[$k] = $v;
                }
                if( $v['day'] == 'Saturday' ){
                    if( $alternateSaturdayCheck == true ){
                        $list[$k] = $v;       
                        $alternateSaturdayCheck = false;
                    }else{
                        $alternateSaturdayCheck = true;
                    }
                }
            }
            return $list;
        }
        
        public static function getMonthTotalWorkingHours( $month ){

        }

        ///------working hours
        public static function getWorkingHoursSummary( $year, $month ){  //API CALL FUNCTION
            $workingHoursSummary = self::getGenericMonthSummary( $year, $month );

            $aa = array();
            foreach( $workingHoursSummary as $p ){
                $aa[] = $p;
            }


            $nextMonth = self::_getNextMonth( $year, $month );
            $previousMonth = self::_getPreviousMonth( $year, $month );
            $currentMonth = self::_getCurrentMonth( $year, $month );



            $r_data['year'] = $year;
            $r_data['month'] = $month;
            $r_data['monthName'] = $currentMonth['monthName'];
            $r_data['monthSummary'] = $monthSummary;
            $r_data['nextMonth'] = $nextMonth;
            $r_data['previousMonth'] = $previousMonth;
            $r_data['monthSummary'] = $aa;

            $r_error = 0;
            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = '';
            $return['data'] = $r_data;

            return $return;
        }

        public static function updateDayWorkingHours( $date, $time ){  //API CALL FUNCTION
            //date = Y-m-d
            $q = "SELECT * FROM working_hours WHERE `date`='$date'";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);

            echo $q.'<br>';
            echo '<pre>';
            print_r( $row );

            $message = "";

            if( is_array($rows) && sizeof( $rows ) > 0 ){
                $q = "UPDATE working_hours set working_hours='$time' WHERE `date` = '$date' ";
                self::DBrunQuery($q);
                $message = "Success Update";
            }else{
                $q = "INSERT into working_hours ( working_hours, `date`  ) VALUES ( '$time', '$date' )";
                self::DBrunQuery($q);
                $message = "Success Insert";
            }
            $r_error = 0;
            $return = array();
            $r_data = array();
            $return['error'] = $r_error;
            $r_data['message'] = $message;
            $return['data'] = $r_data;
            return $return;
        }

        // add keys required for a day summary
        public static function _addRequiredKeysForADay( $days ){
            $return = array();
            foreach( $days  as $k => $day ){
                $day['day_type'] = 'WORKING_DAY';
                $day['day_text'] = '';
                $day['in_time'] = '';
                $day['out_time'] = '';
                $day['total_time'] = '';
                $day['extra_time'] = '';
                $day['text'] = '';
                $day['admin_alert'] = '';
                $day['admin_alert_message'] = '';
                $return[$k] = $day;
            }
            return $return;
        }


        public static function getGenericMonthSummary( $year, $month ){
            $daysOfMonth = self::getDaysOfMonth( $year, $month );

            //add default working hours
            foreach( $daysOfMonth as $kk => $pp ){
                $daysOfMonth[$kk]['office_working_hours'] = self::DEFAULT_WORKING_HOURS;
            }

            $daysOfMonth = self::_addRequiredKeysForADay( $daysOfMonth );
            $holidaysOfMonth = self::getHolidaysOfMonth( $year, $month );
            $weekendsOfMonth = self::getWeekendsOfMonth( $year, $month );

            if( sizeof( $holidaysOfMonth ) > 0 ){
                foreach( $holidaysOfMonth as $hm_key => $hm ){
                    $daysOfMonth[$hm_key]['day_type'] = 'NON_WORKING_DAY';
                    $daysOfMonth[$hm_key]['day_text'] = $hm['name'];
                }
            }
            if( sizeof( $weekendsOfMonth ) > 0 ){
                foreach( $weekendsOfMonth as $hm_key => $hm ){
                    $daysOfMonth[$hm_key]['day_type'] = 'NON_WORKING_DAY';
                    $daysOfMonth[$hm_key]['day_text'] = 'Weekend Off';
                }
            }
            return $daysOfMonth;
        }

        public static function getUserMonthPunching( $userid, $year, $month ){
            //$userid = '313';
            $list = array();
            $q = "SELECT * FROM attendance Where user_id = $userid";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);
            $allMonthAttendance = array();
            foreach( $rows as $key => $d ){
                $d_timing = $d['timing'];
                $d_timing = str_replace("-", "/", $d_timing);
                $d_full_date = date( "Y-m-d", strtotime( $d_timing ) );
                $d_timestamp = strtotime($d_timing);
                $d_month = date("m", $d_timestamp);
                $d_year = date("Y", $d_timestamp);
                $d_date = date("d", $d_timestamp);
                //$d_date = (int)$d_date;
                if( $d_year == $year && $d_month == $month ){
                    $d['timestamp'] = $d_timestamp;
                    $allMonthAttendance[$d_date][] = $d;
                }
            }

            foreach( $allMonthAttendance as $pp_key =>  $pp ){
                $daySummary = self::_beautyDaySummary( $pp );
                $list[$pp_key] = $daySummary;
            }
            return $list;
        }

        public static function _getDatesBetweenTwoDates( $startDate, $endDate ){
            $return = array($startDate);
            $start = $startDate;
            $i=1;
            if (strtotime($startDate) < strtotime($endDate))
            {
               while (strtotime($start) < strtotime($endDate))
                {
                    $start = date('Y-m-d', strtotime($startDate.'+'.$i.' days'));
                    $return[] = $start;
                    $i++;
                }
            }
            return $return;
        }

        public static function getUserMonthLeaves( $userid, $year, $month ){
            //$userid = '313';
            $list = array();
            $q = "SELECT * FROM leaves Where user_Id = $userid";
            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);
            foreach( $rows as $pp ){
                $pp_start = $pp['from_date'];
                $pp_end = $pp['to_date'];
                $datesBetween = self::_getDatesBetweenTwoDates( $pp_start, $pp_end );

                foreach( $datesBetween as $d ){
                    $h_month = date('m',strtotime($d));
                    $h_year = date('Y',strtotime($d));

                    if( $h_year == $year && $h_month == $month ){
                        $h_full_date = date( "Y-m-d", strtotime( $d ) );
                        $h_date = date( "d", strtotime( $d ) );
                        $list[$h_date] = $pp;
                    }
                }
            }
            ksort( $list );
            ///// remove non working days from leaves
            $monthHolidays = self::getHolidaysOfMonth( $year, $month );
            if( sizeof( $monthHolidays) > 0 ){
                foreach( $monthHolidays as $d => $v ){
                    if( array_key_exists( $d, $list ) ){
                        unset( $list[$d] );
                    }
                }
            }
            return $list;
        }


        public static function getUserMonthAttendace( $userid, $year, $month ){
            $genericMonthDays = self::getGenericMonthSummary( $year, $month );
            $userMonthPunching = self::getUserMonthPunching( $userid, $year, $month );
            $userMonthLeaves = self::getUserMonthLeaves( $userid, $year, $month );
            
            $return = array();
            foreach( $genericMonthDays as $k => $v ){
                if( array_key_exists($k, $userMonthPunching )){
                    $v['in_time'] = $userMonthPunching[$k]['in_time'];
                    $v['out_time'] = $userMonthPunching[$k]['out_time'];
                    $v['total_time'] = $userMonthPunching[$k]['total_time'];
                    $v['extra_time_status'] = $userMonthPunching[$k]['extra_time_status'];
                    $v['extra_time'] = $userMonthPunching[$k]['extra_time'];
                    $return[$k] = $v; 
                }else{
                    $return[$k] = $v; 
                }
            }

            foreach( $return as $k => $v ){

                if( array_key_exists($k, $userMonthLeaves )){
                    $leave_number_of_days = $userMonthLeaves[$k]['no_of_days'];
                    if( $leave_number_of_days < 1 ){ // this means less then 1 day leave like half day
                        $v['day_type'] = 'HALF_DAY';
                        $v['day_text'] = $userMonthLeaves[$k]['reason'];
                    }else{
                        $v['day_type'] = 'LEAVE_DAY';
                        $v['day_text'] = $userMonthLeaves[$k]['reason'];    
                    }
                    $return[$k] = $v; 
                }else{
                    $return[$k] = $v; 
                }
            }

            //--check for admin alert if in/out time missing

            foreach( $return as $k => $r){
                if( $r['day_type'] == 'WORKING_DAY' ){
                    if( $r['in_time'] == '' || $r['out_time'] == '' ){
                        $r['admin_alert'] = 1;
                        $r['admin_alert_message'] = "In/Out Time Missing";
                    }
                    $return[$k] = $r;
                }
            }


            $finalReturn = array();
            foreach( $return as $r ){
                $finalReturn[] = $r;
            }

            

            // echo '<pre>';
            // print_r( $return );


            return $finalReturn;
        }

        public static function _beautyMonthSummary( $monthAttendace ){
            
            $r_actual_working_hours = $r_completed_working_hours = $r_pending_working_hours = 0;

            $WORKING_DAYS = $NON_WORKING_DAYS = $LEAVE_DAYS = $HALF_DAYS = 0;

            $r_actual_working_seconds = $r_completed_working_seconds = $r_pending_working_seconds = 0;
            

            foreach( $monthAttendace as $pp ){
                $day_type = $pp['day_type'];
                if( $day_type == 'WORKING_DAY' ){
                    $WORKING_DAYS++;
                    $r_completed_working_seconds += $pp['total_time'];
                }else if( $day_type == 'NON_WORKING_DAY' ){
                    $NON_WORKING_DAYS++;
                }else if( $day_type == 'LEAVE_DAY' ){
                    $LEAVE_DAYS++;
                }else if( $day_type == 'HALF_DAY' ){
                    $HALF_DAYS++;
                }
            }

            //-----------------------------
            $r_actual_working_seconds = $WORKING_DAYS * 9 * 60 * 60;
            $r_pending_working_seconds = $r_actual_working_seconds - $r_completed_working_seconds;
            //-----------------------------
            $a = self::_secondsToTime( $r_actual_working_seconds );
            $r_actual_working_hours = $a['h'];

            $b = self::_secondsToTime( $r_completed_working_seconds );
            $r_completed_working_hours = $b['h'].' Hrs '.$b['m'].' Mins';

            $c = self::_secondsToTime( $r_pending_working_seconds );
            $r_pending_working_hours = $c['h'].' Hrs '.$c['m'].' Mins';
            //-----------------------------

            $monthSummary = array();
            $monthSummary['actual_working_hours'] = $r_actual_working_hours;
            $monthSummary['completed_working_hours'] = $r_completed_working_hours;
            $monthSummary['pending_working_hours'] = $r_pending_working_hours;
            $monthSummary['WORKING_DAY'] = $WORKING_DAYS;
            $monthSummary['NON_WORKING_DAY'] = $NON_WORKING_DAYS;
            $monthSummary['LEAVE_DAY'] = $LEAVE_DAYS;
            $monthSummary['HALF_DAY'] = $HALF_DAYS;
            $monthSummary['admin_alert'] = '';
            $monthSummary['admin_alert_message'] = '';

            return $monthSummary;

        }

        public static function _beautyMonthAttendance( $monthAttendance ){
            foreach( $monthAttendance as $key => $mp ){
                //check for future working day
                if( isset($mp['day_type']) && $mp['day_type'] == 'WORKING_DAY' ){
                    $currentTimeStamp =  time();
                    $mp_timeStamp = strtotime( $mp['full_date'] );
                    if( (int)$mp_timeStamp > (int)$currentTimeStamp ){

                        $monthAttendance[$key]['day_type'] = "FUTURE_WORKING_DAY";
                        
                    }
                }
                // convert total working time to readable format
                if( isset($mp['total_time']) && !empty($mp['total_time']) ){
                    $aa = self::_secondsToTime( $mp['total_time']);
                    $monthAttendance[$key]['total_time'] = $aa['h'].'h : '.$aa['m'].'m :'.$aa['s'].'s';
                }
                //convert extra time to readable format
                if( isset($mp['extra_time']) && !empty($mp['extra_time']) ){

                    $bb = self::_secondsToTime( $mp['extra_time']);
                    $monthAttendance[$key]['extra_time'] = $bb['h'].'h : '.$bb['m'].'m :'.$bb['s'].'s';
                }

            }
            return $monthAttendance;
        }

        public static function _getCurrentMonth( $year, $month ){
            $currentMonthDate = date('Y-m-d', strtotime("$year-$month-01") );
            $currentMonth = array();
            $currentMonth['year'] = date('Y', strtotime($currentMonthDate) );
            $currentMonth['month'] = date('m', strtotime($currentMonthDate) );
            $currentMonth['monthName'] = date('F', strtotime($currentMonthDate) );
            return $currentMonth;
        }


        public static function _getNextMonth( $year, $month ){
            $nextMonthDate = date('Y-m-d', strtotime('+1 month', strtotime("$year-$month-01")));
            $nextMonth = array();
            $nextMonth['year'] = date('Y', strtotime($nextMonthDate) );
            $nextMonth['month'] = date('m', strtotime($nextMonthDate) );
            $nextMonth['monthName'] = date('F', strtotime($nextMonthDate) );
            return $nextMonth;
        }

        public static function _getPreviousMonth( $year, $month ){
            $previousMonthDate = date('Y-m-d', strtotime('-1 month', strtotime("$year-$month-01")));
            $previousMonth = array();
            $previousMonth['year'] = date('Y', strtotime($previousMonthDate) );
            $previousMonth['month'] = date('m', strtotime($previousMonthDate) );
            $previousMonth['monthName'] = date('F', strtotime($previousMonthDate) );
            return $previousMonth;
        }


        public static function getUserMonthAttendaceComplete( $userid, $year, $month ){

            $r_error = 1;
            $r_message = "";
            $r_data = array();

            $userMonthAttendance = self::getUserMonthAttendace( $userid, $year, $month );
            $monthSummary = self::_beautyMonthSummary( $userMonthAttendance );

            $beautyMonthAttendance = self::_beautyMonthAttendance( $userMonthAttendance);

            $nextMonth = self::_getNextMonth( $year, $month );
            $previousMonth = self::_getPreviousMonth( $year, $month );
            $currentMonth = self::_getCurrentMonth( $year, $month );

            //----user details -----
            $userDetails = self::getUserInfo( $userid );
            unset( $userDetails['password'] );
            
            ///////////
            $r_data['userProfileImage'] = $userDetails['slack_profile']['profile']['image_192'];
            $r_data['userName'] = $userDetails['name'];
            $r_data['userjobtitle'] = $userDetails['jobtitle'];
            $r_data['userid'] = $userid;
            $r_data['year'] = $year;
            $r_data['month'] = $month;
            $r_data['monthName'] = $currentMonth['monthName'];
            $r_data['monthSummary'] = $monthSummary;
            $r_data['nextMonth'] = $nextMonth;
            $r_data['previousMonth'] = $previousMonth;
            $r_data['attendance'] = $beautyMonthAttendance;

            
            $r_error = 0;
            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = $r_message;
            $return['data'] = $r_data;

            return $return;
        }

        //--end attendance------------------------------------------------------------

        //-start all users attendance summary----------------
        public static function getMonthAttendaceSummary( $year, $month ){

            $r_error = 1;
            $r_message = "";
            $r_data = array();

            $usersAttendance = array();

            $enabledUsersList = self::getEnabledUsersList();
            foreach( $enabledUsersList as $u ){
                $userid = $u['user_Id'];
                $username = $u['username'];
                if( $username == 'admin' || $userid == '' || $username == '' ){
                    continue;
                }

                // if( $userid != 313 && $userid != 288 && $userid != 343 ){
                //     continue;
                // }
                
                $user_month_attendance = self::getUserMonthAttendaceComplete( $userid, $year, $month );

                $user_month_attendance = $user_month_attendance['data'];

                $u_data = array();
                $u_data['name'] = $u['name'];
                $u_data['profileImage'] = '';
                $u_data['jobtitle'] = $u['jobtitle'];
                $u_data['userid'] = $userid;
                $u_data['year'] = $user_month_attendance['year'];
                $u_data['month'] = $user_month_attendance['month'];
                $u_data['monthName'] = $user_month_attendance['monthName'];
                $u_data['monthSummary'] = $user_month_attendance['monthSummary'];
                $u_data['nextMonth'] = $user_month_attendance['nextMonth'];
                $u_data['previousMonth'] = $user_month_attendance['previousMonth'];
                $u_data['attendance'] = $user_month_attendance['attendance'];
                $usersAttendance[] = $u_data;
            }
            //----------
            $nextMonth = self::_getNextMonth( $year, $month );
            $previousMonth = self::_getPreviousMonth( $year, $month );
            $currentMonth = self::_getCurrentMonth( $year, $month );
            //----------

            $r_data['year'] = $year;
            $r_data['month'] = $month;
            $r_data['monthName'] = $currentMonth['monthName'];
            $r_data['nextMonth'] = $nextMonth;
            $r_data['previousMonth'] = $previousMonth;
            $r_data['usersAttendance'] = $usersAttendance;

            $r_error = 0;
            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = $r_message;
            $return['data'] = $r_data;

            return $return;
        }
        //-end all users attendance summary

        //--start-- user day summary
        public static function getUserDayPunchingDetails( $userid, $date ){
            $requested_date = date('d', strtotime($date));
            $requested_month = date('m', strtotime($date));
            $requested_year = date('Y', strtotime($date));
            $requested_month_name = date('F', strtotime($date));
            $requested_day = date('l', strtotime($date));
            
            $userMonthPunching = self::getUserMonthPunching( $userid, $requested_year, $requested_month );

            $r_in_time = $r_out_time = $r_total_time = '';
            $r_extra_time_status = $r_extra_time = '';

            if( array_key_exists( $requested_date, $userMonthPunching) ){
                $dayPunchFound = $userMonthPunching[$requested_date];
                $r_in_time = $dayPunchFound['in_time'];
                $r_out_time = $dayPunchFound['out_time'];
                $r_total_time = $dayPunchFound['total_time'];
                $r_extra_time_status = $dayPunchFound['extra_time_status'];
                $r_extra_time = $dayPunchFound['extra_time'];
            }

            $return = array();
            $return['year'] = $requested_year;
            $return['month'] = $requested_month;
            $return['monthName'] = $requested_month_name;
            $return['date'] = $requested_date;
            $return['day'] = $requested_day;
            $return['in_time'] = $r_in_time;
            $return['out_time'] = $r_out_time;
            $return['total_time'] = $r_total_time;
            $return['extra_time_status'] = $r_extra_time_status;
            $return['extra_time'] = $r_extra_time;

            return $return;

        }
        public static function getUserDaySummary( $userid, $date ){
            $userInfo = self::getUserInfo( $userid );


            //echo '<pre>';
            //print_r( $userInfo );
            //echo $userid.'<br>';
            //echo $date.'<br>';


            $r_error = 1;
            $r_message = "";
            $r_data = array();

            $userDayPunchingDetails = self::getUserDayPunchingDetails( $userid, $date );

            // echo '<pre>';
            // print_r( $userDayPunchingDetails );

            //

            $r_data['name'] = $userInfo['name'];
            $r_data['profileImage'] = '';
            $r_data['userid'] = $userid;
            $r_data['year'] = $userDayPunchingDetails['year'] ;
            $r_data['month'] = $userDayPunchingDetails['month'] ;
            $r_data['monthName'] = $userDayPunchingDetails['monthName'] ;
            $r_data['day'] = $userDayPunchingDetails['day'] ;
            $r_data['entry_time'] = $userDayPunchingDetails['in_time'] ;
            $r_data['exit_time'] = $userDayPunchingDetails['out_time'] ;

            $r_data['total_working'] = '';

            if( !empty($userDayPunchingDetails['total_time']) ){
                $aa = self::_secondsToTime( $userDayPunchingDetails['total_time'] );
                $r_data['total_working'] = $aa['h'].'h : '.$aa['m'].'m :'.$aa['s'].'s';
            }

            

            $r_error = 0;
            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = $r_message;
            $return['data'] = $r_data;

            return $return;
        }
        //--end---- user day summary

        public static function insertUserPunchTime( $user_id, $timing ){
            $q = "INSERT into attendance ( user_id, timing ) VALUES ( $user_id, '$timing')";
            self::DBrunQuery($q);
            return true;
        }

        //----update in hr_data table
        public static function insertUpdateHr_data( $userid, $date, $entry_time, $exit_time ){
            //d-m-Y
            $q = "SELECT * FROM hr_data WHERE user_id = '$userid' AND `date`= '$date' ";

            $runQuery = self::DBrunQuery($q);
            $rows = self::DBfetchRows($runQuery);

            if( sizeof( $rows ) > 0 ){
                //update
                $q = "UPDATE hr_data set entry_time='$entry_time', exit_time='$exit_time' WHERE user_id = '$userid' AND `date` = '$date' ";
                self::DBrunQuery($q);
            }else{
                //insert
                $userInfo = self::getUserInfo( $userid );
                $emailid = $userInfo['work_email'];
                $q = "INSERT into hr_data ( user_id, email, entry_time, exit_time, `date`  ) VALUES ( '$userid', '$emailid', '$entry_time', '$exit_time', '$date' )";
                self::DBrunQuery($q);
            }
            return true;
        }

        //--start insert user in/out punchig time 
        public static function insertUserInOutTimeOfDay( $userid, $date, $inTime, $outTime, $reason ){
            $r_error = 1;
            $r_message = "";
            $r_data = array();

            if( $inTime != '' ){
                $inTime1 = $date .' '.$inTime;    
                $insertInTime = date('m-d-Y h:i:sA', strtotime($inTime1) );
                self::insertUserPunchTime( $userid, $insertInTime );
            }
            if( $outTime != '' ){
                $outTime1 = $date .' '.$outTime;    
                $insertOutTime = date('m-d-Y h:i:sA', strtotime($outTime1) );
                self::insertUserPunchTime( $userid, $insertOutTime );
            }

            //new modification ofr hr_data table
            if( $inTime != '' && $outTime  != '' ){
                $h_date = date('d-m-Y', strtotime( $date ) );
                self::insertUpdateHr_data( $userid, $h_date, $inTime, $outTime );

                ////send  slack message to user
                $userInfo = self::getUserInfo( $userid );
                $userInfo_name = $userInfo['name'];
                $slack_userChannelid = $userInfo['slack_profile']['slack_channel_id'];

                $message = "Hey $userInfo_name !!  \n Your timings is updated for date $h_date as below : \n Entry Time - $inTime \n Exit Time - $outTime \n Reason - $reason";
                $slackMessageStatus = self::sendSlackMessageToUser( $slack_userChannelid, $message );
            }
            
            $r_error = 0;
            $return = array();
            $return['error'] = $r_error;
            $r_data['message'] = $r_message;
            $return['data'] = $r_data;

            return $return;
        }
        //--end insert user in/out punchig time 
        public static function getHtml( $url ){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }


        ///----slacks fns

        public static function sendSlackMessageToUser( $channelid,  $message ){
            $return = false;
            $message = '[{"text": "'. $message.'", "fallback": "Message Send to Employee", "color": "#36a64f "}]';
            $message = str_replace("", "%20", $message);
            $url = "https://slack.com/api/chat.postMessage?token=".self::$SLACK_token."&attachments=" . urlencode($message) . "&channel=" . $channelid;
            
            $html = self::getHtml( $url );
            if ($html === false) {

            }else{
                $fresult = json_decode( $html, true);
                if( is_array($fresult) &&  isset( $fresult['ok'] )){
                    $return = true;
                }
            }

            return $return;
        }

        public static function getSlackChannelIds( ){
            $return = array();
            $url = "https://slack.com/api/im.list?token=" . self::$SLACK_token;
            $html = self::getHtml( $url );
            if ($html === false) {
                
            } else {
                $fresult = json_decode( $html, true);
                if( isset( $fresult['ims']) && sizeof( $fresult['ims'] ) > 0 ){
                    foreach( $fresult['ims'] as $pp ){
                        $return[] = $pp;
                    }    
                }
            }
            return $return;
        }

        public static function getSlackUserInfo( $emailid ){


            $return = false;
            $allSlackUsers = self::getSlackUsersList();
            if( sizeof( $allSlackUsers) >  0 ){
                foreach( $allSlackUsers as $sl ){
                    if( $sl['profile']['email'] == $emailid ){
                        $return = $sl;
                        break;
                    }
                    
                }
            }
            return $return;
        }

         public static function getSlackUsersList() {
            $return = array();
            
            $slackChannelIdsLists = self::getSlackChannelIds();
            
            $url = "https://slack.com/api/users.list?client_id=" . self::$SLACK_client_id . "&token=" . self::$SLACK_token . "&client_secret=" . self::$SLACK_client_secret ;

            $html = self::getHtml( $url );
            if ($html === false) {
                //echo 'Curl error: ' . curl_error($ch);
            } else {
                $fresult = json_decode( $html, true);
            }
            if( $fresult ){
                if( isset( $fresult['members']) && sizeof( $fresult['members'] ) > 0 ){
                    foreach( $fresult['members'] as $pp ){
                        $slack_channel_id_info = array();
                        $slack_channel_id = '';

                        foreach( $slackChannelIdsLists as $chid ){
                            if( $pp['id'] == $chid['user'] ){
                                $slack_channel_id = $chid['id'];
                                $slack_channel_id_info = $chid;
                                break;
                            }
                        }

                        //added for channedl details 
                        $pp['slack_channel_id_info'] = $slack_channel_id_info;
                        $pp['slack_channel_id'] = $slack_channel_id;
                        $return[] = $pp;
                    }    
                }
            }
            return $return;
        }


    }

    new HR();
?>