ALTER VIEW vw_MilestoneTimeSlot AS 

SELECT ProjExt.new_title As [pj Title]
	, ISNULL( Op2.[Value], '' ) AS [pj Type]
	, ISNULL( Op3.[Value], '' ) AS [pj current Milestone]
	, ISNULL( MileExt.cust_Milestones, '' ) AS [ms Stage]
	, CASE MileExt.new_CompletedYN WHEN 1 THEN 'True' WHEN 0 THEN 'False' ELSE '' END AS [ms Completed]
	, ISNULL( ProjExt.cust_ProjectedBookedServicesRevenue, 0 ) AS [pj Booked Services Revenue]
	, ISNULL( ProjExt.cust_ServicesRevenue, 0 ) AS [pj Services Revenue]
	, ISNULL( U1.FullName, '' ) AS [pj Owner]
	, ISNULL( MileExt.cust_pctRevenueToBeBilled, 0 ) AS [ms % Earned Revenue]
	, ISNULL( MileExt.cust_Revenue, 0 ) AS [ms Earned Revenue]	
	, ISNULL( MileExt.new_ofInvoicedRevenue, 0 ) AS [ms % Invoiced Revenue]
	, ISNULL( MileExt.new_InvoicedRevenue, 0 ) AS [ms Invoiced Revenue]
	, ISNULL( CONVERT( VARCHAR, ProjExt.new_StartDate, 111 ), '' ) AS [pj Start Date]
	, ISNULL( CONVERT( VARCHAR, ProjExt.new_EstCompletion, 111 ), '' ) AS [pj Est Completion Date]
	, ISNULL( CONVERT( VARCHAR, MileExt.new_milestonetargetstartdate, 111 ), '' ) AS [ms Target Start Date]
	, ISNULL( CONVERT( VARCHAR, MileExt.new_milestoneactualstartdate, 111 ), '' ) AS [ms Actual Start Date]
	, ISNULL( CONVERT( VARCHAR, MileExt.cust_MilestoneTargetDate, 111 ), '' ) AS [ms Target Completion Date]
	, ISNULL( CONVERT( VARCHAR, MileExt.cust_MilestoneCompletionDate, 111 ), '' ) AS [ms Actual Completion Date]
	, ISNULL( U2.FullName, '' ) AS [ms Owner]
	, ISNULL( CONVERT( VARCHAR, TmExt.cust_Name, 111 ), '' ) AS [tm Name]
	, ISNULL( CONVERT( VARCHAR, TmExt.cust_DateStart, 111 ), '' ) AS [tm Start Date]
	, ISNULL( CONVERT( VARCHAR, TmExt.cust_DateEnd, 111 ), '' ) AS [tm End Date]
	, TmExt.cust_NumberOfHours AS [tm Num Hours]
	, ISNULL( U3.FullName, '' ) AS [tm Serviceman 1]
	, ISNULL( U4.FullName, '' ) AS [tm Serviceman 2]
	
	, ISNULL( C.FirstName, '' ) + CASE 
		WHEN C.FirstName IS NULL OR LEN( C.FirstName ) = 0 THEN '' 
		ELSE ' ' END + ISNULL( C.Lastname, '' ) AS [Primary Contact]
	, ISNULL( ProjExt.new_salesorder_temp, '' ) AS [Sales Order]	
	, ProjExt.new_customerPO AS [Customer PO]
	, ISNULL( CONVERT( VARCHAR, ProjExt.cust_CustomerPOreceivedDate, 111 ), '' ) AS [Customer PO Received Date]
	, CASE ProjExt.new_COSreceived WHEN 1 THEN 'True' WHEN 0 THEN 'False' ELSE '' END AS [COS Received]
	, ISNULL( CONVERT( VARCHAR, ProjExt.cust_COSreceivedDate, 111 ), '' ) AS [COS Received Date]
FROM new_projectBase AS Proj
		LEFT JOIN SystemUserBase AS U1 ON U1.SystemUserID = Proj.OwnerId
	, new_projectExtensionBase AS ProjExt
		LEFT JOIN ContactBase AS C ON C.ContactId = ProjExt.new_PrimaryContact
		LEFT JOIN AccountBase AS Acc ON Acc.AccountId = ProjExt.new_InvoiceAccount
		LEFT JOIN StringMapBase AS Op2 ON Op2.AttributeName LIKE 'cust_projecttypedetail' AND Op2.AttributeValue = ProjExt.cust_ProjectTypeDetail
		LEFT JOIN StringMapBase AS Op3 ON Op3.AttributeName LIKE 'cust_milestoneperproject' AND Op3.AttributeValue = ProjExt.cust_MilestonePerProject
	, cust_projectmilestonesBase AS Mile	
		LEFT JOIN SystemUserBase AS U2 ON U2.SystemUserID = Mile.OwnerID
	, cust_projectmilestonesExtensionBase AS MileExt
		LEFT JOIN SystemUserBase AS U3 ON U3.SystemUserID = MileExt.cust_MilestoneExecutor1
		LEFT JOIN SystemUserBase AS U4 ON U4.SystemUserID = MileExt.cust_MilestoneExecutor2
		LEFT JOIN cust_projectmilestonetimeExtensionBase AS TmExt ON MileExt.cust_projectmilestonesId = TmExt.cust_MilestoneTimeResourceId   
WHERE Proj.new_projectId = ProjExt.new_projectId 
  	AND ProjExt.new_projectId = MileExt.new_Project 
	AND Mile.cust_projectmilestonesId = MileExt.cust_projectmilestonesId 
	/*
	 AND (
		MileExt.cust_MilestoneExecutor1 IS NOT NULL
		OR MileExt.cust_MilestoneExecutor2 IS NOT NULL ) */
	/* ORDER BY [pj Title], [ms Stage]	*/;


