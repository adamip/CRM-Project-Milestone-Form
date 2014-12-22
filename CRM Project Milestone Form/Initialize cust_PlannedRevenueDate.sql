USE Productions_MSCRM;

SELECT cust_Revenue, cust_milestonetargetdate, cust_PlannedRevenueDate 
FROM cust_projectmilestonesExtensionBase
WHERE cust_Revenue IS NOT NULL AND cust_Revenue <> 0;

UPDATE cust_projectmilestonesExtensionBase
SET cust_PlannedRevenueDate = NULL;

UPDATE cust_projectmilestonesExtensionBase
SET cust_PlannedRevenueDate = DATEADD( d, 14, cust_milestonetargetdate )
FROM cust_projectmilestonesExtensionBase
WHERE cust_Revenue IS NOT NULL AND 
	cust_Revenue <> 0 AND 
	cust_milestonetargetdate IS NOT NULL;
	
	