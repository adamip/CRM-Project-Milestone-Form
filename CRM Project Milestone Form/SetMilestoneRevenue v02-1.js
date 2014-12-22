/*
	Adam Ip																	2012-08-19
		get Service Revenue data field from Services : Projects 
		and do some caluclation to update data field in Milestone 
		database ( not updating the form )
*/
var DebugModeMilestoneRevenue = true;
/****************************************************************************************/
function Test()
{
	try
	{
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "new_project" );
		var targetGUID_2 = targetGUID_1.getValue()[0].id;
		var targetGUID = removeCurlyBrackets( targetGUID_2 );	
		var oDataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/cust_projectmilestonesSet?$select=new_new_project_cust_projectmilestones_Project/cust_ServicesRevenue&$expand=new_new_project_cust_projectmilestones_Project&$filter=new_Project/Id eq guid'" + targetGUID + "'";
		$.ajax(	{
			type: "GET",
			contentType: "application/json; charset=utf-8",
			datatype: "json",
			url: ODataSelect,
			beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
			success: function (data, textStatus, XmlHttpRequest)
				{
					// Navigate objects
					 //NavigateObjects( data.d.results );

					//	Use only one of these two methods

					// Use for a selection that may return multiple entities
					ProcessReturnedEntities( data.d.results );

					// Use for a single selected entity
					//ProcessReturnedEntities( data.d );
					//window.alert( "Hello" );			
					
					// var accounts = data.d;
					// for (var i in accounts) {
					// showMessage(accounts[i].Name);
					// }

				},
			//error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + ODataSelect); }
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				errorHandler(XMLHttpRequest, textStatus, errorThrown);
			}
			}  	); 
	}
	catch( err )
	{
		window.alert( "function getServicesRevenue error code " + err );
	}
}

function errorHandler(XMLHttpRequest, textStatus, errorThrown)
{ showMessage("Error : " + textStatus + ": " + JSON.parse(XMLHttpRequest.responseText).error.message.value); }



/****************************************************************************************/
function ProcessReturnedEntities( Entity )
{       
	window.alert( "Inside Process 1 = " + Entity );
	try
	{	
	
		window.alert( "Inside Process = " + Entity );
	
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
