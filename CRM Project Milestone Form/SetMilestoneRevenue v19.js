	/*
	Adam Ip																	2012-08-19
		get Services Revenue data field from Services : Projects 
		and do some calculation to update Revenue data field in form
		Project Milestone 
		cust_servicesrevenue is retrieved from Project Form based on new_project ID
		Formula: cust_revenue = cust_servicesrevenue * cust_pctofrevenuetobebilled %
		
	Adam Ip																	2012-08-24
		Completed Y/N is default as No										
		Once Completed Y/N is set to Yes, then Completion Date is set to Today's date,
		and these two data fields are set to "read-only".
		
	Adam Ip																	2012-08-30
		function myForceSubmitSetValue()									
		1. Calling myForceSubmitSetValue() because cust_revenue is a read-only field
		2. If end-user changes percentage to null, then set cust_revenue to null
		
	Adam Ip																	2012-09-18
		function CompletedYN_Change()										
		End user can input Completion Date.  
		Default value of Completion Date is today's system date, if 
			end user does not input a date.
	
	Adam Ip																	2012-09-18
		function CompletedYN_validate()										
		If 1. Completed? Y/N is true and 2. Completion Date is 
		a valid date, then set these two data fields to ready-only
		
	Adam Ip																	2013-09-25
		Be careful that javascript does multitasking and therefore don't
		use global variable (global flag)
		1 function ProcessEarnedRevenue()
		2 function MilestoneEarnedRevenueRetrieve()
		3 function MilestoneEarnedRevenue_Update()
		4 function PrecentageEarnedRevenueToBeBilled_Change()
			4 -> 3 -> 2 -> 1
		6 function ProcessInvoicedRevenue()
		7 function MilestoneInvoicedRevenueRetrieve()
		8 function MilestoneInvoicedRevenue_Update()
		9 function PrecentageInvoicedRevenueToBeBilled_Change()	
			9 -> 8 -> 7 -> 6
		
	Adam Ip																	2013-10-11
		function PrecentageRevenueToBeBilled_Change()						
		function MilestoneRevenueUpdate()
		
	Adam Ip																	2013-10-17
		function EnableCompletionDateField()								
		Tim Johnson sets these two data fields to be editable by 
			Kent Pylant and Tim Johnson 
		Two data fields: new_completedyn, and cust_milestonecompletiondate	

	Adam Ip																	2014-01-22
		function EnableRevenueDateField()									
		If Revenue is not zero, then enable these 2 date fields
			1. cust_plannedrevenuedate
			2. cust_actualrevenuedate	

	Adam Ip																	2014-01-23
		function InitializePlannedRevenueDateField()						
		function TargetCompletionDate_Change()
		
	Adam Ip																	2014-03-25
		function MilestoneEarnedRevenue_Change()							
		function MilestoneInvoicedRevenue_Change()	
		function EnableInvoicedRevenueField()

	Adam Ip																	2014-05-05
		function Milestone_OnLoad()
		
*/

var dPreviousCompletionDate = null;
var DebugModeProjectMilestone = false;
//	var DebugModeProjectMilestone2 = true;   // use to debug a specific function call  

/****************************************************************************************/
function ProcessEarnedRevenue( Entities, getEarnedPercentage )
{       
	try
	{	
		if ( DebugModeProjectMilestone )
			window.alert( "function ProcessEarnedRevenue\n\tEntities = " + Entities );		
		if( Entities != null )
		{	
			var getRevenue = RetrieveAttribute( Entities, "cust_ServicesRevenue" );
			if ( DebugModeProjectMilestone )
				window.alert( "function ProcessEarnedRevenue\n\tgetRevenue = " + getRevenue );
			
			if( getRevenue != null )
			{
				var	getCurrency = RecursiveRetrieveObjectValue( getRevenue );
				if ( DebugModeProjectMilestone )
					window.alert( "function ProcessEarnedRevenue\n\tgetCurrency = " + getCurrency );
				
				if( getCurrency != null )
				{	
					if ( DebugModeProjectMilestone )
						window.alert( "function ProcessEarnedRevenue\n\tgetCurrency = " + getCurrency + "\n\tgetEarnedPercentage = " + getEarnedPercentage );
					myForceSubmitSetValue( "cust_revenue", getCurrency * getEarnedPercentage / 100.0 ); 
				}		
			}	
		} 	
	}
	catch( err )
	{
		window.alert( "function ProcessEarnedRevenue error code " + err );
	}
}

