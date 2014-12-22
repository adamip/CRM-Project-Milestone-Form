USE Productions_MSCRM;
SELECT * FROM new_projectBase;
SELECT * FROM new_projectExtensionBase;
SELECT * FROM cust_projectmilestonesBase;
SELECT * FROM cust_projectmilestonesExtensionBase;

SELECT * INTO [Productions_MSCRM].[dbo].[new_projectBase_20140307] FROM [Productions_MSCRM].[dbo].[new_projectBase];
SELECT * INTO [Productions_MSCRM].[dbo].[new_projectExtensionBase_20140307] FROM [Productions_MSCRM].[dbo].[new_projectExtensionBase];
SELECT * INTO [Productions_MSCRM].[dbo].[cust_projectmilestonesBase_20140307] FROM [cust_projectmilestonesBase];
SELECT * INTO [Productions_MSCRM].[dbo].[cust_projectmilestonesExtensionBase_20140307] FROM [cust_projectmilestonesExtensionBase];
