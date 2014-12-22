	/*
	Adam Ip																	2012-08-19
		get Services Revenue data field from Services : Projects 
		and do some calculation to update Revenue data field in form
		Project Milestone 
		cust_ServicesRevenue is retrieved from Project Form based on new_project ID
		Formula: cust_revenue = cust_ServicesRevenue * cust_pctofrevenuetobebilled %
		
		Completed Y/N is default as No										2012-08-24
		Once Completed Y/N is set to Yes, then Completion Date is set to Today's date,
		and these two data fields are set to "read-only".
		
		function myForceSubmitSetValue()									2012-08-30
		1. Calling myForceSubmitSetValue() because cust_revenue is a read-only field
		2. If end-user changes percentage to null, then set cust_revenue to null
		
		function CompletedYN_Change()										2012-09-18
		End user can input Completion Date.  
		Default value of Completion Date is today's system date, if 
			end user does not input a date.
	
		function CompletedYN_validate()										2012-09-18
		If 1. Completed? Y/N is true and 2. Completion Date is 
		a valid date, then set these two data fields to ready-only
		
		function MilestoneEarnedRevenue_Change()							2013-09-25
		getEarnedPercentage is now retrieved from cust_pctrevenuetobebilled,
		a floating point number, instead of cust_pctofrevenuetobebilled, 
		an option set
		
		function PrecentageRevenueToBeBilled_Change()						2013-10-11
		function MilestoneRevenueUpdate()
		
		function EnableCompletionDateField()								2013-10-17
		Tim Johnson sets these two data fields to be editable by 
			Kent Pylant and Tim Johnson 
		Two data fields: new_completedyn, and cust_milestonecompletiondate	

		function EnableRevenueDateField()									2014-01-22
		If Revenue is not zero, then enable these 2 date fields
			1. cust_plannedrevenuedate
			2. cust_actualrevenuedate	

		function InitializePlannedRevenueDateField()						2014-01-23
		function TargetCompletionDate_Change()
		
		function MilestoneEarnedRevenue_Change()							2014-03-25
		function EnableInvoicedDateField()
		
*/

var getEarnedPercentage = null;
var getInvoicedPercentage = null;
var whichRevenue = null;
var dPreviousCompletionDate = null;
var DebugModeProjectMilestone = false;
//	var DebugModeProjectMilestone2 = true;   // use to debug a specific function call  
/****************************************************************************************/
function ProcessServicesRevenue( Entities )
{       
	try
	{	
		if ( DebugModeProjectMilestone )
			window.alert( "function ProcessServicesRevenue\nEntities = " + Entities );		
		if( Entities != null )
		{	
			var getRevenue = RetrieveAttribute( Entities, "cust_ServicesRevenue" );
			if ( DebugModeProjectMilestone )
				window.alert( "function ProcessServicesRevenue\ngetRevenue = " + getRevenue );
			
			if( getRevenue != null )
			{	
				switch( whichRevenue )
				{
					case "e":										
						myForceSubmitSetValue( "cust_revenue", getRevenue * getEarnedPercentage / 100.0 ); 
						break;
					case "i":
						myForceSubmitSetValue( "new_invoicedrevenue", getRevenue * getInvoicedPercentage / 100.0 ); 
						break;	
				}		
			}		
		} 	
	}
	catch( err )
	{
		window.alert( "function ProcessServicesRevenue error code " + err );
	}
}