/****************************************************************************************/
function ProcessInvoicedRevenue( Entities, getInvoicedPercentage )
{       
	try
	{	
		if ( DebugModeProjectMilestone )
			window.alert( "function ProcessInvoicedRevenue\n\tEntities = " + Entities );		
		if( Entities != null )
		{	
			var getRevenue = RetrieveAttribute( Entities, "cust_ServicesRevenue" );
			if ( DebugModeProjectMilestone )
				window.alert( "function ProcessInvoicedRevenue\n\tgetRevenue = " + getRevenue );
			
			if( getRevenue != null )
			{
				var	getCurrency = RecursiveRetrieveObjectValue( getRevenue );
				if ( DebugModeProjectMilestone )
					window.alert( "function ProcessInvoicedRevenue\n\tgetCurrency = " + getCurrency );
				
				if( getCurrency != null )
				{	
					if ( DebugModeProjectMilestone )
						window.alert( "function ProcessInvoicedRevenue\n\tgetCurrency = " + getCurrency + "\n\tgetInvoicedPercentage = " + getInvoicedPercentage );
					myForceSubmitSetValue( "new_invoicedrevenue", getCurrency * getInvoicedPercentage / 100.0 ); 
				}		
			}	
		} 	
	}
	catch( err )
	{
		window.alert( "function ProcessInvoicedRevenue error code " + err );
	}
}

/****************************************************************************************/
function MilestoneEarnedRevenueRetrieve()
{
	try
	{
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneEarnedRevenueRetrieve" );
			
		var getEarnedPercentage = myGetValue( "cust_pctrevenuetobebilled" ); 
		
		/* Get the GUID of new_project record 
			Reference source http://gtcrm.wordpress.com/2011/03/16/jscript-reference-for-microsoft-dynamics-crm-2011/ 
		   Retrieve Xrm.Page.data.entity.attributes.get( "new_project" ).getValue()[0].id and then proceed with removeCurlyBrackets() */
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "new_project" );
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneEarnedRevenueRetrieve\n\ttargetGUID_1 = " + targetGUID_1 );
		if( targetGUID_1 != null )
		{
			var targetGUID_2 = targetGUID_1.getValue()[0].id;
			if( DebugModeProjectMilestone )
				window.alert( "function MilestoneEarnedRevenueRetrieve\n\ttargetGUID_2 = " + targetGUID_2 );
			if( targetGUID_2 != null )
			{
				var targetGUID = removeCurlyBrackets( targetGUID_2 );	
				if( DebugModeProjectMilestone )
					window.alert( "function MilestoneEarnedRevenueRetrieve\n\ttargetGUID = " + targetGUID );
				if( targetGUID != null )
				{		
					// var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'0097d889-fab7-e111-b236-00155d031c01'"; 
					var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'" + targetGUID + "'";
					if( DebugModeProjectMilestone )
						window.alert( "function MilestoneEarnedRevenueRetrieve\noDataSelect = " + oDataSelect );
					$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: oDataSelect,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
						{
							// Navigate objects
							// NavigateObjects( data.d.results );

							// Use only one of these two methods 

							// Use for a selection that may return multiple entities
							ProcessEarnedRevenue( data.d.results, getEarnedPercentage );

							// Use for a single selected entity
							// ProcessServicesRevenue( data.d );								
						},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'oData Select Failed: ' + oDataSelect); }
					}  	);
					
				}
			}
		}	
	}
	catch( err )
	{
		window.alert( "function MilestoneEarnedRevenueRetrieve error code " + err );
	}
}

/****************************************************************************************/
function MilestoneInvoicedRevenueRetrieve()
{
	try
	{
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneInvoicedRevenueRetrieve" );
			
		var getInvoicedPercentage = myGetValue( "cust_pctofinvoicedrevenue" );
		
		/* Get the GUID of new_project record 
			Reference source http://gtcrm.wordpress.com/2011/03/16/jscript-reference-for-microsoft-dynamics-crm-2011/ 
		   Retrieve Xrm.Page.data.entity.attributes.get( "new_project" ).getValue()[0].id and then proceed with removeCurlyBrackets() */
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "new_project" );
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneInvoicedRevenueRetrieve\n\ttargetGUID_1 = " + targetGUID_1 );
		if( targetGUID_1 != null )
		{
			var targetGUID_2 = targetGUID_1.getValue()[0].id;
			if( DebugModeProjectMilestone )
				window.alert( "function MilestoneInvoicedRevenueRetrieve\n\ttargetGUID_2 = " + targetGUID_2 );
			if( targetGUID_2 != null )
			{
				var targetGUID = removeCurlyBrackets( targetGUID_2 );	
				if( DebugModeProjectMilestone )
					window.alert( "function MilestoneInvoicedRevenueRetrieve\n\ttargetGUID = " + targetGUID );
				if( targetGUID != null )
				{		
					// var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'0097d889-fab7-e111-b236-00155d031c01'"; 
					var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'" + targetGUID + "'";
					if( DebugModeProjectMilestone )
						window.alert( "function MilestoneInvoicedRevenueRetrieve\noDataSelect = " + oDataSelect );
					$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: oDataSelect,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
						{
							// Navigate objects
							// NavigateObjects( data.d.results );

							// Use only one of these two methods 

							// Use for a selection that may return multiple entities
							ProcessInvoicedRevenue( data.d.results, getInvoicedPercentage );

							// Use for a single selected entity
							// ProcessServicesRevenue( data.d );								
						},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'oData Select Failed: ' + oDataSelect); }
					}  	);
					
				}
			}
		}	
	}
	catch( err )
	{
		window.alert( "function MilestoneInvoicedRevenueRetrieve error code " + err );
	}
}

