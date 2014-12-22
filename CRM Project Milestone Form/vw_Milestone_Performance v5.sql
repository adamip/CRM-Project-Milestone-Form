--use Productions_MSCRM; 
ALTER VIEW dbo.vw_Milestone_Performance
AS
SELECT Ext.new_title As [Title], M.cust_Milestones AS [Milestone Stage]
	, new_StartDate AS [Project Start Date]
	, new_EstCompletion AS [Project Estimated Completion]
	, ISNULL( Ext.cust_ProjectedBookedServicesRevenue, 0 ) AS [Projected Booked Services Revenue]
	, ISNULL( Ext.cust_ServicesRevenue, 0 ) AS [Services Revenue]
	, ISNULL( M.cust_Revenue, 0 ) AS [Milestone Revenue]
	, ISNULL( CONVERT( VARCHAR(3), M.cust_PctOfRevenueToBeBilled - 832090000 ) + '%', '' ) AS [% Of Revenue To Be Billed]
	, M.new_milestonetargetstartdate AS [Milestone Target Start Date], M.new_milestoneactualstartdate AS [Milestone Actual Start Date]
	, M.cust_MilestoneTargetDate AS [Milestone Target Completion Date], M.cust_MilestoneCompletionDate AS [Milestone Actual Completion Date]
	, CASE M.new_CompletedYN WHEN 1 THEN 'True' WHEN 0 THEN 'False' ELSE '' END AS [Completed]
	, Acc.Name AS [Account Name], Ow.Name AS [Owner]
	, ISNULL(Op2.[Value], '') AS [Project Type Detail], ISNULL(Op3.[Value], '') AS [Milestone Per Project]
	, ISNULL(C.FirstName, '') + CASE 
		WHEN C.FirstName IS NULL OR LEN(C.FirstName) = 0 THEN '' 
		ELSE ' ' END + ISNULL(C.Lastname, '') AS [Primary Contact]
	, ISNULL(Ext.new_salesorder_temp, '') AS [Sales Order]	
	, Ext.new_customerPO AS [Customer PO], Ext.cust_CustomerPOreceivedDate AS [Customer PO Received Date]
	, CASE Ext.new_COSreceived WHEN 1 THEN 'True' WHEN 0 THEN 'False' ELSE '' END AS [COS Received]
	, Ext.cust_COSreceivedDate AS [COS Received Date]
	, ISNULL(Op4.[Value], '') AS [Partner]
	, ISNULL( RecQm.Name, '' ) AS [System Engineer Rec/Qm]	
	, ISNULL( WFM.Name, '' ) AS [System Engineer WFM]
	, ISNULL( new_Description, '' ) AS [Description]
FROM new_projectExtensionBase AS Ext
LEFT JOIN cust_projectmilestonesExtensionBase AS M ON M.new_Project = Ext.new_projectId AND M.new_CompletedYN <> 1 AND M.cust_Revenue <> 0
LEFT JOIN new_projectBase AS B ON B.new_projectId = Ext.new_projectId 
LEFT JOIN OwnerBase AS Ow ON Ow.OwnerID = B.OwnerID 
LEFT JOIN OwnerBase AS RecQm ON RecQm.OwnerID = cust_SystemEngineerRecQm
LEFT JOIN OwnerBase AS WFM ON RecQm.OwnerID = cust_SystemEngineerWFM
LEFT JOIN ContactBase AS C ON C.ContactId = Ext.new_PrimaryContact
LEFT JOIN AccountBase AS Acc ON Acc.AccountId = Ext.new_InvoiceAccount
LEFT JOIN StringMapBase AS Op2 ON Op2.AttributeName LIKE 'cust_projecttypedetail' AND Op2.AttributeValue = Ext.cust_ProjectTypeDetail
LEFT JOIN StringMapBase AS Op3 ON Op3.AttributeName LIKE 'cust_milestoneperproject' AND Op3.AttributeValue = Ext.cust_MilestonePerProject
LEFT JOIN StringMapBase AS Op4 ON Op4.AttributeName LIKE 'cust_partner' AND Op4.AttributeValue = Ext.cust_partner
