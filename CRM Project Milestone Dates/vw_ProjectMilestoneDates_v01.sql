--USE Productions_MSCRM;

create view dbo.vw_ProjectMilestoneDates_v1
as
SELECT Pe.new_Title AS [Project Title]
	/* , Pe.new_ProjectID
	, Me01.cust_ProjectID
	, Me01.new_Project 
	, Me01.cust_Milestone */
	
	, Me01.new_MilestoneTargetStartDate AS [01 Target Start Date]
	, Me01.new_MilestoneActualStartDate AS [01 Actual Start Date]
	, Me01.cust_MilestoneTargetDate AS [01 Target Completion Date]
	, Me01.cust_MilestoneCompletionDate AS [01 Actual Completion Date]
	, Me01.cust_PlannedRevenueDate AS [01 Planned Revenue Date]
	, Me01.cust_ActualRevenueDate AS [01 Actual Revenue Date]
	, Me01.cust_Revenue AS [01 Revenue]
	, Me01.new_InvoicedRevenue AS [01 Invoiced Revenue]
	
	, Me02.new_MilestoneTargetStartDate AS [02 Target Start Date]
	, Me02.new_MilestoneActualStartDate AS [02 Actual Start Date]
	, Me02.cust_MilestoneTargetDate AS [02 Target Completion Date]
	, Me02.cust_MilestoneCompletionDate AS [02 Actual Completion Date]
	, Me02.cust_PlannedRevenueDate AS [02 Planned Revenue Date]
	, Me02.cust_ActualRevenueDate AS [02 Actual Revenue Date]
	, Me02.cust_Revenue AS [02 Revenue]
	, Me02.new_InvoicedRevenue AS [02 Invoiced Revenue]
	
	, Me03.new_MilestoneTargetStartDate AS [03 Target Start Date]
	, Me03.new_MilestoneActualStartDate AS [03 Actual Start Date]
	, Me03.cust_MilestoneTargetDate AS [03 Target Completion Date]
	, Me03.cust_MilestoneCompletionDate AS [03 Actual Completion Date]
	, Me03.cust_PlannedRevenueDate AS [03 Planned Revenue Date]
	, Me03.cust_ActualRevenueDate AS [03 Actual Revenue Date]
	, Me03.cust_Revenue AS [03 Revenue]
	, Me03.new_InvoicedRevenue AS [03 Invoiced Revenue]

	, Me04.new_MilestoneTargetStartDate AS [04 Target Start Date]
	, Me04.new_MilestoneActualStartDate AS [04 Actual Start Date]
	, Me04.cust_MilestoneTargetDate AS [04 Target Completion Date]
	, Me04.cust_MilestoneCompletionDate AS [04 Actual Completion Date]
	, Me04.cust_PlannedRevenueDate AS [04 Planned Revenue Date]
	, Me04.cust_ActualRevenueDate AS [04 Actual Revenue Date]
	, Me04.cust_Revenue AS [04 Revenue]
	, Me04.new_InvoicedRevenue AS [04 Invoiced Revenue]

	, Me05.new_MilestoneTargetStartDate AS [05 Target Start Date]
	, Me05.new_MilestoneActualStartDate AS [05 Actual Start Date]
	, Me05.cust_MilestoneTargetDate AS [05 Target Completion Date]
	, Me05.cust_MilestoneCompletionDate AS [05 Actual Completion Date]
	, Me05.cust_PlannedRevenueDate AS [05 Planned Revenue Date]
	, Me05.cust_ActualRevenueDate AS [05 Actual Revenue Date]
	, Me05.cust_Revenue AS [05 Revenue]
	, Me05.new_InvoicedRevenue AS [05 Invoiced Revenue]	
	
	, Me06.new_MilestoneTargetStartDate AS [06 Target Start Date]
	, Me06.new_MilestoneActualStartDate AS [06 Actual Start Date]
	, Me06.cust_MilestoneTargetDate AS [06 Target Completion Date]
	, Me06.cust_MilestoneCompletionDate AS [06 Actual Completion Date]
	, Me06.cust_PlannedRevenueDate AS [06 Planned Revenue Date]
	, Me06.cust_ActualRevenueDate AS [06 Actual Revenue Date]
	, Me06.cust_Revenue AS [06 Revenue]
	, Me06.new_InvoicedRevenue AS [06 Invoiced Revenue]

	, Me07.new_MilestoneTargetStartDate AS [07 Target Start Date]
	, Me07.new_MilestoneActualStartDate AS [07 Actual Start Date]
	, Me07.cust_MilestoneTargetDate AS [07 Target Completion Date]
	, Me07.cust_MilestoneCompletionDate AS [07 Actual Completion Date]
	, Me07.cust_PlannedRevenueDate AS [07 Planned Revenue Date]
	, Me07.cust_ActualRevenueDate AS [07 Actual Revenue Date]
	, Me07.cust_Revenue AS [07 Revenue]
	, Me07.new_InvoicedRevenue AS [07 Invoiced Revenue]

	, Me08.new_MilestoneTargetStartDate AS [08 Target Start Date]
	, Me08.new_MilestoneActualStartDate AS [08 Actual Start Date]
	, Me08.cust_MilestoneTargetDate AS [08 Target Completion Date]
	, Me08.cust_MilestoneCompletionDate AS [08 Actual Completion Date]
	, Me08.cust_PlannedRevenueDate AS [08 Planned Revenue Date]
	, Me08.cust_ActualRevenueDate AS [08 Actual Revenue Date]
	, Me08.cust_Revenue AS [08 Revenue]
	, Me08.new_InvoicedRevenue AS [08 Invoiced Revenue]

	, Me09.new_MilestoneTargetStartDate AS [09 Target Start Date]
	, Me09.new_MilestoneActualStartDate AS [09 Actual Start Date]
	, Me09.cust_MilestoneTargetDate AS [09 Target Completion Date]
	, Me09.cust_MilestoneCompletionDate AS [09 Actual Completion Date]
	, Me09.cust_PlannedRevenueDate AS [09 Planned Revenue Date]
	, Me09.cust_ActualRevenueDate AS [09 Actual Revenue Date]
	, Me09.cust_Revenue AS [09 Revenue]
	, Me09.new_InvoicedRevenue AS [09 Invoiced Revenue]

	, Me10.new_MilestoneTargetStartDate AS [10 Target Start Date]
	, Me10.new_MilestoneActualStartDate AS [10 Actual Start Date]
	, Me10.cust_MilestoneTargetDate AS [10 Target Completion Date]
	, Me10.cust_MilestoneCompletionDate AS [10 Actual Completion Date]
	, Me10.cust_PlannedRevenueDate AS [10 Planned Revenue Date]
	, Me10.cust_ActualRevenueDate AS [10 Actual Revenue Date]
	, Me10.cust_Revenue AS [10 Revenue]
	, Me10.new_InvoicedRevenue AS [10 Invoiced Revenue]	
	
	FROM new_projectExtensionBase AS Pe
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me01 
		ON Pe.new_ProjectID = Me01.cust_ProjectID AND Me01.cust_Milestone = 832090001
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me02 
		ON Pe.new_ProjectID = Me02.cust_ProjectID AND Me02.cust_Milestone = 832090002
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me03 
		ON Pe.new_ProjectID = Me03.cust_ProjectID AND Me03.cust_Milestone = 832090003
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me04 
		ON Pe.new_ProjectID = Me04.cust_ProjectID AND Me04.cust_Milestone = 832090004
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me05 
		ON Pe.new_ProjectID = Me05.cust_ProjectID AND Me05.cust_Milestone = 832090005
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me06 
		ON Pe.new_ProjectID = Me06.cust_ProjectID AND Me06.cust_Milestone = 832090006
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me07 
		ON Pe.new_ProjectID = Me07.cust_ProjectID AND Me07.cust_Milestone = 832090007
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me08 
		ON Pe.new_ProjectID = Me08.cust_ProjectID AND Me08.cust_Milestone = 832090008
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me09 
		ON Pe.new_ProjectID = Me09.cust_ProjectID AND Me09.cust_Milestone = 832090009
	LEFT JOIN cust_projectmilestoneSExtensionBase AS Me10 
		ON Pe.new_ProjectID = Me10.cust_ProjectID AND Me10.cust_Milestone = 832090010;