/****************************************************************************************/
function MilestoneEarnedRevenue_Update()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneEarnedRevenue_Update" );

		/* if percentage changes to null, then set cust_revenue to null */
		if( myGetValue( "cust_pctrevenuetobebilled" ) == null )					
			myForceSubmitSetValue( "cust_revenue", null );	
		else
			MilestoneEarnedRevenueRetrieve();
	}
	catch( err )
	{
		window.alert( "function MilestoneEarnedRevenue_Update error code " + err );
	}
}

/****************************************************************************************/
function MilestoneInvoicedRevenue_Update()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneInvoicedRevenue_Update" ); 

		/* if percentage changes to null, then set new_Invoicedrevenue to null */
		if( myGetValue( "cust_pctofinvoicedrevenue" ) == null )
			myForceSubmitSetValue( "new_invoicedrevenue", null );
		else	
			MilestoneInvoicedRevenueRetrieve();
	}
	catch( err )
	{
		window.alert( "function MilestoneInvoicedRevenue_Update error code " + err );
	}
}

/*****************************************************************************************/
function PrecentageEarnedRevenueToBeBilled_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function PrecentageEarnedRevenueToBeBilled_Change" );

		MilestoneEarnedRevenue_Update();		
	}
	catch( err )
	{
		window.alert( "function PrecentageEarnedRevenueToBeBilled_Change error code " + err );
	}
}

/*****************************************************************************************/
function PrecentageInvoicedRevenueToBeBilled_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function PrecentageInvoicedRevenueToBeBilled_Change" );

		MilestoneInvoicedRevenue_Update();		
	}
	catch( err )
	{
		window.alert( "function PrecentageInvoicedRevenueToBeBilled_Change error code " + err );
	}
}

/*****************************************************************************************/
function MilestoneEarnedRevenue_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneEarnedRevenue_Change" );
		PrecentageEarnedRevenueToBeBilled_Change();
	}
	catch( err )
	{
		window.alert( "function MilestoneEarnedRevenue_Change error code " + err );
	}}

/*****************************************************************************************/
function MilestoneInvoicedRevenue_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneInvoicedRevenue_Change" );	
		PrecentageInvoicedRevenueToBeBilled_Change();
	}		
	catch( err )
	{
		window.alert( "function MilestoneInvoicedRevenue_Change error code " + err );
	}
}

/****************************************************************************************/
function CompletedYN_validate()
{
	try
	{
		var sCompletedYN = myGetValue( "new_completedyn" );  /* new_completedyn is a Two Options*/
		if ( DebugModeProjectMilestone )
			window.alert( "function CompletedYN_validate\nsCompletedYN = " + sCompletedYN );
		if( sCompletedYN == true )
		{	
			var dCompletionDate = myGetValue( "cust_milestonecompletiondate" ); 
			if ( DebugModeProjectMilestone )
				window.alert( "function CompletedYN_validate\ndCompletionDate = " + dCompletionDate );
			/* if the completion date is blank, null, or an invalid date */
			if( isDate( dCompletionDate ) == false )
			{
				var sCompletedYN = Xrm.Page.getAttribute( "new_completedyn" );
				if( sCompletedYN != null )
					sCompletedYN.setValue( false );
			}
			else
			{
				/* disable 1. Completed? Y/N and 2. Completion Date */
				if( myGetDisabled( "new_completedyn" ) == false )
					mySetDisabled( "new_completedyn", true );
				if( myGetDisabled( "cust_milestonecompletiondate" )	== false )
					mySetDisabled( "cust_milestonecompletiondate", true );
			}
		}	
	}
	catch( err )
	{
		window.alert( "function CompletedYN_validate error code " + err );
	}
}

