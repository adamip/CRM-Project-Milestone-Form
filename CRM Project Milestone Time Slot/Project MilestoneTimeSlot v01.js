/*
	Adam Ip															2014-04-07		
		function TimeSlotDateStart_Change()
		
	Adam Ip															2014-04-14	
		function TimeSlot_OnLoad()									
		function TimeSlotExecutorInit()
		
*/

var DebugModeProjectMilestoneTimeSlot = false;
//	var DebugModeProjectMilestoneTimeSlot2 = true;   // use to debug a specific function call  

/*****************************************************************************************/
function TimeSlotDateStart_Change()
{
	try
	{
		if( DebugModeProjectMilestoneTimeSlot )
			window.alert( "function TimeSlotDateStart_Change" ); 
		
		var d, sDate;
		
		/* If Name is blank, then automatically fill in a string as "Week Of a Monday's date" */
		var sName = myGetValue( "cust_name" );
		if( sName == null || sName == "" )	
		{
			d = myGetValue( "cust_datestart" );
			sDate = getMonday( d );
			if( sDate != null && sDate != "" )	
				mySetValue( "cust_name", "Week of " + sDate );
		}
		
		/* If End Date is blank, then automatically fill in a Friday object */
		var sEnd = myGetValue( "cust_dateend" );
		
		if( sEnd == null || sEnd == "" )	
		{
			sDate = getFriday( d );
			if( sDate != null && sDate != "" )	
				mySetValue( "cust_dateend", sDate );
		}
	}
	catch( err )
	{
		window.alert( "function TimeSlotDateStart_Change error code " + err );
	}
}

/****************************************************************************************
	If Executor is blank, then automatically fill in with Owner 						*/
function TimeSlotExecutorInit()
{
	try
	{
		if( DebugModeProjectMilestoneTimeSlot )
			window.alert( "function TimeSlotExecutorInit" ); 
		
		
		var oExecutor = Xrm.Page.getAttribute( "cust_executor" );
		
		if( oExecutor != null )		/* if label is valid */
		{
			if( oExecutor.getValue() == null )	/* if Executor value is null, then fill in */
			{
				var oOwnerID = myGetValue( "ownerid" );
				if( oOwnerID != null )
					oExecutor.setValue( oOwnerID );
			}		
		}
	}
	catch( err )
	{
		window.alert( "function TimeSlotExecutorInit error code " + err );
	}
}

/*****************************************************************************************/
function TimeSlot_OnLoad()
{
	try
	{
		if( DebugModeProjectMilestoneTimeSlot )
			window.alert( "function TimeSlot_OnLoad" ); 

		/* initialize Executor */
		TimeSlotExecutorInit();	
		
		/* set focus on Date Start data field */
		mySetFocus( "cust_datestart" );
	}
	catch( err )
	{
		window.alert( "function TimeSlot_OnLoad error code " + err );
	}
}

/*** End of lines ***********************************************************************/