/****************************************************************************************/
function MilestoneRevenueUpdate()
{
	try
	{
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneRevenueUpdate" );
		/* Get the GUID of new_project record 
			Reference source http://gtcrm.wordpress.com/2011/03/16/jscript-reference-for-microsoft-dynamics-crm-2011/ 
		   Retrieve Xrm.Page.data.entity.attributes.get( "new_project" ).getValue()[0].id and then proceed with removeCurlyBrackets() */
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "new_project" );
		if( DebugModeProjectMilestone )
			window.alert( "function MilestoneRevenueUpdate\ntargetGUID_1 = " + targetGUID_1 );
		if( targetGUID_1 != null )
		{
			var targetGUID_2 = targetGUID_1.getValue()[0].id;
			if( DebugModeProjectMilestone )
				window.alert( "function MilestoneRevenueUpdate\ntargetGUID_2 = " + targetGUID_2 );
			if( targetGUID_2 != null )
			{
				var targetGUID = removeCurlyBrackets( targetGUID_2 );	
				if( DebugModeProjectMilestone )
					window.alert( "function MilestoneRevenueUpdate\ntargetGUID = " + targetGUID );
				if( targetGUID != null )
				{		
					// var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'0097d889-fab7-e111-b236-00155d031c01'"; 
					var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'" + targetGUID + "'";
					if( DebugModeProjectMilestone )
						window.alert( "function MilestoneRevenueUpdate\noDataSelect = " + oDataSelect );
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
							ProcessServicesRevenue( data.d.results );

							// Use for a single selected entity
							// ProcessReturnedEntity( data.d );								
						},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'oData Select Failed: ' + oDataSelect); }
					}  	);
					
				}
			}
		}	
	}
	catch( err )
	{
		window.alert( "function MilestoneRevenueUpdate error code " + err );
	}
}

/****************************************************************************************/
function MilestoneRevenue_Update()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneRevenue_Update" );
			
		/* cust_pctofrevenuetobebilled is a floating point number
		   getEarnedPercentage, getInvoicedPercentage are two global variables */
		switch( whichRevenue )
		{	
			case "e" : 
				getEarnedPercentage = myGetValue( "cust_pctrevenuetobebilled" ); 
				/* if percentage changes to null, then set cust_revenue to null */
				if( getEarnedPercentage == null )					
					myForceSubmitSetValue( "cust_revenue", null );	
				else
					MilestoneRevenueUpdate();
				break;
			case "i" : 
				getInvoicedPercentage = myGetValue( "cust_pctofinvoicedrevenue" ); 
				/* if percentage changes to null, then set new_Invoicedrevenue to null */
				if ( DebugModeProjectMilestone )
					window.alert( "function MilestoneInvoicedRevenue_Change\nwhichRevenue = " + whichRevenue + "\ngetInvoicedPercentage = " + getInvoicedPercentage );	
				if( getInvoicedPercentage == null )
					myForceSubmitSetValue( "new_invoicedrevenue", null );
				else	
					MilestoneRevenueUpdate();
				break;		
		}			
	}
	catch( err )
	{
		window.alert( "function MilestoneRevenue_Update error code " + err );
	}
}

/*****************************************************************************************/
function PrecentageRevenueToBeBilled_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function PrecentageRevenueToBeBilled_Change" );

		MilestoneRevenue_Update();		
	}
	catch( err )
	{
		window.alert( "function PrecentageRevenueToBeBilled_Change error code " + err );
	}
}

/*****************************************************************************************/
function MilestoneEarnedRevenue_Change()
{
	whichRevenue = "e";
	PrecentageRevenueToBeBilled_Change();
}

/*****************************************************************************************/
function MilestoneInvoicedRevenue_Change()
{
	try
	{
		whichRevenue = "i";
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneInvoicedRevenue_Change\nwhichRevenue = " + whichRevenue );	
		PrecentageRevenueToBeBilled_Change();
	}		
	catch( err )
	{
		window.alert( "function EnableInvoicedDateField error code " + err );
	}
}

/****************************************************************************************/
function EnableInvoicedDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function EnableInvoicedDateField" );	

		var toDisable = ( IsAuthorizedForTeams( ['Milestone Invoiced'] ) == true ) ? false : true;
		
		mySetDisabled( "new_ofinvoicedrevenue", toDisable );
		mySetDisabled( "new_invoicedrevenue", toDisable );	
	}		
	catch( err )
	{
		window.alert( "function EnableInvoicedDateField error code " + err );
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
		if ( DebugModeProjectMilestone )
			window.alert( "function EnableRevenueDateField" );		

		var cRevenue = myGetValue( "cust_revenue" );	
		var toSetVisible = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
		
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

/*** End of lines ***********************************************************************/
