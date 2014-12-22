/*
	Adam Ip																	2012-08-19
		get Service Revenue data field from Services : Projects 
		and do some caluclation to update data field in Milestone 
		database ( not updating the form )
*/
var DebugModeMilestoneRevenue = true;
/****************************************************************************************/
function getServicesRevenue()
{
	try
	{
		if( DebugModeMilestoneRevenue )
			window.alert( "function getServicesRevenue" );
		/* Get the GUID of new_project record 
			Reference source http://gtcrm.wordpress.com/2011/03/16/jscript-reference-for-microsoft-dynamics-crm-2011/ */
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "new_project" );
		if( DebugModeMilestoneRevenue )
			window.alert( "function getServicesRevenue\ntargetGUID_1 = " + targetGUID_1 );
		if( targetGUID_1 != null )
		{
			var targetGUID_2 = targetGUID_1.getValue()[0].id;
			if( DebugModeMilestoneRevenue )
				window.alert( "function getServicesRevenue\ntargetGUID_2 = " + targetGUID_2 );
			if( targetGUID_2 != null )
			{
				var targetGUID = removeCurlyBrackets( targetGUID_2 );	
				if( DebugModeMilestoneRevenue )
					window.alert( "function getServicesRevenue\ntargetGUID = " + targetGUID );
				if( targetGUID != null )
				{		
					//var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'" + targetGUID + "'";
					var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'0097d889-fab7-e111-b236-00155d031c01'";
					//if( DebugModeMilestoneRevenue )
					//	window.alert( "function getServicesRevenue\noDataSelect " + oDataSelect );
					$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: ODataSelect,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
							{
								// Navigate objects
								// NavigateObjects( data.d.results );

								/* Use only one of these two methods */

								// Use for a selection that may return multiple entities
								//ProcessReturnedEntities( data.d.results );

								// Use for a single selected entity
								//ProcessReturnedEntity( data.d );
								window.alert( "Hello" );			
							},
					error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + ODataSelect); }
					}  	); 
			   }
			}
		}	
	}
	catch( err )
	{
		window.alert( "function getServicesRevenue error code " + err );
	}
}

/****************************************************************************************/
function ProcessReturnedEntities( Entity )
{       
	try
	{	
	if ( DebugModeMilestoneRevenue )
	{
		window.alert( "function ProcessReturnedEntity\nEntity = " + Entity );
	}	
	
	if( Entities != null )
		{
			var getEntity = RetrieveAttribute( Entity, "cust_ServicesRevenue" );
			var getPercentage = myGetValue( "cust_pctofrevenuetobebilled" ) - 832090000;
			
			if( getEntity != null )
			{
				var out1 = Xrm.Page.getAttribute( "cust_revenue" );
				if( out1 != null )
					out1.setValue( target );
			}
		} 	
	}
	catch( err )
	{
		window.alert( "function ProcessReturnedEntity error code " + err );
	}
}

/*** End of lines ***********************************************************************/