/****************************************************************************************/
function CompletedYN_Change()
{
	try
	{
		var sCompletedYN = myGetValue( "new_completedyn" );  /* new_completedyn is a Two Options*/
		var dCompletionDate = myGetValue( "cust_milestonecompletiondate" ); 
		var dDateField = Xrm.Page.getAttribute( "cust_milestonecompletiondate" );
		if ( DebugModeProjectMilestone )
			window.alert( "function CompletedYN_Change\nsCompletedYN = " + sCompletedYN + "\ndCompletionDate = " + dCompletionDate + "\ndDateField = " + dDateField );

		if( dDateField != null )	
		{	
			if( sCompletedYN == true )
			{	
				/* if the completion date is blank or null */
				if( dCompletionDate == null )
				{
					dDateField.setValue( dPreviousCompletionDate == null ? new Date() : dPreviousCompletionDate );
				}		
			}	
			else
			{
				dPreviousCompletionDate = dCompletionDate;
				dDateField.setValue( null );		
			}	
		}	
	}
	catch( err )
	{
		window.alert( "function CompletedYN_Change error code " + err );
	}
}

/****************************************************************************************/
function EnableCompletionDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function EnableCompletionDateField" );		

		/* Tim Johnson sets this data field to be editable by Kent Pylant, and Tim Johnson */ /*
		var toDisable = ( IsAuthorizedForTeams( ['Service Mgmt'] ) == true ) ? false : true;
		
		mySetDisabled( "new_completedyn", toDisable );
		mySetDisabled( "cust_milestonecompletiondate", toDisable );	*/
		mySetDisabled( "new_completedyn", false );
		mySetDisabled( "cust_milestonecompletiondate", false );	
	}		
	catch( err )
	{
		window.alert( "function EnableCompletionDateField error code " + err );
	}
}
		
/****************************************************************************************/
function TargetCompletionDate_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function TargetStartDate_Change" );
			
		var cRevenue = myGetValue( "cust_revenue" );	
		var toEnable = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
				
		/* initialize date value */
		if( toEnable == true )
			InitializePlannedRevenueDateField();
	}		
	catch( err )
	{
		window.alert( "function TargetStartDate_Change error code " + err );
	}

}

/****************************************************************************************/
function InitializePlannedRevenueDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function InitializePlannedRevenueDateField" );
			
		/* if target is null */	
		if( myGetValue( "cust_plannedrevenuedate" ) == null )
		{
			var dMilestoneTargetDate = myGetValue( "cust_milestonetargetdate" );
			/* if source is not null */
			if( dMilestoneTargetDate != null )
			{
				var dDate = new Date( dMilestoneTargetDate.toDateString() );
				if( dDate != null )
				{
					dDate.setDate( dDate.getDate() + 14 );
					mySetValue( "cust_plannedrevenuedate", dDate );
				}	
			}	
		}		
	}		
	catch( err )
	{
		window.alert( "function InitializePlannedRevenueDateField error code " + err );
	}
}

/****************************************************************************************/
function EnableRevenueDateField()
{
	try
	{
		/* Earned Revenue */
		var cRevenue = myGetValue( "cust_revenue" );	
		var toSetVisible = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
		
		if ( DebugModeProjectMilestone )
			window.alert( "function EnableRevenueDateField\ncust_revenue = " + cRevenue + "\ntoSetVisible = " + toSetVisible );	
		mySetVisible( "cust_plannedrevenuedate", toSetVisible );
		mySetVisible( "cust_actualrevenuedate", toSetVisible );
		
		/* initialize date values */
		if( toSetVisible == true )
			InitializePlannedRevenueDateField();
	}		
	catch( err )
	{
		window.alert( "function EnableRevenueDateField error code " + err );
	}
}

/****************************************************************************************/
function EnableInvoicedRevenueField()
{
	try
	{
		var toDisable = ( IsAuthorizedForTeams( ['Milestone Invoiced'] ) == true ) ? false : true;

		if ( DebugModeProjectMilestone )
			window.alert( "function EnableInvoicedRevenueField\ntoDisable = " + toDisable );	
		
		mySetDisabled( "new_pctofinvoicedrevenue", toDisable );
		mySetDisabled( "new_invoicedrevenue", toDisable );	
	}		
	catch( err )
	{
		window.alert( "function EnableInvoicedRevenueField error code " + err );
	}
}
		
/****************************************************************************************/
function Milestone_OnLoad()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function Milestone_OnLoad" );	
			
		MilestoneEarnedRevenue_Update();
		MilestoneInvoicedRevenue_Update(); 
		
		CompletedYN_validate();
		EnableCompletionDateField();
		EnableRevenueDateField();
		EnableInvoicedRevenueField();		
	}		
	catch( err )
	{
		window.alert( "function Milestone_OnLoad error code " + err );
	}
}

/*** End of lines ***********************************************************************/
