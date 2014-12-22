USE [Productions_MSCRM]
GO

/****** Object:  View [dbo].[Filterednew_project]    Script Date: 06/14/2013 17:06:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



--
-- report view for new_project
--
ALTER view [dbo].[Filterednew_project] (
    [createdby],
    [createdbyname],
    [createdbyyominame],
    [createdon],
    [createdonutc],
    [createdonbehalfby],
    [createdonbehalfbyname],
    [createdonbehalfbyyominame],
    [cust_cosreceiveddate],
    [cust_cosreceiveddateutc],
    [cust_customerporeceiveddate],
    [cust_customerporeceiveddateutc],
    [cust_milestoneperproject],
    [cust_milestoneperprojectname],
    [cust_partner],
    [cust_partnername],
    [cust_projecttype],
    [cust_projecttypename],
    [cust_servicesrevenue],
    [dynamics_integrationkey],
    [importsequencenumber],
    [modifiedby],
    [modifiedbyname],
    [modifiedbyyominame],
    [modifiedon],
    [modifiedonutc],
    [modifiedonbehalfby],
    [modifiedonbehalfbyname],
    [modifiedonbehalfbyyominame],
    [new_cosreceived],
    [new_cosreceivedname],
    [new_costcenter],
    [new_costcentername],
    [new_customerpo],
    [new_department],
    [new_departmentname],
    [new_description],
    [new_estcompletion],
    [new_estcompletionutc],
    [new_invoiceaccount],
    [new_invoiceaccountname],
    [new_invoiceaccountyominame],
    [new_partner],
    [new_partnername],
    [new_percentcomplete],
    [new_primarycontact],
    [new_primarycontactname],
    [new_primarycontactyominame],
    [new_projectenduser],
    [new_projectendusername],
    [new_projectenduseryominame],
    [new_projectid],
    [new_projectstage],
    [new_projectstagename],
    [new_projecttype],
    [new_projecttypename],
    [new_salesorder],
    [new_salesordername],
    [new_salesorder_temp],
    [new_salesperson],
    [new_salespersonname],
    [new_salespersonyominame],
    [new_startdate],
    [new_startdateutc],
    [new_title],
    [overriddencreatedon],
    [overriddencreatedonutc],
    [ownerid],
    [owneriddsc],
    [owneridname],
    [owneridtype],
    [owneridyominame],
    [owningbusinessunit],
    [owningteam],
    [owninguser],
    [statecode],
    [statecodename],
    [statuscode],
    [statuscodename],
    [timezoneruleversionnumber],
    [utcconversiontimezonecode],
    [versionnumber]
) with view_metadata as
select
    [new_project].[CreatedBy],
    [new_project].[CreatedByName],
    [new_project].[CreatedByYomiName],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[CreatedOn], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[CreatedOn],
    [new_project].[CreatedOnBehalfBy],
    [new_project].[CreatedOnBehalfByName],
    [new_project].[CreatedOnBehalfByYomiName],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[cust_COSReceivedDate], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[cust_COSReceivedDate],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[cust_CustomerPOReceivedDate], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[cust_CustomerPOReceivedDate],
    [new_project].[cust_MilestonePerProject],
    cust_MilestonePerProjectPLTable.Value,
    [new_project].[cust_Partner],
    cust_PartnerPLTable.Value,
    [new_project].[cust_ProjectType],
    cust_ProjectTypePLTable.Value,
    [new_project].[cust_ServicesRevenue],
    [new_project].[dynamics_integrationkey],
    [new_project].[ImportSequenceNumber],
    [new_project].[ModifiedBy],
    [new_project].[ModifiedByName],
    [new_project].[ModifiedByYomiName],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[ModifiedOn], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[ModifiedOn],
    [new_project].[ModifiedOnBehalfBy],
    [new_project].[ModifiedOnBehalfByName],
    [new_project].[ModifiedOnBehalfByYomiName],
    [new_project].[new_COSReceived],
    new_COSReceivedPLTable.Value,
    [new_project].[new_CostCenter],
    new_CostCenterPLTable.Value,
    [new_project].[new_CustomerPO],
    [new_project].[new_Department],
    new_DepartmentPLTable.Value,
    [new_project].[new_Description],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[new_EstCompletion], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[new_EstCompletion],
    [new_project].[new_InvoiceAccount],
    [new_project].[new_InvoiceAccountName],
    [new_project].[new_InvoiceAccountYomiName],
    [new_project].[new_Partner],
    new_PartnerPLTable.Value,
    [new_project].[new_PercentComplete],
    [new_project].[new_PrimaryContact],
    [new_project].[new_PrimaryContactName],
    [new_project].[new_PrimaryContactYomiName],
    [new_project].[new_ProjectEndUser],
    [new_project].[new_ProjectEndUserName],
    [new_project].[new_ProjectEndUserYomiName],
    [new_project].[new_projectId],
    [new_project].[new_ProjectStage],
    new_ProjectStagePLTable.Value,
    [new_project].[new_ProjectType],
    new_ProjectTypePLTable.Value,
    [new_project].[new_SalesOrder],
    [new_project].[new_SalesOrderName],
    [new_project].[new_salesorder_temp],
    [new_project].[new_SalesPerson],
    [new_project].[new_SalesPersonName],
    [new_project].[new_SalesPersonYomiName],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[new_StartDate], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[new_StartDate],
    [new_project].[new_title],
    dbo.fn_UTCToTzSpecificLocalTime([new_project].[OverriddenCreatedOn], 
			us.TimeZoneBias,
			us.TimeZoneDaylightBias,
			us.TimeZoneDaylightYear,
			us.TimeZoneDaylightMonth,
			us.TimeZoneDaylightDay,
			us.TimeZoneDaylightHour,
			us.TimeZoneDaylightMinute,
			us.TimeZoneDaylightSecond,
			0,
			us.TimeZoneDaylightDayOfWeek,
			us.TimeZoneStandardBias,
			us.TimeZoneStandardYear,
			us.TimeZoneStandardMonth,
			us.TimeZoneStandardDay,
			us.TimeZoneStandardHour,
			us.TimeZoneStandardMinute,
			us.TimeZoneStandardSecond,
			0,
			us.TimeZoneStandardDayOfWeek),
        [new_project].[OverriddenCreatedOn],
    [new_project].[OwnerId],
    --[new_project].[OwnerIdDsc]
    0,
    [new_project].[OwnerIdName],
    [new_project].[OwnerIdType],
    [new_project].[OwnerIdYomiName],
    [new_project].[OwningBusinessUnit],
    [new_project].[OwningTeam],
    [new_project].[OwningUser],
    [new_project].[statecode],
    statecodePLTable.Value,
    [new_project].[statuscode],
    statuscodePLTable.Value,
    [new_project].[TimeZoneRuleVersionNumber],
    [new_project].[UTCConversionTimeZoneCode],
    [new_project].[VersionNumber]
from new_project
    join SystemUserBase u on (u.SystemUserId = dbo.fn_FindUserGuid() and u.IsDisabled = 0)
    left join UserSettingsBase us on us.SystemUserId = u.SystemUserId
    left join OrganizationBase o on u.OrganizationId = o.OrganizationId
    left outer join StringMap [cust_MilestonePerProjectPLTable] on 
        ([cust_MilestonePerProjectPLTable].AttributeName = 'cust_milestoneperproject'
        and [cust_MilestonePerProjectPLTable].ObjectTypeCode = 10002
        and [cust_MilestonePerProjectPLTable].AttributeValue = [new_project].[cust_MilestonePerProject]
        and [cust_MilestonePerProjectPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [cust_PartnerPLTable] on 
        ([cust_PartnerPLTable].AttributeName = 'cust_partner'
        and [cust_PartnerPLTable].ObjectTypeCode = 10002
        and [cust_PartnerPLTable].AttributeValue = [new_project].[cust_Partner]
        and [cust_PartnerPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [cust_ProjectTypePLTable] on 
        ([cust_ProjectTypePLTable].AttributeName = 'cust_projecttype'
        and [cust_ProjectTypePLTable].ObjectTypeCode = 10002
        and [cust_ProjectTypePLTable].AttributeValue = [new_project].[cust_ProjectType]
        and [cust_ProjectTypePLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_COSReceivedPLTable] on 
        ([new_COSReceivedPLTable].AttributeName = 'new_cosreceived'
        and [new_COSReceivedPLTable].ObjectTypeCode = 10002
        and [new_COSReceivedPLTable].AttributeValue = [new_project].[new_COSReceived]
        and [new_COSReceivedPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_CostCenterPLTable] on 
        ([new_CostCenterPLTable].AttributeName = 'new_costcenter'
        and [new_CostCenterPLTable].ObjectTypeCode = 10002
        and [new_CostCenterPLTable].AttributeValue = [new_project].[new_CostCenter]
        and [new_CostCenterPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_DepartmentPLTable] on 
        ([new_DepartmentPLTable].AttributeName = 'new_department'
        and [new_DepartmentPLTable].ObjectTypeCode = 10002
        and [new_DepartmentPLTable].AttributeValue = [new_project].[new_Department]
        and [new_DepartmentPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_PartnerPLTable] on 
        ([new_PartnerPLTable].AttributeName = 'new_partner'
        and [new_PartnerPLTable].ObjectTypeCode = 10002
        and [new_PartnerPLTable].AttributeValue = [new_project].[new_Partner]
        and [new_PartnerPLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_ProjectStagePLTable] on 
        ([new_ProjectStagePLTable].AttributeName = 'new_projectstage'
        and [new_ProjectStagePLTable].ObjectTypeCode = 10002
        and [new_ProjectStagePLTable].AttributeValue = [new_project].[new_ProjectStage]
        and [new_ProjectStagePLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [new_ProjectTypePLTable] on 
        ([new_ProjectTypePLTable].AttributeName = 'new_projecttype'
        and [new_ProjectTypePLTable].ObjectTypeCode = 10002
        and [new_ProjectTypePLTable].AttributeValue = [new_project].[new_ProjectType]
        and [new_ProjectTypePLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [statecodePLTable] on 
        ([statecodePLTable].AttributeName = 'statecode'
        and [statecodePLTable].ObjectTypeCode = 10002
        and [statecodePLTable].AttributeValue = [new_project].[statecode]
        and [statecodePLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    left outer join StringMap [statuscodePLTable] on 
        ([statuscodePLTable].AttributeName = 'statuscode'
        and [statuscodePLTable].ObjectTypeCode = 10002
        and [statuscodePLTable].AttributeValue = [new_project].[statuscode]
        and [statuscodePLTable].LangId = 
            case us.UILanguageId 
                when 0 then o.LanguageCode
                else us.UILanguageId
            end)
    cross join dbo.fn_GetMaxPrivilegeDepthMask(10002) pdm
where
(
    -- privilege check
    pdm.PrivilegeDepthMask is not null and
    (
	
    -- Owner check
    --
    [new_project].OwnerId in 
	( 	-- returns only principals with Basic Read privilege for entity
		select pem.PrincipalId from PrincipalEntityMap pem (NOLOCK)
			join SystemUserPrincipals sup (NOLOCK) on pem.PrincipalId = sup.PrincipalId 
			where sup.SystemUserId = u.SystemUserId 
				and pem.ObjectTypeCode = 10002
	)	

		
    -- role based access
    or 
    
exists
(
 	select 
    1
	where
	(
		-- deep/local security
		(((pdm.PrivilegeDepthMask & 0x4) != 0) or ((pdm.PrivilegeDepthMask & 0x2) != 0)) and 
		[new_project].[OwningBusinessUnit] in (select BusinessUnitId from SystemUserBusinessUnitEntityMap (NOLOCK) where SystemUserId = u.SystemUserId and ObjectTypeCode = 10002)
	) 
	or
	(
		-- global security
		((pdm.PrivilegeDepthMask & 0x8) != 0) and 
		[new_project].[OwningBusinessUnit] is not null 
	) 
)

	
    -- object shared to the user 
    or 
    [new_project].[new_projectId] in 
		(
        select  POA.ObjectId from PrincipalObjectAccess POA 
        join SystemUserPrincipals sup (NOLOCK) on POA.PrincipalId = sup.PrincipalId
            where sup.SystemUserId = u.SystemUserId and
                POA.ObjectTypeCode = 10002 and
                ((POA.AccessRightsMask | POA.InheritedAccessRightsMask) & 1)=1
		)
	)
)

GO

