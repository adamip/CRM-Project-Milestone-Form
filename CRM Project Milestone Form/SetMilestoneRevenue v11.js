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
		
		function MilestoneRevenue_Change()									2013-09-25
		getPercentage is now retrieved from cust_pctrevenuetobebilled,
		a floating point number, instead of cust_pctofrevenuetobebilled, 
		an option set
		
		function PrecentageRevenueToBeBilled_Change()						2013-10-11
		function MilestoneRevenueUpdate()
		
		function EnableCompletionDateField()								2013-10-17
		Tim Johnson sets these two data fields to be editable by 
			Kent Pylant and Tim Johnson 
		Two data fields: new_completedyn, and cust_milestonecompletiondate	

		function EnableDeploymentDateField()								2014-01-22
		If Revenue is not zero, then enable these 2 date fields
			1. cust_planneddeploymentdate
			2. cust_actualdeploymentdate	

		function InitializePlannedDeploymentDateField()						2014-01-23
		function InitializeActualDeploymentDateField()
		function TargetStartDate_Change()
		function ActualStartDate_Change()
		
*/

var getPercentage;
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
			var getServicesRevenue = RetrieveAttribute( Entities, "cust_ServicesRevenue" );
			if ( DebugModeProjectMilestone )
				window.alert( "function ProcessServicesRevenue\ngetServicesRevenue = " + getServicesRevenue );
			if( getServicesRevenue != null )
				myForceSubmitSetValue( "cust_revenue", getServicesRevenue * getPercentage / 100.0 ); 
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
		/* get the numeric value from an Option set 
		   getPercentage is a global variable */
		getPercentage = myGetValue( "cust_pctrevenuetobebilled" );  /* cust_pctofrevenuetobebilled is an Option Set */

		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneRevenue_Update\ngetPercentage = " + getPercentage );
			
		/* if percentage changes to null, then set cust_revenue to null */
		if( getPercentage == null )
			myForceSubmitSetValue( "cust_revenue", null );
		else	
		{	
			MilestoneRevenueUpdate();
		}	
	}
	catch( err )
	{
		window.alert( "function MilestoneRevenue_Update error code " + err );
	}
}


/****************************************************************************************/
function MilestoneRevenue_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function MilestoneRevenue_Change" );
			
		MilestoneRevenue_Update();	
	}
	catch( err )
	{
		window.alert( "function MilestoneRevenue_Change error code " + err );
	}
}

/****************************************************************************************
	same feature as function MilestoneRevenue_Change()
*/
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
		if ( DebugModeProjectMilestone )
			window.alert( "function CompletedYN_Change\nsCompletedYN = " + sCompletedYN );
		if( sCompletedYN == true )
		{	
			var dCompletionDate = myGetValue( "cust_milestonecompletiondate" ); 
			if ( DebugModeProjectMilestone )
				window.alert( "function CompletedYN_Change\ndCompletionDate = " + dCompletionDate );
			/* if the completion date is blank or null */
			if( dCompletionDate == null )
			{
				var dDateField = Xrm.Page.getAttribute( "cust_milestonecompletiondate" );
				if ( DebugModeProjectMilestone )
					window.alert( "function CompletedYN_Change\ndDateField = " + dDateField );
				if( dDateField != null )
					dDateField.setValue( new Date());
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

		/* Tim Johnson sets this data field to be editable by Kent Pylant, and Tim Johnson */
		var toDisable = ( IsAuthorizedForTeams( ['Service Mgmt'] ) == true ) ? false : true;
		
		mySetDisabled( "new_completedyn", toDisable );
		mySetDisabled( "cust_milestonecompletiondate", toDisable );
	}		
	catch( err )
	{
		window.alert( "function EnableCompletionDateField error code " + err );
	}
}
		
/****************************************************************************************/
function TargetStartDate_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function TargetStartDate_Change" );
			
		var cRevenue = myGetValue( "cust_revenue" );	
		var toEnable = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
				
		/* initialize date value */
		if( toEnable == true )
			InitializePlannedDeploymentDateField();
	}		
	catch( err )
	{
		window.alert( "function TargetStartDate_Change error code " + err );
	}

}

/****************************************************************************************/
function ActualStartDate_Change()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function ActualStartDate_Change" );
			
		var cRevenue = myGetValue( "cust_revenue" );	
		var toEnable = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
				
		/* initialize date value */
		if( toEnable == true )
			InitializeActualDeploymentDateField();
	}		
	catch( err )
	{
		window.alert( "function ActualStartDate_Change error code " + err );
	}

}

/****************************************************************************************/
function InitializePlannedDeploymentDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function InitializePlannedDeploymentDateField" );
			
		/* if target is null */	
		if( myGetValue( "cust_planneddeploymentdate" ) == null )
		{
			var dMilestoneTargetStartDate = myGetValue( "new_milestonetargetstartdate" );
			/* if source is not null */
			if( dMilestoneTargetStartDate != null )
				mySetValue( "cust_planneddeploymentdate", dMilestoneTargetStartDate );
		}		
	}		
	catch( err )
	{
		window.alert( "function InitializePlannedDeploymentDateField error code " + err );
	}
}

/****************************************************************************************/
function InitializeActualDeploymentDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function InitializeActualDeploymentDateField" );
		
		/* if target is null */	
		if( myGetValue( "cust_actualdeploymentdate" ) == null )
		{
			var dMilestoneActualStartDate = myGetValue( "new_milestoneactualstartdate" );
			/* if source is not null */
			if( dMilestoneActualStartDate != null )
				mySetValue( "cust_actualdeploymentdate", dMilestoneActualStartDate );
		}			
	}		
	catch( err )
	{
		window.alert( "function InitializeActualDeploymentDateField error code " + err );
	}
}

/****************************************************************************************/
function EnableDeploymentDateField()
{
	try
	{
		if ( DebugModeProjectMilestone )
			window.alert( "function EnableDeploymentDateField" );		

		var cRevenue = myGetValue( "cust_revenue" );	
		var toSetVisible = ( cRevenue != null && cRevenue != 0.0 ) ? true : false;
		
		mySetVisible( "cust_planneddeploymentdate", toSetVisible );
		mySetVisible( "cust_actualdeploymentdate", toSetVisible );
		
		/* initialize date values */
		if( toSetVisible == true )
		{
			InitializePlannedDeploymentDateField();
			InitializeActualDeploymentDateField();
		}	
	}		
	catch( err )
	{
		window.alert( "function EnableDeploymentDateField error code " + err );
	}
}

/*** End of lines ***********************************************************************/
