USE Productions_MSCRM;
SELECT * FROM new_projectBase;
SELECT * FROM new_projectExtensionBase;
SELECT * FROM cust_projectmilestonesBase;
SELECT * FROM cust_projectmilestonesExtensionBase;

SELECT * INTO [Productions_MSCRM].[dbo].[new_projectBase_20140307] FROM [Productions_MSCRM].[dbo].[new_projectBase];
SELECT * INTO [Productions_MSCRM].[dbo].[new_projectExtensionBase_20140307] FROM [Productions_MSCRM].[dbo].[new_projectExtensionBase];
SELECT * INTO [Productions_MSCRM].[dbo].[cust_projectmilestonesBase_20140307] FROM [cust_projectmilestonesBase];
SELECT * INTO [Productions_MSCRM].[dbo].[cust_projectmilestonesExtensionBase_20140307] FROM [cust_projectmilestonesExtensionBase];

SELECT P.cust_servicesrevenue, M.ExchangeRate, Me.cust_pctrevenuetobebilled, 
	Me.cust_Revenue, Me.cust_Revenue_Base 
	FROM new_projectExtensionBase AS P, 
		cust_projectmilestonesBase AS M,
		cust_projectmilestonesExtensionBase AS Me
	WHERE P.new_ProjectID = Me.new_Project
		AND M.cust_projectmilestonesId = Me.cust_projectmilestonesId
		AND P.cust_servicesrevenue IS NOT NULL
		AND Me.cust_pctrevenuetobebilled IS NOT NULL
		AND ABS( P.cust_servicesrevenue * M.ExchangeRate * Me.cust_pctrevenuetobebilled / 100.0 - Me.cust_Revenue ) > 0.01;
		
UPDATE cust_projectmilestonesExtensionBase
SET cust_Revenue = Pe.cust_servicesrevenue * M.ExchangeRate * Me.cust_pctrevenuetobebilled / 100.0
FROM new_projectExtensionBase AS Pe, 
	cust_projectmilestonesBase AS M,
	cust_projectmilestonesExtensionBase AS Me
WHERE Pe.new_ProjectID = Me.new_Project
	AND M.cust_projectmilestonesId = Me.cust_projectmilestonesId
	AND Pe.cust_servicesrevenue IS NOT NULL
	AND Me.cust_pctrevenuetobebilled IS NOT NULL
	AND ABS( Pe.cust_servicesrevenue * M.ExchangeRate * Me.cust_pctrevenuetobebilled / 100.0 - Me.cust_Revenue ) > 0.01;
		
SELECT Pe.cust_ServicesRevenue, Pe.cust_ProjectedBookedServicesRevenue 
	FROM new_projectExtensionBase AS Pe
	WHERE Pe.cust_ServicesRevenue IS NULL
		AND Pe.cust_ProjectedBookedServicesRevenue IS NOT NULL;

				